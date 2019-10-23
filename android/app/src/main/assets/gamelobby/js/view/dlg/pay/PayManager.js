/*
* 充值支付相关界面管理
*/
var PayManager = /** @class */ (function () {
    function PayManager() {
        this.viewbox = new Laya.Sprite();
        if (PayManager._inst) {
            throw new Error("instanded!");
        }
        PayManager._inst = this;
    }
    Object.defineProperty(PayManager, "inst", {
        get: function () {
            return PayManager._inst || new PayManager();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化
     * @param box
     */
    PayManager.prototype.init = function (box) {
        if (!this.viewbox)
            this.viewbox = new Laya.Sprite();
        if (!box.contains(this.viewbox)) {
            box.addChild(this.viewbox);
            this.viewbox.pos(box.width >> 1, box.height >> 1);
        }
    };
    /**
     * 清理主界面
     */
    PayManager.prototype.clearLastView = function () {
        if (this.lastView) {
            this.lastView.removeSelf();
            this.lastView = null;
        }
    };
    PayManager.prototype.showLastView = function () {
        if (this.lastView)
            this.lastView.visible = true;
        this.clearOther();
    };
    PayManager.prototype.hideLastView = function () {
        if (this.lastView)
            this.lastView.visible = false;
        this.clearOther();
    };
    /**
     * 清理辅助界面
     */
    PayManager.prototype.clearOther = function () {
        if (this.viewbox) {
            this.viewbox.destroyChildren();
        }
    };
    /**
     * 支付入口
     * @param vo
     * @param money 支付金额
     * @param bankPay 是否为银行转账
     */
    PayManager.prototype.startPay = function (vo, money, bankPay) {
        var showInfo; //是否需要填写存款人信息
        vo.amount = money; //记录金额
        if (bankPay) { //银行转账类型
            var data = vo;
            showInfo = data.realNameReq;
        }
        else { //其他类型
            var data = vo;
            showInfo = data.realNameReq || data.mobileNoReq || data.cardNoReq;
            if (data.platform && data.webBankList) { //网银支付
                showInfo = true;
            }
        }
        if (showInfo) { //需要填写存款人信息
            this.hideLastView();
            var ui_1 = new view.dlg.pay.AccountInfoView();
            ui_1.show(vo, bankPay);
            this.viewbox.addChild(ui_1);
        }
        else {
            bankPay ? this.showBankPayInfoView(vo) : this.showOtherPayInfoView(vo);
        }
    };
    /**
     * 公众号支付(与其他支付不同，不需要调用支付接口)
     * @param vo
     */
    PayManager.prototype.doWechatPublicPay = function (vo) {
        this.hideLastView();
        var qrvo = {
            qrUrl: vo.bankCardNo,
            isBank: true
        };
        var ui = new view.dlg.pay.SaveQrInfoView();
        ui.show(vo, qrvo);
        this.viewbox.addChild(ui);
    };
    /**
     * 调用银行转账
     * @param vo
     * @param money
     * @param depositorName 存款人
     */
    PayManager.prototype.doBankPay = function (vo, depositorName) {
        var _this = this;
        PayModel.payByBankList(vo, vo.amount, depositorName, this, function (suc, jobj) {
            Debug.log("银行转账结果:", suc, jobj);
            if (suc) {
                if (vo.isCombine) {
                    _this.hideLastView();
                    var ui_2 = new view.dlg.pay.SaveQrInfoView();
                    var qrvo = {
                        amount: jobj.amount,
                        orderNo: jobj.transactionNo,
                        qrUrl: vo.bankCardNo,
                        isBank: true
                    };
                    ui_2.show(vo, qrvo);
                    _this.viewbox.addChild(ui_2);
                }
                else {
                    _this.showPayResultView(jobj.amount);
                }
            }
        });
    };
    /**
     * 银行转账信息展示
     */
    PayManager.prototype.showBankPayInfoView = function (vo, depositorName) {
        if (vo.isCombine) { //是合并数据(银行列表中的非银行类型)
            this.doBankPay(vo, depositorName);
        }
        else {
            this.hideLastView();
            var ui_3 = new view.dlg.pay.BankTransferInfoView();
            ui_3.show(vo, depositorName);
            this.viewbox.addChild(ui_3);
        }
    };
    /**
     * 转账结果展示(所有类型都会展示)
     * @param money
     */
    PayManager.prototype.showPayResultView = function (money) {
        this.hideLastView();
        var ui = new view.dlg.pay.PayResultView();
        ui.show(money);
        this.viewbox.addChild(ui);
    };
    /**
     * 显示其他转账信息界面
     */
    PayManager.prototype.showOtherPayInfoView = function (vo, info) {
        var _this = this;
        PayModel.payByListV2(vo, vo.amount, info, this, function (suc, jobj) {
            Debug.log("支付结果:", suc, jobj);
            if (suc) {
                if (jobj.webview) { //跳转浏览器
                    _this.showPayResultView(jobj.amount);
                    GameUtils.openWeb(jobj.data);
                }
                else if (!jobj.webview) { //显示二维码
                    if (!jobj.paymentJumpTypeEnum || PayMentJumpType[jobj.paymentJumpTypeEnum] == PayMentJumpType.IMG) {
                        _this.hideLastView();
                        var ui_4 = new view.dlg.pay.SaveQrInfoView();
                        var qrvo = {
                            amount: jobj.amount,
                            orderNo: jobj.transactionId,
                            qrUrl: jobj.data,
                            creatQR: !jobj.paymentJumpTypeEnum
                        };
                        ui_4.show(vo, qrvo);
                        _this.viewbox.addChild(ui_4);
                    }
                }
            }
        });
    };
    PayManager.prototype.reset = function () {
        this.clearLastView();
        this.clearOther();
        if (this.viewbox)
            this.viewbox = null;
    };
    return PayManager;
}());
//# sourceMappingURL=PayManager.js.map