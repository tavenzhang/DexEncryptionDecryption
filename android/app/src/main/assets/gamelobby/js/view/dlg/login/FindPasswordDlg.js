var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var dlg;
    (function (dlg_1) {
        var login;
        (function (login) {
            /**
             * 找回密码
             */
            var FindPasswordDlg = /** @class */ (function (_super) {
                __extends(FindPasswordDlg, _super);
                function FindPasswordDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                FindPasswordDlg.show = function () {
                    var dlg = new FindPasswordDlg();
                    dlg.popup(false, true);
                };
                FindPasswordDlg.prototype.initView = function () {
                    var _this = this;
                    this.pwdExtend1 = InputExtend.getInput(this.pwdTxt1);
                    this.pwdExtend2 = InputExtend.getInput(this.pwdTxt2);
                    //关闭
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //获取验证码
                    EventManager.addTouchScaleListener(this.codeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.getPhoneVerCode();
                    });
                    //确定
                    EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                        SoundPlayer.closeSound();
                        var pwd1 = _this.pwdExtend1 ? _this.pwdExtend1.text : _this.pwdTxt1.text;
                        var pwd2 = _this.pwdExtend2 ? _this.pwdExtend2.text : _this.pwdTxt2.text;
                        if (!_this.checkTxt())
                            return;
                        if (pwd1 != pwd2) {
                            Toast.showToast("两次密码输入不一致");
                            return;
                        }
                        var epwd = GameUtils.encryptPwd(pwd1);
                        var data = {
                            isWep: !GameUtils.isNativeApp,
                            mode: "PASSWORD",
                            newPassword: epwd,
                            phoneNumber: _this.phoneTxt.text,
                            verificationCode: _this.codeTxt.text
                        };
                        LayaMain.getInstance().showCircleLoading(true);
                        LoginModel.findPassword(ConfObjRead.httpCmd.findPassword, data, _this, _this.findResult);
                    });
                };
                FindPasswordDlg.prototype.getPhoneVerCode = function () {
                    if (this.phoneTxt.text == "") {
                        Toast.showToast("手机号不能为空");
                        return;
                    }
                    this.codeTxt.text = "";
                    this.codeBtn.visible = false;
                    this.codeTime = 60;
                    this.timeTxt.text = this.codeTime.toString();
                    Laya.timer.loop(1000, this, this.updateCodeTime);
                    HttpRequester.getPhoneVercode(this.phoneTxt.text, false, VerCodeType.MSG_RESET_PWD, null, null);
                };
                FindPasswordDlg.prototype.updateCodeTime = function () {
                    this.codeTime--;
                    this.timeTxt.text = this.codeTime.toString();
                    if (this.codeTime <= 0) {
                        this.clearCodeTime();
                        this.codeBtn.visible = true;
                    }
                };
                FindPasswordDlg.prototype.clearCodeTime = function () {
                    Laya.timer.clear(this, this.updateCodeTime);
                };
                FindPasswordDlg.prototype.findResult = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        Toast.showToast("密码修改成功");
                        //密码修改成功后自动登录
                        LoginModel.accountLogin({
                            user: this.phoneTxt.text,
                            pwd: this.pwdExtend1 ? this.pwdExtend1.text : this.pwdTxt1.text,
                            type: LoginMethod.account
                        }, this, this.loginResult);
                    }
                };
                //自动登录结果
                FindPasswordDlg.prototype.loginResult = function (suc) {
                    if (suc) {
                        Dialog.manager.closeAll();
                        LayaMain.getInstance().initLobby();
                    }
                    else {
                        console.error("重置找回密码后登录失败");
                    }
                };
                FindPasswordDlg.prototype.checkTxt = function () {
                    var bl = GameUtils.checkStr(this.phoneTxt.text, "请输入手机号");
                    if (!bl)
                        return false;
                    bl = GameUtils.checkStr(this.codeTxt.text, "请输入验证码");
                    if (!bl)
                        return false;
                    bl = GameUtils.checkStr(this.pwdTxt1.text, "请输入密码");
                    if (!bl)
                        return false;
                    bl = GameUtils.checkStr(this.pwdTxt2.text, "请输入确定密码");
                    if (!bl)
                        return false;
                    return true;
                };
                FindPasswordDlg.prototype.onClosed = function (type) {
                    this.clearCodeTime();
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return FindPasswordDlg;
            }(ui.dlg.login.FindPasswordDlgUI));
            login.FindPasswordDlg = FindPasswordDlg;
        })(login = dlg_1.login || (dlg_1.login = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=FindPasswordDlg.js.map