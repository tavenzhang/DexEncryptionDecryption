var ui,__extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};return function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}(),View=laya.ui.View,Dialog=laya.ui.Dialog;!function(t){var e,i=(__extends(n,e=View),n.prototype.createChildren=function(){View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton),View.regComponent("Text",laya.display.Text),e.prototype.createChildren.call(this),this.createView(t.UpdateViewUI.uiView)},n.uiView={type:"View",props:{width:1334,height:750},child:[{type:"Image",props:{skin:"update/updatabg.jpg",height:750,centerX:0}},{type:"Image",props:{y:721,width:1334,var:"infoBar",skin:"update/img_denglu_banbenhao.png",centerX:0},child:[{type:"Label",props:{y:6,text:"抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活",fontSize:16,color:"#ccffff",centerX:0}}]},{type:"SkeletonPlayer",props:{y:374,x:666,width:1,var:"logoClip",url:"update/loginAnim.sk",height:1}},{type:"Image",props:{y:70,var:"serviceBtn",skin:"update/icon_kf.png",right:28,anchorY:.5,anchorX:.5}},{type:"Image",props:{y:20,x:28,width:398,var:"logo",height:120}},{type:"ProgressBar",props:{y:668,width:1290,var:"progress",skin:"update/jdt.png",centerX:0,sizeGrid:"0,28,0,25"},child:[{type:"Text",props:{y:-35,x:345,width:600,var:"progressTxt",height:28,fontSize:28,color:"#ffffff",align:"center"}}]}]},n);function n(){return e.call(this)||this}t.UpdateViewUI=i}(ui=ui||{});var view;__extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};return function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}();!function(t){var e,i=(e=ui.UpdateViewUI,__extends(n,e),n.prototype.initView=function(){this.setLayout(),this.logoClip.mouseEnabled=!1,this.progressTxt.text="正在检查游戏是否有更新...",this.progress.value=0,this.serviceBtn.on(Laya.Event.CLICK,this,this.serviceClick),this.logo.skin="../brand/login_icon.png",this.serviceBtn.visible=!this.channelOpen},n.prototype.setLayout=function(){this.width=Laya.stage.width,this.infoBar.width=this.width;var t=this.getScreencOffset(28,78);this.logo.x=t,this.serviceBtn.right=t,this.logoClip.x=this.width>>1,this.serviceBtn.visible=!this.channelOpen},n.prototype.serviceClick=function(){window.top.postMessage(JSON.stringify({action:"game_custom"}),"*")},n.prototype.showLoading=function(t){if("loading"==t.do){var e=100*t.percent;this.progressTxt.text="正在下载更新内容"+e.toFixed(0)+"%",this.progress.value=t.percent}else"loadFinish"==t.do&&(this.progressTxt.text="资源加载准备中...",this.progress.value=0)},n.prototype.getScreencOffset=function(t,e){var i=Laya.stage.width/Laya.stage.height,n=1.778666,o=2.165333;return i<=n?t:o<=i?e:(i-n)*(e-t)/(o-n)+t},Object.defineProperty(n.prototype,"channelOpen",{get:function(){return isAndroidHack},enumerable:!0,configurable:!0}),n);function n(){var t=e.call(this)||this;return t.initView(),t}t.UpdateView=i}(view=view||{});var Tools=function(){function t(){}return t.getQueryVariable=function(t){for(var e=window.location.search.substring(1).split("&"),i=0;i<e.length;i++){var n=e[i].split("=");if(decodeURIComponent(n[0])==t)return decodeURIComponent(n[1])}},t}();