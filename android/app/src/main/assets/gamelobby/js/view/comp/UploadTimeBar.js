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
         * 圆形进度条
         */
        var UploadTimeBar = /** @class */ (function (_super) {
            __extends(UploadTimeBar, _super);
            function UploadTimeBar() {
                var _this = _super.call(this) || this;
                _this.start = -90; //起始角度
                _this.end = -90; //结束角度
                _this.cirmask = new Laya.Sprite();
                _this.cirmask.pos(_this.cirBar.width / 2, _this.cirBar.height / 2);
                _this.cirBar.mask = _this.cirmask;
                _this.radius = _this.cirBar.width * 0.6;
                _this.jdTxt.text = "";
                return _this;
            }
            Object.defineProperty(UploadTimeBar.prototype, "progressValue", {
                /**
                 * 设置下载进度值
                 */
                set: function (value) {
                    value = Math.floor(value * 100);
                    this.end = this.start + value * 3.6;
                    this.jdTxt.text = value + "%";
                    if (this.end <= 270) {
                        this.cirmask.graphics.clear();
                        if (this.end == 270)
                            this.end = 269.99; //如果刚好等于270就看不到效果了
                        this.cirmask.graphics.drawPie(0, 0, this.radius, this.start, this.end, "#ff0000");
                    }
                    else {
                        this.jdTxt.text = "100%";
                    }
                },
                enumerable: true,
                configurable: true
            });
            return UploadTimeBar;
        }(ui.comp.UploadTimeBarUI));
        comp.UploadTimeBar = UploadTimeBar;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=UploadTimeBar.js.map