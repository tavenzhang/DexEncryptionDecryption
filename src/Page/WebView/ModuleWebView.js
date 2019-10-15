import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {observer} from "mobx-react";

@observer
export default class ModuleWebView extends Component {

    static defaultProps = {
        title: ''
    };

    constructor(state) {
        super(state)
        TW_OnValueModuleJS = this.onLoadEvalueJS;
        this.currentView="";
    }

    render() {
        let newUrl = TW_Store.dataStore.targetAppDir + "/plugView/index.html";
        let visible = TW_Store.dataStore.isAppInited;
        if(!visible){
            return null;
        }

        // let home = GameUtils.getQueryVariable("apihome");
        // let token = GameUtils.getQueryVariable("token");
        // let cid = GameUtils.getQueryVariable("clientId");
        // let surl = GameUtils.getQueryVariable("service");
        let myParam = `?apihome=${TW_Store.bblStore.gameDomain}&token=${TW_Store.userStore.access_token}&clientId=${TW_Store.appStore.clindId}&service=${TW_Store.gameUIStroe.gustWebUrl}&debug=${TW_Store.appStore.isSitApp}`;
        let isShowUi=TW_Store.gameUIStroe.isShowWithDraw||TW_Store.gameUIStroe.isShowAddPayView
        if (this.refs.myView) {
            this.refs.myView.setNativeProps({style: {zIndex: isShowUi ?  10001:-888}});
            if(isShowUi){
                if(TW_Store.gameUIStroe.isShowAddPayView){
                    if(this.currentView!=TW_Store.bblStore.ACT_ENUM.showRecharge){
                        this.onLoadEvalueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showRecharge));
                    }
                }else if(TW_Store.gameUIStroe.isShowWithDraw){
                    if(this.currentView!=TW_Store.bblStore.ACT_ENUM.showRecharge){
                        this.onLoadEvalueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showWithdraw));
                    }
                }
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
        })},(function() {
          window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
          };
        })()`

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
                    TW_Store.gameUIStroe.showGusetView();
                    // TW_Store.gameUIStroe.isShowShare=!TW_Store.gameUIStroe.isShowShare
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

        //this.refs.myWebView.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);
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
