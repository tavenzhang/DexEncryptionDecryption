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
         * toast提示ui
         */
        var ToastView = /** @class */ (function (_super) {
            __extends(ToastView, _super);
            function ToastView() {
                var _this = _super.call(this) || this;
                _this.delayTime = 2600; //延迟删除时间
                return _this;
            }
            /**
             * 读取信息
             * @param value
             */
            ToastView.prototype.readInfo = function (value) {
                this.msgTxt.text = value;
                this.x = Laya.stage.width - this.width >> 1;
                this.y = Laya.stage.height / 2 + this.height;
                this.alpha = 0;
                Laya.Tween.to(this, { alpha: 1, y: Laya.stage.height - this.height >> 1 }, 300, Laya.Ease.cubicOut, Laya.Handler.create(this, this.delayClear));
            };
            ToastView.prototype.delayClear = function () {
                var _this = this;
                Laya.timer.once(this.delayTime, this, function () {
                    var id = Toast.tipArr.indexOf(_this);
                    if (id != -1) {
                        Toast.tipArr.splice(id, 1);
                    }
                    Laya.Tween.to(_this, { y: _this.y - _this.height, alpha: 0 }, 300, Laya.Ease.linearNone, Laya.Handler.create(_this, _this.removeUI));
                });
            };
            ToastView.prototype.removeUI = function () {
                Laya.Tween.clearAll(this);
                this.removeSelf();
                Laya.Pool.recover(Toast.poolMark, this);
            };
            ToastView.prototype.destroy = function () {
                _super.prototype.destroy.call(this, true);
            };
            return ToastView;
        }(ui.comp.ToastViewUI));
        comp.ToastView = ToastView;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=ToastView.js.map