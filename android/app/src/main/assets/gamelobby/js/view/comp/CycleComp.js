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
         * 轮播图模块组
         */
        var CycleComp = /** @class */ (function (_super) {
            __extends(CycleComp, _super);
            function CycleComp() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            CycleComp.prototype.initView = function () {
                this.requestCycelData();
            };
            /**
             * 暂停轮播图滚动
             */
            CycleComp.prototype.pause = function () {
                if (this.cycleView) {
                    this.cycleView.stopTimer();
                }
            };
            /**
             * 请求或刷新轮播图数据
             */
            CycleComp.prototype.requestCycelData = function () {
                HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getCarouselInfo, this, this.initCycelView);
            };
            //轮播图
            CycleComp.prototype.initCycelView = function (suc, data) {
                if (!suc || this.destroyed)
                    return;
                var arr;
                if (data && data.carousels) {
                    var urls = data.carousels;
                    arr = [];
                    urls.forEach(function (value) {
                        arr.push(value);
                    });
                }
                if (!arr || arr.length == 0)
                    return;
                if (!this.cycleView) {
                    this.cycleView = new CyclePageBox(this.width, this.height);
                    this.cycleView.init(arr, 3000);
                    this.addChild(this.cycleView);
                }
                else {
                    this.cycleView.flushData(arr);
                }
            };
            /**
             * 销毁
             */
            CycleComp.prototype.destroy = function () {
                if (this.cycleView)
                    this.cycleView.destroy(true);
                _super.prototype.destroy.call(this, true);
            };
            return CycleComp;
        }(ui.comp.CycleCompUI));
        comp.CycleComp = CycleComp;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=CycleComp.js.map