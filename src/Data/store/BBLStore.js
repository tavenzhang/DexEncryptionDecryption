
import { observable,action} from 'mobx'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import {platInfo,appDomainBase} from "../../config/appConfig";
import {config} from "../../Common/Network/TCRequestConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";

/**
 *app信息管理
 */
export  default  class BBLStore {

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

    tempZipDir=`${DocumentDirectoryPath}/home.zip`;

    tempGameZip=`${DocumentDirectoryPath}/game.zip`;

    @observable
    versionManger = {name:"home",versionNum:1,source:'gamelobby.zip',isFlush:false}

    @observable
    subGameParams={
        url:"",
        isGame: true
    }
    @observable
    isShowCircle=false;

    @observable
    netInfo={
        delay: "",
        position: { top: 10, right: 50 },
        isShow: "0"
    }

    @action
    getUriConfig(){
        return {
            url: {
                "home": `${this.gameDomain}/g_lobby/home.html`,
                "backlobby": `${this.gameDomain}/g_lobby/index.html`,
                "apihome": `${this.gameDomain}/api/v1`,

                "g_account": "../g_recharge/?module=account",
                "g_recharge": "../g_recharge/?module=recharge",
                "g_redraw": "../g_recharge/?module=redraw",
                "g_custom": "../g_recharge/?module=custom",
                "testcustomurl": "https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1"
            },
        }
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
        let subStrWay=`${TW_Store.appStore.subAppType}`;
        if(subStrWay.length>0&&subStrWay!="0"){
            isSubWay = true;
        }
        let path= platInfo.zipCheckServer.release_server
        let versionDomain = TW_Store.bblStore.gameDomain+platInfo.zipCheckServer.release_server;
        if(TW_Store.appStore.isSitApp||TW_Store.appStore.clindId == "214"){
            versionDomain=platInfo.downDomain+path;
        }else{
            if(path.indexOf("bbl_lobby")==-1){
                versionDomain =  TW_Store.bblStore.gameDomain+"/bbl_lobby/"+path
            }
        }

        if(this.isDebugApp){
           // versionDomain = this.debug_release_server;
        }else{
            if(isSubWay){
                versionDomain= versionDomain+"/qudao"
            }else{
                versionDomain=versionDomain
            }
        }
        TW_Log("versionDomain----getVersionDomain---",versionDomain)
        return versionDomain;
    }



    @action
    getVersionConfig () {
        return `${this.getVersionDomain()}`+"/game.json?random="+Math.random();
    }

    @action
    showGameCircle(isShow=true) {
        if(TW_OnValueJSHome){
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showLoading,{data:isShow,alpha:0.5}));
        }
        this.isShowCircle =isShow;
    }


    @action
    enterSubGame() {
        if (!TW_Store.gameUpateStore.isInSubGame) {
            TW_Store.bblStore.lastGameUrl = "";
            TW_Store.gameUpateStore.isInSubGame = true;
            this.showGameCircle(false);
            if (TW_OnValueJSHome) {
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.enterGame));
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.stopMusic, {}));
                if (TW_Store.dataStore.isAppSound) {
                    SoundHelper.pauseMusic();
                }
            }
        }
    }


    @action
    quitSubGame(message={}) {
        TW_Log("message---quitSubGame--",message)
       this.subGameParams={
            url:"",
            isGame: true
        }
        if (TW_OnValueJSHome) {
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: true}));
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lobbyResume,{...message}));
        }
        setTimeout(()=>{ TW_Store.gameUpateStore.isInSubGame = false;},G_IS_IOS ? 500:800)
        if (TW_Store.dataStore.isAppSound) {
            SoundHelper.onCheckPalyMusic();
        }
    }

    @action
    isInSubGame() {
       return   this.subGameParams.url&&this.subGameParams.url.length >0;

    }


    @observable
    lastGameUrl = "home";


    ACT_ENUM = {
        logout:"logout",
        playMusic:"playMusic",
        stopMusic:"stopMusic",
        windowResize:"windowResize",
        appData:"appData",
        http:"http",
        flushMoney:"flushMoney",
        gameData:"gameData",
        gamesinfo:"gamesinfo",
        updateProgress:"updateProgress",
        setrawroot:"setrawroot",//设置声音根目录
        playsoundByFile:"playsound",//通过文件名播放声音
        playmusicByFile:"playmusic",//通过文件名播放背景音乐
        onBlur:"onBlur",
        lobbyResume:"lobbyResume",
        game_loading:"game_loading",
        showGame:"showGame",
        bindPhone:"bindPhone",
        lifecycle:"lifecycle",
        showMask:"showMask",
        shareSucess:"shareSucess",
        openBindCard:"openBindCard",
        openBindAlipay:"openBindAlipay",
        showLoading:"showLoading",
        enterGame:"enterGame",
        openDebug:"openDebug",
        wxLogin:"wxLogin",
        popTip:"popTip",
        affcode:"affcode",
        appNativeData:"appNativeData",
        showRecharge:"showRecharge",
        showService:"showService",
        showWithdraw:"showWithdraw",
        appUpate:"appUpate"
    }

    //bgm.mp3 click.mp3 close.mp3 flopleft.mp3 flopright.mp3 recharge.mp3 rightbottomclose.mp3 showlogo.mp3
    SOUND_ENUM={
        bgm:"bgm.mp3",
        click:"click.mp3",
        close:"close.mp3",
        flopleft:"flopleft.mp3",
        flopright:"flopright.mp3",
        recharge:"recharge.mp3",
        rightbottomclose:"rightbottomclose.mp3",
        showlogo:"showlogo.mp3",
        enterPanelClick:"enterPanelClick.mp3",
        sfx_click:"sfx_click.mp3",
        returnLobbyClick:"returnLobbyClick.mp3"
    }

    @action
    playSoundByFile(file:String,isMusic=false){
        if(TW_OnValueJSHome){
            if(isMusic){
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.playmusicByFile, {data: file}));
            }else{
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.playsoundByFile, {data: file}));
            }
        }
    }

    @action
    getWebAction(act:String,param={}){
        return {...param,action:act}
    }

    @action
    changeShowDebug(state) {
        this.isDebugApp =state;
    }

    @action
    getHeadIcoUrl(){
        //{"content":{"userId":1107,"avatar":"3","firstLogin":false,"userState":"NORMAL"},"rs":true,}

        let avatarId =  this.avatarData&&this.avatarData.avatar ? this.avatarData.avatar:"01"
        if(avatarId.length<2){
            avatarId="0"+avatarId
        }
        let url= `https://download.jingjingxiao.com/game/gameImage/head/img_touxiang_${avatarId}.jpg`;
        TW_Log("getHeadIcoUrl--------url--"+url,this.avatarData)
        return url
       // uri:"https://download.jingjingxiao.com/game/gameImage/head/img_touxiang_01.jpg"}
    }

    @observable
    shareURL={ios:"",android:""}

    @observable
    shareData={}

    @observable
    appShareUrl=""


    @action
    getAppData(){
        let  url = TW_Store.bblStore.gameDomain+ config.api.gameShareDown.replace("#0",platInfo.brand);
        let downUrl="";
        NetUitls.getUrlAndParamsAndCallback(url, null, (ret) => {
            if(ret.rs&&ret.content){
                this.shareData = ret.content;
                this.shareURL.ios=this.shareData.iosShareUrl ? this.shareData.iosShareUrl:" ";
                this.shareURL.android=this.shareData.androidShareUrl ? this.shareData.androidShareUrl:" ";
                downUrl = G_IS_IOS ? this.shareData.iosDownloadUrl:this.shareData.androidDownloadUrl;
                downUrl = downUrl ? downUrl:"";
                if(downUrl.indexOf("?")>-1){
                    downUrl = downUrl+"&random="+Math.random();
                }else{
                    downUrl = downUrl+"?random="+Math.random();
                }
                TW_Store.appStore.onShowDownAlert(downUrl);
                TW_Store.gameUIStroe.gustWebUrl = this.shareData.customerServiceUrl;
                this.appShareUrl= this.shareData.appShareUrl;
            }
            //let downUrl =  iosDownloadUrl
            TW_Log("---getUrlAndParamsAndCallback--getAppData--downUrl==this.appShareUrl--"+this.appShareUrl+"==\n=\n="+downUrl,ret.content);
        },10,false,false);
    }

    @action
    getBrandUrl(){
        let  url = TW_Store.bblStore.gameDomain+ config.api.gameShareDown.replace("#0",platInfo.brand);
        return url
    }

    getAppNativeData() {
        return {
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
            specialVersionHot:parseInt(TW_Store.appStore.specialVersionHot),
            isNewApp: G_IS_IOS ? true : false
        }
    }




}

