import {action, observable} from 'mobx'
import TCUserPayAndWithdrawRecordsMain from "../../Page/UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain";
import React from "react";
import TCUserBankPayMessageNew from "../../Page/UserCenter/UserPay/TCUserBankPayMessageNew";

import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from "../../Common/Network/TCRequestConfig";
import TCUserOpenPayApp from "../../Page/UserCenter/UserPay/TCUserOpenPayApp";
import GamePromptView from "../../Page/enter/game/GamePromptView";
export default class GameUIStroe {

    @observable
    isShowUserInfo = false;

    @observable
    isShowAddPayView = false;

    @observable
    isShowWithDraw = false;
    @observable
    isShowAppGUEST= false;

    @observable
    isShowGuest = false;

    @observable
    isShowShare = false;
    @observable
    shareData = "";

    @observable
    isShowResLoading = false;

    @observable
    gustWebUrl = "";

    @observable
    wxShareHandle = {isShareIng:false,callback:null};

    @observable
    gameAlertData = {
        title: "",
        component: null,
        param: {},
        onBack: null
    };

    @action
    checkWXInstall(callBack, hintText = null) {
        TCUserOpenPayApp.isInstallWX(ret => {
            callBack(ret);
            //如果没有安装
            if (!ret) {
                if (hintText) {
                    callBack(hintText);
                } else {
                    TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.popTip, {data: "请先安装微信!"}));
                }
            }
        })
    }

    @action
    showTiXianDetail(isShow = true, onBack = null) {
        this.gameAlertData = {
            title: "提现明细",
            isUserAccount: true,
            component: TCUserPayAndWithdrawRecordsMain,
            param: {accountType: 0, isBackToTop: true},
            onBack
        }
    }

    @action
    showChongZhiDetail(isShow = true, onBack = null) {
        this.gameAlertData = {
            title: "充值明细",
            isUserAccount: true,
            component: TCUserPayAndWithdrawRecordsMain,
            param: {accountType: 1, isBackToTop: false},
            onBack
        }
    }

    @action
    showBankPay(param) {
        this.gameAlertData = {
            title: "银行转账",
            component: TCUserBankPayMessageNew,
            param,
        }
    }

    @action
    showCommonView(title = "", component = null, param = {}) {
        this.gameAlertData = {
            title,
            component,
            param,
        }
    }

    @action
    showGusetView(isShow = true) {
        this.isShowGuest = isShow;
    }

    @action
    hideAlertUI() {
        this.gameAlertData = {
            title: "",
            component: null,
            param: {}
        }
    }


    @action
    showPrompt(isShow = true, onBack = null, param = {}) {
        this.gameAlertData = {
            title: "提示",
            isUserAccount: true,
            component: GamePromptView,
            param,
            onBack
        }
    }
}
