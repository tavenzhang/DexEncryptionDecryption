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
                    if (BindPhoneActiveDlg.opened)
                        return;
                    var dlg = new BindPhoneActiveDlg();
                    dlg.popup(false, true);
                    BindPhoneActiveDlg.opened = true;
                };
                BindPhoneActiveDlg.prototype.initView = function () {
                    var _this = this;
                    this.line = new Laya.TimeLine();
                    this.line.to(this.star1, { alpha: 0, scaleX: 0.5, scaleY: 0.5, rotation: 360 }, 600)
                        .to(this.star1, { alpha: 1, scaleX: 1, scaleY: 1, rotation: 360 }, 600, null, 400);
                    this.line.play(0, true);
                    this.line2 = new Laya.TimeLine();
                    this.line2.to(this.star2, { alpha: 0, scaleX: 0.5, scaleY: 0.5, rotation: 360 }, 900)
                        .to(this.star2, { alpha: 1, scaleX: 1.5, scaleY: 1.5, rotation: 360 }, 900, null, 600);
                    this.line2.play(0, true);
                    this.btnline = new Laya.TimeLine();
                    this.btnline.to(this.bindBtn, { scaleX: 1.05, scaleY: 1.05 }, 600, Laya.Ease.elasticOut, 1200)
                        .to(this.bindBtn, { scaleX: 1, scaleY: 1 }, 600, null, 600);
                    this.btnline.play(0, true);
                    this.bitFont = new BitmapFont(ResConfig.bitFont_bindPhone);
                    this.numbox.addChild(this.bitFont);
                    this.bitFont.text = GameData.bindAward.toString();
                    this.bitFont.y = this.numbox.height - this.bitFont.height >> 1;
                    this.numbox.width = this.bitFont.width;
                    this.numbox.x = this.width - this.numbox.width >> 1;
                    this.jbIcon.x = this.numbox.x + this.numbox.width;
                    // let isbind = Common.userInfo_current.certifiedPhone;
                    // if (isbind) this.bindBtn.skin = "ui/bindPhone/btn_bdsj_ljlq01.png";
                    //
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //绑定手机或领取奖励
                    EventManager.addTouchScaleListener(this.bindBtn, this, function () {
                        SoundPlayer.clickSound();
                        PageManager.showDlg(DlgCmd.bindPhone);
                        _this.close(null, true);
                    });
                };
                BindPhoneActiveDlg.prototype.onClosed = function (type) {
                    this.line.destroy();
                    this.line2.destroy();
                    this.btnline.destroy();
                    EventManager.removeAllEvents(this);
                    this.bitFont.destroy();
                    BindPhoneActiveDlg.opened = false;
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                    // PageManager.clearDlgRes(DlgCmd.bindPhoneAct);
                };
                return BindPhoneActiveDlg;
            }(ui.dlg.bindPhone.BindPhoneActiveDlgUI));
            bindPhone.BindPhoneActiveDlg = BindPhoneActiveDlg;
        })(bindPhone = dlg_1.bindPhone || (dlg_1.bindPhone = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BindPhoneActiveDlg.js.map