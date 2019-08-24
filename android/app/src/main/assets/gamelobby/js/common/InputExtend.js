/*
* 用于解决安卓手机开启了安全键盘后，点击密码框后再点击其他输入框就不能输入中文了，键盘也没办法切换
* jerry
*/
var InputExtend = /** @class */ (function () {
    function InputExtend(input) {
        this._text = "";
        this.isPwd = true; //默认为密码显示方式
        this.input = input;
        input.type = "text";
        input.on(Laya.Event.FOCUS, this, this.onFocus);
        input.on(Laya.Event.BLUR, this, this.onBlur);
    }
    /**
     * 创建入口
     * @param input
     */
    InputExtend.getInput = function (input) {
        if (Laya.Browser.onAndroid)
            return new InputExtend(input);
        return null;
    };
    //获得焦点
    InputExtend.prototype.onFocus = function (e) {
        this.input.text = this._text;
    };
    //失去
    InputExtend.prototype.onBlur = function (e) {
        this._text = this.input.text;
        if (this._text == "")
            return;
        var reg = /([^\s])/g; //匹配任意非空白字符
        var star = this._text.replace(reg, "●");
        this.input.text = star;
    };
    Object.defineProperty(InputExtend.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            this.input.text = value;
            this.onBlur(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputExtend.prototype, "isPassword", {
        get: function () {
            return this.isPwd;
        },
        //设置是否为密码格式显示
        set: function (value) {
            this.isPwd = value;
            if (this.input.type != "text")
                this.input.type = "text";
            value ? this.onBlur(null) : this.onFocus(null);
        },
        enumerable: true,
        configurable: true
    });
    InputExtend.prototype.dispose = function () {
        if (this.input) {
            this.input.off(Laya.Event.FOCUS, this, this.onFocus);
            this.input.off(Laya.Event.BLUR, this, this.onBlur);
        }
    };
    return InputExtend;
}());
//# sourceMappingURL=InputExtend.js.map