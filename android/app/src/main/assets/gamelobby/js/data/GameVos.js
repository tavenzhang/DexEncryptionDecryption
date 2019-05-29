/*
* 骨骼动画数据模型
*/
var AnimVo = /** @class */ (function () {
    function AnimVo() {
        this.textPath = "";
        this.animPath = "";
        this.playSpeed = 1;
        this.loop = true;
        this.loopdelay = 2000;
        this.pos = { x: 0, y: 0 };
        this.stopHide = { value: true };
    }
    return AnimVo;
}());
/**
 * 游戏状态
 */
var GameState;
(function (GameState) {
    GameState[GameState["NORMAL"] = 0] = "NORMAL";
    GameState[GameState["PAUSE"] = 1] = "PAUSE";
    GameState[GameState["EXPECTATION"] = 2] = "EXPECTATION";
    GameState[GameState["UPDATE"] = 3] = "UPDATE";
})(GameState || (GameState = {}));
/**
 * 验证码类型
 */
var VerCodeType;
(function (VerCodeType) {
    VerCodeType[VerCodeType["MSG_LOGIN"] = 0] = "MSG_LOGIN";
    VerCodeType[VerCodeType["MSG_RESET_PWD"] = 1] = "MSG_RESET_PWD";
    VerCodeType[VerCodeType["MSG_BIND_MOBILE"] = 2] = "MSG_BIND_MOBILE";
})(VerCodeType || (VerCodeType = {}));
//# sourceMappingURL=GameVos.js.map