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
             * 网银列表Item
             */
            var WebBankItem = /** @class */ (function (_super) {
                __extends(WebBankItem, _super);
                function WebBankItem() {
                    return _super.call(this) || this;
                }
                WebBankItem.prototype.readData = function (vo, cur) {
                    var str = vo.bankName;
                    if (vo.cardType)
                        str += PayModel.cardTypeMap[vo.cardType];
                    this.nameTxt.text = str;
                    if (vo == cur)
                        this.setState(true);
                    else
                        this.setState(false);
                };
                WebBankItem.prototype.setState = function (vl) {
                    this.alpha = vl ? 0.6 : 1;
                };
                return WebBankItem;
            }(ui.dlg.pay.WebBankItemUI));
            pay.WebBankItem = WebBankItem;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=WebBankItem.js.map