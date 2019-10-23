var Debug = /** @class */ (function () {
    function Debug() {
    }
    Object.defineProperty(Debug, "httpDebug", {
        //日志开关(通过http获取的)
        get: function () {
            return this._httDebug;
        },
        set: function (value) {
            this._httDebug = value;
            if (value)
                this.showVconsole();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 显示打印器统一入口
     */
    Debug.showVconsole = function () {
        if (!this.inited) {
            if (this.isapp)
                window["initVconsole"]();
            this.inited = true;
        }
    };
    /**
     * 普通输出
     * @param mess
     * @param parms
     */
    Debug.log = function (mess) {
        var parms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parms[_i - 1] = arguments[_i];
        }
        if (!this.inited && this.isapp)
            return;
        console.log.apply(console, [mess].concat(parms));
    };
    /**
     * 异常打印
     * @param mess
     * @param parms
     */
    Debug.error = function (mess) {
        var parms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parms[_i - 1] = arguments[_i];
        }
        if (!this.inited && this.isapp)
            return;
        console.error.apply(console, [mess].concat(parms));
    };
    Debug.isapp = false; //vconsole专用
    Debug.bDebug = window["bDebug"]; //app控制的开关
    Debug.bDebugPlatform = window["bDebugPlatform"];
    Debug._httDebug = false;
    Debug.inited = false;
    return Debug;
}());
//# sourceMappingURL=Debug.js.map