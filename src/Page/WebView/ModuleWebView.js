import React, {Component} from 'react';
import {
    Clipboard,
    StyleSheet,
    View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {observer} from "mobx-react";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../UserCenter/UserPay/TCUserOpenPayApp";
import Toast from "../../Common/JXHelper/JXToast";
import FileTools from "../../Common/Global/FileTools";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";
import {platInfo} from "../../config/appConfig";

@observer
export default class ModuleWebView extends Component {

    static defaultProps = {
        title: ''
    };

    constructor(state) {
        super(state)
        TW_OnValueModuleJS = this.onLoadEvalueJS;
        this.currentView="";
        this.isFirstShow=true
    }

    render() {
        let newUrl = TW_Store.dataStore.targetAppDir + "/plugView/index.html";
        let visible = TW_Store.dataStore.isAppInited&&TW_Store.gameUpateStore.isEnteredGame;
        if(!visible){
            return null;
        }

        // let home = GameUtils.getQueryVariable("apihome");
        // let token = GameUtils.getQueryVariable("token");
        // let cid = GameUtils.getQueryVariable("clientId");
        // let surl = GameUtils.getQueryVariable("service");
        let myParam=`?apihome=${TW_Store.bblStore.getUriConfig().url.apihome}&token=${TW_Store.userStore.access_token}&clientId=${TW_Store.appStore.clindId}&service=${TW_Store.gameUIStroe.gustWebUrl}`
         myParam+=`&debug=${TW_Store.appStore.isSitApp||TW_Store.appStore.clindId=="214"}&isAndroidHack=${TW_Store.appStore.isInAnroidHack}&subType=${TW_Store.appStore.subAppType}`
        //  let isShowUi=TW_Store.gameUIStroe.isShowAddPayView||TW_Store.gameUIStroe.isShowGuest;
        let isShowUi=TW_Store.gameUIStroe.isShowAddPayView
        if (this.refs.myView) {
            if(isShowUi){
                if(TW_Store.gameUIStroe.isShowAddPayView){
                    if(this.currentView!=TW_Store.bblStore.ACT_ENUM.showRecharge){
                        this.currentView=TW_Store.bblStore.ACT_ENUM.showRecharge;
                        this.onLoadEvalueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showRecharge));
                    }
                }
                // if(TW_Store.gameUIStroe.isShowGuest){
                //     if(this.currentView!=TW_Store.bblStore.ACT_ENUM.isShowGuest){
                //         this.currentView=TW_Store.bblStore.ACT_ENUM.isShowGuest;
                //         this.onLoadEvalueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showService));
                //     }
                // }
            }
            if(this.isFirstShow&&isShowUi){
                TW_Log("ModuleWebView--start--isFirstShow")
                setTimeout(()=>{
                    TW_Log("ModuleWebView--end--isFirstShow")
                    this.isFirstShow=false;
                    this.onShowUI(isShowUi);
                }, G_IS_IOS ? 700:1000)
            }else{
                this.onShowUI(isShowUi)
            }
        }
        let source = {
            file: newUrl,
            allowingReadAccessToURL: TW_Store.dataStore.targetAppDir,
            allowFileAccessFromFileURLs: TW_Store.dataStore.targetAppDir,
            param: myParam
        };
        if (!G_IS_IOS) {
            source = {
                uri: newUrl + `${myParam}`,
            };
        }


        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            brandID:platInfo.brand,
            isAndroidHack: TW_Store.appStore.isInAnroidHack,
            hackData:{filterGameList:["zjh","lhd","bjl","pg","jlbsh","tto","erbg"]},
            deviceToken: TW_Store.appStore.deviceToken,
            loginDomain: TW_Store.bblStore.loginDomain + "/api/v1/account",
            gameDomain: TW_Store.bblStore.gameDomain + "/api/v1/gamecenter",
            affCode: TW_Store.appStore.userAffCode,
            isDebug: TW_IS_DEBIG,
            specialVersionHot:parseInt(TW_Store.appStore.specialVersionHot),
            isNewApp: G_IS_IOS ? true : false
        })},(function() {
          window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
          };
        })()`;

        TW_Log("targetAppDir----ModuleWebView-source==isShowUi-"+isShowUi,source);
        return (
            <View  style={{
                position: "absolute",
                width: SCREEN_W,
                height: SCREEN_H,
                backgroundColor: "rgba(10,10,10,0.3)",
                zIndex: -88}} ref="myView">
                <WebView
                    ref="myWebView"
                    useWebKit={true}
                    automaticallyAdjustContentInsets={true}
                    allowsInlineMediaPlayback={true}
                    style={[styles.webView,{width: TW_Store.appStore.screenW}]}
                    source={source}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={false}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    onNavigationStateChange={this.onNavigationStateChange}
                    allowFileAccess={true}
                    injectedJavaScript={injectJs}
                    onError={this.onError}
                    onMessage={this.onMessage}
                    onLoadEnd={this.onLoadEnd}
                />
            </View>
        );
    }

    onShowUI=(isShowUi)=>{

        this.refs.myView.setNativeProps({style: {zIndex: isShowUi ?  10001:-888}});
    }
    onMessage = (event) => {
        let message = null;
        try {
            message = JSON.parse(event.nativeEvent.data);
            if (message) {
                this.onMsgHandle(message);
            }
        } catch (err) {
            TW_Log("onMessage==========ModuleWebView==" + err, event.nativeEvent);
        }
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage====ModuleWebView=======" + this.constructor.name, message);
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case  "game_custom":
                     TW_Store.gameUIStroe.isShowGuest=!TW_Store.gameUIStroe.isShowGuest
                    break;
                case "closeUI":
                    this.currentView ="";
                    switch (message.data) {
                        case TW_Store.bblStore.ACT_ENUM.showRecharge: //充值界面
                            TW_Store.gameUIStroe.isShowAddPayView =false;
                            break;
                        case TW_Store.bblStore.ACT_ENUM.showService://客服界面
                             TW_Store.gameUIStroe.isShowGuest=false
                            break;
                    }
                    break;
                case "game_common":
                    let actions = message.name || message.do;
                    TW_Log("game---ct==",message);
                    switch (actions) {
                        case "saveToPhone":
                            Tools.onSaveScreenPhone();
                            break;
                        case "loginout":
                            TW_Store.userStore.exitAppToLoginPage();
                            break;
                        case "openWeb":
                            TCUserOpenPayApp.linkingWeb(message.param)
                            break;
                        case "copylink":
                            Clipboard.setString(message.param);
                            if (message.hint && message.hint.length > 0) {
                                Toast.showShortCenter(message.hint);
                            } else {
                                Toast.showShortCenter("已复制成功!");
                            }
                            break;
                        case  "saveImage":
                            FileTools.onSaveCameraRoll(message.param);
                            break;
                        case  "closeApp":
                            TN_ExitApp();
                            break;
                        case "goToPay"://打开相关app
                            TCUserOpenPayApp.getInstance().openAppByType(message.param);
                            break;
                    }
                    break;
            }
        }
    }

    onLoadEnd=()=>{

    }

    onError = (error) => {

    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };

    onLoadEvalueJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        if(this.refs.myWebView){
            TW_Log("downloadFile---ModuleWebView--versionBBL---progress-onLoadEvalueJS=-",data);
            this.refs.myWebView.postMessage(dataStr, "*");
        }

    }

    onNavigationStateChange = (navState) => {
        TW_Log("downloadFile---ModuleWebView--versionBBL---progress-onNavigationStateChange=-",navState);

    };

}


const styles = StyleSheet.create({
    webView: {
        marginTop: 0,
        flex: 1,
        backgroundColor: "black",
    }
});
