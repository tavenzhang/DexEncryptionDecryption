import {TabNavigator, StackNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {
    UIManager,
    StatusBar,
    View,
    ToastAndroid,
    BackHandler,
    DeviceEventEmitter,
    NativeEventEmitter,
    NativeModules
} from 'react-native';
import {Provider} from 'mobx-react'
import NavigationService from './NavigationService'
import rootStore from "../../Data/store/RootStore";
import {observer} from 'mobx-react';
const { ModuleWithEmitter } = NativeModules;
const eventEmitter = new NativeEventEmitter(ModuleWithEmitter);
const appStores = {
    // mainStore: rootStore.mainStore,
    // initAppStore: rootStore.initAppStore,
    // commonBoxStore: rootStore.commonBoxStore,
}
import CommonBoxLayer from "../enter/CommonBoxLayer";
import OpeninstallModule from 'openinstall-react-native'
import ExtraDimensions from 'react-native-extra-dimensions-android';

//用于增加通用navigator view 属性 特殊 处理
function viewRoutHelp(component) {
    return {screen: component}
}

import SubGameView from "./SubGameView";
import GameLogView from "./GameLogView";
import TWVerWebView from "../WebView/TWVerWebView";

const Components = {
    SubGameView:viewRoutHelp(SubGameView),
    // WebView: viewRoutHelp(TCWebView),
    TWThirdWebView:viewRoutHelp(TWVerWebView),
}

//为所有组件增加增加routName 配合 JX_Compones  用于 通用 pushtoView 跳转 避免使用纯string
for (let key in Components) {
    if (Components[key]) {
        Components[key].routName = key;
    }
}

global.JX_Compones = Components

const MainStackNavigator = StackNavigator({
    ...Components
}, {
    navigationOptions: {
        header: null,
        swipeEnabled: false,
        gesturesEnabled: false
    }
})

import KeyboardManager from 'react-native-keyboard-manager'
import BackgroundTimer from "react-native-background-timer";

@observer
export default class App extends Component {
    constructor(state) {
        super(state)
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        if (KeyboardManager && KeyboardManager.setToolbarPreviousNextButtonEnable) {
            KeyboardManager.setToolbarPreviousNextButtonEnable(true);
        }
        if(G_IS_IOS){
            eventEmitter.addListener('onMessage',  this.onNativeMessage);
        }else{
            DeviceEventEmitter.addListener('onMessage', this.onNativeMessage);
        }

        TW_OnValueJSHome=TN_MSG_TO_GAME
        StatusBar.setHidden(true);
        if (G_IS_IOS) {
            this.intervalId = BackgroundTimer.setInterval(this.onCheckMute, 800);
        }
    }
    onCheckMute=()=>{
        if(!TW_Store.bblStore.isEnterLooby){
            TN_ISMute();
        }else{
            BackgroundTimer.clearInterval(this.intervalId);
            if(!TW_Store.appStore.isOldIosAPP){
                TN_ISMute((isMute)=>{
                    TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.isMute, {
                        data:isMute
                    }));
                })
            }
        }
    }

    onNativeMessage=(e:Event)=>{
        let message=e.NAME;
        if(message.indexOf("onAndroidBack")>-1){
            this.onBackAndroid()
        }else{
            TW_Store.bblStore.onMsgHandle(e.NAME);
        }
    }

    componentWillUnmount(): void {
        if (!G_IS_IOS) {
          //  BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        BackgroundTimer.clearInterval(this.intervalId);
        // OpeninstallModule.removeWakeUpListener(this.receiveWakeupListener)//移除监听
    }


    render() {
        // TW_Log("onBackAndroid--TW_Store.gameUpateStore.isNeedUpdate--"+TW_Store.gameUpateStore.isNeedUpdate+"--TW_Store.dataStore.isAppInite=="+TW_Store.dataStore.isAppInited);
         TW_Log("app---render")
        return (
            <Provider  {...rootStore} >
                <View style={{flex: 1, backgroundColor: "black"}}>
                    {this.addStatusBar()}
                    <MainStackNavigator
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                            this.navigator = navigatorRef;
                        }}
                    />

                     <GameLogView/>
                     <CommonBoxLayer/>
                </View>
            </Provider>
        )
    }

    onBackAndroid = () => {
        TW_Log("onBackAndroid---", this.navigator);
        if (TW_Store.gameUpateStore.isInSubGame) {
            if(TW_Store.bblStore.subGameParams.isOpenThirdVerWebView){
                TW_Store.appStore.lockToLandscape();
            }
            TW_Store.bblStore.quitSubGame("");
            return true;
        }
        let now = new Date().getTime();
        if (now - this.lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
             TN_ExitApp();
            return false;//控制权交给原生
        }
        this.lastClickTime = now;
        ToastAndroid.show("再按一次退出 ", ToastAndroid.SHORT);
        return true;
    }

    addStatusBar() {
        if (!G_IS_IOS) {
            return (
                <StatusBar
                    hidden={true}
                    animated={true}
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle="light-content"/>
            )
        }
    }
}
