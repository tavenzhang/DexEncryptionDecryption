package demo;

import android.app.Activity;
import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.logging.Logger;

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
                        GameActivity.mSplashDialog.setPercent((int)percent);
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
                                Toast.makeText(GameActivity.mainInstance,postMessage ,Toast.LENGTH_SHORT).show();
                                JSONObject json_test = new JSONObject(postMessage);
                                String action=json_test.getString("action");
                                switch(action){
                                    case "nativeStart":
                                          String appCallStr="nativeInitData(\'"+GameActivity.appData+"\')";
                                                ConchJNI.RunJS(appCallStr);
                                   break;
                                case "JumpGame":

                                   break;
                                case "JumpThirdGame"://跳转第三方游戏

                                   break;
                                }
                                String alertStr="alert(\'"+action+"\')";
                                //ConchJNI.RunJS(alertStr);
                              //  ConchJNI.RunJS("nativeMessage('{action:\"popTip\",data:\"mytest\"}')");

                            }catch (Exception e) {
                                Logger.getLogger("error",e.toString());
                            }
                        }
                    });
        }


         public static void postToGame(final String actionData) {
                      String postAction="nativeMessage(\'"+actionData+"\')";
                      ConchJNI.RunJS(postAction);
         }



        
}
