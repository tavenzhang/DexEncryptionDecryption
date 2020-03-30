package com.test.ccd1;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Handler;
import android.util.Log;

import com.test.ccd1.invokenative.DplusReactPackage;
import com.test.ccd1.invokenative.RNUMConfigure;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
//import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
//import com.test.ccd1.webviewSplashScreen.WebViewReactPackage;
//import com.umeng.socialize.PlatformConfig;


import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//import com.test.ccd1.audio.RNAudioPackage;
import com.test.ccd1.crash.CrashHandler;
//import com.test.ccd1.jxhelper.JXHelperPackage;
import com.test.ccd1.marqueeLabel.RCTMarqueeLabelPackage;
import com.test.ccd1.openapp.OpenAppPackage;
import com.test.ccd1.util.AppUtil;
//mport com.microsoft.codepush.react.CodePush;
//import com.umeng.commonsdk.UMConfigure;

import java.util.Arrays;
import java.util.List;

//import cn.jpush.android.api.JPushInterface;

public class MainApplication extends Application implements ReactApplication {

    private static MainApplication mInstance = null;
    private static final String TAG = MainApplication.class.getName();
    private Handler handler;

    public static MainApplication getInstance() {
        return mInstance;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return "";
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                //    new MainReactPackage()
           // new NetInfoPackage(),
           // new CameraRollPackage(),
          //  new RNCWebViewPackage(),

           // new ExtraDimensionsPackage(),

                   // new CodePush(getResources().getString(R.string.deploymentKey), getApplicationContext(), BuildConfig.DEBUG, "", getSpecialCodeVersion()),
                 //   new SplashScreenReactPackage(),
                   // new RNSoundPackage(),
                  //  new RNDeviceInfo(),
                   // new FastImageViewPackage(),
                  //  new RCTMarqueeLabelPackage(),
                 //   new JXHelperPackage(),
                //    new OpenAppPackage(),
                   // new RNAudioPackage(),
                 //   new DplusReactPackage(),
                //    new WebViewReactPackage()
            );

        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }


    };

    public String getSpecialCodeVersion() {
        String vesrion = "";
        String subType = readMetaDataByTag("SUB_TYPE");
        subType = subType.trim();
        if (subType != null && !subType.equals("0") && !subType.equals("")) {
            vesrion = "6.66.666";
        }
        Log.d("subType", "subType-----------------" + subType + "---vesrion==" + vesrion + "--subType==0-" + (subType.equals("0")) + "--subType===!==" + (subType != "0"));
        return vesrion;
    }

    public String readMetaDataByTag(String tag) {
        try {
            ApplicationInfo appInfo = this.getPackageManager()
                    .getApplicationInfo(getPackageName(),
                            PackageManager.GET_META_DATA);
            Object mTag = appInfo.metaData.get(tag);
            return mTag.toString();
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return "error";
        }
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        //AppUtil.updateLocalAFFCode(this);
      //  CrashHandler.getInstance().init(this);
        // ????????????
       // JPushInterface.setDebugMode(BuildConfig.DEBUG);
        //JPushInterface.init(this);
        // ????????????
      //  initUmeng();
       // SoLoader.init(this, /* native exopackage */ false);
    }

    @Override
    public Resources getResources() {
        Resources resources = super.getResources();
        Configuration configuration = resources.getConfiguration();
        if (configuration.fontScale != 1.0f) {
            configuration.fontScale = 1.0f;
            resources.updateConfiguration(configuration, resources.getDisplayMetrics());
        }
        return resources;
    }

    private void initUmeng() {
//        String umengKey = BuildConfig.UMENG_KEY;
        String wechatKey = BuildConfig.WECHAT_KEY;
        String wechatSecretKey = BuildConfig.WECHAT_SECRET_KEY;

//        RNUMConfigure.init(this, umengKey, "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "");
//        UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, null);
//        UMConfigure.setLogEnabled(BuildConfig.DEBUG);
//        UMConfigure.setEncryptEnabled(true);

    //    PlatformConfig.setWeixin(wechatKey, wechatSecretKey);
//        ??????RENREN???????????????????????????????????????
//        PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "http://sns.whalecloud.com");
//        PlatformConfig.setYixin("yxc0614e80c9304c11b0391514d09f13bf");
//        PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba");
    }
}
