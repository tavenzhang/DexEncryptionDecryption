import React, {Component} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {observer} from "mobx-react";
import {platInfo} from "../../config/appConfig";

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
        let isok=TW_Store.dataStore.isAppInited
        let newUrl = TW_Store.dataStore.targetAppDir + "/loading/loading.html";
        let myParam=`?apihome=${TW_Store.bblStore.getUriConfig().url.apihome}&token=${TW_Store.userStore.access_token}&clientId=${TW_Store.appStore.clindId}&service=${TW_Store.gameUIStroe.gustWebUrl}`
        myParam+=`&debug=${TW_Store.appStore.isSitApp||TW_Store.appStore.clindId=="214"}&isAndroidHack=${TW_Store.appStore.isInAnroidHack}&subType=${TW_Store.appStore.subAppType}`

        let source = {
            file: newUrl,
            allowingReadAccessToURL: TW_Store.dataStore.targetAppDir,
            allowFileAccessFromFileURLs: TW_Store.dataStore.targetAppDir,
            param: ""
        };
        if (!G_IS_IOS) {
            source = {
                uri: newUrl + `${myParam}`,
            };
        }

        //let visible = TW_Store.gameUpateStore.isNeedUpdate||TW_Store.gameUpateStore.isAppDownIng
        TW_Log("targetAppDir----LoadingWebView-isNeedUpdate==" + TW_Store.gameUpateStore.isNeedUpdate + "---isAppDownIng=" + TW_Store.gameUpateStore.isAppDownIng);
        let visible = TW_Store.gameUpateStore.isNeedUpdate || TW_Store.gameUpateStore.isLoading
        if (!visible) {
            return null;
        }
        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            brandID: platInfo.brand,
            brandUrl: TW_Store.bblStore.getBrandUrl(),
            clientId: TW_Store.appStore.clindId,
            urlJSON: TW_Store.bblStore.getUriConfig(),
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
            <View style={[styles.container, {width: TW_Store.appStore.screenW}]}>
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
                case  "game_custom":
                    TW_Log("onMessage====LoadingWebView======TW_Store.gameUIStroe.showGusetView=", message);
                    if (!TW_Store.appStore.isInAnroidHack) {
                        TW_Store.gameUIStroe.showGusetView();
                    }
                    break;
            }
        }
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
