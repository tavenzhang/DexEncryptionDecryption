import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Keyboard,
    Clipboard
} from 'react-native';
import {WebView} from 'react-native-webview';
import RNFS from "react-native-fs";
import {observer} from 'mobx-react';
import NetUitls from "../../Common/Network/TCRequestUitls";
import Toast from "../../Common/JXHelper/JXToast";
import FileTools from "../../Common/Global/FileTools";
import {G_LayoutAnimaton} from "../../Common/Global/G_LayoutAnimaton";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../UserCenter/UserPay/TCUserOpenPayApp";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";
import {platInfo} from "../../config/appConfig";
const HTTP_GAME_LIST = "/gamecenter/player/game/list";
const HTTP_ACCOUNT = "/webapi/account/users/current";

@observer
export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.state = {
            isFail: false,
            updateList: [],
            sharedUrl: null,
            isShowSharebox: false,
            flash: 1
        }
        this.isLoading = false;
        this.isShow = false;
        this.isShowKeyBoard = false
        this.rom = Math.random() * 100000;
    }

    componentWillMount() {
        TW_OnValueJSHome = this.onEvaleJS;
        TW_Store.bblStore.isLoading = true;
        TW_Store.bblStore.lastGameUrl = "";
        TW_Data_Store.getItem(TW_DATA_KEY.gameList, (err, ret) => {
            TW_Log("(TW_DATA_KEY.gameList-FileTools--==err==" + err + "--ret---", ret);
            if (ret) {
                let res = JSON.parse(ret);
                if (res) {
                    TW_Store.dataStore.appGameListM = res;
                }
            }
        });
        // TW_Log("(_keyboard-TW_DATA_KEY.gameList-FileTools--==G_IS_IOS== middle" + G_IS_IOS,Keyboard.addListener);
        if (G_IS_IOS) {
            Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
            Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
        } else {
            // android 没有keyboardWillShow 与 keyboardWillHide
            Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
            Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        }

    }


    componentWillUnmount(): void {
        if (G_IS_IOS) {
            Keyboard.removeListener('keyboardWillShow', this._keyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', this._keyboardDidHide);
        } else {
            Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext: any): void {
        G_LayoutAnimaton.configureNext(G_LayoutAnimaton.easeNoCreate)
    }

    _keyboardDidShow = (event) => {
        // TW_Log("( _keyboard---_keyboardDidShow" ,event);
        //TW_Log("( _keyboard---_keyboardDidShow--endCoordinates" ,event.endCoordinates);
        if (!this.isShowKeyBoard) {
            this.isShowKeyBoard = true;
                if (!G_IS_IOS&&this.refs.myView) {
                    TW_Log("( _keyboard---_keyboardDidShow--" + this.refs.myView.setNativeProps, this.refs.myView);
                    this.refs.myView.setNativeProps({style: {bottom: event.endCoordinates.height - 150}});
                }

        }
    }

    _keyboardDidHide = (event) => {
        // TW_Log("( _keyboard---_keyboardDidHide" ,event);
        if (this.isShowKeyBoard) {
            this.isShowKeyBoard = false
            if (!G_IS_IOS&&this.refs.myView) {
                this.refs.myView.setNativeProps({style: {bottom: 0}});
            }
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.onBlur, {}));
        }
    }


    onFlushGameData = () => {
        TW_Store.dataStore.onFlushGameData();
    }

    componentDidMount(): void {
        // 用于android 不需要点击默认播放声音
        if (this.refs.myWebView) {
            if(this.refs.myWebView.getSettings){
                this.refs.myWebView.getSettings().setMediaPlaybackRequiresUserGesture(false);
            }
        }
    }


    handleUrl = (url, data) => {
        TW_Log("(FileTools----.gameList-FileTools--handleUrl--url" + url, data);
        if (data) {
            let index = url.indexOf("?");
            url = url.substr(index);
            if (data.bupdate) {
                    TW_Store.dataStore.startLoadGame(data);
            } else {
                url = TW_Store.dataStore.getGameRootDir() + "/" + data.name + "/" + url
            }
        } else {
            if (url && url.indexOf("../") > -1) {
                url = url.replace("../", "");
            }
            if (TW_Store.appStore.isSitApp) {
                url = TW_Store.bblStore.loginDomain + url
            } else {
                url = TW_Store.bblStore.gameDomain + url
            }
        }

        return `${url}&app=${G_IS_IOS ? "ios" : "android"}`;
    }


    render() {
        TW_Log("TW_DATA_KEY.gameList-FileTools--==err=flash=this.state.flash--isLoading="+TW_Store.gameUpateStore.isLoading+"---TW_Store.gameUpateStore.isIncludeLobby"+TW_Store.gameUpateStore.isIncludeLobby);
        let news = TW_Store.gameUpateStore.isLoading || !TW_Store.dataStore.isAppInited
        if (news) {
            return null
        }

        TW_Log("TW_DATA_KEY.gameList-FileTools--=gameUpateStore=news==" + news + "getSettings==isAppInited=" + TW_Store.dataStore.isAppInited)

        let source = {
            file: TW_Store.dataStore.targetAppDir+ "/index.html",
            allowingReadAccessToURL: TW_Store.dataStore.targetAppDir,
            allowFileAccessFromFileURLs: TW_Store.dataStore.targetAppDir,
            param:`?app=true&&isDebug=${TW_Store.appStore.isSitApp||TW_Store.appStore.clindId==214}&&version=${TW_Store.dataStore.homeVersionM.versionNum}`
        };

        if (!G_IS_IOS) {
            source = {
                uri: TW_Store.dataStore.targetAppDir+"/index.html"+`?app=true&&isDebug=${TW_Store.appStore.isSitApp||TW_Store.appStore.clindId==214}&&version=${TW_Store.dataStore.homeVersionM.versionNum}`,
            };
        }

        // if (TW_IS_DEBIG) {
        //     // source =  require('./../../../android/app/src/main/assets/gamelobby/index.html');
        //     let uri = "http://localhost:8081/android/app/src/main/assets/gamelobby/index.html?platform=ios&hash=7e5876ea5a240467db5670550b53411b&rm-" + this.rom
        //     source = {uri}
        // }
        TW_Log("targetAppDir----MainBundlePath-TW_Store.dataStore.isAppInited-----" + TW_Store.dataStore.isAppInited+"---TW_Store.appStore.deviceToken="+TW_Store.appStore.deviceToken,source);


        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            brandID:platInfo.brand,
            brandUrl:TW_Store.bblStore.getBrandUrl(),
            clientId: TW_Store.appStore.clindId,
            urlJSON: TW_Store.bblStore.getUriConfig(),
            isAndroidHack: TW_Store.appStore.isInAnroidHack,
            hackData:{filterGameList:["zjh","lhd","bjl","pg","jlbsh","tto","erbg"]},
            deviceToken: TW_Store.appStore.deviceToken,
            loginDomain: TW_Store.bblStore.loginDomain + "/api/v1/account",
            gameDomain: TW_Store.bblStore.gameDomain + "/api/v1/gamecenter",
            affCode: TW_Store.appStore.userAffCode,
            isDebug: TW_IS_DEBIG,
            appVersion: TW_Store.appStore.versionHotFix+(!G_IS_IOS&&TW_Store.appStore.subAppType!="0" ? ` - ${TW_Store.appStore.subAppType}`:""),
            isAppSound: TW_Store.dataStore.isAppSound,
            isNewApp: G_IS_IOS ? true : false
                })},(function() {
          window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
          };
        })()`;
        // TW_Log("targetAppDir-33---isWechatEnabled-his.state--"+(sharedUrl&&isShowSharebox)+"--sharedUrl=="+sharedUrl+"-isShowSharebox-"+isShowSharebox,this.state);
        return (
            <View style={[styles.container, {width: TW_Store.appStore.screenW}]}>
                <View style={[styles.webView, {width: TW_Store.appStore.screenW}]} ref="myView" collapsable={false}>
                    <WebView
                        collapsable={false}
                        originWhitelist={['*']}
                        ref="myWebView"
                        automaticallyAdjustContentInsets={true}
                        style={[styles.webView, {width: TW_Store.appStore.screenW}]}
                        source={source}
                        mediaPlaybackRequiresUserAction={false}
                        injectedJavaScript={injectJs}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        thirdPartyCookiesEnabled={true}
                        // startInLoadingState={true}
                        // renderLoading={this.onRenderLoadingView}
                        onNavigationStateChange={this.onNavigationStateChange}
                        onLoadStart={this.onShouldStartLoadWithRequest}
                        allowFileAccess={true}
                        onError={this.onError}
                        onMessage={this.onMessage}
                        onLoadEnd={this.onLoadEnd}
                    />
                </View>
            </View>
        );
    }

    async checkFileExist (file) {
        const target_dir_exist = await RNFS.exists(file);
        //if(!target_dir_exist){
            TW_Log("checkFileExist-----file===="+file+"-----exist=="+target_dir_exist)
       // }

    }



    onMessage = (event) => {
        let message = JSON.parse(event.nativeEvent.data);
        this.onMsgHandle(message);
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage======XXWebView=====>>" + this.constructor.name + "\n", message);
        let url = "";
        let gameData = null;
        let retList = null;
        let gameM = null;

        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
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
                        case "onGameInit":
                            if (this.timeId) {
                                clearTimeout(this.timeId);
                            }
                            TW_SplashScreen_HIDE()
                            this.onFlushGameData();
                            if(TW_Store.gameUpateStore.isTempExist){
                                TW_Store.gameUpateStore.isTempExist=false;
                                TW_Store.gameUpateStore.isNeedUpdate=false;
                            }
                            break;
                        case "copylink":
                            Clipboard.setString(message.param);
                            if (message.hint && message.hint.length > 0) {
                                Toast.showShortCenter(message.hint);
                            } else {
                                Toast.showShortCenter("已复制成功!");
                            }
                            break;
                        case "openDebug":
                            this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.openDebug, {}));
                            break;
                        case  "saveImage":
                            FileTools.onSaveCameraRoll(message.param);
                            break;
                        case "playBgMusic":
                            TW_Data_Store.setItem(TW_DATA_KEY.BG_MUSIC, message.param ? "1" : "0", (err) => {
                                TW_Log("playBgMusic---TW_DATA_KEY.AFF_CODE-err---" + message.param, err)
                            });
                            if (message.param) {
                                SoundHelper.playMusic();
                            } else {
                                SoundHelper.pauseMusic();
                            }
                            break;
                        case "wxLogin":
                            TW_Store.gameUIStroe.checkWXInstall((ret)=> {
                                TW_Store.dataStore.log += "\n\n==> wxLogin checkWXInstall---" + ret;
                                if (ret) {
                                    TN_WechatAuth((code, result, message) => {
                                        TW_Store.dataStore.log += "\n==> wxLogin message---" + JSON.stringify(result) + "---\n--code====" + code + "===message==" + message;
                                        TW_Log("wxLogin code----" + code + "---message---" + message, result);
                                        if (result) {
                                            if (code == 200 || code == 0) {
                                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.wxLogin, {data: result}));
                                            } else {
                                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.popTip, {data: "微信授权异常!"}));
                                            }
                                        } else {
                                            this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.popTip, {data: "微信授权异常!"}));
                                        }
                                    });
                                }
                            })

                            break;
                        case "share":
                            //this.setState({sharedUrl: message.param, isShowSharebox: true});
                            if(message.affcode&&message.affcode.length>0){
                                message.param = TW_Store.bblStore.appShareUrl+"&affCode="+message.affcode;
                            }
                            TW_Store.gameUIStroe.shareData = message;

                            let shareData = message;
                            let isFast = shareData.isfast =="1"||shareData.type;
                            if(isFast){
                                try {
                                    switch (shareData.type) {
                                        case "friend":
                                            TCUserOpenPayApp.onWXShare();
                                            break;
                                        case "circle":
                                            TCUserOpenPayApp.onWX_PYQ_SHARE();
                                            break;
                                    }
                                }catch (e) {
                                    TW_Store.gameUIStroe.checkWXInstall();
                                }
                            }else{
                                TW_Store.gameUIStroe.isShowShare = true;
                            }
                            break;
                        case  "closeApp":
                            TN_ExitApp();
                            break;
                        case "goToPay"://打开相关app
                            TCUserOpenPayApp.getInstance().openAppByType(message.param);
                            break;
                        case "appUpate":
                            TW_Store.dataStore.onRetartApp();
                            break;
                    }
                    break;
                case "startUpdate":
                    //{action: "startUpdate", gameId: 28, alias: "xywz"}
                    gameData=TW_Store.dataStore.getStoreGameDataByAlias(message.alias)
                    TW_Log(`startUpdate-----`,gameData);
                    if (gameData&&gameData.bupdate) {
                        TW_Store.dataStore.startLoadGame(gameData);
                    }
                    break;
                case "JumpGame":
                    let data = JSON.parse(TW_Base64.decode(this.getJumpData(message.payload)));
                    gameData=TW_Store.dataStore.getStoreGameDataByAlias(data.alias)
                    let isNeedLoad = false;
                    let isOrigan = false;
                    if (!gameData) {
                        // JXToast.showShortCenter(`${data.name} 暂未配置！`)
                        url = this.handleUrl(message.payload, gameData);
                        isOrigan = true
                    } else {
                        isNeedLoad = gameData ? gameData.bupdate : isNeedLoad;
                        url = this.handleUrl(message.payload, gameData);
                    }

                    TW_Log("FileTools---------data--isNeedLoad==-url==" + url + "----isNeedLoad===--" + isNeedLoad + "-----------gameData==", data);
                    if (!isNeedLoad && TW_Store.bblStore.lastGameUrl != url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData = this.getJumpData(message.payload);
                        TW_Store.bblStore.showGameCircle();
                        TW_Store.bblStore.subGameParams = {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isOrigan,
                            isThirdGame:false
                        }
                    }
                    break;
                case "JumpThirdGame"://跳转第三方游戏
                    url = TW_Base64.decode(message.data);
                    if (TW_Store.bblStore.lastGameUrl != url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.showGameCircle();
                        TW_Store.bblStore.subGameParams = {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isOrigan:true,
                            isThirdGame:true
                        }
                    }
                    break;
                case  "game_account":
                    TW_Store.gameUIStroe.isShowUserInfo = !TW_Store.gameUIStroe.isShowUserInfo;
                    break;
                case "showGame":
                    TW_Store.gameUpateStore.isEnteredGame = true;
                    setTimeout(() => {
                        if (TW_Store.dataStore.isAppSound) {
                            this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.stopMusic));
                        }
                    }, 2000)

                    break;
                case  "game_custom":
                    TW_Store.gameUIStroe.showGusetView(!TW_Store.gameUIStroe.isShowGuest);
                    break;
                case "game_redraw":
                    TW_Log("onMessage----custom---exitAppToLoginPage--SystemSetting.setVolume-")
                    TW_Store.gameUIStroe.isShowWithDraw = !TW_Store.gameUIStroe.isShowWithDraw;
                  //  SoundHelper.soundleMusic.setVolume(1);
                    break;
                case "game_back":
                    TW_Log("custom---exitAppToLoginPage")
                    TW_Store.userStore.exitAppToLoginPage();
                    this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.logout));
                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView = !TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case  "debugInfo":
                    let name = message.name ? message.name : "";
                    name = name.toLowerCase();
                    if (name == "111" && message.pwd == "222") {
                        TW_Store.bblStore.changeShowDebug(true);
                    }
                    break;
                case "http":
                    let method = message.metod;
                    method = method ? method.toLowerCase() : "get";
                    switch (method) {
                        case "post":
                            let myUrl = message.url;
                            NetUitls.postUrlAndParamsAndCallback(myUrl, JSON.parse(message.data), (ret) => {
                                //TW_Log("---home--http---game--postUrlAndParamsAndCallback>url="+message.url, ret);
                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                            }, 10, false, false, null, true, this.onParamHead(message.header))
                            break
                        case "get":
                            NetUitls.getUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                                let access_token = TW_GetQueryString("access_token", message.url);
                                if (ret.rs && access_token && access_token != "") {
                                    TW_Store.userStore.initLoginToken(access_token);
                                    // this.onFlushGameData();
                                }
                                if (message.url.indexOf("/api/v1/gamecenter/player/user") > -1) {
                                    TW_Store.bblStore.avatarData = ret.content
                                }
                                if (message.url.indexOf(HTTP_GAME_LIST) > -1) {
                                    if (ret.rs) {
                                        TW_Store.dataStore.onUpdateGameData(ret.content.datas);
                                    }
                                }
                                if (message.url.indexOf(HTTP_ACCOUNT) > -1) {
                                    if (ret.rs) {
                                        TW_Store.userStore.saveUserInfo(ret.content)
                                    }
                                }

                            }, 10, false, false, true, this.onParamHead(message.header));
                            break;
                        case "put":
                            NetUitls.putUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                            }, 10, false, true, this.onParamHead(message.header));
                            break;
                        case "delete":
                            NetUitls.deleteUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                            }, 10, false, true, this.onParamHead(message.header));
                            break;
                    }
            }
        }
    }

    onParamHead = (headDataList) => {
        let header = null;
        if (headDataList && headDataList.length > 0) {
            header = {}
            for (let i = 0; i < headDataList.length; i++) {
                if (i % 2 == 0 && headDataList[i + 1]) {
                    header[`${headDataList[i]}`] = headDataList[i + 1];
                }
            }
            TW_Log("onParamHead----" + headDataList.length, header)
        }
        return header
    }


    onLoadEnd = () => {
        TW_Store.bblStore.isLoading = false;
        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.windowResize, {}));
    }


    getJumpData = (data) => {
        TW_Log(" TW_Store.bblStore.jumpData==pre", data)
        let jumper = data.substr(data.indexOf("jumpData=") + 9);
        let sunIndex = jumper.indexOf("&");
        if (sunIndex > -1) {
            jumper = jumper.substring(0, sunIndex);
        }
        return jumper;
    }

    onEvaleJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        if (this.refs.myWebView) {
            this.refs.myWebView.postMessage(dataStr, "*");
        }
    }

    onError = (error) => {
        // if (TW_Store.dataStore.isAppInited) {
        //     TW_Store.dataStore.onRetartApp();
        // }
        TW_Log("onError======XXWebView=====event=====rr22", error)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest===========XXWebView====22=", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState====XXWebView=======onNavigationStateChange=====url==" + navState.url, navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            // title: navState.title,
            scalesPageToFit: false
        });
    };
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_W,
        height: SCREEN_H,
        backgroundColor: "black",
    },
    webView: {
        width: SCREEN_W,
        height: SCREEN_H,
        backgroundColor: "black"
    },
    viewShareBox: {
        zIndex: 1000,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});
