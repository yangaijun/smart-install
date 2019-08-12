import React from 'react'
import Freedomen from 'react-native-freedomen'
import columns from '../../region/columns'
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.label ,
            headerRight: <Freedomen.Region 
                event={params => { }}
                columns={[
                    {type: 'button-image-right', prop: 'shaixuan', value: require('../../assets/shaixuan.png')},
                ]}
            />
        }
    } 
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount() { }
    render() {
        return (
           <Freedomen.Region 
                style={{backgroundColor: '#f5f5f5'}}
                columns={[
                    [
                       {type: 'pick-date', value: '2019-07'},
                       {type: 'image-form', value: require('../../assets/right.png')},
                       {type: 'br-form-row', style: {align: 'center'}}
                    ], [
                        [
                            {type: 'text-label', value: '总工时'},
                            {type: 'text-primary', value: '41.0'},
                            {type: 'br', style: {align: 'center', flex: 1}}
                        ], [
                            {type: 'text-label', value: '总工日'},
                            {type: 'text-primary', value: '41'},
                            {type: 'br', style: {align: 'center', flex: 1, borderColor: '#f5f5f5', borderLeftWidth: 1, borderRightWidth: 1}}
                        ], [
                            {type: 'text-label', value: '总工资(元)'},
                            {type: 'text-primary', value: '770.00'},
                            {type: 'br', style: {align: 'center', flex: 1}}
                        ],
                        {type: 'br-form-row', style: {paddingLR:　1}}
                    ], {
                        type: 'views', value: [{}, {}], columns: [
                            [
                                {type: 'text-form-label', value: '王大头', style: {flex: 1}},
                                {type: 'text', value: '瓦工'},
                                {type: 'br-normal-row', style: {paddingBottom: 5}}
                            ], [
                                {type: 'text-circle', style: {backgroundColor: '#00CC9B'}},
                                {type: 'text', value: '10.00', filter: value => `${value}小时`, style: {paddingRight: 15}},

                                {type: 'text-circle', style: {backgroundColor: '#2EBBC4'}},
                                {type: 'text', value: '10.00', filter: value => `${value}工日`, style: {paddingRight: 15}},

                                {type: 'text-circle', style: {backgroundColor: '#FAB722'}},
                                {type: 'text', value: '10.00', filter: value => `${value}元`, style: {paddingRight: 15}},
                                {type: 'br-normal-row'}
                            ],
                            {type: 'br-list-item'}
                        ]
                    }
                ]}
           />
        );
    }
  }