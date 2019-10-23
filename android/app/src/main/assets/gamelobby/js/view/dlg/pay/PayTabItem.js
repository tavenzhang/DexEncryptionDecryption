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
    (function (dlg) {
        var pay;
        (function (pay) {
            /**
             * 支付方式tab
             */
            var PayTabItem = /** @class */ (function (_super) {
                __extends(PayTabItem, _super);
                function PayTabItem() {
                    var _this = _super.call(this) || this;
                    _this.mouseEnabled = true;
                    _this.tab_on.alpha = 0;
                    return _this;
                }
                PayTabItem.prototype.readData = function (vo) {
                    this.vo = vo;
                    this.payIcon.skin = PayModel.tabIconMap[PayType[vo.code]];
                    this.hotIcon.visible = vo.promotion;
                };
                PayTabItem.prototype.active = function () {
                    this.tab_on.alpha = 0;
                    this.tab_on.x = -50;
                    Laya.Tween.clearTween(this.tab_on);
                    Laya.Tween.to(this.tab_on, { alpha: 1, x: 0 }, 300, Laya.Ease.cubicOut);
                };
                PayTabItem.prototype.deactive = function () {
                    Laya.Tween.clearTween(this.tab_on);
                    Laya.Tween.to(this.tab_on, { alpha: 0 }, 300);
                };
                return PayTabItem;
            }(ui.dlg.pay.PayTabItemUI));
            pay.PayTabItem = PayTabItem;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=PayTabItem.js.map