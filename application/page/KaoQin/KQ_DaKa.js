import React from 'react'
import Freedomen from 'react-native-freedomen'
import {Text, Image} from 'react-native'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = {  
        tabBarLabel: '打卡', 
        tabBarIcon: ({tintColor, focused}) => <Image source={focused ? require('../../assets/daka.png') : require('../../assets/undaka.png')} style={{height: 22, width: 22}}/> 
    }; 
    constructor(props) {
        super(props)
       
        this.state = {
            data: {
                time: new Date(),
                daka: 1
            }
        }
    }
    componentDidMount() { 
        this.timer = setInterval(() => {
            this.setState({
                data: {
                    time: new Date()
                }
            })
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        return (
            <Freedomen.Region 
                data={this.state.data}
                event={params => {
                    if (params.prop == 'daka') {
                        navigator.geolocation.getCurrentPosition(location => {
                            Freedomen.global.api.getPosition({location: location.coords.longitude + "," + location.coords.latitude}).then(res => {
                                console.log(res)
                                if (res.data.regeocode && res.data.regeocode.formatted_address) {
                                    console.log(res.data.regeocode.formatted_address)
                                }
                                    
                            })
                            this.setState({
                                data: {
                                    time: new Date(),
                                    daka: 2
                                }
                            })
                        })
                    }
                }}
                columns={[
                    [
                        {type: 'image-header', value: require('../../assets/image_header.png')},
                        [
                            {type: 'text-form-label', value: '小丸子'},
                            {type: 'text-primary', value: '已加入安装公司考勤组 (查看规则)'},
                            {type: 'br', style: {flex: 1}}
                        ],
                        {type: 'text', value: new Date(), filter: 'yyyy-MM-dd'},
                        {type: 'br-form-row', style: {paddingTB: 22, borderBottomWidth: 3, borderTopWidth: 3, borderColor: '#f5f5f5'}}
                    ], [
                        [
                            {type: 'text-circle', style: (value, data) => {
                                return {backgroundColor: data.daka > 1 ? '#ccc' : '#2EBBC4', marginRight: 0}
                            }},
                            {type: 'text', style: {height: 125, width: 2, backgroundColor: '#ccc'}, load: (value, data) =>  data.daka > 1},
                            {type: 'text-circle', style: {backgroundColor: '#ccc', marginRight: 0}, load: (value, data) =>  data.daka > 1},
                            {type: 'br', style: {width: 28, align: 'center', paddingTB: 5}}
                        ], [
                            {type: 'text', value: '上班打卡'},
                            [
                                {type: 'text-h5', value: '打卡时间 09：23'},
                                [
                                    {type: 'image-form', value: require('../../assets/weizhi.png')},
                                    {type: 'text', value: '上海市嘉定区安亭镇同济大学嘉定校区'},
                                    {type: 'br-normal-row', style: {paddingTB: 3}}
                                ], [
                                    {type: 'button-text-primary', value: '更新打卡', style: {fontSize: 14}},
                                    {type: 'image-form', value: require('../../assets/rightprimary.png')},
                                    {type: 'br-normal-row'}
                                ],
                                {type: 'br', style: {height: 112}, load: (value, data) =>  data.daka > 1}
                            ],
                            {type: 'text', value: '下班打卡', load: (value, data) =>  data.daka > 1},
                        ],
                        {type: 'br', style: {flexDirection: 'row', padding: 15}}
                    ], 
                    [
                        [
                            {type: 'text', value: '下班打卡', style: {color: 'white', fontSize: 16}},
                            {type: 'text', prop: 'time',  filter: "hh:mm:ss", style: {color: 'white'}},
                            {type: 'backimage', value: require('../../assets/dakabg.png'), style: {width: 128, height: 128, align: 'center'}}
                        ],
                        {type: 'click', prop: 'daka', style: {width: 128, height: 128, alignSelf: 'center'}}
                    ]
                 ]}
            />
        );
    }
  }