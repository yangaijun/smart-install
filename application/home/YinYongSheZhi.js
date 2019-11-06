import React from 'react' 
import Freedomen from 'react-native-freedomen'
import {ScrollView} from 'react-native';
import columns from '../region/columns'
import datas from '../region/datas'   
import store from 'react-native-freedomen/store';
var controlMenuList 
export default  class  extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '应用设置',
            headerRight: <Freedomen.Region 
                event={params => {
                    Freedomen.global.controlMenuList = controlMenuList
                    store.set('menuList', controlMenuList)
                    Freedomen.global.setMenuList()
                    navigation.goBack()
                }}
                columns={[
                    {type: 'button-right', value: '保存'}
                ]}
            />
        }
    }
    constructor(props) {
        super(props) 
        this.state = {
            list: []
        }
        controlMenuList = Freedomen.global.controlMenuList
        this.menuList = Freedomen.global.user.menuList.map( el => el.menuName) 
        console.log(controlMenuList)
       
    }
    componentWillMount() {
        this._setMenu()
    }
    _setMenu() {
        let newMenuList = []
        datas.YinYon.map(el => {
            let list = el.item.filter(i =>  {
                i.switch = controlMenuList.includes(i.label)
                return this.menuList.includes(i.label)
            })
            if (list.length) {
                newMenuList.push({
                    title: el.title,
                    item: list
                })
            }
        })
        this.setState({
            list: newMenuList
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}> 
            {
                this.state.list.map((el, key) => {
                    return <Freedomen.Region 
                            key={key}
                            event={params => {
                                console.log(params)
                                if (params.value && params.value.row.switch) {
                                    controlMenuList.push(params.value.row.label)
                                } else if (params.value && !params.value.row.switch) {
                                    let index = controlMenuList.indexOf(params.value.row.label)
                                    if (index != -1) {
                                        controlMenuList.splice(index, 1)
                                    }
                                }
                            }}
                            data={el}
                            columns={[
                                {type: 'text', prop: 'title', value: '办公管理', style: {backgroundColor: '#f5f5f5', color: '#878787', padding: 10}},
                                {type: 'views', prop: 'item', value: [], columns: [
                                    {type: 'text', value:'', style: {height: 16, width: 4, backgroundColor: '#2EBBC4', marginRight: 10}},
                                    {type: 'text-h5', prop: 'label', style: {flex: 1}},
                                    {type: 'switch', prop: 'switch'},
                                    {type: 'br-row', style: {marginBottom: 1, padding: 10}}
                                ]}
                            ]}
                        />
                })
            }
            </ScrollView>
        );
    }
  }