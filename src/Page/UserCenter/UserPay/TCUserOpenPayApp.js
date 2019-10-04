import {
    NativeModules,
    Linking,
    Platform
} from 'react-native'

import Toast from '../../../Common/JXHelper/JXToast';
/**
 * 打开用户支付App
 */
export default class TCUserOpenPayApp {

    WEICHAT_PACKAGE = "com.tencent.mm"
    QQ_PACKAGE = "com.tencent.mobileqq"
    ALIPAY_PACKAGE = "com.eg.android.AlipayGphone"
    JD_PACKAGE = "com.jingdong.app.mall"
    static  instance:TCUserOpenPayApp;

    static getInstance():TCUserOpenPayApp
    {
        if(!TCUserOpenPayApp.instance)
        {
            TCUserOpenPayApp.instance = new TCUserOpenPayApp();
        }
        return this.instance;
    }


    static isCanOpen(url,callBack){
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                callBack(true)
            } else {
                callBack(false)
            }
        }).catch((e)=>{  callBack(false)});
    }


    static isInstallWX(callBack){
        Linking.canOpenURL('weixin://').then(supported => {
            if (supported) {
                callBack(true)
            } else {
                callBack(false)
            }
        }).catch((e)=>{  callBack(false)});
    }

    static openWX(){
        // NativeModules.TCOpenOtherAppHelper.openApp("com.tencent.mm", "微信");
        if( NativeModules.TCOpenOtherAppHelper){
            NativeModules.TCOpenOtherAppHelper.openWeiXin()
        }else{
            TCUserOpenPayApp.linkingApp('weixin://', '微信');
        }
    }

    static  linkingWeb(url) {
        Linking.openURL(url).catch(err => {
            Toast.showShortCenter(　`请检测的你的链接${url}是否正常!`)
        })
    }
    /**
     * 打开微信
     */
    openWeChat() {
        // NativeModules.TCOpenOtherAppHelper.openApp("com.tencent.mm", "微信");
        if( NativeModules.TCOpenOtherAppHelper){
            NativeModules.TCOpenOtherAppHelper.openWeiXin()
        }else{
            this.linkingApp('weixin://', '微信');
        }
    }

    /**
     * 打开QQ
     */
    openQQ() {
        if (Platform.OS === 'ios') {
            this.linkingApp('mqq://', 'QQ')
        } else {
            try {
                NativeModules.TCOpenOtherAppHelper.openApp(this.QQ_PACKAGE, "QQ")
            } catch (e) {
                Toast.showShortCenter('暂时不支持打开QQ,请手动打开')
            }
        }
    }

    /**
     * 打开京东
     */
    openJD() {
        this.linkingApp("openApp.jdMobile://", "京东")
    }

    /**
     * 打开支付宝
     */
    openAlipay() {
        if(G_IS_IOS){
            this.linkingApp("alipay:// ", "支付宝")
        }else{
            NativeModules.TCOpenOtherAppHelper.openAlipay();
        }
    }

    linkingApp(url, payType) {
        Linking.openURL(url).catch(err => {
            Toast.showShortCenter('请您先安装' + payType + '应用！')
        })
    }



    /**
     * 打开app
     * @param topUpType
     * @returns {appName}
     */
    openAppByType=(topUpType)=> {
        switch (topUpType) {
            case 'ALIPAY':
                this.openAlipay()
                break
            case 'WECHAT':
                this.openWeChat()
                break
            case 'QQ':
                this.openQQ()
                break
            case "JD":
                this.openJD();
            default:
                return
        }
    }

    static linkingApp(url, payType) {
        Linking.openURL(url).catch(err => {
            Toast.showShortCenter('请您先安装' + payType + '应用！')
        })
    }
}
