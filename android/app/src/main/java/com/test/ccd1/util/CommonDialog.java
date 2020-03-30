package com.test.ccd1.util;

import android.app.Dialog;
import android.content.Context;

import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.StyleRes;
import com.test.ccd1.R;

/**
 * Created by mason on 2018/9/19.
 */
public class CommonDialog extends Dialog {

    private TextView mTvTitle; // ??????????????????

    private Button mBtnNegative, mBtnPositive; // ???????????????????????????

    public CommonDialog(@NonNull Context context) {
        this(context, 0);
    }

    public CommonDialog(@NonNull Context context, @StyleRes int themeResId) {
        super(context, themeResId == 0 ? R.style.DefaultDialogStyle : themeResId);

        final Window window = getWindow();
        window.setGravity(Gravity.CENTER);
        setCancelable(true);
        setCanceledOnTouchOutside(true);

        View rootView = View.inflate(context, R.layout.dialog_common_layout, null);
        mTvTitle = (TextView) rootView.findViewById(R.id.tv_dialog_title);
        mBtnNegative = (Button) rootView.findViewById(R.id.btn_negative);
        mBtnPositive = (Button) rootView.findViewById(R.id.btn_positive);

        setContentView(rootView);
    }

    /**
     * ????????????
     */
    public void setDialogTitle(String title) {
        mTvTitle.setText(title);
    }

    /**
     * ??????????????????????????????
     *
     * @param negative ????????????
     * @param listener ????????????
     */
    public void setNegativeBtn(String negative, @NonNull View.OnClickListener listener) {
        mBtnNegative.setText(negative);
        mBtnNegative.setOnClickListener(listener);
    }

    /**
     * ??????????????????????????????
     *
     * @param positive ????????????
     * @param listener ????????????
     */
    public void setPositiveBtn(String positive, @NonNull View.OnClickListener listener) {
        mBtnPositive.setText(positive);
        mBtnPositive.setOnClickListener(listener);
    }
}
