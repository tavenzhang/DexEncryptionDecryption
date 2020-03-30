package com.jd.invokenative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by wangfei on 17/8/28.
 */

public class DplusReactPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    /**
     * ?????????????????????????????????????????????add
     *
     * @param reactContext
     * @return
     */
    @Override
    public List<NativeModule> createNativeModules(
        ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
       // modules.add(new ShareModule(reactContext));
//        modules.add(new PushModule(reactContext));
        modules.add(new AnalyticsModule(reactContext));
        return modules;
    }

//    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
}