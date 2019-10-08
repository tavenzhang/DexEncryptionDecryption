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
                    LobbyModel.menuVo = vo;
                    var list = LobbyModel.classifyPool[vo.gameId];
                    Debug.log("menu-click:", list);
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
                Common.gameList = glist; //保存当前列表
                var icon;
                var iconGroup = new Laya.Sprite();
                iconGroup.mouseEnabled = true;
                var len = 0;
                var gapX = 36; //x轴间隔
                var gapY = 22;
                var iconWidth = 212; //图标视图尺寸
                var iconHeight = 212;
                var contentWidth = 0;
                var startX = Laya.stage.width - this.menu.width; //缓动初始位置
                var tox; //目标位置
                var tweenMax = this.width - this.referView.x; //需要缓动的图标的界限值
                var delayDrag = 350; //延迟执行列表滑动(如果动画没播放完就滑动会有奇怪的效果)
                glist.forEach(function (value, i) {
                    //如果游戏没有关闭和下线
                    if (GameState[value.state] != GameState.CLOSE && value.classifyOnlineFlag) {
                        icon = Laya.Pool.getItem(LobbyModel.cacheIconMark); //读取缓存
                        if (!icon) {
                            icon = new view.UI.GameIconView();
                            icon.mouseEnabled = true;
                        }
                        else {
                            icon.resetFlush(); //重置刷新
                        }
                        icon.index = len;
                        icon.readData(value);
                        // icon.setGameState(GameState.UPDATE);//用于调试动画位置
                        tox = Math.floor(len / 2) * (iconWidth + gapX);
                        icon.x = startX;
                        icon.y = (len % 2) * (iconHeight + gapY);
                        icon.alpha = 0;
                        iconGroup.addChild(icon);
                        _this.iconList.push(icon);
                        if (tox < tweenMax) {
                            Laya.Tween.to(icon, { x: tox, alpha: 1 }, 350, Laya.Ease.cubicOut, null, len * 60);
                            startX += iconWidth + gapX;
                            if (len > 0)
                                delayDrag += 60;
                        }
                        else {
                            icon.alpha = 1;
                            icon.x = tox;
                        }
                        //添加需要默认下载的游戏
                        if (DefDownLoadGame[icon.alias]) {
                            _this.defDownLoads.push(icon);
                        }
                        len++;
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
                    this.dragBox.mouseEnabled = false;
                    Laya.timer.once(delayDrag, this, function () {
                        if (_this.dragBox)
                            _this.dragBox.mouseEnabled = true;
                    });
                }
                Laya.timer.once(500, this, this.onUpdateMsgInit, [false]);
            };
            //游戏图标点击
            GameIconListPanel.prototype.clickHandler = function (evt) {
                if (evt.target instanceof view.UI.GameIconView) {
                    var item = evt.target;
                    item.doClick();
                }
            };
            GameIconListPanel.prototype.onUpdateMsgInit = function (isEvent) {
                var _this = this;
                if (isEvent === void 0) { isEvent = true; }
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
                this.iconList.length = 0;
                if (this.dragBox) {
                    this.dragBox.destroy();
                    this.dragBox = null;
                }
            };
            //轮播图跳转到游戏
            GameIconListPanel.prototype.jumpGame = function (alias) {
                var _this = this;
                var icon = this.getGameIconByAlias(alias);
                if (icon) { //如果在当前列表
                    icon.doClick();
                    this.dragBox.scrollToItem(icon, this.gapx);
                }
                else { //如果需要跳转的游戏没在当前列表就去热门和电子类中查找数据
                    var list = LobbyModel.classifyPool[GameMenuType.hotGame]; //热门类
                    var mid = GameMenuType.hotGame.toString();
                    if (list) {
                        var arr = list.filter(function (value) { return value.alias == alias; });
                        var gvo = arr[0];
                        if (!gvo) {
                            list = LobbyModel.classifyPool[GameMenuType.electron]; //电子类
                            arr = list.filter(function (value) { return value.alias == alias; });
                            gvo = arr[0];
                            mid = GameMenuType.electron.toString();
                        }
                        if (gvo) { //触发热门菜单按钮点击
                            LayaMain.getInstance().showCircleLoading();
                            this.menu.gotoMenu(mid);
                            Laya.timer.once(600, this, function () {
                                LayaMain.getInstance().showCircleLoading(false);
                                var icon = _this.getGameIconByAlias(alias);
                                if (icon) {
                                    icon.doClick();
                                    _this.dragBox.scrollToItem(icon, _this.gapx);
                                }
                                else {
                                    console.error("没有找到游戏icon:", alias);
                                }
                            });
                        }
                        else {
                            console.error("没有找到跳转数据2:", alias);
                        }
                    }
                    else {
                        console.error("没有找到跳转数据1:", alias);
                    }
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
            //----------------------public---------------
            GameIconListPanel.prototype.playEntryAnim = function (flush) {
                this.menu.x = -this.menu.width - this.gapx;
                this.menu.alpha = 0.5;
                Laya.Tween.to(this.menu, { x: 0, alpha: 1 }, 500, Laya.Ease.cubicOut, null, 100);
                if (flush && this.dragBox) {
                    this.clearIcons();
                    this.menu.reqMenuData();
                }
            };
            Object.defineProperty(GameIconListPanel.prototype, "gapx", {
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