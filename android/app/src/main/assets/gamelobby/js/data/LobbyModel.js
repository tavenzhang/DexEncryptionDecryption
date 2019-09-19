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
                Debug.log("--->>>gameList:", jobj);
                _this.classifyPool[vo.gameName] = jobj.datas;
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
            LayaMain.getInstance().showCircleLoading();
            Debug.log("--->>>gameMenu:", jobj);
            if (caller && callback)
                callback.call(caller, suc, jobj);
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
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (jobj.data && jobj.data.gameUrl) {
                    PostMHelp.jumpOtherGame(jobj.data.gameUrl);
                    Debug.log("jumpOtherGame:", jobj.data.gameUrl);
                }
                else {
                    Toast.showToast("游戏跳转失败:" + vo.name + vo.classifyThirdGameId);
                }
            }
        }, null, data);
    };
    /**
     * 检查是否从三方游戏异常退出
     * @param caller
     * @param callback
     */
    LobbyModel.checkOtherGameErr = function (caller, callback) {
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.getHttpData(ConfObjRead.httpCmd.checkOtherGameErr, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (caller && callback)
                callback.call(caller, suc, jobj);
        });
    };
    /**
     * 进入游戏前先检测有效余额与实际余额
     * @param vo
     * @param selfGame 是否自有游戏
     */
    LobbyModel.checkValidBalance = function (vo, selfGame) {
        var _this = this;
        LobbyModel.getValidBalance(this, function (suc, jobj) {
            if (!suc)
                return;
            var valid = jobj.balance;
            var real = Common.userBalance;
            if (valid == real) { //正常进入游戏
                selfGame ? Tools.jump2game(vo.url) : LobbyModel.gotoOhterGame(vo);
            }
            else if (valid > 0 && valid != real) { //先提示玩家再进游戏
                view.dlg.TipsDlg.show("检测到您的账号在之前的游戏中异常退出,部分余额已被锁定,锁定部分余额将在异常退出的游戏结束后恢复", _this, function () {
                    selfGame ? Tools.jump2game(vo.url) : LobbyModel.gotoOhterGame(vo);
                });
            }
            else if (valid == 0 && real > 0) { //提示玩家不能进入游戏
                _this.checkOtherGameErr(_this, function (suc, jobj) {
                    if (suc && vo.id.toString() == jobj) { //进入的是异常退出的三方游戏
                        LobbyModel.gotoOhterGame(vo);
                    }
                    else {
                        view.dlg.TipsDlg.show("检测到您的账号在之前的游戏中异常退出,需要等待游戏结束后才可以进行游戏,请稍后再试。");
                        _this.refreshMoney();
                    }
                });
            }
            else {
                console.error("进入游戏失败：", valid, real);
            }
        });
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
                var counter_1 = 0;
                jobj.forEach(function (data, idx) {
                    if (data.noticeList) {
                        data.noticeList.forEach(function (data) {
                            if (data.bread === false) {
                                counter_1++;
                            }
                        });
                    }
                });
                if (caller && callback)
                    callback.call(caller, Boolean(counter_1 > 0));
            }
        });
    };
    /**
     * 绑定手机相关数据
     */
    LobbyModel.reqBindInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getBindInfo, this, function (suc, jobj) {
            if (suc) {
                GameData.isGetBindAward = !jobj.receive;
                GameData.bindOpen = jobj.bind;
                GameData.bindAward = jobj.reward;
                Common.bindPhoneInfo = jobj;
                EventManager.dispath(EventType.BINDPHONE_INFO);
            }
        });
    };
    /**
     * users
     */
    LobbyModel.reqUserInfo = function () {
        var _this = this;
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.userinfobalance, this, function (suc, jobj) {
            if (suc) {
                Common.userInfo = jobj;
                Common.setLoginPlatform(jobj.loginPlatform);
                EventManager.dispath(EventType.GETUSERS_INFO);
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
     * 余额刷新(获取用户的余额信息包含免转金额的回收)
     * 备注：这个余额为实际余额
     */
    LobbyModel.refreshMoney = function () {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.realBalance, this, function (suc, jobj) {
            if (suc) {
                Common.userBalance = jobj.balance;
                EventManager.dispath(EventType.FLUSH_MONEY);
            }
        });
    };
    /**
     * 获取玩家有效余额(可用余额)
     * 备注：如果是特殊情况,比如玩家进入三方游戏后非正常退出游戏到大厅，这个时候会导致玩家的余额没有从第三方免转回收到大厅
     * 大厅会显示实际余额，但是这个余额又没法正常使用，如果玩家这个时候充值了100，那么这个100就为可使用的有效余额。
     * @param caller
     * @param callback
     */
    LobbyModel.getValidBalance = function (caller, callback) {
        HttpRequester.getHttpData(ConfObjRead.httpCmd.validBalance, this, function (suc, jobj) {
            if (suc) {
                Debug.log("--->>>玩家有效余额：" + jobj.balance);
            }
            else {
                console.error("玩家有效余额查询失败");
            }
            if (caller && callback)
                callback.call(caller, suc, jobj);
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
     * 用于缓存游戏分类列表数据
     */
    LobbyModel.classifyPool = {};
    return LobbyModel;
}());
//# sourceMappingURL=LobbyModel.js.map