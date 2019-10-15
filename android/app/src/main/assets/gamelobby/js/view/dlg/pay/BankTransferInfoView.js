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
             * 银行转账信息展示
             */
            var BankTransferInfoView = /** @class */ (function (_super) {
                __extends(BankTransferInfoView, _super);
                function BankTransferInfoView() {
                    var _this = _super.call(this) || this;
                    _this.centerX = _this.centerY = 0;
                    return _this;
                }
                /**
                 *
                 * @param vo
                 * @param depositorName
                 */
                BankTransferInfoView.prototype.show = function (vo, depositorName) {
                    var _this = this;
                    this.timeTxt.text = this.getTime();
                    var mstr = vo.amount + "";
                    if (mstr.length > 10)
                        mstr = mstr.substr(0, 7) + "...";
                    this.moneyTxt.text = mstr + "元";
                    this.payeeTxt.text = vo.receiptName;
                    this.accountTxt.text = vo.bankCardNo;
                    this.branchTxt.text = vo.bankAddress || "无";
                    this.bankTxt.text = vo.bankName;
                    if (!vo.bankAddress)
                        this.copyBranch.visible = false;
                    EventManager.addTouchScaleListener(this.prevBtn, this, function () {
                        SoundPlayer.clickSound();
                        PayManager.inst.showLastView();
                    });
                    //确定
                    EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                        SoundPlayer.clickSound();
                        PayManager.inst.doBankPay(vo, depositorName);
                    });
                    //复制相关----------------------
                    EventManager.addTouchScaleListener(this.copyMoney, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.moneyTxt.text, "hint": "复制成功" });
                    });
                    EventManager.addTouchScaleListener(this.copyPayee, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.payeeTxt.text, "hint": "复制成功" });
                    });
                    EventManager.addTouchScaleListener(this.copyAccount, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.accountTxt.text, "hint": "复制成功" });
                    });
                    EventManager.addTouchScaleListener(this.copyBranch, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.branchTxt.text, "hint": "复制成功" });
                    });
                    EventManager.addTouchScaleListener(this.copyBank, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.bankTxt.text, "hint": "复制成功" });
                    });
                };
                BankTransferInfoView.prototype.getTime = function () {
                    var date = new Date();
                    var str = date.getFullYear() + "-";
                    str += (date.getMonth() + 1) + "-";
                    str += date.getDate() + " ";
                    var h = date.getHours();
                    var m = date.getMinutes();
                    str += h < 10 ? "0" + h : h;
                    str += ":";
                    str += m < 10 ? "0" + m : m;
                    return str;
                };
                return BankTransferInfoView;
            }(ui.dlg.pay.BankTransferInfoViewUI));
            pay.BankTransferInfoView = BankTransferInfoView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=BankTransferInfoView.js.map