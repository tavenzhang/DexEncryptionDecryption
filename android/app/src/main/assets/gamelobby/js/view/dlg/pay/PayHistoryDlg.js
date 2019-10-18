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
    (function (dlg_1) {
        var pay;
        (function (pay) {
            /**
             * 充值明细
             */
            var PayHistoryDlg = /** @class */ (function (_super) {
                __extends(PayHistoryDlg, _super);
                function PayHistoryDlg() {
                    var _this = _super.call(this) || this;
                    _this.completeState = "COMPLETED"; //成功状态
                    _this.errorState = "FAILED"; //失败状态
                    _this.frist = true;
                    _this.initView();
                    return _this;
                }
                PayHistoryDlg.show = function () {
                    var dlg = new PayHistoryDlg();
                    dlg.popup(false, true);
                };
                PayHistoryDlg.prototype.initView = function () {
                    var _this = this;
                    this.itemList.vScrollBarSkin = "";
                    this.itemList.itemRender = view.dlg.pay.HistoryItem;
                    this.itemList.spaceY = 8;
                    this.itemList.renderHandler = Laya.Handler.create(this, this.renderItems, null, false);
                    this.itemList.array = null;
                    this.infoTxt.visible = false;
                    this.radior = new RadioBox([this.tab1, this.tab2, this.tab3], this, this.tabToggle);
                    PayModel.getPayHistory(this, this.readData);
                    //关闭
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //客服
                    EventManager.addTouchScaleListener(this.serviceBtn, this, function () {
                        SoundPlayer.clickSound();
                        InnerJumpUtil.doJump(DlgCmd.service);
                    });
                };
                PayHistoryDlg.prototype.renderItems = function (cell) {
                    cell.readData(cell.dataSource);
                };
                //切换tab
                PayHistoryDlg.prototype.tabToggle = function () {
                    var _this = this;
                    if (!this.frist)
                        SoundPlayer.clickSound();
                    this.frist = false;
                    var arr = null;
                    this.infoTxt.visible = false;
                    var info;
                    switch (this.radior.selectIndex) {
                        case 0:
                            arr = this.voList;
                            info = "暂无充值记录";
                            break;
                        case 1:
                            arr = this.voList.filter(function (value) { return value.state == _this.completeState; });
                            info = "暂无充值完成记录";
                            break;
                        case 2:
                            arr = this.voList.filter(function (value) { return value.state == _this.errorState; });
                            info = "暂无充值失败记录";
                            break;
                    }
                    if (arr && arr.length > 0) {
                        this.itemList.array = arr;
                    }
                    else {
                        this.infoTxt.text = info;
                        this.infoTxt.visible = true;
                        this.itemList.array = null;
                    }
                };
                PayHistoryDlg.prototype.readData = function (jobj) {
                    if (this.destroyed)
                        return;
                    this.voList = jobj;
                    this.radior.selectIndex = 0;
                };
                PayHistoryDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return PayHistoryDlg;
            }(ui.dlg.pay.PayHistoryDlgUI));
            pay.PayHistoryDlg = PayHistoryDlg;
        })(pay = dlg_1.pay || (dlg_1.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=PayHistoryDlg.js.map