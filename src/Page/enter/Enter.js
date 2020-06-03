import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    AsyncStorage,
    AppState, StatusBar,
    NativeModules
} from 'react-native';

import Moment from 'moment'
import CodePush from 'react-native-code-push'
import DeviceInfo from 'react-native-device-info';
import * as Progress from 'react-native-progress';
import { observer } from 'mobx-react'
import Storage from '../../Common/Global/TCStorage'
import G_Config from '../../Common/Global/G_Config'
import App from '../Route/App';
import Orientation from 'react-native-orientation';

import {Size } from '../resouce/theme'
import StartUpHelper from './StartUpHelper'
import KeepAwake from 'react-native-keep-awake';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import BackgroundTimer from 'react-native-background-timer';
let retryTimes = 0;
let downloadTime = 0
let alreadyInCodePush = false
import JXDomainsHelper from "../../Common/JXHelper/JXDomainsHelper";
import {AppConfig, platInfo} from "../../config/appConfig";
import { JX_PLAT_INFO } from "../asset";
import { SoundHelper } from "../../Common/JXHelper/SoundHelper";


let domainsHelper = new JXDomainsHelper();
let appInfoStore = TW_Store.appStore;
@observer
export default class Enter extends Component {

    constructor() {
        super();
        this.hotFixStore = TW_Store.hotFixStore;
        this.initDomain = this.initDomain.bind(this);
        TW_Store.appStore.regCallInitFuc(this.onInitAllData);
        this.flage = false
        this.isWeakUpdate = false;
        Orientation.addOrientationListener(this._onOrientationDidChange);
        TW_Log("_orientationDidChange--22233225--start-lockToLandscapeRight");
        if (G_IS_IOS) {
            if (TW_Store.appStore.isNewOrientation) {
                Orientation.lockToLandscape();
            } else {
                Orientation.lockToLandscapeRight();
            }
        }
    }

    _onOrientationDidChange = (orientation) => {
        TW_Log("_orientationDidChange-----orientation-PORTRAIT---lockToLandscape", orientation);
        if (orientation === 'PORTRAIT') {
            if (TW_Store.appStore.isLockToLandscape) {
                    if (G_IS_IOS) {
                        TW_Store.appStore.isNewOrientation ?    Orientation.lockToLandscape():Orientation.lockToLandscapeRight();
                    } else {
                        Orientation.lockToLandscape();
                    }
            }
        }
    }


    componentWillMount() {
        if (NativeModules.KCKeepAwake && KeepAwake.activate) {
            TW_Store.appStore.keepAwake = true;
            KeepAwake.activate();
        }
        //如果是android 在某些机器获取不到真实的SCREEN_H SCREEN_W 需要如下处理
        try {
            if (NativeModules.ExtraDimensions) {
                TW_Log("ExtraDimensions--getRealWindowHeight--" + ExtraDimensions.getRealWindowHeight(), SCREEN_H)
                TW_Log("ExtraDimensions--getRealWindowWidth--" + ExtraDimensions.getRealWindowWidth(), SCREEN_W)
                TW_Log("ExtraDimensions--getSoftMenuBarHeight--" + ExtraDimensions.getSoftMenuBarHeight())
                TW_Log("ExtraDimensions--getSmartBarHeight--" + ExtraDimensions.getSmartBarHeight())
                TW_Log("ExtraDimensions--isSoftMenuBarEnabled--" + ExtraDimensions.isSoftMenuBarEnabled())
                let rH = ExtraDimensions.getRealWindowHeight();
                let rW = ExtraDimensions.getRealWindowWidth();
                const deviceModel = DeviceInfo.getModel();
                TW_Log("Model--" + deviceModel)
                JX_PLAT_INFO.SCREEN_H = SCREEN_H = rH && rH > 0 ? rH : SCREEN_H;
                JX_PLAT_INFO.SCREEN_W = SCREEN_W = rW && rW > 0 ? rW : SCREEN_W;
                TW_Log("ExtraDimensions--JX_PLAT_INFO--SCREEN_W=="+SCREEN_W ,JX_PLAT_INFO);
                TW_Log("ExtraDimensions--JX_PLAT_INFO--SCREEN_H=="+SCREEN_H ,JX_PLAT_INFO)
                TW_Store.appStore.screenW = this.validateAndroidModel(deviceModel) ? rW - ExtraDimensions.getStatusBarHeight() : rW;
            }
        } catch (e) {
            TW_Store.dataStore.log += "\nExtraDimensions--error" + e;
        }
        AppState.addEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState) => {
        if (nextAppState != null && nextAppState === 'active') {
            TW_Store.dataStore.log += "\nAppStateChange-active\n";
            //如果属于强制更新状态 不触发active判断
            if (this.flage) {

                TW_Log("AppStateChange-active-----TW_Store.gameUpateStore.isInSubGame==="+TW_Store.gameUpateStore.isInSubGame);
                if (!TW_Store.gameUpateStore.isInSubGame) {
                    let now = new Date().getTime();
                    let dim = now - this.lastClickTime;
                    TW_Log("lastClickTime----" + this.lastClickTime + "---dim", dim)
                    if (dim >= 180000) { //从后台进入前台间隔大于3分钟 才进行大厅与app 更新检测
                        this.hotFix(TW_Store.hotFixStore.currentDeployKey, true);
                    }
                    TN_JUMP_HOME();
                    if (TW_Store.bblStore.isEnterLooby) {
                        TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lifecycle, { data: 1 }));
                    }
                } else {
                        TW_OnValueJSSubGame(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lifecycle, { data: 1 }));
                }
            }
            this.flage = false;
        } else if (nextAppState != null && nextAppState === 'background') {
            TW_Store.dataStore.log += "\nAppStateChange-background\n";
            TW_Log("AppStateChange-background--------nextAppState",nextAppState)
            this.flage = true;
            let now = new Date().getTime();
            this.lastClickTime = now;
            if (!TW_Store.gameUpateStore.isInSubGame) {
                if(TW_Store.bblStore.isEnterLooby){
                    TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lifecycle, { data: 0 }));
                }
            } else {
                TW_OnValueJSSubGame(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lifecycle, { data: 0 }));
            }
        }
    }


    onInitAllData = () => {
        this.isReloadAppDomain = false;
        this.uploadLog();
        //Orientation.unlockAllOrientations()
        if (G_IS_IOS) {
            appInfoStore.checkAppSubType(this.initDomain);
        } else {
            appInfoStore.checkAppSubType(this.initDomain);
        }
    }


    //域名异常启动介入
    reloadAppDomain() {
        TW_Log('reloadAppDomain--reloadAppDomain-')
        if (!this.isReloadAppDomain) {
            this.isReloadAppDomain = true;
            domainsHelper.getSafeguardName((ok) => {
                if (ok) {
                    //拿到d.json域名初始化
                    this.initDomain();
                    this.timer2 = setTimeout(() => {
                        if (this.state.syncMessage === '检测更新中...' || this.state.syncMessage === '初始化配置中...') {
                            this.hotFixStore.skipUpdate();
                        }
                    }, 2 * 1000)
                    this.setState({
                        updateFinished: false,
                        syncMessage: "初始化配置中...",
                        updateStatus: 0,
                    })
                } else {
                    TW_SplashScreen_HIDE();
                }
            })
        }
    }




    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
        this.timer2 && clearTimeout(this.timer2)
        AppState.removeEventListener('change', this._handleAppStateChange);
        //Orientation && this.orientationDidChange && Orientation.removeOrientationListener(this.orientationDidChange);
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }

    render() {
        let checkView = null
        if (!this.hotFixStore.updateFinished && this.hotFixStore.updateStatus === 0) {
            checkView = this.getLoadingView();
        } else if (!this.hotFixStore.updateFinished && this.hotFixStore.updateStatus === -1) {
            //checkView =this.updateFailView()
            checkView = null
        }
        return (<View style={{ flex: 1 ,background:"black"}}>
            <App />
            {checkView}
        </View>)
    }


    initDomain = () => {
        //如果不是处于android 特殊检测开关 强制开启this.hotFixStore.allowUpdate 开关
        if (!TW_Store.appStore.isInAnroidHack) {
            if (!this.hotFixStore.allowUpdate) {
                this.hotFixStore.allowUpdate = true;
            }
        }
        AsyncStorage.getItem('cacheDomain').then((response) => {
            TW_Log("refresh cache domain ", response);
            let cacheDomain = response ? JSON.parse(response) : null;
            if (cacheDomain != null && cacheDomain.serverDomains && cacheDomain.serverDomains.length > 0) {//缓存存在，
                StartUpHelper.getAvailableDomain(cacheDomain.serverDomains, this.cacheAttempt, this.initDomain, cacheDomain.currentDomain)
            } else {//缓存不存在，使用默认地址访问
                StartUpHelper.getAvailableDomain(AppConfig.domains, this.cacheAttempt, this.initDomain)
            }
        }).catch((error) => {
            StartUpHelper.getAvailableDomain(AppConfig.domains, this.cacheAttempt, this.initDomain)
        })
    }


    //使用默认地址
    firstAttempt(success, allowUpdate, message) {
        TW_Log(`first attempt ${success}, ${allowUpdate}, ${message}`);
        if (success) {
            this.httpResInit(allowUpdate)
        }
       if (!success && this.hotFixStore.allowUpdate) {//默认地址不可用，使用备份地址
            StartUpHelper.getAvailableDomain(AppConfig.backupDomains, this.secondAttempt, this.initDomain)
        } else {//不允许更新
            this.hotFixStore.skipUpdate();
        }
    }

    //使用默认备份地址
    secondAttempt = (success, allowUpdate, message) => {
        if (success) {
            this.httpResInit(allowUpdate)
        }
        if (!success && this.hotFixStore.allowUpdate) {//备份地址不可用
            // Toast User to change a better network and retry
            let customerMessage = "当前网络无法更新，可能是请求域名的问题"
            switch (message) {
                case 'NETWORK_ERROR':
                    customerMessage = "当前没有网络，请打开网络"
                    break
                case 'CONNECTION_ERROR':
                    customerMessage = "服务器无返回结果，DNS无法访问"
                    break
                case 'TIMEOUT_ERROR':
                    customerMessage = "当前网络差，请换更快的网络"
                    break
                case 'SERVER_ERROR':
                    customerMessage = "服务器错误"
                    break
                default:
                    break
            }
           // this.storeLog({ faileMessage: customerMessage });
            this.hotFixStore.updateFailMsg(customerMessage);
            this.reloadAppDomain()
        } else {
            // TODO 审核通过之后 放开如下，告知ip不在更新范围内的用户11
            // TODO 审核通过之后 放开如下，告知ip不在更新范围内的用户11
            // alert('您当前的区域无法更新')
            this.hotFixStore.skipUpdate()
        }
    }

    //使用缓存地址
    cacheAttempt = (success, allowUpdate, message) => {

        TW_Log(`first cacheAttempt ${success}, ${allowUpdate}, ${message}`);
        if (success) {
            this.httpResInit(allowUpdate)
        }
        else if (!success && this.hotFixStore.allowUpdate) {//缓存地址不可用,使用默认地址
            StartUpHelper.getAvailableDomain(AppConfig.domains, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message), this.initDomain);
        } else {
            this.hotFixStore.skipUpdate();
        }
    }

    httpResInit = (allowUpdate=false) => {
        if(allowUpdate&&this.hotFixStore.allowUpdate){
            this.gotoUpdate();
        }
       let newAppData=TW_Store.bblStore.getAPPJsonData();
        TW_Store.bblStore.enterGameLobby(newAppData);

    }

    //使用从服务器获取的更新地址更新app
    gotoUpdate() {
        AsyncStorage.getItem('cacheDomain').then((response) => {
            TW_Log("JXCodePushServerUrl----getItem")
            TW_Store.dataStore.log += "\ncacheDomain-----" + response + "---\n";
            let cacheDomain = JSON.parse(response);
            let hotfixDeploymentKey = ""
            let serveUrl = ""
            if (cacheDomain && cacheDomain.hotfixDomains.length > 0) {
                JXCodePushServerUrl = serveUrl = cacheDomain.hotfixDomains[0].domain
                hotfixDeploymentKey = G_IS_IOS ? cacheDomain.hotfixDomains[0].iosDeploymentKey : cacheDomain.hotfixDomains[0].androidDeploymentKey;
                TN_SetCodePushConifg(serveUrl);
            } else {
                if (TW_Store.appStore.isSitApp) {
                    JXCodePushServerUrl = serveUrl = "https://checkupdate5.v5maomao.com";
                    hotfixDeploymentKey = G_IS_IOS ? "SFqCY1LN7QUI8UUJ9YuxqZ1eUe8D4ksvOXqog" : "1O8CUrF2goHs7rBQ8LvO2l0zD3OS4ksvOXqog";
                    if (TW_Store.appStore.clindId == "4") {
                        hotfixDeploymentKey = G_IS_IOS ? "6v8k9AVacafOPgJXJvU4R9SsEKjH4ksvOXqog" : "jtPNawhwlrQZqGVuQec7MsLGg2D94ksvOXqog";
                    }
                    TN_SetCodePushConifg(serveUrl);
                }
            }
            TW_Log("JXCodePushServerUrl----cacheDomain", cacheDomain)
            TW_Store.hotFixStore.currentDeployKey = hotfixDeploymentKey;
            this.hotFix(hotfixDeploymentKey)

        })
    }

    storeLog(message) {
        AsyncStorage.mergeItem('uploadLog', JSON.stringify(message))
    }

    uploadLog() {
        AsyncStorage.getItem('uploadLog').then((response) => {
            if (response != null) {
                // create.create().uploadLog('INFO', response).then((response) => {
                //     if (response.ok) {
                //         AsyncStorage.removeItem('uploadLog')
                //     }
                // })

            }
        })
    }

    codePushDownloadDidProgress=(progress)=> {
        if (downloadTime === 0) {
            downloadTime = Moment().format('X')
        }
        this.hotFixStore.percent = (parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2) * 100).toFixed(1);
        if (!this.hotFixStore.isNextAffect) {
            this.hotFixStore.progress = progress;
            TW_Store.gameUpateStore.isAppDownIng = true;
        }
    }

    hotFix=(hotfixDeploymentKey, isActiveCheck = false)=> {

        this.setState({
            syncMessage: '检测更新中....',
            updateStatus: 0
        });
        try {
            CodePush.checkForUpdate(hotfixDeploymentKey).then((update) => {
                TW_Log('==checking update=d===hotfixDeploymentKey= =' + hotfixDeploymentKey, update);
                if (update !== null) {
                    this.hotFixStore.syncMessage = '检测到重要更新,稍后将自动重启!';
                    let versionData = null;
                    try {
                        //{"jsVersion":5.23,"isWeakUpate":true}  "{"jsVersion":v10.24.1814,"isWeakUpate":false}"
                        versionData = JSON.parse(update.description);
                    } catch (e) {
                        versionData = null;
                    }
                    TW_Log("versionData--description==--" + update.description, versionData)
                    if (!isActiveCheck) { //如果是app启动进入热更新检测 并且游戏已经进入大厅，则不使用强制更新提示，下次启动生效
                        if (versionData) {
                            this.isWeakUpdate = versionData.isWeakUpate
                            if (versionData.isWeakUpate) {
                                this.hotFixStore.isNextAffect = this.isWeakUpdate
                            } else {
                                this.hotFixStore.isNextAffect = false;
                            }
                            if (`${TW_Store.appStore.specialVersionHot}` == `${versionData.sp}`) {
                                this.isWeakUpdate = true
                            } else {
                                TW_Store.hotFixStore.versionHotFix = TW_Store.hotFixStore.versionHotFix + ": " + versionData.sp
                            }
                        }
                        if (this.isWeakUpdate) {
                            this.hotFixStore.isNextAffect = true;
                        }
                    } else {
                        //如果是3分钟后台进入前台的热更新检测 使用立即更新
                        this.hotFixStore.isNextAffect = false;
                    }

                    TW_Log('==checkingupdate====hotfixDeploymentKey= versionData=  this.isWeakUpdate==' + this.isWeakUpdate);
                    this.hotFixStore.updateFinished = false;
                    this.storeLog({ hotfixDomainAccess: true });
                    if (alreadyInCodePush) return
                    alreadyInCodePush = true
                    let updateMode = CodePush.InstallMode.ON_NEXT_RESTART ;
                    if (TW_IS_DEBIG) {
                        return
                    }
                    TW_Log("preInstallCodeCodePush--  update.download");
                    update.download(this.codePushDownloadDidProgress).then((localPackage) => {
                        alreadyInCodePush = false;
                        if (localPackage) {
                            this.hotFixStore.syncMessage = '下载完成,开始安装';
                            this.hotFixStore.progress = false;
                            downloadTime = Moment().format('X') - downloadTime
                            this.storeLog({ downloadStatus: true, downloadTime: downloadTime });
                            this.installCodePush(localPackage, updateMode);
                            this.isRestartNowFun();

                        } else {
                            this.storeLog({ downloadStatus: false, message: '下载失败,请重试...' })
                            this.updateFail('下载失败,请重试...')
                        }
                    }).catch((ms) => {
                        this.storeLog({ downloadStatus: false, message: '下载失败,请重试...' })
                        this.updateFail('下载失败,请重试...')
                    }).finally(() => {
                        if (!this.hotFixStore.isNextAffect) {
                            TW_Store.gameUpateStore.isAppDownIng = false;
                        }
                    })
                } else {
                    this.hotFixStore.skipUpdate()
                }
            }).then(() => {
                setTimeout(() => {
                    this.setState({
                        syncMessage: '正在加速更新中...',
                    })
                }, 3000)
            }).then(() => { // here stop
                this.timer = setTimeout(() => {
                    if (!this.hotFixStore.progress && !this.hotFixStore.updateFinished) {
                        this.storeLog({ downloadStatus: false, message: '下载失败,请重试...' })
                        this.updateFail('下载失败,请重试...')
                    }
                }, 10 * 1000)
            }).catch((ms, error) => {
                this.storeLog({ hotfixDomainAccess: false, message: '更新失败,请重试...' })
                this.updateFail('更新失败,请重试...')
            })
        } catch (e) {
            TW_Log("code-push--error ==description==--" + e, e)
        }
    }

    isRestartNowFun=()=>{
        //再根据情况判断是否需要需要马上重启
        if(!this.hotFixStore.isNextAffect){
            if(!TW_Store.bblStore.isEnterLooby){
               this.onCodePushReStart();
            }else{
                //如果已经进入了大厅 强制下次启动生效
                // if(TW_Store.bblStore.isStartGameHttp){
                //     TN_MSG_TO_GAME(
                //         TW_Store.bblStore.getWebAction(
                //             TW_Store.bblStore.ACT_ENUM.appNativeData,
                //             {data: TW_Store.bblStore.getAPPJsonData()}
                //         )
                //     );
                //     BackgroundTimer.setTimeout(this.onCodePushReStart,3000);
                // }else{
                //     BackgroundTimer.setTimeout(this.isRestartNowFun,2000);
                // }
            }
        }
    }

    onCodePushReStart=()=>{
        if(TW_Store.hotFixStore.isInstalledFinish){
            clearInterval(TW_Store.appStore.timeClearId);
            BackgroundTimer.clearInterval(TW_Store.bblStore.intervalId);
            CodePush.restartApp();
        }else{
            BackgroundTimer.setTimeout(this.onCodePushReStart,1000);
        }
    }

    installCodePush = (localPackage, updateMode) => {
        TW_Log("preInstallCodeCodePush----installCodePush-localPackage=="+localPackage+"--updateMode=="+this.hotFixStore.isNextAffect,localPackage);
        localPackage.install(updateMode).then(() => {
            TW_Log("preInstallCodeCodePush---- localPackage.install");
            this.storeLog({ updateStatus: true });
            //如果正在下载大厅文件，关闭大厅当前的下载
            if (updateMode == CodePush.InstallMode.IMMEDIATE) {
                TW_Store.dataStore.clearCurrentDownJob();
                BackgroundTimer.clearInterval(TW_Store.bblStore.intervalId);
            }
            CodePush.notifyAppReady().then(() => {
                TW_Log("preInstallCodeCodePush----  CodePush.notifyAppReady()")
                // this.setUpdateFinished()
                if (!this.hotFixStore.isNextAffect) {
                    TW_Store.gameUpateStore.isAppDownIng = false;
                }
                TW_Store.hotFixStore.isInstalledFinish = true;
            })


        }).catch((ms) => {
            TW_Log("preInstallCodeCodePush----  安装失败,请重试")
            this.storeLog({ updateStatus: false, message: '安装失败,请重试...' })
            this.updateFail('安装失败,请重试...')
        })
    }



    updateFail = (message) => {
        this.setState({
            syncMessage: message,
            updateStatus: -1
        })
        this.hotFixStore.syncMessage = message;
        this.hotFixStore.updateStatus = -1;
        this.uploadLog()
    }

    getLoadingView = () => {
        let progressView
        if (this.hotFixStore.progress) {
            progressView = (
                <Text style={{ color: "#ffcc33", marginVertical: 10 }}>
                    正在下载({parseFloat(this.hotFixStore.progress.receivedBytes / 1024 / 1024).toFixed(2)}M/{parseFloat(this.hotFixStore.progress.totalBytes / 1024 / 1024).toFixed(2)}M) {(parseFloat(this.hotFixStore.progress.receivedBytes / this.hotFixStore.progress.totalBytes).toFixed(2) * 100).toFixed(1)}%</Text>
            )
        } else {
            return null;
        }
        return (
            <View pointerEvents={"none"} style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: JX_PLAT_INFO.SCREEN_W,
                height: JX_PLAT_INFO.SCREEN_H,
                flex: 1,
                position: "absolute",
            }}>
                <View style={{
                    backgroundColor: "rgba(10,10,10,0.5)", paddingHorizontal: 60, paddingVertical: 15,
                    borderRadius: 10
                }}>
                    <View style={{}}>
                        <Text style={{
                            fontSize: Size.font16,
                            color: "#99ffff",
                            fontWeight: "bold"
                        }}>{this.hotFixStore.syncMessage}</Text>
                    </View>
                    {progressView}
                    <Progress.Bar
                        color={"#ffcc33"}
                        progress={(this.hotFixStore.progress.receivedBytes / this.hotFixStore.progress.totalBytes).toFixed(2)}
                        width={200} />
                </View>
            </View>

        )
    }

    validateAndroidModel = (deviceModel) => {
        let modeList = ["Redmi 6 Pro"]
        if (!G_IS_IOS) {
            if (modeList.indexOf(deviceModel) > -1) {
                return true
            }
        }
        return false
    }
}

console.log("TN_IS_HAVE_CODE_PUSH--------------", TN_IS_HAVE_CODE_PUSH)
//适配没有codePush的情况
if (TN_IS_HAVE_CODE_PUSH) {
    Enter = CodePush({
        checkFrequency: CodePush.CheckFrequency.MANUAL,
        installMode: CodePush.InstallMode.IMMEDIATE
    })(Enter);
}


AppRegistry.registerComponent('BBL', () => Enter);
