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
        /**
         * 游戏分类菜单item
         */
        var GameMenuItem = /** @class */ (function (_super) {
            __extends(GameMenuItem, _super);
            function GameMenuItem() {
                var _this = _super.call(this) || this;
                _this.selectBg.alpha = 0;
                return _this;
            }
            GameMenuItem.prototype.readData = function (vo) {
                this.vo = vo;
                this.sid = GameMenuItem.config[vo.gameId];
                this.icon.skin = "ui/lobby/micon" + this.sid + ".png";
                this.selected = false;
            };
            Object.defineProperty(GameMenuItem.prototype, "selected", {
                get: function () {
                    return this._selected;
                },
                set: function (bl) {
                    if (bl) {
                        this.title.skin = "ui/lobby/smenu" + this.sid + ".png";
                        Laya.Tween.to(this.selectBg, { alpha: 1 }, 300);
                    }
                    else {
                        this.title.skin = "ui/lobby/dmenu" + this.sid + ".png";
                        Laya.Tween.to(this.selectBg, { alpha: 0 }, 300);
                    }
                    this._selected = bl;
                },
                enumerable: true,
                configurable: true
            });
            GameMenuItem.config = {
                "197": 1,
                "200": 2,
                "198": 3,
                "199": 4,
                "todo": 5,
                "": 6,
            };
            return GameMenuItem;
        }(ui.UI.GameMenuItemUI));
        UI.GameMenuItem = GameMenuItem;
    })(UI = view.UI || (view.UI = {}));
})(view || (view = {}));
//# sourceMappingURL=GameMenuItem.js.map