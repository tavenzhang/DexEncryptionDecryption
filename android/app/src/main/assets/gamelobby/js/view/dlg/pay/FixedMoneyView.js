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
             * 固定金额充值
             */
            var FixedMoneyView = /** @class */ (function (_super) {
                __extends(FixedMoneyView, _super);
                function FixedMoneyView() {
                    var _this = _super.call(this) || this;
                    _this.itemArr = [];
                    _this.gap = 0;
                    _this.btnArr = [];
                    _this.maxNum = 12; //最多显示金额按钮个数
                    _this.centerX = 0;
                    _this.centerY = 0;
                    _this.initView();
                    return _this;
                }
                FixedMoneyView.prototype.initView = function () {
                    var _this = this;
                    this.itemPanel.hScrollBarSkin = "";
                    this.itemPanel.on(Laya.Event.CLICK, this, this.clickItem);
                    //提交充值
                    EventManager.addTouchScaleListener(this.submitBtn, this, function () {
                        SoundPlayer.clickSound();
                        if (!_this.prevBtn) {
                            Toast.showToast("请选择充值金额");
                            return;
                        }
                        PayManager.inst.startPay(_this.prev.vo, _this.prevBtn.value);
                    });
                };
                FixedMoneyView.prototype.clickItem = function (e) {
                    if (e.target instanceof view.dlg.pay.FixedMoneyItem) {
                        SoundPlayer.clickSound();
                        var item = e.target;
                        this.selectItem(item);
                    }
                };
                FixedMoneyView.prototype.selectItem = function (item) {
                    if (item.selected)
                        return;
                    item.selected = true;
                    if (this.prev)
                        this.prev.selected = false;
                    this.prev = item;
                    this.creatMoneyBtn(item.vo.fixedAmount);
                    this.infoTxt.text = item.vo.remarks || "---";
                };
                //创建常用充值金额按钮
                FixedMoneyView.prototype.creatMoneyBtn = function (arr) {
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
                FixedMoneyView.prototype.recoverBtn = function () {
                    if (this.prevBtn)
                        this.prevBtn = null;
                    this.btnArr.forEach(function (btn) {
                        btn.removeSelf();
                        Laya.Pool.recover(PayModel.btnMark, btn);
                    });
                    this.btnArr.length = 0;
                };
                //点击常用充值金额按钮
                FixedMoneyView.prototype.btnClick = function (evt, btn) {
                    SoundPlayer.clickSound();
                    if (btn.selected)
                        return;
                    btn.setSelect(true);
                    if (this.prevBtn)
                        this.prevBtn.setSelect(false);
                    this.prevBtn = btn;
                };
                /**
                 * 读取数据
                 * @param data
                 */
                FixedMoneyView.prototype.readData = function (vo, tips) {
                    var _this = this;
                    if (this.itemPanel.numChildren > 0) {
                        this.itemPanel.destroyChildren();
                        this.itemPanel.refresh();
                        this.itemArr.length = 0;
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
                        _this.itemArr.push(item);
                        //默认选中第一个
                        if (index == 0)
                            _this.selectItem(item);
                    });
                };
                FixedMoneyView.prototype.destroy = function () {
                    this.recoverBtn();
                    _super.prototype.destroy.call(this, true);
                };
                return FixedMoneyView;
            }(ui.dlg.pay.FixedMoneyViewUI));
            pay.FixedMoneyView = FixedMoneyView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=FixedMoneyView.js.map