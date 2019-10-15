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
            var HistoryItem = /** @class */ (function (_super) {
                __extends(HistoryItem, _super);
                function HistoryItem() {
                    var _this = _super.call(this) || this;
                    //处理中，已完成，失败
                    _this.stateColor = ["#fff600", "#0dfd2f", "#ff1b1b"];
                    return _this;
                }
                HistoryItem.prototype.readData = function (vo) {
                    var _this = this;
                    this.stateTxt.text = vo.stateChineseDisplay;
                    var color;
                    switch (vo.state) {
                        case "COMPLETED":
                            color = this.stateColor[1];
                            break;
                        case "FAILED":
                            color = this.stateColor[2];
                            break;
                        default: color = this.stateColor[0];
                    }
                    this.stateTxt.color = color;
                    this.payMethodTxt.text = vo.subTypeChineseDisplay;
                    this.orderTxt.text = vo.transactionId;
                    this.timeTxt.text = vo.createTime;
                    this.payMoneyTxt.text = vo.amount + "元";
                    this.totalTxt.text = vo.effectiveAmount + "元";
                    this.saleTxt.text = (vo.effectiveAmount - vo.amount) + "元";
                    if (this.addev)
                        return;
                    //
                    EventManager.addTouchScaleListener(this.copyBtn, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.orderTxt.text, "hint": "复制成功" });
                    });
                    this.addev = false;
                };
                HistoryItem.prototype.destroy = function () {
                    EventManager.removeBtnEvent(this.copyBtn);
                    _super.prototype.destroy.call(this, true);
                };
                return HistoryItem;
            }(ui.dlg.pay.HistoryItemUI));
            pay.HistoryItem = HistoryItem;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=HistoryItem.js.map