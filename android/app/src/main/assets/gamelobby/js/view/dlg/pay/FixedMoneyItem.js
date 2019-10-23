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
             * 固定金额item
             */
            var FixedMoneyItem = /** @class */ (function (_super) {
                __extends(FixedMoneyItem, _super);
                function FixedMoneyItem() {
                    var _this = _super.call(this) || this;
                    _this.txtColors = ["#8eb5ee", "#663d12"]; //默认颜色，选中颜色
                    _this.selectBg.alpha = 0;
                    return _this;
                }
                FixedMoneyItem.prototype.readData = function (vo) {
                    this.vo = vo;
                    if (vo.combineVo) { //说明是银行列表合并数据
                        this.titleTxt.text = vo.combineVo.receiptName;
                        this.scopeTxt.text = "￥" + vo.combineVo.minAmount + "-" + vo.combineVo.maxAmount;
                    }
                    else {
                        this.titleTxt.text = vo.merchantName;
                        this.scopeTxt.text = "￥" + vo.minAmount + "-" + vo.maxAmount;
                    }
                    this.titleTxt.color = this.txtColors[0];
                    this.scopeTxt.color = this.txtColors[0];
                };
                Object.defineProperty(FixedMoneyItem.prototype, "selected", {
                    get: function () {
                        return this._selected;
                    },
                    set: function (value) {
                        this._selected = value;
                        Laya.Tween.to(this.selectBg, { alpha: value ? 1 : 0 }, 300);
                        var index = value ? 1 : 0;
                        this.titleTxt.color = this.txtColors[index];
                        this.scopeTxt.color = this.txtColors[index];
                    },
                    enumerable: true,
                    configurable: true
                });
                FixedMoneyItem.prototype.destroy = function (bl) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.destroy.call(this, true);
                };
                return FixedMoneyItem;
            }(ui.dlg.pay.FixedMoneyItemUI));
            pay.FixedMoneyItem = FixedMoneyItem;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=FixedMoneyItem.js.map