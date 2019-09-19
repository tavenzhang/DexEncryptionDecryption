var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var comp;
    (function (comp) {
        /**
         * 滚动消息
         */
        var NoticeComp = /** @class */ (function (_super) {
            __extends(NoticeComp, _super);
            function NoticeComp() {
                var _this = _super.call(this) || this;
                _this.gapTime = 10000; //请求时间间隔
                _this.msgList = []; //消息列表
                _this.initView();
                return _this;
            }
            NoticeComp.prototype.initView = function () {
                this.msgTxt.text = "";
                this.msgTxt.x = this.msgSp.width;
                this.msgSp.scrollRect = new Laya.Rectangle(0, 0, this.msgSp.width, this.msgSp.height);
                this.requestRollInfo();
            };
            //开始请求消息
            NoticeComp.prototype.requestRollInfo = function () {
                var _this = this;
                var msgUrl = ConfObjRead.apihome + ConfObjRead.httpCmd.noticelist;
                msgUrl += "?pageSize=20&start=0&access_token=" + Common.access_token;
                HttpRequester.doRequest(msgUrl, null, null, this, function (suc, jobj) {
                    if (suc) {
                        if (jobj.datas && jobj.datas.length > 0) {
                            _this.addMsgItems(jobj.datas);
                            _this.stopRequestTimer();
                        }
                        else {
                            _this.startRequestTimer();
                        }
                    }
                    else {
                        _this.startRequestTimer();
                    }
                }, "get");
            };
            //添加消息队列
            NoticeComp.prototype.addMsgItems = function (list) {
                var _this = this;
                list.forEach(function (value) {
                    if (value.notice)
                        _this.msgList.push(value.notice);
                });
                if (this.msgList.length > 0) {
                    this.msgTxt.text = this.msgList.shift();
                    this.msgTxt.x = this.msgSp.width;
                    this.startRollingTimer();
                }
            };
            //启动数据请求计时器
            NoticeComp.prototype.startRequestTimer = function () {
                if (this.runTimerReq)
                    return;
                Laya.timer.once(10000, this, this.requestRollInfo);
                this.runTimerReq = true;
            };
            NoticeComp.prototype.stopRequestTimer = function () {
                if (this.runTimerReq) {
                    Laya.timer.clear(this, this.requestRollInfo);
                    this.runTimerReq = false;
                }
            };
            //启动消息滚动计时器
            NoticeComp.prototype.startRollingTimer = function () {
                if (this.runTimerRoll)
                    return;
                Laya.timer.frameLoop(1, this, this.doRoll);
                this.runTimerRoll = true;
            };
            NoticeComp.prototype.stopRollingTimer = function () {
                if (this.runTimerRoll) {
                    Laya.timer.clear(this, this.doRoll);
                    this.runTimerRoll = false;
                }
            };
            NoticeComp.prototype.doRoll = function () {
                this.msgTxt.x--;
                if (this.msgTxt.x <= -this.msgTxt.textWidth) {
                    if (this.msgList.length > 0) {
                        this.msgTxt.text = this.msgList.shift();
                        this.msgTxt.x = this.msgSp.width;
                    }
                    else {
                        this.startRequestTimer();
                        this.stopRollingTimer();
                    }
                }
            };
            /**
             * 销毁
             */
            NoticeComp.prototype.destroy = function () {
                this.stopRequestTimer();
                this.stopRollingTimer();
                _super.prototype.destroy.call(this, true);
            };
            return NoticeComp;
        }(ui.comp.NoticeCompUI));
        comp.NoticeComp = NoticeComp;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=NoticeComp.js.map