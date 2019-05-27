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
        var bindPhone;
        (function (bindPhone) {
            /**
             * 绑定手机送礼
             */
            var BindPhoneActiveDlg = /** @class */ (function (_super) {
                __extends(BindPhoneActiveDlg, _super);
                function BindPhoneActiveDlg() {
                    var _this = _super.call(this) || this;
                    _this.initView();
                    return _this;
                }
                /**
                 * 显示入口
                 */
                BindPhoneActiveDlg.show = function () {
                    var dlg = new BindPhoneActiveDlg();
                    dlg.popup(false, true);
                };
                BindPhoneActiveDlg.prototype.initView = function () {
                    var _this = this;
                    this.bitFont = new BitmapFont(ResConfig.bitConfit_bindPhone);
                    this.numbox.addChild(this.bitFont);
                    this.bitFont.text = TempData.bindAward.toString();
                    this.bitFont.y = this.numbox.height - this.bitFont.height >> 1;
                    this.numbox.width = this.bitFont.width;
                    this.yuan.x = this.numbox.x + this.numbox.width + 6;
                    //
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //绑定手机
                    EventManager.addTouchScaleListener(this.bindBtn, this, function () {
                        SoundPlayer.clickSound();
                        view.dlg.center.BindPhoneDlg.show();
                        _this.close(null, true);
                    });
                    //已经有手机号了(跳转到手机登录界面)
                    EventManager.addTouchScaleListener(this.backLogin, this, function () {
                        SoundPlayer.clickSound();
                        LayaMain.getInstance().loginOut({ type: LoginType.Phone });
                    }, null, 1);
                };
                BindPhoneActiveDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    this.bitFont.destroy();
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return BindPhoneActiveDlg;
            }(ui.dlg.bindPhone.BindPhoneActiveDlgUI));
            bindPhone.BindPhoneActiveDlg = BindPhoneActiveDlg;
        })(bindPhone = dlg_1.bindPhone || (dlg_1.bindPhone = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BindPhoneActiveDlg.js.map