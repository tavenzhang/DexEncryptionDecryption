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
        var balance;
        (function (balance) {
            /**
             * 余额宝密码设置
             */
            var BalancePwdDlg = /** @class */ (function (_super) {
                __extends(BalancePwdDlg, _super);
                function BalancePwdDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                BalancePwdDlg.show = function (money) {
                    var dlg = new BalancePwdDlg();
                    dlg.money = money;
                    dlg.popup(false, true);
                };
                BalancePwdDlg.prototype.initView = function () {
                    // this.pwdExtend1 = InputExtend.getInput(this.pwdTxt1);
                    // this.pwdExtend2 = InputExtend.getInput(this.pwdTxt2);
                    var _this = this;
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.okBtn, this, function () {
                        SoundPlayer.clickSound();
                        var bl = GameUtils.checkStr(_this.pwdTxt1.text, "密码不能为空");
                        if (!bl)
                            return;
                        if (!_this.checkPwd(1, 2)) {
                            Toast.showToast("确认密码输入错误");
                            return;
                        }
                        LayaMain.getInstance().showCircleLoading();
                        var pwd = _this.pwdExtend2 ? _this.pwdExtend2.text : _this.pwdTxt2.text;
                        HttpRequester.postHttpData(ConfObjRead.httpCmd.yuebaoSetPwd, { newYebPassword: pwd }, _this, _this.setPwdCallback);
                    });
                    if (this.pwdExtend1) {
                        this.lookBtn1.visible = false;
                        this.lookBtn2.visible = false;
                    }
                    else {
                        EventManager.pushEvent(this.lookBtn1, Laya.Event.CHANGE, this, this.togglePwdInput, [this.pwdTxt1]);
                        EventManager.pushEvent(this.lookBtn2, Laya.Event.CHANGE, this, this.togglePwdInput, [this.pwdTxt2]);
                    }
                    //密码设置
                    KeyboardView.bindKeyboard(this.pwdTxt1, { hint: "请输入6位密码", maxLen: 6 });
                    KeyboardView.bindKeyboard(this.pwdTxt2, { hint: "请再次输入密码", maxLen: 6 });
                };
                //比较前后密码输入是否一致
                BalancePwdDlg.prototype.checkPwd = function (id1, id2) {
                    var extend1 = this["pwdExtend" + id1];
                    var extend2 = this["pwdExtend" + id2];
                    var txt1 = this["pwdTxt" + id1];
                    var txt2 = this["pwdTxt" + id2];
                    if (extend1)
                        return extend1.text == extend2.text;
                    return txt1.text == txt2.text;
                };
                BalancePwdDlg.prototype.setPwdCallback = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        this.close(null, true);
                        Toast.showToast("余额宝密码设置成功");
                        view.dlg.balance.UserAuthenDlg.show(this.money);
                        EventManager.dispath(EventType.BALANCE_PADSETING);
                    }
                };
                BalancePwdDlg.prototype.togglePwdInput = function (txt) {
                    GameUtils.onShowPwd(txt);
                };
                BalancePwdDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BalancePwdDlg;
            }(ui.dlg.balance.BalancePwdDlgUI));
            balance.BalancePwdDlg = BalancePwdDlg;
        })(balance = dlg_1.balance || (dlg_1.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BalancePwdDlg.js.map