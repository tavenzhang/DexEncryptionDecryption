/*
* 大厅相关数据
*/
var LobbyModel = /** @class */ (function () {
    function LobbyModel() {
    }
    /**
     * 请求游戏列表
     * @param vo
     * @param caller
     * @param callback
     * @param showloading
     */
    LobbyModel.reqGameList = function (vo, caller, callback, showloading) {
        var _this = this;
        if (showloading)
            LayaMain.getInstance().showCircleLoading(true);
        var params = "&pageSize=100&start=0";
        params += "&jump=" + Common.bNewlogin;
        params += "&classifyGames=" + vo.classifyGameIds;
        HttpRequester.getHttpData(ConfObjRead.httpCmd.gamelist, this, function (suc, jobj) {
            if (showloading)
                LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                Debug.log("--->>>gameList-" + vo.gameId + ":", jobj);
                _this.classifyPool[vo.gameId] = jobj.datas;
            }
            if (caller && callback)
                callback.call(caller, suc, jobj);
        }, params);
    };
    /**
     * 请求游戏分类菜单
     * @param caller
     * @param callback
     */
    LobbyModel.reqClassifyMenu = function (caller, callback) {
        LayaMain.getInstance().showCircleLoading();
        HttpRequester.getHttpData(ConfObjRead.httpCmd.gameMenu, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            Debug.log("--->>>gameMenu:", jobj);
            if (caller && callback)
                callback.call(caller, suc, jobj);
        });
    };
    /**
     * 获取cdnUrl,用于三方平台icon加载
     * @param caller
     * @param callback
     */
    LobbyModel.reqCdnUrl = function (caller, callback) {
        var _this = this;
        LayaMain.getInstance().showCircleLoading();
        if (!Common.brandId) {
            console.error("brandId异常");
        }
        var url = ConfObjRead.httpCmd.cdnUrlByBrandID + Common.brandId;
        HttpRequester.getHttpData(url, this, function (suc, jobj) {
            if (caller && callback)
                callback.call(caller, suc);
            if (suc && jobj) {
                if (jobj.http)
                    _this.cdnUrl = jobj.http.response;
                console.log("cdn:>>>", _this.cdnUrl);
            }
        });
    };
    /**
     * 跳转三方游戏
     * @param vo
     */
    LobbyModel.gotoOhterGame = function (vo) {
        LayaMain.getInstance().showCircleLoading(true);
        var data = ["gamePlatform", vo.gamePlatform];
        HttpRequester.getHttpData(ConfObjRead.httpCmd.otherGameURI + vo.classifyThirdGameId, this, function (suc, jobj) {
            if (!GameUtils.isNativeApp)
                LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (jobj.data && jobj.data.gameUrl) {
                    PostMHelp.jumpOtherGame(jobj.data.gameUrl);
                    Debug.log("jumpOtherGame:", jobj.data.gameUrl);
                }
                else {
                    Toast.showToast("游戏跳转失败:" + jobj.message);
                    LayaMain.getInstance().showCircleLoading(false);
                }
            }
            else {
                LayaMain.getInstance().showCircleLoading(false);
            }
        }, null, data);
    };
    /**
     * 进入游戏前先检测有效余额与实际余额
     * @param vo
     * @param selfGame 是否自有游戏
     */
    LobbyModel.checkValidBalance = function (vo, selfGame) {
        var obj = Common.balanceInfo;
        if (obj && obj.failedCollectAmount > 0) { //判断是否有三方游戏的余额未回收
            var tipstr = "由于您在之前游戏中异常退出，部分余额已锁定，锁定余额将在游戏结束后返还";
            if (obj.failedCollectAmount == Common.userBalance)
                tipstr = "由于您在之前游戏中异常退出，余额已被锁定，锁定余额将在游戏结束后返还";
            view.dlg.TipsDlg.show(tipstr, this, function () {
                selfGame ? Tools.jump2game(vo.url) : LobbyModel.gotoOhterGame(vo);
            });
        }
        else {
            selfGame ? Tools.jump2game(vo.url) : LobbyModel.gotoOhterGame(vo);
        }
    };
    //请求vconsole开关
    LobbyModel.getVconsoleOpen = function () {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.vconsole, this, function (suc, jobj) {
            if (suc) {
                Debug.httpDebug = Boolean(jobj.data);
            }
        }, "&environment=dev,sit,uat");
    };
    /**
     * 检查活动公告是否需要默认弹出
     */
    LobbyModel.checkActivity = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.attention_pop, this, function (suc, jobj) {
            if (suc && jobj.pop) { //本地 活动/公告2/1 服务器 1/0
                PageManager.showDlg(DlgCmd.noticeCenter, jobj.noticeCate + 1, jobj.noticeid);
            }
            else {
                QueueTask.checkQueue([QueueType.bindPhoneActiv]);
            }
        });
    };
    /**
     * 检查是否有新的活动
     */
    LobbyModel.checkUnreadNotice = function (caller, callback) {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.attention_new, this, function (suc, jobj) {
            if (suc) {
                //type0-公告，type1-活动 dial-是否显示转盘
                var hotobj_1 = { type0: false, type1: false, dial: false };
                jobj.forEach(function (data, index) {
                    if (data.noticeList) {
                        data.noticeList.forEach(function (data) {
                            if (data.bread === false) { //标记为有未读数据
                                hotobj_1["type" + index] = true;
                            }
                            if (index == 1) { //判断活动中有无转盘的配置
                                if (data.noticeActivityType == ActiveType[ActiveType.ROULETTE_DRAW]) {
                                    hotobj_1.dial = true;
                                }
                            }
                        });
                    }
                });
                if (caller && callback)
                    callback.call(caller, hotobj_1);
            }
        });
    };
    /**
     * 绑定手机相关数据
     */
    LobbyModel.reqBindInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getBindInfo, this, function (suc, jobj) {
            if (suc) {
                GameData.bindOpen = jobj.bind;
                GameData.bindAward = jobj.reward;
                EventManager.dispath(EventType.BINDPHONE_INFO);
            }
        });
    };
    /**
     * users
     * flushBalance 是否刷新余额
     */
    LobbyModel.reqUserInfo = function (flushBalance) {
        var _this = this;
        if (flushBalance === void 0) { flushBalance = true; }
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.userinfobalance, this, function (suc, jobj) {
            if (suc) {
                Common.userInfo = jobj;
                Common.setLoginPlatform(jobj.loginPlatform);
                EventManager.dispath(EventType.GETUSERS_INFO);
                if (flushBalance)
                    _this.refreshMoney();
            }
        });
    };
    /**
     * current
     */
    LobbyModel.reqUserCurrentInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.userinfo, this, function (suc, jobj) {
            if (suc) {
                Common.userInfo_current = jobj;
                if (jobj.username == jobj.nickname) {
                    LobbyModel.reqInitNickInfo();
                }
                else {
                    EventManager.dispath(EventType.SHOW_NICK_NAME);
                }
                var vo = SaveManager.getObj().get(SaveManager.KEY_LASTLOGININFO, null);
                if (jobj.certifiedPhone) { //如果玩家绑定过手机,则将缓存的用户名改为手机号
                    LoginModel.loginType = LoginMethod.account;
                    if (vo) {
                        vo.user = jobj.phoneNumber;
                        vo.type = LoginMethod.account;
                        SaveManager.getObj().save(SaveManager.KEY_LASTLOGININFO, vo);
                    }
                    else {
                        console.error("正式账号登录成功,但没有缓存数据");
                    }
                }
                else {
                    LoginModel.loginType = LoginMethod.visitor;
                    if (vo && vo.type != LoginMethod.visitor) {
                        vo.type = LoginMethod.visitor;
                        SaveManager.getObj().save(SaveManager.KEY_LASTLOGININFO, vo);
                    }
                    else if (!vo) {
                        console.error("非正式账号登录成功,但没有缓存数据");
                    }
                }
                EventManager.dispath(EventType.GETUSER_CURRENT);
            }
        });
    };
    /**
     * 请求一个随机昵称
     * @param caller
     * @param callback
     * @param showloading
     */
    LobbyModel.reqNickName = function (caller, callback, showloading) {
        if (showloading)
            LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.getHttpData(ConfObjRead.httpCmd.getNickName, this, function (suc, jobj) {
            if (showloading)
                LayaMain.getInstance().showCircleLoading(false);
            var str = "";
            if (suc) {
                str = jobj.data || "";
            }
            if (caller && callback)
                callback.call(caller, str);
        });
    };
    /**
     * 初始化获取昵称
     */
    LobbyModel.reqInitNickInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.initNickName, this, function (suc, jobj) {
            if (suc) {
                Common.userInfo_current.nickname = jobj.data.nickName;
                EventManager.dispath(EventType.SHOW_NICK_NAME);
            }
        });
    };
    /**
     * 检测昵称修改次数
     * @param caller
     * @param callback
     */
    LobbyModel.checkSetNickCount = function (caller, callback) {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.setNickCount, this, function (suc, jobj) {
            if (suc) {
                if (caller && callback)
                    callback.call(caller, jobj.data);
            }
        });
    };
    /**
     * 头像数据
     */
    LobbyModel.reqAvatarInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.avatorget, this, function (suc, jobj) {
            if (suc) {
                Common.avatorInfo = jobj;
                var tempId = jobj.avatar;
                if (!tempId)
                    tempId = "05";
                tempId = Tools.FormatNumber(parseInt(tempId), 2);
                Common.avatorInfo.avatorId = tempId;
                SaveManager.getObj().save(SaveManager.KEY_AVATOR_ID, tempId);
                EventManager.dispath(EventType.GETAVATOR_INFO);
            }
        });
    };
    /**
     * 余额刷新(获取用户的余额信息包含免转金额的回收详情)
     */
    LobbyModel.refreshMoney = function (caller, callback) {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.recoverBalanceInfo, this, function (suc, jobj) {
            if (suc) {
                Common.userBalance = jobj.data.totalAmount;
                Common.balanceInfo = jobj.data;
                Debug.log("刷新余额：", Common.userBalance);
                EventManager.dispath(EventType.FLUSH_MONEY);
            }
            if (caller && callback)
                callback.call(caller);
        });
    };
    /**
     * 获取绑定卡相关信息
     */
    LobbyModel.getCardInfo = function (caller, callback) {
        var _this = this;
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getCardInfo, this, function (suc, jobj) {
            if (suc) {
                Common.cardInfo = jobj;
                if (caller && callback) {
                    callback.call(caller);
                }
            }
            else {
                Common.cardInfo = { enabledAlipayWithdraw: false, hasAlipayCard: false, hasBankCard: false };
                Toast.showToast("cardInfo获取异常");
            }
            _this.getCardDetailInfo();
        });
    };
    /**
     * 获取未读邮件
     */
    LobbyModel.getUnreadMail = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getUnreadMail, this, function (suc, jobj) {
            if (suc) {
                EventManager.dispath(EventType.CHECK_UNREADMAIL, jobj);
            }
        });
    };
    /**
     * 获取银行卡绑定详细信息
     * @param caller
     * @param callback
     */
    LobbyModel.getCardDetailInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getbankCardInfo, this, function (suc, jobj) {
            if (suc) {
                var arr = jobj.bankAccounts;
                arr.forEach(function (value) {
                    if (value.bankCode == "ZHB") {
                        Common.alipayInfo = value;
                    }
                    else {
                        Common.bankInfo = value;
                    }
                });
                EventManager.dispath(EventType.GET_BACKCARD_DETAIL);
            }
        });
    };
    /**
     * 检测维护公告
     */
    LobbyModel.checkMaintenanceNotice = function () {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.vindicateNotice, this, function (suc, jobj) {
            if (suc) {
                if (jobj.maintenanceState && jobj.maintenanceDto) {
                    view.dlg.GameUpdateNotice.show(jobj.maintenanceDto || {});
                }
            }
        });
    };
    /**
     * 用于缓存游戏分类列表数据
     */
    LobbyModel.classifyPool = {};
    //缓存游戏图标标记
    LobbyModel.cacheIconMark = "gameIcon";
    LobbyModel.inLobby = true; //是否在大厅
    //用于三方平台icon加载的cdnurl
    LobbyModel.cdnUrl = null;
    return LobbyModel;
}());
//# sourceMappingURL=LobbyModel.js.map