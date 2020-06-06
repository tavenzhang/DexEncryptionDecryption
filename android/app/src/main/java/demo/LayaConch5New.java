package demo;

import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Toast;

import layaair.game.browser.ConchJNI;
import layaair.game.browser.ExportJavaFunction;
import layaair.game.conch.LayaConch5;
import layaair.game.network.NetworkReceiver;

public class LayaConch5New extends LayaConch5 {

    public LayaConch5New(Context var1) {
        super(var1);
    }

    public boolean onKey(View var1, int var2, KeyEvent var3) {
        Log.e("input", ">>>>>>>>>>>>>>>>" + var2);
        if (var3.getAction() == 0) {
            ConchJNI.handleKeyEvent(var2, 0);
        } else if (var3.getAction() == 1) {
            ConchJNI.handleKeyEvent(var2, 1);
        }

        ExportJavaFunction var7;
        if ((var7 = ExportJavaFunction.GetInstance()) != null && var7.m_pEngine.getIsPlug()) {
            return false;
        } else {
            Log.e("", "exp is null");
            if (var2 == 4 && var3.getAction() == 0) {
                Log.e("", "onKey = " + var2);
//                if (!ConchJNI.onBackPressed()) {
//                    long var5 = System.currentTimeMillis();
//                    if (this.m_nBackPressTime == 0L || this.m_nBackPressTime > 0L && var5 - this.m_nBackPressTime > 3500L) {
//                        this.m_nBackPressTime = System.currentTimeMillis();
//                        Activity var8 = (Activity)this.mCtx;
//                        if (this.isFinishing(var8)) {
//                            return true;
//                        }
//
//                        Toast.makeText(this.mCtx, this.m_strOnBackPressed, 1).show();
//                    } else {
//                        this.game_plugin_exitGame();
//                    }
//
//                    return false;
//                }
            }

            return var2 == 4 && var3.getAction() == 1;
        }
    }
}
