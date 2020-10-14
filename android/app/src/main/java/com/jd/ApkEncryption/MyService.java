package com.jd.ApkEncryption;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
//import android.support.annotation.Nullable;
import android.util.Log;

import javax.annotation.Nullable;


public class MyService extends Service {


    String TAG = "APKEncryption";

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i(TAG, "service:" + getApplication());
        Log.i(TAG, "service:" + getApplicationContext());
        Log.i(TAG, "service:" + getApplicationInfo().className);
    }
}
