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
        var balance;
        (function (balance) {
            /**
             * 存取明细
             */
            var AccessDetailDlg = /** @class */ (function (_super) {
                __extends(AccessDetailDlg, _super);
                function AccessDetailDlg() {
                    var _this = _super.call(this) || this;
                    _this.dataTypes = ["", "存入", "取出", "收益"];
                    _this.initView();
                    return _this;
                }
                AccessDetailDlg.show = function () {
                    var dlg = new AccessDetailDlg();
                    dlg.popup(false, true);
                };
                AccessDetailDlg.prototype.initView = function () {
                    var _this = this;
                    this.itemPanel.vScrollBarSkin = "";
                    this.descGroup.visible = false;
                    this.descBg.mouseEnabled = true;
                    this.mkmc.size(Laya.stage.width, Laya.stage.height);
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    var tab;
                    for (var i = 1; i <= 4; i++) {
                        tab = this["tab" + i];
                        tab.alpha = 0;
                        EventManager.addTouchScaleListener(tab, this, this.tabHandler, i, 1);
                    }
                    EventManager.register(EventType.BALANCE_DETAILIITEM_DESE, this, this.showDese);
                    EventManager.pushEvent(this.mkmc, Laya.Event.CLICK, this, this.closeDeseTip);
                    //获取全部数据
                    LayaMain.getInstance().showCircleLoading(true);
                    HttpRequester.postHttpData(ConfObjRead.httpCmd.yuebaoDetail, {}, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            _this.allDatas = jobj;
                            _this.tabHandler(null, 1);
                        }
                    });
                };
                AccessDetailDlg.prototype.showDese = function (value) {
                    this.descGroup.visible = true;
                    this.infoTxt.text = value;
                    this.descBg.alpha = 0;
                    this.descBg.scale(0, 0);
                    Laya.Tween.to(this.descBg, { alpha: 1, scaleX: 1, scaleY: 1 }, 350, Laya.Ease.cubicOut);
                };
                AccessDetailDlg.prototype.closeDeseTip = function () {
                    var _this = this;
                    Laya.Tween.to(this.descBg, { alpha: 0, scaleX: 0, scaleY: 0 }, 300, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                        _this.descGroup.visible = false;
                    }));
                };
                AccessDetailDlg.prototype.tabHandler = function (evt, id) {
                    var tab = this["tab" + id];
                    if (tab.alpha == 1)
                        return;
                    tab.alpha = 1;
                    if (evt)
                        SoundPlayer.clickSound();
                    if (this.prevTab) {
                        this.prevTab.alpha = 0;
                    }
                    this.prevTab = tab;
                    if (id == 1)
                        this.showDetail(this.allDatas);
                    else {
                        var type_1 = this.dataTypes[id - 1];
                        var arr = this.allDatas.filter(function (value) { return value.type == type_1; });
                        this.showDetail(arr);
                    }
                };
                AccessDetailDlg.prototype.showDetail = function (arr) {
                    var _this = this;
                    if (this.itemPanel.numChildren > 0) {
                        this.itemPanel.removeChildren();
                        this.itemPanel.refresh();
                    }
                    var item;
                    arr.forEach(function (value, index) {
                        item = new view.dlg.balance.DetailItemView();
                        item.readData(value);
                        item.y = index * (item.height + 6);
                        _this.itemPanel.addChild(item);
                    });
                };
                AccessDetailDlg.prototype.onClosed = function (type) {
                    Laya.Tween.clearTween(this.descBg);
                    this.itemPanel.destroy(true);
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return AccessDetailDlg;
            }(ui.dlg.balance.AccessDetailDlgUI));
            balance.AccessDetailDlg = AccessDetailDlg;
        })(balance = dlg_1.balance || (dlg_1.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AccessDetailDlg.js.map