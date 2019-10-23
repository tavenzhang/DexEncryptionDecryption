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
             * 金额按钮
             */
            var PayMoneyBtn = /** @class */ (function (_super) {
                __extends(PayMoneyBtn, _super);
                function PayMoneyBtn() {
                    var _this = _super.call(this) || this;
                    _this._value = 0;
                    _this.selectBg.alpha = 0;
                    return _this;
                }
                Object.defineProperty(PayMoneyBtn.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (vl) {
                        this._value = vl;
                        this.txt.text = vl + "元";
                        this.selectBg.alpha = 0;
                        this.selected = false;
                    },
                    enumerable: true,
                    configurable: true
                });
                PayMoneyBtn.prototype.setSelect = function (bl) {
                    Laya.Tween.to(this.selectBg, { alpha: bl ? 1 : 0 }, 300);
                    this.selected = bl;
                };
                return PayMoneyBtn;
            }(ui.dlg.pay.PayMoneyBtnUI));
            pay.PayMoneyBtn = PayMoneyBtn;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=PayMoneyBtn.js.map