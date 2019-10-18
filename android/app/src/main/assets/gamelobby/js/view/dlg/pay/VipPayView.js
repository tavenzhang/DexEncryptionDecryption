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
             * vip充值
             */
            var VipPayView = /** @class */ (function (_super) {
                __extends(VipPayView, _super);
                function VipPayView() {
                    var _this = _super.call(this) || this;
                    _this.centerX = 0;
                    _this.itemPanel.vScrollBarSkin = "";
                    //
                    var current = Common.userInfo_current;
                    _this.idTxt.text = current.username || "";
                    EventManager.addTouchScaleListener(_this.copyBtn, _this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.idTxt.text, "hint": "复制成功" });
                    });
                    return _this;
                }
                VipPayView.prototype.readData = function (vo) {
                    var _this = this;
                    var item;
                    vo.forEach(function (value, index) {
                        item = new view.dlg.pay.VipPayItem();
                        item.readData(value, index + 1);
                        item.y = index * (item.height + 8);
                        _this.itemPanel.addChild(item);
                    });
                    var vl = this.itemPanel.vScrollBar.value;
                    if (vl > 0) { //归位
                        Laya.Tween.to(this.itemPanel.vScrollBar, { value: 0 }, 300);
                    }
                };
                return VipPayView;
            }(ui.dlg.pay.VipPayViewUI));
            pay.VipPayView = VipPayView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=VipPayView.js.map