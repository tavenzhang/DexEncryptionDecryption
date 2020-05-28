package demo;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import com.jd.MainActivity;
import com.jd.jxhelper.JXHelper;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import layaair.game.browser.ConchJNI;


public class JSBridge {
    public static Handler m_Handler = new Handler(Looper.getMainLooper());
    public static Activity mMainActivity = null;

    public static void hideSplash() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        GameActivity.mSplashDialog.dismissSplash();
                    }
                });
    }

    public static void setFontColor(final String color) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        GameActivity.mSplashDialog.setFontColor(Color.parseColor(color));
                    }
                });
    }

    public static void setTips(final JSONArray tips) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        try {
                            String[] tipsArray = new String[tips.length()];
                            for (int i = 0; i < tips.length(); i++) {
                                tipsArray[i] = tips.getString(i);
                            }
                            GameActivity.mSplashDialog.setTips(tipsArray);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
    }

    public static void bgColor(final String color) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        GameActivity.mSplashDialog.setBackgroundColor(Color.parseColor(color));
                    }
                });
    }

    public static void loading(final double percent) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        GameActivity.mSplashDialog.setPercent((int) percent);
                    }
                });
    }

    public static void showTextInfo(final boolean show) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        GameActivity.mSplashDialog.showTextInfo(show);
                    }
                });
    }


    public static void postMessage(final String postMessage) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        try {
                            Log.d("postMessage====", postMessage);
                            JXHelper.instance.sendEvent(postMessage);
                            JSONObject json_test = new JSONObject(postMessage);
                            String action = json_test.getString("action");
                            switch (action) {
                                case "nativeStart":
                                    String appCallStr = "nativeInitData(" + GameActivity.appData + ")";
                                    ConchJNI.RunJS(appCallStr);
                                    break;
                                case "JumpGame":
                                   // JSBridge.jumpRN("");
                                    break;
                                case "JumpThirdGame"://跳转第三方游戏
                                   // JSBridge.jumpRN("");
                                    break;

                            }
                            String alertStr = "alert(\'" + action + "\')";
                            //ConchJNI.RunJS(alertStr);
                            //  ConchJNI.RunJS("nativeMessage('{action:\"popTip\",data:\"mytest\"}')");

                        } catch (Exception e) {
                            Log.e("Exception==", e.toString());
                        }
                    }
                });
    }


    public static void postToGame(String actionData) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        Log.d("postToGame==m_Handler=", actionData);
                        String postAction = "nativeMessage(" + actionData + ")";
                        JSONObject json_test = null;
                        try {
                            json_test = new JSONObject(actionData);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        String action = null;
                        try {
                            action = json_test.getString("action");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        switch (action) {
                            case "runJS":
                                String gameJson = null;
                                try {
                                    gameJson = json_test.getString("data");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                //重新启动gameAcitve 使用最新的域名
                                ConchJNI.RunJS(gameJson);
                                break;
                            case "loadingView":
                                String labelData = null;
                                try {
                                    labelData = json_test.getString("data");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                if(labelData != null){
                                    String[] str = {labelData};
                                    GameActivity.mSplashDialog.setTips(str);
                                }
                                String percent = null;
                                try {
                                    percent = json_test.getString("percent");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                if(percent !=null){
                                    GameActivity.mSplashDialog.setPercent(Integer.parseInt(percent));
                                }
                                break;
                            default:
                                ConchJNI.RunJS(postAction);
                                break;
                        }
                    }});

      //  Toast.makeText(GameActivity.mainInstance, postAction, Toast.LENGTH_SHORT).show();
    }


    public static void jumpRN(final String data) {
        Activity currentActivity = GameActivity.mainInstance;
        Intent intent = new Intent(currentActivity, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
        intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT | Intent.FLAG_ACTIVITY_PREVIOUS_IS_TOP);
        currentActivity.startActivity(intent);
    }

    public static void jumpHome(final String data) {
        Activity currentActivity = MainActivity.instance;
        Intent intent = new Intent(currentActivity, GameActivity.class);

        intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
        intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT | Intent.FLAG_ACTIVITY_PREVIOUS_IS_TOP);
        intent.putExtra("homeData", data);
        currentActivity.startActivity(intent);
    }


}
