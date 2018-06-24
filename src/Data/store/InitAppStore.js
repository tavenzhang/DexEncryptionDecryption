import {computed, action, observable} from 'mobx'
import {NativeModules, Platform} from "react-native";
import CodePush from 'react-native-code-push'
import {
    MyAppName
} from '../../Page/resouce/appConfig';
import {affCodeList} from "../../Page/resouce/appAffCodeList";

/**
 * 用于初始化项目信息
 */

class InitAppStore {

    constructor() {
        this.init();
    }

    /**
     * 应用名称
     * @type {string}
     */
    @observable
    appName = MyAppName;

    /**
     * 应用版本号
     * @type {string}
     */
    @observable
    appVersion = "1.0.0";

    /**
     * 设备token
     * @type {string}
     */
    deviceToken = "";

    /**
     * 邀请码
     * @type {string}
     */
    userAffCode = "";

    init() {
        this.initAppName();
        this.initAppVersion();
        this.initDeviceTokenFromLocalStore();
        this.initAffCode();
    }

    //初始化appName
    initAppName() {
        if (!IS_IOS) {
            NativeModules.JXHelper.getAppName((appName) => {
                if (appName.length) {
                    this.appName = appName;
                }
                JXLog("APPNAME", this.appName)
            })
        }
    }

    //初始化app版本号
    async initAppVersion() {
        let nativeConfig = await CodePush.getConfiguration();
        this.appVersion = nativeConfig.appVersion;
        JXLog("version", this.appVersion);
    }

    async initDeviceTokenFromLocalStore() {
        await storage.load({key: "USERDEVICETOKEN"}).then(res => {
            if (res) {
                JXLog("deviceToken", res);
                this.deviceToken = res;
            }
        }).catch(err => {
            JXLog("deviceToken not found");
        });

        if (this.deviceToken.length === 0) {
            this.deviceToken = await  this.initDeviceTokenFromNative();
            this.saveDeviceTokenToLocalStore();
        }
    }

    initDeviceTokenFromNative() {
        return new Promise(resolve => {
            NativeModules.JXHelper.getCFUUID((err, uuid) => {
                JXLog("=============deviceToken", uuid);
                resolve(uuid);
            })
        })
    }

    saveDeviceTokenToLocalStore() {
        storage.save({key: "USERDEVICETOKEN", data: this.deviceToken})
    }

    /**
     * 初始化邀请码
     */
    initAffCode() {
        let hotAffCode = this.getAppSpecialAffCode();
        if (hotAffCode) {
            this.userAffCode = hotAffCode;
            JXLog("AFFCODE", this.userAffCode)
            return;
        } else {
            try {
                NativeModules.JXHelper.getAffCode((affcode) => {
                    this.userAffCode = affcode
                    JXLog("AFFCODE", this.userAffCode)
                })
            } catch (e) {
                JXLog("AFFCODE NOT FOUND")
            }
        }
    }

    //获取Js中的邀请码
    getAppSpecialAffCode() {
        let a = affCodeList[Platform.OS][this.appVersion];
        if (a) return a;
        return null;
    }


}

const initAppStore = new InitAppStore();
export default initAppStore;