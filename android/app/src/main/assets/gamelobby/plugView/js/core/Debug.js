var Debug=function(){function t(){}return Object.defineProperty(t,"httpDebug",{get:function(){return this._httDebug},set:function(t){this._httDebug=t,t&&this.showVconsole()},enumerable:!0,configurable:!0}),t.showVconsole=function(){this.inited||(this.isapp&&window.initVconsole(),this.inited=!0)},t.log=function(t){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];!this.inited&&this.isapp||console.log.apply(console,[t].concat(n))},t.error=function(t){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];!this.inited&&this.isapp||console.error.apply(console,[t].concat(n))},t.isapp=!0,t._httDebug=!1,t.inited=!1,t}();