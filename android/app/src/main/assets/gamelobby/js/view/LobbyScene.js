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
/*
* 大厅场景
*/
var LobbyScene = /** @class */ (function (_super) {
    __extends(LobbyScene, _super);
    function LobbyScene() {
        return _super.call(this) || this;
    }
    //进入游戏时释放资源占用
    LobbyScene.prototype.clearLobby = function () {
        if (this.view) {
            this.view.visible = false;
            this.view.hallToGame();
            PageManager.clearLobbyRes();
            PageManager.clearLoginRes();
        }
    };
    //
    LobbyScene.prototype.creatLobby = function () {
        if (!this.view) {
            this.initUI();
        }
        else {
            this.view.visible = true;
            this.view.gameToHall();
        }
    };
    LobbyScene.prototype.initUI = function () {
        //添加大厅视图
        this.view = new view.LobbyNewView();
        this.addChild(this.view);
        //请求相关接口
        LobbyModel.reqBindInfo();
        LobbyModel.reqUserInfo(false);
        LobbyModel.reqUserCurrentInfo();
        LobbyModel.reqAvatarInfo();
        LobbyModel.getCardInfo();
    };
    /**
     * 初始化背景音乐
     */
    LobbyScene.initBgMusic = function () {
        if (this.IS_PLAYED_MUSIC) {
            return;
        }
        this.IS_PLAYED_MUSIC = true;
        Laya.loader.load([{ url: ResConfig.musicUrl }], new Laya.Handler(this, function () {
            SoundPlayer.UpdateBGM();
        }));
    };
    /**
     * 初始化大厅
     */
    LobbyScene.prototype.onLoaded = function () {
        if (!Common.access_token) {
            LayaMain.getInstance().initLogin();
            return;
        }
        Common.backUrl = ConfObjRead.getConfUrl().url.backlobby;
        SaveManager.getObj().initCommon(Common.access_token, ConfObjRead.getConfUrl().url.apihome);
        Common.confObj.url = ConfObjRead.getConfUrl().url;
        this.creatLobby();
        LobbyModel.getVconsoleOpen();
        EventManager.register(EventType.GAMETOHALL, this, this.creatLobby);
        EventManager.register(EventType.HALLTOGAME, this, this.clearLobby);
    };
    LobbyScene.prototype.destroy = function (b) {
        EventManager.removeAllEvents(this);
        if (this.view) {
            this.view.destroy();
            this.view = null;
        }
        _super.prototype.destroy.call(this, b);
    };
    LobbyScene.IS_PLAYED_MUSIC = false;
    return LobbyScene;
}(Laya.Sprite));
//# sourceMappingURL=LobbyScene.js.map