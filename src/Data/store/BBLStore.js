import {observable, action} from 'mobx';
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs';
import {platInfo, appDomainBase} from "../../config/appConfig";
import {config} from "../../Common/Network/TCRequestConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../../Page/UserCenter/UserPay/TCUserOpenPayApp";
import {Clipboard,} from "react-native";
import Toast from "../../Common/JXHelper/JXToast";
import FileTools from "../../Common/Global/FileTools";

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

    storeDir = DocumentDirectoryPath;

    tempZipDir = `${DocumentDirectoryPath}/home.zip`;

    tempGameZip = `${DocumentDirectoryPath}/game.zip`;

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
        isGame: true
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

        //console.log('setNetInfo: netInfo', this.netInfo);
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
        if (!TW_Store.gameUpateStore.isInSubGame) {
            TW_Store.bblStore.lastGameUrl = "";
            TW_Store.gameUpateStore.isInSubGame = true;
            this.showGameCircle(false);
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
        TW_Log('message---quitSubGame--', message);
        this.subGameParams = {
            url: '',
            isGame: true
        };
        TN_JUMP_HOME("");
        if (TW_OnValueJSHome) {
            TW_OnValueJSHome(
                TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lobbyResume, {
                    ...message,
                })
            );
        }
        TW_Store.gameUpateStore.isInSubGame = false;
    }

    @action
    isInSubGame() {
        return this.subGameParams.url && this.subGameParams.url.length > 0;
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
        appUpate: 'appUpate'
    };

    //bgm.mp3 click.mp3 close.mp3 flopleft.mp3 flopright.mp3 recharge.mp3 rightbottomclose.mp3 showlogo.mp3
    SOUND_ENUM = {
        bgm: 'bgm.mp3',
        click: 'click.mp3',
        close: 'close.mp3',
        flopleft: 'flopleft.mp3',
        flopright: 'flopright.mp3',
        recharge: 'recharge.mp3',
        rightbottomclose: 'rightbottomclose.mp3',
        showlogo: 'showlogo.mp3',
        enterPanelClick: 'enterPanelClick.mp3',
        sfx_click: 'sfx_click.mp3',
        returnLobbyClick: 'returnLobbyClick.mp3'
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
                    downUrl = G_IS_IOS
                        ? this.shareData.iosDownloadUrl
                        : this.shareData.androidDownloadUrl;
                    downUrl = downUrl ? downUrl : '';
                    if (downUrl.indexOf('?') > -1) {
                        downUrl = downUrl + '&random=' + Math.random();
                    } else {
                        downUrl = downUrl + '?random=' + Math.random();
                    }
                    TW_Store.appStore.onShowDownAlert(downUrl);
                    TW_Store.gameUIStroe.gustWebUrl = this.shareData.customerServiceUrl;
                    this.appShareUrl = this.shareData.appShareUrl;
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
        let message=JSON.parse(msg);
        TW_Log('onMessage======GameLobby=====>>' + '\n', message);
        let url = "";
        let gameData = null;
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "game_common":
                    let actions = message.name || message.do;
                    TW_Log('game---ct==', message);
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
                        case "openAppWeb":
                            //TW_NavHelp.pushView(JX_Compones.TWThirdWebView,{url:message.param,isShowReload:true,type:message.type,isPaddingTop:false})
                            break;
                        case "copylink":
                            Clipboard.setString(message.param);
                            let hintStr="已复制成功!";
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
                            let isFast = shareData.isfast == '1' || shareData.type;
                            if (isFast) {
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
                            } else {
                                TW_Store.gameUIStroe.isShowShare = true;
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
                        case "customerService":
                            // TN_OpenHome("test")
                            // TW_NavHelp.pushView(JX_Compones.TWThirdWebView,{url:TW_Store.gameUIStroe.gustWebUrl,isShowReload:false,type:"guest"});
                            break;
                    }
                    break;
                case "JumpGame":
                    let url=message.gamePath;
                    let isOrigan=false;
                    TW_Store.bblStore.lastGameUrl = url;
                       let jumpData = this.getJumpData(message.payload);
                        TW_Store.bblStore.showGameCircle();
                        url=url+"?jumpData="+jumpData;
                        TW_Store.bblStore.subGameParams = {
                            url,
                            isOrigan,
                            jumpData,
                            isThirdGame: false
                        };
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
                case "game_account":
                    TW_Store.gameUIStroe.isShowUserInfo = !TW_Store.gameUIStroe
                        .isShowUserInfo;
                    break;
                case "game_custom":
                    TW_Store.gameUIStroe.showGusetView(!TW_Store.gameUIStroe.isShowGuest);
                    break;
                case "game_redraw":
                    TW_Store.gameUIStroe.isShowWithDraw = !TW_Store.gameUIStroe.isShowWithDraw;
                    break;
                case "game_back":
                    TW_Log('custom---exitAppToLoginPage');
                    TW_Store.userStore.exitAppToLoginPage();
                    TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.logout));
                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView = !TW_Store.gameUIStroe.isShowAddPayView;
                    break;
            }
        }
    };

    getJumpData = data => {
        TW_Log(' TW_Store.bblStore.jumpData==pre', data);
        let jumper = data.substr(data.indexOf("jumpData=") + 9);
        let sunIndex = jumper.indexOf("&");
        if (sunIndex > -1) {
            jumper = jumper.substring(0, sunIndex);
        }
        return jumper;
    };
}
