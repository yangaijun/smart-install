import React from 'react'
import Freedomen from 'react-native-freedomen'
import {View, Alert} from 'react-native' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: (navigation.state.params.i || '') + ' s',
            headerRight: <Freedomen.Region 
                event={params => { 
                    Alert.alert('提示', '你确定要交卷?', [{text: '确定', onPress: () => {
                        navigation.state.params.submit()
                    }},{text: '取消'} ])
                }}
                columns={[
                    {type: 'button-text-primary', value: '交卷', style: {marginRight: 12}}
                ]}
            />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            timus: this.props.navigation.state.params.list,//[{title: '1.什么题目,下列关于水的写法是不同与其它的是什么？（）',a: '',isJieXi: 0},{title: '2.什么题目,下列关于水的写法是不同与其它的是什么？（）', a: '',isJieXi: 0},{title: '3.什么题目,下列关于水的写法是不同与其它的是什么？（）',a: '',isJieXi: 0}],
            currentIndex: 0,
            datika: false,
        }
    }
    componentDidMount() {
        var i = this.props.navigation.state.params.dataNum * 60
        var timer = setInterval(() => {
            i --
            if (i <= 0) {
                clearInterval(timer)
            }
            this.props.navigation.setParams({i : i})
        }, 1000)

        this.props.navigation.setParams({submit:  this.submit})
    }
    submit = () => { 
        let params = this.state.timus.map(timu => {
            const m416 = {
                0: 'A',
                1: 'B',
                2: 'C',
                3: 'D',
                4: 'E',
                5: 'F'
            } 
            return {
                ...timu,
                isRight: timu.error === true ? 0 : (m416[timu.choose] == timu.rightKey ? 1 : 0),
                personalAnswer: m416[timu.choose],
                dataNum: this.props.navigation.state.params.dataNum,
                studyDataId: timu.studyDataId,
                studyPaperId: this.props.navigation.state.params.studyPaperId
            }
        }) 
        Freedomen.global.api.call('/StudyData/submitPaper', params).then(res => {
            Alert.alert('提示', '你的得分为: ' + (res.data === 0 ? 0 : res), 
                [
                    {text: '确定', onPress: () => {
                        this.props.navigation.navigate('XX_ZaiXianTiKu')
                    }}, {text: '取消', onPress: () => {
                        this.props.navigation.navigate('XX_ZaiXianTiKu')
                    }}
                ]
            )
        })
    }
    render() {
        return (
            <View style={{flex: 1}}>
                 <Freedomen.Region 
                    data={this.state.timus[this.state.currentIndex]}
                    style={{flex: 1, padding: 10}}
                    event={params => {
                        if (params.value && params.value.prop == 'choose') {
                            this.state.timus[this.state.currentIndex].choose = params.value.row.$index
                            this.setState({
                                timus: this.state.timus
                            })
                        }
                    }}
                    columns={[
                        {type: 'text', value: 'ab', filter: value => `${this.state.currentIndex + 1}/${this.state.timus.length}`, style: {alignItems: 'flex-end'}},
                        {type: 'text-h3', prop: 'dataName', value: '1.什么题目,下列关于水的写法是不同与其它的是什么？（）', filter: (value, data) => this.state.currentIndex + 1 + '、' + value, style: {paddingTB: 10,lineHeight: 25}},
                        {
                            type: 'views', 
                            prop: 'studyDataOptions',
                            columns: [
                                {type: 'image-icon', value: require('../../assets/right.png'), filter: (value, data) => {
                                    return this.state.timus[this.state.currentIndex].choose === data.$index ? require('../../assets/check.png'): require('../../assets/uncheck.png')
                                }},
                                {type: 'text-label', prop: 'xuanxian'},
                                {type: 'click-row', prop: 'choose'}
                            ]
                        }, [
                            {type: 'text', value: '【正确答案】', style: {color: '#FF6D73', fontWeight: 'bold'}},
                            {type: 'text-h3', prop: 'rightKey', value: 'A'},
                            {type: 'br', load: (value, data) => data.isJieXi, style: {flexDirection: 'row', alignItems: 'center', paddingTB: 10}}
                        ], [
                            {type: 'text', value: '【答题解析】', style: {color: '#2EBBC4', fontWeight: 'bold'}},
                            {type: 'text-h4', prop: 'answerAnalysis'},
                            {type: 'br', load: (value, data) => data.isJieXi, style: {flexDirection: 'row', alignItems: 'center'}}
                        ],
                     ]}
                /> 
                <Freedomen.Region 
                    style={{height: 52, borderTopWidth: 1, borderTopColor: '#f5f5f5'}}
                    event={params => {
                        if (params.prop == 'jiexi') {
                            let timus = this.state.timus
                            timus[this.state.currentIndex].isJieXi = 1
                            timus[this.state.currentIndex].error = true
                            this.setState({
                                timus: timus
                            })
                        } else if (params.prop == 'pre') {
                            let currentIndex = this.state.currentIndex
                            currentIndex --
                            if (currentIndex < 0)
                                currentIndex = 0
                            this.setState({
                                currentIndex: currentIndex
                            })
                        } else if (params.prop == 'next') {
                            let currentIndex = this.state.currentIndex
                            currentIndex ++
                            if (currentIndex >= this.state.timus.length) 
                                currentIndex =  this.state.timus.length - 1
                            this.setState({
                                currentIndex: currentIndex
                            })
                        } else if (params.prop == 'datika') { 
                            this.setState({
                                datika: true
                            })
                        }
                    }}
                    columns={[
                        {type: 'button-image', prop: 'jiexi', value: require('../../assets/xx_jiexi.png'), style: {height: 42, width: 38, marginLR: 10}},
                        {type: 'button-image', prop: 'datika', value: require('../../assets/xx_datika.png'), style: {height: 42, width: 38, marginLR: 10}},
                        {type: 'text', style: {flex: 1}},
                        {type: 'button-cancel', prop: 'pre', value: '上一题', style: {padding: 5, paddingLR: 15, borderRadius: 2}},
                        {type: 'button-cancel', prop: 'next', value: '下一题', style: {padding: 5, paddingLR: 15, marginLeft: 15, borderRadius: 2}},
                        {type: 'br', style: {alignItems: 'center', height: 52, flexDirection: 'row', paddingLR: 15}}
                    ]}
                />
                {   
                    this.state.datika &&
                    <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'white'}}>
                        <Freedomen.Region 
                            event={params =>{
                                if (params.value && params.value.prop == 'tiaozhuan') {
                                    this.setState({
                                        currentIndex: params.$index,
                                        datika: false
                                    })
                                } else if (params.prop == 'quxiao') {
                                    this.setState({
                                        datika: false
                                    })
                                } else if (params.prop == 'jiaojuan') {
                                    Alert.alert('提示', '你确定要交卷?', [{text: '确定', onPress: () => {
                                        this.submit()
                                    }}, {text: '取消'}])
                                }
                            }}
                            style={{flex: 1}}
                            columns={[
                                {type: 'text', value: '答题卡', style: {height: 48, width: '100', align: 'center', backgroundColor: '#2EBBC4', color: 'white', fontSize: 14}},
                                [
                                    {type: 'text', style: {height: 16, width: 16, backgroundColor: '#000', marginRight: 5}},
                                    {type: 'text-h5', value: 44, filter: value => `未做: ${value}`},
                                    {type: 'text', style: {flex: 1}},
                                    {type: 'text', style: {height: 16, width: 16, backgroundColor: '#2EBBC4', marginRight: 5}},
                                    {type: 'text-h5', value: 44, filter: value => `已做: ${value}`},
                                    {type: 'br-form-row', style:{borderBottomWidth: 2, borderBottomColor: '#f5f5f5', marginBottom: 5}}
                                ], 
                                {type: 'views-x', value: this.state.timus, style: {flexWrap: 'wrap', align: 'center'}, columns: [
                                    {type: 'text', value: 'a', prop: '$index', filter: value => value + 1, style: (value, data) => {
                                        let color = data.choose == void 0 ? '#000' : '#2EBBC4'
                                        return { color: color }
                                    }},
                                    {type: 'click', prop: 'tiaozhuan', style: {width: 62, height: 52, align: 'center', borderColor: '#f5f5f5', borderBottomWidth: 1, borderLeftWidth: 1}}
                                ]},
                                {type: 'text', style: {flex: 1}},
                                [
                                    {type: 'button-text', prop: 'quxiao', value: '取消', style: {flex: 1, align: 'center'}},
                                    {type: 'button-text-primary', prop: 'jiaojuan', value: '交卷', style: {flex: 1, align: 'center'}},
                                    {type: 'br-normal-row', style: {height: 48, borderTopColor: '#f5f5f5', borderTopWidth: 1}}
                                ]
                            ]}
                        />
                    </View>
                }
            </View>
           
        );
    }
  }