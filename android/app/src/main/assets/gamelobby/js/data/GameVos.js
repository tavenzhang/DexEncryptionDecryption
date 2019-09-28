var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData.bClickFullscreen = false;
    //转移至version.json
    GameData.channel = "channel20181016";
    GameData.bindAward = 0; //绑定送金额度
    GameData.isGetBindAward = true; //是否领取过绑定送金奖励
    return GameData;
}());
/**
 * 游戏状态
 */
var GameState;
(function (GameState) {
    GameState[GameState["NORMAL"] = 0] = "NORMAL";
    GameState[GameState["PAUSE"] = 1] = "PAUSE";
    GameState[GameState["EXPECTATION"] = 2] = "EXPECTATION";
    GameState[GameState["UPDATE"] = 3] = "UPDATE";
    GameState[GameState["CLOSE"] = 4] = "CLOSE";
    GameState[GameState["TESTING"] = 5] = "TESTING";
})(GameState || (GameState = {}));
/**
 * 游戏分类
 */
var GameType;
(function (GameType) {
    GameType[GameType["classify"] = 1] = "classify";
    GameType[GameType["selfGame"] = 2] = "selfGame";
    GameType[GameType["other"] = 3] = "other";
})(GameType || (GameType = {}));
/**
 * 游戏菜单分类
 */
var GameMenuType;
(function (GameMenuType) {
    GameMenuType[GameMenuType["hotGame"] = 197] = "hotGame";
    GameMenuType[GameMenuType["fishGame"] = 200] = "fishGame";
    GameMenuType[GameMenuType["FGCard"] = 198] = "FGCard";
    GameMenuType[GameMenuType["kaiyuan"] = 199] = "kaiyuan";
    GameMenuType[GameMenuType["electron"] = 195] = "electron";
    GameMenuType[GameMenuType["lottery"] = 0] = "lottery";
})(GameMenuType || (GameMenuType = {}));
/**
 * 验证码类型
 */
var VerCodeType;
(function (VerCodeType) {
    VerCodeType[VerCodeType["MSG_LOGIN"] = 0] = "MSG_LOGIN";
    VerCodeType[VerCodeType["MSG_RESET_PWD"] = 1] = "MSG_RESET_PWD";
    VerCodeType[VerCodeType["MSG_BIND_MOBILE"] = 2] = "MSG_BIND_MOBILE";
})(VerCodeType || (VerCodeType = {}));
/**
 * 进入大厅类型
 */
var JoinLobbyType;
(function (JoinLobbyType) {
    JoinLobbyType[JoinLobbyType["loginJoin"] = 0] = "loginJoin";
    JoinLobbyType[JoinLobbyType["gameBank"] = 1] = "gameBank";
    JoinLobbyType[JoinLobbyType["backstage"] = 2] = "backstage";
})(JoinLobbyType || (JoinLobbyType = {}));
/**
 * 邮件状态
 */
var MailState;
(function (MailState) {
    MailState[MailState["UNREAD"] = 0] = "UNREAD";
    MailState[MailState["READ"] = 1] = "READ";
    MailState[MailState["UNCLAIMED"] = 2] = "UNCLAIMED";
    MailState[MailState["READUNCLAIMED"] = 3] = "READUNCLAIMED";
    MailState[MailState["RECEIVE"] = 4] = "RECEIVE";
})(MailState || (MailState = {}));
/**
 * 弹窗命令
 */
var DlgCmd;
(function (DlgCmd) {
    DlgCmd[DlgCmd["agentCenter"] = 0] = "agentCenter";
    DlgCmd[DlgCmd["noticeCenter"] = 1] = "noticeCenter";
    DlgCmd[DlgCmd["activityCenter"] = 2] = "activityCenter";
    DlgCmd[DlgCmd["personCenter"] = 3] = "personCenter";
    DlgCmd[DlgCmd["recharge"] = 4] = "recharge";
    DlgCmd[DlgCmd["service"] = 5] = "service";
    DlgCmd[DlgCmd["email"] = 6] = "email";
    DlgCmd[DlgCmd["bindPhoneAct"] = 7] = "bindPhoneAct";
    DlgCmd[DlgCmd["bindPhone"] = 8] = "bindPhone";
    DlgCmd[DlgCmd["withdraw"] = 9] = "withdraw";
    DlgCmd[DlgCmd["balance"] = 10] = "balance";
    DlgCmd[DlgCmd["accountInfo"] = 11] = "accountInfo";
    DlgCmd[DlgCmd["alipayBind"] = 12] = "alipayBind";
})(DlgCmd || (DlgCmd = {}));
/**
 * 活动相关类型
 */
var ActiveType;
(function (ActiveType) {
    ActiveType[ActiveType["ROULETTE_DRAW"] = 0] = "ROULETTE_DRAW";
})(ActiveType || (ActiveType = {}));
//# sourceMappingURL=GameVos.js.map