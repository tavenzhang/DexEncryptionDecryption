var view,__extends=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();!function(t){!function(e){!function(e){var n=function(e){function n(){var t=e.call(this)||this;return t.moneyArr=[100,300,500,1e3,5e3,1e4,2e4,3e4],t.centerX=0,t.centerY=0,t.initView(),t}return __extends(n,e),n.prototype.initView=function(){var e=this;this.contentGroup.vScrollBarSkin="",this.panelHeight=this.contentGroup.height;for(var n,i=this.moneyArr.length,o=0;o<i;o++)(n=new t.dlg.pay.PayMoneyBtn).mouseEnabled=!0,n.value=this.moneyArr[o],n.x=o%4*(n.width+11),n.y=Math.floor(o/4)*(n.height+8),this.btnGroup.addChild(n);this.btnGroup.on(Laya.Event.CLICK,this,this.moneyBtnClick),EventManager.addTouchScaleListener(this.serviceBtn,this,function(){SoundPlayer.clickSound(),GameUtils.jump2module(Common.serviceUrl,"custom")}),EventManager.addTouchScaleListener(this.resetBtn,this,function(){SoundPlayer.clickSound(),e.moneyTxt.text="",e.lastBtn&&(e.lastBtn.setSelect(!1),e.lastBtn=null)}),this.itemBox.on(Laya.Event.CLICK,this,this.itemClick),KeyboardView.bindKeyboard(this.moneyTxt,{caller:this,callback:this.inputEnd})},n.prototype.inputEnd=function(t){(!t||this.lastBtn&&this.lastBtn.value.toString()!=t)&&this.clearLastBtn()},n.prototype.clearLastBtn=function(){this.lastBtn&&(this.lastBtn.setSelect(!1),this.lastBtn=null)},n.prototype.itemClick=function(e){if(e.target instanceof t.dlg.pay.TransferPayItem){SoundPlayer.clickSound();var n=e.target,i=parseFloat(this.moneyTxt.text);if(isNaN(i)||0==i)return void Toast.showToast("请输入充值金额");PayManager.inst.startPay(n.vo,i,!0)}},n.prototype.moneyBtnClick=function(e){if(e.target instanceof t.dlg.pay.PayMoneyBtn){var n=e.target;if(SoundPlayer.clickSound(),n.selected)return;n.setSelect(!0),this.lastBtn&&this.lastBtn.setSelect(!1),this.lastBtn=n,this.moneyTxt.text=n.value.toString()}},n.prototype.readData=function(e,n){var i=this;this.itemBox.numChildren>0&&this.itemBox.destroyChildren();var o;e.forEach(function(e,n){(o=new t.dlg.pay.TransferPayItem).readData(e,n+1),o.mouseEnabled=!0,o.y=n*(o.height+14),i.itemBox.addChild(o)}),this.contentGroup.refresh();this.contentGroup.vScrollBar.value>0&&Laya.Tween.to(this.contentGroup.vScrollBar,{value:0},300)},n.prototype.removeSelf=function(){return this.lastBtn&&this.lastBtn.setSelect(!1),this.moneyTxt.text="",e.prototype.removeSelf.call(this)},n}(ui.dlg.pay.TransferPayViewUI);e.TransferPayView=n}(e.pay||(e.pay={}))}(t.dlg||(t.dlg={}))}(view||(view={}));