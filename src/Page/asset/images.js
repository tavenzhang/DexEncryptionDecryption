
export const Images = {
    bbl:{
        logo:require('./game/logo.png'),
    }

}


/**
 * 公共图片
 * @type {{topBg: *, topPersonal: *, back: *, topBarArrow: *, topBarList: *, topBarSudoku: *, bottomHomeNormal: *}}
 */
export const common = {
    iconNext: require('../resouce/addon/other/icon_next.png'),
    warn: require('../resouce/addon/other/warn.png'),
    close: require('../resouce/addon/other/close.png'),
    noPayData: require('../resouce/addon/other/pay_error.png'),
    backSpace: require('../resouce/addon/other/backspace.png'),
}

//个人中心
export const personal = {
    imgNext: common.iconNext,
    iconTransfer: require('../resouce/addon/userCenterIcon/icon_transfer.png'),
    payRecord: require('../resouce/addon/userCenterIcon/pay_records.png'),
    withDraw: require('../resouce/addon/userCenterIcon/withdraw_withdraw.png'),
    check: require('../resouce/addon/userCenterIcon/icon_checked.png'),
    unCheck: require('../resouce/addon/userCenterIcon/icon_uncheck.png'),
}


//用户充值
//用户充值
export const userPay = {
    noPayData: common.noPayData,
    qqPay: require('../resouce/addon/other/qq_pay.png'),
    thirdPay: require('../resouce/addon/other/third_pay.png'),
    wechat: require('../resouce/addon/other/wechat.png'),
    alipay: require('../resouce/addon/other/alipay.png'),
    bank: require('../resouce/addon/other/bank.png'),
    jdzf: require('../resouce/addon/other/jdzf.png'),
    userAlipayHelp01: require('../resouce/addon/other/alipay01.png'),
    userAlipayHelp02: require('../resouce/addon/other/alipay02.png'),
    userWechatPayHelper02: require('../resouce/addon/other/wechat02.png'),
    userAlipayHelp03: require('../resouce/addon/other/alipay03.png'),
    userWechatPayHelper03: require('../resouce/addon/other/wechat03.png'),
    userAlipayHelp04: require('../resouce/addon/other/alipay04.png'),
    userWechatPayHelper04: require('../resouce/addon/other/wechat04.png'),
    paidui01: common.select,
    paidui02: require('../resouce/addon/other/paidui22.png'),
    paidui03: require('../resouce/addon/other/win.png'),
    step7: require('./pay_step/step_7.png'),
    step8: require('./pay_step/step_8.png'),
    stepWx1: require('../asset/pay_step/wx_public/step1.png'),
    stepWx2: require('../asset/pay_step/wx_public/step2.png'),
    payTypeWx: require('./pay_icon/wx.png'),
    payTypeAlipay: require('./pay_icon/alipay.png'),
    payTypeJdzf: require('./pay_icon/jdzf.png'),
    payTypeUnionpay: require('./pay_icon/wy.png'),
    payTypeOther: require('./pay_icon/unionpay.png'),
    payTypeBank: require('./pay_icon/bank.png'),

}

//账变明细
export const userAccount = {
    calendar: require('../resouce/addon/userAccount/calendar.png'),
    dayAfter: require('../resouce/addon/userAccount/day_after.png'),
    dayBefore: require('../resouce/addon/userAccount/day_before.png')
}
//投注页面
export const betIcon = {
    back: require('../resouce/addon/other/fanhui2.png'),
    handPointing: require('../resouce/addon/other/hand_pointing.png'),
    orderQingChu: require('../resouce/addon/other/icon_qingchu.png'),
}

//账号信息
export const gameUI = {
    //userAccount
    btnPhone: require('./game/account/btn_phone.png'),
    btnRelName: require('./game/account/btnRelName.png'),
    btnRelChangeBg: require('./game/account/btnRelChangeBg.png'),
    persionText: require('./game/account/persionText.png'),
    personBg: require('./game/account/personBg.png'),
    btnClose: require('./game/account/btnClose.png'),
    btnOk: require('./game/account/btn_queren.png'),
    pwdOpen: require('./game/account/pwdOpen.png'),
    pwdClose: require('./game/account/pwdClose.png'),
    bindPhoneBg: require('./game/account/bindPhoneBg.png'),
    titlePhone: require('./game/account/titlePhone.png'),
    //guest
    guestBg: require('./game/guest/gusetBg.png'),
    guestIcon: require('./game/guest/guest_icon.png'),
    guestOSSelected: require('./game/guest/guest_os_selected.png'),
    guestOS: require('./game/guest/guest_os.png'),
    guestQASelected: require('./game/guest/guest_qa_selected.png'),
    guestQA: require('./game/guest/guest_qa.png'),
    guestTxt: require('./game/guest/guest_txt.png'),
    guestBottomBg: require('./game/guest/guestBottomBg.png'),
    guestQABg: require('./game/guest/guest_qa_Bg.png'),
    guestOSBg: require('./game/guest/guest_os_Bg.png'),
    guestQuestionAns: require('./game/guest/guest_question_answer.png'),
    //moneyOut
    titleMoneyOut: require('./game/moneyOut/titleMoneyOut.png'),
    iconMoneyOut: require('./game/moneyOut/iconMoneyOut.png'),
    btnOut: require('./game/moneyOut/btn_out.png'),
    payOutTypeBank: require('./game/moneyOut/payOutTypeBank.png'),
    payOutTypeZFB: require('./game/moneyOut/payOutTypeZFB.png'),
    payOutTypeZFB_notSupport: require('./game/moneyOut/img_tx_zfb02.png'),
    payTypeSelectBg: require('./game/moneyOut/payTypeSelectBg.png'),
    payOutBg: require('./game/moneyOut/payOutBg.png'),
    payOutTopIcon: require('./game/moneyOut/payOutTopIcon.png'),
    payOutMoneyLabel: require('./game/moneyOut/moneyLabel.png'),
    bankBtn: require('./game/moneyOut/bankbtn.png'),
    zfbBtn: require('./game/moneyOut/zfbbtn.png'),
    query: require('./game/moneyOut/query.png'),
    //moneyPay
    moneyInBg: require('./game/moneyPay/moneyInBg.png'),
    moneyBottomBg: require('./game/moneyPay/moneyBottomBg.png'),
    btn_onLine: require('./game/moneyPay/btn_guset_online.png'),
    btn_minxi: require('./game/moneyPay/btn_minxi.png'),
    payTopLeftBg: require('./game/moneyPay/pay_top_left_bg.png'),
    payBack: require('./game/moneyPay/pay_back.png'),
    payBackBg: require('./game/moneyPay/pay_back_bg.png'),
    payTopIcon: require('./game/moneyPay/pay_top_icon.png'),
    payTopTxt: require('./game/moneyPay/pay_top_txt.png'),
    btn_copy: require('./game/moneyPay/btn_copy.png'),
    promotionIcon: require('./game/moneyPay/promotionIcon.png'),
    //payType
    payTypeBg: require('./game/moneyPay/pay_type_bg.png'),
    payTypeWx: require('./game/moneyPay/type/pay_type_wx.png'),
    payTypeWxFix: require('./game/moneyPay/type/pay_type_wx_fix.png'),
    payTypeWxGZH: require('./game/moneyPay/type/pay_type_wxgzh.png'),
    payTypeQQ: require('./game/moneyPay/type/pay_type_qq.png'),
    payTypeQQFix: require('./game/moneyPay/type/pay_type_qq_fix.png'),
    payTypeZFB: require('./game/moneyPay/type/pay_type_zfb.png'),
    payTypeZFBFix: require('./game/moneyPay/type/pay_type_zfb_fix.png'),
    payTypeYL: require('./game/moneyPay/type/pay_type_yl.png'),
    payTypeWy: require('./game/moneyPay/type/pay_type_wy.png'),
    payTypeYhzz: require('./game/moneyPay/type/pay_type_yhzz.png'),
    payTypeJD: require('./game/moneyPay/type/pay_type_jd.png'),
    payTypeVIP: require('./game/moneyPay/type/pay_type_vip.png'),

    btnPayNormal: require('./game/moneyPay/btnPayNormal.png'),
    btnPayHight: require('./game/moneyPay/btnPayHight.png'),
    btnMoneyHight: require('./game/moneyPay/btnMoneyHight.png'),
    btnMoneyBg: require('./game/moneyPay/btnMoneyBg.png'),
    //btn
    typeJD: require('./game/moneyPay/type/typeJD.png'),
    typeQQ: require('./game/moneyPay/type/typeQQ.png'),
    typeWX: require('./game/moneyPay/type/typeWX.png'),
    typeWX_GZ: require('./game/moneyPay/type/typeWX_GZ.png'),
    typeZFB: require('./game/moneyPay/type/typeZFB.png'),
    typeBank: require('./game/moneyPay/type/typeYN.png'),
    typeWy: require('./game/moneyPay/type/typeWy.png'),
    typeTrans: require('./game/moneyPay/type/typeTrans.png'),

    //stepOnebg1
    stepOneBg1: require('./game/moneyPay/stepOnebg1.png'),
    stepOneBg2: require('./game/moneyPay/stepOnebg2.png'),

    listItemBg: require('./game/moneyPay/listItemBg.png'),
    listItemVIPBg: require('./game/moneyPay/listItemVIPBg.png'),
    fixedListItemBg: require('./game/moneyPay/pay_type_fixed_bg.png'),
    moneyLabelBg: require('./game/moneyPay/money_label_bg.png'),
    payExpand: require('./game/moneyPay/pay_expand.png'),
    payCollapse: require('./game/moneyPay/pay_collapse.png'),
    downArrow: require('./game/moneyPay/down_arrow.png'),
    //alert
    uiTitleBg: require('./game/uiTitleBg.png'),
    uiTitleBg1: require('./game/uiTitleBg1.png'),
    uiTitleBgSmall: require('./game/uiTitleBgSmall.png'),
    btn_fanhui: require('./game/btn_fanhui.png'),
    closeIcon: require('./game/close.png'),
    czmxIcon: require('./game/czmx_icon.png'),
    txmxIcon: require('./game/txmx_icon.png'),
    czmxTip: require('./game/czmx_tip.png'),
    txmxTip: require('./game/txmx_tip.png'),
    onlineService: require('./game/online_service.png'),
    czmxAll: require('./game/czmx_qb.png'),
    czmxAll_Normal: require('./game/czmx_qb_normal.png'),
    czmxFail: require('./game/czmx_sb.png'),
    czmxFail_Normal: require('./game/czmx_sb_normal.png'),
    czmxDone: require('./game/czmx_ywc.png'),
    czmxDone_Normal: require('./game/czmx_ywc_normal.png'),
    img_czmx_dkMenu: require('./game/img_czmx_dkMenu.png'),
    promptIcon: require('./game/prompt_icon.png'),
    btnRemark: require('./game/btn_remark.png'),
}

export const gameShare = {
    //userAccount
    boxBg: require('./game/share/boxBg.png'),
    btnAndroid:require('./game/share/btnAndroid.png'),
    btnApple:require('./game/share/btnApple.png'),
    btnWX:require('./game/share/btnWX.png'),
    btPYQ:require('./game/share/btPYQ.png'),
    fengxiangBg:require('./game/share/fengxiangBg.png'),
    imgMM:require('./game/share/img_mm.png'),
    btn_wxShare:require('./game/share/btn_wxShare.png'),
    btn_Copy:require('./game/share/btnCopy.png'),
}

export const phoneState = {
    battEmpty: require('./phone_state/dl_0.png'),
    batt30:require('./phone_state/dl_1.png'),
    batt50:require('./phone_state/dl_2.png'),
    batt80:require('./phone_state/dl_3.png'),
    battFull:require('./phone_state/dl_4.png'),
    battCharging:require('./phone_state/dl_c.png'),
    wf1bar:require('./phone_state/wr_0.png'),
    wf2bars:require('./phone_state/wr_1.png'),
    wf3bars:require('./phone_state/wr_2.png'),
    wfFull:require('./phone_state/wr_3.png'),
    wfNoConn:require('./phone_state/wr_00.png'),
    mb1bar:require('./phone_state/xh_1.png'),
    mb2bars:require('./phone_state/xh_2.png'),
    mb3bars:require('./phone_state/xh_3.png'),
    mb4bars:require('./phone_state/xh_4.png'),
    mb4G:require('./phone_state/xh_4G.png'),
}

export const gameMemu = {
    btnCancel: require("./gameMenu/btnCancel.png"),
    btnCollapseLeft: require("./gameMenu/btnCollapseLeft.png"),
    btnCollapseRight: require("./gameMenu/btnCollapseRight.png"),
    btnConfirm: require("./gameMenu/btnConfirm.png"),
    btnExit: require("./gameMenu/btnExit.png"),
    btnMenu: require("./gameMenu/btnMenu.png"),
    btnReload: require("./gameMenu/btnReload.png"),
    btnTransfer: require("./gameMenu/btnTransfer.png"),
    dialogInfo: require("./gameMenu/dialogInfo.png")
}
