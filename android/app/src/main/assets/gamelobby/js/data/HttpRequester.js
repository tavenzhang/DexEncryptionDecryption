/*
* 用于请求http数据
*/
var HttpRequester = /** @class */ (function () {
    function HttpRequester() {
    }
    /**
     * 记录日志
     * @param value
     */
    HttpRequester.addLog = function (value) {
        var url = ConfObjRead.apihome + ConfObjRead.httpCmd.logapi;
        var obj = {
            type: "gameLobby",
            owner: Common.clientId,
            user: Common.userInfo_current ? Common.userInfo_current.username : "null",
            value: value
        };
        var jobj = JSON.stringify(obj);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        this.doRequest(url, header, jobj, null, null, "post");
    };
    /**
     * 获取手机验证码
     * @param phone
     * @param isAuthor 是否已授权(未登录前为false)
     * @param type 验证码使用场景
     * @param caller
     * @param callback
     */
    HttpRequester.getPhoneVercode = function (phone, isAuthor, type, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        if (isAuthor) {
            url += ConfObjRead.getConfUrl().cmd.getAuthorVerCode;
            url += "?access_token=" + Common.access_token;
        }
        else
            url += ConfObjRead.getConfUrl().cmd.getunAuthorVerCode;
        var data = {
            phoneNumber: phone,
            smsMsgType: VerCodeType[type]
        };
        var jd = JSON.stringify(data);
        var header = this.getEncryHeader();
        this.doRequest(url, header, jd, caller, callback);
    };
    /**
     * 修改密码(包括登录密码和取款密码)
     * @param pwd
     * @param newpwd
     * @param isSetLoginPwd 是否修改登录密码(否则修改取款密码)
     * @param caller
     * @param callback
     */
    HttpRequester.changePassword = function (pwd, newpwd, isSetLoginPwd, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.changePassword;
        url += "?access_token=" + Common.access_token;
        var header = this.getEncryHeader();
        var ePwd = window['SecretUtils'].rsaEncodePWD(pwd);
        var eNpwd = window['SecretUtils'].rsaEncodePWD(newpwd);
        var data = {
            isWep: !GameUtils.isNativeApp,
            mode: isSetLoginPwd ? "PASSWORD" : "SECURITY_PASSWORD",
            oldPassword: ePwd,
            newPassword: eNpwd
        };
        var jd = JSON.stringify(data);
        this.doRequest(url, header, jd, caller, callback);
    };
    /**
     * 通过手机短信验证修改密码(包括登录密码和取款密码)
     * @param newpwd
     * @param phone
     * @param code
     * @param setLoginPwd
     * @param caller
     * @param callback
     */
    HttpRequester.changePasswordWithPhone = function (newpwd, phone, code, setLoginPwd, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.changePwdWithPhone;
        url += "?access_token=" + Common.access_token;
        var header = this.getEncryHeader();
        var eNpwd = window['SecretUtils'].rsaEncodePWD(newpwd);
        var data = {
            isWep: !GameUtils.isNativeApp,
            mode: setLoginPwd ? "PASSWORD" : "SECURITY_PASSWORD",
            newPassword: eNpwd,
            phoneNumber: phone,
            verificationCode: code
        };
        var jd = JSON.stringify(data);
        this.doRequest(url, header, jd, caller, callback);
    };
    /**
     * 修改持卡人真实姓名
     * @param name
     * @param caller
     * @param callback
     */
    HttpRequester.setRealName = function (name, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.setCardRealName;
        url += "?realName=" + name;
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*", "Authorization", "bearer " + Common.access_token];
        this.doRequest(url, header, null, caller, callback, "put");
    };
    /**
     * 通用get方式请求
     * @param caller
     * @param callback
     */
    HttpRequester.getHttpData = function (cmd, caller, callback, urlParams, headData) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        if (Common.access_token)
            url += "?access_token=" + Common.access_token;
        if (urlParams)
            url += urlParams;
        var header = ["Accept", "application/json"];
        if (headData)
            header = header.concat(headData);
        this.doRequest(url, header, null, caller, callback, "get");
    };
    /**
     * 通用post方式请求
     */
    HttpRequester.postHttpData = function (cmd, data, caller, callback, addHeaderToken) {
        if (data === void 0) { data = null; }
        if (addHeaderToken === void 0) { addHeaderToken = true; }
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        if (Common.access_token)
            url += "?access_token=" + Common.access_token;
        var jsonStr = null;
        if (data)
            jsonStr = JSON.stringify(data);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        if (addHeaderToken && Common.access_token)
            header.push("Authorization", "bearer " + Common.access_token);
        this.doRequest(url, header, jsonStr, caller, callback, "post");
    };
    /**
     * post方式登录专用
     * @param cmd
     * @param data
     * @param caller
     * @param callback
     */
    HttpRequester.postHttpLogin = function (cmd, data, caller, callback) {
        var url = ConfObjRead.apihome + cmd;
        var header = this.getEncryHeader();
        var jsonStr = JSON.stringify(data);
        this.doRequest(url, header, jsonStr, caller, callback);
    };
    /**
     * 通用delete方式请求
     * @param cmd
     * @param caller
     * @param callback
     */
    HttpRequester.deleteHttpData = function (cmd, caller, callback) {
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        if (Common.access_token)
            url += "?access_token=" + Common.access_token;
        var header = ["Accept", "application/json"];
        this.doRequest(url, header, null, caller, callback, "delete");
    };
    /**
     * 通用put方式请求
     * @param cmd
     * @param data
     * @param caller
     * @param callback
     */
    HttpRequester.putHttpData = function (cmd, data, caller, callback) {
        if (data === void 0) { data = null; }
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += cmd;
        if (Common.access_token)
            url += "?access_token=" + Common.access_token;
        var jsonStr = null;
        if (data)
            jsonStr = JSON.stringify(data);
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        if (Common.access_token)
            header.push("Authorization", "bearer " + Common.access_token);
        this.doRequest(url, header, jsonStr, caller, callback, "put");
    };
    /**
     * 开始请求-后续统一走这里方面定位问题
     * @param url
     * @param header
     * @param jsonStr
     * @param caller
     * @param callback
     * @param method
     */
    HttpRequester.doRequest = function (url, header, jsonStr, caller, callback, method, outTimeCallback) {
        if (method === void 0) { method = "post"; }
        this.httpConnect(url, this, function (s, stat, hr) {
            var suc = false;
            var jobj;
            if (stat == "complete") {
                try {
                    jobj = JSON.parse(s);
                }
                catch (e) {
                    jobj = s;
                }
                if (!jobj)
                    jobj = hr; //兼容数据不是json格式的情况
                suc = true;
            }
            else {
                var status_1 = hr.http.status;
                jobj = hr;
                if (status_1 >= 200 && status_1 < 300) { //后端认为此范围为成功
                    suc = true;
                }
                else {
                    Debug.error("request-err:", "\n--->url:" + url, "\n--->header:", header, "\n--->params:", jsonStr, "\n--->http:", hr.http);
                    if (status_1 == 401) {
                        LayaMain.onQuit();
                        Toast.showToast("登录过期,请重新登录");
                        LayaMain.getInstance().showCircleLoading(false);
                        return;
                    }
                    var err = hr.http.response;
                    try {
                        var obj = JSON.parse(err);
                        Toast.showToast(obj.message || ("未知错误:" + status_1));
                    }
                    catch (e) {
                        Toast.showToast("未知错误:" + status_1);
                    }
                }
            }
            if (caller && callback)
                callback.apply(caller, [suc, jobj]);
        }, header, jsonStr, method, "json");
    };
    /**
     * 开始请求
     * @param urls
     * @param caller
     * @param callback
     * @param header
     * @param data
     * @param metod
     * @param restype
     * @param outTimeCallback 请求超时后是否执行回调通知
     */
    HttpRequester.httpConnect = function (urls, caller, callback, header, data, metod, restype, outTimeCallback) {
        if (header === void 0) { header = null; }
        if (data === void 0) { data = null; }
        if (metod === void 0) { metod = "get"; }
        if (restype === void 0) { restype = "json"; }
        var url = urls ? urls : "";
        var hashUrl = url + "_" + JSON.stringify(header ? header : {}) + "_" + JSON.stringify(data ? data : {});
        for (var _i = 0, _a = this.httpRequestList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item && item.hashUrl == hashUrl) {
                return;
            }
        }
        //针对cdnurl接口特殊处理,因为这个接口的数据在response中,和app那边的json数据模式不兼容
        var cndId = urls.indexOf("getCdnUrl");
        //app 使用本地app 代理请求 网页使用原来的
        if (AppData.IS_NATIVE_APP && cndId == -1) {
            var httpData = { hashUrl: hashUrl, caller: caller, callback: callback };
            this.httpRequestList.push(httpData);
            PostMHelp.game_Http({ url: url, header: header, data: data, metod: metod, restype: restype, hashUrl: hashUrl });
            if (view.LoadingView.isLoading) {
                GameUtils.addTimeOut(hashUrl, caller, callback, outTimeCallback);
            }
        }
        else {
            var hr = new Laya.HttpRequest();
            hr.once(Laya.Event.COMPLETE, this, this.httpRequestComplete, [caller, callback, hr, hashUrl]);
            hr.once(Laya.Event.ERROR, this, this.httpRequestError, [caller, callback, hr, hashUrl]);
            if (header) {
                hr.send(url, data, metod, restype, header);
            }
            else {
                hr.send(url, null, metod, restype);
            }
        }
    };
    HttpRequester.httpRequestComplete = function (caller, callback, hr, url, e) {
        callback.apply(caller, [e, 'complete', hr]);
    };
    HttpRequester.httpRequestError = function (caller, callback, hr, url, e) {
        if (hr.http.status == 204) {
            callback.apply(caller, [e, 'complete', hr]);
        }
        else {
            callback.apply(caller, [e, 'error', hr]);
        }
    };
    //获取加密相关的头部信息
    HttpRequester.getEncryHeader = function () {
        return window['SecretUtils'].getEncryHeader(Common.gatewayInfo.tsDiff, MyUid.newUid(), Common.gatewayInfo.sid, GameUtils.deviceToken);
    };
    HttpRequester.httpRequestList = [];
    return HttpRequester;
}());
//# sourceMappingURL=HttpRequester.js.map