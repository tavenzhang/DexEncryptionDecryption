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
             * 转账或三方充值item
             */
            var TransferPayItem = /** @class */ (function (_super) {
                __extends(TransferPayItem, _super);
                function TransferPayItem() {
                    return _super.call(this) || this;
                }
                //银行转账
                TransferPayItem.prototype.readData = function (vo, index) {
                    this.vo = vo;
                    this.numTxt.text = index < 10 ? "0" + index : index.toString();
                    var info = vo.bankName;
                    if (vo.bankAddress) {
                        info += "(" + vo.bankAddress + ")";
                    }
                    this.bankTxt.text = info;
                    this.payeeTxt.text = vo.receiptName;
                    this.infoTxt.text = vo.remarks || "";
                };
                return TransferPayItem;
            }(ui.dlg.pay.TransferPayItemUI));
            pay.TransferPayItem = TransferPayItem;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=TransferPayItem.js.map