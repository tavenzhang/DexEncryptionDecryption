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
/**
* name
*/
var view;
(function (view) {
    var anim;
    (function (anim) {
        /**
         * 场景灯光动画
         */
        var LightAnim = /** @class */ (function (_super) {
            __extends(LightAnim, _super);
            function LightAnim() {
                return _super.call(this) || this;
            }
            LightAnim.prototype.initPlay = function (delay) {
                var _this = this;
                if (delay) {
                    this.timerOnce(delay, this, function () {
                        _this.defclip.play();
                    });
                }
                else
                    this.defclip.play();
            };
            LightAnim.prototype.stopAnim = function () {
                this.defclip.stop();
            };
            LightAnim.prototype.destroy = function () {
                this.defclip.stop();
                _super.prototype.destroy.call(this);
            };
            return LightAnim;
        }(ui.anim.lightAnimUI));
        anim.LightAnim = LightAnim;
    })(anim = view.anim || (view.anim = {}));
})(view || (view = {}));
//# sourceMappingURL=LightAnim.js.map