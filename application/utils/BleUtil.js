import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View, 
    Platform,
    TextInput,
    Alert,
} from 'react-native'
import { bytesToString } from 'convert-string';
import BleModule from './BleModule';

//确保全局只有一个BleManager实例，BleModule类保存着蓝牙的连接信息
global.BluetoothManager = new BleModule();  

export default class extends Component {
    constructor(props) {
        super(props);   

        this.state={
            info: [],
            data: []
        }
        this.deviceMap = new Map();  
    }
    
    componentDidMount(){
        BluetoothManager.start();  //蓝牙初始化     	    
        this.updateStateListener = BluetoothManager.addListener('BleManagerDidUpdateState',this.handleUpdateState);
        this.stopScanListener = BluetoothManager.addListener('BleManagerStopScan',this.handleStopScan);	   
        this.discoverPeripheralListener = BluetoothManager.addListener('BleManagerDiscoverPeripheral',this.handleDiscoverPeripheral);
	    this.connectPeripheralListener = BluetoothManager.addListener('BleManagerConnectPeripheral',this.handleConnectPeripheral);
        this.disconnectPeripheralListener = BluetoothManager.addListener('BleManagerDisconnectPeripheral',this.handleDisconnectPeripheral);
        this.updateValueListener = BluetoothManager.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValue); 
        
        this.scan()
        // this.connect("34:15:13:E4:72:7E")
    }   

    componentWillUnmount(){
        this.updateStateListener.remove();
        this.stopScanListener.remove();
        this.discoverPeripheralListener.remove();       
        this.connectPeripheralListener.remove();
        this.disconnectPeripheralListener.remove();
        this.updateValueListener.remove();  
        
        this.disconnect();  //退出时断开蓝牙连接
    }

    //蓝牙状态改变
    handleUpdateState=(args)=>{ 
        BluetoothManager.bluetoothState = args.state;  
        if(args.state == 'on') {  //蓝牙打开时自动搜索
            // this.scan();
            this.connect("34:15:13:E4:72:7E")
        }            
    }

     //扫描结束监听
    handleStopScan=()=>{   
        console.log(JSON.stringify(this.state.data))
        // if(this.state.data.length)
        //     this.connectNext(0)
    }

    connectNext(index) { 
        //{"advertising":{"txPowerLevel":0,"serviceUUIDs":["ffe0"],"localName":"[Dobiy]","isConnectable":true,"manufacturerData":{"bytes":[2,1,6,9,255,72,77,52,21,19,228,114,126,7,22,0,176,0,0,0,0,3,2,224,255,2,10,0,8,9,91,68,111,98,105,121,93,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"data":"AgEGCf9ITTQVE+RyfgcWALAAAAAAAwLg/wIKAAgJW0RvYml5XQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=","CDVType":"ArrayBuffer"}},"rssi":-56,"id":"34:15:13:E4:72:7E","name":"[Dobiy]"}
        if (this.state.data.length > index)
            BluetoothManager.connect(this.state.data[index].id)
              .then( peripheralInfo => { 
                    this.notify()
              }).catch(err => {         
                    this.connectNext(index + 1)       
              })
        else this.alert('找不到设备')
      }
      connect(id) {
        console.log('connecting', id)
        BluetoothManager.connect(id)
        .then( peripheralInfo => { 
            this.notify()
        }).catch(err => {         
            this.connectNext(index + 1)       
        })
      }
     //搜索到一个新设备监听
    handleDiscoverPeripheral=(data)=>{  
        let id;  //蓝牙连接id
        let macAddress;  //蓝牙Mac地址           
        if(Platform.OS == 'android'){
            macAddress = data.id;
            id = macAddress;
        } else {  
            //ios连接时不需要用到Mac地址，但跨平台识别同一设备时需要Mac地址
            //如果广播携带有Mac地址，ios可通过广播0x18获取蓝牙Mac地址，
            macAddress = BluetoothManager.getMacAddressFromIOS(data);
            id = data.id;
        } 
        this.deviceMap.set(data.id,data);  //使用Map类型保存搜索到的蓝牙设备，确保列表不显示重复的设备
        this.setState({data:[...this.deviceMap.values()]});    
                     
    }

    //蓝牙设备已连接 
    handleConnectPeripheral=(args)=>{
        console.log('BleManagerConnectPeripheral:', args); 
    }

    //蓝牙设备已断开连接
    handleDisconnectPeripheral=(args)=>{ 
        BluetoothManager.initUUID();  //断开连接后清空UUID
         
    }

     //接收到新数据
    handleUpdateValue=(data)=> {  
        this.props.getMessage && this.props.getMessage(bytesToString(data.value))
    }

    disconnect() { 
        BluetoothManager.disconnect();
    }   

    scan() { 
        if(BluetoothManager.bluetoothState == 'on') {
            // BluetoothManager.scan() 
            this.connect("34:15:13:E4:72:7E")
        } else {
            BluetoothManager.checkState();
            if(Platform.OS == 'ios') {
                this.alert('请开启手机蓝牙');
            }else{
                Alert.alert('提示','请开启手机蓝牙',[
                    {
                        text:'取消',
                        onPress:()=>{ }    
                    }, {
                        text:'打开',
                        onPress:()=>{ BluetoothManager.enableBluetooth() }
                    }                    
                ]);
            }
            
        }       
    }

    alert(text){
        Alert.alert('提示',text,[{ text:'确定',onPress:()=>{ } }]);
    }

    notify=()=>{
        BluetoothManager.nofityCharacteristicUUID.map((el, index) => {
            BluetoothManager.startNotification(index)
            .then(()=>{ 
                console.log(BluetoothManager.nofityCharacteristicUUID)
                this.alert('连接成功');
            }) 
        })
       
    }
    render() {
        return null
    }
}
 