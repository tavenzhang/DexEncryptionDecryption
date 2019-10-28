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
             * 修改昵称
             */
            var SetNickNameDlg = /** @class */ (function (_super) {
                __extends(SetNickNameDlg, _super);
                function SetNickNameDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                SetNickNameDlg.show = function () {
                    var dlg = new SetNickNameDlg();
                    dlg.popup(false, true);
                };
                SetNickNameDlg.prototype.initView = function () {
                    var _this = this;
                    LobbyModel.reqNickName(this, function (str) {
                        if (_this.destroyed)
                            return;
                        _this.nickTxt.text = str;
                    }, true);
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.cancelBtn, this, function () {
                        SoundPlayer.clickSound();
                        if (_this.nickTxt.text == "") {
                            Toast.showToast("昵称不能为空");
                            return;
                        }
                        _this.reqSetNickName();
                    });
                    this.nickTxt.on(Laya.Event.INPUT, this, this.inputHandler);
                    this.diceBtn.interval = 60;
                    EventManager.addTouchScaleListener(this.diceBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.diceBtn.mouseEnabled = false;
                        _this.cancelBtn.mouseEnabled = false;
                        _this.diceBtn.play();
                        var time = Math.random() * 400 + 600 >> 0;
                        Laya.timer.once(time, _this, _this.reqNickName);
                    }, null, 0.8, true);
                };
                //请求随机昵称
                SetNickNameDlg.prototype.reqNickName = function () {
                    var _this = this;
                    LobbyModel.reqNickName(this, function (str) {
                        if (_this.destroyed)
                            return;
                        _this.nickTxt.text = str;
                        _this.cancelBtn.mouseEnabled = true;
                        _this.diceBtn.mouseEnabled = true;
                        _this.diceBtn.stop();
                    }, true);
                };
                //限制字符数
                SetNickNameDlg.prototype.inputHandler = function () {
                    var str = this.nickTxt.text;
                    var len = Tools.getStringLength(str);
                    if (len <= this.nickTxt.maxChars) {
                        this.inputStr = str;
                    }
                    else {
                        this.nickTxt.text = Tools.trimRight(this.inputStr);
                    }
                };
                //请求设置昵称
                SetNickNameDlg.prototype.reqSetNickName = function () {
                    var _this = this;
                    LayaMain.getInstance().showCircleLoading();
                    HttpRequester.getHttpData(ConfObjRead.httpCmd.setnickname + this.nickTxt.text, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            if (jobj.code == 1001) { //修改成功
                                _this.close(null, true);
                                LobbyModel.reqUserCurrentInfo();
                            }
                            Toast.showToast(jobj.message || "");
                        }
                    });
                };
                SetNickNameDlg.prototype.onClosed = function (type) {
                    Laya.timer.clear(this, this.reqNickName);
                    this.diceBtn.stop();
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return SetNickNameDlg;
            }(ui.dlg.center.SetNickNameDlgUI));
            center.SetNickNameDlg = SetNickNameDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=SetNickNameDlg.js.map