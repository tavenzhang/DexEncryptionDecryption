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
(function (view_1) {
    var dlg;
    (function (dlg_1) {
        /**
         * 充值界面
         */
        var RechargeDlg = /** @class */ (function (_super) {
            __extends(RechargeDlg, _super);
            function RechargeDlg() {
                var _this = _super.call(this) || this;
                _this.viewMap = {}; //对三类界面进行缓存
                _this.initView();
                return _this;
            }
            /**
             * 入口
             */
            RechargeDlg.show = function () {
                var dlg = new RechargeDlg();
                dlg.width = Laya.stage.width;
                dlg.popup(false, true);
            };
            RechargeDlg.prototype.initView = function () {
                this.LTgroup.left = GameUtils.getScreencOffset(-48, 0);
                this.TRgroup.right = GameUtils.getScreencOffset(-55, 0);
                this.tabGroup.left = GameUtils.getScreencOffset(-48, 0);
                this.errIcon.visible = false;
                this.infoGroup.visible = false;
                this.viewMap[ThreeType.vip] = new view.dlg.pay.VipPayView();
                this.viewMap[ThreeType.fixedMoney] = new view.dlg.pay.FixedMoneyView();
                this.viewMap[ThreeType.bankTransfer] = new view.dlg.pay.TransferPayView();
                this.viewMap[ThreeType.otherTransfer] = new view.dlg.pay.OtherPayView();
                this.viewMap[ThreeType.wechatPublic] = new view.dlg.pay.WeChatPublicView();
                this.arrowBtn.visible = false;
                this.tabPanel.vScrollBarSkin = "";
                PayManager.inst.init(this.viewBox);
                //获取菜单列表
                PayModel.getPayList(this, this.showPayList);
                this.initEvents();
            };
            //支付方式列表
            RechargeDlg.prototype.showPayList = function () {
                var _this = this;
                var arr = PayModel.payList || [];
                var item;
                var defItem;
                arr.forEach(function (value, index) {
                    item = new view.dlg.pay.PayTabItem();
                    item.readData(value);
                    item.y = index * (item.height - 5);
                    _this.tabPanel.addChild(item);
                    if (index == 0)
                        defItem = item;
                });
                this.arrowBtn.visible = arr.length > 6;
                //请求银行列表数据和三方支付列表数据
                PayModel.getBanktransfers(Common.clientId, this, function () {
                    //默认选中第一个
                    if (defItem)
                        _this.itemClick(defItem);
                });
            };
            RechargeDlg.prototype.initEvents = function () {
                var _this = this;
                //返回
                EventManager.addTouchScaleListener(this.backBtn, this, function () {
                    SoundPlayer.returnLobbySound();
                    _this.close(null, true);
                });
                //充值明细
                EventManager.addTouchScaleListener(this.payBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    view.dlg.pay.PayHistoryDlg.show();
                });
                //客服
                EventManager.addTouchScaleListener(this.serviceBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    InnerJumpUtil.doJump(DlgCmd.service);
                });
                //箭头
                EventManager.addTouchScaleListener(this.arrowBtn, this, function () {
                    SoundPlayer.clickSound();
                    var vl = _this.tabPanel.vScrollBar.value;
                    var tov = vl + _this.tabPanel.height / 2;
                    Laya.Tween.to(_this.tabPanel.vScrollBar, { value: tov }, 300, Laya.Ease.cubicOut, Laya.Handler.create(_this, function () {
                        _this.moveEnd();
                    }));
                });
                this.tabPanel.vScrollBar.on(Laya.Event.END, this, this.moveEnd);
                this.tabPanel.on(Laya.Event.CLICK, this, this.tabItemHandler);
            };
            //点击充值方式列表
            RechargeDlg.prototype.tabItemHandler = function (e) {
                if (e.target instanceof view.dlg.pay.PayTabItem) {
                    SoundPlayer.enterPanelSound();
                    var item = e.target;
                    this.itemClick(item);
                }
            };
            RechargeDlg.prototype.itemClick = function (item) {
                if (this.prevTab == item)
                    return;
                item.active();
                if (this.prevTab && this.prevTab != item) {
                    this.prevTab.deactive();
                }
                this.prevTab = item;
                //
                var vo = item.vo;
                PayModel.payType = PayType[vo.code];
                if (vo.code == PayType[PayType.BANK]) { //银行转账
                    this.showPayInfo(PayModel.bankSubList);
                }
                else {
                    PayModel.getPayment(vo.code, this, this.showPayInfo);
                }
                //显示备注信息
                if (vo.promotionTips) {
                    var str = vo.promotionTips;
                    if (str.length > 30)
                        str = str.substr(0, 30) + "...";
                    this.infoGroup.visible = true;
                    this.infoTxt.text = str;
                    this.infoGroup.width = this.infoTxt.x + this.infoTxt.textWidth + 98;
                }
                else {
                    this.infoGroup.visible = false;
                }
            };
            //显示充值详细信息
            RechargeDlg.prototype.showPayInfo = function (jobj) {
                if (!jobj)
                    jobj = []; //容错处理
                var type = PayModel.checkType(this.prevTab.vo.code);
                if (this.prevViewType != type) {
                    PayManager.inst.clearLastView();
                }
                PayManager.inst.clearOther(); //清理辅助界面
                //创建视图
                var view = this.viewMap[type];
                if (view && jobj.length > 0) {
                    Debug.log("typeData:", jobj);
                    view.visible = true;
                    view.readData(jobj, this.prevTab.vo.promotionTips);
                    if (!view.parent)
                        this.viewBox.addChildAt(view, 0);
                    PayManager.inst.lastView = view;
                }
                else {
                    PayManager.inst.hideLastView();
                }
                this.prevViewType = type;
                this.errIcon.visible = Boolean(jobj.length == 0);
            };
            //滚动结束
            RechargeDlg.prototype.moveEnd = function () {
                if (this.destroyed)
                    return;
                var max = this.tabPanel.contentHeight - this.tabPanel.height;
                var bl = Boolean(this.tabPanel.vScrollBar.value >= max);
                this.arrowBtn.visible = !bl;
            };
            RechargeDlg.prototype.onClosed = function (type) {
                Laya.Tween.clearTween(this.tabPanel.vScrollBar);
                PayManager.inst.reset();
                PayModel.clear();
                LobbyModel.refreshMoney();
                this.tabPanel.destroyChildren();
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return RechargeDlg;
        }(ui.dlg.RechargeDlgUI));
        dlg_1.RechargeDlg = RechargeDlg;
    })(dlg = view_1.dlg || (view_1.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=RechargeDlg.js.map