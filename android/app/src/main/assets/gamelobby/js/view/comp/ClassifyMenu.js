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
         * 游戏分类菜单
         */
        var ClassifyMenu = /** @class */ (function (_super) {
            __extends(ClassifyMenu, _super);
            function ClassifyMenu() {
                var _this = _super.call(this) || this;
                _this.errIndex = 0;
                _this.itemPanel.vScrollBarSkin = "";
                _this.itemPanel.on(Laya.Event.CLICK, _this, _this.menuClick);
                return _this;
            }
            ClassifyMenu.prototype.menuClick = function (e) {
                if (e.target instanceof view.UI.GameMenuItem) {
                    SoundPlayer.clickSound();
                    var item = e.target;
                    if (item.selected)
                        return;
                    item.selected = true;
                    if (this.lastItem) {
                        this.lastItem.selected = false;
                    }
                    this.lastItem = item;
                    this.doCallback(item.vo);
                }
            };
            /**
             * 添加菜单点击事件回掉
             * @param caller
             * @param callback
             */
            ClassifyMenu.prototype.addCallback = function (caller, callback) {
                this.caller = caller;
                this.callback = callback;
                this.reqMenuData();
            };
            ClassifyMenu.prototype.reqMenuData = function () {
                var _this = this;
                LobbyModel.reqClassifyMenu(this, function (suc, jobj) {
                    if (suc) {
                        _this.showMenu(jobj.data);
                    }
                    else {
                        _this.errIndex++;
                        if (_this.errIndex <= 3) { //尝试3次请求
                            Laya.timer.once(1200, _this, _this.reqMenuData);
                        }
                    }
                });
            };
            ClassifyMenu.prototype.showMenu = function (list) {
                var _this = this;
                list.forEach(function (vo, index) {
                    var item = new view.UI.GameMenuItem();
                    item.readData(vo);
                    item.y = index * (item.height + 5);
                    item.mouseEnabled = true;
                    _this.itemPanel.addChild(item);
                    if (index == 0) {
                        item.selected = true;
                        _this.lastItem = item;
                        _this.doCallback(vo);
                    }
                    else { //预加载其他分类列表数据
                        LobbyModel.reqGameList(vo);
                    }
                });
            };
            ClassifyMenu.prototype.doCallback = function (vo) {
                if (this.caller && this.callback) {
                    this.callback.call(this.caller, vo);
                }
            };
            return ClassifyMenu;
        }(ui.comp.ClassifyMenuUI));
        comp.ClassifyMenu = ClassifyMenu;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=ClassifyMenu.js.map