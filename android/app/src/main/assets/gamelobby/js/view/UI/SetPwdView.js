/*
* 修改密码(包括提现，登录和余额宝)
*/
var SetPwdView = /** @class */ (function () {
    function SetPwdView(view) {
        this.codeTime = 0;
        this.view = view;
        this.initView();
    }
    SetPwdView.prototype.initView = function () {
        this.radiobox = new RadioBox([this.view.checkBtn1, this.view.checkBtn2], this, this.checkPwdType);
        //添加密码框切换事件
        for (var i = 1; i <= 5; i++) {
            var txt = this.view["pwdTxt" + i];
            var lookbtn = this.view["lookBtn" + i];
            this["pwdExtend" + i] = InputExtend.getInput(txt);
            if (this["pwdExtend" + i]) {
                lookbtn.visible = false;
            }
            else {
                EventManager.pushEvent(lookbtn, Laya.Event.CHANGE, this, this.togglePwdInput, [txt]);
            }
        }
        EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
    };
    SetPwdView.prototype.lostFocusInputText = function () {
        if (this.view.visible) {
            this.view.pwdTxt1.focus = false;
            this.view.pwdTxt2.focus = false;
            this.view.pwdTxt3.focus = false;
            this.view.pwdTxt4.focus = false;
            this.view.pwdTxt5.focus = false;
            this.view.phoneTxt.focus = false;
            this.view.codeTxt.focus = false;
        }
    };
    SetPwdView.prototype.togglePwdInput = function (txt) {
        GameUtils.onShowPwd(txt);
    };
    SetPwdView.prototype.checkPwdType = function () {
        if (this.radiobox.selectIndex == 0) { //旧密码修改
            this.view.panel1.visible = true;
            this.view.panel2.visible = false;
        }
        else { //短信验证修改
            this.view.phoneTxt.text = Common.userInfo_current.phoneNumber;
            this.view.phoneTxt.editable = false;
            this.view.phoneTxt.mouseEnabled = false;
            this.view.panel1.visible = false;
            this.view.panel2.visible = true;
        }
    };
    //--------------------------public--------------
    //获取指定密码框内容
    SetPwdView.prototype.getPwdStr = function (id) {
        var extend = this["pwdExtend" + id];
        if (extend)
            return extend.text;
        return this.view["pwdTxt" + id].text;
    };
    Object.defineProperty(SetPwdView.prototype, "selectIndex", {
        set: function (value) {
            this.radiobox.selectIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SetPwdView.prototype, "isOldPwd", {
        /**
         * 是否为旧密码修改
         */
        get: function () {
            return Boolean(this.radiobox.selectIndex == 0);
        },
        enumerable: true,
        configurable: true
    });
    SetPwdView.prototype.setGrayIndex = function (index, gray) {
        this.radiobox.setGrayIndex(index, gray);
    };
    SetPwdView.prototype.checkOldPwdInfos = function () {
        var bl = true;
        bl = GameUtils.checkStr(this.view.pwdTxt1.text, "请填写旧密码");
        if (!bl)
            return bl;
        bl = GameUtils.checkStr(this.view.pwdTxt2.text, "请填写新密码");
        if (!bl)
            return bl;
        if (!this.checkPwd(2, 3)) {
            Toast.showToast("两次密码输入不正确，请重新填写");
            return false;
        }
        return true;
    };
    SetPwdView.prototype.checkPhoneCodePwdInfos = function () {
        var bl = true;
        bl = GameUtils.checkStr(this.view.phoneTxt.text, "请填写手机号");
        if (!bl)
            return bl;
        bl = GameUtils.checkStr(this.view.codeTxt.text, "请填写验证码");
        if (!bl)
            return bl;
        bl = GameUtils.checkStr(this.view.pwdTxt4.text, "请输入密码");
        if (!bl)
            return bl;
        if (!this.checkPwd(4, 5)) {
            Toast.showToast("两次密码输入不正确，请重新填写");
            return false;
        }
        return true;
    };
    /**
     * 获取验证码
     * @param type
     */
    SetPwdView.prototype.getPhoneVercode = function (type) {
        var bl = GameUtils.checkStr(this.view.phoneTxt.text, "请填写手机号");
        if (!bl)
            return;
        this.view.getCodeBtn.visible = false;
        this.codeTime = 60;
        this.view.timeTxt.text = this.codeTime.toString();
        Laya.timer.loop(1000, this, this.updateCodeTime);
        HttpRequester.getPhoneVercode(this.view.phoneTxt.text, true, VerCodeType.MSG_RESET_PWD, null, null);
    };
    SetPwdView.prototype.updateCodeTime = function () {
        this.codeTime--;
        this.view.timeTxt.text = this.codeTime.toString();
        if (this.codeTime <= 0) {
            this.clearCodeTime();
            this.view.getCodeBtn.visible = true;
        }
    };
    SetPwdView.prototype.clearCodeTime = function () {
        Laya.timer.clear(this, this.updateCodeTime);
    };
    SetPwdView.prototype.resetView = function () {
        this.view.panel1.visible = false;
        this.view.panel2.visible = false;
        this.resetPwd(1);
        this.resetPwd(2);
        this.resetPwd(3);
        if (this.codeTime <= 0) {
            this.view.phoneTxt.text = this.view.codeTxt.text = "";
            this.resetPwd(4);
            this.resetPwd(5);
        }
        this.radiobox.reset();
    };
    SetPwdView.prototype.clearInput = function () {
        if (this.radiobox.selectIndex == 0) {
            this.resetPwd(1);
            this.resetPwd(2);
            this.resetPwd(3);
        }
        else {
            this.view.phoneTxt.text = this.view.codeTxt.text = "";
            this.resetPwd(4);
            this.resetPwd(5);
        }
    };
    SetPwdView.prototype.resetPwd = function (id) {
        var txt = this.view["pwdTxt" + id];
        var lookbtn = this.view["lookBtn" + id];
        var extend = this["pwdExtend" + id];
        txt.text = "";
        if (extend)
            extend.text = "";
        else {
            txt.type = "password";
            lookbtn.selected = false;
        }
    };
    //比较前后密码输入是否一致
    SetPwdView.prototype.checkPwd = function (id1, id2) {
        var extend1 = this["pwdExtend" + id1];
        var extend2 = this["pwdExtend" + id2];
        var txt1 = this.view["pwdTxt" + id1];
        var txt2 = this.view["pwdTxt" + id2];
        if (extend1)
            return extend1.text == extend2.text;
        return txt1.text == txt2.text;
    };
    SetPwdView.prototype.destroy = function () {
        this.clearCodeTime();
        this.radiobox.destory();
        this.radiobox = null;
        EventManager.removeAllEvents(this);
    };
    return SetPwdView;
}());
//# sourceMappingURL=SetPwdView.js.map