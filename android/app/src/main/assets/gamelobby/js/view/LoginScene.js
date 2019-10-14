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
/**
 * 新登录界面
 */
var LoginScene = /** @class */ (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.initLayout();
        _this.initDisplay();
        _this.startLoading();
        Laya.stage.on(Laya.Event.RESIZE, _this, _this.onResize);
        return _this;
    }
    LoginScene.prototype.onResize = function () {
        this.initLayout();
    };
    LoginScene.prototype.startLoading = function () {
        if (LoginModel.isLoaded) { //说明是从大厅退出到登录界面
            this.checkLoginType();
        }
        else {
            this.progress.visible = true;
            var conf = Laya.loader.getRes("./assets/conf/assets_lobby.json");
            //加载数据
            Laya.loader.load(conf.list, Laya.Handler.create(this, this.loadFinish), Laya.Handler.create(this, this.loadProgress, null, false)).on(Laya.Event.ERROR, this, this.loadErr);
        }
    };
    LoginScene.prototype.loadErr = function (e) {
        console.error("load-err:", e);
    };
    LoginScene.prototype.loadProgress = function (value) {
        this.progress.value = value;
        this.progressTxt.text = "正在加载资源" + Math.floor((value * 100)) + "%";
    };
    //资源加载完毕
    LoginScene.prototype.loadFinish = function () {
        PostMHelp.initGame();
        PageManager.initDlgMap();
        Common.confObj = ConfObjRead.getConfCommon();
        ResConfig.addTween = Common.confObj.addTween;
        GameData.joinLobbyType = JoinLobbyType.loginJoin;
        LoginModel.isLoaded = true;
        ToolsApp.copyNativeAdress();
        LobbyScene.initBgMusic();
        EventManager.register(EventType.INIT_LOGINVIEW, this, this.useTokenLogin);
        //检查维护公告
        LayaMain.getInstance().checkGameMaintenance();
    };
    //------------------token登录流程-------------------------
    //使用token登录
    LoginScene.prototype.useTokenLogin = function () {
        var _this = this;
        LoginModel.readGatewayInfo(false, this, function () {
            LoginModel.gatewayCount = 0;
            LoginModel.loginByToken(_this, _this.tokenLoginResult);
        });
    };
    //token登录结果
    LoginScene.prototype.tokenLoginResult = function (suc, curToken) {
        if (suc) {
            LayaMain.getInstance().showCircleLoading(false);
            LayaMain.getInstance().initLobby();
        }
        else {
            if (curToken)
                LoginModel.flushToken(this, this.flushTokenResult);
            else { //没有缓存token,说明是主动退出到登录界面的
                LayaMain.getInstance().showCircleLoading(false);
                this.checkLoginType();
            }
        }
    };
    //刷新token的结果
    LoginScene.prototype.flushTokenResult = function (suc) {
        if (suc) {
            LoginModel.loginByToken(this, this.useNewTokenLoginResult);
        }
        else {
            LayaMain.getInstance().showCircleLoading(false);
            this.checkLoginType();
        }
    };
    //使用刷新后的token登录情况
    LoginScene.prototype.useNewTokenLoginResult = function (suc) {
        LayaMain.getInstance().showCircleLoading(false);
        if (suc) {
            LayaMain.getInstance().initLobby();
        }
        else {
            this.checkLoginType();
        }
    }; //end-----------------------------------------------------
    //检查使用哪种登录方式
    LoginScene.prototype.checkLoginType = function () {
        var _this = this;
        LoginModel.readGatewayInfo(false, this, function () {
            _this.progress.visible = false;
            _this.cacheInfo = SaveManager.getObj().get(SaveManager.KEY_LASTLOGININFO, null);
            if (_this.cacheInfo) { //如果有缓存账号
                _this.showFastStartView();
            }
            else {
                _this.showOtherLoginView();
            }
            _this.initEvents();
        });
    };
    //显示快速开始界面
    LoginScene.prototype.showFastStartView = function () {
        this.fastGroup.alpha = 0;
        this.otherBtn.alpha = 0;
        this.fastGroup.visible = true;
        this.otherBtn.visible = true;
        this.btnGroup.visible = false;
        this.userTxt.text = this.cacheInfo.user;
        this.visitorMark.visible = Boolean(this.cacheInfo.type != LoginMethod.account);
        Laya.Tween.to(this.fastGroup, { alpha: 1 }, 500);
        Laya.Tween.to(this.otherBtn, { alpha: 1 }, 500);
    };
    //显示其他登录方式
    LoginScene.prototype.showOtherLoginView = function () {
        this.fastGroup.visible = false;
        this.otherBtn.visible = false;
        this.btnGroup.visible = true;
        //显示登录模式按钮
        this.loginBtns.forEach(function (btn) {
            btn.visible = true;
            btn.scale(0, 0);
            Laya.Tween.to(btn, { scaleX: 1, scaleY: 1, alpha: 1 }, 500, Laya.Ease.elasticOut);
        });
    };
    LoginScene.prototype.initEvents = function () {
        var _this = this;
        if (this.eventInited)
            return;
        //快速开始
        EventManager.addTouchScaleListener(this.fastStart, this, function () {
            SoundPlayer.clickSound();
            LoginModel.accountLogin(_this.cacheInfo, _this, _this.accountLoginResult);
        });
        //切换账号
        EventManager.addTouchScaleListener(this.toggleBtn, this, function () {
            SoundPlayer.enterPanelSound();
            view.dlg.login.AccountLoginDlg.show();
        });
        //切换其他方式登录
        EventManager.addTouchScaleListener(this.otherBtn, this, function () {
            SoundPlayer.clickSound();
            _this.showOtherLoginView();
        });
        //-----------------
        //游客登录
        EventManager.addTouchScaleListener(this.visitorBtn, this, function () {
            SoundPlayer.clickSound();
            var vo = SaveManager.getObj().get(SaveManager.KEY_VISTORINFO, null);
            if (vo)
                _this.doVisitorLogin(vo);
            else {
                console.error("没有缓存游客账号,创建中...");
                LoginModel.creatVisitorAccount(_this, _this.creatVisitorResult);
            }
        });
        //微信登录
        EventManager.addTouchScaleListener(this.wechatBtn, this, function () {
            SoundPlayer.clickSound();
            LoginModel.weChatCertification(0);
        });
        //账号登录
        EventManager.addTouchScaleListener(this.accountBtn, this, function () {
            SoundPlayer.enterPanelSound();
            if (_this.cacheInfo)
                _this.showFastStartView();
            else
                view.dlg.login.AccountLoginDlg.show();
        });
        //监听微信登录消息
        EventManager.register(EventType.WeChatLogin, this, this.doWXLogin);
        this.eventInited = true;
    };
    LoginScene.prototype.accountLoginResult = function (suc) {
        if (suc) {
            LayaMain.getInstance().initLobby();
        }
        else { //需要验证码
            view.dlg.login.AccountLoginDlg.show(this.cacheInfo);
        }
    };
    //创建游客账号结果返回
    LoginScene.prototype.creatVisitorResult = function (vo) {
        if (vo && vo.user && vo.pwd) {
            this.doVisitorLogin(vo);
        }
        else { //创建游客账号失败
            Debug.error("创建游客账号失败1");
            LayaMain.getInstance().showCircleLoading(false);
        }
    };
    //游客登录
    LoginScene.prototype.doVisitorLogin = function (vo) {
        if (!Common.gatewayInfo) {
            LoginModel.readGatewayInfo(true, this, this.doVisitorLogin, vo);
            return;
        }
        LoginModel.visitorLogin(vo);
    };
    //微信登录
    LoginScene.prototype.doWXLogin = function (obj) {
        if (!obj.data) {
            Debug.error("微信登录数据获取失败:", obj);
            return;
        }
        if (!obj.data.uid) {
            Toast.showToast("微信ID获取失败");
            return;
        }
        LoginModel.wechatLogin(obj.data.uid);
    };
    //初始化布局
    LoginScene.prototype.initLayout = function () {
        this.width = Laya.stage.width;
        this.infoBg.width = Laya.stage.width;
        var offset = GameUtils.getScreencOffset(28, 78);
        this.logoIcon.x = offset;
        this.serviceBtn.right = offset;
        this.otherBtn.right = offset;
        this.logoClip.x = this.width >> 1;
    };
    //初始化显示
    LoginScene.prototype.initDisplay = function () {
        this.loginBtns = [
            this.visitorBtn,
            this.wechatBtn,
            this.accountBtn
        ];
        var btnWidth = this.loginBtns[0].width;
        var len = this.loginBtns.length;
        var gap = 120;
        this.loginBtns.forEach(function (btn, index) {
            btn.x = btnWidth / 2 + index * (btnWidth + gap);
            btn.visible = false;
        });
        this.btnGroup.width = len * btnWidth + (len - 1) * gap;
        //
        this.fastGroup.visible = false;
        this.otherBtn.visible = false;
        this.btnGroup.visible = false;
        this.progress.value = 0;
        this.progress.visible = false;
        /**
         * 业主可替换的图标，需要动态加载
         */
        this.logoIcon.alpha = 0;
        this.logoIcon.skin = "./brand/login_icon.png";
        Laya.Tween.to(this.logoIcon, { delay: 300, alpha: 1 }, 600);
        //渠道包屏蔽
        if (AppData.isAndroidHack)
            this.logoIcon.visible = false;
        //设置游戏版本号
        ResConfig.versions = "Res v" + ConfObjRead.getVerConfig().versionNum;
        this.verTxt.text = GameUtils.appVer + " " + ResConfig.versions;
        gap = 16;
        var infoLen = this.verTxt.textWidth + gap + this.hintTxt.textWidth;
        var ix = Laya.stage.width - infoLen >> 1;
        this.verTxt.x = ix;
        this.hintTxt.x = ix + this.verTxt.textWidth + gap;
        //客服
        EventManager.addTouchScaleListener(this.serviceBtn, this, function () {
            SoundPlayer.clickSound();
            InnerJumpUtil.doJump(DlgCmd.service);
        });
    };
    LoginScene.prototype.destroy = function () {
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        EventManager.removeAllEvents(this);
        if (this.logoClip)
            this.logoClip.destroy();
        _super.prototype.destroy.call(this, true);
    };
    return LoginScene;
}(ui.LoginSceneUI));
//# sourceMappingURL=LoginScene.js.map