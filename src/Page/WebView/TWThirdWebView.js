import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Clipboard,
    BackHandler,
    KeyboardAvoidingView
} from 'react-native';

import {WebView} from 'react-native-webview';

import {JX_PLAT_INFO} from "../asset";

import {observer} from "mobx-react";
import PropTypes from "prop-types";
import Toast from "../../Common/JXHelper/JXToast";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../UserCenter/UserPay/TCUserOpenPayApp";
import ExitGameAlertView from "../enter/gameMenu/ExitGameAlertView";
import GameMenuButton from "../enter/gameMenu/GameMenuButton";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
@observer
export default class TWThirdWebView extends Component {

    static propTypes = {
        data: PropTypes.func,
        isShow: PropTypes.any,
        isShowReload: PropTypes.any,
        isRotation:PropTypes.any,
    };
    static defaultProps = {
        title: '',
        isShowReload: true,
        isRotation:true
    };

    constructor(state) {
        super(state);
        this.state = {
            isHide: false,
            isHttpFail: false,
            isShowExitAlertView: false,
            isOpenAddPay: false
        };
        this.bblStore = TW_Store.bblStore;
        this.isShowKeyBoard = false;
    }

    componentWillMount() {
        //旋转到竖屏
        TW_Store.gameUIStroe.isShowThirdWebView=true;
        let {isRotation} = this.props;
        if(isRotation){
            TW_Store.appStore.lockToProrit();
        }
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount(): void {
        TW_Store.gameUIStroe.isShowThirdWebView=false;
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    render() {
        let {url, isShowReload, backHandle} = this.props;
        let source = {
            uri: url,
        };
        TW_Log("TWThirdWebView--------", this.props)
        let injectJs = `(function() {
              window.postMessage = function(data) {
                window.ReactNativeWebView.postMessage(data);
              };
            })()`;

        let webContentView =
            <WebView
                ref="myWebView"
                originWhitelist={['*']}
                useWebKit={true}
                injectedJavaScript={injectJs}
                automaticallyAdjustContentInsets={true}
                allowsInlineMediaPlayback={true}
                style={[styles.webView, {marginBottom: G_IS_IOS ? 0 : 40}]}
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
            <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={-40}
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
                        this.setState({isShowExitAlertView: false});
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

    onBackAndroid = () => {
        TW_Log("TWThirdWebView--onBackAndroid---", this.navigator);
        this.onBackHomeJs();
        TW_Store.appStore.lockToLandscape();
        this.setState({isShowExitAlertView: false});
    };

    onClickMenu = (btnId) => {
        switch (btnId) {
            case 2:
                this.setState({isShowExitAlertView: true, isOpenAddPay: true});
                break;
            case 3:
                this.setState({isShowExitAlertView: true, isOpenAddPay: false});
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
                    TW_NavHelp.pushView(JX_Compones.WebView, {url});
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
        let {url, isShowReload, backHandle} = this.props;
        if (backHandle) {
            backHandle();
        }
        TW_NavHelp.popToBack()
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        overflow: 'hidden'
    },
    webView: {
        marginTop: 0,
        flex: 1,
        backgroundColor: "transparent",
        overflow: 'hidden'
    }
});
