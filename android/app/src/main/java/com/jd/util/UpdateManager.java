package com.jd.util;

import android.app.AlertDialog.Builder;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;


import com.jd.R;
import com.jd.numberprogressbar.NumberProgressBar;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.FileCallBack;

import java.io.File;

import okhttp3.Call;

/**
 * @author coolszy
 * @date 2012-4-26
 * @blog http://blog.92coding.com
 */

public class UpdateManager {
    /* ????????? */
    private static final int DOWNLOAD = 1;
    /* ???????????? */
    private static final int DOWNLOAD_FINISH = 2;
    /* ?????????????????? */
    private String mSavePath;
    /* ????????????????????? */
    private int progressTip;
    private static final String SAVE_NAME = "cpApp.apk";

    private String url;
    private Context mContext;
    /* ??????????????? */
    private NumberProgressBar mProgress;
    private Dialog mDownloadDialog;
    private Handler mHandler = new Handler() {
        public void handleMessage(Message msg) {
            switch (msg.what) {
                // ????????????
                case DOWNLOAD:
                    // ?????????????????????
                    mProgress.setProgress(progressTip);
                    break;
                case DOWNLOAD_FINISH:
                    // ????????????
                    installApk();
                    mDownloadDialog.dismiss();
                    break;
                default:
                    break;
            }
        }

        ;
    };

    public UpdateManager(Context context) {
        this.mContext = context;
        String sdpath = Environment.getExternalStorageDirectory() + "/";
        mSavePath = sdpath + "download";
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void update() {
        showDownloadDialog();
    }

    /**
     * ???????????????????????????
     */
    private void showDownloadDialog() {
        // ???????????????????????????
        Builder builder = new Builder(mContext);
        // ?????????????????????????????????
        final LayoutInflater inflater = LayoutInflater.from(mContext);
        View v = inflater.inflate(R.layout.softupdate_progress, null);
        mProgress = (NumberProgressBar) v.findViewById(R.id.update_progress);
        builder.setView(v);
        // ????????????
        builder.setNegativeButton(R.string.soft_update_cancel, new OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
                // ??????????????????
                OkHttpUtils.getInstance().cancelTag(UpdateManager.this);
            }
        });
        mDownloadDialog = builder.create();
        mDownloadDialog.show();
        mProgress.setMax(100);
        // ????????????
        dowloadFile();
    }

    /**
     * ??????APK??????
     */
    private void installApk() {
        File apkfile = new File(mSavePath, SAVE_NAME);
        if (!apkfile.exists()) {
            return;
        }
        // ??????Intent??????APK??????
        Intent i = new Intent(Intent.ACTION_VIEW);
        i.setDataAndType(Uri.parse("file://" + apkfile.toString()), "application/vnd.android.package-archive");
        mContext.startActivity(i);
    }


    private void dowloadFile() {
        File file = new File(mSavePath);
        // ??????????????????????????????
        if (file.exists()) {
            file.delete();
        }

        OkHttpUtils.get().url(url).tag(UpdateManager.this).build().execute(new FileCallBack(mSavePath, SAVE_NAME) {
            @Override
            public void onError(Call call, Exception e, int id) {
            }

            @Override
            public void onResponse(File response, int id) {
            }

            @Override
            public void inProgress(float progress, long total, int id) {
                super.inProgress(progress, total, id);
                // ????????????
                progressTip = (int) (progress * 100);
                mHandler.sendEmptyMessage(DOWNLOAD);
                if (progress >= 1) {
                    // ????????????
                    mHandler.sendEmptyMessage(DOWNLOAD_FINISH);
                }
            }
        });
    }
}
