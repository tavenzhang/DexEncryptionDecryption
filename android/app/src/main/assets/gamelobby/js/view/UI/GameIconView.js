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
         * 游戏图标视图
         */
        var GameIconView = /** @class */ (function (_super) {
            __extends(GameIconView, _super);
            function GameIconView() {
                var _this = _super.call(this) || this;
                _this.isclick = true;
                _this.gapTime = 350; //控制点击间隔时间
                _this.progressValue = 0;
                _this.index = 0;
                _this.lowMark.visible = false;
                _this.debugTxt.text = "";
                _this.resetView();
                return _this;
            }
            Object.defineProperty(GameIconView.prototype, "alias", {
                /**
                 * 获取游戏别名
                 */
                get: function () {
                    return this.gameVo.alias;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GameIconView.prototype, "classify", {
                /**
                 * 获取游戏类型
                 */
                get: function () {
                    return this.gameVo.classify;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GameIconView.prototype, "vo", {
                get: function () {
                    return this.gameVo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GameIconView.prototype, "isDownload", {
                //是否需要下载
                get: function () {
                    return this.gameState == GameState.UPDATE;
                },
                enumerable: true,
                configurable: true
            });
            GameIconView.prototype.resetView = function () {
                this.updateIcon.visible = false;
                this.expectIcon.visible = false;
                this.pauseIcon.visible = false;
                this.normIcon.visible = false;
                if (this.anim) {
                    this.anim.pause();
                    this.animbox.gray = false;
                }
                if (this.upload)
                    this.upload.visible = false;
            };
            /**
             * 读取数据
             * @param vo
             */
            GameIconView.prototype.readData = function (vo) {
                this.gameVo = vo;
                //电子类用黄色底
                if (LobbyModel.menuVo && LobbyModel.menuVo.gameId == GameMenuType.electron.toString()) {
                    //todo:有变动，后续再调整
                }
                if (vo.classify == GameType.other) { //三方游戏直接读取网络图标
                    this.normIcon.visible = true;
                    this.bgIcon.visible = false; //三方游戏不加背景
                    LoadTool.loadImage(this.normIcon, vo.icon, 200, 200);
                    if (GameState[vo.state] == GameState.PAUSE) {
                        this.pauseIcon.visible = true;
                        this.normIcon.gray = true;
                    }
                    else if (GameState[vo.state] == GameState.EXPECTATION) {
                        this.expectIcon.visible = true;
                        this.normIcon.gray = true;
                    }
                    this.noSkfile = true;
                    return;
                }
                //读取本地配置
                this.config = ResConfig.getGameIconConfig(vo.alias);
                var skArr = this.config.anim_sk.split(".sk");
                this.config.anim_png = skArr[0] + ".png";
                //没有本地图标的显示名称
                if (this.config.alias != this.gameVo.alias) {
                    this.debugTxt.text = this.gameVo.name;
                    this.noSkfile = true;
                }
                this.setGameState(GameState[vo.state]);
                //显示体验房标记(目前本地配死)
                if (this.config.lowRoom && this.config.alias == this.gameVo.alias) {
                    this.lowMark.alpha = 0;
                    this.lowMark.visible = true;
                    Laya.Tween.to(this.lowMark, { alpha: 1 }, 500, null, null, 300);
                }
            };
            /**
             * 执行点击事件
             */
            GameIconView.prototype.doClick = function () {
                var _this = this;
                if (!this.isclick)
                    return;
                this.isclick = false;
                Laya.timer.once(this.gapTime, this, function () { return _this.isclick = true; });
                //如果是三方游戏
                if (this.classify == GameType.other) {
                    var state = GameState[this.gameVo.state];
                    if (state == GameState.NORMAL) {
                        SoundPlayer.enterGameSound();
                        LobbyModel.checkValidBalance(this.gameVo, false);
                    }
                    return;
                }
                switch (this.gameState) {
                    case GameState.NORMAL:
                        this.onLaunchGame();
                        break;
                    case GameState.UPDATE:
                        this.onStartUpdate();
                        break;
                }
            };
            GameIconView.prototype.onLaunchGame = function () {
                SoundPlayer.enterGameSound();
                Common.gameId = this.gameVo.id;
                Common.wsUrl = this.gameVo.url;
                if (this.gameVo.jumpUrl) {
                    //进入游戏前先判断玩家的有效余额
                    LobbyModel.checkValidBalance(this.gameVo, true);
                }
                else {
                    Toast.showToast("数据配置异常,无法进入房间");
                }
            };
            GameIconView.prototype.onStartUpdate = function () {
                if (!this.isupdating) {
                    var data = [
                        {
                            "alias": this.gameVo.alias,
                            "percent": this.progressValue
                        }
                    ];
                    UpdateMsgHandle.onUpdateMsg(data);
                    //发送游戏下载命令
                    PostMHelp.startUpdate({ "gameId": this.gameVo.id, "alias": this.gameVo.alias });
                }
            };
            /**
             * 设置当前游戏状态
             * @param state
             */
            GameIconView.prototype.setGameState = function (state) {
                if (this.gameState == GameState.PAUSE)
                    return; //维护状态不接受其他状态
                this.gameState = state;
                this.resetView();
                if (!GameState[state]) {
                    Debug.error(this.gameVo.name + "state=" + state, this.gameVo.state);
                }
                switch (this.gameState) {
                    case GameState.NORMAL:
                        this.showNorm(true);
                        break;
                    case GameState.PAUSE:
                        this.showPause();
                        break;
                    case GameState.EXPECTATION:
                        this.showExpectation();
                        break;
                    case GameState.UPDATE:
                        this.showUpdate();
                        break;
                }
            };
            /**
             * 游戏下载进度更新
             * @param value
             */
            GameIconView.prototype.doUpdateProgress = function (value) {
                if (this.gameState == GameState.PAUSE)
                    return; //维护状态不接受其他状态
                if (!this.isupdating || this.updateIcon.visible) {
                    this.showUpdating();
                }
                this.progressValue = value;
                this.refreshUpdateProgress();
            };
            GameIconView.prototype.refreshUpdateProgress = function () {
                if (!this.progressValue)
                    this.progressValue = 0;
                this.creatUpload();
                this.upload.progressValue = this.progressValue;
                if (this.progressValue >= 1) {
                    this.isupdating = false;
                    this.setGameState(GameState.NORMAL);
                    UpdateMsgHandle.clearInfoByAlias(this.gameVo.alias);
                }
            };
            //----------------------------------------
            //正常模式
            GameIconView.prototype.showNorm = function (autoPlay) {
                if (this.noSkfile)
                    return;
                if (!this.anim) {
                    this.anim = new DragonBoneAnim();
                    this.anim.scale(0.95, 0.95);
                    this.animbox.addChild(this.anim);
                    this.anim.loadInit({ skUrl: this.config.anim_sk, autoPlay: autoPlay }, this, this.animLoaded);
                }
                else {
                    if (autoPlay)
                        this.anim.resume();
                }
            };
            //动画加载完毕
            GameIconView.prototype.animLoaded = function () {
                var state = GameState[this.gameVo.state];
                //维护中和尽请期待状态处理成灰度图
                if (state == GameState.PAUSE || state == GameState.EXPECTATION) {
                    var htmlC = this.anim.drawToCanvas(this.width, this.height, this.width >> 1, this.height >> 1);
                    var txt = new Laya.Texture(htmlC);
                    this.normIcon.visible = true;
                    this.normIcon.graphics.drawTexture(txt, -this.width >> 1, -this.height >> 1);
                    this.normIcon.gray = true;
                    this.bgIcon.gray = true;
                    if (this.lowMark.visible)
                        this.lowMark.gray = true;
                    this.anim.visible = false;
                }
            };
            //维护中
            GameIconView.prototype.showPause = function () {
                this.pauseIcon.visible = true;
                this.showNorm(false);
                this.animbox.gray = true;
            };
            //敬请期待
            GameIconView.prototype.showExpectation = function () {
                this.expectIcon.visible = true;
                this.showNorm(false);
                this.animbox.gray = true;
            };
            //待更新
            GameIconView.prototype.showUpdate = function () {
                this.updateIcon.visible = true;
                this.showNorm(false);
            };
            //更新中
            GameIconView.prototype.showUpdating = function () {
                this.isupdating = true;
                this.gameState = GameState.UPDATE;
                this.resetView();
                this.progressValue = 0.0;
                this.creatUpload();
                this.upload.progressValue = 0;
                //更新前动画是否暂停
            };
            GameIconView.prototype.creatUpload = function () {
                if (!this.upload) {
                    this.upload = new view.comp.UploadTimeBar();
                    this.upload.centerX = this.upload.centerY = 0;
                    this.addChild(this.upload);
                }
            };
            GameIconView.prototype.pause = function () {
                if (this.anim)
                    this.anim.pause();
            };
            GameIconView.prototype.resume = function () {
                if (this.anim)
                    this.anim.resume();
            };
            /**
             * 销毁
             */
            GameIconView.prototype.destroy = function () {
                if (this.anim)
                    this.anim.destroy(true);
                _super.prototype.destroy.call(this, true);
            };
            return GameIconView;
        }(ui.UI.GameIconViewUI));
        UI.GameIconView = GameIconView;
    })(UI = view.UI || (view.UI = {}));
})(view || (view = {}));
//# sourceMappingURL=GameIconView.js.map