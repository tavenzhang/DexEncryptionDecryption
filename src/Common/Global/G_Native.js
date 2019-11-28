import { NativeModules } from 'react-native'
import Orientation from 'react-native-orientation';
try{

}catch (e) {

}
//所有的本地 native 接口聚集到此 方便维护
global.TN_GetAppInfo = (callBack: func) => {
    if (NativeModules.JXHelper.getAppInfo) {
        NativeModules.JXHelper.getAppInfo(callBack);
    }
};

global.TN_Notification = (title = '', body = {}) => {
    if (G_IS_IOS) {
        if (NativeModules.JDHelper.notification) {
            NativeModules.JDHelper.notification(title, body);
        }
    } else {
        NativeModules.JXHelper.notification(title, body);
    }
};

global.TN_StartJPush = (Jkey = '', channel = '') => {
    if (G_IS_IOS) {
        if (NativeModules.JDHelper.startJPush) {
            NativeModules.JDHelper.startJPush(Jkey, channel);
        }
    } else {
    }
};

global.TN_StartUMeng = (key = '', channel = '') => {
    if (G_IS_IOS) {
        if (NativeModules.JDHelper.startUMeng) {
            NativeModules.JDHelper.startUMeng(key, channel);
        }
    } else {
    }
};

global.TN_CodePush_ASEET = (callBack: func) => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.getCodePushBundleURL(callBack);
    } else {
        NativeModules.JXHelper.getCodePushBundleURL(callBack);
    }
};

global.TN_START_Fabric = (key = '4711ad6d815964a1103b461bc1d85ddf312b037d') => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.startFarbic && NativeModules.JDHelper.startFarbic(key);
    } else {
        NativeModules.JXHelper.startFarbic && NativeModules.JXHelper.startFarbic(key);
    }
};

global.TN_START_SHARE = (
    appId = 'wx4705de7e82fa978f',
    api = '67de54808bba55e934e3126f3e607a42'
) => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.startUMengShare &&
            NativeModules.JDHelper.startUMengShare(appId, api);
    } else {
        NativeModules.JXHelper.startUMengShare &&
            NativeModules.JXHelper.startUMengShare(appId, api);
    }
};

global.TN_IsWechatEnabled = (callBack: func) => {
    NativeModules.UMShareModule.isWechatEnabled(callBack);
};

global.TN_WechatAuth = (callBack) => {
    NativeModules.UMShareModule.auth(
        2,callBack
    );
};

global.TN_WechatShare = (text, image, url, title, isPyq,callBack) => {
    /*
    微信分享参考https://developer.umeng.com/docs/66632/detail/67587
    text 为分享内容
    image 为图片地址，可以为链接，本地地址以及res图片（如果使用res,请使用如下写法：res/icon.png）
    url 为分享链接，可以为空
    title 为分享链接的标题
    platform为平台id，id对照表与授权相同
    callback中code为错误码，当为200时，标记成功。message为错误信息
    */
    if (url) {
        if(url.indexOf("http")==-1){
            url ="http://"+url;
        }
    }
    NativeModules.UMShareModule.share(
        text,
        image,
        url,
        title,
        isPyq ? 3 : 2,
        (code, message) => {if(callBack){
            callBack(code);
        }}
    );
};

global.TN_ExitApp = () => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.exitApp();
    } else {
        NativeModules.TCOpenOtherAppHelper.exitApp()
    }
};
global.TN_SetCodePushConifg = (serverUrl,appVersion="2.2.2") => {
    JXCodePushServerUrl = serverUrl;
    //ios 强制固定设置 热更新的 appVersion
    if (G_IS_IOS) {
        TW_Store.dataStore.log+="\nsetCodePushConfig---start--\n";
        if(NativeModules.JDHelper.setCodePushConfig){
            TW_Store.dataStore.log+="\nsetCodePushConfig---appVersion--"+appVersion+"---\n";
            //NativeModules.JDHelper.setCodePushConfig(serverUrl,appVersion)
        }
    }
};


global.TN_yunDunStart = (isLocalHost=false,callBack) => {
        let yunDunStart= G_IS_IOS ? NativeModules.JDHelper.yunDunStart: NativeModules.JXHelper.yunDunStart
        if(yunDunStart&&TW_Store.appStore.yunDunData){
            let  appKey=G_IS_IOS ? TW_Store.appStore.yunDunData.appIosKey:TW_Store.appStore.yunDunData.appAndroidKey;
            let groupName=TW_Store.appStore.yunDunData.groupname;
            let ddomain=TW_Store.appStore.yunDunData.dip;
            let  token=TW_Store.appStore.deviceToken;
            let  port=isLocalHost? "80":"443";
            yunDunStart(appKey,groupName,token,ddomain,port,function (result) {

                TW_Log("TN_yunDunStart-------------result======="+result+"---srcDomain===-",{appKey,groupName,ddomain,token,port})
                if(result&&result.length>0){
                    let dataPort=result.split("_")[1];
                    TW_Log("TN_yunDunStart--------lastDomian--dataPort-"+dataPort);
                    TW_Store.appStore.yunDunPort=dataPort;
                    callBack(true,dataPort);
                }else{
                    callBack(true)
                }
            });
        }else{
            callBack(false);
        }

};
global.TN_UMShareModule = NativeModules.UMShareModule;
