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
             * 账号登录界面
             */
            var AccountLoginDlg = /** @class */ (function (_super) {
                __extends(AccountLoginDlg, _super);
                function AccountLoginDlg(vo) {
                    var _this = _super.call(this) || this;
                    _this.vo = vo;
                    _this.initView();
                    return _this;
                }
                /**
                 *
                 * @param vo 如果有这个数据就表示需要显示邀请码
                 */
                AccountLoginDlg.show = function (vo) {
                    var dlg = new AccountLoginDlg(vo);
                    dlg.popup(false, true);
                };
                AccountLoginDlg.prototype.initView = function () {
                    var _this = this;
                    this.pwdExtend = InputExtend.getInput(this.pwdTxt);
                    this.codeGroup.visible = this.vo ? true : false;
                    if (this.vo)
                        this.codeImg.skin = LoginModel.askCode;
                    //关闭
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //忘记密码
                    EventManager.addTouchScaleListener(this.pwdBtn, this, function () {
                        SoundPlayer.enterPanelSound();
                        view.dlg.login.FindPasswordDlg.show();
                    });
                    //刷新二维码
                    EventManager.addTouchScaleListener(this.codeImg, this, function () {
                        SoundPlayer.clickSound();
                        _this.codeImg.skin = LoginModel.askCode;
                    }, null, 1);
                    //开始登录
                    EventManager.addTouchScaleListener(this.loginBtn, this, function () {
                        SoundPlayer.clickSound();
                        var name = _this.userTxt.text;
                        var pwd = _this.pwdExtend ? _this.pwdExtend.text : _this.pwdTxt.text;
                        if (name == "debug" && pwd == "123") { //open-debug
                            view.debug.DebugDlg.show();
                            _this.close(null, true);
                            return;
                        }
                        var verify = Tools.verifyLogin(name, pwd, "111");
                        if (!verify.bRight) {
                            Toast.showToast(Tools.getStringByKey(verify.msg));
                            return;
                        }
                        if (_this.vo) {
                            if (_this.codeTxt.text.length < 6) {
                                Toast.showToast("请输入6位数验证码");
                                return;
                            }
                        }
                        var vo = {
                            user: name,
                            pwd: pwd,
                            type: _this.vo ? _this.vo.type : LoginMethod.account
                        };
                        if (!Common.gatewayInfo) {
                            LoginModel.readGatewayInfo(true, _this, _this.doLogin, vo);
                            return;
                        }
                        _this.vo ? _this.doLoginWithVC(vo) : _this.doLogin(vo);
                    });
                };
                //开始登录
                AccountLoginDlg.prototype.doLogin = function (vo) {
                    var _this = this;
                    LoginModel.accountLogin(vo, this, function (suc) {
                        if (suc) { //登录成功
                            _this.close();
                            LayaMain.getInstance().initLobby();
                        }
                        else { //弱账号，需要输入验证码
                            _this.codeGroup.visible = true;
                            _this.codeImg.skin = LoginModel.askCode;
                            _this.vo = {
                                user: _this.userTxt.text,
                                pwd: "",
                                type: LoginMethod.account
                            };
                        }
                    });
                };
                //带验证码登录
                AccountLoginDlg.prototype.doLoginWithVC = function (vo) {
                    var _this = this;
                    LoginModel.accountLoginWithVC(vo, this.codeTxt.text, this, function (suc) {
                        if (suc) {
                            _this.close();
                            LayaMain.getInstance().initLobby();
                        }
                        else {
                            _this.codeImg.skin = LoginModel.askCode;
                            _this.codeTxt.text = "";
                        }
                    });
                };
                AccountLoginDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return AccountLoginDlg;
            }(ui.dlg.login.AccountLoginDlgUI));
            login.AccountLoginDlg = AccountLoginDlg;
        })(login = dlg_1.login || (dlg_1.login = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AccountLoginDlg.js.map