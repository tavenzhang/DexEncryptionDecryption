import { observable, action } from "mobx";
import { NativeModules, Alert, Platform } from 'react-native';
import CodePush from "react-native-code-push";
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation';
import {
    configAppId,
    MyAppName,
    versionHotFix,
    platInfo,
    YunDunData,
    MyOwnerPlatName,
} from "../../config/appConfig";

import { UpDateHeadAppId } from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls';
import TCUserOpenPayApp from '../../Page/UserCenter/UserPay/TCUserOpenPayApp';
import OpeninstallModule from "openinstall-react-native";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";
import JXHelper from "../../Common/JXHelper/JXHelper";
import RNFS from "react-native-fs";
/**
 * 用于初始化项目信息
 */
export default class AppInfoStore {
    @observable
    screenW = SCREEN_W;
    /**
     * 应用名称
     * @type {string}
     */
    @observable
    appName = MyAppName;
    /**
     *  是否保持高亮
     * @type {string}
     */
    @observable
    keepAwake = false;
    /**
     * 应用版本号
     * @type {string}
     */
    @observable
    appVersion = '1.0.0';
    /**
     * 设备token
     * @type {string}
     */
    @observable
    deviceToken = '';

    @observable
    yunDunPort = null;
    /**
     * 邀请码
     * @type {string}
     */
    userAffCode = '';
    @observable
    specialVersionHot = '2';

    @observable
    versionHotFix = versionHotFix;

    @observable
    currentDomain = '';
    @observable
    appInfo = {
        PLAT_ID: "",
        PLAT_CH: "",
        APP_DOWNLOAD_VERSION: "",
        Affcode: "",
        JPushKey: "",
        UmengKey: "",
        applicationId: "",
        SUB_TYPE: "0"
    };
    @observable
    channel = '';
    @observable
    clindId = configAppId;
    callInitFuc = null;
    @observable
    isInitPlat = false;
    applicationId = '';
    @observable
    isInAnroidHack = false;
    @observable
    subAppType = '0';
    //tag 用于更新一次
    updateflag = false;
    //app 最新版本
    @observable
    latestNativeVersion = G_IS_IOS
        ? platInfo.latestNativeVersion.ios
        : platInfo.latestNativeVersion.android;
    //app 当前版本
    APP_DOWNLOAD_VERSION = '1.0';
    //openInstallData
    @observable
    openInstallData = { appKey: "", data: null };
  //是否是测试app sit and shApp
    @observable
    isSitApp=false
    //是否是测试app 包含uat
    @observable
    isTestApp=false

    openInstallCheckCount = 1;
    //云盾数据
    yunDunData =YunDunData;

    //是否锁定屏幕旋转
    isLockToLandscape =true

    constructor() {
        this.init();
        this.initDeviceTokenFromLocalStore();
        if(versionHotFix.indexOf("v")>-1){
            let subpre=versionHotFix.substr(0,1);
            this.versionHotFix=`${subpre}${this.specialVersionHot}.${versionHotFix.substr(1)}`
        }else{
            this.versionHotFix=`v${this.specialVersionHot}.${versionHotFix}`
        }
    }

    init() {
        TW_Data_Store.getItem(TW_DATA_KEY.platData, (err, ret) => {
            TW_Log(
                "TN_GetPlatInfo---versionBBL--TW_DATA_KEY.platDat====eeror=" +
                err +
                "--ret--" +
                ret
            );
            if (err) {
                this.checkAppInfoUpdate(null);
            } else {
                if (ret) {
                    let appInfo = JSON.parse(ret);
                    if (appInfo) {
                        this.initData(appInfo);
                    }
                    this.checkAppInfoUpdate(ret);
                } else {
                    this.checkAppInfoUpdate(null);
                }
            }
        })
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore, this.checkSavedData)

    }

    async checkSavedData(err, ret) {
        TW_Log("checkSavedData======loadingViewExist===ret--"+ret+"--eeeor="+err)
            if (`${ret}` == "1") {
                TW_Store.dataStore.isAppInited=true;
                SoundHelper.startBgMusic();
            }else{
                const  loadingSourceViewExist=   await RNFS.exists(TW_Store.dataStore.originAppDir + "/loading/loading.html");
                TW_Log("checkSavedData======loadingViewExist==="+loadingSourceViewExist+"--ret--"+ret+"--eeeor="+err)
                if(loadingSourceViewExist){
                    TW_Store.dataStore.copy_assets_to_dir(()=>{SoundHelper.startBgMusic();});
                }else{
                    TW_Store.gameUpateStore.isIncludeLoadView=false;
                }
            }

            TW_Data_Store.getItem(TW_DATA_KEY.LobbyReadyOK, (err, ret) => {
                if(TW_Store.dataStore.isAppInited){
                    if(ret){
                        TW_Store.gameUpateStore.isNeedUpdate=`${ret}` == "1" ? false:true;
                    }
                    TW_Log("TW_DATA_KEY.LobbyReadyOK---"+ret,TW_Store.gameUpateStore.isNeedUpdate)
                }
            });
    }

    checkAppInfoUpdate = (oldData = null) => {
        TN_GetAppInfo(data => {
            // TW_Log("TN_GetPlatInfo---versionBBL--checkAppInfoUpdate.platDat==start==data=",data);
            if (data) {
                let appInfo = {};
                if (G_IS_IOS) {
                    appInfo = JSON.parse(data);
                } else {
                    appInfo = data;
                }
                // TW_Log("TN_GetPlatInfo---versionBBL--checkAppInfoUpdate.platDat==start==appInfo----=",appInfo);
                let dataString = JSON.stringify(appInfo);
                if (oldData) {
                    if (oldData != dataString) {
                        this.initData(appInfo);
                        TW_Data_Store.setItem(TW_DATA_KEY.platData, data);
                    }
                } else {
                    this.initData(appInfo);
                    TW_Data_Store.setItem(TW_DATA_KEY.platData, data);
                }
                this.APP_DOWNLOAD_VERSION = this.appInfo.APP_DOWNLOAD_VERSION;
                this.APP_DOWNLOAD_VERSION = this.APP_DOWNLOAD_VERSION
                    ? this.APP_DOWNLOAD_VERSION
                    : "1.0";

                try {
                    TW_Data_Store.getItem(TW_DATA_KEY.AFF_CODE, (err, ret) => {
                        TW_Store.dataStore.log +=
                            "TN_GetPlatInfo---versionBBL-TW_DATA_KEY.AFF_CODd----err=-" +
                            err +
                            "----ret==" +
                            ret +
                            "\n";
                        if (ret && ret.length > 0) {
                            this.userAffCode = ret;
                        }
                    });
                    //最多重复3次检察
                    this.onOpenInstallCheck(this.onOpenInstallCheck);
                } catch (e) {
                    TW_Store.dataStore.log += "getInstall---error=" + e;
                }
            }
        });
    };

    onOpenInstallCheck = callBack => {
        OpeninstallModule.getInstall(10, res => {
            //TW_Store.dataStore.log+="getInstall----"+JSON.stringify(res);
            TW_Store.dataStore.log += "getInstall---res-" + res;
            if (res && res.data) {
                //TW_Store.dataStore.log+="getInstall----"+JSON.stringify(res);
                let map = null;
                if (typeof res.data === "object") {
                    map = res.data;
                } else {
                    map = JSON.parse(res.data);
                }
                if (map) {
                    this.openInstallData.data = map;
                    if (map && map.affCode) {
                        this.userAffCode = map.affCode;
                        TW_Data_Store.setItem(TW_DATA_KEY.AFF_CODE, this.userAffCode);
                        TW_OnValueJSHome(
                            TW_Store.bblStore.getWebAction(
                                TW_Store.bblStore.ACT_ENUM.affcode,
                                { data: this.userAffCode }
                            )
                        );
                        TW_Store.dataStore.log +=
                            "\ngetInstall---affCode=TW_OnValueJSHome--userAffCode-" +
                            this.userAffCode;
                    }
                }
            } else {
                if (callBack) {
                    if (this.openInstallCheckCount <= 3) {
                        this.openInstallCheckCount += 1;
                        callBack(this.onOpenInstallCheck);
                    }
                }
            }
        });
    };

    onShowDownAlert = url => {
        //处于渠道验证阶段 不需要检测强更新
        if (url && url.length > 0 && !this.isInAnroidHack) {
            TW_Log("onShowDownAlert-----url==this.APP_DOWNLOAD_VERSION=" + this.APP_DOWNLOAD_VERSION, this.latestNativeVersion);
            let isShowAlert=this.APP_DOWNLOAD_VERSION != this.latestNativeVersion;
            if (isShowAlert) {

                //清除所有的缓存数据 方便app升级
                TW_Data_Store.clear();
                Alert.alert(
                    "检测到版本升级，请重新下载安装！",
                    "",
                    [
                        {
                            text: "前往下载",
                            onPress: () => {
                                TCUserOpenPayApp.linkingWeb(url);
                                TW_Log("onShowDownAlert-----url==" + url);
                                setTimeout(() => {
                                    this.onShowDownAlert(url);
                                }, 1000);
                            }
                        }
                    ],
                    { cancelable: false }
                );
            }
        }
    };

    initData = appInfo => {
        if (!appInfo) {
            appInfo = {PLAT_ID: configAppId, isNative: false};
        } else {
            appInfo.PLAT_ID = appInfo.PLAT_ID ? appInfo.PLAT_ID : appInfo.PlatId;//兼容某些老的app
            if (!appInfo.PLAT_ID) {
                appInfo.PLAT_ID = configAppId;
            }
        }
        //所以的clintId 在此重置
        this.clindId = appInfo.PLAT_ID ? appInfo.PLAT_ID : configAppId;
        this.subAppType = appInfo.SUB_TYPE ? appInfo.SUB_TYPE : '0';
        this.channel = appInfo.PLAT_CH ? appInfo.PLAT_CH : '1';

        platInfo.platId = this.clindId;
        UpDateHeadAppId(this.clindId);
        this.appInfo = appInfo;
        this.isInitPlat = true;
        this.initAppName();
        this.initAppVersion();

        /*** 初始化邀请码*/
        this.userAffCode = this.appInfo.Affcode;
        this.callInitFuc = this.callInitFuc ? this.callInitFuc() : null;
        this.openInstallData.appKey = this.appInfo['com.openinstall.APP_KEY'];
        // TW_Log("TN_GetPlatInfo---versionBBL--TW_DATA_KEY.platDat====appInfo--this.userAffCode--"+this.userAffCode, appInfo);
        if (G_IS_IOS) {
            //ios 动态开启友盟等接口 android 是编译时 决定好了。
            // TW_Log('JX===  appInfo '+this.appInfo.APP_DOWNLOAD_VERSION+"--appInfo.JPushKey=="+this.appInfo.JPushKey,this.appInfo)
            TN_StartJPush(this.appInfo.JPushKey, "1");
            TN_START_Fabric();
            // TN_START_SHARE("111","222");
            TN_StartUMeng(this.appInfo.UmengKey, this.appInfo.Affcode);
        }
        this.isSitApp = this.clindId == "1209" || this.clindId == "4";
        this.isTestApp=this.isSitApp||this.clindId == "214"
        this.emulatorChecking();
    }

    emulatorChecking() {
        // 以下是模拟器的model
        let modeList = ["unknown"];
        let isEmulator = DeviceInfo.isEmulator();
        let curModel = DeviceInfo.getModel().toLowerCase();
        let curDevId = DeviceInfo.getDeviceId().toLowerCase();
        let curDevName = DeviceInfo.getDeviceName().toLowerCase();
        let emulatorChecking = isEmulator;
        // || (curDevId.indexOf("unknown") !== -1)
        // || (modeList.indexOf(curModel) !== -1);
        TW_Store.dataStore.log += "\n---isEmulator--" + isEmulator + "---TW_IS_DEBIG---" + TW_IS_DEBIG + "---isSitApp---" + this.isSitApp +
            "---model--" + curModel + "--deviceID--" + curDevId + "--deviceName--" + curDevName +"\n---Emulator--" + emulatorChecking;
        if (emulatorChecking) {
            if (!this.isSitApp && !TW_IS_DEBIG) {
                Alert.alert(
                    "本游戏不支持模拟器运行，请使用真机体验！",
                    "",
                    [
                        {
                            text: "确定!",
                            onPress: () => {
                                if (NativeModules.TCOpenOtherAppHelper) {
                                    TN_ExitApp()
                                } else {
                                    setTimeout(() => {
                                        this.emulatorChecking();
                                    }, 1000);
                                }
                            }
                        }
                    ],
                    {cancelable: false}
                );
            }
        }
    }

    checkAppSubType(initDomain) {
        // 如果是android 需要判断是否为特殊subType 聚道包 例子 subAppType 21,  21 特殊类型包
        TW_Log("checkAppSubType----",this.subAppType)
        switch (`${this.subAppType}`) {
            case '21':
                this.isInAnroidHack = true;
                TW_Store.hotFixStore.allowUpdate = false;
                //开始检测 热更新开关
                this.initAndroidAppInfo(res => {
                    this.checkUpdate(initDomain);
                });
                break;
            default:
                initDomain();
                this.initAndroidAppInfo();
                break;
        }
    }

    checkUpdate(initDomain) {
      //  let checkUpdateDemain = AppConfig.checkUpdateDomains;
        let checkUpdateDemain =[
            "https://*.xingyuanbld.com",
            "https://*.0595qzsj.com",
            "https://*.b20mall.com",
            "https://*.xmhaoduoxie.com",
            "https://*.zzhjqr.com",
            "https://*.zwzt6666.com",
        ];
        if (checkUpdateDemain) {
            this.isReqiestTing = true;
            setTimeout(() => {
                if (this.isReqiestTing) {
                    // 如果 4秒还没有数据返回，强制初始化。 NetUitls 的timeOut 不靠谱
                    initDomain();
                }
            }, 4000);
            for (var i = 0; i < checkUpdateDemain.length; i++) {
                let url = checkUpdateDemain[i] + "/code/user/apps";
                if(url.indexOf("*")>-1){
                    url=url.replace("*",JXHelper.getRandomChars(true, 5, 15))
                }
                NetUitls.getUrlAndParamsAndCallback(
                    url,
                    {
                        appId: this.applicationId,
                        version:this.appVersion,
                        appType: G_IS_IOS ? "IOS":"ANDROID",
                        owner: MyOwnerPlatName,
                    },
                    res => {
                        this.isReqiestTing = false;
                        if (res.rs) {
                            if (!this.updateflag) {
                                //tag 用于更新一次
                                this.updateflag = true;
                                let response = res;
                                let resCheck =
                                    response.content.bbq &&
                                    response.content.bbq.indexOf('SueL') != -1;
                                TW_Log(
                                    "appInfo--================/code/user/apps--response--resCheck--" +
                                    resCheck +
                                    "--MyOwnerPlatName--" +
                                    MyOwnerPlatName,
                                    response
                                );
                                if (resCheck) {
                                    //允许更新
                                    this.isInAnroidHack = false;
                                    TW_Store.hotFixStore.allowUpdate = true;
                                }
                                initDomain();
                            }
                        }
                    },
                    3000
                );
            }
        } else {
            initDomain();
        }
    }

    regCallInitFuc(callBack) {
        this.callInitFuc = callBack;
        if (this.isInitPlat) {
            callBack();
        }
    }

    //初始化appName
    initAppName() {
        if (!G_IS_IOS) {
            NativeModules.JXHelper.getAppName(appName => {
                if (appName.length) {
                    this.appName = appName;
                }
                TW_Log("APPNAME", this.appName);
            });
        }
    }

    async initAndroidAppInfo(callback) {
        let appInfo = this.appInfo;
        if (appInfo) {
            //this.userAffCode = appInfo.Affcode;
            if(G_IS_IOS){
                this.appVersion = appInfo.CFBundleShortVersionString;
                this.applicationId = appInfo.CFBundleIdentifier;
                //  this.appVersion=
            }else{
                this.appVersion = appInfo.versionName;
                this.applicationId = appInfo.applicationId;
            }

        }
        TW_Log("appInfo----end--appInfo==applicationId==" +  this.applicationId , appInfo);
        callback && callback(true);
    }

    getAppInfo() {
        return new Promise(resolve => {
            NativeModules.JXHelper.getAppInfo(appInfo => {
                resolve(appInfo);
            });
        });
    }

    //初始化app版本号
    async initAppVersion() {
        let nativeConfig = await CodePush.getConfiguration();
        this.appVersion = nativeConfig.appVersion;
        TW_Store.dataStore.log+="\n---nativeConfig--"+JSON.stringify(nativeConfig)+"---\n";
        TW_Log(
            "appInfo----version-nativeConfig--  this.appVersion " + this.appVersion,
            nativeConfig
        );
    }

    async initDeviceTokenFromLocalStore() {
        await storage
            .load({ key: "USERDEVICETOKEN" })
            .then(res => {
                if (res) {
                    this.deviceToken = res;
                    let newToken =this.uiidTools(this.deviceToken);
                    this.deviceToken= newToken == this.deviceToken ? this.deviceToken:"";
                    TW_Log('deviceToken--USERDEVICETOKEN saved  00deviceToken USERDEVICETOKEN is this.deviceToken=='+this.deviceToken);
                }
            })
            .catch(err => {
                TW_Log('USERDEVICETOKEN--deviceToken not found');
            });

        if (this.deviceToken.length === 0) {
            this.deviceToken = await this.initDeviceUniqueID();
            //刷新游戏appNativeData 数据
            //TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appNativeData, { data: TW_Store.bblStore.getAppNativeData()}));
            this.saveDeviceTokenToLocalStore();
        }
        this.yunDunData.token=this.deviceToken;
    }

    async initDeviceUniqueID() {
        let enhancedUniqueID=null;


        try {
            let oriUniqueID = DeviceInfo.getUniqueID();
            enhancedUniqueID = oriUniqueID;
            if (!G_IS_IOS) {
                oriUniqueID= oriUniqueID.replace(/-/g,"");
                if(oriUniqueID&&oriUniqueID.length<16&&oriUniqueID.length>0){
                    while (oriUniqueID.length<16) {
                        oriUniqueID=oriUniqueID+oriUniqueID.substr(0,1);
                    }
                }
                oriUniqueID=oriUniqueID.substr(0,16);
                TW_Log('deviceToken: enhancedUniqueID:---start length '+oriUniqueID.length, enhancedUniqueID);
                let androidIdList=oriUniqueID.split("");
                let indexArray=[0,2,4,3,5,1,8,9,10,12,11,15,14,13,6,7];
                let  dimData= parseInt(androidIdList[0],16)+ parseInt(androidIdList[1],16)+parseInt(androidIdList[2],16)+parseInt(androidIdList[3],16)
                for(let i=0;i<indexArray.length;i++){
                    let data=androidIdList[indexArray[i]]
                    let newData =(parseInt(data,16)+dimData)%16;
                    //  TW_Log('deviceToken: enhancedUniqueID:---dimData---'+dimData+"---data=="+data+"---hexData="+ parseInt(data,16)+"====newData--"+newData,newData.toString(16));
                    newData=newData.toString(16);
                    androidIdList.push(newData);
                }
                enhancedUniqueID = androidIdList.join("");
            }
        } catch (e) {
            enhancedUniqueID = this.getGUIDd()
        }

        return this.uiidTools(enhancedUniqueID);
    }

    uiidTools=(enhancedUniqueID)=>{
        try {
            enhancedUniqueID=enhancedUniqueID.replace(/-/g,"");
            enhancedUniqueID=enhancedUniqueID.substr(0,32)
            TW_Log('deviceToken: enhancedUniqueID:---enhancedUniqueID--start '+enhancedUniqueID.length, enhancedUniqueID);
            let uidList=enhancedUniqueID.split("")
            let last4=((parseInt(uidList[2],16)+parseInt(uidList[3],16))%16).toString(16);
            let temp1 =uidList[parseInt(uidList[2],16)];
            let temp2 =uidList[parseInt(uidList[3],16)];
            TW_Log('deviceToken: enhancedUniqueID:--before-enhancedUniqueID--temp1== '+temp1+"----temp2=="+temp2,uidList);
            temp1=parseInt(temp1,16);
            temp2=parseInt(temp2,16);
            TW_Log('deviceToken: enhancedUniqueID:--after-enhancedUniqueID--temp1== '+temp1+"----temp2=="+temp2,uidList);
            let last3=((temp1+temp2)%16).toString(16);
            let last2=((15-parseInt(uidList[4],16))%16).toString(16);
            let last1=((15-parseInt(uidList[9],16))%16).toString(16);
            uidList[uidList.length-1]=last1;
            uidList[uidList.length-2]=last2;
            uidList[uidList.length-3]=last3;
            uidList[uidList.length-4]=last4;
            enhancedUniqueID = uidList.join("");
            TW_Log('deviceToken: enhancedUniqueID:---enhancedUniqueID--end=== '+enhancedUniqueID.length, enhancedUniqueID);
            enhancedUniqueID = `${enhancedUniqueID.substring(0, 8)}-${enhancedUniqueID.substring(8, 12)}-${enhancedUniqueID.substring(12, 16)}-${enhancedUniqueID.substring(16, 20)}-${enhancedUniqueID.substring(20)}`;
            TW_Log('deviceToken: enhancedUniqueID:---enhancedUniqueID--last=== '+enhancedUniqueID.length, enhancedUniqueID);
        }
        catch (e) {
            enhancedUniqueID = this.initDeviceTokenFromNative()
        }

        return enhancedUniqueID;
    }

    async initDeviceTokenFromNative() {
        return new Promise(resolve => {
            try {
                NativeModules.JXHelper.getCFUUID((err, uuid) => {
                    if (!uuid||(uuid&&uuid.length<3)) {
                        uuid = this.getGUIDd();
                    }
                    resolve(uuid);
                });
            } catch (e) {
                resolve(this.getGUIDd());
            }
        });
    }

    getGUIDd() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        let oriUniqueID = S4() + S4() + S4()+ S4();
        if(oriUniqueID&&oriUniqueID.length<16&&oriUniqueID.length>0){
            while (oriUniqueID.length<16) {
                oriUniqueID=oriUniqueID+oriUniqueID.substr(0,1);
            }
        }
        oriUniqueID = `${oriUniqueID.substring(0, 8)}-${oriUniqueID.substring(8, 12)}-${oriUniqueID.substring(12, 16)}-${oriUniqueID.substring(0, 4)}-${oriUniqueID.substring(4)}`;
        return oriUniqueID;
    }

    saveDeviceTokenToLocalStore=()=> {
        storage.save({ key: "USERDEVICETOKEN", data: this.deviceToken });
    }

    @action
    getPlatInfo() {
        if (this.subAppType == "0") {
            return `    plat: ${this.clindId}  channel: ${this.channel}`;
        } else {
            return `    plat: ${this.clindId}  channel: ${this.channel}  subType: ${
                this.subAppType
                }`;
        }
    }

    lockToProrit(){
        Orientation.unlockAllOrientations();
        this.isLockToLandscape=false;
        Orientation.lockToPortrait();

    }


    lockToLandscape(){
        this.isLockToLandscape=true;
        //返回横屏
        //Orientation.lockToLandscape()
        if(G_IS_IOS){
            Orientation.lockToLandscapeRight();
        }else{
            Orientation.lockToLandscape()
        };
    }
}
