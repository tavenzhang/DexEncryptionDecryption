var ToolsApp = /** @class */ (function () {
    function ToolsApp() {
    }
    /**
     * 读取app数据
     */
    ToolsApp.initAppData = function () {
        var appData = window["appData"];
        if (appData) {
            AppData.IS_NATIVE_APP = true;
            AppData.NATIVE_DATA = appData;
            AppData.isAndroidHack = appData.isAndroidHack;
            Debug.bDebug = appData.isDebug;
            if ("" + appData.clientId == "214" || "" + appData.clientId == "1209" || Debug.bDebug) {
                Debug.showVconsole();
            }
        }
    };
    ToolsApp.getGameJumpUrl = function (host, dir) {
        var a = "";
        if (AppData.IS_NATIVE_APP) {
            a = "/" + dir;
        }
        else {
            a = host + "/" + dir;
        }
        return a;
    };
    /**
     * 通过app数据替换配置域名
     */
    ToolsApp.copyNativeAdress = function () {
        if (AppData.IS_NATIVE_APP) {
            var urlJson = AppData.NATIVE_DATA.urlJSON;
            var localUrlJson = ConfObjRead.getConfUrl();
            Common.clientId = AppData.NATIVE_DATA.clientId;
            Common.brandId = AppData.NATIVE_DATA.brandID;
            Debug.log("initID>>>", Common.clientId, Common.brandId);
            if (urlJson) {
                for (var key in urlJson) {
                    if (localUrlJson[key]) {
                        for (var subKey in urlJson[key]) {
                            if (localUrlJson[key][subKey]) {
                                localUrlJson[key][subKey] = urlJson[key][subKey];
                            }
                        }
                    }
                }
            }
        }
        //
        if (!GameUtils.isNativeApp) {
            // ConfObjRead.getConfUrl().url = ConfObjRead.getConfUrl().urldev;//dev环境(debugxxx)
        }
    };
    return ToolsApp;
}());
//# sourceMappingURL=ToolsApp.js.map