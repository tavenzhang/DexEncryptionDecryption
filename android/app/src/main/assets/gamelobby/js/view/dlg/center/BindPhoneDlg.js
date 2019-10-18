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
        var center;
        (function (center) {
            /**
             * 绑定手机
             */
            var BindPhoneDlg = /** @class */ (function (_super) {
                __extends(BindPhoneDlg, _super);
                function BindPhoneDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                /**
                 * 显示入口
                 */
                BindPhoneDlg.show = function () {
                    var dlg = new BindPhoneDlg();
                    dlg.popup(false, true);
                };
                BindPhoneDlg.prototype.initView = function () {
                    var _this = this;
                    this.pwdExtend1 = InputExtend.getInput(this.pwdTxt1);
                    this.pwdExtend2 = InputExtend.getInput(this.pwdTxt2);
                    //
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //绑定手机
                    EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.doBindPhone();
                    });
                    //获取验证码
                    EventManager.addTouchScaleListener(this.codeBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.getPhoneVerCode();
                    });
                    EventManager.register(EventType.BLUR_NATIVE, this, this.lostFocusInputText);
                };
                BindPhoneDlg.prototype.lostFocusInputText = function () {
                    this.phoneTxt.focus = false;
                    this.codeTxt.focus = false;
                    this.pwdTxt1.focus = false;
                    this.pwdTxt2.focus = false;
                };
                //开始请求绑定手机
                BindPhoneDlg.prototype.doBindPhone = function () {
                    var _this = this;
                    var pwd1 = this.pwdExtend1 ? this.pwdExtend1.text : this.pwdTxt1.text;
                    var pwd2 = this.pwdExtend2 ? this.pwdExtend2.text : this.pwdTxt2.text;
                    if (!this.checkTxt())
                        return;
                    if (pwd1 != pwd2) {
                        Toast.showToast("两次密码输入不一致");
                        return;
                    }
                    this.clearCodeTime();
                    LayaMain.getInstance().showCircleLoading(true);
                    var epwd = GameUtils.encryptPwd(pwd1);
                    var data = {
                        phoneNumber: this.phoneTxt.text,
                        verificationCode: this.codeTxt.text,
                        device: "WAP",
                        deviceId: GameUtils.deviceToken,
                        isWeb: !GameUtils.isNativeApp,
                        newPassword: epwd
                    };
                    HttpRequester.postHttpData(ConfObjRead.getConfUrl().cmd.bindPhone, data, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        var phoneNum = _this.phoneTxt.text;
                        if (suc) {
                            LoginModel.visitorToAccount(phoneNum, pwd1);
                            Toast.showToast("账号已升级为正式账号，请放心使用");
                            EventManager.dispath(EventType.GETBINDAWARD_SUCC, phoneNum);
                            _this.close(null, true);
                        }
                        else {
                            _this.codeBtn.visible = true;
                            var err = jobj.http.response;
                            var obj = JSON.parse(err);
                            var str = obj.message || "";
                            //设备号限制(绑定成功,但是不能在此设备领取)(备注：由于后端没法区分错误code，临时通过文字判断解决)
                            if (str.indexOf("绑定成功") != -1) {
                                LoginModel.visitorToAccount(phoneNum, pwd1);
                                EventManager.dispath(EventType.GETBINDAWARD_SUCC, phoneNum);
                                _this.close(null, true);
                                Debug.error("绑定超限,绑定成功,但无送金");
                            }
                            Debug.log("手机绑定:" + str);
                        }
                    });
                };
                BindPhoneDlg.prototype.checkTxt = function () {
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
                BindPhoneDlg.prototype.getPhoneVerCode = function () {
                    if (this.phoneTxt.text == "") {
                        Toast.showToast("手机号不能为空");
                        return;
                    }
                    this.codeTxt.text = "";
                    this.codeBtn.visible = false;
                    this.codeTime = 60;
                    this.timeTxt.text = this.codeTime.toString();
                    Laya.timer.loop(1000, this, this.updateCodeTime);
                    HttpRequester.getPhoneVercode(this.phoneTxt.text, true, VerCodeType.MSG_BIND_MOBILE, null, null);
                };
                BindPhoneDlg.prototype.updateCodeTime = function () {
                    this.codeTime--;
                    this.timeTxt.text = this.codeTime.toString();
                    if (this.codeTime <= 0) {
                        this.clearCodeTime();
                        this.codeBtn.visible = true;
                    }
                };
                BindPhoneDlg.prototype.clearCodeTime = function () {
                    Laya.timer.clear(this, this.updateCodeTime);
                };
                BindPhoneDlg.prototype.onClosed = function (type) {
                    this.clearCodeTime();
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BindPhoneDlg;
            }(ui.dlg.center.BindPhoneDlgUI));
            center.BindPhoneDlg = BindPhoneDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BindPhoneDlg.js.map