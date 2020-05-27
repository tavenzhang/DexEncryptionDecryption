import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Clipboard,
    BackHandler,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { WebView } from 'react-native-webview';

import { JX_PLAT_INFO } from "../asset";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import Toast from "../../Common/JXHelper/JXToast";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../../Data/TCUserOpenPayApp";
import ExitGameAlertView from "../enter/gameMenu/ExitGameAlertView";
import GameMenuButton from "../enter/gameMenu/GameMenuButton";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {StatusBarHeight} from "../asset/screen";
import DeviceInfo from 'react-native-device-info';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {safeAreaTop} from "../../Common/JXHelper/WebviewHelper";
import ExitVerViewAlert from "../enter/gameMenu/ExitVerViewAlert";

@observer
export default class TWVerWebView extends Component {

    static propTypes = {
        data: PropTypes.func,
        isShow: PropTypes.any,
        isShowReload: PropTypes.any,
        isRotation: PropTypes.any,
        isPaddingTop: PropTypes.any,
        urlParam: PropTypes.any,
        type: PropTypes.any,
    };
    static defaultProps = {
        title: '',
        isShowReload: false,
        isRotation: true,
        urlParam: `heightBar=${StatusBarHeight }`,
        isPaddingTop:true,
        type: ""
    };

    constructor(state) {
        super(state);
        this.state = {
            isHide: false,
            isHttpFail: false,
            isShowExitAlertView: false,
            isOpenAddPay: false,
            isSoftMenuBarDetected: false
        };
        this.bblStore = TW_Store.bblStore;
        this.curMarginBottom=0;
        this.isQuitGame=false;
        TW_Store.appStore.lockToProrit();
        if(G_IS_IOS){
            TW_Store.bblStore.enterSubGame();
        }

    }

    componentWillMount() {
        //旋转到竖屏

        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);

        if (ExtraDimensions.getSoftMenuBarHeight() > 0) {
            this.setState({isSoftMenuBarDetected: true})
        }
        const deviceModel = DeviceInfo.getModel();
        this.curMarginBottom = this.validateAndroidModel(deviceModel) ? 0 : ExtraDimensions.getSoftMenuBarHeight();
        TW_Log("TWThirdWebView--model:" + deviceModel + "--SoftMenuBarHeight:" + this.curMarginBottom +
            "--isSoftMenuBarDetected:" + this.state.isSoftMenuBarDetected);
    }

    componentWillUnmount(): void {
        let {type} = this.props;
        TW_Store.bblStore.isOpenThirdWebView=false;
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    render() {
        let { url, isShowReload, isPaddingTop, urlParam, type } = this.props;
        let myUrl = url;

        if (url.indexOf("?") > -1) {
            myUrl = `${myUrl}&${urlParam}`
        } else {
            myUrl = `${myUrl}?${urlParam}`
        }

        let source = {
            uri: myUrl,
        };

        TW_Log("TWThirdWebView-----render---", this.props);

        let injectJs = `(function() {
              window.postMessage = function(data) {
                window.ReactNativeWebView.postMessage(data);
              };
            })(); ${safeAreaTop(type)}`;

        let webContentView =
            <WebView
                ref="myWebView"
                originWhitelist={['*']}
                useWebKit={true}
                injectedJavaScript={injectJs}
                automaticallyAdjustContentInsets={true}
                allowsInlineMediaPlayback={true}
                // 根据softMenuBar的高度
                style={[styles.webView, {marginBottom: this.state.isSoftMenuBarDetected? ExtraDimensions.getSoftMenuBarHeight():this.curMarginBottom}]}
                source={source}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode={"always"}
                decelerationRate="normal"
                startInLoadingState={false}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                allowFileAccess={true}
                onError={this.onError}
                onMessage={this.onMessage}
                onLoadEnd={this.onLoadEnd}
                thirdPartyCookiesEnabled={true}
            />;
        return (
                // <SafeAreaView style={{flex:1, backgroundColor:"rgb(227, 41, 43)"}}  forceInset={{ bottom: 'never' ,}}>
                <KeyboardAvoidingView style={[styles.container, { paddingTop: isPaddingTop ? StatusBarHeight : 0  ,height:JX_PLAT_INFO.SCREEN_W, width:JX_PLAT_INFO.SCREEN_H}]} behavior="padding" keyboardVerticalOffset={-this.curMarginBottom}
                                      enabled={G_IS_IOS ? false : true}>
                    {!this.state.isHttpFail ? webContentView : <View style={{
                        height: JX_PLAT_INFO.SCREEN_H, justifyContent: "center",
                        alignItems: "center", backgroundColor: "transparent"
                    }}>
                    </View>}
                    <GameMenuButton isScreenPortrait={true} isShowReload={isShowReload} itransEnabled={"ON"}
                                    onPressExit={this.onClickMenu}/>
                    {/*{this.state.isShowExitAlertView && <ExitVerViewAlert*/}
                    {/*    isOpenAddPay={this.state.isOpenAddPay}*/}
                    {/*    onPressConfirm={() => {*/}
                    {/*        this.onBackHomeJs();*/}
                    {/*        this.setState({isShowExitAlertView: false});*/}
                    {/*        if (this.state.isOpenAddPay) {*/}
                    {/*            TW_Store.gameUIStroe.isShowAddPayView = true;*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    onPressCancel={() => this.setState({isShowExitAlertView: false})}*/}
                    {/*/>*/}
                    {/*}*/}
                </KeyboardAvoidingView>


        );
    }

    validateAndroidModel = (deviceModel) => {
        //以后如果有类似的手机，可以再加【...,"Redmi 6 Pro",...】
        let modeList = ["MI 9"]
        if (!G_IS_IOS) {
            if (modeList.indexOf(deviceModel) > -1) {
                TW_Log("TWThirdWebView--selected device");
                this.setState({isSoftMenuBarDetected: false})
                return true
            }
        }
        return false
    };

    onBackAndroid = () => {
        TW_Log("TWThirdWebView--onBackAndroid---", this.navigator);
        this.onBackHomeJs();
    };


    onClickMenu = (btnId) => {
      //  this.onBackHomeJs();
        Alert.alert(
            "是否返回游戏大厅?",
            "",
            [
                {
                    text: "返回",
                    onPress: () =>  this.onBackHomeJs(),
                    style:"destructive"
                },
                {
                    text: "取消",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    };

    onLoadEnd = (event) => {
        TW_Log("TWThirdWebView===========onLoadEnd==");
        TW_SplashScreen_HIDE();
        if(!G_IS_IOS&&!this.isQuitGame){
            TW_Store.bblStore.enterSubGame();
        }
    };




    onMessage = (event) => {
        let message = null;
        try {
            message = JSON.parse(event.nativeEvent.data);
            if (message) {
                this.onMsgHandle(message);
            }
        } catch (err) {
            TW_Log("TWThirdWebView===========error==" + err, event.nativeEvent);
        }
    };

    onMsgHandle = (message) => {
        TW_Log("onMessage==TWThirdWebView=========" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "appStatus":
                    TW_Log("TWThirdWebView---appStatus==", message);
                    TW_Store.bblStore.setNetInfo(message);
                    break;
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url = this.handleUrl(message.au);
                    TW_NavHelp.pushView(JX_Compones.WebView, { url });
                    break;
                case "game_back":
                    this.onBackHomeJs(message.type);
                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView = !TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case "game_start": //子游戏准备ok
                    this.onEnterGame();
                    break;
                case "game_common":
                    let actions = message.name || message.do;
                    switch (actions) {
                        case "saveToPhone":
                            Tools.onSaveScreenPhone();
                            break;
                        case "loginout":
                            TW_Store.userStore.exitAppToLoginPage();
                            break;
                        case "openWeb":
                            TCUserOpenPayApp.linkingWeb(message.param);
                            break;
                        case "copylink":
                            Clipboard.setString(message.param);
                            if (message.hint && message.hint.length > 0) {
                                Toast.showShortCenter(message.hint);
                            } else {
                                Toast.showShortCenter("已复制成功!");
                            }
                            break;
                    }
                    break;
                case "logout":
                    if (TW_Store.gameUpateStore.isInSubGame) {
                        this.onBackHomeJs()
                    }
                    TW_Store.userStore.exitAppToLoginPage();
                    TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.logout));
                    break;

            }
        }
    };


    handleUrl = (url) => {
        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        url = TW_Store.bblStore.gameDomain + "/" + url;
        return url
    };

    onError = (error) => {
        this.onBackHomeJs();
        TW_Log("TWThirdWebView==onError=====TCWeb======name=====" + this.constructor.name, error.nativeEvent);
    };

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("TWThirdWebView==onShouldStartLoadWithRequest=======TWWebGameView====name=====" + this.constructor.name, event);
        return true;
    };

    onNavigationStateChange = (navState) => {

        TW_Log("TWThirdWebView===========onNavigationStateChange= +this.constructor.name==" + this.constructor.name, navState);
        if (navState.title == "404 Not Found"||navState.title =="网页无法打开") {
            this.onBackHomeJs()
        } else {

        }
    };


    onBackHomeJs = (type = "") => {
        let { url, isShowReload, backHandle } = this.props;
        this.isQuitGame=true;
        TW_NavHelp.popToBack();
        if (backHandle) {
            backHandle();
        }
        TW_Store.appStore.lockToLandscape();
        TW_Store.bblStore.quitSubGame();
        this.setState({ isShowExitAlertView: false });
    }
}


const styles = StyleSheet.create({
    container: {
        height:JX_PLAT_INFO.SCREEN_W,
        width:JX_PLAT_INFO.SCREEN_H,
        backgroundColor: G_IS_IOS ? "transparent":"black",
        overflow: 'hidden'
    },
    webView: {
        height:JX_PLAT_INFO.SCREEN_W,
        width:JX_PLAT_INFO.SCREEN_H,
        backgroundColor: "black",
        overflow: 'hidden'
    }
});
