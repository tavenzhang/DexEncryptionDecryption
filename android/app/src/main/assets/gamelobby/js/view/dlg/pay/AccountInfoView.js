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
             * 用于填写存款信息
             */
            var AccountInfoView = /** @class */ (function (_super) {
                __extends(AccountInfoView, _super);
                function AccountInfoView() {
                    var _this = _super.call(this) || this;
                    _this.uiList = [];
                    _this.centerX = _this.centerY = 0;
                    _this.bankNameTxt.editable = false;
                    _this.bankNameTxt.mouseEnabled = false;
                    _this.uiList.push(_this.nameGroup, _this.phoneGroup, _this.bankNumGroup, _this.bankGroup);
                    return _this;
                }
                /**
                 *
                 * @param vo
                 * @param isBank 是否为银行类型
                 */
                AccountInfoView.prototype.show = function (vo, isBank) {
                    var _this = this;
                    if (isBank) {
                        this.layoutUI(true);
                    }
                    else {
                        var data = vo;
                        this.layoutUI(data.realNameReq, data.mobileNoReq, data.cardNoReq, Boolean(data.webBankList));
                        this.webBankList = data.webBankList;
                    }
                    //上一步
                    EventManager.addTouchScaleListener(this.prevBtn, this, function () {
                        SoundPlayer.clickSound();
                        PayManager.inst.showLastView();
                    });
                    //确定按钮
                    EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
                        SoundPlayer.clickSound();
                        if (!_this.checkInput())
                            return;
                        if (isBank) {
                            PayManager.inst.showBankPayInfoView(vo, _this.nameTxt.text);
                        }
                        else {
                            var info = {};
                            if (_this.nameGroup.visible)
                                info.realName = _this.nameTxt.text;
                            if (_this.phoneGroup.visible)
                                info.mobileNo = _this.phoneTxt.text;
                            if (_this.bankNumGroup.visible)
                                info.cardNo = _this.cardNumTxt.text;
                            if (_this.bankGroup.visible) {
                                info.bankCode = _this.curBankVo.bankValue;
                                if (_this.curBankVo.cardType)
                                    info.cardType = _this.curBankVo.cardType;
                            }
                            PayManager.inst.showOtherPayInfoView(vo, info);
                        }
                    });
                    if (this.webBankList) {
                        //选择网银
                        EventManager.addTouchScaleListener(this.chooseBtn, this, function () {
                            SoundPlayer.enterPanelSound();
                            view.dlg.pay.WebBankDlg.show(_this.webBankList, _this, _this.chooseItem);
                        });
                    }
                };
                //当前选择的网银数据
                AccountInfoView.prototype.chooseItem = function (vo) {
                    this.curBankVo = vo;
                    var str = vo.bankName;
                    if (vo.cardType)
                        str += PayModel.cardTypeMap[vo.cardType];
                    this.bankNameTxt.text = str;
                };
                AccountInfoView.prototype.layoutUI = function (isName, isPhone, isBanknum, payBank) {
                    var gap = 12;
                    this.nameGroup.visible = isName;
                    this.phoneGroup.visible = isPhone;
                    this.bankNumGroup.visible = isBanknum;
                    this.bankGroup.visible = payBank;
                    var showNum = 0;
                    this.uiList.forEach(function (ui) {
                        if (ui.visible) {
                            showNum++;
                        }
                    });
                    var itemH = this.nameGroup.height * showNum + (showNum - 1) * gap;
                    var starty = this.itemBox.height - itemH >> 1;
                    showNum = 0;
                    this.uiList.forEach(function (ui) {
                        if (ui.visible) {
                            ui.y = starty + showNum * (ui.height + gap);
                            showNum++;
                        }
                    });
                };
                AccountInfoView.prototype.checkInput = function () {
                    var bl = true;
                    if (this.nameGroup.visible) {
                        bl = GameUtils.checkStr(this.nameTxt.text, "请输入真实姓名");
                        if (!bl)
                            return bl;
                    }
                    if (this.phoneGroup.visible) {
                        bl = GameUtils.checkStr(this.phoneTxt.text, "请输入手机号码");
                        if (!bl)
                            return bl;
                    }
                    if (this.bankNumGroup.visible) {
                        bl = GameUtils.checkStr(this.cardNumTxt.text, "请输入银行卡号");
                        if (!bl)
                            return bl;
                    }
                    if (this.bankGroup.visible) {
                        bl = GameUtils.checkStr(this.bankNameTxt.text, "请选择支付银行");
                        if (!bl)
                            return bl;
                    }
                    return bl;
                };
                return AccountInfoView;
            }(ui.dlg.pay.AccountInfoViewUI));
            pay.AccountInfoView = AccountInfoView;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AccountInfoView.js.map