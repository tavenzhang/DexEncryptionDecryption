var view,__extends=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();!function(t){!function(e){!function(e){var n=function(n){function o(){var t=n.call(this)||this;return t.gap=0,t.btnArr=[],t.maxNum=8,t.centerX=0,t.centerY=0,t.initView(),t}return __extends(o,n),o.prototype.initView=function(){var t=this;this.itemPanel.hScrollBarSkin="",this.itemPanel.on(Laya.Event.CLICK,this,this.clickItem),EventManager.addTouchScaleListener(this.resetBtn,this,function(){SoundPlayer.clickSound(),t.moneyTxt.text="",t.clearLastBtn()}),EventManager.addTouchScaleListener(this.submitBtn,this,function(){SoundPlayer.clickSound();var e=parseFloat(t.moneyTxt.text);if(isNaN(e)||0==e)Toast.showToast("请输入充值金额");else{var n=t.prev.vo;n.platform?PayModel.getOnlineBankList(n.platform,t,function(o,i){Debug.log("网银支付类型：",o,i),o&&i&&i.length>0&&(n.webBankList=i),t.doSubmit(n,e)}):t.doSubmit(n,e)}}),KeyboardView.bindKeyboard(this.moneyTxt,{caller:this,callback:this.inputEnd})},o.prototype.inputEnd=function(t){(!t||this.prevBtn&&this.prevBtn.value.toString()!=t)&&this.clearLastBtn()},o.prototype.clearLastBtn=function(){this.prevBtn&&(this.prevBtn.setSelect(!1),this.prevBtn=null)},o.prototype.doSubmit=function(t,e){var n=Boolean(t.combineVo);PayManager.inst.startPay(n?t.combineVo:t,e,n)},o.prototype.clickItem=function(e){if(e.target instanceof t.dlg.pay.FixedMoneyItem){SoundPlayer.clickSound();var n=e.target;this.selectItem(n)}},o.prototype.selectItem=function(t){if(!t.selected){t.selected=!0,this.prev&&(this.prev.selected=!1),this.prev=t;var e=t.vo;e.combineVo?(this.creatMoneyBtn(e.combineVo.recommendedAmounts),this.infoTxt.text=e.combineVo.remarks||"---"):(this.creatMoneyBtn(e.recommendedAmounts),this.infoTxt.text=e.remarks||"---")}},o.prototype.creatMoneyBtn=function(t){var n=this;if(this.recoverBtn(),t&&0!=t.length){var o;t.forEach(function(t,i){i<n.maxNum&&((o=Laya.Pool.getItem(PayModel.btnMark))||(o=new e.PayMoneyBtn),o.value=t,o.mouseEnabled=!0,o.x=i%4*(o.width+11),o.y=Math.floor(i/4)*(o.height+8),n.btnBox.addChild(o),n.btnArr.push(o),EventManager.addTouchScaleListener(o,n,n.btnClick,o,.6,!0))})}else console.error("没有配置常用金额数据")},o.prototype.recoverBtn=function(){this.prevBtn&&(this.prevBtn=null),this.moneyTxt.text="",this.btnArr.forEach(function(t){t.removeSelf(),Laya.Pool.recover(PayModel.btnMark,t)}),this.btnArr.length=0},o.prototype.btnClick=function(t,e){SoundPlayer.clickSound(),e.selected||(e.setSelect(!0),this.prevBtn&&this.prevBtn.setSelect(!1),this.prevBtn=e,this.moneyTxt.text=e.value.toString())},o.prototype.readData=function(e){var n=this;this.itemPanel.numChildren>0&&(this.itemPanel.destroyChildren(),this.itemPanel.refresh(),this.prev=null),this.recoverBtn();var o;e.forEach(function(e,i){(o=new t.dlg.pay.FixedMoneyItem).mouseEnabled=!0,o.readData(e),o.x=i*(o.width+n.gap),n.itemPanel.addChild(o),0==i&&n.selectItem(o)})},o.prototype.destroy=function(){this.recoverBtn(),n.prototype.destroy.call(this,!0)},o}(ui.dlg.pay.OtherPayViewUI);e.OtherPayView=n}(e.pay||(e.pay={}))}(t.dlg||(t.dlg={}))}(view||(view={}));