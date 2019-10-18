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
             * 保存二维码扫码支付
             */
            var SaveQrInfoView = /** @class */ (function (_super) {
                __extends(SaveQrInfoView, _super);
                function SaveQrInfoView() {
                    var _this = _super.call(this) || this;
                    _this.centerX = _this.centerY = 0;
                    return _this;
                }
                /**
                 *
                 * @param vo
                 * @param orderNo 订单号
                 * @param amount 充值金额
                 */
                SaveQrInfoView.prototype.show = function (vo, qrvo) {
                    //因为公众号没有金额和订单号，所以需要判断
                    if (qrvo.amount)
                        this.moneyTxt.text = qrvo.amount + "元";
                    if (qrvo.orderNo)
                        this.numTxt.text = this.getStr(qrvo.orderNo);
                    this.helpTxt.text = this.getHelpInfo(PayModel.payType);
                    if (qrvo.creatQR) { //需要自己创建
                        var size = this.qrIcon.width;
                        var sp = qr.QRCode.create(qrvo.qrUrl, "#000000", size, size, 3);
                        sp.pos(this.qrIcon.x, this.qrIcon.y);
                        this.qrbox.addChild(sp);
                    }
                    else {
                        this.qrIcon.skin = qrvo.qrUrl;
                    }
                    //上一步
                    EventManager.addTouchScaleListener(this.prevBtn, this, function () {
                        SoundPlayer.clickSound();
                        PayManager.inst.showLastView();
                    });
                    //确定
                    EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                        SoundPlayer.clickSound();
                        PayManager.inst.showPayResultView(qrvo.amount);
                    });
                    //复制
                    EventManager.addTouchScaleListener(this.copyBtn, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": qrvo.orderNo, "hint": "复制成功" });
                    });
                };
                SaveQrInfoView.prototype.getStr = function (value) {
                    var str = value.substr(0, 4);
                    str += "*****";
                    str += value.substring(value.length - 3);
                    return str;
                };
                //获取操作步骤提示信息
                SaveQrInfoView.prototype.getHelpInfo = function (type) {
                    var str = "支付方式:" + PayType[type];
                    switch (type) {
                        case PayType.WX:
                        case PayType.FIXED_WX: {
                            str = "1.手动截屏，保存二维码至相册，点击打开微信。\n";
                            str += "2.请在微信中打开'扫一扫'。\n";
                            str += "3.在扫一扫中点击右上角，选择'从相册选取二维码'选取截屏的图片。\n";
                            str += "4.输入固定充值金额，在备注处填写您的订单号，并转账。";
                            break;
                        }
                        case PayType.FIXED_ZHB:
                        case PayType.ZHB: {
                            str = "1.手动截屏，保存二维码至相册，点击打开支付宝。\n";
                            str += "2.请在支付宝中打开'扫一扫'。\n";
                            str += "3.在扫一扫中点击右上角，然后选取截屏的图片。\n";
                            str += "4.输入固定充值金额，在备注处填写您的订单号，并转账。";
                            break;
                        }
                        case PayType.FIXED_QQ:
                        case PayType.QQ: {
                            str = "1.手动截屏，保存二维码至相册，点击打开QQ。\n";
                            str += "2.请在QQ中打开'扫一扫'。\n";
                            str += "3.在扫一扫中点击右上角，然后选取截屏的图片。\n";
                            str += "4.输入固定充值金额，在备注处填写您的订单号，并转账。";
                            break;
                        }
                        case PayType.JD: {
                            str = "1.手动截屏，保存二维码至相册，点击打开京东。\n";
                            str += "2.请在京东中打开'扫啊扫'。\n";
                            str += "3.在扫啊扫中点击右上角的相册，然后选取截屏的图片。\n";
                            str += "4.输入固定充值金额，在备注处填写您的订单号，并转账。";
                            break;
                        }
                        case PayType.OTHER:
                        case PayType.THIRD_PARTY:
                        case PayType.ONLINEBANK: {
                            str = "1.手动截屏，保存二维码至相册，点击打开银行APP。\n";
                            str += "2.请在银行APP中打开'扫一扫'。\n";
                            str += "3.在扫一扫中点击右上角的相册，然后选取截屏的图片。\n";
                            str += "4.输入固定充值金额，在备注处填写您的订单号，并转账。";
                            break;
                        }
                        case PayType.WX_PUBLIC: {
                            str = "1.手动截屏，保存二维码至相册，点击打开微信。\n";
                            str += "2.请在微信中打开'扫一扫'。\n";
                            str += "3.在扫一扫中点击右上角，选择'从相册选取二维码'选取截屏的图片。\n";
                            str += "4.关注公众号，并在公众号内进行充值。";
                            this.prevBtn.centerX = 0;
                            this.hintTxt.visible = false;
                            this.confirmBtn.visible = false;
                            this.topGroup.visible = false;
                        }
                    }
                    return str;
                };
                return SaveQrInfoView;
            }(ui.dlg.pay.SaveQrInfoViewUI));
            pay.SaveQrInfoView = SaveQrInfoView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=SaveQrInfoView.js.map