var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.isAssets = function (a) {
        if (a) {
            return a;
        }
        try {
            throw new Error('Something bad-----shawn');
        }
        catch (e) {
            Debug.log("-------------shawn-----------begin----");
            Debug.log(e);
            Debug.log("-------------shawn-----------end------");
        }
    };
    Tools.splitBetNum = function (num) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var i = 0;
        var last = num;
        var usedCoins = []; // {};
        for (i = (args.length - 1); i >= 0; i--) {
            var ct = Tools.getCountOf(last, args[i]);
            if (i == 0) {
                var u0 = Math.floor(ct);
                usedCoins["" + args[i]] = u0;
            }
            else {
                var use = Math.floor(ct / 2);
                var used = use * args[i];
                last = last - used;
                usedCoins["" + args[i]] = use;
            }
        }
        var arr = [];
        // for(var a in usedCoins)
        for (var a = 0; a < usedCoins.length; a++) {
            var one = usedCoins[a];
            var coins = a;
            var count = one;
            var dd = 0;
            for (dd = 0; dd < count; dd++) {
                arr.push(Number(coins));
            }
        }
        // Debug.log("splitBetNum arr:");
        // Debug.log(arr);
        return arr;
    };
    //总数total，可以被分成多少个single？
    Tools.getCountOf = function (total, single) {
        var ct = total / single;
        // Debug.log("number:"+total+" can be split:"+ct+" single:"+single);
        return ct;
    };
    //切分字符串为单个字符串数组
    Tools.splitString = function (str) {
        // var s = String(str);//'我1234567890';
        // Debug.log("s:"+s);
        // var reg = new RegExp(".{1}","g");
        // var rs = new Array();
        // try{
        //     rs = s.match(reg);
        //     rs.push(s.substring(rs.join('').length));
        // }catch(e){
        //     Debug.log(e);
        // }
        var s = String(str);
        var rs = s.split("");
        return rs;
    };
    //返回当前资源完整路径
    Tools.getSrc = function (src) {
        // return src+"?v="+Common.loadConf.version.value;
        return src;
    };
    //返回当前资源版本地址补充部分
    Tools.getSrcVersion = function () {
        return "?v=" + Common.loadConf.version.value;
    };
    //MyBase64 加解密
    Tools.b64EncodeUnicode = function (str) {
        //1.加密
        var base = new MyBase64();
        var result = base.encode(str);
        return result;
    };
    Tools.b64DecodeUnicode = function (str) {
        var base = new MyBase64();
        //2.解密
        var result2 = base.decode(str);
        return result2;
    };
    //创建html元素
    Tools.newHTMLIframeElement = function (conf) {
        var p = new Laya.HTMLIframeElement(); //无法指定pos及宽高
        p.href = conf.href;
        return p;
        // var p = new Laya.HTMLDivElement();  //无法指定href
        // p.x = conf.pos.x;
        // p.y = conf.pos.y;
        // Debug.log("newHTMLIframeElement conf:");
        // Debug.log(conf);
        // p.pos(conf.pos.x,conf.pos.y);
        // p.size(conf.size.w,conf.size.h);
        // var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
        //    '<foreignObject width="100%" height="100%">' +
        //    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
        //      '<em>I</em> like' + 
        //      '<span style="color:white; text-shadow:0 0 2px blue;">' +
        //      'cheese</span>' +
        //    '</div>' +
        //    '</foreignObject>' +
        //    '</svg>';
        // var DOMURL = window.URL;// || window;//.webkitURL || window;
        // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        // var url = DOMURL.createObjectURL(svg);
        // Debug.log("svg url:"+url);
        // var p = new Laya.Image();
        // p.pos(conf.pos.x,conf.pos.y);
        // p.size(conf.size.w,conf.size.h);
        // // p.skin = url;
        // // var img = new Image();
        // var img = Laya.HTMLImage.create();
        // img.src = url;
        // img.onload = function(p){
        //     Debug.log("svg img loaded");
        //     var tex = new Laya.Texture();
        // }
    };
    //字符串中间部分用星号替代
    Tools.starString = function (str, rep) {
        var s = str;
        var len = str.length;
        var o1 = Math.floor(len / 3); //从1/3处开始替换为星星
        var o2 = o1 * 2;
        var s1 = s.substr(0, o1);
        // Debug.log("0-"+o1+" s1:"+s1);
        var s3 = s.substr(o2, len);
        // Debug.log(o2+"-"+len+" s3:"+s3);
        return s1 + rep + s3;
    };
    Tools.newImage = function (conf) {
        var img = new Laya.Image(conf.href);
        img.pos(conf.pos.x, conf.pos.y);
        img.size(conf.size.w, conf.size.h);
        return img;
    };
    //检测当前平台
    Tools.platformInfo = function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var p = {};
        if (isAndroid) {
            p.os = "Android";
        }
        else if (isiOS) {
            p.os = "IOS";
        }
        else {
            p.os = "other";
        }
        return p;
    };
    //
    Tools.deviceInfo = function () {
        Debug.log("deviceInfo:");
        Debug.log(window['plus']);
        if (window['plus']) {
            Tools.plusReady();
        }
        else {
            document.addEventListener("plusready", Tools.plusReady, false);
        }
    };
    Tools.plusReady = function () {
        Debug.log("plus:");
        Debug.log(window['plus']);
    };
    //跳转到指定地址
    Tools.jump2url = function (url) {
        try {
            var au = url;
            var enUrl = encodeURI(au);
            au = enUrl;
            PostMHelp.jumpToUrl({ au: au });
        }
        catch (e) {
        }
    };
    //过滤游戏目录前的../
    Tools.filterGameDir = function (url) {
        var dir = url;
        var idx = url.indexOf("../");
        if (idx == 0) {
            //需要过滤
            var s = url.substr(3, url.length);
            dir = s;
        }
        Debug.log("Tools.filterGameDir url:" + url + " idx:" + idx + " dir:" + dir);
        return dir;
    };
    //跳转到游戏
    Tools.jump2game = function (urls) {
        try {
            var url = urls;
            var ginfo = Common.getCurGameInfo();
            var backurl = ConfObjRead.getConfUrl().url.backlobby;
            var mainUrl = Tools.getCurFullPath();
            var hostUrl = Tools.getCurHost(mainUrl);
            //将url前头的../去掉
            var dir = Tools.filterGameDir(urls);
            // var jumpUrl = hostUrl+"/"+dir;
            var jumpUrl = ToolsApp.getGameJumpUrl(hostUrl, dir);
            Debug.log("Tools.jump2game jumpUrl:" + jumpUrl);
            var jobj = {};
            if (ginfo && ginfo.alias) {
                if (ginfo.alias == "zjh") {
                    backurl = backurl + "?gameId=" + Common.gameId + "&alias=" + ginfo.alias;
                }
            }
            else {
                ginfo = {
                    alias: "",
                    gameType: "",
                    id: 1,
                    name: "",
                    jumpUrl: true,
                    state: "",
                    url: "",
                    classify: 1,
                    icon: ""
                };
            }
            var domainUrl = AppData.NATIVE_DATA.gameDomain;
            var wssUrl = "";
            if (domainUrl) {
                wssUrl = domainUrl.replace("http", "wss");
                wssUrl = wssUrl.replace("https", "wss");
            }
            jobj = {
                "token": Common.access_token,
                "httpUrl": ConfObjRead.getConfUrl().url.apihome,
                "gameId": Common.gameId,
                "wsUrl": Common.wsUrl,
                "roomId": Common.roomId,
                "backUrl": backurl,
                "alias": ginfo.alias,
                "name": ginfo.name,
                "clientId": Common.clientId,
                "mainUrl": mainUrl,
                "usergateway": AppData.NATIVE_DATA.loginDomain,
                "gamecenter": domainUrl,
                "wss": wssUrl,
                "openDebug": Debug.httpDebug
            };
            Debug.log("lobbyToGame-token=", Common.access_token);
            // Debug.log("Tools.jump2game jobj:");
            // Debug.log(jobj);
            var b = new MyBase64();
            var param = b.encode(JSON.stringify(jobj));
            var au = jumpUrl + "?jumpData=" + param;
            var enUrl = encodeURI(au);
            au = enUrl;
            Debug.log("Tools.jump2game url:" + au);
            //需要关闭声音等暂停操作
            LayaMain.getInstance().onGamePause();
            PostMHelp.jumpToGame({ "payload": au });
        }
        catch (e) {
            Debug.log(e);
        }
    };
    //检查字符串是否存在
    Tools.isHaveString = function (str, instr) {
        var p = instr.indexOf(str);
        if (p >= 0) {
            return true;
        }
        return false;
    };
    //检查头部是否有./字符串
    Tools.isHaveHeadPoint = function (str, instr, len) {
        var ins = instr.substr(0, len);
        var b = Tools.isHaveString(str, ins);
        // Debug.log("Tools.isHaveHeadPoint str:"+str+" instr:"+instr+" len:"+len+" ins:"+ins+" b:"+b);
        // return b;
        if (b) {
            //有，直接返回
            return instr;
        }
        //else{
        //没有，加上再返回
        //}
        return "." + instr;
    };
    Tools.jump2module = function (url, type) {
        try {
            var jobj = {
                "token": Common.access_token,
                "httpUrl": ConfObjRead.getConfUrl().url.apihome,
                "clientId": Common.clientId,
                "backUrl": ConfObjRead.getConfUrl().url.backlobby
            };
            var b = new MyBase64();
            var param = b.encode(JSON.stringify(jobj));
            var au = url;
            if (Tools.isHaveString("?", url)) {
                au = url + "&jumpData=" + param;
            }
            else {
                au = url + "?jumpData=" + param;
            }
            var enUrl = encodeURI(au);
            au = enUrl;
            switch (type) {
                case "account":
                    PostMHelp.game_account(jobj);
                    break;
                case "custom":
                    PostMHelp.game_custom(jobj);
                    break;
                case "recharge": //充值
                    // PostMHelp.game_recharge(jobj);
                    PageManager.showDlg(DlgCmd.recharge);
                    break;
                case "redraw": //提现
                    PostMHelp.game_redraw(jobj);
                    break;
                case "share":
                    PostMHelp.game_share(jobj);
                    break;
            }
        }
        catch (e) {
            Debug.log(e);
        }
    };
    Tools.loadJavaScript = function (src) {
        document.write("<scr" + "ipt src='" + src + "' loader='laya'></scr" + 'ipt>');
    };
    Tools.getHttpName = function (url) {
        var idx = url.indexOf("://");
        if (idx != -1) {
            var h = url.substring(0, idx);
            return h;
        }
        return "http";
    };
    Tools.getFileNameExt = function (str) {
        var lastPoint = str.lastIndexOf(".");
        var name = str.substring(0, lastPoint);
        var ext = str.substring(lastPoint, str.length);
        return { "name": name, "ext": ext };
    };
    Tools.getCurDirPath = function (str) {
        var httpIdx = str.indexOf("http");
        if (httpIdx != -1) {
            return str;
        }
        var url2 = document.URL;
        var lastEnd = url2.lastIndexOf("/");
        var frontStr = url2.substring(0, lastEnd);
        var newurl = "";
        if (!this.isHaveXiegang(frontStr, frontStr.length - 1) && !this.isHaveXiegang(str, 0)) {
            newurl = frontStr + "/" + str;
        }
        else {
            newurl = frontStr + str;
        }
        return newurl;
    };
    Tools.isHaveXiegang = function (str, pos) {
        var cut = str.substring(pos, pos + 1);
        if (cut == "/") {
            return true;
        }
        return false;
    };
    Tools.getCurRootPath = function (str) {
        var httpIdx = str.indexOf("http");
        if (httpIdx != -1) {
            return str;
        }
        var url2 = document.URL;
        Debug.log("url2:" + url2);
        var httpName = Tools.getHttpName(url2);
        Debug.log("httpName:" + httpName);
        var hostname = location.hostname;
        var port = location.port;
        if (port) {
            return httpName + "://" + hostname + ":" + port + "/" + str;
        }
        return httpName + "://" + hostname + "/" + str;
    };
    Tools.getCurHost = function (fullpath) {
        var url4 = window.location.host;
        var idxHttp = fullpath.indexOf("http");
        var idxHttps = fullpath.indexOf("https");
        if (idxHttps == 0) {
            return "https://" + url4;
        }
        else if (idxHttp == 0) {
            return "http://" + url4;
        }
        return url4;
    };
    Tools.getCurFullPath = function () {
        var url2 = document.URL;
        // Debug.log("url2:"+url2);
        // var url3 = window.location;
        // Debug.log("url3:"+url3);
        // var url4 = window.location.host;
        // Debug.log("url4:"+url4);
        return url2;
    };
    Tools.getResRootPath = function (str) {
        var url2 = document.URL;
        Debug.log("url2:" + url2);
        var httpName = Tools.getHttpName(url2);
        Debug.log("httpName:" + httpName);
        var hostname = location.hostname;
        var port = location.port;
        if (port) {
            return httpName + "://" + hostname + ":" + port + "/" + str;
        }
        return httpName + "://" + hostname + "/" + str;
    };
    Tools.substr_cn_2arr = function (str, len) {
        var s = str;
        var reg = new RegExp(".{" + len + "}", "g");
        var rs = new Array();
        try {
            rs = s.match(reg);
            rs.push(s.substring(rs.join('').length));
        }
        catch (e) {
            Debug.log(e);
        }
        return rs;
    };
    Tools.substr_cn = function (str, n) {
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i); //+"...";
            }
        }
        return str;
    };
    /**
     * 变量是否为空
     * @param variable
     */
    Tools.isEmpty = function (data) {
        if (data == null || data.length == 0) {
            return true;
        }
        return false;
    };
    /**
     * 获得请求过来的html参数
     * @param variable
     */
    Tools.getQueryVariable = function (variable) {
        var query = window.location.search.substring(1);
        // Debug.log('getQueryVariable query:'+query);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return undefined;
    };
    /**
     * 获得字符串的hash值
     * @param str 需要被hash的字符串
     */
    Tools.hash = function (str) {
        var hash = 0, i, chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    //是否发生碰撞
    Tools.isCollision = function (sp, pos) {
        return (pos.x >= sp.x && pos.y <= sp.x + sp.width) && (pos.y >= sp.y && pos.y <= sp.y + sp.height);
    };
    //计算两点间距离
    Tools.distanceBy2Point = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        // return 0;
    };
    //当前时间戳
    Tools.getTime = function () {
        var myDate = new Date();
        var MS = myDate.getTime();
        return MS;
    };
    //将时间转换为可读字符串
    Tools.getTimeStr = function (times) {
        var s = Math.floor(times / 100);
        var ss = Math.floor(times % 100);
        var m = Math.floor(s / 60);
        var s = Math.floor(s % 60);
        var m_s = m >= 10 ? "" + m : "0" + m;
        var s_s = s >= 10 ? "" + s : "0" + s;
        var ss_s = ss >= 10 ? "" + ss : "0" + ss;
        // return ""+m+":"+s+":"+ss;
        return m_s + ":" + s_s + ":" + ss_s;
    };
    Tools.isRightUserName = function (content, err_key) {
        if (err_key === void 0) { err_key = null; }
        var err = {
            "bRight": false,
            "msg": "username_ck_err"
        };
        if (err_key != null) {
            err.msg = err_key;
        }
        var reg = new RegExp(Tools.getStringByKey("username_regexp"));
        if (reg.test(content)) {
            err.bRight = true;
        }
        return err;
    };
    Tools.isRightUserNameReg = function (content, err_key) {
        if (err_key === void 0) { err_key = null; }
        var err = {
            "bRight": false,
            "msg": "username_ck_err"
        };
        if (err_key != null) {
            err.msg = err_key;
        }
        var reg = new RegExp(Tools.getStringByKey("username_reg_regexp"));
        if (reg.test(content)) {
            err.bRight = true;
        }
        return err;
    };
    Tools.isRightPwd = function (content, err_key) {
        if (err_key === void 0) { err_key = null; }
        var err = {
            "bRight": false,
            "msg": "pwd_ck_err"
        };
        if (err_key != null) {
            err.msg = err_key;
        }
        var reg = new RegExp(Tools.getStringByKey("pwd_regexp"));
        if (reg.test(content)) {
            err.bRight = true;
        }
        return err;
    };
    Tools.isRightYzm = function (content, err_key) {
        if (err_key === void 0) { err_key = null; }
        var err = {
            "bRight": false,
            "msg": "yzm_ck_err"
        };
        if (err_key != null) {
            err.msg = err_key;
        }
        var reg = new RegExp(Tools.getStringByKey("yzm_regexp"));
        if (reg.test(content)) {
            err.bRight = true;
        }
        return err;
    };
    Tools.isRightInput = function (label, content, err_key) {
        if (err_key === void 0) { err_key = null; }
        var err = {
            "bRight": false,
            "msg": "txt_unknowerr"
        };
        if (err_key != null) {
            err.msg = err_key;
        }
        switch (label) {
            case Tools.INPUT_LABEL_USERNAME:
                return Tools.isRightUserName(content, err_key);
            case Tools.INPUT_LABEL_PWD:
                return Tools.isRightPwd(content, err_key);
            case Tools.INPUT_LABEL_YZM:
                return Tools.isRightYzm(content, err_key);
            default:
                return err;
        }
    };
    Tools.regTest = function (content, regexp, msg, nullmsg) {
        var err = {
            "bRight": true,
            "msg": "txt_unknowerr"
        };
        if (content.length <= 0) {
            err.bRight = false;
            err.msg = nullmsg;
            return err;
        }
        if (regexp != null) {
            var reg = new RegExp(Tools.getStringByKey(regexp));
            if (reg.test(content)) {
                err.bRight = true;
            }
            else {
                err.bRight = false;
                err.msg = msg;
            }
        }
        return err;
    };
    Tools.verifyQuickLogin = function (yzm) {
        var err = {
            "bRight": false,
            "msg": "txt_unknowerr"
        };
        err = Tools.regTest(yzm, null, "", "qklogin_err_yzm_null");
        if (!err.bRight) {
            return err;
        }
        return err;
    };
    Tools.verifyLogin = function (name, pwd, yzm) {
        var err = {
            "bRight": false,
            "msg": "txt_unknowerr"
        };
        err = Tools.regTest(name, null, "", "login_err_username_null");
        if (!err.bRight) {
            return err;
        }
        err = Tools.regTest(pwd, null, "", "login_err_pwd_null");
        if (!err.bRight) {
            return err;
        }
        err = Tools.regTest(yzm, null, "", "login_err_yzm_null");
        if (!err.bRight) {
            return err;
        }
        return err;
    };
    Tools.verifyReg = function (name, pwd, cfpwd, yzm) {
        var err = {
            "bRight": false,
            "msg": "txt_unknowerr"
        };
        err = Tools.regTest(name, "regexp_username_reg", "reg_err_username_format", "reg_err_username_null");
        if (!err.bRight) {
            return err;
        }
        err = Tools.regTest(pwd, "regexp_pwd", "reg_err_pwd_format", "reg_err_pwd_null");
        if (!err.bRight) {
            return err;
        }
        if (cfpwd.length <= 0) {
            err.bRight = false;
            err.msg = "reg_err_cfpwd_null";
            return err;
        }
        if (pwd != cfpwd) {
            err.bRight = false;
            err.msg = "reg_err_cfpwd_notsame";
            return err;
        }
        err = Tools.regTest(yzm, null, "", "reg_err_yzm_null");
        if (!err.bRight) {
            return err;
        }
        return err;
    };
    Tools.verifyChangePw = function (oldpwd, newpwd, cfpwd) {
        var err = {
            "bRight": false,
            "msg": "txt_unknowerr"
        };
        err = Tools.regTest(oldpwd, null, "", "changepwd_err_oldpwd_null");
        if (!err.bRight) {
            return err;
        }
        err = Tools.regTest(newpwd, "regexp_pwd", "changepwd_err_newpwd_format", "changepwd_err_newpwd_null");
        if (!err.bRight) {
            return err;
        }
        if (cfpwd.length <= 0) {
            err.bRight = false;
            err.msg = "changepwd_err_cfpwd_null";
            return err;
        }
        if (newpwd != cfpwd) {
            err.bRight = false;
            err.msg = "changepwd_err_cfpwd_notsame";
            return err;
        }
        // err = Tools.regTest(cfpwd,"pwd_regexp","cfpwd_ck_err");
        // if( !err.bRight )
        // {
        //     return err;
        // }
        return err;
    };
    Tools.getStringByKey = function (key) {
        try {
            var language = ConfObjRead.getConfCommon().language;
            var arr = ConfObjRead.getConfText();
            var curLang = arr[language];
            var len = curLang.length;
            // Debug.log("Tools.getStringByKey key:"+key+" lang:"+language+" len:"+len);
            // Debug.log(curLang);
            for (var i = 0; i < len; i++) {
                var obj = curLang[i];
                if (obj.key == key) {
                    return obj.value;
                }
            }
        }
        catch (e) {
        }
        return key;
    };
    //对字符串进行格式化 0% 表示第一个参数 n% 表示第n个参数
    Tools.FormatString = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var str = format;
        //从format中替换掉所有n%
        for (var i = 0; i < args.length; i++) {
            // Debug.log('args i:'+i+" = "+args[i]);
            str = str.replace(i + "%", args[i]);
        }
        return str;
    };
    //固定字符串长度，不足的后面补rep
    Tools.FormatStringLen = function (str, len, rep) {
        // Debug.log("FormatStringLen str:"+str+" len:"+len+" rep:"+rep);
        while (str.length < len) {
            str += rep;
        }
        // Debug.log("FormatStringLen str:"+str);
        return str;
    };
    //数字限定长度 不足在前面补0
    Tools.FormatNumber = function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    };
    //将数字格式化到小数点后几位
    Tools.FormatFloatNumber = function (num, len) {
        var st = Number(num).toFixed(len);
        return st;
    };
    /**
     * 格式化金币
     * @param num
     * @param len 保留小数位数
     * @param delZero 是否去掉多余的0(默认保留)
     */
    Tools.FormatMoney = function (num, len, delZero) {
        if (len === void 0) { len = 2; }
        if (num < 10000) {
            return this.getFloatStr(num, len, "", delZero);
        }
        var float, dw;
        if (num >= 10000 && num < 100000000) { //万
            float = num / 10000;
            dw = "万";
        }
        else if (num >= 100000000) { //亿
            float = num / 100000000;
            dw = "亿";
        }
        return this.getFloatStr(float, len, dw, delZero);
    };
    Tools.getFloatStr = function (num, len, dw, delZero) {
        if (dw === void 0) { dw = ""; }
        var str, pos;
        var plen, pnum;
        str = num.toString();
        pos = str.indexOf(".");
        if (pos == -1) {
            if (delZero)
                pos = str.length;
            else
                return num.toFixed(len) + dw;
        }
        str = str.substring(0, pos + len + 1);
        if (!delZero) { //补上缺少的0
            plen = str.split(".")[1].length;
            pnum = len - plen;
            for (var i = 0; i < pnum; i++) {
                str += "0";
            }
        }
        return str + dw;
    };
    //计算两点角度
    Tools.getL = function (p1, p2) {
        var x = p1.x - p2.x;
        var y = p1.y - p2.y;
        var l = Math.atan(y / x);
        return l;
    };
    //转换弧度为角度
    Tools.getAngle = function (p1, p2) {
        var l = this.getL(p1, p2);
        var a = this.transl2Angle(l);
        var b = this.transAngle2Positive(a, p1, p2);
        return b;
    };
    //弧度转角度
    Tools.transl2Angle = function (l) {
        return (180 * l) / Math.PI; //弧度转角度
    };
    //检查角度是否为负，如果为负，则转换为正
    Tools.transAngle2Positive = function (angle, p1, p2) {
        //先检查p2在p1的哪个象限
        /*   	  +-90
                    |	-90
            90-	180	|	0-90
        0  --------------------   -0
            180-270	|	270-360
                    |
                  +-90
        */
        //1
        if (p2.x > p1.x && p2.y > p1.y) {
            if (angle >= 0) {
                angle = 360 - angle;
            }
            else {
                angle = 270 - angle;
            }
        }
        //2
        else if (p2.x < p1.x && p2.y > p1.y) {
            if (angle >= 0) {
                angle = 180 + angle;
            }
            else {
                angle = 180 - angle;
            }
        }
        //3
        else if (p2.x < p1.x && p2.y < p1.y) {
            if (angle >= 0) {
                angle = 180 - angle;
            }
            else {
                angle = angle;
            }
        }
        //4
        else if (p2.x > p1.x && p2.y < p1.y) {
            if (angle >= 0) {
                angle = angle;
            }
            else {
                angle = angle * -1;
            }
        }
        return angle;
    };
    Tools.screenFull = function (e) {
        // Debug.log('screenFull e:');
        if (GameData.bClickFullscreen) {
            //检查当前是否全屏状态
            var bFull = false;
            try {
                bFull = window['screenfull'].isFullscreen;
                // Debug.log('screenFull:'+bFull);
                if (bFull) //已经全屏了，就退出全屏
                 {
                    window['screenfull'].exit();
                }
                else { //尚未全屏，就执行全屏
                    window['screenfull'].request();
                }
            }
            catch (e) {
                Debug.log(e);
            }
            GameData.bClickFullscreen = false;
        }
        //同时要复制字符串内容到剪贴板
        // Debug.log('copy string:'+Tools.copy_content);
        if (Tools.copy_content.length > 0) {
            Tools.Copy2Clip(Tools.copy_content);
            Tools.copy_content = "";
        }
    };
    Tools.doFullscreen = function () {
        GameData.bClickFullscreen = true;
    };
    Tools.Copy2Clip = function (url) {
        Debug.log('document:' + document);
        var lis = function (e) {
            Debug.log('url:' + url);
            e.clipboardData.setData('text/plain', url);
            e.preventDefault();
            document.removeEventListener('copy', lis, false);
        };
        document.addEventListener('copy', lis, false);
        // document.addEventListener('copy', (e: ClipboardEvent) => {
        //     Debug.log('url:'+url);
        //     e.clipboardData.setData('text/plain', url);
        //     e.preventDefault();
        //     document.removeEventListener('copy');
        // });
        var bcopy = document.execCommand('copy');
        Debug.log('bcopy:' + bcopy);
    };
    ;
    //复制消息
    Tools.copyMessage = function (val) {
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        var bcopy = document.execCommand('copy');
        // Debug.log('bcopy:'+bcopy);
        document.body.removeChild(selBox);
    };
    //复制文本内容到剪贴板
    //此方法仅用在用户主动点击dom按钮时，不适合小游戏
    //模拟点击也不行
    Tools.copy2clip1 = function (str) {
        // Debug.log('str len:'+str.length);
        if (str.length <= 0) {
            // Debug.log('no copy content');
            return;
        }
        var input = document.createElement('input'); //.getElementById("input");
        document.body.appendChild(input);
        input.value = str; // 修改文本框的内容
        // input.id = 'copyinput';
        input.focus();
        input.select();
        // var js:any = 
        input.setSelectionRange(0, input.value.length);
        // js=input.createTextRange();
        // Debug.log('input:');
        // Debug.log(input);
        try {
            // if( document.execCommand('copy',false,null) )
            // if( js.execCommand("Copy") )
            if (document.execCommand("Copy")) {
                Debug.log('suc');
            }
            else {
                Debug.log('fail');
            }
        }
        catch (err) {
            // Debug.log('copy err:'+err);
        }
        input.remove();
    };
    /**
     * 计算字符长度(这个把所有双字节的都给匹配进去了)
     * 中文长度为2,英文数字为1
     * @param str
     */
    Tools.getStringLength = function (str) {
        return str.replace(/[^\x00-\xff]/g, '__').length;
    };
    /**
     * 去掉右侧空格
     * @param char
     */
    Tools.trimRight = function (char) {
        if (char == null) {
            return null;
        }
        var pattern = /\s*$/;
        return char.replace(pattern, "");
    };
    Tools.INPUT_LABEL_USERNAME = "username";
    Tools.INPUT_LABEL_PWD = "pwd";
    Tools.INPUT_LABEL_YZM = "yzm";
    //当前要复制到剪贴板的内容
    Tools.copy_content = "";
    return Tools;
}());
//# sourceMappingURL=Tools.js.map