var __extends=this&&this.__extends||function(){var t=function(i,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var n in i)i.hasOwnProperty(n)&&(t[n]=i[n])})(i,n)};return function(i,n){function a(){this.constructor=i}t(i,n),i.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),LoadingView=function(t){function i(i){var n=t.call(this)||this;return n._alp=i,n.initView(),n}return __extends(i,t),i.show=function(t){void 0===t&&(t=.5),this._inst||(this._inst=new i(t),this._inst.zOrder=Dialog.manager.zOrder+1,this._inst.mouseEnabled=!0,Laya.stage.addChild(this._inst),this.isLoading=!0)},i.hide=function(){this._inst&&(this._inst.destroy(!0),this._inst=null),this.isLoading=!1},i.prototype.initView=function(){this.width=Laya.stage.width,this.height=Laya.stage.height;var t=new Laya.Sprite;t.graphics.drawRect(0,0,Laya.stage.width,Laya.stage.height,"#000000"),t.alpha=0,this.addChildAt(t,0),this.anim=new DragonBoneAnim,this.anim.parseInit({skUrl:"./assets/anim/xiaoLoding.sk",pngUrl:"./assets/anim/xiaoLoding.png"}),this.abox.addChild(this.anim),this.anim.alpha=0,Laya.Tween.to(this.anim,{alpha:1},300,null,null,1200),Laya.timer.once(Common.outTime,this,this.timeOut)},i.prototype.timeOut=function(){console.error("超时异常,关闭loading"),Toast.showToast("网络请求超时,请稍后再试"),i.hide()},i.prototype.destroy=function(i){Laya.Tween.clearTween(this.anim),Laya.timer.clear(this,this.timeOut),this.anim&&(this.anim.destroy(),this.anim=null),t.prototype.destroy.call(this,i)},i}(ui.LoadingViewUI);