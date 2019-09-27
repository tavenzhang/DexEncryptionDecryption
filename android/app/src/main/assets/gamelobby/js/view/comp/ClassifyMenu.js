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
                _this.isclick = true; //限制点击频率
                _this.itemPanel.vScrollBarSkin = "";
                _this.itemPanel.on(Laya.Event.CLICK, _this, _this.menuClick);
                return _this;
            }
            ClassifyMenu.prototype.menuClick = function (e) {
                var _this = this;
                if (e.target instanceof view.UI.GameMenuItem) {
                    SoundPlayer.clickSound();
                    if (!this.isclick)
                        return;
                    this.isclick = false;
                    var item = e.target;
                    this.selectItem(item);
                    Laya.timer.once(EventManager.delayClickTime, this, function () {
                        if (!_this.destroyed)
                            _this.isclick = true;
                    });
                }
            };
            ClassifyMenu.prototype.selectItem = function (item) {
                if (item.selected)
                    return;
                if (!item.canUse) {
                    var state = GameState[item.vo.state];
                    switch (state) {
                        case GameState.TESTING:
                        case GameState.PAUSE:
                            Toast.showToast("当前游戏维护中，老板可以先玩其他游戏哦~");
                            break;
                        case GameState.EXPECTATION:
                            Toast.showToast("新游戏即将上线，老板不要着急哦~");
                            break;
                    }
                    return;
                }
                item.selected = true;
                if (this.lastItem) {
                    this.lastItem.selected = false;
                }
                this.lastItem = item;
                this.doCallback(item.vo);
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
                        if (_this.voList) { //判断是否需要刷新
                            var arr_1 = jobj.data;
                            var flush_1 = false; //是否刷新
                            if (_this.voList.length != arr_1.length)
                                flush_1 = true;
                            else {
                                _this.voList.forEach(function (value, index) {
                                    if (value.gameId == arr_1[index].gameId) {
                                        if (value.state != arr_1[index].state)
                                            flush_1 = true;
                                    }
                                    else {
                                        flush_1 = true;
                                    }
                                });
                            }
                            //预加载列表数据
                            arr_1.forEach(function (value) {
                                if (!flush_1 && _this.lastItem.vo.gameId != value.gameId) {
                                    LobbyModel.reqGameList(value);
                                }
                            });
                            Debug.log("刷新菜单:", flush_1);
                            //如果没有数据变化就不刷新菜单
                            if (!flush_1) {
                                if (_this.lastItem)
                                    _this.doCallback(_this.lastItem.vo);
                                else {
                                    _this.selectItem(_this.itemPanel.getChildAt(0));
                                    console.error("异常逻辑");
                                }
                                return;
                            }
                        }
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
                this.voList = list;
                if (this.itemPanel.numChildren > 0) {
                    this.itemPanel.destroyChildren();
                }
                list.forEach(function (vo, index) {
                    var item = new view.UI.GameMenuItem();
                    item.readData(vo);
                    item.y = index * (item.height + 5);
                    item.mouseEnabled = true;
                    _this.itemPanel.addChild(item);
                    if (index == 0) {
                        _this.selectItem(item);
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
            /**
             * 通过菜单id跳转到菜单页
             * @param mid
             */
            ClassifyMenu.prototype.gotoMenu = function (mid) {
                if (this.voList) {
                    var arr = this.voList.filter(function (value) { return value.gameId == mid; });
                    var vo = arr[0];
                    if (vo) {
                        var index = this.voList.indexOf(vo);
                        var item = this.itemPanel.getChildAt(index);
                        this.selectItem(item);
                    }
                }
                else {
                    console.error("菜单跳转失败:", mid);
                }
            };
            return ClassifyMenu;
        }(ui.comp.ClassifyMenuUI));
        comp.ClassifyMenu = ClassifyMenu;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=ClassifyMenu.js.map