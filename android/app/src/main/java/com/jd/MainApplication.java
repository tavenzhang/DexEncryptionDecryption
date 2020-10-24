package com.jd;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Handler;
import android.util.Log;

import com.facebook.react.PackageList;
import com.jd.invokenative.DplusReactPackage;
import com.jd.invokenative.RNUMConfigure;

import com.facebook.react.ReactApplication;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;




import com.jd.webview.WebViewReactPackage;
import com.umeng.socialize.PlatformConfig;


import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.jd.audio.RNAudioPackage;
import com.jd.crash.CrashHandler;
import com.jd.jxhelper.JXHelperPackage;
import com.jd.marqueeLabel.RCTMarqueeLabelPackage;
import com.jd.openapp.OpenAppPackage;
import com.jd.util.AppUtil;
import com.microsoft.codepush.react.CodePush;
import com.umeng.commonsdk.UMConfigure;


import java.util.Arrays;
import java.util.List;

import cn.jpush.android.api.JPushInterface;

public class MainApplication extends Application implements ReactApplication {

    private static final String TAG = MainApplication.class.getName();
    private static MainApplication mInstance = null;
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add(new JPushPackage(false, false));
            packages.add(new CodePush(getResources().getString(R.string.deploymentKey), getApplicationContext(), BuildConfig.DEBUG, "", getSpecialCodeVersion()));
            packages.add(new RCTMarqueeLabelPackage());
            packages.add(new JXHelperPackage());
            packages.add(new OpenAppPackage());
            packages.add(new DplusReactPackage());
            packages.add(new WebViewReactPackage());
            return packages;

//             return Arrays.<ReactPackage>asList(
//
//                     new JPushPackage(false, false),
//                     new CodePush(getResources().getString(R.string.deploymentKey), getApplicationContext(), BuildConfig.DEBUG, "", getSpecialCodeVersion()),
//                     new RCTMarqueeLabelPackage(),
//                     new JXHelperPackage(),
//                     new OpenAppPackage(),
//                     new RNAudioPackage(),
//                     new DplusReactPackage(),
//                     new WebViewReactPackage()
//             );

        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }


    };
    private Handler handler;

    public static MainApplication getInstance() {
        return mInstance;
    }

    public String getSpecialCodeVersion() {
        String vesrion = "";
        String subType = readMetaDataByTag("SUB_TYPE");
        subType = subType.trim();
        if (subType != null && !subType.equals("0") && !subType.equals("")) {
            vesrion = "8.88.888";
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
        if (mInstance == null) {
            mInstance = this;
        }
        AppUtil.updateLocalAFFCode(this);
        CrashHandler.getInstance().init(this);
        // 极光配置
        JPushInterface.setDebugMode(BuildConfig.DEBUG);
        JPushInterface.init(this);
        // 友盟配置
        initUmeng();
        SoLoader.init(this, /* native exopackage */ false);
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

//        RNUMConfigure.init(this, umengKey, "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "");
        UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, null);
        UMConfigure.setLogEnabled(BuildConfig.DEBUG);
        UMConfigure.setEncryptEnabled(true);
    }


    public void initUmengShare(String wxKey, String wxSecret) {
//        String umengKey = BuildConfig.UMENG_KEY;
        String wechatKey = BuildConfig.WECHAT_KEY;
        String wechatSecretKey = BuildConfig.WECHAT_SECRET_KEY;
        if (wxKey.length() > 1) {
            wechatKey = wxKey;
        }
        if (wxSecret.length() > 1) {
            wechatSecretKey = wxSecret;
        }
        PlatformConfig.setWeixin(wechatKey, wechatSecretKey);
//        豆瓣RENREN平台目前只能在服务器端配置
//        PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "http://sns.whalecloud.com");
//        PlatformConfig.setYixin("yxc0614e80c9304c11b0391514d09f13bf");
//        PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba");
    }


}
