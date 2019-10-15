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
             * 转账结果展示
             */
            var PayResultView = /** @class */ (function (_super) {
                __extends(PayResultView, _super);
                function PayResultView() {
                    var _this = _super.call(this) || this;
                    _this.centerX = _this.centerY = 0;
                    return _this;
                }
                PayResultView.prototype.show = function (money) {
                    this.moneyTxt.text = money.toString();
                    this.dwTxt.x = this.moneyTxt.x + this.moneyTxt.textWidth + 4;
                    //确定
                    EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                        SoundPlayer.clickSound();
                        PayManager.inst.showLastView();
                    });
                };
                return PayResultView;
            }(ui.dlg.pay.PayResultViewUI));
            pay.PayResultView = PayResultView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=PayResultView.js.map