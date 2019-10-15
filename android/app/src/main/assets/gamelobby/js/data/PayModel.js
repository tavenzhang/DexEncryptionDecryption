var _a, _b;
/**
 * 支付处理方式
 */
var PayMentJumpType;
(function (PayMentJumpType) {
    PayMentJumpType[PayMentJumpType["URL"] = 1] = "URL";
    PayMentJumpType[PayMentJumpType["IMG"] = 2] = "IMG";
    PayMentJumpType[PayMentJumpType["FROM"] = 3] = "FROM";
    PayMentJumpType[PayMentJumpType["XML"] = 4] = "XML";
    PayMentJumpType[PayMentJumpType["HTML"] = 5] = "HTML";
})(PayMentJumpType || (PayMentJumpType = {}));
/**
 * vip充值类型
 */
var VipPayType;
(function (VipPayType) {
    VipPayType[VipPayType["OTHER"] = 0] = "OTHER";
    VipPayType[VipPayType["ALIPAY"] = 1] = "ALIPAY";
    VipPayType[VipPayType["WECHAT"] = 2] = "WECHAT";
    VipPayType[VipPayType["QQ"] = 3] = "QQ";
})(VipPayType || (VipPayType = {}));
/**
 * 支付类型
 */
var PayType;
(function (PayType) {
    PayType[PayType["OTHER"] = 0] = "OTHER";
    PayType[PayType["BANK"] = 1] = "BANK";
    PayType[PayType["ZHB"] = 2] = "ZHB";
    PayType[PayType["JD"] = 3] = "JD";
    PayType[PayType["VIP"] = 4] = "VIP";
    PayType[PayType["QQ"] = 5] = "QQ";
    PayType[PayType["FIXED_WX"] = 6] = "FIXED_WX";
    PayType[PayType["WX"] = 7] = "WX";
    PayType[PayType["WX_PUBLIC"] = 8] = "WX_PUBLIC";
    PayType[PayType["FIXED_QQ"] = 9] = "FIXED_QQ";
    PayType[PayType["ONLINEBANK"] = 10] = "ONLINEBANK";
    PayType[PayType["THIRD_PARTY"] = 11] = "THIRD_PARTY";
    PayType[PayType["FIXED_ZHB"] = 12] = "FIXED_ZHB";
})(PayType || (PayType = {}));
//充值三大类型
var ThreeType;
(function (ThreeType) {
    ThreeType[ThreeType["vip"] = 1] = "vip";
    ThreeType[ThreeType["fixedMoney"] = 2] = "fixedMoney";
    ThreeType[ThreeType["otherTransfer"] = 3] = "otherTransfer";
    ThreeType[ThreeType["bankTransfer"] = 4] = "bankTransfer";
    ThreeType[ThreeType["wechatPublic"] = 5] = "wechatPublic";
})(ThreeType || (ThreeType = {}));
/*
* 充值相关数据
*/
var PayModel = /** @class */ (function () {
    function PayModel() {
    }
    /**
     * 检查支付类型
     * @param code
     */
    PayModel.checkType = function (code) {
        var type = PayType[code];
        if (type == undefined)
            return null;
        switch (type) {
            case PayType.VIP: return ThreeType.vip;
            case PayType.FIXED_WX:
            case PayType.FIXED_QQ:
            case PayType.FIXED_ZHB: return ThreeType.fixedMoney;
            case PayType.BANK: return ThreeType.bankTransfer;
            case PayType.WX_PUBLIC: return ThreeType.wechatPublic;
        }
        return ThreeType.otherTransfer;
    };
    /**
     * 获取充值方式列表
     * @param caller
     * @param callback
     */
    PayModel.getPayList = function (caller, callback) {
        var _this = this;
        if (this.useCache && this.payList) {
            if (caller && callback)
                callback.call(caller);
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.getHttpData(ConfObjRead.httpCmd.payList, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.payList = jobj;
                if (caller && callback)
                    callback.call(caller);
            }
        }, "&version=5");
    };
    /**
     * 充值方式二级列表
     * @param code
     * @param caller
     * @param callback
     */
    PayModel.getPayment = function (code, caller, callback) {
        if (this.useCache && this.paySubMap[code]) {
            if (caller && callback)
                callback.call(caller, this.paySubMap[code]);
            return;
        }
        var arr = this.otherPayList.filter(function (value) { return value.type == code; });
        if (code == PayType[PayType.ONLINEBANK]) { //网银有2个标记,所以需要特殊处理
            var type_1 = PayType[PayType.THIRD_PARTY];
            var other = this.otherPayList.filter(function (value) { return value.type == type_1; });
            arr = arr.concat(other);
        }
        if (this.backAndOrList) { //将银行列表v2中的数据合并
            var list = this.backAndOrList.filter(function (value) { return value.bankCode == code; });
            Debug.log("合并数据：", list);
            list.forEach(function (vo) {
                vo.isCombine = true;
                arr.push({
                    combineVo: vo
                });
            });
        }
        this.paySubMap[code] = arr;
        if (caller && callback)
            callback.call(caller, arr);
    };
    /**
     * 获取银行转账列表(v2)
     * 注意：此列表混杂了其他充值方式
     * @param id 业主id
     * @param caller
     * @param callback
     */
    PayModel.getBanktransfers = function (id, caller, callback) {
        var _this = this;
        if (this.useCache && this.backAndOrList) {
            if (caller && callback)
                callback.call(caller);
            return;
        }
        LayaMain.getInstance().showCircleLoading(true);
        //.../banklist/v2
        HttpRequester.getHttpData(ConfObjRead.httpCmd.banktransfers, this, function (suc, jobj) {
            if (suc) {
                _this.backAndOrList = jobj;
                Debug.log("bankList:", jobj);
                _this.bankSubList = _this.backAndOrList.filter(function (value) { return value.bankCode == undefined; });
            }
            _this.getOtherPayList(caller, callback);
        });
    };
    /**
     * 获取其他充值方式列表(listV2)
     * @param caller
     * @param callback
     */
    PayModel.getOtherPayList = function (caller, callback) {
        var _this = this;
        HttpRequester.getHttpData(ConfObjRead.httpCmd.payment, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                Debug.log("otherList:", jobj);
                _this.otherPayList = jobj;
                if (caller && callback)
                    callback.call(caller);
            }
        }); //"&paymentNameCode=" + code 传参数就会返回对应数据，否则返回全部数据
    };
    /**
     * 充值方式-针对银行列表数据类型
     * @param data
     * @param money
     * @param depositorName 存款人
     * @param caller
     * @param callback
     */
    PayModel.payByBankList = function (vo, money, depositorName, caller, callback) {
        LayaMain.getInstance().showCircleLoading(true);
        var data = {
            adminBankId: vo.adminBankId,
            // id: Common.clientId,
            topupAmount: money
        };
        if (depositorName) {
            data.depositorName = depositorName;
        }
        //银行转账需要带的参数
        if (!vo.isCombine)
            data.transferTopupType = "BANK_ONLINE";
        //transfer/topups/banktransfers/v4
        HttpRequester.putHttpData(ConfObjRead.httpCmd.payByBankList, data, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (caller && callback)
                callback.call(caller, suc, jobj);
        });
    };
    /**
     * 充值方式-ListV2类型
     * @param data
     * @param caller
     * @param callback
     */
    PayModel.payByListV2 = function (vo, money, info, caller, callback) {
        var data = {
            paymentId: vo.paymentId,
            paymentType: vo.paymentType,
            // id: Common.clientId,
            topupAmount: money
        };
        if (vo.platform) { //纠正网银支付的这个数据(可能管端给的有误)
            data.paymentType = "THIRD";
        }
        if (info) {
            if (info.cardNo)
                data.cardNo = info.cardNo;
            if (info.mobileNo)
                data.mobileNo = info.mobileNo;
            if (info.realName)
                data.realName = info.realName;
            if (vo.platform) { //说明是网银支付
                if (info.bankCode)
                    data.bankCode = info.bankCode;
                if (info.cardType)
                    data.cardType = info.cardType;
            }
        }
        Debug.log("ListV2支付:", data);
        LayaMain.getInstance().showCircleLoading(true);
        //cashmgt/me/transfer/topups
        HttpRequester.postHttpData(ConfObjRead.httpCmd.payByListV2, data, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (caller && callback)
                callback.call(caller, suc, jobj);
        });
    };
    /**
     * 获取网银列表(网银支付需要)
     * @param paymentSetId
     * @param caller
     * @param callback
     */
    PayModel.getOnlineBankList = function (paymentSetId, caller, callback) {
        LayaMain.getInstance().showCircleLoading(true);
        var params = "&paymentSetId=" + paymentSetId;
        HttpRequester.getHttpData(ConfObjRead.httpCmd.onlineBankList, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (caller && callback)
                callback.call(caller, suc, jobj);
        }, params);
    };
    /**
     * 充值明细
     * @param caller
     * @param callback
     */
    PayModel.getPayHistory = function (caller, callback) {
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.getHttpData(ConfObjRead.httpCmd.payHistory, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (caller && callback)
                    callback.call(caller, jobj);
            }
        }, "&pageSize=20&start=0&state=&type=TOPUP");
    };
    //清理缓存
    PayModel.clear = function () {
        this.payList = null;
        this.paySubMap = {};
        this.bankSubList = null;
        this.backAndOrList = null;
        this.otherPayList = null;
    };
    PayModel.btnMark = "cache_payBtn"; //用于缓存按钮
    PayModel.useCache = true; //是否缓存数据
    PayModel.paySubMap = {}; //用于缓存充值数据详细
    //code对应的充值列表图标
    PayModel.tabIconMap = (_a = {},
        _a[PayType.OTHER] = "ui/pay/payicon10.png",
        _a[PayType.BANK] = "ui/pay/payicon09.png",
        _a[PayType.ZHB] = "ui/pay/payicon11.png",
        _a[PayType.JD] = "ui/pay/payicon02.png",
        _a[PayType.VIP] = "ui/pay/payicon05.png",
        _a[PayType.QQ] = "ui/pay/payicon03.png",
        _a[PayType.FIXED_WX] = "ui/pay/payicon07.png",
        _a[PayType.WX] = "ui/pay/payicon06.png",
        _a[PayType.WX_PUBLIC] = "ui/pay/payicon01.png",
        _a[PayType.FIXED_QQ] = "ui/pay/payicon04.png",
        _a[PayType.ONLINEBANK] = "ui/pay/payicon08.png",
        _a[PayType.FIXED_ZHB] = "ui/pay/payicon12.png",
        _a);
    //vip充值方式中文
    PayModel.vipPayMap = (_b = {},
        _b[VipPayType.ALIPAY] = "支付宝",
        _b[VipPayType.WECHAT] = "微信",
        _b[VipPayType.QQ] = "QQ",
        _b);
    //网银卡类型
    PayModel.cardTypeMap = {
        "DC": "(储蓄卡)",
        "CC": "(信用卡)"
    };
    return PayModel;
}());
//# sourceMappingURL=PayModel.js.map