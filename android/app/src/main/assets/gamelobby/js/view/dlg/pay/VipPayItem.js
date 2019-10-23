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
            var VipPayItem = /** @class */ (function (_super) {
                __extends(VipPayItem, _super);
                function VipPayItem() {
                    return _super.call(this) || this;
                }
                VipPayItem.prototype.readData = function (vo, id) {
                    var _this = this;
                    this.vo = vo;
                    this.txt1.text = vo.merchantName;
                    this.txt2.text = vo.methodName || "";
                    this.txt3.text = vo.methodInfo || "";
                    this.txt4.text = vo.remarks || "";
                    this.setIcon(vo.vipTopUpType);
                    if (this.txt2.text.length > 1) {
                        this.txt2.text += ":";
                        var ix = this.txt3.x;
                        var iw = this.txt3.width;
                        this.txt3.x = this.txt2.x + this.txt2.textWidth + 10;
                        this.txt3.width = iw - (this.txt3.x - ix);
                    }
                    //复制按钮
                    EventManager.addTouchScaleListener(this.copyBtn, this, function () {
                        SoundPlayer.clickSound();
                        if (_this.vo.vipTopUpType == VipPayType[VipPayType.OTHER]) {
                            PostMHelp.game_common({ "do": "copylink", "param": _this.vo.methodInfo, "hint": "已复制!" });
                        }
                        else {
                            PostMHelp.game_common({ "do": "copylink", "param": _this.vo.methodInfo });
                            var info = _this.vo.merchantName + "\n";
                            info += _this.vo.methodName + ":" + _this.vo.methodInfo + "\n";
                            info += "充值代理的账号已经复制到系统粘贴板上\n";
                            info += "是否现在跳转到" + PayModel.vipPayMap[VipPayType[_this.vo.vipTopUpType]];
                            dlg.TipsDlg.show(info, _this, _this.gotoPay);
                        }
                    });
                };
                //跳转去三方
                VipPayItem.prototype.gotoPay = function () {
                    PostMHelp.game_common({ do: "goToPay", param: this.vo.vipTopUpType });
                };
                VipPayItem.prototype.setIcon = function (type) {
                    switch (type) {
                        case "ALIPAY": {
                            this.minIcon.skin = "ui/pay/zfbMin.png";
                            this.maxIcon.skin = "ui/pay/zfbMax.png";
                            break;
                        }
                        case "WECHAT": {
                            this.minIcon.skin = "ui/pay/wxMin.png";
                            this.maxIcon.skin = "ui/pay/wxMax.png";
                            break;
                        }
                        case "QQ": {
                            this.minIcon.skin = "ui/pay/qqMin.png";
                            this.maxIcon.skin = "ui/pay/qqMax.png";
                            break;
                        }
                        default: {
                            this.minIcon.skin = "ui/pay/otherMin.png";
                            this.maxIcon.skin = "ui/pay/otherMax.png";
                            break;
                        }
                    }
                };
                return VipPayItem;
            }(ui.dlg.pay.VipPayItemUI));
            pay.VipPayItem = VipPayItem;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=VipPayItem.js.map