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
             * 网银列表
             */
            var WebBankDlg = /** @class */ (function (_super) {
                __extends(WebBankDlg, _super);
                function WebBankDlg(data, caller, callback) {
                    var _this = _super.call(this) || this;
                    _this.data = data;
                    _this.caller = caller;
                    _this.callback = callback;
                    _this.readData();
                    return _this;
                }
                WebBankDlg.show = function (data, caller, callback) {
                    var dlg = new WebBankDlg(data, caller, callback);
                    dlg.popup(false, true);
                };
                WebBankDlg.prototype.readData = function () {
                    var _this = this;
                    this.itemList.vScrollBarSkin = "";
                    this.itemList.itemRender = view.dlg.pay.WebBankItem;
                    this.itemList.spaceY = 0;
                    this.itemList.renderHandler = Laya.Handler.create(this, this.renderItems, null, false);
                    this.itemList.selectEnable = true;
                    this.itemList.array = this.resolveData();
                    //
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                        SoundPlayer.clickSound();
                        if (!_this.itemList.selectedItem) {
                            Toast.showToast("请选择银行");
                            return;
                        }
                        if (_this.caller && _this.callback)
                            _this.callback.call(_this.caller, _this.itemList.selectedItem);
                        _this.close(null, true);
                    });
                };
                //分解数据
                WebBankDlg.prototype.resolveData = function () {
                    var _this = this;
                    var arr = [];
                    this.data.forEach(function (value) {
                        if (value.bankType) {
                            _this.addItem(arr, value);
                        }
                        else {
                            arr.push(value);
                        }
                    });
                    return arr;
                };
                WebBankDlg.prototype.addItem = function (arr, vo) {
                    vo.bankType.forEach(function (value) {
                        arr.push({
                            bankName: vo.bankName,
                            bankValue: vo.bankValue,
                            cardType: value
                        });
                    });
                };
                WebBankDlg.prototype.renderItems = function (cell) {
                    var vo = this.itemList.selectedItem;
                    cell.readData(cell.dataSource, vo);
                };
                WebBankDlg.prototype.onClosed = function (type) {
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return WebBankDlg;
            }(ui.dlg.pay.WebBankDlgUI));
            pay.WebBankDlg = WebBankDlg;
        })(pay = dlg_1.pay || (dlg_1.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=WebBankDlg.js.map