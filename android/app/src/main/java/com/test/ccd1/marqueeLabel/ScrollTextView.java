package com.test.ccd1.marqueeLabel;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.Display;
import android.view.WindowManager;
import android.widget.TextView;


/**
 * ???????????????????????????view
 * Created by Allen on 2016/11/25.
 */

public class ScrollTextView extends TextView {
    public final static String TAG = ScrollTextView.class.getSimpleName();

    private int viewWidth = 0;
    public boolean isStarting = false;//??????????????????
    private Paint paint = null;//????????????
    private String text = "";//????????????
    private String mText; //??????
    private Context mContext;
    private float mTextSize = 46; //????????????
    private int mTextColor = Color.BLACK; //???????????????
    private int mBackgroundColor = Color.WHITE;//?????????
    private boolean mIsRepeat;//??????????????????
    private int mStartPoint;// ?????????????????????  0?????????????????????    1?????????????????????
    private int mDirection;//???????????? 0 ????????????   1????????????
    private float mScrollDuration;//????????????
    public int currentX = 0;// ??????x?????????
    private int textWidth = 0, textHeight = 0;
    public float sepX = 5;//????????????????????????

    public ScrollTextView(Context context) {
        this(context, null);
    }

    public ScrollTextView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public ScrollTextView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        this.mContext = context;
        init();
    }


    void setText(String text) {
        mText = text;
    }

    void setViewTextSize(float size) {
        mTextSize = size;
    }

    void setViewTextColor(int color) {
        mTextColor = color;
    }

    void setPaintBackgroundColor(int color) {
        mBackgroundColor = color;
    }

    void setIsRepeat(boolean flag) {
        mIsRepeat = flag;
    }

    void setStartPoint(int point) {
        mStartPoint = point;
    }

    void setDirection(int direction) {
        mDirection = direction;
    }

    void setScrollDuration(float scrollDuration) {
        sepX = scrollDuration;
    }

    /**
     * ???????????????????????????????????????????????????????????????????????????????????????????????????
     */
    public void init() {
        paint = getPaint();
        paint.setColor(Color.BLACK);
        mTextColor = Color.RED;
        mTextSize = 48;
        mBackgroundColor = Color.WHITE;
        mIsRepeat = true;
        mStartPoint = 0;
        mDirection = 0;
        mScrollDuration = 10;
        paint.setFlags(Paint.ANTI_ALIAS_FLAG);
        paint.setTextAlign(Paint.Align.LEFT);
    }


    protected void measurementsText(String msg) {
        text = msg;
        textWidth = (int) paint.measureText(msg);
        viewWidth = getWidth();
        paint.setTextSize(mTextSize);
        paint.setColor(mTextColor);
        WindowManager wm = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
        if (viewWidth == 0) {
            if (wm != null) {
                Display display = wm.getDefaultDisplay();
                viewWidth = display.getWidth();
            }
        }
        if (mStartPoint == 0)
            currentX = 0;
        else
            currentX = viewWidth - getPaddingLeft() - getPaddingRight();

    }

    /**
     * ????????????
     */
    public void startScroll() {
        isStarting = true;
        if (!TextUtils.isEmpty(mText)) {
            measurementsText(mText);
        }
        invalidate();
    }

    /**
     * ????????????
     */
    public void stopScroll() {
        isStarting = false;
        invalidate();
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        startScroll();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        stopScroll();
    }

    @Override
    public void onDraw(Canvas canvas) {
        try {
            if (TextUtils.isEmpty(text)) {
                Thread.sleep(1000);//???????????????1???
                return;
            }
            int paddingLeft = getPaddingLeft();
            int paddingTop = getPaddingTop();
            int paddingRight = getPaddingRight();
            int paddingBottom = getPaddingBottom();
            int contentWidth = getWidth() - paddingLeft - paddingRight;
            int contentHeight = getHeight() - paddingTop - paddingBottom;
            int centeYLine = paddingTop + contentHeight / 2;//?????????


            if (mDirection == 0) {//????????????
                if (currentX <= -textWidth) {
                    currentX = contentWidth;
                } else {
                    currentX -= sepX;
                }
            } else {//  ????????????
                if (currentX >= contentWidth) {
                    currentX = -textWidth;
                } else {
                    currentX += sepX;
                }
            }
//            canvas.drawColor(Color.WHITE);
            canvas.drawColor(mBackgroundColor);
            canvas.drawText(text, currentX, centeYLine + dip2px(getContext(), textHeight) / 2, paint);
            invalidate();
        } catch (Exception e) {

        }
    }

    /**
     * dip?????????px
     *
     * @param context
     * @param dpValue
     * @return
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

}