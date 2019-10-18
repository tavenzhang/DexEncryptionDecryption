var view,__extends=this&&this.__extends||function(){var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])})(t,i)};return function(t,i){function a(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}}();!function(e){!function(e){var t=function(e){function t(){var t=e.call(this)||this;return t.viewMap={},t.initView(),t}return __extends(t,e),t.show=function(){var e=new t;e.width=Laya.stage.width,e.popup(!1,!0)},t.prototype.initView=function(){this.LTgroup.left=GameUtils.getScreencOffset(-48,0),this.TRgroup.right=GameUtils.getScreencOffset(-55,0),this.tabGroup.left=GameUtils.getScreencOffset(-48,0),this.errIcon.visible=!1,this.infoGroup.visible=!1,this.viewMap[ThreeType.vip]=new view.dlg.pay.VipPayView,this.viewMap[ThreeType.fixedMoney]=new view.dlg.pay.FixedMoneyView,this.viewMap[ThreeType.bankTransfer]=new view.dlg.pay.TransferPayView,this.viewMap[ThreeType.otherTransfer]=new view.dlg.pay.OtherPayView,this.viewMap[ThreeType.wechatPublic]=new view.dlg.pay.WeChatPublicView,this.arrowBtn.visible=!1,this.tabPanel.vScrollBarSkin="",PayManager.inst.init(this.viewBox),PayModel.getPayList(this,this.showPayList),PayModel.getCurrentInfo(),this.initEvents()},t.prototype.showPayList=function(){var e,t,i=this,a=PayModel.payList||[];a.forEach(function(a,n){(e=new view.dlg.pay.PayTabItem).readData(a),e.y=n*(e.height-5),i.tabPanel.addChild(e),0==n&&(t=e)}),this.arrowBtn.visible=a.length>6,PayModel.getBanktransfers(parseInt(Common.clientId),this,function(){t&&i.itemClick(t)})},t.prototype.initEvents=function(){var e=this;EventManager.addTouchScaleListener(this.backBtn,this,function(){SoundPlayer.returnLobbySound(),e.close(null,!0)}),EventManager.addTouchScaleListener(this.payBtn,this,function(){SoundPlayer.enterPanelSound(),view.dlg.pay.PayHistoryDlg.show()}),EventManager.addTouchScaleListener(this.serviceBtn,this,function(){SoundPlayer.enterPanelSound(),GameUtils.jump2module(Common.serviceUrl,"custom")}),EventManager.addTouchScaleListener(this.arrowBtn,this,function(){SoundPlayer.clickSound();var t=e.tabPanel.vScrollBar.value+e.tabPanel.height/2;Laya.Tween.to(e.tabPanel.vScrollBar,{value:t},300,Laya.Ease.cubicOut,Laya.Handler.create(e,function(){e.moveEnd()}))}),this.tabPanel.vScrollBar.on(Laya.Event.END,this,this.moveEnd),this.tabPanel.on(Laya.Event.CLICK,this,this.tabItemHandler)},t.prototype.tabItemHandler=function(e){if(e.target instanceof view.dlg.pay.PayTabItem){SoundPlayer.enterPanelSound();var t=e.target;this.itemClick(t)}},t.prototype.itemClick=function(e){if(this.prevTab!=e){e.active(),this.prevTab&&this.prevTab!=e&&this.prevTab.deactive(),this.prevTab=e;var t=e.vo;if(PayModel.payType=PayType[t.code],t.code==PayType[PayType.BANK]?this.showPayInfo(PayModel.bankSubList):PayModel.getPayment(t.code,this,this.showPayInfo),t.promotionTips){var i=t.promotionTips;i.length>30&&(i=i.substr(0,30)+"..."),this.infoGroup.visible=!0,this.infoTxt.text=i,this.infoGroup.width=this.infoTxt.x+this.infoTxt.textWidth+98}else this.infoGroup.visible=!1}},t.prototype.showPayInfo=function(e){e||(e=[]);var t=PayModel.checkType(this.prevTab.vo.code);this.prevViewType!=t&&PayManager.inst.clearLastView(),PayManager.inst.clearOther();var i=this.viewMap[t];i&&e.length>0?(Debug.log("typeData:",e),i.visible=!0,i.readData(e,this.prevTab.vo.promotionTips),i.parent||this.viewBox.addChildAt(i,0),PayManager.inst.lastView=i):PayManager.inst.hideLastView(),this.prevViewType=t,this.errIcon.visible=Boolean(0==e.length)},t.prototype.moveEnd=function(){if(!this.destroyed){var e=this.tabPanel.contentHeight-this.tabPanel.height,t=Boolean(this.tabPanel.vScrollBar.value>=e);this.arrowBtn.visible=!t}},t.prototype.onClosed=function(t){Laya.Tween.clearTween(this.tabPanel.vScrollBar),PayManager.inst.reset(),PayModel.clear(),this.tabPanel.destroyChildren(),EventManager.removeAllEvents(this),e.prototype.onClosed.call(this,t),this.destroy(!0)},t}(ui.dlg.RechargeDlgUI);e.RechargeDlg=t}(e.dlg||(e.dlg={}))}(view||(view={}));