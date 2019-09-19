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
        var DefDownLoadGame;
        (function (DefDownLoadGame) {
            DefDownLoadGame[DefDownLoadGame["zjh"] = 1] = "zjh";
            DefDownLoadGame[DefDownLoadGame["niuniu_qz"] = 2] = "niuniu_qz";
        })(DefDownLoadGame || (DefDownLoadGame = {}));
        /**
         * 游戏列表
         */
        var GameIconListPanel = /** @class */ (function (_super) {
            __extends(GameIconListPanel, _super);
            function GameIconListPanel() {
                var _this = _super.call(this) || this;
                _this.iconList = [];
                _this.defDownLoads = []; //需要默认下载的游戏
                _this.initView();
                return _this;
            }
            GameIconListPanel.prototype.initView = function () {
                this.width = Laya.stage.width - this.gapx;
                this.menu.addCallback(this, this.menuHandler);
                EventManager.register(EventType.GAME_UPDATE_INIT, this, this.onUpdateMsgInit);
                EventManager.register(EventType.GAME_UPDATE_PROGRESS, this, this.onUpdateProgress);
                EventManager.register(EventType.JUMP_GAME, this, this.jumpGame);
            };
            //菜单点击事件
            GameIconListPanel.prototype.menuHandler = function (vo) {
                if (vo.classifyGameIds) {
                    var list = LobbyModel.classifyPool[vo.gameName];
                    if (list)
                        this.addGameIcons(list);
                    else {
                        this.errIndex = 0;
                        this.reqGameList(vo);
                    }
                }
                else {
                    Toast.showToast("游戏配置异常:" + vo.gameName);
                }
            };
            /**
             * 请求游戏列表数据
             */
            GameIconListPanel.prototype.reqGameList = function (vo) {
                var _this = this;
                LobbyModel.reqGameList(vo, this, function (suc, jobj) {
                    if (suc) {
                        _this.addGameIcons(jobj.datas);
                    }
                    else {
                        _this.errIndex++;
                        if (_this.errIndex <= 3) {
                            Laya.timer.once(1200, _this, _this.reqGameList, [vo]);
                        }
                    }
                }, true);
            };
            //创建列表
            GameIconListPanel.prototype.addGameIcons = function (glist) {
                var _this = this;
                this.clearIcons();
                var icon;
                var iconGroup = new Laya.Sprite();
                iconGroup.mouseEnabled = true;
                var len = glist ? glist.length : 0;
                var gapX = 50; //x轴间隔
                var gapY = 22;
                var iconWidth = 212; //图标视图尺寸
                var iconHeight = 212;
                var contentWidth = 0;
                glist.forEach(function (value, i) {
                    icon = new view.UI.GameIconView();
                    icon.index = i;
                    icon.mouseEnabled = true;
                    icon.readData(value);
                    // icon.setGameState(GameState.UPDATE);//用于调试动画位置
                    icon.x = Math.floor(i / 2) * (iconWidth + gapX);
                    icon.y = (i % 2) * (iconHeight + gapY);
                    iconGroup.addChild(icon);
                    _this.iconList.push(icon);
                    //添加需要默认下载的游戏
                    if (DefDownLoadGame[icon.alias]) {
                        _this.defDownLoads.push(icon);
                    }
                });
                if (len > 0) {
                    var count = Math.floor(len / 2) + len % 2;
                    contentWidth = (iconWidth + gapX) * count;
                    //
                    //拖动容器的位置和拖动区域大小数据
                    var ix = this.referView.x;
                    var iy = this.referView.y;
                    var iw = this.width - ix;
                    var ih = this.referView.height;
                    var rect = new Laya.Rectangle(ix, iy, iw, ih);
                    //创建拖动容器
                    this.dragBox = new DragingBox(rect, true);
                    this.dragBox.setFriction(0.95);
                    this.dragBox.setClickCallback(this, this.clickHandler);
                    this.dragBox.addContent(iconGroup, contentWidth);
                    this.addChild(this.dragBox);
                    this.dragBox.x = Laya.stage.width;
                    Laya.Tween.to(this.dragBox, { x: ix }, 350, Laya.Ease.cubicOut);
                }
                Laya.timer.once(500, this, this.onUpdateMsgInit);
            };
            //游戏图标点击
            GameIconListPanel.prototype.clickHandler = function (evt) {
                if (evt.target instanceof view.UI.GameIconView) {
                    var item = evt.target;
                    item.doClick();
                }
            };
            GameIconListPanel.prototype.onUpdateMsgInit = function () {
                var _this = this;
                var msgArr = UpdateMsgHandle.updateInitMsg;
                if (msgArr) {
                    msgArr.forEach(function (value) {
                        var icon = _this.getGameIconByAlias(value.alias);
                        if (icon) {
                            if (value.percent >= 0)
                                icon.doUpdateProgress(value.percent);
                            else
                                icon.setGameState(GameState.UPDATE);
                        }
                    });
                }
                //执行默认下载
                this.defDownLoads.forEach(function (item) {
                    if (item.isDownload)
                        item.doClick();
                });
                this.defDownLoads.length = 0;
            };
            GameIconListPanel.prototype.clearIcons = function () {
                this.defDownLoads.length = 0;
                if (this.iconList.length > 0) {
                    this.iconList.forEach(function (value) { return value.destroy(); });
                    this.iconList.length = 0;
                }
                if (this.dragBox) {
                    this.dragBox.destroy();
                    this.dragBox = null;
                }
            };
            //轮播图跳转到游戏
            GameIconListPanel.prototype.jumpGame = function (alias) {
                var icon = this.getGameIconByAlias(alias);
                if (icon) {
                    icon.doClick();
                    this.dragBox.scrollToItem(icon);
                }
            };
            //游戏下载进度
            GameIconListPanel.prototype.onUpdateProgress = function (data) {
                var _this = this;
                if (!data || data.length <= 0)
                    return;
                data.forEach(function (value) {
                    var icon = _this.getGameIconByAlias(value.alias);
                    if (icon)
                        icon.doUpdateProgress(value.percent);
                });
            };
            //根据alias获取游戏图标对象
            GameIconListPanel.prototype.getGameIconByAlias = function (alias) {
                var arr = this.iconList.filter(function (value) { return value.alias == alias; });
                if (arr && arr.length > 0)
                    return arr[0];
                return null;
            };
            Object.defineProperty(GameIconListPanel.prototype, "gapx", {
                //----------------------public---------------
                /**
                 * 获取左间距
                 */
                get: function () {
                    if (!this._gapx)
                        this._gapx = GameUtils.getScreencOffset(24, 82);
                    return this._gapx;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 销毁
             */
            GameIconListPanel.prototype.destroy = function () {
                EventManager.removeAllEvents(this);
                _super.prototype.destroy.call(this, true);
            };
            return GameIconListPanel;
        }(ui.comp.GameIconListPanelUI));
        comp.GameIconListPanel = GameIconListPanel;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=GameIconListPanel.js.map