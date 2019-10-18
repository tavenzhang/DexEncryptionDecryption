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
             * 银行转账
             */
            var TransferPayView = /** @class */ (function (_super) {
                __extends(TransferPayView, _super);
                function TransferPayView() {
                    var _this = _super.call(this) || this;
                    _this.moneyArr = [100, 300, 500, 1000, 5000, 10000, 20000, 30000];
                    _this.centerX = 0;
                    _this.centerY = 0;
                    _this.initView();
                    return _this;
                }
                TransferPayView.prototype.initView = function () {
                    var _this = this;
                    this.contentGroup.vScrollBarSkin = "";
                    this.panelHeight = this.contentGroup.height;
                    //初始化金额选择按钮
                    var btn;
                    var column = 4; //列数
                    var gapx = 11;
                    var gapy = 8;
                    var len = this.moneyArr.length;
                    for (var i = 0; i < len; i++) {
                        btn = new view.dlg.pay.PayMoneyBtn();
                        btn.mouseEnabled = true;
                        btn.value = this.moneyArr[i];
                        btn.x = (i % column) * (btn.width + gapx);
                        btn.y = Math.floor(i / column) * (btn.height + gapy);
                        this.btnGroup.addChild(btn);
                    }
                    //固定金额点击
                    this.btnGroup.on(Laya.Event.CLICK, this, this.moneyBtnClick);
                    //客服
                    EventManager.addTouchScaleListener(this.serviceBtn, this, function () {
                        SoundPlayer.clickSound();
                        InnerJumpUtil.doJump(DlgCmd.service);
                    });
                    //重置金额
                    EventManager.addTouchScaleListener(this.resetBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.moneyTxt.text = "";
                        if (_this.lastBtn) {
                            _this.lastBtn.setSelect(false);
                            _this.lastBtn = null;
                        }
                    });
                    this.itemBox.on(Laya.Event.CLICK, this, this.itemClick);
                    //输入金额
                    KeyboardView.bindKeyboard(this.moneyTxt, { caller: this, callback: this.inputEnd });
                };
                //输入完毕
                TransferPayView.prototype.inputEnd = function (value) {
                    if (!value || (this.lastBtn && this.lastBtn.value.toString() != value))
                        this.clearLastBtn();
                };
                //重置选择金额按钮
                TransferPayView.prototype.clearLastBtn = function () {
                    if (this.lastBtn) {
                        this.lastBtn.setSelect(false);
                        this.lastBtn = null;
                    }
                };
                //点击支付列表项
                TransferPayView.prototype.itemClick = function (e) {
                    if (e.target instanceof view.dlg.pay.TransferPayItem) {
                        SoundPlayer.clickSound();
                        var item = e.target;
                        var money = parseFloat(this.moneyTxt.text);
                        if (isNaN(money) || money == 0) {
                            Toast.showToast("请输入充值金额");
                            return;
                        }
                        PayManager.inst.startPay(item.vo, money, true);
                    }
                };
                //金额按钮点击
                TransferPayView.prototype.moneyBtnClick = function (e) {
                    if (e.target instanceof view.dlg.pay.PayMoneyBtn) {
                        var btn = e.target;
                        SoundPlayer.clickSound();
                        if (btn.selected)
                            return;
                        btn.setSelect(true);
                        if (this.lastBtn)
                            this.lastBtn.setSelect(false);
                        this.lastBtn = btn;
                        this.moneyTxt.text = btn.value.toString();
                    }
                };
                /**
                 * 读取数据
                 * @param data
                 */
                TransferPayView.prototype.readData = function (vo, tips) {
                    var _this = this;
                    if (this.itemBox.numChildren > 0) {
                        this.itemBox.destroyChildren();
                    }
                    var item;
                    vo.forEach(function (value, index) {
                        item = new view.dlg.pay.TransferPayItem();
                        item.readData(value, index + 1);
                        item.mouseEnabled = true;
                        item.y = index * (item.height + 14);
                        _this.itemBox.addChild(item);
                    });
                    this.contentGroup.refresh();
                    var vl = this.contentGroup.vScrollBar.value;
                    if (vl > 0) { //归位
                        Laya.Tween.to(this.contentGroup.vScrollBar, { value: 0 }, 300);
                    }
                };
                TransferPayView.prototype.removeSelf = function () {
                    if (this.lastBtn) {
                        this.lastBtn.setSelect(false);
                    }
                    this.moneyTxt.text = "";
                    return _super.prototype.removeSelf.call(this);
                };
                return TransferPayView;
            }(ui.dlg.pay.TransferPayViewUI));
            pay.TransferPayView = TransferPayView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=TransferPayView.js.map