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
    /**
     * loading
     */
    var LoadingView = /** @class */ (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView(alp) {
            var _this = _super.call(this) || this;
            _this._alp = alp;
            _this.initView();
            return _this;
        }
        /**
         * 显示loading
         * @param bgAlpha 背景透明度
         */
        LoadingView.show = function (bgAlpha) {
            if (bgAlpha === void 0) { bgAlpha = 0.5; }
            if (this._inst)
                return;
            this._inst = new LoadingView(bgAlpha);
            this._inst.zOrder = Dialog.manager.zOrder + 1;
            this._inst.mouseEnabled = true;
            Laya.stage.addChild(this._inst);
            this.isLoading = true;
        };
        /**
         * 隐藏loading
         */
        LoadingView.hide = function () {
            if (this._inst) {
                this._inst.destroy(true);
                this._inst = null;
            }
            this.isLoading = false;
        };
        LoadingView.prototype.initView = function () {
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            //背景框
            var bg = new Laya.Sprite();
            bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            bg.alpha = 0; //this._alp;需求将遮罩背景去掉:https://jira.mtkefu.com/browse/TGQP-2782?filter=-1
            this.addChildAt(bg, 0);
            this.anim = new DragonBoneAnim();
            this.anim.parseInit({ skUrl: "./assets/animation/loading/xiaoLoding.sk", pngUrl: "./assets/animation/loading/xiaoLoding.png" });
            this.abox.addChild(this.anim);
            this.anim.alpha = 0; //用于优化loading显示
            Laya.Tween.to(this.anim, { alpha: 1 }, 300, null, null, 1200);
            Laya.timer.once(GameUtils.outTime + 2000, this, this.timeOut);
        };
        LoadingView.prototype.timeOut = function () {
            console.error("超时异常,关闭loading");
            LoadingView.hide();
        };
        LoadingView.prototype.destroy = function (dc) {
            Laya.Tween.clearTween(this.anim);
            Laya.timer.clear(this, this.timeOut);
            if (this.anim) {
                this.anim.destroy();
                this.anim = null;
            }
            _super.prototype.destroy.call(this, dc);
        };
        return LoadingView;
    }(ui.LoadingViewUI));
    view.LoadingView = LoadingView;
})(view || (view = {}));
//# sourceMappingURL=LoadingView.js.map