var view,__extends=this&&this.__extends||function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function o(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();!function(t){!function(t){var n=function(t){function n(){var n=t.call(this)||this;return n.initView(),n}return __extends(n,t),n.show=function(t,e,o,l){var c=new n;c.message.text=t,c.caller=e,c.callback=o,c.closeCallBack=l,c.popup(!1,!0)},n.prototype.initView=function(){var t=this;EventManager.addTouchScaleListener(this.btnClose,this,function(){SoundPlayer.closeSound(),t.close(null,!0)}),EventManager.addTouchScaleListener(this.btnConfirm,this,function(){SoundPlayer.clickSound(),t.caller&&t.callback&&t.callback.call(t.caller),t.close(null,!0)})},n.prototype.onClosed=function(n){this.caller&&this.closeCallBack&&this.closeCallBack.call(this.caller),EventManager.removeAllEvents(this),t.prototype.onClosed.call(this,n),this.destroy(!0)},n}(ui.dlg.TipsDlgUI);t.TipsDlg=n}(t.dlg||(t.dlg={}))}(view||(view={}));