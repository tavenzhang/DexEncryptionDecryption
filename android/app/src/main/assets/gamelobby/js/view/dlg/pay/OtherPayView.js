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
             * 三方转账，包含微信，QQ，银联，支付宝，公众号等
             */
            var OtherPayView = /** @class */ (function (_super) {
                __extends(OtherPayView, _super);
                function OtherPayView() {
                    var _this = _super.call(this) || this;
                    _this.gap = 0;
                    _this.btnArr = [];
                    _this.maxNum = 8; //最多显示金额按钮个数
                    _this.centerX = 0;
                    _this.centerY = 0;
                    _this.initView();
                    return _this;
                }
                OtherPayView.prototype.initView = function () {
                    var _this = this;
                    this.itemPanel.hScrollBarSkin = "";
                    this.itemPanel.on(Laya.Event.CLICK, this, this.clickItem);
                    //重置金额
                    EventManager.addTouchScaleListener(this.resetBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.moneyTxt.text = "";
                        _this.clearLastBtn();
                    });
                    //提交充值
                    EventManager.addTouchScaleListener(this.submitBtn, this, function () {
                        SoundPlayer.clickSound();
                        var money = parseFloat(_this.moneyTxt.text);
                        if (isNaN(money) || money == 0) {
                            Toast.showToast("请输入充值金额");
                            return;
                        }
                        var vo = _this.prev.vo;
                        if (vo.platform) {
                            //需要先确定是否有银行列表
                            PayModel.getOnlineBankList(vo.platform, _this, function (suc, jobj) {
                                Debug.log("网银支付类型：", suc, jobj);
                                if (suc) {
                                    if (jobj && jobj.length > 0)
                                        vo.webBankList = jobj;
                                }
                                _this.doSubmit(vo, money);
                            });
                        }
                        else {
                            _this.doSubmit(vo, money);
                        }
                    });
                    //输入金额
                    KeyboardView.bindKeyboard(this.moneyTxt, { caller: this, callback: this.inputEnd });
                };
                //输入完毕
                OtherPayView.prototype.inputEnd = function (value) {
                    if (!value || (this.prevBtn && this.prevBtn.value.toString() != value))
                        this.clearLastBtn();
                };
                //重置选择金额按钮
                OtherPayView.prototype.clearLastBtn = function () {
                    if (this.prevBtn) {
                        this.prevBtn.setSelect(false);
                        this.prevBtn = null;
                    }
                };
                //开始提交>>>
                OtherPayView.prototype.doSubmit = function (vo, money) {
                    var isBank = Boolean(vo.combineVo);
                    PayManager.inst.startPay(isBank ? vo.combineVo : vo, money, isBank);
                };
                //点击分类item
                OtherPayView.prototype.clickItem = function (e) {
                    if (e.target instanceof view.dlg.pay.FixedMoneyItem) {
                        SoundPlayer.clickSound();
                        var item = e.target;
                        this.selectItem(item);
                    }
                };
                OtherPayView.prototype.selectItem = function (item) {
                    if (item.selected)
                        return;
                    item.selected = true;
                    if (this.prev)
                        this.prev.selected = false;
                    this.prev = item;
                    var vo = item.vo;
                    if (vo.combineVo) {
                        this.creatMoneyBtn(vo.combineVo.recommendedAmounts);
                        this.infoTxt.text = vo.combineVo.remarks || "---";
                    }
                    else {
                        this.creatMoneyBtn(vo.recommendedAmounts);
                        this.infoTxt.text = vo.remarks || "---";
                    }
                };
                //创建常用充值金额按钮
                OtherPayView.prototype.creatMoneyBtn = function (arr) {
                    var _this = this;
                    this.recoverBtn();
                    if (!arr || arr.length == 0) {
                        console.error("没有配置常用金额数据");
                        return;
                    }
                    var btn;
                    var column = 4; //列数
                    var gapx = 11;
                    var gapy = 8;
                    arr.forEach(function (value, index) {
                        if (index < _this.maxNum) {
                            btn = Laya.Pool.getItem(PayModel.btnMark);
                            if (!btn)
                                btn = new pay.PayMoneyBtn();
                            btn.value = value;
                            btn.mouseEnabled = true;
                            btn.x = (index % column) * (btn.width + gapx);
                            btn.y = Math.floor(index / column) * (btn.height + gapy);
                            _this.btnBox.addChild(btn);
                            _this.btnArr.push(btn);
                            EventManager.addTouchScaleListener(btn, _this, _this.btnClick, btn, 0.6, true);
                        }
                    });
                };
                //回收按钮
                OtherPayView.prototype.recoverBtn = function () {
                    if (this.prevBtn)
                        this.prevBtn = null;
                    this.moneyTxt.text = "";
                    this.btnArr.forEach(function (btn) {
                        btn.removeSelf();
                        Laya.Pool.recover(PayModel.btnMark, btn);
                    });
                    this.btnArr.length = 0;
                };
                //点击常用充值金额按钮
                OtherPayView.prototype.btnClick = function (evt, btn) {
                    SoundPlayer.clickSound();
                    if (btn.selected)
                        return;
                    btn.setSelect(true);
                    if (this.prevBtn)
                        this.prevBtn.setSelect(false);
                    this.prevBtn = btn;
                    this.moneyTxt.text = btn.value.toString();
                };
                /**
                 *
                 * @param vo
                 */
                OtherPayView.prototype.readData = function (vo) {
                    var _this = this;
                    if (this.itemPanel.numChildren > 0) {
                        this.itemPanel.destroyChildren();
                        this.itemPanel.refresh();
                        this.prev = null;
                    }
                    this.recoverBtn();
                    var item;
                    vo.forEach(function (value, index) {
                        item = new view.dlg.pay.FixedMoneyItem();
                        item.mouseEnabled = true;
                        item.readData(value);
                        item.x = index * (item.width + _this.gap);
                        _this.itemPanel.addChild(item);
                        //默认选中第一个
                        if (index == 0)
                            _this.selectItem(item);
                    });
                };
                OtherPayView.prototype.destroy = function () {
                    this.recoverBtn();
                    _super.prototype.destroy.call(this, true);
                };
                return OtherPayView;
            }(ui.dlg.pay.OtherPayViewUI));
            pay.OtherPayView = OtherPayView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=OtherPayView.js.map