package com.jd.ApkEncryption;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
//import android.support.annotation.NonNull;
//import android.support.annotation.Nullable;
import android.util.Log;


import androidx.annotation.NonNull;

import javax.annotation.Nullable;


public class MyProvider extends ContentProvider {

    String TAG = "APKEncryption";

    @Override
    public boolean onCreate() {
        Log.i(TAG, "provider onCreate:" + getContext());
        Log.i(TAG, "provider onCreate:" + getContext().getApplicationContext());
        Log.i(TAG, "provider onCreate:" + getContext().getApplicationInfo().className);
        return true;
    }

    @Nullable
    @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String
            selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        return null;
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {
        return null;
    }

    @Nullable
    @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) {
        return null;
    }

    @Override
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[]
            selectionArgs) {
        Log.i("DevYK", "provider delete:" + getContext());
        return 0;
    }

    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String
            selection, @Nullable String[] selectionArgs) {
        return 0;
    }
}
