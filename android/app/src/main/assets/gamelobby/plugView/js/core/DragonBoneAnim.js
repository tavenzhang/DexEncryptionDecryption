var __extends=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function a(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}(),DragonBoneAnim=function(t){function o(){var o=t.call(this)||this;return o.mFactory=new Laya.Templet,o.mFactory.on(Laya.Event.COMPLETE,o,o.parseComplete),o.mFactory.on(Laya.Event.ERROR,o,o.onError),o}return __extends(o,t),o.prototype.loadInit=function(t,o,r){this.caller=o,this.callback=r,void 0==t.playRate&&(t.playRate=1),void 0==t.autoPlay&&(t.autoPlay=!0),void 0==t.loop&&(t.loop=!0),void 0==t.loopDelay&&(t.loopDelay=0),this._vo=t,this.mFactory.loadAni(t.skUrl)},o.prototype.parseInit=function(t){if(void 0==t.playRate&&(t.playRate=1),void 0==t.autoPlay&&(t.autoPlay=!0),void 0==t.loop&&(t.loop=!0),void 0==t.loopDelay&&(t.loopDelay=0),void 0!=t.pngUrl&&""!=t.pngUrl){this._vo=t;var o=Laya.Loader.getRes(t.pngUrl),r=Laya.Loader.getRes(t.skUrl);o&&r?this.mFactory.parseData(o,r,30):console.error("动画素材需要预加载：",t.pngUrl,t.skUrl)}else console.error("请设置动画png路径")},o.prototype.play=function(){this.mArmature&&this.mArmature.play(0,!1)},o.prototype.stop=function(){this.mArmature&&this.mArmature.stop()},o.prototype.pause=function(){this.mArmature&&this.mArmature.paused()},o.prototype.resume=function(){this.mArmature&&this.mArmature.resume()},o.prototype.parseComplete=function(){this.mArmature=this.mFactory.buildArmature(0),this.mArmature.playbackRate(this._vo.playRate),this.addChild(this.mArmature),this.mArmature.on(Laya.Event.STOPPED,this,this.playEnd),this.play(),this._vo.autoPlay||this.pause(),this.caller&&this.callback&&this.callback.call(this.caller)},o.prototype.playEnd=function(){this._vo.loop&&(this._vo.loopDelay>0?Laya.timer.once(this._vo.loopDelay,this,this.play):this.play())},o.prototype.onError=function(t){console.error("parse-anim-err:",t)},o.prototype.destroy=function(o){this.stop(),this.mFactory&&(this.mFactory.off(Laya.Event.COMPLETE,this,this.parseComplete),this.mFactory.off(Laya.Event.ERROR,this,this.onError),o&&this.mFactory.destroy(),this.mFactory=null),this.mArmature&&(this.mArmature.off(Laya.Event.STOPPED,this,this.playEnd),this.mArmature.destroy(o),this.mArmature=null),t.prototype.destroy.call(this,o)},o}(Laya.Sprite);