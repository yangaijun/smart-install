import React from 'react'
import {ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen' 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '新建日报',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.redux({
                        rzy_xinjian: (data) => {
                            alert(JSON.stringify(data))
                        }
                    })
                }}
                columns={[
                    {type: 'button-text', value: '发布', style: {marginRight: 12}},
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {  
        }
    } 
    componentDidMount() { 
     
    } 
    render() {
        return (
            <View>
                <ScrollView>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        event={params => { }}
                        redux={'rzy_xinjian'}
                        data={{}}
                        columns={[
                            [
                                {type: 'text-form-label', value: '今日计划'},
                                {type: 'text-p', value: '香港有两个洲际，尖沙咀的香港洲际被酒店精称为大洲 际，香港看展，特别安排把两间洲际都住了一轮，然后 有了这篇入住体验的分享。来'},
                                {type: 'br-form-col', style: {marginBottom: 5}}
                            ], [
                                {type: 'text-form-label', value: '日期', style: {flex: 1}},
                                {type:　'text-label', value: '2019-08-17'},
                                {type: 'br-form-row'}
                            ], [
                                {type: 'text-form-label', value: '今日完成工作'},
                                {type: 'input-area-form', prop:　'ar', maxLength: 500, placeholder: '请输入完成内容'},
                                {type: 'br-form-col'}
                            ], [
                                {type: 'text-form-label', value: '未完成的工作'},
                                {type: 'input-area-form', prop:　'ard', maxLength: 500, placeholder: '请输入完成内容' },
                                {type: 'br-form-col'}
                            ], [
                                {type: 'text-form-label', value: '需要协调工作'},
                                {type: 'input-area-form', prop:　'ardb', maxLength: 500, placeholder: '请输入完成内容'},
                                {type: 'br-form-col'}
                            ], [
                                {type: 'text-form-label', value: '明日计划'},
                                {type: 'input-area-form', prop:　'arddd', maxLength: 500, placeholder: '请输入完成内容'},
                                {type: 'br-form-col'}
                            ]
                        ]}
                    />
                </ScrollView> 
           </View>
        );
    }
  }