var view,__extends=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();!function(t){!function(t){!function(t){var e=function(t){function e(){var e=t.call(this)||this;return e.stateColor=["#fff600","#0dfd2f","#ff1b1b"],e}return __extends(e,t),e.prototype.readData=function(t){var e=this;this.stateTxt.text=t.stateChineseDisplay;var o;switch(t.state){case"COMPLETED":o=this.stateColor[1];break;case"FAILED":o=this.stateColor[2];break;default:o=this.stateColor[0]}this.stateTxt.color=o,this.payMethodTxt.text=t.subTypeChineseDisplay,this.orderTxt.text=t.transactionId,this.timeTxt.text=t.createTime,this.payMoneyTxt.text=t.amount+"元",this.totalTxt.text=t.effectiveAmount+"元",this.saleTxt.text=t.effectiveAmount-t.amount+"元",this.addev||(EventManager.addTouchScaleListener(this.copyBtn,this,function(){SoundPlayer.clickSound(),PostMHelp.game_common({do:"copylink",param:e.orderTxt.text,hint:"复制成功"})}),this.addev=!1)},e.prototype.destroy=function(){EventManager.removeBtnEvent(this.copyBtn),t.prototype.destroy.call(this,!0)},e}(ui.dlg.pay.HistoryItemUI);t.HistoryItem=e}(t.pay||(t.pay={}))}(t.dlg||(t.dlg={}))}(view||(view={}));