var PlugMark;!function(e){e[e.showRecharge=0]="showRecharge",e[e.showService=1]="showService"}(PlugMark||(PlugMark={}));var Common=function(){function e(){}return Object.defineProperty(e,"config",{get:function(){return this.conf||(this.conf=Laya.Loader.getRes("./assets/config.json")),this.conf},enumerable:!0,configurable:!0}),Object.defineProperty(e,"httpCmd",{get:function(){return this.config.cmd},enumerable:!0,configurable:!0}),e.readUrlArgs=function(){var e=GameUtils.getQueryVariable("apihome"),t=GameUtils.getQueryVariable("token"),i=GameUtils.getQueryVariable("clientId"),a=GameUtils.getQueryVariable("service");"true"==GameUtils.getQueryVariable("debug")&&Debug.showVconsole(),e&&(this.apihome=e),t&&(this.access_token=t),i&&(this.clientId=i),a&&(this.serviceUrl=a)},e.apihome="http://sqp01game.sit03.com/api/v1",e.access_token="c56f4b2b-e3f2-4f1b-a434-fe9f849036d7",e.clientId="1209",e.serviceUrl="https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1",e.isNativeApp=!0,e.outTime=8e3,e.otherCount=0,e}();