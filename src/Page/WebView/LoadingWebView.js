import React, {Component} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {observer} from "mobx-react";
import {platInfo} from "../../config/appConfig";
import Tools from "../../Common/View/Tools";

@observer
export default class LoadingWebView extends Component {

    constructor(state) {
        super(state)
        let {url} = this.props;
        this.state = {
            isHide: false,
            uri: url,
        }
        TW_LoaderOnValueJS = this.onLoadEvalueJS;
    }

    static defaultProps = {
        title: ''
    };


    render() {

        let newUrl = TW_Store.dataStore.targetAppDir + "/loading/loading.html";
        let myParam=`?token=${TW_Store.userStore.access_token}&clientId=${TW_Store.appStore.clindId}`
        myParam+=`&debug=${TW_Store.appStore.isSitApp||TW_Store.appStore.clindId=="214"}&isAndroidHack=${TW_Store.appStore.isInAnroidHack}&subType=${TW_Store.appStore.subAppType}`

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

        //let visible = TW_Store.gameUpateStore.isNeedUpdate||TW_Store.gameUpateStore.isAppDownIng
        TW_Log("targetAppDir----LoadingWebView-isNeedUpdate==" + TW_Store.gameUpateStore.isNeedUpdate + "---isAppDownIng=" + TW_Store.gameUpateStore.isAppDownIng+"--istInit=="+TW_Store.dataStore.isAppInited);
        let isReady=TW_Store.dataStore.isAppInited
        let visible = TW_Store.gameUpateStore.isNeedUpdate || TW_Store.gameUpateStore.isLoading
        if (!visible||!isReady) {
            return null;
        }
        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            brandID: platInfo.brand,
            clientId: TW_Store.appStore.clindId,
            isAndroidHack: TW_Store.appStore.isInAnroidHack,
            hackData: {filterGameList: ["zjh", "lhd", "bjl", "pg", "jlbsh", "tto", "erbg"]},
            deviceToken: TW_Store.appStore.deviceToken,
            loginDomain: TW_Store.bblStore.loginDomain + "/api/v1/account",
            gameDomain: TW_Store.bblStore.gameDomain + "/api/v1/gamecenter",
            affCode: TW_Store.appStore.userAffCode,
            isDebug: TW_IS_DEBIG,
            appVersion: TW_Store.appStore.versionHotFix + (!G_IS_IOS && TW_Store.appStore.subAppType != "0" ? ` - ${TW_Store.appStore.subAppType}` : ""),
            isAppSound: TW_Store.dataStore.isAppSound,
            specialVersionHot: parseInt(TW_Store.appStore.specialVersionHot),
        })},(function() {
          window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
          };
        })()`;
        TW_Log("targetAppDir----LoadingWebView-source==" + newUrl, source);
        return (
            <View style={[styles.container, {width: TW_Store.appStore.screenW}]} ref="myView">
                <WebView
                    ref="myWebView"
                    useWebKit={true}
                    automaticallyAdjustContentInsets={true}
                    allowsInlineMediaPlayback={true}
                    style={[styles.webView, {width: TW_Store.appStore.screenW}]}
                    source={source}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    // renderLoading={this.onRenderLoadingView}
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
            TW_Log("onMessage==========6=erro==" + err, event.nativeEvent);
        }
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage====LoadingWebView=======" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case  "game_common":
                    let actions = message.name || message.do;
                    TW_Log("switch==actions====actions");
                    switch (actions) {
                        case "customerService":
                            if (!TW_Store.appStore.isInAnroidHack) {
                                TW_NavHelp.pushView(JX_Compones.TWThirdWebView,{url:TW_Store.gameUIStroe.gustWebUrl,isShowReload:false,backHandle:this.onShowUI,type:"guest"});
                                this.onShowUI(false)
                            }
                            break;
                    }
            }
        }
    }
    onShowUI=(isShowUi=true)=>{
        this.refs.myView.setNativeProps({style: {zIndex: isShowUi ?  10001:-888}});
    }

    onLoadEnd = () => {
        if (G_IS_IOS) {
            setTimeout(() => {
                let visible = TW_Store.gameUpateStore.isNeedUpdate || TW_Store.gameUpateStore.isLoading
                if (visible) {
                    TW_SplashScreen_HIDE()
                }
            }, 500);
        } else {
            setTimeout(() => {
                let visible = TW_Store.gameUpateStore.isNeedUpdate || TW_Store.gameUpateStore.isLoading
                if (visible) {
                    TW_SplashScreen_HIDE()
                }
            }, 800);
        }
    }

    onError = (error) => {
        if (TW_Store.gameUpateStore.isNeedUpdate && TW_Store.appStore.isAppInited) {
           TW_Store.dataStore.hideLoadingView();
        }
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };

    onLoadEvalueJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";

        if (this.refs.myWebView) {
            //  TW_Log("downloadFile---onLoadEvalueJS--versionBBL---progress-TW_Store.gameUpateStore.isNeedUpdate=-",data);
            this.refs.myWebView.postMessage(dataStr, "*");
        }

        //this.refs.myWebView.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);
    }

    onNavigationStateChange = (navState) => {
        TW_Log("navState====LoadingWebView=======onNavigationStateChange=====url==" + navState.url, navState)
    };


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        zIndex: 10002,
        height: SCREEN_H,
        width: SCREEN_W,
        backgroundColor: "black",
    },
    webView: {
        marginTop: 0,
        flex: 1,
        backgroundColor: "black",
    }
});
