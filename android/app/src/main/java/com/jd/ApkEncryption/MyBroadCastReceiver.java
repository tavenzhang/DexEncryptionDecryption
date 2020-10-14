package com.jd.ApkEncryption;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;


public class MyBroadCastReceiver extends BroadcastReceiver {


    String TAG = "APKEncryption";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(TAG, "receiver:" + context);
        Log.i(TAG, "receiver:" + context.getApplicationContext());
        Log.i(TAG, "receiver:" + context.getApplicationInfo().className);

    }
}
