var ConfObjRead = /** @class */ (function () {
    function ConfObjRead() {
    }
    ConfObjRead.getConfText = function () {
        if (!ConfObjRead.textObj) {
            ConfObjRead.textObj = Laya.Loader.getRes("./assets/conf/textconf.json");
        }
        return ConfObjRead.textObj;
    };
    ConfObjRead.getConfCommon = function () {
        if (!this.commonObj) {
            this.commonObj = Laya.Loader.getRes("./assets/conf/config.json");
        }
        return this.commonObj;
    };
    ConfObjRead.getConfUrl = function () {
        if (!ConfObjRead.urlObj) {
            ConfObjRead.urlObj = Laya.Loader.getRes("./assets/conf/urls.json");
        }
        return ConfObjRead.urlObj;
    };
    Object.defineProperty(ConfObjRead, "httpCmd", {
        //获取http-cmd
        get: function () {
            return this.getConfUrl().cmd;
        },
        enumerable: true,
        configurable: true
    });
    ConfObjRead.getGameIconConfig = function () {
        if (!this.gameIconConfig) {
            this.gameIconConfig = Laya.Loader.getRes("./assets/conf/gameIcons.json");
            this.graySuffix = this.gameIconConfig.graySuffix || "_gray";
        }
        return this.gameIconConfig;
    };
    ConfObjRead.getVerConfig = function () {
        if (!this.verConfig) {
            this.verConfig = Laya.Loader.getRes("./assets/conf/version.json");
        }
        return this.verConfig;
    };
    ConfObjRead.textObj = null;
    ConfObjRead.commonObj = null;
    ConfObjRead.urlObj = null;
    /**
     * 游戏图标配置
     */
    ConfObjRead.gameIconConfig = null;
    ConfObjRead.graySuffix = ""; //灰度图片后缀
    ConfObjRead.verConfig = null;
    return ConfObjRead;
}());
//# sourceMappingURL=ConfObjRead.js.map