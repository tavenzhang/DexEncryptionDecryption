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
            var WeChatPublicItem = /** @class */ (function (_super) {
                __extends(WeChatPublicItem, _super);
                function WeChatPublicItem() {
                    return _super.call(this) || this;
                }
                WeChatPublicItem.prototype.readData = function (vo, id) {
                    this.vo = vo;
                    this.titleTxt.text = vo.receiptName;
                    this.infoTxt.text = vo.remarks || "";
                };
                return WeChatPublicItem;
            }(ui.dlg.pay.WeChatPublicItemUI));
            pay.WeChatPublicItem = WeChatPublicItem;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=WeChatPublicItem.js.map