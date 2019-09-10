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
    var dlg;
    (function (dlg_1) {
        var agent;
        (function (agent) {
            /**
             * 代理中心二维码放大弹窗
             */
            var AgentQrDlg = /** @class */ (function (_super) {
                __extends(AgentQrDlg, _super);
                function AgentQrDlg() {
                    var _this = _super.call(this) || this;
                    //初始化Logo
                    _this.logoImage.skin = "./brand/login_icon.png";
                    var scaleX = _this.logoBox.width / _this.logoImage.width;
                    var scaleY = _this.logoBox.height / _this.logoImage.height;
                    var scale = Math.min(scaleX, scaleY);
                    _this.logoImage.scale(scale, scale);
                    //海报信息
                    _this.msgLabel.text = "";
                    //保存海报
                    EventManager.addTouchScaleListener(_this.saveBtn, _this, function () {
                        SoundPlayer.clickSound();
                        if (!AgentQrDlg.saveBase64) {
                            AgentQrDlg.saveBase64 = _this.creatShareBase64();
                        }
                        //通知App保存图片
                        PostMHelp.game_common({ do: "saveImage", param: AgentQrDlg.saveBase64 });
                        //关闭界面
                        _this.close(null, true);
                    });
                    //退出
                    EventManager.addTouchScaleListener(_this.closeBtn, _this, function () {
                        SoundPlayer.returnLobbySound();
                        _this.close(null, true);
                    });
                    return _this;
                }
                /**
                 * 打开代理二维码海报弹窗
                 * @param url 二维码链接
                 * @param msg 海报信息
                 */
                AgentQrDlg.show = function (url, msg, nameStr) {
                    var dlg = new AgentQrDlg();
                    //全屏适配
                    dlg.width = Laya.stage.width;
                    //初始化
                    dlg.SetData(url, msg, nameStr);
                    //显示
                    dlg.popup(false, true);
                };
                AgentQrDlg.shareDarw = function (shareobj) {
                    if (AgentModel.shareBase64) {
                        shareobj.base64 = AgentModel.shareBase64;
                        PostMHelp.game_common(shareobj);
                        return;
                    }
                    this.shareObj = shareobj;
                    LayaMain.getInstance().showCircleLoading(true);
                    var arr = PageManager.dlgMap[DlgCmd.agentCenter];
                    var assets = arr[1];
                    var res = Laya.loader.getRes(assets[0]);
                    if (res) {
                        this.checkData();
                    }
                    else {
                        Laya.loader.load(assets, Handler.create(this, this.checkData));
                    }
                };
                AgentQrDlg.checkData = function () {
                    if (!AgentModel.agentInfo) {
                        AgentModel.getAgentInfo(this, this.readAgentInfo);
                    }
                    else {
                        this.readAgentInfo();
                    }
                };
                AgentQrDlg.readAgentInfo = function () {
                    if (!AgentModel.invationVo) {
                        AgentModel.searchAgentInvatCode(this, this.agentDataInited);
                    }
                    else {
                        this.agentDataInited();
                    }
                };
                AgentQrDlg.agentDataInited = function () {
                    var _this = this;
                    LayaMain.getInstance().showCircleLoading(false);
                    if (!AgentModel.agentInfo || !AgentModel.invationVo) {
                        Toast.showToast("分享数据异常,请稍后再试");
                        return;
                    }
                    LayaMain.getInstance().showCircleLoading(true);
                    var data = AgentModel.agentInfo;
                    var invatVo = AgentModel.invationVo;
                    var shareUrl = data.appShareUrl;
                    var user = data.username;
                    var msg = data.appShareTips || "";
                    var inva = "";
                    if (invatVo.length > 0) {
                        inva = invatVo[0].affCode;
                    }
                    if (inva) {
                        shareUrl += ("&affCode=" + inva);
                    }
                    var dlg = new AgentQrDlg();
                    dlg.width = Laya.stage.width;
                    dlg.visible = false;
                    dlg.SetData(shareUrl, msg, user);
                    Laya.timer.once(300, this, function () {
                        LayaMain.getInstance().showCircleLoading(false);
                        AgentModel.shareBase64 = dlg.creatShareBase64(0.5);
                        _this.shareObj.base64 = AgentModel.shareBase64;
                        PostMHelp.game_common(_this.shareObj);
                        dlg.destroy(true);
                    });
                }; //------------------end------------
                //用于分享
                AgentQrDlg.prototype.creatShareBase64 = function (scl) {
                    if (scl === void 0) { scl = 1; }
                    var iw = this.posterNode.width * scl;
                    var ih = this.posterNode.height * scl;
                    this.posterNode.transform = new Laya.Matrix(scl, 0, 0, scl);
                    //
                    var htmlC = this.posterNode.drawToCanvas(iw, ih, 0, 0);
                    var cv = htmlC.getCanvas();
                    var base64 = cv.toDataURL("image/png");
                    //--------debug--------------
                    // let fileName = "222";
                    // let href = base64.replace(/^data:image[^;]*/, "data:image/octet-stream");
                    // let aLink = document.createElement('a');
                    // let fname: string = fileName;
                    // aLink['download'] = fname + "." + "png";
                    // aLink.href = href;
                    // let evt = document.createEvent('MouseEvents');
                    // evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    // aLink.dispatchEvent(evt);
                    return base64;
                };
                AgentQrDlg.prototype.SetData = function (url, msg, str) {
                    //生成二维码
                    var size = 290;
                    var sp = qr.QRCode.create(url, "#000000", size, size, 3);
                    sp.size(size, size);
                    this.qrIcon.addChild(sp);
                    sp.x = (this.qrIcon.width - size) / 2;
                    sp.y = (this.qrIcon.height - size) / 2;
                    this.qrIcon.graphics.drawRect(0, 0, this.qrIcon.width, this.qrIcon.height, "#ffffff");
                    //设置文本信息
                    this.msgLabel.text = msg.toString();
                    //显示分享者账号
                    this.nameTxt.text = str;
                    this.nameBox.width = this.nameTxt.textWidth + 40;
                    this.nameTxt.x = this.nameBox.width - this.nameTxt.width >> 1;
                };
                AgentQrDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                AgentQrDlg.saveBase64 = null;
                return AgentQrDlg;
            }(ui.dlg.agent.AgentQrDlgUI));
            agent.AgentQrDlg = AgentQrDlg;
        })(agent = dlg_1.agent || (dlg_1.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AgentQrDlg.js.map