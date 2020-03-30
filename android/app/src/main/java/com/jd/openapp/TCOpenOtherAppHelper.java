package com.jd.openapp;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by Allen on 2016/12/30.
 */

public class TCOpenOtherAppHelper extends ReactContextBaseJavaModule {
    private Context context;

    public TCOpenOtherAppHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "TCOpenOtherAppHelper";
    }


    @ReactMethod
    public void openWeiXin() {
        openApp("com.tencent.mm", "??????");
    }

    @ReactMethod
    public void openQQ() {
        openApp("com.tencent.mobileqq", "QQ");
    }

    @ReactMethod
    public void openAlipay() {
        openApp("com.eg.android.AlipayGphone", "?????????");
    }

    @ReactMethod
    public void openApp(String appPackage, String appName) {
        try {
            PackageManager packageManager = context.getApplicationContext().getPackageManager();
            Intent intent = packageManager.getLaunchIntentForPackage(appPackage);
            context.startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(context, "?????????" + appName + "??????!", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void screenShotSave() {
        View dView = getCurrentActivity().getWindow().getDecorView();
        dView.setDrawingCacheEnabled(true);
        dView.buildDrawingCache();
        Bitmap bitmap = Bitmap.createBitmap(dView.getDrawingCache());
        if (bitmap != null) {
            try {
                // ????????????SD?????????
                String sdCardPath = Environment.getExternalStorageDirectory().getPath();
                // ??????????????????
                String filePath = sdCardPath + File.separator + "screenshot.png";
                File file = new File(filePath);
                FileOutputStream os = new FileOutputStream(file);
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, os);
                os.flush();
                os.close();
                String mUri = MediaStore.Images.Media.insertImage(context.getContentResolver(), file.getPath(), "screenshot", null);
                if (mUri != null) {
                    // ????????????????????????
                    Intent intent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
                    Uri uri = Uri.fromFile(new File(mUri));
                    intent.setData(uri);
                    context.sendBroadcast(intent);
                }
                Log.d("a7888", "????????????");
            } catch (Exception e) {
            }
        }
    }

    @ReactMethod
    public void exitApp(){
        android.os.Process.killProcess(android.os.Process.myPid());
    }
}
