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
    /**
     * 新版大厅
     */
    var LobbyNewView = /** @class */ (function (_super) {
        __extends(LobbyNewView, _super);
        function LobbyNewView() {
            var _this = _super.call(this) || this;
            _this.animArr = []; //存放动画，用于统一管理
            _this.initView();
            return _this;
        }
        LobbyNewView.prototype.initView = function () {
            this.layoutBottomLeftBtn();
            this.layoutTopRightBtn();
            this.dpiLayout();
            this.animArr.push(this.userInfo.goldAnim, this.bindAnim, this.agentAnim, this.tixianAnim, this.payAnim);
            this.readData();
            this.initEvents();
            this.playEntryAnim();
            Debug.log("----->>>api:" + ConfObjRead.getConfUrl().url.apihome);
        };
        //读取相关数据
        LobbyNewView.prototype.readData = function () {
            //安卓平台过审时需要隐藏
            if (AppData.isAndroidHack) {
                this.withdrawBtn.visible = false;
                this.payBtn.visible = false;
            }
            this.bindBtn.visible = false;
            this.mailHot.visible = false;
            this.actHot.visible = false;
            this.checkUnreadNotice();
            this.leftLight.initPlay();
            this.rightLight.initPlay(500);
        };
        LobbyNewView.prototype.initEvents = function () {
            //升级送金
            EventManager.addTouchScaleListener(this.bindBtn, this, function () {
                SoundPlayer.enterPanelSound();
                PageManager.showDlg(DlgCmd.bindPhoneAct);
            });
            //活动
            EventManager.addTouchScaleListener(this.actBtn, this, function () {
                SoundPlayer.enterPanelSound();
                PageManager.showDlg(DlgCmd.activityCenter, DlgCmd.activityCenter);
            });
            //公告
            EventManager.addTouchScaleListener(this.noticeBtn, this, function () {
                SoundPlayer.enterPanelSound();
                PageManager.showDlg(DlgCmd.noticeCenter, DlgCmd.noticeCenter);
            });
            //余额宝
            EventManager.addTouchScaleListener(this.btn_yeb, this, function () {
                SoundPlayer.enterPanelSound();
                PageManager.showDlg(DlgCmd.balance);
            });
            //排行
            EventManager.addTouchScaleListener(this.btn_rank, this, function () {
                SoundPlayer.enterPanelSound();
                Toast.showToast("功能暂未开放");
            });
            //邮件
            EventManager.addTouchScaleListener(this.btn_mail, this, function () {
                SoundPlayer.enterPanelSound();
                PageManager.showDlg(DlgCmd.email);
            });
            //客服
            EventManager.addTouchScaleListener(this.btn_service, this, function () {
                SoundPlayer.enterPanelSound();
                InnerJumpUtil.doJump(DlgCmd.service);
            });
            //代理
            EventManager.addTouchScaleListener(this.agentBtn, this, function () {
                SoundPlayer.enterPanelSound();
                PageManager.showDlg(DlgCmd.agentCenter);
            });
            //提现
            EventManager.addTouchScaleListener(this.withdrawBtn, this, function () {
                SoundPlayer.enterPanelSound();
                InnerJumpUtil.doJump(DlgCmd.withdraw);
            });
            //充值
            EventManager.addTouchScaleListener(this.payBtn, this, function () {
                SoundPlayer.enterPanelSound();
                InnerJumpUtil.doJump(DlgCmd.recharge);
            });
            //全局消息监听
            EventManager.register(EventType.GETBINDAWARD_SUCC, this, this.hideBindBtn);
            EventManager.register(EventType.GETUSER_CURRENT, this, this.checkBindPhone);
            EventManager.register(EventType.BINDPHONE_INFO, this, this.checkBindPhone);
            EventManager.register(EventType.GETUSERS_INFO, this, this.checkAgentBtn);
            EventManager.register(EventType.CHECK_UNREADMAIL, this, this.checkUnreadMail);
            EventManager.register("closeNotice", this, this.checkUnreadNotice);
        };
        //活动红点显示逻辑
        LobbyNewView.prototype.checkUnreadNotice = function () {
            var _this = this;
            LobbyModel.checkUnreadNotice(this, function (bl) {
                if (_this.destroyed)
                    return;
                _this.actHot.visible = bl;
            });
        };
        //邮件红点显示逻辑
        LobbyNewView.prototype.checkUnreadMail = function (jobj) {
            var total = jobj.total || 0;
            this.mailHot.visible = Boolean(total > 0);
        };
        //代理按钮显示逻辑
        LobbyNewView.prototype.checkAgentBtn = function () {
            if (Common.userInfo) {
                this.agentBtn.visible = Common.userInfo.userRole != "PLAYER";
            }
        };
        //升级成功后的逻辑
        LobbyNewView.prototype.hideBindBtn = function () {
            this.bindBtn.visible = false;
            this.userInfo.checkVisitorMark();
            LobbyModel.refreshMoney();
            LobbyModel.reqUserCurrentInfo();
        };
        //绑定升级送金显示逻辑
        LobbyNewView.prototype.checkBindPhone = function () {
            if (!Common.userInfo_current)
                return;
            this.userInfo.checkVisitorMark();
            if (LoginModel.isVisitor) { //只要不是正式账号
                this.bindBtn.visible = true;
                QueueTask.addQueue(QueueType.bindPhoneActiv);
                //显示逻辑已经放到活动公告关闭后,如果没有活动公告则直接显示
            }
        };
        //-----------------------public-------------------------------
        /**
         * 播放入场动画
         */
        LobbyNewView.prototype.playEntryAnim = function (checkDlg) {
            if (checkDlg === void 0) { checkDlg = true; }
            this.userInfo.y = -this.userInfo.height * 1.5;
            this.trLayout.y = -this.trLayout.height * 1.5;
            this.bottomGroup.y = Laya.stage.height + this.bottomGroup.height;
            this.gameList.x = Laya.stage.width;
            var easeing = Laya.Ease.cubicOut;
            var time = 350;
            Laya.Tween.to(this.userInfo, { y: 0 }, time, easeing, null, 100);
            Laya.Tween.to(this.trLayout, { y: 20 }, time, easeing, null, 100);
            Laya.Tween.to(this.bottomGroup, { y: Laya.stage.height - this.bottomGroup.height }, time, easeing, null, 100);
            Laya.Tween.to(this.gameList, { x: this.gameList.gapx }, 600, Laya.Ease.backOut, null, 200);
            if (checkDlg)
                Laya.timer.once(1000, this, function () {
                    //检查显示默认弹框
                    LobbyModel.checkActivity();
                });
        };
        /**
         * 从游戏返回到大厅
         */
        LobbyNewView.prototype.gameToHall = function () {
            Debug.log("返回大厅--->恢复动画播放");
            //刷新玩家信息
            LobbyModel.reqUserInfo();
            LobbyModel.reqUserCurrentInfo();
            this.checkUnreadNotice();
            //恢复动画播放
            this.animArr.forEach(function (anim) { return anim.resume(); });
            this.playEntryAnim(false);
            this.leftLight.initPlay();
            this.rightLight.initPlay(500);
            //刷新轮播图数据
            this.cirbox.requestCycelData();
            //检查全局维护公告
            LayaMain.getInstance().checkGameMaintenance();
        };
        /**
         * 从大厅进入游戏
         */
        LobbyNewView.prototype.hallToGame = function () {
            Debug.log("进入游戏--->暂停动画播放");
            this.animArr.forEach(function (anim) { return anim.paused(); });
            this.cirbox.pause();
            this.leftLight.stopAnim();
            this.rightLight.stopAnim();
        };
        //------------------------布局相关---------------------------------------------
        //按钮布局
        LobbyNewView.prototype.layoutBottomLeftBtn = function () {
            var gap = 46;
            var start = this.btn_yeb.x + this.btn_yeb.width / 2;
            var arr = [
                this.btn_rank,
                this.btn_mail,
                this.btn_service
            ];
            var prev;
            arr.forEach(function (btn, index) {
                if (btn.visible) {
                    if (prev)
                        btn.x = prev.x + prev.width / 2 + btn.width / 2 + gap;
                    else
                        btn.x = start + btn.width / 2 + gap;
                    prev = btn;
                }
            });
        };
        //按钮布局
        LobbyNewView.prototype.layoutTopRightBtn = function () {
            var gap = 26;
            var start = this.noticeBtn.x - this.noticeBtn.width / 2;
            this.cirBtn.visible = false;
            var arr = [
                this.actBtn,
                this.cirBtn,
                this.bindBtn,
                this.agentBtn
            ];
            var prev;
            arr.forEach(function (btn, index) {
                if (btn.visible) {
                    if (prev)
                        btn.x = prev.x - prev.width / 2 - btn.width / 2 - gap;
                    else
                        btn.x = start - btn.width / 2 - gap;
                    prev = btn;
                }
            });
        };
        //根据分辨率布局
        LobbyNewView.prototype.dpiLayout = function () {
            this.width = Laya.stage.width;
            this.userInfo.x = GameUtils.getScreencOffset(-40, 0);
            this.bottomGroup.x = GameUtils.getScreencOffset(-58, 0);
            this.brLayout.right = this.trLayout.right = GameUtils.getScreencOffset(20, 78);
        };
        /**
         * 释放销毁
         */
        LobbyNewView.prototype.destroy = function () {
            LobbyModel.classifyPool = {}; //重置缓存池
            EventManager.removeAllEvents(this);
            this.animArr.forEach(function (anim) { return anim.destroy(true); });
            _super.prototype.destroy.call(this, true);
        };
        return LobbyNewView;
    }(ui.LobbyNewViewUI));
    view.LobbyNewView = LobbyNewView;
})(view || (view = {}));
//# sourceMappingURL=LobbyNewView.js.map