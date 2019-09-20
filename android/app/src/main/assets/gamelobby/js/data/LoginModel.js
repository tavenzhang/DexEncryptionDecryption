/**
 * 登录方式
 */
var LoginMethod;
(function (LoginMethod) {
    LoginMethod[LoginMethod["unknown"] = 0] = "unknown";
    LoginMethod[LoginMethod["visitor"] = 1] = "visitor";
    LoginMethod[LoginMethod["wechat"] = 2] = "wechat";
    LoginMethod[LoginMethod["account"] = 3] = "account";
})(LoginMethod || (LoginMethod = {}));
/*
* 登录注册相关数据
*/
var LoginModel = /** @class */ (function () {
    function LoginModel() {
    }
    Object.defineProperty(LoginModel, "isVisitor", {
        /**
         * 获取当前登录是否为游客(非正式账号即为游客)
         */
        get: function () {
            return Boolean(this.loginType != LoginMethod.account);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 读取init-info数据
     * @param isError
     * @param callback
     */
    LoginModel.readGatewayInfo = function (isError, caller, callback, param) {
        var _this = this;
        if (isError === void 0) { isError = false; }
        var info = SaveManager.getObj().get(SaveManager.KEY_GATEWAYINFO, "");
        if (!isError && info) {
            if (!Common.gatewayInfo)
                Common.gatewayInfo = JSON.parse(info);
            eval(Common.gatewayInfo.sec); //将字符串转换为js代码
            return;
        }
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*",
            "device_token", GameUtils.deviceToken,
            "rid", MyUid.getUid(),
            "ts", Laya.Browser.now(),
            "s", "WAP"
        ];
        var url = ConfObjRead.apihome + ConfObjRead.httpCmd.gatewayInfo;
        //获取数据
        HttpRequester.doRequest(url, header, null, this, function (suc, jobj) {
            if (suc) {
                Common.gatewayInfo = jobj;
                Common.gatewayInfo.tsDiff = Common.gatewayInfo.ts - Laya.Browser.now();
                eval(Common.gatewayInfo.sec);
                SaveManager.getObj().save(SaveManager.KEY_GATEWAYINFO, JSON.stringify(Common.gatewayInfo));
                if (caller && callback)
                    callback.call(caller, param);
            }
            else {
                LayaMain.getInstance().showCircleLoading(false);
                if (jobj.http.status == 428) {
                    _this.gatewayCount++;
                    if (_this.gatewayCount <= 3) {
                        _this.readGatewayInfo(true);
                    }
                    else {
                        Toast.showToast("服务异常,请稍后再试!");
                    }
                }
            }
        }, "get");
    };
    /**
     * 通过token登录
     * @param caller
     * @param callback
     */
    LoginModel.loginByToken = function (caller, callback) {
        var _this = this;
        //token信息
        var temp_token = SaveManager.getObj().get(SaveManager.KEY_TOKEN, "");
        var status = Tools.getQueryVariable("status");
        var urlToken = Tools.getQueryVariable("token");
        if (!AppData.IS_NATIVE_APP) { //web端
            if (urlToken != undefined && urlToken.length != 0) {
                temp_token = urlToken;
            }
            Common.clientId = Tools.getQueryVariable("clientId");
            if (!Common.clientId)
                Common.clientId = ConfObjRead.getConfCommon().testClientId;
        }
        //没有缓存token
        if (temp_token.length <= 0 || status == '1') {
            if (caller && callback)
                callback.call(caller, false, temp_token);
            return;
        }
        //调用token登录接口
        var url = ConfObjRead.apihome + ConfObjRead.httpCmd.userinfobalance + "?access_token=" + temp_token;
        HttpRequester.doRequest(url, null, null, this, function (suc, jobj) {
            if (suc) { //登录成功
                Common.userInfo = jobj;
                Common.access_token = temp_token;
                var vo = SaveManager.getObj().get(SaveManager.KEY_LASTLOGININFO, null);
                if (vo)
                    _this.loginType = vo.type;
                else
                    _this.loginType = LoginMethod.unknown;
                SaveManager.getObj().save(SaveManager.KEY_TOKEN, temp_token);
                if (!Common.clientId) {
                    Common.clientId = Common.userInfo.userBalance.clientId;
                }
            }
            if (caller && callback)
                callback.call(caller, suc, temp_token);
        }, "get");
    };
    /**
     * 刷新token
     * @param caller
     * @param callback
     */
    LoginModel.flushToken = function (caller, callback) {
        var flushToken = SaveManager.getObj().get(SaveManager.KEY_FLUSHTOKEN, "");
        if (!flushToken) {
            if (caller && callback)
                callback.call(caller, false);
            return;
        }
        var url = ConfObjRead.apihome;
        url += ConfObjRead.httpCmd.flushToken + flushToken;
        var header = ["Accept", "application/json"];
        HttpRequester.doRequest(url, header, null, this, function (suc, jobj) {
            if (suc) {
                var token = jobj.access_token || "";
                Common.access_token = token;
                SaveManager.getObj().save(SaveManager.KEY_TOKEN, token);
                Debug.log("token刷新成功：", token);
            }
            else {
                //刷新失败,说明后端flushToken已经到期，需要重新登录更新
            }
        }, "get");
    };
    /**
     * 创建游客账号
     * @param caller
     * @param callback
     */
    LoginModel.creatVisitorAccount = function (caller, callback) {
        LayaMain.getInstance().showCircleLoading(true);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*", "device_token", GameUtils.deviceToken];
        var url = ConfObjRead.apihome + ConfObjRead.httpCmd.prequicklogin;
        HttpRequester.doRequest(url, header, null, this, function (suc, jobj) {
            var vo = null;
            if (suc) {
                vo = {
                    user: jobj.username,
                    pwd: jobj.password,
                    type: LoginMethod.visitor
                };
            }
            if (caller && callback)
                callback.call(caller, vo);
        }, "post");
    };
    /**
     * 微信认证
     * @param cType
     */
    LoginModel.weChatCertification = function (cType) {
        this.weChatCertificationType = cType;
        Debug.log("Try wxLogin = " + cType);
        PostMHelp.game_common({ do: "wxLogin", param: "" });
    };
    /**
     * 游客登录
     * @param vo
     * @param caller
     * @param callback
     */
    LoginModel.visitorLogin = function (vo) {
        var _this = this;
        //转圈圈
        LayaMain.getInstance().showCircleLoading(true);
        var cmd = GameUtils.isNativeApp ? ConfObjRead.httpCmd.quicklogin_app : ConfObjRead.httpCmd.quicklogin;
        var epwd = GameUtils.encryptPwd(vo.pwd);
        var obj = {
            username: vo.user,
            password: epwd,
            affCode: GameUtils.affcode
        };
        HttpRequester.postHttpLogin(cmd, obj, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                if (jobj.secureLogin == undefined || jobj.secureLogin == true) { //为强账号，可以直接进入大厅
                    _this.saveLoginInfo(jobj, vo);
                    LayaMain.getInstance().initLobby();
                }
                else {
                    console.error("游客登录失败", vo);
                }
            }
            else {
                if (jobj.http.status == 428) {
                    _this.readGatewayInfo(true);
                }
            }
        });
    };
    /**
     * 微信登录
     * @param vo
     * @param caller
     * @param callback
     */
    LoginModel.wechatLogin = function (wxid) {
        var _this = this;
        var eWxId = window['SecretUtils'].rsaEncodePWD(wxid);
        var data = {
            wxId: eWxId,
            affCode: GameUtils.affcode,
        };
        LayaMain.getInstance().showCircleLoading(true);
        HttpRequester.postHttpLogin(ConfObjRead.httpCmd.wxLogin_app, data, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                var vo = {
                    user: jobj.username,
                    pwd: jobj.autoGenPassword || "",
                    type: LoginMethod.wechat
                };
                _this.saveLoginInfo(jobj, vo);
                LayaMain.getInstance().initLobby(); //登录成功，进入大厅
            }
            else {
                if (jobj.http.status == 428) {
                    _this.readGatewayInfo(true);
                }
            }
        });
    };
    /**
     * 账号登录
     * @param vo
     * @param caller
     * @param callback
     */
    LoginModel.accountLogin = function (vo, caller, callback) {
        var _this = this;
        LayaMain.getInstance().showCircleLoading(true);
        var cmd = GameUtils.isNativeApp ? ConfObjRead.httpCmd.userlogin_app : ConfObjRead.httpCmd.userlogin;
        var epwd = window['SecretUtils'].rsaEncodePWD(vo.pwd);
        var data = {
            username: vo.user,
            password: epwd
        };
        HttpRequester.postHttpLogin(cmd, data, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                var isok = void 0;
                if (jobj.secureLogin == undefined || jobj.secureLogin == true) { //登录成功
                    _this.saveLoginInfo(jobj, vo);
                    isok = true;
                }
                else {
                    Toast.showToast(jobj.message || "未知错误");
                }
                if (caller && callback)
                    callback.call(caller, isok);
            }
            else {
                if (jobj.http.status == 428) {
                    _this.readGatewayInfo(true);
                }
            }
        });
    };
    /**
     * 账户登录-带验证码
     * @param vo
     * @param code
     * @param caller
     * @param callback
     */
    LoginModel.accountLoginWithVC = function (vo, code, caller, callback) {
        var _this = this;
        LayaMain.getInstance().showCircleLoading(true);
        var cmd = GameUtils.isNativeApp ? ConfObjRead.httpCmd.userloginWithVC_app : ConfObjRead.httpCmd.userloginWithVC;
        var epwd = window['SecretUtils'].rsaEncodePWD(vo.pwd);
        var data = {
            username: vo.user,
            password: epwd,
            validateCode: code,
            webUniqueCode: this.codeRandom
        };
        HttpRequester.postHttpLogin(cmd, data, this, function (suc, jobj) {
            LayaMain.getInstance().showCircleLoading(false);
            if (suc) {
                _this.saveLoginInfo(jobj, vo);
            }
            else {
                if (jobj.http.status == 428) {
                    _this.readGatewayInfo(true);
                }
            }
            if (caller && callback)
                callback.call(caller, suc);
        });
    };
    /**
     * 找回密码
     * @param cmd
     * @param data
     * @param caller
     * @param callback
     */
    LoginModel.findPassword = function (cmd, data, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome + cmd;
        var jsonStr = JSON.stringify(data);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        HttpRequester.doRequest(url, header, jsonStr, caller, callback, "post");
    };
    Object.defineProperty(LoginModel, "askCode", {
        /**
         * 刷新验证码
         */
        get: function () {
            this.codeRandom = Math.random();
            var url = ConfObjRead.apihome + ConfObjRead.httpCmd.yanzhengma + "" + this.codeRandom;
            return url;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 游客升级成为了正式账号
     * @param user
     * @param pwd
     */
    LoginModel.visitorToAccount = function (user, pwd) {
        var vo = {
            user: user,
            pwd: pwd,
            type: LoginMethod.account
        };
        this.loginType = LoginMethod.account;
        SaveManager.getObj().set(SaveManager.KEY_VISTORINFO, null);
        SaveManager.getObj().set(SaveManager.KEY_LASTLOGININFO, vo);
        SaveManager.getObj().saveData();
    };
    /**
     * 修改登录密码后需要更新缓存
     * @param newPwd
     */
    LoginModel.changeLoginPwdSuc = function (newPwd) {
        var vo = SaveManager.getObj().get(SaveManager.KEY_LASTLOGININFO, null);
        if (vo) {
            vo.pwd = newPwd;
            SaveManager.getObj().save(SaveManager.KEY_LASTLOGININFO, vo);
            Debug.log("登录密码已修改,更新缓存:", newPwd);
        }
        else {
            console.error("登录密码修改成功,但缓存更新失败");
        }
    };
    //保存登录信息
    LoginModel.saveLoginInfo = function (jobj, vo) {
        Common.loginInfo = jobj;
        Common.access_token = jobj.oauthToken.access_token;
        this.loginType = vo.type;
        var flushToken = jobj.oauthToken.refresh_token; //用于刷新token
        Debug.log("登录成功:", vo);
        SaveManager.getObj().set(SaveManager.KEY_TOKEN, Common.access_token);
        SaveManager.getObj().set(SaveManager.KEY_FLUSHTOKEN, flushToken);
        SaveManager.getObj().set(SaveManager.KEY_LASTLOGININFO, vo);
        if (vo.type == LoginMethod.visitor) { //游客账号单独缓存
            SaveManager.getObj().set(SaveManager.KEY_VISTORINFO, vo);
        }
        SaveManager.getObj().saveData();
        PostMHelp.tokenChange({ "payload": Common.access_token });
    };
    LoginModel.gatewayCount = 0;
    LoginModel.codeRandom = 0;
    return LoginModel;
}());
//# sourceMappingURL=LoginModel.js.map