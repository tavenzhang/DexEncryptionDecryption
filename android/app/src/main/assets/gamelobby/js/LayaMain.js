"use strict"; var __assign = function () { return __assign = Object.assign || function (a) { for (var e, t = 1, o = arguments.length; t < o; t++) { e = arguments[t]; for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (a[n] = e[n]) } return a }, __assign.apply(this, arguments) }, LayaMain = function () { function a() { this.sceneLobby = null, a.obj = this, Debug.isapp = "true" == Tools.getQueryVariable("app"), "true" == Tools.getQueryVariable("isDebug") && Debug.showVconsole(), Laya.init(0, Common.GM_SCREEN_H, Laya.WebGL), GameUtils.isNativeApp, UIConfig.closeDialogOnSide = !1, Laya.Dialog.manager.closeEffectHandler = new Laya.Handler(null, PageManager.closeDlg), Laya.Dialog.manager.popupEffectHandler = new Laya.Handler(null, PageManager.openDlg), Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT, Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL, Laya.stage.bgColor = "#000000", Laya.stage.on(Laya.Event.RESIZE, this, this.onResize), window.document.addEventListener("message", this.handleIFrameAction, !1), window.addEventListener("message", this.handleIFrameAction, !1), this.root_node = new Laya.Sprite, Laya.stage.addChild(this.root_node), SoundPlayer.initSoundSetting(), SaveManager.getObj().get("clearFlag", null) || (SaveManager.getObj().clearAll(), SaveManager.getObj().save("clearFlag", "926")), PageManager.showPage(["res/atlas/ui/login.atlas", "./assets/conf/assets_lobby.json", "./assets/conf/gameIcons.json", "./assets/conf/version.json"], LoginScene) } return a.getInstance = function () { return a.obj }, a.prototype.onResize = function (a) { ToolsApp.initAppData(), AppData.IS_NATIVE_APP && (Laya.WorkerLoader.workerPath = "libs/worker.js", Laya.WorkerLoader.enable = !0, AppData.NATIVE_DATA && AppData.NATIVE_DATA.isNewApp ? window.document.removeEventListener("message", this.handleIFrameAction, !1) : window.removeEventListener("message", this.handleIFrameAction, !1)), PostMHelp.game_common({ name: "onGameInit" }) }, a.prototype.getRootNode = function () { return this.root_node }, a.prototype.handleAction = function (a) { try { var e = JSON.parse(a.data); switch (Debug.log("handleAction:", e, e.action, a), e.action) { case "lobbyResume": lamain.onGameResume() } } catch (a) { } }, a.prototype.loginOut = function () { PostMHelp.game_common({ name: "loginout" }), SaveManager.getObj().save(SaveManager.KEY_TOKEN, ""), Common.resetData(), this.clearChild(), PageManager.showPage(null, LoginScene) }, a.prototype.onGamePause = function () { SoundPlayer.StopAllSounds(), SoundPlayer.initSoundSetting() }, a.prototype.onGameResume = function () { SoundPlayer.CompatibleSetting(), EventManager.dispath(EventType.FLUSH_USERINFO) }, a.prototype.handleIFrameAction = function (e) { var t = e.data; a.getInstance().onAppPostMessgae(t) }, a.prototype.onAppPostMessgae = function (e) { var t = null; try { t = JSON.parse(e) } catch (a) { Debug.error("onAppPostMessgae-err:", a) } if (t && t.action) switch (t.action) { case "wxLogin": 0 == LoginModel.weChatCertificationType ? EventManager.dispath(EventType.WeChatLogin, t) : 1 == LoginModel.weChatCertificationType && EventManager.dispath(EventType.WeChatBind, t); break; case "logout": a.onQuit(); break; case "playMusic": lamain.onGameResume(); break; case "stopMusic": Laya.SoundManager.stopAll(); break; case "windowResize": this.onResize("window-resize"); break; case "appData": for (var o in t) null != AppData[o] && (Debug.log("appData->key=", o, null == AppData[o], t[o]), AppData[o] = t[o]); break; case "http": for (var n = 0, s = HttpRequester.httpRequestList; n < s.length; n++) { var i = s[n]; if (i && i.hashUrl == t.hashUrl) { var r = HttpRequester.httpRequestList.indexOf(i); HttpRequester.httpRequestList.splice(r, 1), GameUtils.clearTimeout(i.hashUrl); var l = ""; t.rs ? (l = t.content, i.callback.apply(i.caller, [l, "complete", { http: __assign(__assign({}, t), { response: l }) }])) : (l = JSON.stringify(t), i.callback.apply(i.caller, [t.message, "error", { http: __assign(__assign({}, t), { response: l }) }])) } } break; case "flushMoney": LobbyModel.inLobby && LobbyModel.refreshMoney(); break; case "openDebug": Debug.showVconsole(); break; case "gamesinfo": UpdateMsgHandle.onInitMsg(t.data); break; case "updateProgress": UpdateMsgHandle.onUpdateMsg(t.data); break; case "setrawroot": UpdateMsgHandle.setRawRoot(t.data); break; case "playsound": UpdateMsgHandle.playSound(t.data); break; case "playmusic": UpdateMsgHandle.playMusic(t.data); break; case "onBlur": EventManager.dispath(EventType.BLUR_NATIVE), Laya.timer.once(300, this, function () { Laya.stage.event(Laya.Event.MOUSE_DOWN) }); break; case "deviceInfo": MyUid.setUid(t.data); break; case "lobbyResume": GameData.joinLobbyType = JoinLobbyType.gameBank, LobbyModel.inLobby = !0, lamain.onGameResume(), EventManager.dispath(EventType.GAMETOHALL); break; case "enterGame": LobbyModel.inLobby = !1, EventManager.dispath(EventType.HALLTOGAME); break; case "showLoading": var p = t.alpha || 0; this.showCircleLoading(Boolean(t.data), p); break; case "showMask": var g = Boolean(t.data); g ? (this.maskbg || (this.maskbg = new Laya.Sprite, this.maskbg.mouseEnabled = !0, this.maskbg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"), this.maskbg.alpha = .6, this.maskbg.size(Laya.stage.width, Laya.stage.height), this.maskbg.zOrder = Dialog.manager.zOrder + 1), Laya.stage.addChild(this.maskbg)) : this.maskbg && this.maskbg.removeSelf(); break; case "lifecycle": 1 == t.data && (GameData.joinLobbyType = JoinLobbyType.backstage), EventManager.dispath(EventType.LIFE_CYCLE, t.data); break; case "openBindCard": PageManager.showDlg(DlgCmd.accountInfo); break; case "shareSucess": view.dlg.SharedailyDlg.shareSucess(t.data); break; case "openBindAlipay": PageManager.showDlg(DlgCmd.alipayBind); break; case "saveImage": var g = t.data; Toast.showToast(g ? "保存成功" : "保存失败"); break; case "affcode": console.log("收到App刷新 affcode 消息 affCode = " + t.data), AppData.NATIVE_DATA.affCode = t.data, console.log("AppData.NATIVE_DATA.affCode =" + AppData.NATIVE_DATA.affCode); break; case "popTip": console.log("收到App刷新 popTip 消息 msg = " + t.data), Toast.showToast(t.data); break; case "appNativeData": AppData.NATIVE_DATA = t.data; break; case "appUpate": Common.isUpate = Boolean(t.data) } }, a.prototype.clearChild = function () { Dialog.manager.closeAll(), this.sceneLobby && (this.sceneLobby.destroy(!0), this.sceneLobby = null), this.root_node.destroyChildren(), PageManager.destoryCurrentView() }, a.prototype.initLogin = function () { this.loginOut() }, a.prototype.initLobby = function () { this.clearChild(), null == this.sceneLobby && (this.sceneLobby = new LobbyScene, this.sceneLobby.onLoaded(), a.getInstance().getRootNode().addChild(this.sceneLobby)) }, a.prototype.showCircleLoading = function (a, e) { void 0 === a && (a = !0), void 0 === e && (e = .5), a ? view.LoadingView.show(e) : view.LoadingView.hide() }, a.onQuit = function () { SaveManager.getObj().save(SaveManager.KEY_TOKEN, ""), a.getInstance().initLogin() }, a.obj = null, a }(), AppData = window.sAppData; window.loadJsOver(); var lamain = new LayaMain; AppData.IS_NATIVE_APP && (window.top.receivedMessageFromRN = lamain.onAppPostMessgae);