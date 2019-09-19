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
    var comp;
    (function (comp) {
        /**
         * 玩家信息视图
         */
        var UserInfoView = /** @class */ (function (_super) {
            __extends(UserInfoView, _super);
            function UserInfoView() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            UserInfoView.prototype.initView = function () {
                this.checkVisitorMark();
                //点击头像打开个人中心
                EventManager.addTouchScaleListener(this.headIcon, this, function () {
                    SoundPlayer.enterPanelSound();
                    PageManager.showDlg(DlgCmd.personCenter);
                }, null, 1);
                //充值
                EventManager.addTouchScaleListener(this.addBtn, this, function () {
                    SoundPlayer.enterPanelSound();
                    InnerJumpUtil.doJump(DlgCmd.recharge);
                });
                //全局事件监听
                EventManager.register(EventType.GETUSERS_INFO, this, this.showUserInfo);
                EventManager.register(EventType.FLUSH_MONEY, this, this.showMoney);
                EventManager.register(EventType.GETAVATOR_INFO, this, this.showHeadIcon);
                EventManager.register(EventType.FLUSH_HEADICON, this, this.flushHeadIcon);
            };
            /**
             * 检测游客标记
             */
            UserInfoView.prototype.checkVisitorMark = function () {
                this.visitorMark.visible = LoginModel.isVisitor;
            };
            //玩家头像
            UserInfoView.prototype.showHeadIcon = function () {
                var id = Common.avatorInfo.avatorId;
                this.flushHeadIcon(id);
            };
            UserInfoView.prototype.flushHeadIcon = function (id) {
                this.headIcon.skin = ResConfig.getHeadSkinByID(id);
            };
            //显示玩家名
            UserInfoView.prototype.showUserInfo = function () {
                this.showMoney();
                var data = Common.userInfo;
                if (data) {
                    var nameStr = data.nickname || data.username;
                    this.nameTxt.text = nameStr;
                }
            };
            //显示金币
            UserInfoView.prototype.showMoney = function () {
                var scl = 0.8;
                //金币显示
                if (!this.bitFont) {
                    this.bitFont = new BitmapFont(ResConfig.bitFont_norm);
                    this.goldBox.addChild(this.bitFont);
                    this.bitFont.scale(scl, scl);
                    this.bitFont.text = "0";
                    this.bitFont.y = this.goldBox.height - this.bitFont.height * scl >> 1;
                }
                if (Common.userBalance >= 0) {
                    var gold = Common.userBalance;
                    this.bitFont.text = Tools.FormatMoney(gold, 2);
                    this.bitFont.x = this.goldBox.width - this.bitFont.width * scl >> 1;
                    this.bitFont.x -= 6; //像左偏移
                }
            };
            UserInfoView.prototype.destroy = function () {
                EventManager.removeAllEvents(this);
                _super.prototype.destroy.call(this, true);
            };
            return UserInfoView;
        }(ui.comp.UserInfoViewUI));
        comp.UserInfoView = UserInfoView;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=UserInfoView.js.map