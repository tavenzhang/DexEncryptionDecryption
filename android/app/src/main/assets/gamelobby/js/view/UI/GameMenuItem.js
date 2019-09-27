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
    var UI;
    (function (UI) {
        var _a;
        /**
         * 游戏分类菜单item
         */
        var GameMenuItem = /** @class */ (function (_super) {
            __extends(GameMenuItem, _super);
            function GameMenuItem() {
                var _this = _super.call(this) || this;
                _this.canUse = true;
                _this.selectBg.alpha = 0;
                return _this;
            }
            GameMenuItem.prototype.readData = function (vo) {
                this.vo = vo;
                this.sid = GameMenuItem.menuMap[vo.gameId];
                this.icon.skin = "ui/lobby/micon" + this.sid + ".png";
                this.selected = false;
                if (GameState[vo.state] != GameState.NORMAL) { //非正常状态
                    this.gray = true;
                    this.canUse = false;
                }
            };
            Object.defineProperty(GameMenuItem.prototype, "selected", {
                get: function () {
                    return this._selected;
                },
                set: function (bl) {
                    if (bl) {
                        this.title.skin = "ui/lobby/smenu" + this.sid + ".png";
                        Laya.Tween.to(this.selectBg, { alpha: 1 }, 300);
                        if (this.selectBg.player)
                            this.selectBg.resume();
                    }
                    else {
                        this.title.skin = "ui/lobby/dmenu" + this.sid + ".png";
                        Laya.Tween.to(this.selectBg, { alpha: 0 }, 300);
                        if (this.selectBg.player)
                            this.selectBg.paused();
                    }
                    this._selected = bl;
                },
                enumerable: true,
                configurable: true
            });
            GameMenuItem.prototype.destroy = function () {
                this.selectBg.destroy(true);
                _super.prototype.destroy.call(this, true);
            };
            //分类菜单对应的素材id配置
            GameMenuItem.menuMap = (_a = {},
                _a[GameMenuType.hotGame] = 1,
                _a[GameMenuType.fishGame] = 2,
                _a[GameMenuType.FGCard] = 3,
                _a[GameMenuType.kaiyuan] = 4,
                _a[GameMenuType.lottery] = 5,
                _a[GameMenuType.electron] = 6,
                _a);
            return GameMenuItem;
        }(ui.UI.GameMenuItemUI));
        UI.GameMenuItem = GameMenuItem;
    })(UI = view.UI || (view.UI = {}));
})(view || (view = {}));
//# sourceMappingURL=GameMenuItem.js.map