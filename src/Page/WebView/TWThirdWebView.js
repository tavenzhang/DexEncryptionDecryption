import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Clipboard,
    BackHandler,
    KeyboardAvoidingView
} from 'react-native';
import { WebView } from 'react-native-webview';
//import SafeAreaView from 'react-native-safe-area-view';

import { JX_PLAT_INFO } from "../asset";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import Toast from "../../Common/JXHelper/JXToast";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../UserCenter/UserPay/TCUserOpenPayApp";
import ExitGameAlertView from "../enter/gameMenu/ExitGameAlertView";
import GameMenuButton from "../enter/gameMenu/GameMenuButton";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {StatusBarHeight} from "../asset/screen";
import DeviceInfo from 'react-native-device-info';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {safeAreaTop} from "../../Common/JXHelper/WebviewHelper";


@withMappedNavigationProps()
@observer
export default class TWThirdWebView extends Component {

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
    }

    componentWillMount() {
        //旋转到竖屏
        TW_Store.gameUIStroe.isShowThirdWebView = true;
        let {isRotation,type} = this.props;
        if (isRotation) {
            TW_Store.appStore.lockToProrit();
        }
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);

        if (ExtraDimensions.getSoftMenuBarHeight() > 0) {
            this.setState({isSoftMenuBarDetected: true})
        }
        const deviceModel = DeviceInfo.getModel();
        this.curMarginBottom = this.validateAndroidModel(deviceModel) ? 0 : ExtraDimensions.getSoftMenuBarHeight();
        TW_Log("TWThirdWebView--model:" + deviceModel + "--SoftMenuBarHeight:" + this.curMarginBottom +
            "--isSoftMenuBarDetected:" + this.state.isSoftMenuBarDetected);
        if(type!="guest"){
            TW_Store.bblStore.enterSubGame();
        }
        TN_JUMP_RN();
    }

    componentWillUnmount(): void {
        let {type} = this.props;
        TW_Store.gameUIStroe.isShowThirdWebView = false;
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        if(type!="guest"){
            TW_Store.bblStore.quitSubGame();
        }
        TN_JUMP_HOME("")
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
                <KeyboardAvoidingView style={[styles.container, { paddingTop: isPaddingTop ? StatusBarHeight : 0 }]} behavior="padding" keyboardVerticalOffset={-this.curMarginBottom}
                                      enabled={G_IS_IOS ? false : true}>
                    {!this.state.isHttpFail ? webContentView : <View style={{
                        height: JX_PLAT_INFO.SCREEN_H, justifyContent: "center",
                        alignItems: "center", backgroundColor: "transparent"
                    }}>
                    </View>}
                    <GameMenuButton isScreenPortrait={true} isShowReload={isShowReload} itransEnabled={"ON"}
                                    onPressExit={this.onClickMenu}/>
                    {this.state.isShowExitAlertView && <ExitGameAlertView
                        isOpenAddPay={this.state.isOpenAddPay}
                        onPressConfirm={() => {
                            this.onBackHomeJs();
                            TW_Store.appStore.lockToLandscape();
                          //  this.setState({isShowExitAlertView: false});
                            if (this.state.isOpenAddPay) {
                                TW_Store.gameUIStroe.isShowAddPayView = true;
                            }
                        }}
                        onPressCancel={() => this.setState({isShowExitAlertView: false})}
                    />
                    }
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
        TW_Store.appStore.lockToLandscape();
        this.setState({ isShowExitAlertView: false });
    };

    onClickMenu = (btnId) => {
        switch (btnId) {
            case 2:
                this.setState({ isShowExitAlertView: true, isOpenAddPay: true });
                break;
            case 3:
                this.setState({ isShowExitAlertView: true, isOpenAddPay: false });
                break;
        }
    };

    onLoadEnd = (event) => {

    };


    onEvaleJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        if (this.refs.myWebView) {
            TW_Store.dataStore.log += "\nAppStateChange-sunGame--onEvaleJS\n" + dataStr + "==\n";
            this.refs.myWebView.postMessage(dataStr, "*");
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
            TW_Log("onMessage===========error==" + err, event.nativeEvent);
        }
    };

    onMsgHandle = (message) => {
        TW_Log("onMessage===========" + this.constructor.name, message);
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
        if (navState.title == "404 Not Found") {
            this.onBackHomeJs()
        } else {

        }
    };

    onBackHomeJs = (type = "") => {
        let { url, isShowReload, backHandle } = this.props;
        if (backHandle) {
            backHandle();
        }
        TW_NavHelp.popToBack()
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: G_IS_IOS ? "transparent":"black",
        overflow: 'hidden'
    },
    webView: {
        flex: 1,
        backgroundColor: "transparent",
        overflow: 'hidden'
    }
});
