var WebGL=Laya.WebGL,GameMain=function(){function e(){Laya.init(0,750,WebGL),e.inst=this,UIConfig.closeDialogOnSide=!1,Laya.Dialog.manager.closeEffectHandler=new Laya.Handler(null,PageManager.closeDlg),Laya.Dialog.manager.popupEffectHandler=new Laya.Handler(null,PageManager.openDlg),Laya.stage.scaleMode=Laya.Stage.SCALE_FIXED_HEIGHT,Laya.stage.screenMode=Laya.Stage.SCREEN_HORIZONTAL,Laya.stage.bgColor="#000000",window.document.addEventListener("message",this.nativeMess,!1),window.addEventListener("message",this.nativeMess,!1),Common.readUrlArgs(),SoundPlayer.initSoundSetting();Laya.loader.load(["./assets/config.json"],Laya.Handler.create(this,this.preLoadRes))}return e.prototype.preLoadRes=function(){Laya.loader.load(Common.config.list,Laya.Handler.create(this,function(){e.loaded=!0;GameUtils.getQueryVariable("apihome")||view.dlg.RechargeDlg.show()}))},e.prototype.nativeMess=function(a){var n=JSON.parse(a.data);if(n)switch(n.action){case"showRecharge":SoundPlayer.CompatibleSetting(),e.loaded?view.dlg.RechargeDlg.show():console.error("资源未加载完成");break;case"showService":SoundPlayer.CompatibleSetting(),e.loaded?view.dlg.ServiceDlg.show():console.error("资源未加载完成")}},e}();new GameMain;