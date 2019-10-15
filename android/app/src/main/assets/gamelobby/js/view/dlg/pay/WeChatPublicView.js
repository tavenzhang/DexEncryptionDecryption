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
             * 公众号支付
             */
            var WeChatPublicView = /** @class */ (function (_super) {
                __extends(WeChatPublicView, _super);
                function WeChatPublicView() {
                    var _this = _super.call(this) || this;
                    _this.centerX = 0;
                    _this.itemPanel.vScrollBarSkin = "";
                    _this.itemPanel.on(Laya.Event.CLICK, _this, _this.itemClick);
                    return _this;
                }
                WeChatPublicView.prototype.readData = function (vo) {
                    var _this = this;
                    var item;
                    vo.forEach(function (value, index) {
                        item = new view.dlg.pay.WeChatPublicItem();
                        item.mouseEnabled = true;
                        item.readData(value.combineVo, index + 1);
                        item.y = index * (item.height + 8);
                        _this.itemPanel.addChild(item);
                    });
                    var vl = this.itemPanel.vScrollBar.value;
                    if (vl > 0) { //归位
                        Laya.Tween.to(this.itemPanel.vScrollBar, { value: 0 }, 300);
                    }
                };
                WeChatPublicView.prototype.itemClick = function (e) {
                    if (e.target instanceof pay.WeChatPublicItem) {
                        var item = e.target;
                        PayManager.inst.doWechatPublicPay(item.vo);
                    }
                };
                return WeChatPublicView;
            }(ui.dlg.pay.WeChatPublicViewUI));
            pay.WeChatPublicView = WeChatPublicView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=WeChatPublicView.js.map