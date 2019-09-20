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
                    EventManager.addTouchScaleListener(this.cancelBtn, this, function () {
                        SoundPlayer.clickSound();
                        //todo:等后端接口
                    });
                };
                SetNickNameDlg.prototype.onClosed = function (type) {
                    EventManager.removeBtnEvent(this.cancelBtn);
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