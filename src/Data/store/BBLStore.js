import {observable, action} from 'mobx';
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs';
import {platInfo, appDomainBase} from "../../config/appConfig";
import {config} from "../../Common/Network/TCRequestConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../../Data/TCUserOpenPayApp";
import {Clipboard, Alert} from "react-native";
import FileTools from "../../Common/Global/FileTools";
import BackgroundTimer from 'react-native-background-timer';
/**
 *app信息管理
 */
export default class BBLStore {
    @observable
    gameDomain = "";

    @observable
    loginDomain = "";

    @observable
    isLoading = true;

    @observable
    avatarData = null;

    @observable
    isDebugApp = false;

    @observable
    isSubGameRecharge = false

    @observable
    isEnterLooby = false;

    validDomain = [];

    storeDir = DocumentDirectoryPath;

    tempZipDir = `${DocumentDirectoryPath}/home.zip`;

    tempGameZip = `${DocumentDirectoryPath}/game.zip`;

    domainRetry = 0;

    percent=1;

    intervalId=null

    @observable
    versionManger = {
        name: 'home',
        versionNum: 1,
        source: 'gamelobby.zip',
        isFlush: false,
    };

    @observable
    subGameParams = {
        url: '',
        isGame: true,
        isOpenThirdWebView: false,
    };


    @observable
    isShowCircle = false;

    @observable
    netInfo = {
        delay: "",
        position: {top: 10, right: 50},
        isShow: "0"
    };

    @action
    getUriConfig() {
        return {
            url: {
                home: `${this.gameDomain}/g_lobby/home.html`,
                backlobby: `${this.gameDomain}/g_lobby/index.html`,
                apihome: `${this.gameDomain}/api/v1`,

                g_account: "../g_recharge/?module=account",
                g_recharge: "../g_recharge/?module=recharge",
                g_redraw: "../g_recharge/?module=redraw",
                g_custom: "../g_recharge/?module=custom",
                testcustomurl:
                    "https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1"
            },
        };
    }

    @observable
    jumpData = null;

    @observable
    debug_release_server = "";

    @action
    setNetInfo(payload) {
        //console.log('setNetInfo: payload', payload);
        this.netInfo = payload;
    }

    @action
    getVersionDomain() {
        let isSubWay = false;
        let subStrWay = `${TW_Store.appStore.subAppType}`;
        if (subStrWay.length > 0 && subStrWay != '0') {
            isSubWay = true;
        }
        let path = platInfo.zipCheckServer.release_server;
        let versionDomain =
            TW_Store.bblStore.gameDomain + platInfo.zipCheckServer.release_server;
        // if(TW_Store.appStore.isSitApp){
        //     versionDomain=platInfo.downDomain+path;
        // }else{
        if (path.indexOf('bbl_lobby') == -1) {
            versionDomain = TW_Store.bblStore.gameDomain + '/bbl_lobby' + path;
        }
        // }

        if (this.isDebugApp) {
            // versionDomain = this.debug_release_server;
        } else {
            if (isSubWay) {
                versionDomain = versionDomain + '/qudao';
            } else {
                versionDomain = versionDomain;
            }
        }
        TW_Log('versionDomain----getVersionDomain---', versionDomain);
        return versionDomain;
    }

    @action
    getVersionConfig() {
        return `${this.getVersionDomain()}` + '/game.json?random=' + Math.random();
    }

    @action
    showGameCircle(isShow = true) {
        if (TW_OnValueJSHome) {
            TW_OnValueJSHome(
                TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showLoading, {
                    data: isShow,
                    alpha: 0.5,
                })
            );
        }
        this.isShowCircle = isShow;
    }

    @action
    enterSubGame() {
        TW_Log("enterSubGame-", TW_Store.gameUpateStore.isInSubGame)
        if (!TW_Store.gameUpateStore.isInSubGame) {
            TW_Store.bblStore.lastGameUrl = "";
            TW_Store.gameUpateStore.isInSubGame = true;
            TN_JUMP_RN()
            if (TW_OnValueJSHome) {
                TW_OnValueJSHome(
                    TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.enterGame)
                );
                TW_OnValueJSHome(
                    TW_Store.bblStore.getWebAction(
                        TW_Store.bblStore.ACT_ENUM.stopMusic,
                        {}
                    )
                );
            }
        }
    }

    @action
    quitSubGame(message = {}) {
        TW_Log('message---quitSubGame-222-', message);
        TN_JUMP_HOME();
        this.subGameParams = {
            url: '',
            isGame: true
        };

        if (TW_OnValueJSHome) {
            TW_OnValueJSHome(
                TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lobbyResume, {
                    ...message,
                })
            );
        }
        TW_Store.gameUpateStore.isInSubGame = false;
    }

    @observable
    lastGameUrl = "home";

    ACT_ENUM = {
        logout: 'logout',
        playMusic: 'playMusic',
        stopMusic: 'stopMusic',
        windowResize: 'windowResize',
        appData: 'appData',
        http: 'http',
        flushMoney: 'flushMoney',
        gameData: 'gameData',
        gamesinfo: 'gamesinfo',
        updateProgress: 'updateProgress',
        setrawroot: 'setrawroot', //设置声音根目录
        playsoundByFile: 'playsound', //通过文件名播放声音
        playmusicByFile: 'playmusic', //通过文件名播放背景音乐
        onBlur: 'onBlur',
        lobbyResume: 'lobbyResume',
        game_loading: 'game_loading',
        showGame: 'showGame',
        bindPhone: 'bindPhone',
        lifecycle: 'lifecycle',
        showMask: 'showMask',
        shareSucess: 'shareSucess',
        openBindCard: 'openBindCard',
        openBindAlipay: 'openBindAlipay',
        showLoading: 'showLoading',
        enterGame: 'enterGame',
        openDebug: 'openDebug',
        wxLogin: 'wxLogin',
        popTip: 'popTip',
        affcode: 'affcode',
        appNativeData: 'appNativeData',
        showRecharge: 'showRecharge',
        showService: 'showService',
        showWithdraw: 'showWithdraw',
        appUpate: 'appUpate',
        game_recharge: "game_recharge",
        runJS: "runJS",
        loadingView: "loadingView",
        gtestBack:"gtestBack"
    };

    //bgm.mp3 click.mp3 close.mp3 flopleft.mp3 flopright.mp3 recharge.mp3 rightbottomclose.mp3 showlogo.mp3
    SOUND_ENUM = {
        bgm: 'bgm.ogg',
        click: 'click.ogg',
        close: 'close.ogg',
        flopleft: 'flopleft.ogg',
        flopright: 'flopright.ogg',
        recharge: 'recharge.ogg',
        rightbottomclose: 'rightbottomclose.ogg',
        showlogo: 'showlogo.ogg',
        enterPanelClick: 'enterPanelClick.ogg',
        sfx_click: 'sfx_click.ogg',
        returnLobbyClick: 'returnLobbyClick.ogg'
    };

    @action
    playSoundByFile(file: String, isMusic = false) {
        if (TW_OnValueJSHome) {
            if (isMusic) {
                TW_OnValueJSHome(
                    TW_Store.bblStore.getWebAction(
                        TW_Store.bblStore.ACT_ENUM.playmusicByFile,
                        {data: file}
                    )
                );
            } else {
                TW_OnValueJSHome(
                    TW_Store.bblStore.getWebAction(
                        TW_Store.bblStore.ACT_ENUM.playsoundByFile,
                        {data: file}
                    )
                );
            }
        }
    }

    @action
    getWebAction(act: String, param = {}) {
        return {...param, action: act};
    }

    @action
    changeShowDebug(state) {
        this.isDebugApp = state;
    }

    @action
    getHeadIcoUrl() {
    }

    @observable
    shareURL = {ios: '', android: ''};

    @observable
    shareData = {};

    @observable
    appShareUrl = '';

    @action
    getAppData() {
        let url =
            TW_Store.bblStore.gameDomain +
            config.api.gameShareDown.replace('#0', platInfo.brand);
        let downUrl = '';
        NetUitls.getUrlAndParamsAndCallback(
            url,
            null,
            ret => {
                if (ret.rs && ret.content) {
                    this.shareData = ret.content;
                    this.shareURL.ios = this.shareData.iosShareUrl
                        ? this.shareData.iosShareUrl
                        : ' ';
                    this.shareURL.android = this.shareData.androidShareUrl
                        ? this.shareData.androidShareUrl
                        : ' ';
                    this.appShareUrl = this.shareData.appShareUrl;
                    TW_Store.appStore.onShowDownAlert(this.appShareUrl + "&isFore=1");
                    TW_Store.gameUIStroe.gustWebUrl = this.shareData.customerServiceUrl;

                }
                //let downUrl =  iosDownloadUrl
                TW_Log(
                    '---getUrlAndParamsAndCallback--getAppData--downUrl==this.appShareUrl--' +
                    this.appShareUrl +
                    '==\n=\n=' +
                    downUrl,
                    ret.content
                );
            },
            10,
            false,
            false
        );
    }

    @action
    getBrandUrl() {
        let url = TW_Store.bblStore.gameDomain + config.api.gameShareDown.replace('#0', platInfo.brand);
        return url;
    }

    onMsgHandle = msg => {
        let message = JSON.parse(msg);
        TW_Log('onMessage======GameLobby=====>>' + '\n', message);
        let appDataJson=null;
        if (message && message.action) {
            switch (message.action) {
                case "gameUrlError":
                    if (this.domainRetry <= 3) {
                        let appDataJson=this.getAPPJsonData();
                        let gameDomainStar = `appCallBack('${appDataJson.gameUrl}')`;
                        TW_Data_Store.setItem(TW_DATA_KEY.LobbyReadyOK, "null");
                        TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.runJS, {data: gameDomainStar,gameData:JSON.stringify(appDataJson)}));
                    } else {
                        TN_JUMP_RN();
                        Alert.alert(
                            "当前网络不稳定 无法正常体验游戏，请重启app尝试看看?",
                            "",
                            [
                                {
                                    text: "了解",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                }
                            ],
                            {cancelable: false}
                        );
                    }
                    break;
                case "nativeStart":
                    TW_SplashScreen_HIDE();
                    TW_Data_Store.getItem(TW_DATA_KEY.LobbyReadyOK, (err, dataStr) => {
                        let gameData = null
                        try {
                            gameData = JSON.parse(dataStr)
                        } catch (e) {
                            gameData = null
                        }
                        if (!gameData) {
                            TW_Log("nativeStart---sava--beugim" + gameData)
                            TW_Data_Store.setItem(TW_DATA_KEY.LobbyReadyOK, JSON.stringify(this.getAPPJsonData()));
                        }
                    });
                    break;
                case "game_common":
                    let actions = message.name || message.do;
                    switch (actions) {
                        case "onGameInit":
                            this.isEnterLooby = true;
                            break;
                        case "saveToPhone":
                            Tools.onSaveScreenPhone();
                            break;
                        case "loginout":
                            TW_Store.userStore.exitAppToLoginPage();
                            break;
                        case "openWeb":
                            TCUserOpenPayApp.linkingWeb(message.param);
                            break;
                        case "openAppWeb":
                            // TN_JUMP_RN();
                            TW_Store.bblStore.subGameParams = {
                                url: message.param,
                                isShowReload: true,
                                type: message.type,
                                isOpenThirdWebView: true,
                                isPaddingTop: false
                            };
                            //TW_NavHelp.pushView(JX_Compones.TWThirdWebView,{url:message.param,isShowReload:true,type:message.type,isPaddingTop:false})
                            break;
                        case "customerService":
                            TW_Store.bblStore.subGameParams = {
                                url: TW_Store.gameUIStroe.gustWebUrl,
                                isShowReload: false,
                                type: message.type,
                                isOpenThirdWebView: true,
                            };
                            //TW_NavHelp.pushView(JX_Compones.TWThirdWebView,{url:TW_Store.gameUIStroe.gustWebUrl,isShowReload:false,type:"guest"});
                            break;
                        case "copylink":
                            Clipboard.setString(message.param);
                            let hintStr = "已复制成功!";
                            if (message.hint && message.hint.length > 0) {
                                hintStr = message.hint;
                            }
                            TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.popTip, {data: hintStr}));
                            break;
                        case "openDebug":
                            TN_MSG_TO_GAME(
                                TW_Store.bblStore.getWebAction(
                                    TW_Store.bblStore.ACT_ENUM.openDebug,
                                    {}
                                )
                            );
                            break;
                        case "saveImage":
                            FileTools.onSaveCameraRoll(message.param);
                            break;
                        case "wxLogin":
                            TW_Store.gameUIStroe.checkWXInstall(ret => {
                                TW_Log(' wxLogin checkWXInstall--', ret);
                                TW_Store.dataStore.log +=
                                    "\n\n==> wxLogin checkWXInstall---" + ret;
                                if (ret) {
                                    TN_WechatAuth((code, result, message) => {
                                        //TW_Store.dataStore.log += "\n==> wxLogin message---" + JSON.stringify(result) + "---\n--code====" + code + "===message==" + message;
                                        TW_Log(
                                            'wxLogin code----' + code + '---message---' + message,
                                            result
                                        );
                                        if (result) {
                                            if (code == 200 || code == 0) {
                                                TN_MSG_TO_GAME(
                                                    TW_Store.bblStore.getWebAction(
                                                        TW_Store.bblStore.ACT_ENUM.wxLogin,
                                                        {data: result}
                                                    )
                                                );
                                            } else {
                                                TN_MSG_TO_GAME(
                                                    TW_Store.bblStore.getWebAction(
                                                        TW_Store.bblStore.ACT_ENUM.popTip,
                                                        {data: '微信授权异常!'}
                                                    )
                                                );
                                            }
                                        } else {
                                            TN_MSG_TO_GAME(
                                                TW_Store.bblStore.getWebAction(
                                                    TW_Store.bblStore.ACT_ENUM.popTip,
                                                    {data: '微信授权异常!'}
                                                )
                                            );
                                        }
                                    });
                                }
                            });

                            break;
                        case "share":
                            //this.setState({sharedUrl: message.param, isShowSharebox: true});
                            if (message.affcode && message.affcode.length > 0) {
                                message.param =
                                    this.appShareUrl + '&affCode=' + message.affcode;
                            }
                            TW_Store.gameUIStroe.shareData = message;
                            let shareData = message;
                            try {
                                switch (shareData.type) {
                                    case "friend":
                                        TCUserOpenPayApp.onWXShare();
                                        break;
                                    case "circle":
                                        TCUserOpenPayApp.onWX_PYQ_SHARE();
                                        break;
                                }
                            } catch (e) {
                                TW_Store.gameUIStroe.checkWXInstall();
                            }
                            break;
                        case "closeApp":
                            TN_ExitApp();
                            break;
                        case 'goToPay': //打开相关app
                            TCUserOpenPayApp.getInstance().openAppByType(message.param);
                            break;
                        case "appUpate":
                            TW_Store.dataStore.onRetartApp();
                            break;

                        case "closeRecharge":
                            if (TW_Store.bblStore.isSubGameRecharge) {
                                TW_Store.bblStore.isSubGameRecharge = false;
                                TN_JUMP_RN();
                            }
                            break;
                        case "gtest":
                            appDataJson=this.getAPPJsonData();
                            let params = message.params;
                            let url=appDataJson.gameUrl.replace("/index.js","/gtest.html")
                             url=`${url}?${params}`
                            if (TW_Store.bblStore.lastGameUrl != url) {
                                TW_Store.bblStore.lastGameUrl = url;
                                TW_Store.bblStore.subGameParams = {
                                    url,
                                    isOrigan: true,
                                    isThirdGame: true,
                                    isGtestWeb:true
                                };
                            }
                    }
                    break;
                case "JumpGame":
                    let url = message.gamePath;
                    let isOrigan = TW_Store.appStore.isSitApp ? true : false;
                    TW_Store.bblStore.lastGameUrl = url;
                    let jumpData = this.getJumpData(message.payload);
                    if (url.indexOf("?") > -1) {
                        url = url + "&jumpData=" + jumpData + "&app=" + (G_IS_IOS ? "ios" : "android");
                    } else {
                        url = url + "?jumpData=" + jumpData + "&app=" + (G_IS_IOS ? "ios" : "android");
                    }
                    if (G_IS_IOS) {
                        url = url.replace("file://", "");
                    }
                    TW_Store.bblStore.subGameParams = {
                        url,
                        isOrigan,
                        jumpData,
                        isThirdGame: false
                    };
                    TW_Log("JumpGame== TW_Store.bblStore.subGameParams===", TW_Store.bblStore.subGameParams)
                    break;
                case 'JumpThirdGame': //跳转第三方游戏
                    url = TW_Base64.decode(message.data);
                    if (TW_Store.bblStore.lastGameUrl != url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.subGameParams = {
                            url,
                            isOrigan: true,
                            isThirdGame: true
                        };
                    }
                    break;
                case "showGame":
                    TW_SplashScreen_HIDE();
                    clearInterval(TW_Store.appStore.timeClearId);
                    clearInterval(this.intervalId);
                    BackgroundTimer.clearInterval(this.intervalId);
                    break;
                case "http":
                    let method = message.metod;
                    method = method ? method.toLowerCase() : "get";
                    switch (method) {
                        case "post":
                            let myUrl = message.url;
                            let dataJson = JSON.parse(message.data);
                            NetUitls.postUrlAndParamsAndCallback(myUrl, dataJson, (ret) => {
                                if (dataJson && message.url.indexOf("account/users/secure/gameAppEncryptLogin") > -1) {

                                    let username = dataJson.username;
                                    TW_Log("gameAppEncryptLogin---------message.data-------username--" + username, dataJson)
                                    if (username && username == "Test070") {
                                        TW_Store.bblStore.changeShowDebug(true);
                                    }
                                }
                                //TW_Log("---home--http---game--postUrlAndParamsAndCallback>url="+message.url, ret);
                                TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                            }, 10, false, false, null, true, this.onParamHead(message.header))
                            break
                        case "get":
                            NetUitls.getUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                                let access_token = TW_GetQueryString("access_token", message.url);
                                if (ret.rs && access_token && access_token != "") {
                                    TW_Store.userStore.initLoginToken(access_token);
                                }
                            }, 10, false, false, true, this.onParamHead(message.header));
                            break;
                        case "put":
                            NetUitls.putUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                            }, 10, false, true, this.onParamHead(message.header));
                            break;
                        case "delete":
                            NetUitls.deleteUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http, {hashUrl: message.hashUrl, ...ret}));
                            }, 10, false, true, this.onParamHead(message.header));
                            break;
                    }
            }
        }
    };

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

    getJumpData = data => {
        TW_Log(' TW_Store.bblStore.jumpData==pre', data);
        let jumper = data.substr(data.indexOf("jumpData=") + 9);
        let sunIndex = jumper.indexOf("&");
        if (sunIndex > -1) {
            jumper = jumper.substring(0, sunIndex);
        }
        return jumper;
    };

    getAPPJsonData = () => {
        return {
            isApp: true,
            isLobbyOk: TW_Store.appStore.appSaveData ? "true" : "false",
            brandID: platInfo.brand,
            brandUrl: this.getBrandUrl(),
            clientId: TW_Store.appStore.clindId,
            urlJSON: this.getUriConfig(),
            isAndroidHack: TW_Store.appStore.isInAnroidHack,
            hackData: {filterGameList: ["zjh", "lhd", "bjl", "pg", "jlbsh", "tto", "erbg"]},
            deviceToken: TW_Store.appStore.deviceToken,
            pureDomain: TW_Store.bblStore.gameDomain,
            loginDomain: TW_Store.bblStore.loginDomain + "/api/v1/account",
            gameDomain: TW_Store.bblStore.gameDomain + "/api/v1/gamecenter",
            affCode: TW_Store.appStore.userAffCode,
            ver: TW_Store.appStore.appVersion,
            appVersion: TW_Store.appStore.versionHotFix + (!G_IS_IOS && TW_Store.appStore.subAppType != "0" ? ` - ${TW_Store.appStore.subAppType}` : ""),
            specialVersionHot: parseInt(TW_Store.appStore.specialVersionHot),
            apihome: `${TW_Store.bblStore.gameDomain}/api/v1`,
            gameUrl: `${this.getVersionDomain()}/index.js`,
            sit: "5",
            uat: "214",
        }
    };


    @action
    enterGameLobby = (appData, isSaveDate = false) => {
        TW_Log("appDataStr===enterGameLobby====", appData);
        let appDataStr = JSON.stringify(appData);
        TN_OpenHome(appDataStr);
        this.getAppData();
        if (!isSaveDate) {
            // if(TW_Store.appStore.appSaveData){
            //     BackgroundTimer.setTimeout(()=>{
            //         TW_Log("saveAppData.pureDomain--"+TW_Store.appStore.appSaveData.pureDomain,TW_Store.bblStore.validDomain);
            //         if(TW_Store.bblStore.validDomain.indexOf(TW_Store.appStore.appSaveData.pureDomain)==-1){
            //             TW_Data_Store.setItem(TW_DATA_KEY.LobbyReadyOK, JSON.stringify(this.getAPPJsonData()));
            //         }
            //     },6000)
            // }
            TW_Log("enterGameLobby-----this.isEnterLooby--" + this.isEnterLooby)
            if (this.isEnterLooby) {
                setTimeout(() => {
                    TN_MSG_TO_GAME(
                        TW_Store.bblStore.getWebAction(
                            TW_Store.bblStore.ACT_ENUM.appNativeData,
                            {data: appData}
                        )
                    );
                }, 2000);
            } else {
              this.percent = 1;
                TW_Log("TN_MSG_TO_GAME---BackgroundTimer=-start")
                if(G_IS_IOS){
                    TW_SplashScreen_HIDE();
                    clearInterval(TW_Store.appStore.timeClearId);
                    this.intervalId = setInterval(this.onGameUpdataHind, 1000)
                }else{
                    this.intervalId = BackgroundTimer.setInterval(this.onGameUpdataHind, 1000);
                }
            }
        }
    }

    onGameUpdataHind=()=>{
        TW_Log("TN_MSG_TO_GAME---enterGameLobby====" + this.percent)
        this.percent += 1;
        if(this.percent<=99){
            TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.loadingView, {
                data: "正在获取更新中...",
                percent:this.percent
            }));
        }
    }


}
