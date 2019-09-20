import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Clipboard
} from 'react-native';


import {WebView} from 'react-native-webview';


import {JX_PLAT_INFO} from "../asset";

import {observer} from "mobx-react";
import PropTypes from "prop-types";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";
import Toast from "../../Common/JXHelper/JXToast";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../UserCenter/UserPay/TCUserOpenPayApp";
import ExitGameAlertView from "../enter/gameMenu/ExitGameAlertView";
import GameMenuButton from "../enter/gameMenu/GameMenuButton";


@observer
export default class TWWebGameView extends Component {

    static propTypes = {
        data: PropTypes.func,
        isShow: PropTypes.any
    }
    static defaultProps = {
        title: ''
    };

    constructor(state) {
        super(state)
        this.state = {
            isHide: false,
            isHttpFail: false,
            isShowExitAlertView: false
        }
        this.bblStore = TW_Store.bblStore;
    }

    componentWillMount() {
        TW_OnBackHomeJs = this.onBackHomeJs;
        TW_OnValueJSSubGame = this.onEvaleJS;
    }

    render() {
        let {isOrigan, url, isThirdGame} = this.props;
        let myUrl = url;
        if (url == "") {
            return null
        }
        let tempIndex = myUrl.indexOf("?");
        let myParam = myUrl.substr(tempIndex);
        let homePre = myUrl.substring(0, tempIndex);
        let lastStr = homePre.substr(homePre.length - 1);
        let newUrl = "";
        if (isThirdGame) {
            newUrl = homePre
        } else {
            TW_Log("homePre.lastIndexOf-" + homePre.lastIndexOf("/"), lastStr)
            if (lastStr != "/") {
                homePre += "/";
            }
            newUrl = homePre + "index.html";
            if (TW_Store.appStore.isSitApp) {
                myParam += "&time=" + Math.random() * 9999;
            }
        }


        let source = {
            file: newUrl,
            allowingReadAccessToURL: TW_Store.dataStore.getGameRootDir(),
            allowFileAccessFromFileURLs: TW_Store.dataStore.getGameRootDir(),
            param: myParam
        };
        if (!G_IS_IOS) {
            source = {
                uri: newUrl + `${myParam}`,
            };
        } else {
            if (isOrigan) {
                source = {
                    uri: newUrl + `${myParam}`,
                };
            }
        }
        TW_Log("myUrl------------------------myParam--" + myParam + "-\n-newUrl----" + newUrl + "---source==", source);
        let injectJs = `(function() {
              window.postMessage = function(data) {
                window.ReactNativeWebView.postMessage(data);
              };
            })()`;

        let wenConteView =
            <WebView
                ref="myWebView"
                originWhitelist={['*']}
                useWebKit={true}
                injectedJavaScript={injectJs}
                automaticallyAdjustContentInsets={true}
                allowsInlineMediaPlayback={true}
                style={styles.webView}
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
            />
        return (
            <View style={[styles.container]}>
                {!this.state.isHttpFail ? wenConteView : <View style={{
                    height: JX_PLAT_INFO.SCREEN_H, justifyContent: "center",
                    alignItems: "center", backgroundColor: "transparent"
                }}>
                </View>}
                {isThirdGame && <GameMenuButton itransEnabled={"ON"}
                                                onPressExit={this.onClickMenu}/>}

                {this.state.isShowExitAlertView && <ExitGameAlertView
                    onPressConfirm={()=>{
                        TW_Store.bblStore.quitSubGame()
                        this.setState({isShowExitAlertView: false})
                    }}
                    onPressCancel={() => this.setState({isShowExitAlertView: false})}
                />
                }
            </View>
        );
    }

    onClickMenu=()=>{
        TW_Log("onClickMenu---")
        this.setState({isShowExitAlertView: true})
    }

    onLoadEnd = (event) => {

        let {url, isOrigan} = this.props;
        if (url && url.length > 0) {
            if (!isOrigan) {
                this.timeId = setTimeout(this.onEnterGame, G_IS_IOS ? 1000 : 4000)
            } else {
                this.timeId = setTimeout(this.onEnterGame, G_IS_IOS ? 500 : 1000)
            }

        }
        TW_Log("onLoadEnd=TCweb==========event===== TW_Store.bblStore.isLoading--" + TW_Store.bblStore.isLoading, event)
    }


    onEvaleJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        if (this.refs.myWebView) {
            TW_Store.dataStore.log += "\nAppStateChange-sunGame--onEvaleJS\n" + dataStr + "==\n";
            this.refs.myWebView.postMessage(dataStr, "*");
        }
    }

    onMessage = (event) => {

        let message = null;
        try {
            message = JSON.parse(event.nativeEvent.data);
            if (message) {
                this.onMsgHandle(message);
            }
        } catch (err) {
            TW_Log("onMessage===========erro==" + err, event.nativeEvent);
        }
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage===========" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "appStatus":
                    TW_Log("TWWebGameView---appStatus==", message);
                    TW_Store.bblStore.setNetInfo(message);
                    break;
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url = this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView, {url})
                    break;
                case "game_back":
                    this.onBackHomeJs()
                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView = !TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case "game_start": //子游戏准备ok
                    this.onEnterGame();
                    break;
                case "game_common":
                    let actions = message.name || message.do
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
                    }
                    break;
            }
        }
    }

    onEnterGame = () => {
        TW_Log("onLoadEnd=TCweb==========event=====onEnterGame")
        TW_Store.bblStore.lastGameUrl = "";
        if (!TW_Store.gameUpateStore.isInSubGame) {
            TW_Store.gameUpateStore.isInSubGame = true
            clearTimeout(this.timeId)
            TW_Store.bblStore.showGameCircle(false);
            if (TW_OnValueJSHome) {
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.enterGame));
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.stopMusic, {}));
                if (TW_Store.dataStore.isAppSound) {
                    SoundHelper.pauseMusic();
                }
            }
        }
    }
    handleUrl = (url) => {
        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        url = TW_Store.bblStore.gameDomain + "/" + url;
        return url
    }

    onError = (error) => {
        this.onBackHomeJs()
        TW_Log("TWWebGameView==onError=====TCweb======event=====", error.nativeEvent)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("TWWebGameView==onShouldStartLoadWithRequest=======TWWebGameView====event=====", event);
        return true;
    };

    onNavigationStateChange = (navState) => {

        TW_Log("TWWebGameView===========onNavigationStateChange=====url==" + navState.url + "--W_Store.gameUpateStore.isInSubGame==" + TW_Store.gameUpateStore.isInSubGame, navState)
        if (navState.title == "404 Not Found") {
            this.onBackHomeJs()
        } else {
            if (navState.url) {
                if (navState.url.indexOf("g_lobby/index.html") > -1) {
                    this.onBackHomeJs();
                    this.bblStore.lastGameUrl = "home"
                }
            }
        }
    };

    onBackHomeJs = () => {;
        if (TW_Store.dataStore.isAppSound) {
            SoundHelper.onCheckPalyMusic();
        }
        TW_Store.bblStore.quitSubGame();
        clearTimeout(this.timeId);

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
