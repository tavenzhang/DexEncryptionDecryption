package com.jd.jxhelper;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.core.content.ContextCompat;

import com.aliyun.security.yunceng.android.sdk.YunCeng;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.jd.MainActivity;
import com.jd.MainApplication;
import com.jd.util.AppUtil;
import com.jd.util.UpdateManager;
import com.jd.webview.JXWebView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.jd.webview.QP_WebView;
import com.microsoft.codepush.react.CodePush;
import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.data.JPushLocalNotification;
import demo.JSBridge;
import layaair.game.browser.ConchJNI;


public class JXHelper extends ReactContextBaseJavaModule {
    private static final String KEY_UUID = "uuid";
    ReactApplicationContext context;
    SharedPreferences pref;
    SharedPreferences.Editor editor;
   public static JXHelper instance=null;
    public JXHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        pref = context.getSharedPreferences("Device", 0);
        editor = pref.edit();
        instance=this;
    }

    @Override
    public String getName() {
        return "JXHelper";
    }


    @ReactMethod
    public void getPlatInfo(Callback resultCallback) {
        String  idStr =  MainActivity.instance.readMetaDataByTag("PLAT_ID");
        String  channel = MainActivity.instance.readMetaDataByTag("PLAT_CH");
        String  subType = MainActivity.instance.readMetaDataByTag("SUB_TYPE");
        JSONObject obj= new JSONObject();
        try {
            obj.put("PlatId",idStr);
            obj.put("Channel",channel);
            obj.put("Affcode",getAffCode());
            obj.put("SubType",subType);
            String ret= obj.toString();
            resultCallback.invoke(ret);
        }
        catch (Exception e){
            e.printStackTrace();
            resultCallback.invoke("error");
        }
    }

    @ReactMethod
    public void getCodePushBundleURL(Callback resultCallback) {
        resultCallback.invoke(CodePush.getJSBundleFile());
    }

    @ReactMethod
    public void notification(String title, String content) {
        JPushLocalNotification ln = new JPushLocalNotification();
        ln.setBuilderId(0);
        ln.setContent(content);
        ln.setTitle(title);
        ln.setNotificationId(System.currentTimeMillis()) ;
        ln.setBroadcastTime(System.currentTimeMillis() + 1000*1);
        Map<String , Object> map = new HashMap<String, Object>() ;
        map.put("name", "thomas") ;
        map.put("data", "test") ;
        JSONObject json = new JSONObject(map) ;
        ln.setExtras(json.toString()) ;
       // JPushInterface.addLocalNotification(MainActivity.mainContent, ln);
        JPushInterface.addLocalNotification(this.context, ln);
    }

    @ReactMethod
    public void getCFUUID(Callback resultCallback) {
        resultCallback.invoke("deviceId", getCFUUID());
    }

    public String getCFUUID() {
        String storedUuid = pref.getString(KEY_UUID, null);
        boolean isGranted = ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED;

        if (storedUuid != null && storedUuid != "") {
            return storedUuid;
        } else {
            String res = null;
            if (isGranted) {
                TelephonyManager TelephonyMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
                String szImei = TelephonyMgr.getDeviceId();
                try {
                    res = UUID.nameUUIDFromBytes(szImei.getBytes("utf8")).toString();
                    saveUUIDLocally(res);
                } catch (Exception e) {
                }
            }
            return res;
        }
    }

    public void saveUUIDLocally(String uuid) {
        editor.putString(KEY_UUID, uuid);
        editor.commit();
    }

    @ReactMethod
    public void getVersionCode(Callback resultCallback) {
        String versionName = getPackageInfo(context).versionName;
        if (versionName != null && versionName != "") {
            resultCallback.invoke(versionName);
        }
    }

    @ReactMethod
    public void getAffCode(Callback resultCallback) {
        String affCode = AppUtil.getAFFCode(context);
        if (null == affCode) affCode = "";
        resultCallback.invoke(affCode);
    }

    @ReactMethod
    public void isAndroidRootDevice(Callback resultCallback) {
        try {
//            boolean result = RootUtil.isDeviceRooted();
//            resultCallback.invoke(result);
        } catch (Exception e) {

        }
    }

    private static PackageInfo getPackageInfo(Context context) {
        PackageInfo pi = null;

        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);

            return pi;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pi;
    }

    @ReactMethod
    public void updateApp(String url) {
        UpdateManager updateManager = new UpdateManager(getCurrentActivity());
        updateManager.setUrl(url);
        updateManager.update();
    }

    @ReactMethod
    public void getAppName(Callback callback) {
        PackageManager packageManager = null;
        ApplicationInfo applicationInfo = null;
        try {
            packageManager = context.getPackageManager();
            applicationInfo = packageManager.getApplicationInfo(context.getPackageName(), 0);
        } catch (PackageManager.NameNotFoundException e) {
            applicationInfo = null;
        }
        String applicationName = (String) packageManager.getApplicationLabel(applicationInfo);
        callback.invoke(applicationName);
    }


    @ReactMethod
    public void openWebViewFromJs(String url) {
        try {
            Activity currentActivity = getCurrentActivity();
            Intent intent = new Intent(currentActivity, JXWebView.class);
            intent.putExtra("url", url);
            currentActivity.startActivity(intent);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void openNewHome(String homeData) {
        try {
             JSBridge.jumpHome(homeData);
//            Intent intent = new Intent(currentActivity, GameActivity.class);
//            intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
//            intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT | Intent.FLAG_ACTIVITY_PREVIOUS_IS_TOP);
//            intent.putExtra("homeData",homeData);
//            currentActivity.startActivity(intent);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("不能打开Activity : " + e.getMessage());
        }
    }


    @ReactMethod
    public void openGameWebViewFromJs(String url, String title, String platform) {
        try {
            Activity currentActivity = getCurrentActivity();
            Intent intent = new Intent(currentActivity, QP_WebView.class);
            intent.putExtra("url", url);
            intent.putExtra("title", title);
            intent.putExtra("platform", platform);
            currentActivity.startActivity(intent);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void getCanShowIntelligenceBet(Callback resultCallback) {
        try {
            resultCallback.invoke(true);
        } catch (Exception e) {

        }
    }

    @ReactMethod
    public void getAppInfo(Callback callback){
                WritableMap map = Arguments.createMap();
                     String applicationId = getReactApplicationContext().getPackageName();
                     String  idStr =  MainActivity.instance.readMetaDataByTag("PLAT_ID");
                     String  channel = MainActivity.instance.readMetaDataByTag("PLAT_CH");
                     String  subType = MainActivity.instance.readMetaDataByTag("SUB_TYPE");
                     String  appDownloadVersion = MainActivity.instance.readMetaDataByTag("APP_DOWNLOAD_VERSION");
                     String  openInstallKey = MainActivity.instance.readMetaDataByTag("com.openinstall.APP_KEY");
                     map.putString("versionName",getVersionCode());
                     map.putString("Affcode",getAffCode());
                     map.putString("applicationId",applicationId);
                     map.putString("APP_DOWNLOAD_VERSION",appDownloadVersion);
                     map.putString("PLAT_ID",idStr);
                     map.putString("PLAT_CH",channel);
                     map.putString("SUB_TYPE",subType);
                     map.putString("com.openinstall.APP_KEY",openInstallKey);
                     callback.invoke(map);
    }

    @ReactMethod
    public void yunDunStart(String keyStr, String groupId, String tokenStr,String ddomain, String portS,Callback callback) {
        Log.d("YunCeng", "starr===");
        String resultStr = null;
        try {
            int ret = 0;
            StringBuffer target_ip = new StringBuffer();
            StringBuffer targer_port = new StringBuffer();

            // 初始化
            ret = YunCeng.initEx(keyStr, tokenStr);
            Log.d("YunCeng--keyStr--keyStr", "ret==="+ret+"====keyStr=="+keyStr+"---ddomain="+ddomain);
            if (0 == ret) {
                Log.d("YunCeng--keyStr--keyStr", "groupId==="+groupId);
                // 获取IP
                ret = YunCeng.getProxyTcpByDomain(tokenStr, groupId, ddomain, portS, target_ip, targer_port);
                Log.d("YunCeng", "Get IP failed: " + ret);
                if (0 == ret) {
                    resultStr = target_ip.toString() + "_" + targer_port.toString();
                } else {
                    Log.d("YunCeng", "Get IP failed: " + ret);
                }
            } else {
                Log.d("YunCeng", "SDK init failed: " + ret);
            }
            callback.invoke(resultStr);
        } catch (Exception e) {
            Log.d("YunCeng", e.getMessage());
             callback.invoke(resultStr);
        }
    }

    public String getAffCode() {
        return  MainActivity.instance.readMetaDataByTag("TD_CHANNEL_AFFCODE");
    }
    public String getVersionCode() {
        return getPackageInfo(context).versionName;
    }

    public void sendEvent(String onMessage) {
        WritableMap params = Arguments.createMap();
        params.putString("NAME", onMessage);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onMessage", params);
    }


    @ReactMethod
    public void msgToGame(String onMessage) throws JSONException {
        JSBridge.postToGame(onMessage);
    }

    @ReactMethod
    public void jumpToHome(String msg){
        JSBridge.jumpHome(msg);
    }


    @ReactMethod
    public void jumpToRN(String msg){
        JSBridge.jumpRN(msg);
    }

    @ReactMethod
    public void exitApp(){
       MainActivity.instance.finish();
        //mLayaEngine.onDestroy();
        System.exit(0);

        //			JXHelper.instance.exitApp();
//			activity.finish();
//			activity = null;
        //mLayaEngine.onDestroy();
        //System.exit(0);

       //GameActivity.mainInstance.finish();
    }

    // 友盟配置
    @ReactMethod
    public void initUmengShare(String wxKey, String wxSecret){
        MainApplication.getInstance().initUmengShare(wxKey,wxSecret);
    }
}
