var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var LayaMain = /** @class */ (function () {
    function LayaMain() {
        this.sceneLobby = null;
        LayaMain.obj = this;
        //提前获取app给的急需参数
        Debug.isapp = Tools.getQueryVariable("app") == "true";
        var isDebug = Tools.getQueryVariable("isDebug") == "true";
        if (isDebug)
            Debug.showVconsole();
        Laya.init(0, Common.GM_SCREEN_H, Laya.WebGL);
        if (!GameUtils.isNativeApp) {
            // Laya.Stat.show(0, 0);
        }
        //设置点击弹框背景后不关闭弹窗
        UIConfig.closeDialogOnSide = false;
        //自定义弹出关闭效果
        Laya.Dialog.manager.closeEffectHandler = new Laya.Handler(null, PageManager.closeDlg);
        Laya.Dialog.manager.popupEffectHandler = new Laya.Handler(null, PageManager.openDlg);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.bgColor = "#000000";
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        window.document.addEventListener("message", this.handleIFrameAction, false);
        window.addEventListener("message", this.handleIFrameAction, false);
        this.root_node = new Laya.Sprite();
        Laya.stage.addChild(this.root_node);
        //Sound
        SoundPlayer.initSoundSetting();
        //用于清理缓存
        var flag = SaveManager.getObj().get("clearFlag", null);
        if (!flag) {
            SaveManager.getObj().clearAll();
            SaveManager.getObj().save("clearFlag", "926");
        }
        //UI
        PageManager.showPage([
            "res/atlas/ui/login.atlas",
            "./assets/conf/assets_lobby.json",
            "./assets/conf/gameIcons.json",
            "./assets/conf/version.json"
        ], LoginScene);
    }
    LayaMain.getInstance = function () {
        return LayaMain.obj;
    };
    LayaMain.prototype.onResize = function (e) {
        ToolsApp.initAppData();
        if (AppData.IS_NATIVE_APP) {
            //设置Laya提供的worker.js路径
            Laya.WorkerLoader.workerPath = "libs/worker.js";
            //开启worker线程
            Laya.WorkerLoader.enable = true;
            if (AppData.NATIVE_DATA && AppData.NATIVE_DATA.isNewApp) {
                window.document.removeEventListener("message", this.handleIFrameAction, false);
            }
            else {
                window.removeEventListener("message", this.handleIFrameAction, false);
            }
        }
        PostMHelp.game_common({ name: "onGameInit" });
    };
    LayaMain.prototype.getRootNode = function () {
        return this.root_node;
    };
    LayaMain.prototype.handleAction = function (e) {
        try {
            var obj = JSON.parse(e.data);
            Debug.log("handleAction:", obj, obj.action, e);
            switch (obj.action) {
                case "lobbyResume":
                    lamain.onGameResume();
                    break;
                default:
                    break;
            }
        }
        catch (e) { }
    };
    /**
     * 退出到登录界面
     */
    LayaMain.prototype.loginOut = function () {
        PostMHelp.game_common({ name: "loginout" });
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        Common.resetData();
        this.clearChild();
        PageManager.showPage(null, LoginScene);
    };
    LayaMain.prototype.onGamePause = function () {
        SoundPlayer.StopAllSounds();
        //初始化当前音频设置
        SoundPlayer.initSoundSetting();
    };
    LayaMain.prototype.onGameResume = function () {
        //兼容最新的音频设置
        SoundPlayer.CompatibleSetting();
        //刷新用户信息
        EventManager.dispath(EventType.FLUSH_USERINFO);
    };
    LayaMain.prototype.handleIFrameAction = function (e) {
        var data = e.data;
        LayaMain.getInstance().onAppPostMessgae(data);
    };
    LayaMain.prototype.onAppPostMessgae = function (data) {
        var message = null;
        try {
            message = JSON.parse(data);
        }
        catch (e) {
            Debug.error("onAppPostMessgae-err:", e);
        }
        if (message && message.action) {
            switch (message.action) {
                case "wxLogin": //微信登录
                    if (LoginModel.weChatCertificationType == 0) {
                        EventManager.dispath(EventType.WeChatLogin, message); //广播微信登录
                    }
                    else if (LoginModel.weChatCertificationType == 1) {
                        EventManager.dispath(EventType.WeChatBind, message); //广播微信绑定
                    }
                    break;
                case "logout": //退出到登录界面(同一账号登录两台设备时会触发401)
                    LayaMain.onQuit();
                    break;
                case "playMusic":
                    lamain.onGameResume();
                    break;
                case "stopMusic":
                    Laya.SoundManager.stopAll();
                    break;
                case "windowResize":
                    this.onResize("window-resize");
                    break;
                case "appData":
                    for (var key in message) {
                        if (AppData[key] != null) {
                            Debug.log("appData->key=", key, (AppData[key] == null), message[key]);
                            AppData[key] = message[key];
                        }
                    }
                    break;
                case "http":
                    for (var _i = 0, _a = HttpRequester.httpRequestList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && (item.hashUrl == message.hashUrl)) {
                            var index = HttpRequester.httpRequestList.indexOf(item);
                            HttpRequester.httpRequestList.splice(index, 1);
                            GameUtils.clearTimeout(item.hashUrl);
                            // Debug.log("onAppPostMessgae---HttpRequester.histRequestList=splite=" + HttpRequester.httpRequestList.length, message);
                            var retStr = "";
                            if (message.rs) {
                                retStr = message.content;
                                item.callback.apply(item.caller, [retStr, 'complete', { http: __assign({}, message, { response: retStr }) }]);
                            }
                            else {
                                retStr = JSON.stringify(message);
                                item.callback.apply(item.caller, [message.message, 'error', { http: __assign({}, message, { response: retStr }) }]);
                            }
                        }
                    }
                    break;
                case "flushMoney":
                    if (LobbyModel.inLobby) {
                        LobbyModel.refreshMoney();
                    }
                    break;
                case "openDebug":
                    Debug.showVconsole();
                    break;
                case "gamesinfo": //游戏状态信息
                    UpdateMsgHandle.onInitMsg(message.data);
                    break;
                case "updateProgress": //游戏下载进度更新
                    UpdateMsgHandle.onUpdateMsg(message.data);
                    break;
                case "setrawroot":
                    UpdateMsgHandle.setRawRoot(message.data);
                    break;
                case "playsound":
                    UpdateMsgHandle.playSound(message.data);
                    break;
                case "playmusic":
                    UpdateMsgHandle.playMusic(message.data);
                    break;
                case "onBlur": //失去焦点
                    //派发失去焦点事件
                    EventManager.dispath(EventType.BLUR_NATIVE);
                    Laya.timer.once(300, this, function () {
                        Laya.stage.event(Laya.Event.MOUSE_DOWN);
                    });
                    break;
                case "deviceInfo":
                    MyUid.setUid(message.data);
                    break;
                case "lobbyResume": //从游戏返回到大厅
                    GameData.joinLobbyType = JoinLobbyType.gameBank;
                    LobbyModel.inLobby = true;
                    lamain.onGameResume();
                    EventManager.dispath(EventType.GAMETOHALL);
                    break;
                case "enterGame": { //进入游戏
                    LobbyModel.inLobby = false;
                    EventManager.dispath(EventType.HALLTOGAME);
                    break;
                }
                case "showLoading": { //显示/隐藏loading
                    var alp = message.alpha || 0;
                    this.showCircleLoading(Boolean(message.data), alp);
                    break;
                }
                case "showMask": { //显示或隐藏背景遮罩
                    var bl = Boolean(message.data);
                    if (bl) {
                        if (!this.maskbg) {
                            this.maskbg = new Laya.Sprite();
                            this.maskbg.mouseEnabled = true;
                            this.maskbg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                            this.maskbg.alpha = 0.6;
                            this.maskbg.size(Laya.stage.width, Laya.stage.height);
                            this.maskbg.zOrder = Dialog.manager.zOrder + 1;
                        }
                        Laya.stage.addChild(this.maskbg);
                    }
                    else {
                        if (this.maskbg)
                            this.maskbg.removeSelf();
                    }
                    break;
                }
                case "lifecycle": { //前后台切换通知(1-后台到前台，0-前台到后台)
                    if (message.data == 1) {
                        GameData.joinLobbyType = JoinLobbyType.backstage;
                    }
                    EventManager.dispath(EventType.LIFE_CYCLE, message.data);
                    break;
                }
                case "openBindCard": { //打开绑定银行卡界面
                    PageManager.showDlg(DlgCmd.accountInfo);
                    break;
                }
                case "shareSucess": {
                    view.dlg.NoticeDlg.shareSucess(message.data);
                    break;
                }
                case "openBindAlipay": { //打开支付宝绑定界面
                    PageManager.showDlg(DlgCmd.alipayBind);
                    break;
                }
                case "saveImage": { //保存图片的结果
                    var bl = message.data;
                    Toast.showToast(bl ? "保存成功" : "保存失败");
                    break;
                }
                case "affcode": {
                    console.log("收到App刷新 affcode 消息 affCode = " + message.data);
                    AppData.NATIVE_DATA.affCode = message.data;
                    console.log("AppData.NATIVE_DATA.affCode =" + AppData.NATIVE_DATA.affCode);
                    break;
                }
                case "popTip": {
                    console.log("收到App刷新 popTip 消息 msg = " + message.data);
                    Toast.showToast(message.data);
                    break;
                }
                case "appNativeData": {
                    AppData.NATIVE_DATA = message.data;
                    break;
                }
            }
        }
    };
    LayaMain.prototype.clearChild = function () {
        Dialog.manager.closeAll();
        if (this.sceneLobby) {
            this.sceneLobby.destroy(true);
            this.sceneLobby = null;
        }
        this.root_node.destroyChildren();
        PageManager.destoryCurrentView();
    };
    LayaMain.prototype.initLogin = function () {
        this.loginOut();
    };
    LayaMain.prototype.initLobby = function () {
        this.clearChild();
        if (this.sceneLobby == null) {
            this.sceneLobby = new LobbyScene();
            this.sceneLobby.onLoaded();
            LayaMain.getInstance().getRootNode().addChild(this.sceneLobby);
        }
    };
    /**
     * 显示loading
     * @param b
     * @param bgAlpha 背景透明度
     */
    LayaMain.prototype.showCircleLoading = function (b, bgAlpha) {
        if (b === void 0) { b = true; }
        if (bgAlpha === void 0) { bgAlpha = 0.5; }
        if (b)
            view.LoadingView.show(bgAlpha);
        else
            view.LoadingView.hide();
    };
    LayaMain.onQuit = function () {
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        LayaMain.getInstance().initLogin();
    };
    LayaMain.obj = null;
    return LayaMain;
}());
var AppData = window["sAppData"];
window['loadJsOver']();
var lamain = new LayaMain();
if (AppData.IS_NATIVE_APP) {
    window.top["receivedMessageFromRN"] = lamain.onAppPostMessgae;
}
//# sourceMappingURL=LayaMain.js.map