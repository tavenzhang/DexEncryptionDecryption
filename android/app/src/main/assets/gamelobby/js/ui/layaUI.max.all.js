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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var anim;
    (function (anim) {
        var lightAnimUI = /** @class */ (function (_super) {
            __extends(lightAnimUI, _super);
            function lightAnimUI() {
                return _super.call(this) || this;
            }
            lightAnimUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.anim.lightAnimUI.uiView);
            };
            lightAnimUI.uiView = { "type": "View", "props": { "width": 300, "height": 300 }, "child": [{ "type": "Image", "props": { "width": 400, "top": 0, "skin": "ui/lobby/lightLbg.png", "scaleY": 1.8, "scaleX": 1.8, "pivotY": 30, "pivotX": 28, "left": 0, "height": 359 }, "compId": 2 }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "x": [{ "value": 50, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }], "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 0 }, { "value": -20, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 20 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 40 }, { "value": 20, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 60 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 80 }], "alpha": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 0 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 20 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 40 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 60 }] } }], "name": "defclip", "id": 1, "frameRate": 24, "action": 0 }] };
            return lightAnimUI;
        }(View));
        anim.lightAnimUI = lightAnimUI;
    })(anim = ui.anim || (ui.anim = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var ClassifyMenuUI = /** @class */ (function (_super) {
            __extends(ClassifyMenuUI, _super);
            function ClassifyMenuUI() {
                return _super.call(this) || this;
            }
            ClassifyMenuUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.ClassifyMenuUI.uiView);
            };
            ClassifyMenuUI.uiView = { "type": "View", "props": { "width": 304, "height": 512 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/lobby/img_dating_fenlei01.png" } }, { "type": "Panel", "props": { "y": 68, "x": 8, "width": 288, "var": "itemPanel", "height": 426 } }] };
            return ClassifyMenuUI;
        }(View));
        comp.ClassifyMenuUI = ClassifyMenuUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var CombBoxViewUI = /** @class */ (function (_super) {
            __extends(CombBoxViewUI, _super);
            function CombBoxViewUI() {
                return _super.call(this) || this;
            }
            CombBoxViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.CombBoxViewUI.uiView);
            };
            CombBoxViewUI.uiView = { "type": "View", "props": { "width": 410, "height": 50 }, "child": [{ "type": "Image", "props": { "y": 0, "var": "combView", "skin": "ui/common/bgcomb.png", "sizeGrid": "20,20,20,20", "right": 0, "left": 0 }, "child": [{ "type": "Panel", "props": { "y": 50, "width": 410, "var": "itemList", "right": 0, "left": 0, "height": 241 } }, { "type": "Box", "props": { "y": 0, "var": "titleBtn", "right": 0, "left": 0, "height": 50 }, "child": [{ "type": "Image", "props": { "var": "arrowBtn", "skin": "ui/common/xialaui.png", "right": 20, "centerY": 0 } }, { "type": "TextInput", "props": { "y": 0, "x": 20, "width": 332, "var": "labelTxt", "valign": "middle", "promptColor": "#93afc0", "prompt": "请选择银行", "height": 50, "fontSize": 30, "color": "#ffffff" } }] }] }] };
            return CombBoxViewUI;
        }(View));
        comp.CombBoxViewUI = CombBoxViewUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var CombItemViewUI = /** @class */ (function (_super) {
            __extends(CombItemViewUI, _super);
            function CombItemViewUI() {
                return _super.call(this) || this;
            }
            CombItemViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.CombItemViewUI.uiView);
            };
            CombItemViewUI.uiView = { "type": "View", "props": { "width": 410, "height": 50 }, "child": [{ "type": "Label", "props": { "x": 10, "width": 390, "var": "labelTxt", "text": "label", "height": 30, "fontSize": 30, "color": "#ffffff", "centerY": 0 } }, { "type": "Rect", "props": { "y": 0, "x": 5, "width": 400, "name": "line", "lineWidth": 1, "height": 1, "fillColor": "#80bfc5" } }] };
            return CombItemViewUI;
        }(View));
        comp.CombItemViewUI = CombItemViewUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var CycleCompUI = /** @class */ (function (_super) {
            __extends(CycleCompUI, _super);
            function CycleCompUI() {
                return _super.call(this) || this;
            }
            CycleCompUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.CycleCompUI.uiView);
            };
            CycleCompUI.uiView = { "type": "View", "props": { "width": 272, "height": 96 } };
            return CycleCompUI;
        }(View));
        comp.CycleCompUI = CycleCompUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var GameIconListPanelUI = /** @class */ (function (_super) {
            __extends(GameIconListPanelUI, _super);
            function GameIconListPanelUI() {
                return _super.call(this) || this;
            }
            GameIconListPanelUI.prototype.createChildren = function () {
                View.regComponent("view.comp.ClassifyMenu", view.comp.ClassifyMenu);
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.GameIconListPanelUI.uiView);
            };
            GameIconListPanelUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Sprite", "props": { "y": 184, "x": 326, "width": 400, "var": "referView", "name": "参考界面", "height": 450 } }, { "type": "ClassifyMenu", "props": { "y": 136, "x": 0, "var": "menu", "runtime": "view.comp.ClassifyMenu" } }] };
            return GameIconListPanelUI;
        }(View));
        comp.GameIconListPanelUI = GameIconListPanelUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var KeyboardViewUI = /** @class */ (function (_super) {
            __extends(KeyboardViewUI, _super);
            function KeyboardViewUI() {
                return _super.call(this) || this;
            }
            KeyboardViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.KeyboardViewUI.uiView);
            };
            KeyboardViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "var": "bgmc", "top": 0, "skin": "ui/common/keyboard01.png", "right": 0, "left": 0, "bottom": 0, "alpha": 0, "sizeGrid": "20,12,20,12" } }, { "type": "Image", "props": { "y": 363, "x": 0, "width": 1334, "var": "numGroup", "skin": "ui/common/keyboard03.png", "sizeGrid": "0,4,0,2", "height": 389 }, "child": [{ "type": "Box", "props": { "y": 90, "centerX": 0 }, "child": [{ "type": "Button", "props": { "width": 342, "var": "btn1", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "1", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "x": 352, "width": 342, "var": "btn2", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "2", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "x": 704, "width": 342, "var": "btn3", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "3", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 75, "width": 342, "var": "btn4", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "4", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 75, "x": 352, "width": 342, "var": "btn5", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "5", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 75, "x": 704, "width": 342, "var": "btn6", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "6", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 149, "width": 342, "var": "btn7", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "7", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 149, "x": 352, "width": 342, "var": "btn8", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "8", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 149, "x": 704, "width": 342, "var": "btn9", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "9", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 224, "width": 342, "var": "btn10", "stateNum": 1, "skin": "ui/common/keyboard02.png", "labelSize": 48, "labelColors": "#000000", "label": ".", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 224, "x": 352, "width": 342, "var": "btn0", "stateNum": 1, "skin": "ui/common/keyboard01.png", "labelSize": 48, "labelColors": "#000000", "label": "0", "height": 65, "sizeGrid": "20,12,20,12" } }, { "type": "Button", "props": { "y": 224, "x": 704, "width": 342, "var": "btn11", "stateNum": 1, "skin": "ui/common/keyboard02.png", "labelSize": 48, "labelColors": "#000000", "height": 65, "sizeGrid": "20,12,20,12" }, "child": [{ "type": "Image", "props": { "y": 17, "x": 150, "skin": "ui/common/keyboard04.png" } }] }] }, { "type": "TextInput", "props": { "y": 13, "width": 500, "var": "inputTxt", "restrict": "0-9.", "promptColor": "#999999", "prompt": "请输入金额", "overflow": "hidden", "height": 50, "fontSize": 44, "editable": false, "color": "#666666", "centerX": 0, "align": "center" } }, { "type": "Label", "props": { "y": 4, "width": 80, "var": "confirmBtn", "valign": "middle", "text": "完成", "right": 28, "height": 72, "fontSize": 30, "color": "#000000", "align": "center" } }] }] };
            return KeyboardViewUI;
        }(View));
        comp.KeyboardViewUI = KeyboardViewUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var NoticeCompUI = /** @class */ (function (_super) {
            __extends(NoticeCompUI, _super);
            function NoticeCompUI() {
                return _super.call(this) || this;
            }
            NoticeCompUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.NoticeCompUI.uiView);
            };
            NoticeCompUI.uiView = { "type": "View", "props": { "width": 658, "height": 48 }, "child": [{ "type": "Image", "props": { "y": 3, "x": 0, "skin": "ui/lobby/img_dating_gonggao01.png" }, "child": [{ "type": "Image", "props": { "y": -3, "x": 2, "skin": "ui/lobby/icon_dt_gg.png" } }] }, { "type": "Sprite", "props": { "y": 0, "x": 55, "width": 578, "var": "msgSp", "height": 48 }, "child": [{ "type": "Text", "props": { "y": 12, "x": 0, "width": 193, "var": "msgTxt", "height": 24, "fontSize": 24, "color": "#e2fefe" } }] }] };
            return NoticeCompUI;
        }(View));
        comp.NoticeCompUI = NoticeCompUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var ToastViewUI = /** @class */ (function (_super) {
            __extends(ToastViewUI, _super);
            function ToastViewUI() {
                return _super.call(this) || this;
            }
            ToastViewUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.ToastViewUI.uiView);
            };
            ToastViewUI.uiView = { "type": "View", "props": { "width": 946, "height": 53 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/common/toastbg.png" } }, { "type": "Text", "props": { "y": 12, "x": 40, "width": 866, "var": "msgTxt", "overflow": "hidden", "height": 28, "fontSize": 28, "color": "#ffffff", "align": "center" } }] };
            return ToastViewUI;
        }(View));
        comp.ToastViewUI = ToastViewUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var UploadTimeBarUI = /** @class */ (function (_super) {
            __extends(UploadTimeBarUI, _super);
            function UploadTimeBarUI() {
                return _super.call(this) || this;
            }
            UploadTimeBarUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.UploadTimeBarUI.uiView);
            };
            UploadTimeBarUI.uiView = { "type": "View", "props": { "width": 156, "height": 156 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/lobby/updatebg.png" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "cirBar", "skin": "ui/lobby/updatebar.png" } }, { "type": "Label", "props": { "var": "jdTxt", "text": "0%", "fontSize": 36, "color": "#ccffff", "centerY": 0, "centerX": 0 } }] };
            return UploadTimeBarUI;
        }(View));
        comp.UploadTimeBarUI = UploadTimeBarUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var UserInfoViewUI = /** @class */ (function (_super) {
            __extends(UserInfoViewUI, _super);
            function UserInfoViewUI() {
                return _super.call(this) || this;
            }
            UserInfoViewUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                View.regComponent("SkeletonPlayer", laya.ani.bone.Skeleton);
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.UserInfoViewUI.uiView);
            };
            UserInfoViewUI.uiView = { "type": "View", "props": { "width": 598, "height": 126 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/lobby/img_dating_upperbar.png", "sizeGrid": "48,534,23,20" }, "child": [{ "type": "Image", "props": { "y": 5, "x": 60, "width": 112, "var": "headIcon", "skin": "ui/headList/icon01.png", "height": 112 } }, { "type": "Image", "props": { "y": 97, "x": 89, "var": "visitorMark", "skin": "ui/common/youke.png" } }, { "type": "Text", "props": { "y": 24, "x": 190, "width": 253, "var": "nameTxt", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffff99" } }, { "type": "Image", "props": { "y": 64, "x": 186, "var": "goldBox", "skin": "ui/lobby/img_dating_shuzidi.png" }, "child": [{ "type": "Image", "props": { "y": 18, "x": 210, "var": "flushBtn", "skin": "ui/lobby/img_dating_anniuchongzhi.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 19, "x": 27, "var": "flushIcon", "skin": "ui/lobby/img_dating_anniuchongzhi2.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 10 }] }, { "type": "SkeletonPlayer", "props": { "y": 21, "x": 16, "width": 0, "var": "goldAnim", "url": "ui/lobby/menu/money_icon.sk", "scaleY": 0.7, "scaleX": 0.7, "height": 0 } }] }] }], "animations": [{ "nodes": [{ "target": 10, "keyframes": { "x": [{ "value": 27, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "x", "index": 0 }], "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "rotation", "index": 0 }, { "value": 360, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "rotation", "index": 30 }] } }], "name": "rotAnim", "id": 1, "frameRate": 24, "action": 0 }] };
            return UserInfoViewUI;
        }(View));
        comp.UserInfoViewUI = UserInfoViewUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var debug;
    (function (debug) {
        var DebugDlgUI = /** @class */ (function (_super) {
            __extends(DebugDlgUI, _super);
            function DebugDlgUI() {
                return _super.call(this) || this;
            }
            DebugDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.debug.DebugDlgUI.uiView);
            };
            DebugDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Text", "props": { "y": 22, "x": 314, "text": "Debug", "height": 40, "fontSize": 40, "color": "#ffffff", "bold": true } }] }, { "type": "Image", "props": { "y": 55, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 215, "x": 172, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "cmdTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 398, "x": 376, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
            return DebugDlgUI;
        }(Dialog));
        debug.DebugDlgUI = DebugDlgUI;
    })(debug = ui.debug || (ui.debug = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AddUserDlgUI = /** @class */ (function (_super) {
                __extends(AddUserDlgUI, _super);
                function AddUserDlgUI() {
                    return _super.call(this) || this;
                }
                AddUserDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AddUserDlgUI.uiView);
                };
                AddUserDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 282, "skin": "ui/agent/img_daili_zi_tianjiayonghu.png" } }, { "type": "Image", "props": { "y": 54, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 109, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 16, "x": 35, "skin": "ui/agent/img_daili_zi_lx.png" } }, { "type": "Image", "props": { "y": 164, "x": 35, "skin": "ui/agent/img_daili_zi_mima.png" } }, { "type": "Image", "props": { "y": 90, "x": 35, "skin": "ui/agent/img_daili_zi_yhm.png" } }, { "type": "Text", "props": { "y": 226, "x": 126, "text": "若不填写密码,则使用初始密码：123456", "fontSize": 25, "color": "#dcb625" } }, { "type": "Image", "props": { "y": 82, "x": 185, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 375, "var": "userTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入用户名", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 156, "x": 185, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 373, "var": "pwdTxt", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 16, "x": 185, "var": "typeIcon", "skin": "ui/agent/img_daili_zi_daili.png" } }] }, { "type": "Image", "props": { "y": 427, "x": 376, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return AddUserDlgUI;
            }(Dialog));
            agent.AddUserDlgUI = AddUserDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AgentHelpViewUI = /** @class */ (function (_super) {
                __extends(AgentHelpViewUI, _super);
                function AgentHelpViewUI() {
                    return _super.call(this) || this;
                }
                AgentHelpViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AgentHelpViewUI.uiView);
                };
                AgentHelpViewUI.uiView = { "type": "View", "props": { "width": 1062, "height": 640 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 1062, "var": "titleTxt", "valign": "top", "text": "label", "height": 40, "fontSize": 25, "color": "#ffba25", "align": "center" } }, { "type": "Panel", "props": { "y": 40, "x": 0, "width": 1062, "var": "itemPanel", "height": 600 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1062, "skin": "ui/agent/img_dlsm-fyblb_nr.png" } }] }] };
                return AgentHelpViewUI;
            }(View));
            agent.AgentHelpViewUI = AgentHelpViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AgentInfoViewUI = /** @class */ (function (_super) {
                __extends(AgentInfoViewUI, _super);
                function AgentInfoViewUI() {
                    return _super.call(this) || this;
                }
                AgentInfoViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AgentInfoViewUI.uiView);
                };
                AgentInfoViewUI.uiView = { "type": "View", "props": { "width": 1018, "height": 620 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 670, "skin": "ui/agent/img_qizhidi.png" }, "child": [{ "type": "Sprite", "props": { "y": 96, "x": 63, "width": 126, "var": "fontBox1", "height": 30 } }, { "type": "Sprite", "props": { "y": 548, "x": 63, "width": 126, "var": "fontBox2", "height": 30 } }, { "type": "Text", "props": { "y": 195, "x": 56, "width": 238, "var": "txt1", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffcc33" } }, { "type": "Text", "props": { "y": 277, "x": 56, "width": 238, "var": "txt2", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffcc33" } }, { "type": "Text", "props": { "y": 365, "x": 52, "width": 95, "var": "txt3", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }, { "type": "Text", "props": { "y": 365, "x": 207, "width": 95, "var": "txt4", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }, { "type": "Text", "props": { "y": 432, "x": 52, "width": 95, "var": "txt5", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }, { "type": "Text", "props": { "y": 432, "x": 207, "width": 95, "var": "txt6", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }] }, { "type": "Box", "props": { "y": 30, "x": 0, "width": 650, "height": 572 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 11, "width": 152, "var": "headIcon", "height": 152 } }, { "type": "Image", "props": { "y": 6, "x": 193, "skin": "ui/agent/img_daili_xinxizi.png", "height": 139 }, "child": [{ "type": "Text", "props": { "y": -1, "x": 93, "width": 200, "var": "referrerTxt", "height": 34, "fontSize": 34, "color": "#efe8cd" } }, { "type": "Text", "props": { "y": 51, "x": 155, "width": 200, "var": "superiorTxt", "height": 34, "fontSize": 34, "color": "#efe8cd" } }, { "type": "Text", "props": { "y": 102, "x": 120, "width": 247, "var": "affcodeTxt", "overflow": "hidden", "height": 34, "fontSize": 34, "color": "#efe8cd" } }, { "type": "Image", "props": { "y": 118, "x": 407, "var": "copyCode", "skin": "ui/agent/img_daili_fuzhi.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 15, "x": 407, "var": "copyAcc", "skin": "ui/agent/img_daili_fuzhi.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 210, "var": "qrbox", "skin": "ui/agent/img_daili_ewm.png" } }, { "type": "Image", "props": { "y": 385, "x": 325, "var": "copyLinkBtn", "skin": "ui/agent/img_daili_fuzhilianjie.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 385, "x": 545, "var": "wechatBtn", "skin": "ui/agent/img_daili_weixinfenxiang.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 266, "x": 233, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "Text", "props": { "y": 8, "x": 21, "width": 368, "var": "linkTxt", "valign": "middle", "overflow": "hidden", "fontSize": 34, "color": "#efe8cd" } }, { "type": "Text", "props": { "y": -56, "x": 1, "text": "分享链接发给好友下载游戏", "fontSize": 34, "font": "SimHei", "color": "#ebeff0" } }] }, { "type": "Image", "props": { "y": 442, "x": 0, "skin": "ui/agent/img_daili-wenxianzi02.png" } }] }] };
                return AgentInfoViewUI;
            }(View));
            agent.AgentInfoViewUI = AgentInfoViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AgentQrDlgUI = /** @class */ (function (_super) {
                __extends(AgentQrDlgUI, _super);
                function AgentQrDlgUI() {
                    return _super.call(this) || this;
                }
                AgentQrDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AgentQrDlgUI.uiView);
                };
                AgentQrDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Box", "props": { "width": 1334, "var": "posterNode", "height": 750, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -145, "var": "bgImage", "skin": "ui/agent/qrposter/img_dlewm_bg2.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 130, "x": 1003, "top": 130, "skin": "ui/agent/qrposter/img_dlewm_f-sys.png", "right": 111 } }, { "type": "Image", "props": { "y": 216, "x": 365, "var": "gameImage", "skin": "ui/agent/qrposter/img_dlewm_icon4.png" } }, { "type": "Image", "props": { "y": 36, "x": -3, "var": "girlImage", "skin": "ui/agent/qrposter/img_dlewm_mn1.png" } }, { "type": "Image", "props": { "y": 666, "x": 332, "skin": "ui/agent/qrposter/img_dlewm_f-wmk.png", "left": 332, "bottom": 16 } }, { "type": "Box", "props": { "y": 19, "x": 411, "width": 507, "var": "logoBox", "top": 19, "left": 411, "height": 191 }, "child": [{ "type": "Image", "props": { "var": "logoImage", "centerY": 0, "centerX": 0 } }] }, { "type": "Label", "props": { "x": 448, "wordWrap": true, "width": 475, "var": "msgLabel", "valign": "middle", "top": 200, "skewX": -10, "pivotX": -2, "height": 88, "fontSize": 44, "font": "Microsoft YaHei", "color": "#fbe66f", "bold": false, "align": "center" } }, { "type": "Image", "props": { "y": 217, "x": 942, "width": 326, "var": "qrIcon", "top": 217, "right": 66, "height": 326 } }, { "type": "Image", "props": { "y": 360, "x": 1045, "width": 120, "var": "nameBox", "skin": "ui/agent/qrposter/bsbg.png", "height": 40, "alpha": 0.8 }, "child": [{ "type": "Text", "props": { "y": 10, "x": 8, "width": 104, "var": "nameTxt", "text": "xxx", "height": 20, "fontSize": 20, "color": "#000000", "align": "center" } }] }] }, { "type": "Box", "props": { "width": 1334, "var": "ctrlNode", "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 558, "x": 996, "var": "saveBtn", "top": 558, "skin": "ui/agent/qrposter/btn_dlewm_yjbc.png", "right": 119 } }, { "type": "Image", "props": { "y": 57, "x": 1254, "var": "closeBtn", "top": 17, "skin": "ui/common/newclose.png", "right": 42, "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return AgentQrDlgUI;
            }(Dialog));
            agent.AgentQrDlgUI = AgentQrDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CommisionRatioDlgUI = /** @class */ (function (_super) {
                __extends(CommisionRatioDlgUI, _super);
                function CommisionRatioDlgUI() {
                    return _super.call(this) || this;
                }
                CommisionRatioDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CommisionRatioDlgUI.uiView);
                };
                CommisionRatioDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 21, "x": 404, "skin": "ui/agent/img_dlsm-fyblb_fyblb.png" } }, { "type": "Image", "props": { "y": 50, "x": 989, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 99, "x": 20, "width": 993, "skin": "ui/common/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 510, "centerX": -1 } }, { "type": "Panel", "props": { "y": 157, "x": 23, "width": 988, "var": "itemPanel", "height": 449 } }, { "type": "Image", "props": { "y": 99, "x": 23, "skin": "ui/agent/img_dlsm-fyblb_bt.png" } }] };
                return CommisionRatioDlgUI;
            }(Dialog));
            agent.CommisionRatioDlgUI = CommisionRatioDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CommisionRecordDlgUI = /** @class */ (function (_super) {
                __extends(CommisionRecordDlgUI, _super);
                function CommisionRecordDlgUI() {
                    return _super.call(this) || this;
                }
                CommisionRecordDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CommisionRecordDlgUI.uiView);
                };
                CommisionRecordDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/maxdlg.png" } }, { "type": "Image", "props": { "y": 18, "skin": "ui/agent/img_tyjl_tyjl.png", "centerX": 8 } }, { "type": "Image", "props": { "y": 99, "width": 970, "skin": "ui/common/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 425, "centerX": 0 } }, { "type": "Image", "props": { "y": 109, "var": "order_dummy", "skin": "ui/agent/img_tyjl_kuang.png", "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 11, "x": 435, "skin": "ui/agent/img_daili_fuzhi.png", "name": "copy" } }, { "type": "Label", "props": { "y": 10, "x": 35, "width": 150, "valign": "middle", "text": "订单号：", "name": "orderlabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 10, "x": 188, "width": 279, "valign": "middle", "text": "-", "name": "order", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 49, "x": 35, "width": 150, "valign": "middle", "text": "创建时间：", "name": "timelabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 49, "x": 188, "width": 279, "valign": "middle", "text": "-", "name": "time", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 14, "x": 700, "width": 114, "text": "状态：", "name": "statuslabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 14, "x": 803, "width": 85, "text": "-", "name": "status", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "left" } }, { "type": "Label", "props": { "y": 42, "x": 701, "width": 179, "valign": "middle", "text": "0 元", "name": "amount", "height": 44, "fontSize": 36, "font": "Microsoft YaHei", "color": "#a2e1ee", "align": "right" } }] }, { "type": "View", "props": { "y": 100, "x": 31, "width": 970, "var": "contents", "height": 420 }, "child": [{ "type": "Label", "props": { "y": 105, "x": 0, "width": 970, "var": "instructions", "valign": "middle", "text": "您目前无任何提佣记录", "height": 100, "fontSize": 24, "font": "Microsoft YaHei", "color": "#9cc5d8", "align": "center" } }] }, { "type": "Image", "props": { "y": 51, "x": 985, "var": "btnClose", "top": 12, "skin": "ui/common/newclose.png", "right": 10, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 575, "x": 915, "var": "btnContact", "skin": "ui/agent/b_tyjl_lxkf.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 527, "x": 38, "width": 713, "valign": "middle", "text": "提示：如对佣金结算有疑问，请联系客服", "height": 96, "fontSize": 24, "font": "Microsoft YaHei", "color": "#f9cb46" } }] };
                return CommisionRecordDlgUI;
            }(Dialog));
            agent.CommisionRecordDlgUI = CommisionRecordDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CRatioItemUI = /** @class */ (function (_super) {
                __extends(CRatioItemUI, _super);
                function CRatioItemUI() {
                    return _super.call(this) || this;
                }
                CRatioItemUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CRatioItemUI.uiView);
                };
                CRatioItemUI.uiView = { "type": "View", "props": { "width": 984, "height": 41 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bgIcon", "skin": "ui/agent/img_dlsm-fyblb_xzk.png" } }, { "type": "Label", "props": { "y": 2, "x": 115, "width": 104, "var": "numTxt", "valign": "middle", "text": "0", "height": 36, "fontSize": 28, "color": "#efe8cd", "align": "center" } }, { "type": "Label", "props": { "y": 2, "x": 244, "width": 331, "var": "rangeTxt", "valign": "middle", "text": "0", "height": 36, "fontSize": 28, "color": "#efe8cd", "align": "center" } }, { "type": "Label", "props": { "y": 2, "x": 575, "width": 261, "var": "paysTxt", "valign": "middle", "text": "0", "height": 36, "fontSize": 28, "color": "#ffba25", "align": "center" } }, { "type": "Label", "props": { "y": 2, "x": 835, "width": 146, "var": "blTxt", "valign": "middle", "text": "0", "height": 36, "fontSize": 28, "color": "#ffba25", "align": "center" } }] };
                return CRatioItemUI;
            }(View));
            agent.CRatioItemUI = CRatioItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CreatInviteCodeDlgUI = /** @class */ (function (_super) {
                __extends(CreatInviteCodeDlgUI, _super);
                function CreatInviteCodeDlgUI() {
                    return _super.call(this) || this;
                }
                CreatInviteCodeDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CreatInviteCodeDlgUI.uiView);
                };
                CreatInviteCodeDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 282, "skin": "ui/agent/img_daili_zi_yaoqingma.png" } }, { "type": "Image", "props": { "y": 386, "x": 272, "var": "okBtn", "skin": "ui/common/queding.png" } }, { "type": "Image", "props": { "y": 103, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 274, "sizeGrid": "15,15,15,16" } }, { "type": "Image", "props": { "y": 55, "x": 708, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 162, "x": 172, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "a-z0-9", "promptColor": "#93afc0", "prompt": "4-12位字母或数字", "maxChars": 12, "height": 46, "fontSize": 30, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 281, "x": 376, "var": "creatBtn", "skin": "ui/agent/img_daili_dianjixuanma.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return CreatInviteCodeDlgUI;
            }(Dialog));
            agent.CreatInviteCodeDlgUI = CreatInviteCodeDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var DirectlyItemUI = /** @class */ (function (_super) {
                __extends(DirectlyItemUI, _super);
                function DirectlyItemUI() {
                    return _super.call(this) || this;
                }
                DirectlyItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.DirectlyItemUI.uiView);
                };
                DirectlyItemUI.uiView = { "type": "View", "props": { "width": 1014, "height": 58 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "itemBg", "skin": "ui/agent/img_daili_tiaodibian01.png" }, "child": [{ "type": "Text", "props": { "y": 16, "x": 6, "width": 238, "var": "dtxt1", "text": "name", "overflow": "hidden", "height": 26, "fontSize": 26, "color": "#9cc5d8" } }, { "type": "Text", "props": { "y": 16, "x": 244, "width": 81, "var": "dtxt2", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 327, "width": 216, "var": "dtxt3", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 553, "width": 216, "var": "dtxt4", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 772, "width": 118, "var": "dtxt5", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 895, "width": 118, "var": "dtxt6", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }] }] };
                return DirectlyItemUI;
            }(View));
            agent.DirectlyItemUI = DirectlyItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var DirectlyViewUI = /** @class */ (function (_super) {
                __extends(DirectlyViewUI, _super);
                function DirectlyViewUI() {
                    return _super.call(this) || this;
                }
                DirectlyViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.DirectlyViewUI.uiView);
                };
                DirectlyViewUI.uiView = { "type": "View", "props": { "width": 1014, "height": 620 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 460, "skin": "ui/common/shurukuang.png", "height": 58, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 6, "x": 15, "width": 297, "var": "inputTxt", "valign": "middle", "type": "text", "promptColor": "#9cc5d8", "prompt": "请输入代理的用户名", "overflow": "hidden", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 30, "x": 388, "var": "seachBtn", "skin": "ui/agent/btn_daili_sousuokuang.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 1, "x": 500, "var": "addBtn", "skin": "ui/agent/btn_daili_tianjiayonghu.png" } }, { "type": "Image", "props": { "y": 78, "x": 0, "skin": "ui/agent/img_daili_tou_zhishu.png" } }, { "type": "Panel", "props": { "y": 128, "x": 0, "width": 1014, "var": "itemPanel", "height": 484 } }] };
                return DirectlyViewUI;
            }(View));
            agent.DirectlyViewUI = DirectlyViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var EnterpriseItemUI = /** @class */ (function (_super) {
                __extends(EnterpriseItemUI, _super);
                function EnterpriseItemUI() {
                    return _super.call(this) || this;
                }
                EnterpriseItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.EnterpriseItemUI.uiView);
                };
                EnterpriseItemUI.uiView = { "type": "View", "props": { "width": 1014, "height": 58 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bgIcon", "skin": "ui/agent/img_daili_tiaodibian01.png" }, "child": [{ "type": "Text", "props": { "y": 16, "x": 2, "width": 193, "var": "etxt2", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 302, "width": 216, "var": "etxt3", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 192, "width": 114, "var": "etxt4", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 522, "width": 103, "var": "etxt5", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 634, "width": 204, "var": "etxt6", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 849, "width": 162, "var": "etxt1", "text": "xxx", "overflow": "scroll", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }] }] };
                return EnterpriseItemUI;
            }(View));
            agent.EnterpriseItemUI = EnterpriseItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var EnterpriseViewUI = /** @class */ (function (_super) {
                __extends(EnterpriseViewUI, _super);
                function EnterpriseViewUI() {
                    return _super.call(this) || this;
                }
                EnterpriseViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.EnterpriseViewUI.uiView);
                };
                EnterpriseViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1014, "height": 620 }, "child": [{ "type": "CheckBox", "props": { "y": 0, "x": 0, "var": "check1", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_jinri.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 209, "var": "check2", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_zuori.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 419, "var": "check3", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_benzhou.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 628, "var": "check4", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_shangzhou.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 837, "var": "check5", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_benyue.png" } }] }, { "type": "Image", "props": { "y": 74, "x": 0, "skin": "ui/agent/img_daili_tou_wdyj.png" } }, { "type": "Panel", "props": { "y": 124, "x": 0, "width": 1014, "var": "itemPanel", "height": 486 } }] };
                return EnterpriseViewUI;
            }(View));
            agent.EnterpriseViewUI = EnterpriseViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var InviteCodeItemUI = /** @class */ (function (_super) {
                __extends(InviteCodeItemUI, _super);
                function InviteCodeItemUI() {
                    return _super.call(this) || this;
                }
                InviteCodeItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.InviteCodeItemUI.uiView);
                };
                InviteCodeItemUI.uiView = { "type": "View", "props": { "width": 1014, "height": 130 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/agent/img_daili_ewm_ditiao.png" } }, { "type": "Image", "props": { "y": 19, "x": 714, "width": 96, "var": "qrIcon", "height": 96 } }, { "type": "Label", "props": { "y": 19, "x": 265, "width": 386, "var": "linkTxt", "text": "label", "overflow": "hidden", "mouseEnabled": false, "height": 34, "fontSize": 34, "color": "efe8cd" } }, { "type": "Text", "props": { "y": 52, "x": 4, "width": 226, "var": "codeTxt", "text": "text", "overflow": "hidden", "height": 26, "fontSize": 26, "color": "ffba25", "align": "center" } }, { "type": "Image", "props": { "y": 95, "x": 354, "width": 138, "var": "copyBtn", "skin": "ui/agent/img_daili_fuzhilianjie.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 65, "x": 932, "var": "delBtn", "skin": "ui/agent/img_daili_shanchuewm.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 95, "x": 558, "width": 138, "var": "shareBtn", "skin": "ui/agent/img_daili_weixinfenxiang.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }] };
                return InviteCodeItemUI;
            }(View));
            agent.InviteCodeItemUI = InviteCodeItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var InviteCodeViewUI = /** @class */ (function (_super) {
                __extends(InviteCodeViewUI, _super);
                function InviteCodeViewUI() {
                    return _super.call(this) || this;
                }
                InviteCodeViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.InviteCodeViewUI.uiView);
                };
                InviteCodeViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1014, "height": 620 }, "child": [{ "type": "Image", "props": { "y": 28, "x": 104, "var": "creatBtn", "skin": "ui/agent/img_daili_shengcheng.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 76, "x": 0, "skin": "ui/agent/img_daili_tou_ewm.png" } }, { "type": "Panel", "props": { "y": 132, "x": 0, "width": 1014, "var": "itemPanel", "height": 482 } }] };
                return InviteCodeViewUI;
            }(View));
            agent.InviteCodeViewUI = InviteCodeViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var AgentCenterDlgUI = /** @class */ (function (_super) {
            __extends(AgentCenterDlgUI, _super);
            function AgentCenterDlgUI() {
                return _super.call(this) || this;
            }
            AgentCenterDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.AgentCenterDlgUI.uiView);
            };
            AgentCenterDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "width": 695, "var": "topRightGroup", "right": -55, "height": 92 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 695, "width": 292, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 46, "x": 353, "var": "recordBtn", "skin": "ui/agent/b_dlzx_tyjl.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 45, "x": 120, "var": "rebateBtn", "skin": "ui/agent/b_dlzx_fyblb.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 0, "var": "topLeftGroup", "left": -40 }, "child": [{ "type": "Image", "props": { "y": 87, "x": 0, "skin": "ui/panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Image", "props": { "y": 42, "x": 305, "var": "tab0", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi05.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi010.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 152, "x": 305, "var": "tab1", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi04.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 78, "skin": "ui/agent/img_daili_zi09.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 262, "x": 305, "var": "tab2", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi03.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi08.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 371, "x": 305, "var": "tab3", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi02.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi07.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 481, "x": 305, "var": "tab4", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi01.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi06.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }] }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 482, "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 50, "skin": "ui/agent/icon_dlzx_bt.png" } }, { "type": "Image", "props": { "y": 27, "x": 165, "skin": "ui/agent/img_daili_biaotou02.png" } }] }] }, { "type": "Box", "props": { "y": 88, "width": 900, "var": "viewBox", "height": 660, "centerX": 136 } }] };
            return AgentCenterDlgUI;
        }(Dialog));
        dlg.AgentCenterDlgUI = AgentCenterDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var AccessDetailDlgUI = /** @class */ (function (_super) {
                __extends(AccessDetailDlgUI, _super);
                function AccessDetailDlgUI() {
                    return _super.call(this) || this;
                }
                AccessDetailDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.AccessDetailDlgUI.uiView);
                };
                AccessDetailDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 414, "skin": "ui/balance/subres/img_yeb-cqmx_cqmx.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 98, "x": 31, "width": 972, "skin": "ui/common/img_com_xiankuang.png", "height": 506, "sizeGrid": "15,15,15,16" } }, { "type": "Image", "props": { "y": 98, "x": 31, "skin": "ui/balance/subres/btn_yeb-cqmx_kuang.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 244, "var": "tab2", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-cr.png" } }, { "type": "Image", "props": { "y": 0, "x": 728, "var": "tab4", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-cy.png" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "tab1", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-qb.png" } }, { "type": "Image", "props": { "y": 0, "x": 486, "var": "tab3", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-qc.png" } }] }, { "type": "List", "props": { "y": 158, "x": 41, "width": 952, "var": "itemList", "height": 440 } }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 1034, "var": "descGroup", "height": 630 }, "child": [{ "type": "Image", "props": { "y": -93, "x": -70, "width": 757, "var": "mkmc", "skin": "ui/balance/img_dlzx-dlxx_bc.png", "sizeGrid": "45,37,43,41", "height": 259, "centerY": 0, "centerX": 0, "alpha": 0 } }, { "type": "Image", "props": { "width": 640, "var": "descBg", "skin": "ui/balance/img_dlzx-dlxx_bc.png", "sizeGrid": "50,44,49,39", "height": 120, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "wordWrap": true, "width": 578, "var": "infoTxt", "text": "xxx", "fontSize": 24, "color": "#a2e1ee", "centerY": 0, "centerX": 0, "align": "center" } }] }] }] };
                return AccessDetailDlgUI;
            }(Dialog));
            balance.AccessDetailDlgUI = AccessDetailDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var BalanceChangePwdDlgUI = /** @class */ (function (_super) {
                __extends(BalanceChangePwdDlgUI, _super);
                function BalanceChangePwdDlgUI() {
                    return _super.call(this) || this;
                }
                BalanceChangePwdDlgUI.prototype.createChildren = function () {
                    View.regComponent("ui.dlg.balance.SetPwdViewUI", ui.dlg.balance.SetPwdViewUI);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.BalanceChangePwdDlgUI.uiView);
                };
                BalanceChangePwdDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 266, "skin": "ui/balance/subres/img_yeb-mm_mm.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "SetPwdView", "props": { "y": 105, "x": 21, "var": "pwdView", "runtime": "ui.dlg.balance.SetPwdViewUI" } }] };
                return BalanceChangePwdDlgUI;
            }(Dialog));
            balance.BalanceChangePwdDlgUI = BalanceChangePwdDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var BalanceHelpDlgUI = /** @class */ (function (_super) {
                __extends(BalanceHelpDlgUI, _super);
                function BalanceHelpDlgUI() {
                    return _super.call(this) || this;
                }
                BalanceHelpDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.BalanceHelpDlgUI.uiView);
                };
                BalanceHelpDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 17, "x": 453, "skin": "ui/balance/subres/img_yeb-bz_bz.png" } }, { "type": "Image", "props": { "y": 48, "x": 990, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 106, "x": 31, "width": 972, "skin": "ui/common/img_com_xiankuang.png", "height": 500, "sizeGrid": "15,15,15,16" } }, { "type": "Panel", "props": { "y": 110, "x": 37, "width": 960, "var": "infoPanel", "height": 490 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 12, "skin": "ui/balance/subres/img_yeb-bz_nr.png" } }] }] };
                return BalanceHelpDlgUI;
            }(Dialog));
            balance.BalanceHelpDlgUI = BalanceHelpDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var BalancePwdDlgUI = /** @class */ (function (_super) {
                __extends(BalancePwdDlgUI, _super);
                function BalancePwdDlgUI() {
                    return _super.call(this) || this;
                }
                BalancePwdDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.BalancePwdDlgUI.uiView);
                };
                BalancePwdDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 266, "skin": "ui/balance/subres/img_yeb-mm_mm.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 63, "x": 30, "skin": "ui/balance/subres/img_yeb-mm_f-szmm.png" } }, { "type": "Image", "props": { "y": 159, "x": 30, "skin": "ui/balance/subres/img_yeb-mm_f-qrmm.png" } }, { "type": "Image", "props": { "y": 52, "x": 180, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 336, "var": "pwdTxt1", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入密码(6位数字)", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 148, "x": 180, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt2", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Image", "props": { "y": 424, "x": 376, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return BalancePwdDlgUI;
            }(Dialog));
            balance.BalancePwdDlgUI = BalancePwdDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var DetailItemViewUI = /** @class */ (function (_super) {
                __extends(DetailItemViewUI, _super);
                function DetailItemViewUI() {
                    return _super.call(this) || this;
                }
                DetailItemViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.DetailItemViewUI.uiView);
                };
                DetailItemViewUI.uiView = { "type": "View", "props": { "width": 952, "height": 78 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/balance/subres/img_czmx_dk023.png", "sizeGrid": "20,0,20,0", "height": 78 } }, { "type": "Text", "props": { "y": 19, "x": 42, "width": 91, "var": "txt1", "text": "存入", "height": 40, "fontSize": 40, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 16, "x": 152, "width": 239, "var": "txt2", "height": 24, "fontSize": 24, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 46, "x": 152, "width": 239, "var": "txt3", "height": 24, "fontSize": 22, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 10, "x": 779, "width": 150, "var": "txt4", "height": 32, "fontSize": 32, "color": "#ff1b1b" } }, { "type": "Text", "props": { "y": 42, "x": 636, "width": 135, "text": "余额宝总额 :", "height": 24, "fontSize": 24, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 42, "x": 779, "width": 150, "var": "txt5", "overflow": "hidden", "height": 24, "fontSize": 24, "color": "#a2e1ee" } }, { "type": "Image", "props": { "y": 39, "x": 464, "var": "descBtn", "skin": "ui/common/tishi.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return DetailItemViewUI;
            }(View));
            balance.DetailItemViewUI = DetailItemViewUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var SetPwdViewUI = /** @class */ (function (_super) {
                __extends(SetPwdViewUI, _super);
                function SetPwdViewUI() {
                    return _super.call(this) || this;
                }
                SetPwdViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.SetPwdViewUI.uiView);
                };
                SetPwdViewUI.uiView = { "type": "View", "props": { "width": 712, "height": 380 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 712, "skin": "ui/common/img_com_xiankuang.png", "height": 276, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Box", "props": { "y": 60, "x": 63, "var": "panel1" }, "child": [{ "type": "Image", "props": { "y": 11, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-jmm.png" } }, { "type": "Image", "props": { "y": 86, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-szmm.png" } }, { "type": "Image", "props": { "y": 160, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-qrmm.png" } }, { "type": "Image", "props": { "y": 0, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入旧密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 75, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt2", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入新密码(6位数字)", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 149, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt3", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn3", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Box", "props": { "y": 56, "x": 63, "width": 586, "var": "panel2", "height": 217 }, "child": [{ "type": "Image", "props": { "y": 118, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-srmm.png" } }, { "type": "Image", "props": { "y": 172, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-qrmm.png" } }, { "type": "Image", "props": { "y": 78, "x": 487, "skin": "ui/common/yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "timeTxt", "text": 0, "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 78, "x": 487, "var": "getCodeBtn", "skin": "ui/common/yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 65, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-yzm.png" } }, { "type": "Image", "props": { "y": 11, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-sjh.png" } }, { "type": "Image", "props": { "y": 0, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 378, "var": "phoneTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 107, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt4", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn4", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 161, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt5", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn5", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 54, "x": 176, "width": 196, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 168, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }] }, { "type": "Image", "props": { "y": 323, "x": 356, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 5, "x": 52, "var": "checkGroup1" }, "child": [{ "type": "Image", "props": { "y": 8, "x": 57, "skin": "ui/balance/subres/img_yeb-mm_f-jmmxg.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "var": "checkBtn1", "stateNum": 2, "skin": "ui/balance/subres/check_pwd.png", "selected": false, "height": 42 } }] }, { "type": "Box", "props": { "y": 5, "x": 413, "var": "checkGroup2" }, "child": [{ "type": "Image", "props": { "y": 8, "x": 57, "skin": "ui/balance/subres/img_yeb-mm_f-dxyz.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "var": "checkBtn2", "stateNum": 2, "skin": "ui/balance/subres/check_pwd.png", "height": 42 } }] }] }] };
                return SetPwdViewUI;
            }(View));
            balance.SetPwdViewUI = SetPwdViewUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var UserAuthenDlgUI = /** @class */ (function (_super) {
                __extends(UserAuthenDlgUI, _super);
                function UserAuthenDlgUI() {
                    return _super.call(this) || this;
                }
                UserAuthenDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.UserAuthenDlgUI.uiView);
                };
                UserAuthenDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 281, "skin": "ui/balance/subres/img_yeb-sfyz_sfyz.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" } }, { "type": "Image", "props": { "y": 262, "x": 172, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 336, "var": "pwdTxt", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入密码(6位数字)", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Text", "props": { "y": 188, "x": 66, "text": "为了您的账户安全,请输入您的余额宝密码", "height": 34, "fontSize": 34, "color": "#9cc5db" } }, { "type": "Image", "props": { "y": 425, "x": 545, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 425, "x": 208, "var": "setPwdBtn", "skin": "ui/balance/subres/btn_yeb_xgmm.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return UserAuthenDlgUI;
            }(Dialog));
            balance.UserAuthenDlgUI = UserAuthenDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var BalanceDlgUI = /** @class */ (function (_super) {
            __extends(BalanceDlgUI, _super);
            function BalanceDlgUI() {
                return _super.call(this) || this;
            }
            BalanceDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.BalanceDlgUI.uiView);
            };
            BalanceDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 0, "var": "TLgroup", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 24, "x": 187, "skin": "ui/balance/icon_yeb_yeb-1.png" } }, { "type": "Image", "props": { "y": 10, "x": 62, "skin": "ui/balance/icon_yeb_yeb-img.png" } }] }, { "type": "Box", "props": { "y": 0, "var": "TRgroup", "right": -55 }, "child": [{ "type": "Image", "props": { "x": 460, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png" }, "child": [{ "type": "Image", "props": { "y": 14, "x": 122, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 46, "x": 154, "var": "helpBtn", "skin": "ui/balance/btn_yeb_bzsm.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": 378, "var": "accessBtn", "skin": "ui/balance/btn_yeb_cqmx.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 168, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 1294, "skin": "ui/balance/img_cz_kuang.png", "height": 176, "sizeGrid": "30,40,30,40" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 340, "skin": "ui/balance/img_yeb_kuang-bt.png" } }, { "type": "Image", "props": { "y": 12, "x": 503, "skin": "ui/balance/img_yeb_f-srsy.png" } }, { "type": "Image", "props": { "y": 132, "x": 488, "skin": "ui/balance/img_yeb_f-mxshd.png" } }, { "type": "Image", "props": { "y": 51, "x": 455, "width": 384, "skin": "ui/balance/img_dating_qian_di.png", "height": 76 } }, { "type": "Image", "props": { "y": 64, "x": 943, "skin": "ui/balance/img_yeb_f-grzh.png" } }, { "type": "Image", "props": { "y": 64, "x": 25, "skin": "ui/balance/img_yeb_f-yeb.png" } }, { "type": "Sprite", "props": { "y": 117, "x": 87, "width": 200, "var": "bitBox1", "height": 40 } }, { "type": "Sprite", "props": { "y": 117, "x": 1005, "width": 200, "var": "bitBox3", "height": 40 } }, { "type": "Sprite", "props": { "y": 69, "x": 547, "width": 200, "var": "bitBox2", "height": 40 } }] }, { "type": "Image", "props": { "y": 196, "width": 1294, "skin": "ui/balance/img_cz_kuang.png", "height": 116, "sizeGrid": "30,40,30,40" }, "child": [{ "type": "Image", "props": { "y": 24, "x": 396, "skin": "ui/balance/img_yeb_f-brsy.png" } }, { "type": "Image", "props": { "y": 24, "x": 101, "skin": "ui/balance/img_yeb_f-ljsy.png" } }, { "type": "Image", "props": { "y": 24, "x": 994, "skin": "ui/balance/img_yeb_f-qrnh.png" } }, { "type": "Image", "props": { "y": 24, "x": 662, "skin": "ui/balance/img_yeb_f-wfsy.png" } }, { "type": "Sprite", "props": { "y": 63, "x": 102, "width": 200, "var": "bitBox4", "height": 40 } }, { "type": "Sprite", "props": { "y": 63, "x": 397, "width": 200, "var": "bitBox5", "height": 40 } }, { "type": "Sprite", "props": { "y": 63, "x": 692, "width": 200, "var": "bitBox6", "height": 40 } }, { "type": "Sprite", "props": { "y": 63, "x": 988, "width": 200, "var": "bitBox7", "height": 40 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 1288, "var": "weihuMask", "skin": "ui/balance/img_dlzx-dlxx_bc.png", "sizeGrid": "40,40,40,40", "height": 120, "alpha": 0.9 }, "child": [{ "type": "Label", "props": { "text": "系统维护中,暂停结算余额宝收益,如有疑问请联系客服", "fontSize": 38, "color": "#d0e8f3", "centerY": 0, "centerX": 0 } }] }] }, { "type": "Image", "props": { "y": 499, "x": 472, "var": "setBtn", "skin": "ui/balance/btn_yeb_cr.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 499, "x": 814, "var": "getBtn", "skin": "ui/balance/btn_yeb_qc.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 388, "x": 351, "skin": "ui/balance/img_yeb_f-srje.png" } }, { "type": "Image", "props": { "y": 379, "x": 528, "width": 414, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 345, "var": "inputTxt", "valign": "middle", "type": "text", "restrict": "0123456789.", "promptColor": "#93afc0", "prompt": "请输入金额......", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 24, "x": 383, "var": "clearBtn", "skin": "ui/balance/btn_yeb_sr-qx.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] }] };
            return BalanceDlgUI;
        }(Dialog));
        dlg.BalanceDlgUI = BalanceDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var bindPhone;
        (function (bindPhone) {
            var BindPhoneActiveDlgUI = /** @class */ (function (_super) {
                __extends(BindPhoneActiveDlgUI, _super);
                function BindPhoneActiveDlgUI() {
                    return _super.call(this) || this;
                }
                BindPhoneActiveDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.bindPhone.BindPhoneActiveDlgUI.uiView);
                };
                BindPhoneActiveDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 121, "x": 152, "skin": "ui/bindPhone/img_bg.png" }, "child": [{ "type": "Image", "props": { "y": 463, "x": 514, "var": "bindBtn", "skin": "ui/bindPhone/img_sjbtn.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 83, "x": 892, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 415, "x": 256, "width": 52, "var": "star1", "skin": "ui/bindPhone/img_star.png", "height": 51, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 440, "x": 757, "var": "star2", "skin": "ui/bindPhone/img_star.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 470, "x": 758, "var": "jbIcon", "skin": "ui/bindPhone/img_jingbi.png" } }, { "type": "Sprite", "props": { "y": 405, "x": 594, "width": 145, "var": "numbox", "height": 131 } }] };
                return BindPhoneActiveDlgUI;
            }(Dialog));
            bindPhone.BindPhoneActiveDlgUI = BindPhoneActiveDlgUI;
        })(bindPhone = dlg.bindPhone || (dlg.bindPhone = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var AccountInfoDlgUI = /** @class */ (function (_super) {
                __extends(AccountInfoDlgUI, _super);
                function AccountInfoDlgUI() {
                    return _super.call(this) || this;
                }
                AccountInfoDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.AccountInfoDlgUI.uiView);
                };
                AccountInfoDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 427, "skin": "ui/fullMyCenter/img_grzx_bt05.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 88, "x": 9, "var": "tabView", "skin": "ui/fullMyCenter/img_grzx_cy01.png" }, "child": [{ "type": "Image", "props": { "y": 88, "x": 0, "var": "tab1", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 58, "skin": "ui/fullMyCenter/img_grzx_cy03.png" } }] }, { "type": "Image", "props": { "y": 218, "x": 0, "var": "tab2", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 38, "skin": "ui/fullMyCenter/img_grzx_cy04.png" } }] }, { "type": "Image", "props": { "y": 347, "x": 0, "var": "tab3", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 38, "skin": "ui/fullMyCenter/img_grzx_cy05.png" } }] }, { "type": "Image", "props": { "y": 459, "x": -10, "var": "tabSelect", "skin": "ui/fullMyCenter/img_grzx_cy06.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 37, "var": "tabLabel", "skin": "ui/fullMyCenter/img_grzx_cy07.png", "centerX": -7 } }] }] }, { "type": "Image", "props": { "y": 130, "x": 288, "width": 712, "var": "yhkView", "skin": "ui/common/img_com_xiankuang.png", "height": 362, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 27, "x": 75, "skin": "ui/fullMyCenter/img_grzx_sr01.png" } }, { "type": "Image", "props": { "y": 95, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr02.png" } }, { "type": "Image", "props": { "y": 163, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr03.png" } }, { "type": "Image", "props": { "y": 231, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr04.png" } }, { "type": "Text", "props": { "y": 419, "x": 178, "width": 356, "var": "serviceInfo", "text": "如需修改银行卡信息，请联系客服", "height": 20, "fontSize": 18, "color": "#fff600", "align": "center" } }, { "type": "Image", "props": { "y": 429, "x": 358, "var": "openCardBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "y": 156, "x": 236, "width": 410, "var": "bankPos", "type": "text", "skin": "ui/common/shurukuang.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请选择银行", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 21, "layoutEnabled": true, "height": 50, "fontSize": 30, "editable": true, "color": "#ffffff", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 299, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr13.png" } }, { "type": "Image", "props": { "y": 292, "x": 237, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "cardPwd", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入提现密码(4位)", "maxChars": 4, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "cardPwdLook", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 20, "x": 237, "width": 238, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 206, "var": "cardName", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入姓名", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 88, "x": 237, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "cardNum", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "最长支持21位银行卡", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 224, "x": 237, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "subBank", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请手动填写开户支行", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 45, "x": 567, "var": "setNameBtn", "skin": "ui/fullMyCenter/btn_grzx_xg01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return AccountInfoDlgUI;
            }(Dialog));
            center.AccountInfoDlgUI = AccountInfoDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var BindAlipayDlgUI = /** @class */ (function (_super) {
                __extends(BindAlipayDlgUI, _super);
                function BindAlipayDlgUI() {
                    return _super.call(this) || this;
                }
                BindAlipayDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.BindAlipayDlgUI.uiView);
                };
                BindAlipayDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 265, "skin": "ui/fullMyCenter/img_grzx_bt09.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 30, "x": 30, "skin": "ui/fullMyCenter/img_grzx_sr11.png" } }, { "type": "Image", "props": { "y": 98, "x": 30, "skin": "ui/fullMyCenter/img_grzx_sr12.png" } }, { "type": "Label", "props": { "y": 236, "x": 520, "text": "(提交后不可更改)", "fontSize": 18, "color": "#ca1420" } }, { "type": "Label", "props": { "y": 236, "x": 42, "text": "注：请输入正确的支付宝实名制名字，否则无法转入该账号!", "fontSize": 18, "color": "#fff600" } }, { "type": "Image", "props": { "y": 23, "x": 211, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "accTxt", "valign": "middle", "type": "text", "restrict": "0-9a-zA-Z_@.", "promptColor": "#93afc0", "prompt": "请输入支付宝账号", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 92, "x": 211, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "nameTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入真实姓名", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 166, "x": 39, "skin": "ui/fullMyCenter/img_grzx_sr13.png" } }, { "type": "Image", "props": { "y": 160, "x": 211, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入提现密码(4位)", "maxChars": 4, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Image", "props": { "y": 425, "x": 377, "var": "bindBtn", "skin": "ui/fullMyCenter/btn_grzx_bd02.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return BindAlipayDlgUI;
            }(Dialog));
            center.BindAlipayDlgUI = BindAlipayDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var BindPhoneDlgUI = /** @class */ (function (_super) {
                __extends(BindPhoneDlgUI, _super);
                function BindPhoneDlgUI() {
                    return _super.call(this) || this;
                }
                BindPhoneDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.BindPhoneDlgUI.uiView);
                };
                BindPhoneDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 23, "x": 287, "skin": "ui/common/icon_denglu_zi_shengjizhanghao.png" } }, { "type": "Image", "props": { "y": 55, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 10, "x": 206, "skin": "ui/common/img_denglu_tankuang_biaotou.png" } }] }, { "type": "Image", "props": { "y": 105, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 12, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_shouji.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "phoneTxt", "valign": "middle", "type": "text", "restrict": "0-9 a-z A-Z", "promptColor": "#93afc0", "prompt": "请输入手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 137, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhenma.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "pwdTxt1", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请输入新密码(6-15位字符)", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 75, "x": 31, "width": 434, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhengma.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 341, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0-9", "promptColor": "#93afc0", "prompt": "请输入验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 200, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhenma.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "pwdTxt2", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请确认新密码(6-15位字符)", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 103, "x": 572, "var": "timeBtn", "skin": "ui/login/denglu_hqyzm02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 7, "x": 9, "width": 41, "var": "timeTxt", "valign": "bottom", "text": "0", "height": 34, "fontSize": 34, "color": "#ffffff", "align": "right" } }] }, { "type": "Image", "props": { "y": 103, "x": 572, "var": "codeBtn", "skin": "ui/login/denglu_hqyzm.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 426, "x": 377, "var": "confirmBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return BindPhoneDlgUI;
            }(Dialog));
            center.BindPhoneDlgUI = BindPhoneDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetHeadBorderDlgUI = /** @class */ (function (_super) {
                __extends(SetHeadBorderDlgUI, _super);
                function SetHeadBorderDlgUI() {
                    return _super.call(this) || this;
                }
                SetHeadBorderDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetHeadBorderDlgUI.uiView);
                };
                SetHeadBorderDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 405, "skin": "ui/fullMyCenter/img_grzx_bt04.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 152, "x": 85, "width": 180, "var": "headIcon", "skin": "ui/headList/icon01.png", "height": 180 } }, { "type": "Image", "props": { "y": 474, "x": 174, "var": "changeBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 342, "x": 101, "skin": "ui/fullMyCenter/img_grzx_wz01.png" } }, { "type": "Image", "props": { "y": 105, "x": 329, "width": 680, "skin": "ui/common/img_com_xiankuang.png", "height": 502, "sizeGrid": "15,15,15,16" } }, { "type": "Panel", "props": { "y": 125, "x": 349, "width": 640, "var": "itemPanel", "height": 462 } }] };
                return SetHeadBorderDlgUI;
            }(Dialog));
            center.SetHeadBorderDlgUI = SetHeadBorderDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetHeadDlgUI = /** @class */ (function (_super) {
                __extends(SetHeadDlgUI, _super);
                function SetHeadDlgUI() {
                    return _super.call(this) || this;
                }
                SetHeadDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetHeadDlgUI.uiView);
                };
                SetHeadDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 427, "skin": "ui/fullMyCenter/img_grzx_bt03.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 158, "x": 95, "width": 160, "height": 160 } }, { "type": "Image", "props": { "y": 152, "x": 85, "width": 180, "var": "headIcon", "skin": "ui/headList/icon01.png", "height": 180 } }, { "type": "Image", "props": { "y": 474, "x": 174, "var": "changeBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 342, "x": 101, "skin": "ui/fullMyCenter/img_grzx_wz01.png" } }, { "type": "Image", "props": { "y": 105, "x": 329, "width": 680, "var": "itembg", "skin": "ui/common/img_com_xiankuang.png", "height": 502, "sizeGrid": "15,15,15,16" } }, { "type": "Panel", "props": { "y": 125, "x": 349, "width": 640, "var": "itemPanel", "height": 462 } }] };
                return SetHeadDlgUI;
            }(Dialog));
            center.SetHeadDlgUI = SetHeadDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetNickNameDlgUI = /** @class */ (function (_super) {
                __extends(SetNickNameDlgUI, _super);
                function SetNickNameDlgUI() {
                    return _super.call(this) || this;
                }
                SetNickNameDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetNickNameDlgUI.uiView);
                };
                SetNickNameDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 23, "x": 287, "skin": "ui/fullMyCenter/img_grzx_bt06.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 43, "x": 166, "skin": "ui/fullMyCenter/btn_grzx_wz04.png" } }, { "type": "Image", "props": { "y": 121, "x": 140, "width": 410, "skin": "ui/common/shurukuang.png", "sizeGrid": "22,20,21,18", "height": 50 }, "child": [{ "type": "TextInput", "props": { "y": 5, "x": 23, "width": 364, "var": "nickTxt", "overflow": "hidden", "maxChars": 12, "height": 40, "fontSize": 30, "color": "#93afc0" } }] }, { "type": "Clip", "props": { "y": 120, "x": 561, "var": "diceBtn", "skin": "ui/fullMyCenter/dice.png", "interval": 50, "index": 0, "clipX": 9, "clipWidth": 52, "clipHeight": 52, "autoPlay": false } }] }, { "type": "Image", "props": { "y": 424, "x": 377, "var": "cancelBtn", "skin": "ui/fullMyCenter/btn_grzx_xg02.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return SetNickNameDlgUI;
            }(Dialog));
            center.SetNickNameDlgUI = SetNickNameDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetRealNameDlgUI = /** @class */ (function (_super) {
                __extends(SetRealNameDlgUI, _super);
                function SetRealNameDlgUI() {
                    return _super.call(this) || this;
                }
                SetRealNameDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetRealNameDlgUI.uiView);
                };
                SetRealNameDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 256, "skin": "ui/fullMyCenter/img_grzx_bt.png" } }, { "type": "Image", "props": { "y": 54, "x": 709, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 107, "x": 31, "width": 692, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 118, "x": 50, "skin": "ui/fullMyCenter/img_grzx_sr.png" } }, { "type": "Image", "props": { "y": 110, "x": 212, "width": 411, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "nameTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Text", "props": { "y": 40, "x": 130, "width": 432, "text": "温馨提示：此姓名可能会影响您提现,请谨慎填写", "height": 20, "fontSize": 18, "color": "#fff600", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 195, "x": 131, "text": "提交修改后,可联系客服火速处理", "height": 35, "fontSize": 30, "color": "#93afc0" } }] }, { "type": "Image", "props": { "y": 426, "x": 377, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return SetRealNameDlgUI;
            }(Dialog));
            center.SetRealNameDlgUI = SetRealNameDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var FullMyCenterDlgUI = /** @class */ (function (_super) {
            __extends(FullMyCenterDlgUI, _super);
            function FullMyCenterDlgUI() {
                return _super.call(this) || this;
            }
            FullMyCenterDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.FullMyCenterDlgUI.uiView);
            };
            FullMyCenterDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Box", "props": { "y": 139, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 2, "skin": "ui/fullMyCenter/img_grzx_txd02.png" }, "child": [{ "type": "Image", "props": { "y": 67, "x": 104, "width": 124, "var": "headIcon", "skin": "ui/headList/icon01.png", "height": 124 } }, { "type": "Image", "props": { "y": 264, "x": 167, "var": "setHeadBtn", "skin": "ui/fullMyCenter/btn_grzx_ghtx01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 338, "x": 167, "var": "setBorderBtn", "skin": "ui/fullMyCenter/btn_grzx_ghtxk01.png", "gray": true, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 167, "x": 139, "var": "visitorMark", "skin": "ui/common/youke.png" } }] }, { "type": "Image", "props": { "y": 478, "x": 152, "var": "accInfoBtn", "skin": "ui/fullMyCenter/btn_grzx_zhxx01.png" } }, { "type": "Image", "props": { "y": 478, "x": 874, "var": "backAccBtn", "skin": "ui/fullMyCenter/btn_grzx_tczh01.png" } }, { "type": "Image", "props": { "x": 347, "width": 606, "skin": "ui/common/img_com_xiankuang.png", "height": 448, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh01.png" } }, { "type": "Image", "props": { "y": 101, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh02.png" } }, { "type": "Image", "props": { "y": 171, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh03.png" } }, { "type": "Image", "props": { "y": 240, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh04.png" } }, { "type": "Image", "props": { "y": 310, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh05.png" } }, { "type": "Image", "props": { "y": 380, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh06.png" } }, { "type": "Label", "props": { "y": 30, "x": 175, "width": 216, "var": "accTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 100, "x": 175, "width": 216, "var": "nickTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 170, "x": 175, "width": 396, "var": "moneyTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 239, "x": 175, "width": 216, "var": "phoneTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 309, "x": 175, "width": 216, "var": "wechatTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 379, "x": 175, "width": 216, "var": "alipayTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 254, "x": 494, "var": "bindPhoneBtn", "skin": "ui/fullMyCenter/btn_grzx_bd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 327, "x": 494, "var": "bindWeChat", "skin": "ui/fullMyCenter/btn_grzx_bd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 49, "x": 494, "var": "accCopyBtn", "skin": "ui/fullMyCenter/btn_grzx_fz01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 116, "x": 494, "var": "setNickBtn", "skin": "ui/fullMyCenter/btn_grzx_xg01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 397, "x": 493, "var": "bindAlipayBtn", "skin": "ui/fullMyCenter/btn_grzx_bd01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "x": 971, "width": 326, "skin": "ui/common/img_com_xiankuang.png", "height": 448, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 59, "x": 101, "skin": "ui/fullMyCenter/img_grzx_sz01.png" } }, { "type": "Image", "props": { "y": 169, "x": 25, "skin": "ui/fullMyCenter/img_grzx_sz02.png" } }, { "type": "Image", "props": { "y": 303, "x": 25, "skin": "ui/fullMyCenter/img_grzx_sz03.png" } }, { "type": "CheckBox", "props": { "y": 162, "x": 149, "var": "musicBtn", "skin": "ui/fullMyCenter/check_msc.png", "selected": false } }, { "type": "CheckBox", "props": { "y": 297, "x": 149, "var": "soundBtn", "skin": "ui/fullMyCenter/check_msc.png", "selected": false } }] }] }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "titleGroup", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 173, "skin": "ui/fullMyCenter/img_grzx_bt01.png" } }, { "type": "Image", "props": { "y": 20, "x": 62, "skin": "ui/fullMyCenter/img_grzx_bt02.png" } }] }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 122, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Text", "props": { "y": 698, "x": 0, "wordWrap": true, "width": 260, "var": "verTxt", "text": "text", "height": 52, "fontSize": 16, "color": "#a28ad1" } }] };
            return FullMyCenterDlgUI;
        }(Dialog));
        dlg.FullMyCenterDlgUI = FullMyCenterDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var GameUpdateNoticeUI = /** @class */ (function (_super) {
            __extends(GameUpdateNoticeUI, _super);
            function GameUpdateNoticeUI() {
                return _super.call(this) || this;
            }
            GameUpdateNoticeUI.prototype.createChildren = function () {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.GameUpdateNoticeUI.uiView);
            };
            GameUpdateNoticeUI.uiView = { "type": "Dialog", "props": { "width": 1035, "height": 633 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 428, "skin": "ui/login/img_dl_bt01.png" } }, { "type": "Image", "props": { "y": 99, "x": 26, "width": 984, "skin": "ui/common/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 435 }, "child": [{ "type": "Panel", "props": { "var": "panel", "vScrollBarSkin": "“”", "top": 2, "right": 2, "left": 2, "bottom": 2 }, "child": [{ "type": "HTMLDivElement", "props": { "y": 10, "x": 10, "width": 960, "var": "htmlText", "innerHTML": "<span style='color:#FFFFFF;fontSize:30'>-本次更新维护时间:</span> <span style='color:#fff200;fontSize:24'>Invalid Date~Invalid Date</span> <span style='color:#FFFFFF;fontSize:30'>abctest</span> <span style='color:#FFFFFF;fontSize:24'>1.sahkjdsahdhkjashkjdahkjsdhkjashkjdhkjashkjdsahkjdhkjashkjdhkjasdhkjsahkjdhkjsahkjdhkjasdhkjasdhkjashkjdhkjashkjdhkjsadhkjahkjsdhkjashkjdhkjasdhkjhkjsahkjdsadsahkjdhkjsadadshkj, 2.sadahsdhkjahkjsdhkjashkjdhkjashkjdhkjashkjdhkjashkjdhkjashkjdhkjasdhkjahkjsdhkjsahkjdhkjsadhkjahkjsdhkjsahkjd 3.ashjdkjsadhkjhkjashkjdhkjsahkjdhkjashkjdasdasj</span>", "height": 100 } }] }] }, { "type": "Image", "props": { "y": 579, "x": 518, "var": "btnConfirm", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return GameUpdateNoticeUI;
        }(Dialog));
        dlg.GameUpdateNoticeUI = GameUpdateNoticeUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var login;
        (function (login) {
            var AccountLoginDlgUI = /** @class */ (function (_super) {
                __extends(AccountLoginDlgUI, _super);
                function AccountLoginDlgUI() {
                    return _super.call(this) || this;
                }
                AccountLoginDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.login.AccountLoginDlgUI.uiView);
                };
                AccountLoginDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 23, "x": 288, "skin": "ui/common/zhanghaodl.png" } }, { "type": "Image", "props": { "y": 55, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 10, "x": 206, "skin": "ui/common/img_denglu_tankuang_biaotou.png" } }] }, { "type": "Image", "props": { "y": 105, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 30, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_shouji.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "userTxt", "valign": "middle", "type": "text", "restrict": "0-9 a-z A-Z", "promptColor": "#93afc0", "prompt": "请输入手机号 / 用户名", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 108, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhenma.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "pwdTxt", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请输入密码(6-15位字符)", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 186, "x": 31, "width": 632, "var": "codeGroup", "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhengma.png" } }, { "type": "Image", "props": { "var": "codeImg", "right": 30, "centerY": 0 } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 258, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0-9", "promptColor": "#93afc0", "prompt": "请输入验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }] }, { "type": "Image", "props": { "y": 426, "x": 377, "var": "loginBtn", "skin": "ui/common/img_denglu_denglu.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 426, "x": 620, "var": "pwdBtn", "skin": "ui/common/icon_denglu_zi_wangjimima.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return AccountLoginDlgUI;
            }(Dialog));
            login.AccountLoginDlgUI = AccountLoginDlgUI;
        })(login = dlg.login || (dlg.login = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var login;
        (function (login) {
            var FindPasswordDlgUI = /** @class */ (function (_super) {
                __extends(FindPasswordDlgUI, _super);
                function FindPasswordDlgUI() {
                    return _super.call(this) || this;
                }
                FindPasswordDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.login.FindPasswordDlgUI.uiView);
                };
                FindPasswordDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 23, "x": 283, "skin": "ui/common/icon_denglu_zi_zhaohuimima.png" } }, { "type": "Image", "props": { "y": 55, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 10, "x": 206, "skin": "ui/common/img_denglu_tankuang_biaotou.png" } }] }, { "type": "Image", "props": { "y": 105, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 12, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_shouji.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "phoneTxt", "valign": "middle", "type": "text", "restrict": "0-9", "promptColor": "#93afc0", "prompt": "请输入手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 137, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhenma.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "pwdTxt1", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请输入新密码(6-15位字符)", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 75, "x": 31, "width": 434, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhengma.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 341, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0-9", "promptColor": "#93afc0", "prompt": "请输入验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 200, "x": 31, "width": 632, "skin": "ui/login/img_denglu_shuzidi.png", "height": 56, "sizeGrid": "19,24,25,25" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 20, "skin": "ui/common/icon_denglu_yanzhenma.png" } }, { "type": "TextInput", "props": { "y": 5, "x": 66, "width": 545, "var": "pwdTxt2", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请确认新密码(6-15位字符)", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 103, "x": 572, "var": "timeBtn", "skin": "ui/login/denglu_hqyzm02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 7, "x": 9, "width": 41, "var": "timeTxt", "valign": "bottom", "text": "0", "height": 34, "fontSize": 34, "color": "#ffffff", "align": "right" } }] }, { "type": "Image", "props": { "y": 103, "x": 572, "var": "codeBtn", "skin": "ui/login/denglu_hqyzm.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 426, "x": 377, "var": "confirmBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return FindPasswordDlgUI;
            }(Dialog));
            login.FindPasswordDlgUI = FindPasswordDlgUI;
        })(login = dlg.login || (dlg.login = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var mail;
        (function (mail) {
            var MailAwardDlgUI = /** @class */ (function (_super) {
                __extends(MailAwardDlgUI, _super);
                function MailAwardDlgUI() {
                    return _super.call(this) || this;
                }
                MailAwardDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.mail.MailAwardDlgUI.uiView);
                };
                MailAwardDlgUI.uiView = { "type": "Dialog", "props": { "width": 998, "height": 158 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/mailbox/img_xtyj_kuang-gxhd.png" }, "child": [{ "type": "Image", "props": { "y": 26, "x": 46, "skin": "ui/mailbox/img_xtyj_kuang-gxhd-g2.png" } }, { "type": "Image", "props": { "y": -12, "x": 387, "skin": "ui/mailbox/img_xtyj_f-gxhd.png" } }, { "type": "Image", "props": { "y": -19, "x": 326, "skin": "ui/mailbox/img_xtyj_kuang_sg.png" } }, { "type": "Image", "props": { "y": 91, "x": 391, "var": "cirPic", "skin": "ui/mailbox/img_xtyj_kuang-gxhd-g.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 59, "x": 359, "skin": "ui/mailbox/img_xtyj_qb.png" } }, { "type": "Sprite", "props": { "y": 72, "x": 449, "width": 134, "var": "fontBox", "height": 40 } }] }] };
                return MailAwardDlgUI;
            }(Dialog));
            mail.MailAwardDlgUI = MailAwardDlgUI;
        })(mail = dlg.mail || (dlg.mail = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var MailboxDlgUI = /** @class */ (function (_super) {
            __extends(MailboxDlgUI, _super);
            function MailboxDlgUI() {
                return _super.call(this) || this;
            }
            MailboxDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.MailboxDlgUI.uiView);
            };
            MailboxDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerX": 0 } }, { "type": "Image", "props": { "y": 87, "x": -48, "var": "listGroup", "skin": "ui/mailbox/img_yx_xtyj-bg.png" }, "child": [{ "type": "Image", "props": { "y": 42, "x": 60, "skin": "ui/mailbox/img_yx_xtyj-f-xtyj.png" } }, { "type": "Image", "props": { "y": 66, "x": 443, "var": "delAllBtn", "skin": "ui/mailbox/btn_yx_xtyj-yjsc.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 66, "x": 443, "var": "getAllBtn", "skin": "ui/mailbox/btn_yx_xtyj-yjlq.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 115, "x": 60, "width": 490, "skin": "ui/common/img_com_xiankuang.png", "height": 536, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Panel", "props": { "y": 12, "x": -10, "width": 510, "var": "itemList", "height": 512 } }] }, { "type": "Image", "props": { "y": 337, "x": 140, "var": "hintGroup", "skin": "ui/mailbox/icon_yx_xtyj-i.png" }, "child": [{ "type": "Label", "props": { "y": 3, "x": 178, "width": 72, "underline": true, "text": "提示", "fontSize": 36, "color": "#ffba25", "bold": true } }, { "type": "Label", "props": { "y": 50, "x": 99, "text": "您暂时没有邮件", "fontSize": 32, "color": "#e9f5fd", "bold": true } }] }] }, { "type": "Image", "props": { "y": 0, "x": -48, "var": "titleGroup", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 202, "skin": "ui/mailbox/img_yx_bt-f-yx.png" } }, { "type": "Image", "props": { "y": 5, "x": 59, "skin": "ui/mailbox/icon_yx_bt-yj.png" } }] }, { "type": "Image", "props": { "y": 0, "x": 10, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 122, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 106, "width": 792, "var": "detailsGroup", "skin": "ui/mailbox/img_yx_yj-kuang-d-9x9.png", "centerX": 258, "sizeGrid": "0,27,0,25" }, "child": [{ "type": "Image", "props": { "y": 71, "x": 20, "width": 752, "skin": "ui/common/img_com_xiankuang.png", "height": 454, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Box", "props": { "y": 16, "x": 10 }, "child": [{ "type": "Text", "props": { "x": 305.5, "text": "系统邮件", "height": 30, "fontSize": 30, "color": "#e9f5fd" } }, { "type": "Line", "props": { "y": 14, "x": -0.5, "toY": 0, "toX": 286, "lineWidth": 3, "lineColor": "#456ed1" } }, { "type": "Line", "props": { "y": 14, "x": 445.5, "toY": 0, "toX": 286, "lineWidth": 3, "lineColor": "#456ed1" } }] }, { "type": "Panel", "props": { "y": 68, "x": 20, "width": 712, "var": "ctxtList", "height": 210 }, "child": [{ "type": "Text", "props": { "y": 0, "x": 0, "wordWrap": true, "width": 712, "var": "contentTxt", "text": "text", "leading": 20, "fontSize": 26, "color": "#e9f5fd" } }] }, { "type": "Image", "props": { "y": 313, "x": 317, "var": "awardGroup", "skin": "ui/mailbox/img_yx_lw-kuang.png", "sizeGrid": "40,42,46,35" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 26, "skin": "ui/mailbox/img_xtyj_qb.png" } }, { "type": "Sprite", "props": { "y": 78, "x": 23, "width": 70, "var": "goldBox", "height": 22 } }] }] }, { "type": "Text", "props": { "y": 25, "x": 26, "width": 740, "var": "ctitleTxt", "text": "text122344444444444", "overflow": "hidden", "height": 32, "fontSize": 32, "color": "#ffba25", "align": "center" } }, { "type": "Image", "props": { "y": 571, "x": 674, "var": "delCurBtn", "skin": "ui/mailbox/btn_yx_yj-sc.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 571, "x": 674, "var": "getCurBtn", "skin": "ui/mailbox/btn_yx_yj-lq.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return MailboxDlgUI;
        }(Dialog));
        dlg.MailboxDlgUI = MailboxDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var NoticeMessageUI = /** @class */ (function (_super) {
                __extends(NoticeMessageUI, _super);
                function NoticeMessageUI() {
                    return _super.call(this) || this;
                }
                NoticeMessageUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.notice.NoticeMessageUI.uiView);
                };
                NoticeMessageUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 35, "width": 925, "var": "message", "skin": "ui/panel_notice/message/bg_hdgg_kuang.png", "sizeGrid": "20,20,20,20", "height": 588, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 16, "x": 171, "skin": "ui/panel_notice/message/img_hdgg_biaotikuang.png", "centerX": 0 } }, { "type": "Label", "props": { "y": 34, "x": 1, "width": 925, "text": "标题", "name": "title", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffba25", "centerX": -14, "align": "center" } }, { "type": "Label", "props": { "y": 88, "wordWrap": true, "width": 847, "text": "内容", "name": "content", "height": 431, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": 0, "align": "left" } }, { "type": "Label", "props": { "y": 530, "x": 30, "width": 868, "text": "日期", "name": "date", "height": 42, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": -14, "align": "right" } }] }, { "type": "Panel", "props": { "y": 5, "x": 0, "width": 1030, "var": "imgPanel", "height": 648 }, "child": [{ "type": "Image", "props": { "y": 31, "x": 34, "width": 960, "var": "image", "height": 602 } }, { "type": "Image", "props": { "y": 0, "x": 19, "var": "frame", "skin": "ui/panel_notice/noticeui_04.png", "sizeGrid": "90,70,70,70", "mouseThrough": true, "mouseEnabled": false } }] }] };
                return NoticeMessageUI;
            }(View));
            notice.NoticeMessageUI = NoticeMessageUI;
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var NoticeShareUI = /** @class */ (function (_super) {
                __extends(NoticeShareUI, _super);
                function NoticeShareUI() {
                    return _super.call(this) || this;
                }
                NoticeShareUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.notice.NoticeShareUI.uiView);
                };
                NoticeShareUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 27, "x": 28, "width": 974, "var": "image", "height": 610 } }, { "type": "Image", "props": { "y": 447, "x": 148, "var": "friend_up", "skin": "ui/panel_notice/share/fasonggeipengyou_guan.png" } }, { "type": "Image", "props": { "y": 447, "x": 148, "var": "friend_down", "skin": "ui/panel_notice/share/fasongggeipengyou_kai.png" } }, { "type": "Image", "props": { "y": 447, "x": 300, "var": "circle_up", "skin": "ui/panel_notice/share/fenxiangpengyouquan_guan.png" } }, { "type": "Image", "props": { "y": 447, "x": 300, "var": "circle_down", "skin": "ui/panel_notice/share/fenxiangpengyouquan_kai.png" } }, { "type": "Image", "props": { "y": 0, "skin": "ui/panel_notice/noticeui_04.png", "mouseThrough": false, "mouseEnabled": false, "centerX": 0 } }] };
                return NoticeShareUI;
            }(View));
            notice.NoticeShareUI = NoticeShareUI;
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var NoticeTabViewUI = /** @class */ (function (_super) {
                __extends(NoticeTabViewUI, _super);
                function NoticeTabViewUI() {
                    return _super.call(this) || this;
                }
                NoticeTabViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.notice.NoticeTabViewUI.uiView);
                };
                NoticeTabViewUI.uiView = { "type": "View", "props": { "width": 344, "height": 112 }, "child": [{ "type": "Image", "props": { "y": 8, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_di.png", "name": "tab_dummy" }, "child": [{ "type": "Label", "props": { "y": 0, "x": 68, "wordWrap": true, "width": 230, "var": "txt", "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "center" } }, { "type": "Image", "props": { "y": -8, "x": 0, "var": "tab_on", "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Label", "props": { "y": 8, "x": 68, "wordWrap": true, "width": 230, "var": "onTxt", "valign": "middle", "text": "公告讯息123456", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 8, "x": 278, "var": "newInd", "skin": "ui/panel_notice/markNew.png", "name": "newInd" } }] }] };
                return NoticeTabViewUI;
            }(View));
            notice.NoticeTabViewUI = NoticeTabViewUI;
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var roulette;
            (function (roulette) {
                var GameRouletteUI = /** @class */ (function (_super) {
                    __extends(GameRouletteUI, _super);
                    function GameRouletteUI() {
                        return _super.call(this) || this;
                    }
                    GameRouletteUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.GameRouletteUI.uiView);
                    };
                    GameRouletteUI.uiView = { "type": "View", "props": { "width": 560, "height": 506 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_panzi02.png", "anchorY": 0, "anchorX": 0 } }, { "type": "Image", "props": { "y": 250, "x": 277, "var": "plateNode", "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_panzi.png", "rotation": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Box", "props": { "var": "labelBox", "top": 0, "staticCache": true, "right": 0, "left": 0, "cacheAsBitmap": true, "cacheAs": "bitmap", "bottom": 0 }, "child": [{ "type": "Label", "props": { "y": 208, "x": 208, "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "pivotY": 119, "name": "amount7", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 45, "pivotY": 119, "name": "amount6", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 90, "pivotY": 119, "name": "amount5", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 135, "pivotY": 119, "name": "amount4", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 180, "pivotY": 119, "name": "amount3", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 225, "pivotY": 119, "name": "amount2", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 270, "pivotY": 119, "name": "amount1", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 315, "pivotY": 119, "name": "amount0", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }] }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 560, "name": "shell0", "height": 506 }, "child": [{ "type": "Image", "props": { "y": -70, "x": 279, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_baiyin.png", "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 262, "x": 490, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_baiyin_ce.png", "scaleX": -1, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 260, "x": 25, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_baiyin_ce.png", "anchorY": 0.5 } }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 560, "name": "shell1", "height": 506 }, "child": [{ "type": "Image", "props": { "y": -68, "x": 279, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_huangjing.png", "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 263, "x": 492, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_huangjing_ce.png", "scaleX": -1, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 263, "x": 25, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_huangjing_ce.png", "anchorY": 0.5 } }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 560, "name": "shell2", "height": 506 }, "child": [{ "type": "Image", "props": { "y": -68, "x": 279, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zuanshi.png", "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 260, "x": 492, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhuanshi_ce.png", "scaleX": -1, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 259, "x": 25, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhuanshi_ce.png", "anchorY": 0.5 } }, { "type": "Image", "props": { "y": 452, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhuanshi_di.png", "centerX": -3 } }] }, { "type": "Animation", "props": { "y": -4, "x": 148, "var": "etcWinLight", "source": "dlg/notice/roulette/anims/ectWin.ani" } }, { "type": "Image", "props": { "y": 250, "x": 277, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhizhen.png", "pivotY": 98, "pivotX": 83 } }, { "type": "Animation", "props": { "y": 251, "x": 278, "var": "animBtnLight", "source": "dlg/notice/roulette/anims/ectBtnLight.ani", "autoAnimation": "light" } }, { "type": "Animation", "props": { "y": 234, "x": 280, "var": "ectBtnGo", "source": "dlg/notice/roulette/anims/ectGo.ani" } }, { "type": "Label", "props": { "y": 305, "x": 279, "text": "积分", "strokeColor": "#9966cc", "stroke": 2, "fontSize": 20, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 277, "x": 279, "var": "reqNumLabel", "text": "1000", "strokeColor": "#9966cc", "stroke": 2, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] };
                    return GameRouletteUI;
                }(View));
                roulette.GameRouletteUI = GameRouletteUI;
            })(roulette = notice.roulette || (notice.roulette = {}));
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var roulette;
            (function (roulette) {
                var NoticeRouletteUI = /** @class */ (function (_super) {
                    __extends(NoticeRouletteUI, _super);
                    function NoticeRouletteUI() {
                        return _super.call(this) || this;
                    }
                    NoticeRouletteUI.prototype.createChildren = function () {
                        View.regComponent("component.Notice.Roullette", component.Notice.Roullette);
                        View.regComponent("Text", laya.display.Text);
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.NoticeRouletteUI.uiView);
                    };
                    NoticeRouletteUI.uiView = { "type": "Dialog", "props": { "width": 1028, "height": 660 }, "child": [{ "type": "GameRoulette", "props": { "y": 67, "x": -9, "var": "roullette", "runtime": "component.Notice.Roullette" } }, { "type": "Box", "props": { "y": 254, "x": 209, "width": 120, "var": "startBtn", "height": 120 } }, { "type": "Image", "props": { "y": 569, "x": 19, "width": 508, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_xuanzhong_di508.png", "sizeGrid": "0,34,0,37", "height": 60 } }, { "type": "Box", "props": { "y": 570, "x": 20, "var": "tgGroupBox" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 166, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_xuanzhong_k.png" } }, { "type": "Image", "props": { "y": 9, "x": 333, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_xuanzhong_k.png" } }, { "type": "CheckBox", "props": { "y": 8, "x": 364, "var": "tgDiamond", "stateNum": 2, "skin": "ui/panel_notice/roullette/activityRoullette/check_3.png" } }, { "type": "CheckBox", "props": { "y": 8, "x": 197, "var": "tgGold", "stateNum": 2, "skin": "ui/panel_notice/roullette/activityRoullette/check_2.png" } }, { "type": "CheckBox", "props": { "y": 8, "x": 30, "var": "tgSilver", "stateNum": 2, "skin": "ui/panel_notice/roullette/activityRoullette/check_1.png" } }] }, { "type": "Image", "props": { "y": 28, "x": 556, "width": 457, "skin": "ui/panel_notice/roullette/ui_r04.png", "sizeGrid": "20,20,20,20", "height": 240 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/ui_r02.png" }, "child": [{ "type": "Label", "props": { "y": 12, "x": 152, "width": 293, "var": "remainingTime", "valign": "bottom", "text": "剩余时间", "height": 37, "fontSize": 32, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 55, "x": 0, "skin": "ui/panel_notice/roullette/ui_r03.png" }, "child": [{ "type": "Label", "props": { "y": 12, "x": 2, "width": 454, "var": "date", "text": "剩余时间", "height": 37, "fontSize": 20, "font": "Microsoft YaHei", "color": "#ffba25", "align": "center" } }] }, { "type": "Label", "props": { "y": 104, "x": 14, "wordWrap": true, "width": 428, "var": "contents", "text": "活动内容...", "height": 125, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3" } }] }, { "type": "Image", "props": { "y": 282, "x": 554, "width": 457, "var": "list", "skin": "ui/panel_notice/roullette/ui_r04.png", "sizeGrid": "20,20,20,20", "height": 350 }, "child": [{ "type": "Image", "props": { "y": -2, "x": 0, "skin": "ui/panel_notice/roullette/ui_r06.png" } }, { "type": "Image", "props": { "y": -2, "x": 0, "var": "newtab", "skin": "ui/panel_notice/roullette/ui_r07.png" } }, { "type": "Image", "props": { "y": -2, "x": 226, "var": "mytab", "skin": "ui/panel_notice/roullette/ui_r08.png" } }, { "type": "Image", "props": { "y": 96, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 177, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 136, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 217, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 298, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 258, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 55, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 55, "x": 1, "width": 455, "var": "bright", "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang2.png", "height": 40 } }, { "type": "Sprite", "props": { "y": 58, "x": 25, "width": 433, "name": "list0", "height": 40 }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 99, "x": 25, "name": "list1" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 140, "x": 25, "name": "list2" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 181, "x": 25, "name": "list3" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 221, "x": 25, "name": "list4" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 262, "x": 25, "name": "list5" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 303, "x": 25, "name": "list6" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": -1, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }] }, { "type": "Image", "props": { "y": 30, "x": 19, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_dangqian.png" } }, { "type": "Image", "props": { "y": 30, "x": 394, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_ciri.png" } }, { "type": "Label", "props": { "y": 17, "x": 458, "text": "（今日有效投注）", "fontSize": 20, "font": "Microsoft YaHei", "color": "#17a1e6", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Text", "props": { "y": 74, "x": 19, "width": 130, "var": "currentPt", "text": "-", "height": 28, "fontSize": 28, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 74, "x": 394, "width": 130, "var": "todayPt", "text": "-", "height": 28, "fontSize": 28, "color": "#ffba25", "align": "center" } }] };
                    return NoticeRouletteUI;
                }(Dialog));
                roulette.NoticeRouletteUI = NoticeRouletteUI;
            })(roulette = notice.roulette || (notice.roulette = {}));
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var NoticeDlgUI = /** @class */ (function (_super) {
            __extends(NoticeDlgUI, _super);
            function NoticeDlgUI() {
                return _super.call(this) || this;
            }
            NoticeDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.NoticeDlgUI.uiView);
            };
            NoticeDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerX": 0 } }, { "type": "View", "props": { "y": 88, "width": 1030, "var": "contents", "height": 660, "centerX": 128 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "ui/panel_common/img_com_quanping_cedi.png", "left": -48 }, "child": [{ "type": "Panel", "props": { "y": 18, "x": 0, "width": 363, "var": "tabPanel", "height": 642 } }, { "type": "Image", "props": { "y": 631, "x": 135, "var": "arrow", "skin": "ui/panel_notice/arrowBtns.png" } }] }, { "type": "Image", "props": { "y": 0, "x": -48, "width": 482, "var": "label", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 16, "x": 70, "skin": "ui/panel_notice/img_hd_bt01.png" } }, { "type": "Image", "props": { "y": 27, "x": 152, "skin": "ui/panel_notice/img_hdzx_hdzx.png" } }] }, { "type": "Image", "props": { "y": 10, "x": 496, "var": "tabs", "skin": "ui/panel_notice/noticeui_01.png", "centerX": 78 }, "child": [{ "type": "Image", "props": { "var": "tab_notice", "skin": "ui/panel_notice/noticeui_02.png" } }, { "type": "Image", "props": { "y": 0, "x": 231, "var": "tab_game", "skin": "ui/panel_notice/noticeui_03.png" } }, { "type": "Image", "props": { "y": 21, "x": 218, "var": "notice_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }, { "type": "Image", "props": { "y": 21, "x": 467, "var": "game_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }] }, { "type": "Image", "props": { "y": 2, "width": 292, "var": "controls", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55, "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }] };
            return NoticeDlgUI;
        }(Dialog));
        dlg.NoticeDlgUI = NoticeDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var AccountInfoViewUI = /** @class */ (function (_super) {
                __extends(AccountInfoViewUI, _super);
                function AccountInfoViewUI() {
                    return _super.call(this) || this;
                }
                AccountInfoViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.AccountInfoViewUI.uiView);
                };
                AccountInfoViewUI.uiView = { "type": "View", "props": { "width": 1016, "height": 602 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1016, "skin": "ui/pay/img_chongzhi_diban01_w602.png", "height": 602, "sizeGrid": "302,88,162,258" } }, { "type": "Box", "props": { "y": 451, "x": 0, "width": 1016 }, "child": [{ "type": "Image", "props": { "skin": "ui/pay/img_chongzhi_diban03.png", "sizeGrid": "0,33,0,56" } }, { "type": "Image", "props": { "y": 0, "x": 1012, "skin": "ui/pay/img_chongzhi_diban03.png", "scaleX": -1, "sizeGrid": "0,33,0,56" } }] }, { "type": "Image", "props": { "y": 0, "x": 241, "width": 534, "skin": "ui/pay/atitlebg.png", "sizeGrid": "0,126,0,126" }, "child": [{ "type": "Image", "props": { "y": 15, "x": 114, "skin": "ui/pay/img_chongzhi_zi_txndckxx.png" } }] }, { "type": "Image", "props": { "y": 551, "x": 800, "var": "confirmBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 551, "x": 214, "var": "prevBtn", "skin": "ui/pay/img_chongzhi_syb.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 426, "x": 283, "text": "*请务必填写正确存款人信息，否则会入款失败", "fontSize": 22, "color": "#ffba25" } }, { "type": "Box", "props": { "y": 107, "x": 136, "width": 750, "var": "itemBox", "height": 254 }, "child": [{ "type": "Box", "props": { "var": "nameGroup" }, "child": [{ "type": "Image", "props": { "y": 13, "skin": "ui/pay/img_chongzhi_zi_zsxm.png" } }, { "type": "Image", "props": { "x": 182, "width": 558, "skin": "ui/common/shurukuang.png", "height": 55, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 4, "x": 40, "width": 490, "var": "nameTxt", "promptColor": "#a2e1ee", "prompt": "请输入真实姓名", "height": 50, "fontSize": 32, "color": "#ffffff" } }] }] }, { "type": "Box", "props": { "y": 66, "var": "phoneGroup" }, "child": [{ "type": "Image", "props": { "y": 13, "skin": "ui/pay/img_chongzhi_zi_sjhm.png" } }, { "type": "Image", "props": { "x": 182, "width": 558, "skin": "ui/common/shurukuang.png", "height": 55, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 4, "x": 40, "width": 490, "var": "phoneTxt", "restrict": "0-9", "promptColor": "#a2e1ee", "prompt": "请输入手机号码", "maxChars": 11, "height": 50, "fontSize": 32, "color": "#ffffff" } }] }] }, { "type": "Box", "props": { "y": 133, "var": "bankNumGroup" }, "child": [{ "type": "Image", "props": { "y": 12, "skin": "ui/pay/img_chongzhi_zi_yhkh.png" } }, { "type": "Image", "props": { "x": 182, "width": 558, "skin": "ui/common/shurukuang.png", "height": 55, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 4, "x": 40, "width": 490, "var": "cardNumTxt", "restrict": "0-9", "promptColor": "#a2e1ee", "prompt": "请输入银行卡号", "height": 50, "fontSize": 32, "color": "#ffffff" } }] }] }, { "type": "Box", "props": { "y": 199, "var": "bankGroup" }, "child": [{ "type": "Image", "props": { "y": 12, "skin": "ui/pay/img_chongzhi_zi_zfyh.png" } }, { "type": "Image", "props": { "x": 182, "width": 558, "skin": "ui/common/shurukuang.png", "height": 55, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 4, "x": 40, "width": 372, "var": "bankNameTxt", "promptColor": "#a2e1ee", "prompt": "请选择支付银行", "height": 50, "fontSize": 32, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 30, "x": 486, "var": "chooseBtn", "skin": "ui/pay/img_chongzhi_xuanze.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] }] }] };
                return AccountInfoViewUI;
            }(View));
            pay.AccountInfoViewUI = AccountInfoViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var BankTransferInfoViewUI = /** @class */ (function (_super) {
                __extends(BankTransferInfoViewUI, _super);
                function BankTransferInfoViewUI() {
                    return _super.call(this) || this;
                }
                BankTransferInfoViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.BankTransferInfoViewUI.uiView);
                };
                BankTransferInfoViewUI.uiView = { "type": "View", "props": { "width": 1016, "height": 602 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1016, "skin": "ui/pay/img_chongzhi_diban01_w602.png", "height": 602, "sizeGrid": "302,88,162,258" } }, { "type": "Box", "props": { "y": 451, "x": 0, "width": 1016 }, "child": [{ "type": "Image", "props": { "skin": "ui/pay/img_chongzhi_diban03.png", "sizeGrid": "0,33,0,56" } }, { "type": "Image", "props": { "y": 0, "x": 1012, "skin": "ui/pay/img_chongzhi_diban03.png", "scaleX": -1, "sizeGrid": "0,33,0,56" } }] }, { "type": "Image", "props": { "y": 0, "x": 241, "width": 534, "skin": "ui/pay/atitlebg.png", "sizeGrid": "0,126,0,126" }, "child": [{ "type": "Image", "props": { "y": 15, "x": 115, "skin": "ui/pay/img_chongzhi_zi_qzzzyxzh.png" } }] }, { "type": "Image", "props": { "y": 551, "x": 800, "var": "confirmBtn", "skin": "ui/pay/img_chongzhi_yzz.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 551, "x": 214, "var": "prevBtn", "skin": "ui/pay/img_chongzhi_syb.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 426, "x": 222, "text": "*部分支付渠道充值金额随机1位小数，请您在付款时确定。", "fontSize": 22, "color": "#ffba25" } }, { "type": "Label", "props": { "y": 120, "x": 240, "width": 279, "var": "timeTxt", "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Label", "props": { "y": 120, "x": 674, "width": 131, "var": "moneyTxt", "underline": true, "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Label", "props": { "y": 177, "x": 240, "width": 570, "var": "payeeTxt", "underline": true, "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Label", "props": { "y": 233, "x": 240, "width": 570, "var": "accountTxt", "underline": true, "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Label", "props": { "y": 290, "x": 240, "width": 570, "var": "branchTxt", "underline": true, "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Label", "props": { "y": 346, "x": 240, "width": 570, "var": "bankTxt", "underline": true, "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Image", "props": { "y": 135, "x": 891, "var": "copyMoney", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 192, "x": 891, "var": "copyPayee", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 248, "x": 891, "var": "copyAccount", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 305, "x": 891, "var": "copyBranch", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 361, "x": 891, "var": "copyBank", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 124, "x": 84, "skin": "ui/pay/img_chongzhi_zi_crxx.png" } }, { "type": "Image", "props": { "y": 124, "x": 532, "skin": "ui/pay/img_chongzhi_zi_crje.png" } }] };
                return BankTransferInfoViewUI;
            }(View));
            pay.BankTransferInfoViewUI = BankTransferInfoViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var FixedMoneyItemUI = /** @class */ (function (_super) {
                __extends(FixedMoneyItemUI, _super);
                function FixedMoneyItemUI() {
                    return _super.call(this) || this;
                }
                FixedMoneyItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.FixedMoneyItemUI.uiView);
                };
                FixedMoneyItemUI.uiView = { "type": "View", "props": { "width": 228, "height": 103 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/pay/img_chongzhi_yeqian02.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "selectBg", "skin": "ui/pay/img_chongzhi_yeqian.png" } }] }, { "type": "Text", "props": { "y": 67, "x": 7, "width": 214, "var": "scopeTxt", "text": "0", "height": 32, "fontSize": 30, "color": "#663d12", "align": "center" } }, { "type": "Text", "props": { "y": 20, "x": 7, "width": 214, "var": "titleTxt", "text": "0", "overflow": "hidden", "height": 32, "fontSize": 30, "color": "#663d12", "align": "center" } }] };
                return FixedMoneyItemUI;
            }(View));
            pay.FixedMoneyItemUI = FixedMoneyItemUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var FixedMoneyViewUI = /** @class */ (function (_super) {
                __extends(FixedMoneyViewUI, _super);
                function FixedMoneyViewUI() {
                    return _super.call(this) || this;
                }
                FixedMoneyViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.FixedMoneyViewUI.uiView);
                };
                FixedMoneyViewUI.uiView = { "type": "View", "props": { "width": 1016, "height": 602 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1016, "skin": "ui/pay/img_chongzhi_diban01_w602.png", "height": 602, "sizeGrid": "302,88,162,258" } }, { "type": "Box", "props": { "y": 451, "x": 0, "width": 1016 }, "child": [{ "type": "Image", "props": { "skin": "ui/pay/img_chongzhi_diban03.png", "sizeGrid": "0,33,0,56" } }, { "type": "Image", "props": { "y": 0, "x": 1012, "skin": "ui/pay/img_chongzhi_diban03.png", "scaleX": -1, "sizeGrid": "0,33,0,56" } }] }, { "type": "Image", "props": { "y": 10, "x": 25, "width": 966, "skin": "ui/pay/img_chongzhi_diban02_968.png", "sizeGrid": "36,20,36,20" } }, { "type": "Panel", "props": { "y": 12, "x": 31, "width": 954, "var": "itemPanel", "height": 104 } }, { "type": "Image", "props": { "y": 124, "x": 27, "skin": "ui/pay/img_chongzhi_chuangwan.png" }, "child": [{ "type": "Text", "props": { "y": 11, "x": 51, "width": 318, "var": "infoTxt", "text": "请选择以下金额进行充值", "height": 30, "fontSize": 30, "color": "#ffba25" } }] }, { "type": "Box", "props": { "y": 187, "x": 20, "var": "btnBox" } }, { "type": "Image", "props": { "y": 551, "x": 507, "var": "submitBtn", "skin": "ui/pay/img_chongzhi_tijiaochongzhi.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return FixedMoneyViewUI;
            }(View));
            pay.FixedMoneyViewUI = FixedMoneyViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var HistoryItemUI = /** @class */ (function (_super) {
                __extends(HistoryItemUI, _super);
                function HistoryItemUI() {
                    return _super.call(this) || this;
                }
                HistoryItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.HistoryItemUI.uiView);
                };
                HistoryItemUI.uiView = { "type": "View", "props": { "width": 960, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 4, "width": 952, "skin": "ui/pay/img_cz_kuang.png", "height": 120 }, "child": [{ "type": "Image", "props": { "y": 72, "x": 513, "var": "copyBtn", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 12, "x": 23, "text": "充值: ", "fontSize": 20, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 37, "x": 23, "text": "支付方式:", "fontSize": 20, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 63, "x": 23, "text": "订单号:", "fontSize": 20, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 88, "x": 23, "text": "创建时间:", "fontSize": 20, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 12, "x": 90, "var": "stateTxt", "text": "xxx", "fontSize": 20, "color": "#fff600" } }, { "type": "Text", "props": { "y": 37, "x": 116, "var": "payMethodTxt", "text": "xxx", "fontSize": 20, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 63, "x": 98, "width": 366, "var": "orderTxt", "text": "xxx", "overflow": "hidden", "height": 20, "fontSize": 20, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 88, "x": 118, "var": "timeTxt", "text": "xxx", "fontSize": 20, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 12, "x": 722, "text": "支付金额:", "fontSize": 20, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 37, "x": 722, "text": "优惠金额:", "fontSize": 20, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 88, "x": 722, "text": "总计金额:", "fontSize": 20, "color": "#f9cb46", "bold": true } }, { "type": "Text", "props": { "y": 12, "x": 829, "width": 100, "var": "payMoneyTxt", "text": "xxx", "height": 20, "fontSize": 20, "color": "#a2e1ee", "align": "right" } }, { "type": "Text", "props": { "y": 37, "x": 829, "width": 100, "var": "saleTxt", "text": "xxx", "height": 20, "fontSize": 20, "color": "#a2e1ee", "align": "right" } }, { "type": "Text", "props": { "y": 88, "x": 829, "width": 100, "var": "totalTxt", "text": "xxx", "height": 20, "fontSize": 20, "color": "#a2e1ee", "bold": true, "align": "right" } }] }] };
                return HistoryItemUI;
            }(View));
            pay.HistoryItemUI = HistoryItemUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var OtherPayViewUI = /** @class */ (function (_super) {
                __extends(OtherPayViewUI, _super);
                function OtherPayViewUI() {
                    return _super.call(this) || this;
                }
                OtherPayViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.OtherPayViewUI.uiView);
                };
                OtherPayViewUI.uiView = { "type": "View", "props": { "width": 1016, "height": 602 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1016, "skin": "ui/pay/img_chongzhi_diban01_w602.png", "height": 602, "sizeGrid": "302,88,162,258" } }, { "type": "Box", "props": { "y": 451, "x": 0, "width": 1016 }, "child": [{ "type": "Image", "props": { "skin": "ui/pay/img_chongzhi_diban03.png", "sizeGrid": "0,33,0,56" } }, { "type": "Image", "props": { "y": 0, "x": 1012, "skin": "ui/pay/img_chongzhi_diban03.png", "scaleX": -1, "sizeGrid": "0,33,0,56" } }] }, { "type": "Image", "props": { "y": 10, "x": 25, "width": 966, "skin": "ui/pay/img_chongzhi_diban02_968.png", "sizeGrid": "36,20,36,20" } }, { "type": "Panel", "props": { "y": 12, "x": 31, "width": 954, "var": "itemPanel", "height": 104 } }, { "type": "Image", "props": { "y": 124, "x": 27, "skin": "ui/pay/img_chongzhi_chuangwan.png" }, "child": [{ "type": "Text", "props": { "y": 11, "x": 51, "width": 897, "var": "infoTxt", "text": "玩家常用充值金额", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffba25" } }] }, { "type": "Box", "props": { "y": 187, "x": 20, "var": "btnBox" } }, { "type": "Image", "props": { "y": 551, "x": 507, "var": "submitBtn", "skin": "ui/pay/img_chongzhi_tijiaochongzhi.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 415, "x": 228, "skin": "ui/pay/img_chongzhi_zi_xzje.png" } }, { "type": "Image", "props": { "y": 408, "x": 415, "width": 374, "skin": "ui/pay/img_chongzhi_shuru_w372png.png", "height": 52, "sizeGrid": "18,26,18,26" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 341, "var": "resetBtn", "skin": "ui/pay/img_chongzhi_shuru_x.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "y": 1, "x": 28, "width": 281, "var": "moneyTxt", "valign": "middle", "restrict": "0-9.", "promptColor": "#8eb5ee", "prompt": "请输入充值金额", "height": 50, "fontSize": 34, "color": "#ffffff", "align": "left" } }] }] };
                return OtherPayViewUI;
            }(View));
            pay.OtherPayViewUI = OtherPayViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var PayHistoryDlgUI = /** @class */ (function (_super) {
                __extends(PayHistoryDlgUI, _super);
                function PayHistoryDlgUI() {
                    return _super.call(this) || this;
                }
                PayHistoryDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.PayHistoryDlgUI.uiView);
                };
                PayHistoryDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 580, "x": 902, "var": "serviceBtn", "skin": "ui/pay/cz_lxkf.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 561, "x": 33, "skin": "ui/pay/czinfo.png" } }, { "type": "Image", "props": { "y": 19, "x": 416, "skin": "ui/pay/czmxtxt.png" } }, { "type": "Image", "props": { "y": 49, "x": 985, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 98, "x": 31, "width": 974, "skin": "ui/common/img_com_xiankuang.png", "height": 436, "sizeGrid": "15,15,15,16" } }, { "type": "List", "props": { "y": 157, "x": 38, "width": 960, "var": "itemList", "height": 374 } }, { "type": "CheckBox", "props": { "y": 98, "x": 31, "var": "tab1", "stateNum": 2, "skin": "ui/pay/check_czmx2.png" } }, { "type": "CheckBox", "props": { "y": 98, "x": 356, "var": "tab2", "stateNum": 2, "skin": "ui/pay/check_czmx1.png" } }, { "type": "CheckBox", "props": { "y": 98, "x": 679, "var": "tab3", "stateNum": 2, "skin": "ui/pay/check_czmx3.png" } }, { "type": "Text", "props": { "y": 329, "x": 274, "width": 486, "var": "infoTxt", "height": 30, "fontSize": 30, "color": "#ff0000", "bold": true, "align": "center" } }] };
                return PayHistoryDlgUI;
            }(Dialog));
            pay.PayHistoryDlgUI = PayHistoryDlgUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var PayMoneyBtnUI = /** @class */ (function (_super) {
                __extends(PayMoneyBtnUI, _super);
                function PayMoneyBtnUI() {
                    return _super.call(this) || this;
                }
                PayMoneyBtnUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.PayMoneyBtnUI.uiView);
                };
                PayMoneyBtnUI.uiView = { "type": "View", "props": { "width": 236, "height": 96 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/pay/btn_cz_jiner.png", "label": "label" } }, { "type": "Image", "props": { "y": -17, "x": -13, "var": "selectBg", "skin": "ui/pay/btn_cz_jiner-an.png", "label": "label" } }, { "type": "Text", "props": { "y": 27, "x": 18, "width": 200, "var": "txt", "text": "text", "fontSize": 34, "color": "#ffffff", "align": "center" } }] };
                return PayMoneyBtnUI;
            }(View));
            pay.PayMoneyBtnUI = PayMoneyBtnUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var PayResultViewUI = /** @class */ (function (_super) {
                __extends(PayResultViewUI, _super);
                function PayResultViewUI() {
                    return _super.call(this) || this;
                }
                PayResultViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.PayResultViewUI.uiView);
                };
                PayResultViewUI.uiView = { "type": "View", "props": { "width": 1016, "height": 602 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1016, "skin": "ui/pay/img_chongzhi_diban01_w602.png", "height": 602, "sizeGrid": "302,88,162,258" } }, { "type": "Box", "props": { "y": 451, "x": 0, "width": 1016 }, "child": [{ "type": "Image", "props": { "skin": "ui/pay/img_chongzhi_diban03.png", "sizeGrid": "0,33,0,56" } }, { "type": "Image", "props": { "y": 0, "x": 1012, "skin": "ui/pay/img_chongzhi_diban03.png", "scaleX": -1, "sizeGrid": "0,33,0,56" } }] }, { "type": "Image", "props": { "y": 551, "x": 508, "var": "confirmBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": 176, "skin": "ui/pay/img_chongzhi_chonggong.png" } }, { "type": "Text", "props": { "y": 66, "x": 272, "text": "恭喜您,您的订单已经提交成功!", "fontSize": 32, "color": "#33ff00" } }, { "type": "Text", "props": { "y": 112, "x": 272, "text": "充值金额", "fontSize": 26, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 112, "x": 380, "var": "moneyTxt", "text": "xxx", "fontSize": 26, "color": "#ffba25" } }, { "type": "Text", "props": { "y": 112, "x": 505, "var": "dwTxt", "text": "元", "fontSize": 26, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 205, "x": 272, "text": "正在排队,等待客服进行确认...", "fontSize": 32, "color": "#ffba25" } }, { "type": "Text", "props": { "y": 344, "x": 272, "text": "充值成功", "fontSize": 32, "color": "#ffba25" } }, { "type": "Text", "props": { "y": 394, "x": 272, "wordWrap": true, "width": 527, "text": "充值成功后,您的余额将在1分钟内更新,请稍后查看,若届时未更新,请联系在线客服。", "leading": 10, "height": 70, "fontSize": 26, "color": "#a2e1ee" } }] };
                return PayResultViewUI;
            }(View));
            pay.PayResultViewUI = PayResultViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var PayTabItemUI = /** @class */ (function (_super) {
                __extends(PayTabItemUI, _super);
                function PayTabItemUI() {
                    return _super.call(this) || this;
                }
                PayTabItemUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.PayTabItemUI.uiView);
                };
                PayTabItemUI.uiView = { "type": "View", "props": { "width": 344, "height": 112 }, "child": [{ "type": "Image", "props": { "y": 8, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_di.png" }, "child": [{ "type": "Image", "props": { "y": -8, "x": 0, "var": "tab_on", "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png" } }, { "type": "Image", "props": { "y": 0, "x": 235, "var": "hotIcon", "skin": "ui/pay/icon_cz_zhifu_hui.png" } }, { "type": "Image", "props": { "y": -1, "x": 29, "var": "payIcon", "skin": "ui/pay/payicon01.png" } }] }] };
                return PayTabItemUI;
            }(View));
            pay.PayTabItemUI = PayTabItemUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var SaveQrInfoViewUI = /** @class */ (function (_super) {
                __extends(SaveQrInfoViewUI, _super);
                function SaveQrInfoViewUI() {
                    return _super.call(this) || this;
                }
                SaveQrInfoViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.SaveQrInfoViewUI.uiView);
                };
                SaveQrInfoViewUI.uiView = { "type": "View", "props": { "width": 1016, "height": 602 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1016, "skin": "ui/pay/img_chongzhi_diban01_w602.png", "height": 602, "sizeGrid": "302,88,162,258" } }, { "type": "Box", "props": { "y": 451, "x": 0, "width": 1016 }, "child": [{ "type": "Image", "props": { "skin": "ui/pay/img_chongzhi_diban03.png", "sizeGrid": "0,33,0,56" } }, { "type": "Image", "props": { "y": 0, "x": 1012, "skin": "ui/pay/img_chongzhi_diban03.png", "scaleX": -1, "sizeGrid": "0,33,0,56" } }] }, { "type": "Image", "props": { "y": 0, "x": 223, "width": 569, "skin": "ui/pay/atitlebg.png", "sizeGrid": "0,126,0,126", "height": 71 }, "child": [{ "type": "Image", "props": { "y": 15, "x": 94, "skin": "ui/pay/img_chongzhi_zi_bcewm.png" } }] }, { "type": "Image", "props": { "y": 551, "x": 800, "var": "confirmBtn", "skin": "ui/pay/img_chongzhi_yzz.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 551, "x": 214, "var": "prevBtn", "skin": "ui/pay/img_chongzhi_syb.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 188, "x": 136, "width": 216, "var": "qrbox", "skin": "ui/pay/img_chongzhi_ewmdi.jpg", "height": 216 }, "child": [{ "type": "Image", "props": { "y": 7, "x": 7, "width": 202, "var": "qrIcon", "height": 202 } }] }, { "type": "Text", "props": { "y": 188, "x": 390, "wordWrap": true, "width": 574, "var": "helpTxt", "leading": 12, "height": 234, "fontSize": 22, "color": "#ffba25" } }, { "type": "Text", "props": { "y": 440, "x": 390, "width": 573, "var": "hintTxt", "text": "*请务必按此金额并在备注填写订单号", "height": 22, "fontSize": 22, "color": "#ff0000" } }, { "type": "Box", "props": { "y": 90, "x": 225, "var": "topGroup" }, "child": [{ "type": "Image", "props": { "skin": "ui/pay/img_chongzhi_zi_czje.png" } }, { "type": "Image", "props": { "y": 45, "skin": "ui/pay/img_chongzhi_zi_ddh.png" } }, { "type": "Text", "props": { "x": 170, "width": 202, "var": "moneyTxt", "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Label", "props": { "y": 43, "x": 170, "width": 248, "var": "numTxt", "underline": true, "height": 32, "fontSize": 32, "color": "#a2e1ee" } }, { "type": "Image", "props": { "y": 59, "x": 477, "var": "copyBtn", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return SaveQrInfoViewUI;
            }(View));
            pay.SaveQrInfoViewUI = SaveQrInfoViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var TransferPayItemUI = /** @class */ (function (_super) {
                __extends(TransferPayItemUI, _super);
                function TransferPayItemUI() {
                    return _super.call(this) || this;
                }
                TransferPayItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.TransferPayItemUI.uiView);
                };
                TransferPayItemUI.uiView = { "type": "View", "props": { "width": 958, "height": 154 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/pay/img_chongzhi_ditiao.png" } }, { "type": "Text", "props": { "y": 69, "x": 220, "text": "收款银行", "fontSize": 26, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 18, "x": 220, "text": "收款人", "fontSize": 34, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 112, "x": 220, "text": "汇款资讯", "fontSize": 26, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 69, "x": 356, "var": "bankTxt", "text": "xxx", "fontSize": 26, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 18, "x": 356, "var": "payeeTxt", "text": "xxx", "fontSize": 34, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 112, "x": 356, "width": 589, "var": "infoTxt", "text": "xxx", "overflow": "hidden", "height": 32, "fontSize": 26, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 7, "x": 4, "width": 131, "var": "numTxt", "text": "xxx", "fontSize": 48, "color": "#8eb5ee", "align": "center" } }] };
                return TransferPayItemUI;
            }(View));
            pay.TransferPayItemUI = TransferPayItemUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var TransferPayViewUI = /** @class */ (function (_super) {
                __extends(TransferPayViewUI, _super);
                function TransferPayViewUI() {
                    return _super.call(this) || this;
                }
                TransferPayViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.TransferPayViewUI.uiView);
                };
                TransferPayViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1016, "height": 602 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1016, "skin": "ui/pay/img_chongzhi_diban01_w602.png", "height": 602, "sizeGrid": "302,88,162,258" } }, { "type": "Text", "props": { "y": -32, "x": 52, "width": 912, "var": "titleTxt", "height": 30, "fontSize": 30, "color": "#f9cb46", "align": "center" } }, { "type": "Panel", "props": { "y": 23, "x": 30, "width": 981, "var": "contentGroup", "height": 570 }, "child": [{ "type": "Image", "props": { "y": 11, "skin": "ui/pay/img_chongzhi_zi_dybxzje.png" } }, { "type": "Image", "props": { "y": 314, "skin": "ui/pay/img_cz_f_dierbu.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 684, "var": "serviceBtn", "skin": "ui/pay/img_cz_f_zxkf.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 95, "x": 0, "var": "btnGroup" } }, { "type": "Box", "props": { "y": 378, "x": 0, "var": "itemBox" } }, { "type": "Image", "props": { "y": 0, "x": 318, "width": 374, "skin": "ui/pay/img_chongzhi_shuru_w372png.png", "height": 52, "sizeGrid": "18,26,18,26" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 341, "var": "resetBtn", "skin": "ui/pay/img_chongzhi_shuru_x.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "y": 1, "x": 28, "width": 276, "var": "moneyTxt", "valign": "middle", "restrict": "0-9.", "promptColor": "#8eb5ee", "prompt": "请输入充值金额", "height": 50, "fontSize": 34, "color": "#ffffff", "align": "left" } }] }] }] };
                return TransferPayViewUI;
            }(View));
            pay.TransferPayViewUI = TransferPayViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var VipPayItemUI = /** @class */ (function (_super) {
                __extends(VipPayItemUI, _super);
                function VipPayItemUI() {
                    return _super.call(this) || this;
                }
                VipPayItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.VipPayItemUI.uiView);
                };
                VipPayItemUI.uiView = { "type": "View", "props": { "width": 950, "height": 158 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 950, "skin": "ui/pay/img_cz_vip_tiao01.png", "height": 158, "sizeGrid": "0,48,0,264" } }, { "type": "Image", "props": { "y": 0, "x": 612, "var": "maxIcon", "skin": "ui/pay/wxMax.png" } }, { "type": "Image", "props": { "y": 86, "x": 725, "var": "copyBtn", "skin": "ui/common/copyui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 30, "x": 234, "width": 311, "var": "txt1", "text": "xxx", "overflow": "hidden", "height": 36, "fontSize": 32, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 71, "x": 234, "width": 127, "var": "txt2", "text": "aa", "height": 30, "fontSize": 24, "color": "#ffffff" } }, { "type": "Text", "props": { "y": 71, "x": 365, "width": 318, "var": "txt3", "text": "bb", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffffff" } }, { "type": "Text", "props": { "y": 106, "x": 234, "width": 688, "var": "txt4", "text": "ccc", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 24, "x": 78, "var": "minIcon", "skin": "ui/pay/wxMin.png" } }] };
                return VipPayItemUI;
            }(View));
            pay.VipPayItemUI = VipPayItemUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var VipPayViewUI = /** @class */ (function (_super) {
                __extends(VipPayViewUI, _super);
                function VipPayViewUI() {
                    return _super.call(this) || this;
                }
                VipPayViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.VipPayViewUI.uiView);
                };
                VipPayViewUI.uiView = { "type": "View", "props": { "width": 990, "height": 620 }, "child": [{ "type": "Panel", "props": { "y": 88, "x": 20, "width": 950, "var": "itemPanel", "height": 530 } }, { "type": "Image", "props": { "y": 14, "x": 131, "width": 728, "skin": "ui/pay/img_cz_yhid.png", "sizeGrid": "0,227,0,226" }, "child": [{ "type": "Image", "props": { "y": 33, "x": 625, "var": "copyBtn", "skin": "ui/pay/img_cz_fuzhiid.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 13, "x": 233, "width": 266, "var": "idTxt", "overflow": "hidden", "height": 36, "fontSize": 36, "color": "#ffffff" } }] }] };
                return VipPayViewUI;
            }(View));
            pay.VipPayViewUI = VipPayViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var WebBankDlgUI = /** @class */ (function (_super) {
                __extends(WebBankDlgUI, _super);
                function WebBankDlgUI() {
                    return _super.call(this) || this;
                }
                WebBankDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.WebBankDlgUI.uiView);
                };
                WebBankDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 55, "x": 708, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 24, "x": 286, "skin": "ui/pay/img_chongzhi _zi_xzyh.png" } }] }, { "type": "Image", "props": { "y": 426, "x": 376, "var": "confirmBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/common/img_com_xiankuang.png", "height": 274, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "List", "props": { "y": 5, "x": 23, "width": 644, "var": "itemList", "height": 264 } }] }] };
                return WebBankDlgUI;
            }(Dialog));
            pay.WebBankDlgUI = WebBankDlgUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var WebBankItemUI = /** @class */ (function (_super) {
                __extends(WebBankItemUI, _super);
                function WebBankItemUI() {
                    return _super.call(this) || this;
                }
                WebBankItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.WebBankItemUI.uiView);
                };
                WebBankItemUI.uiView = { "type": "View", "props": { "width": 644, "height": 58 }, "child": [{ "type": "Text", "props": { "y": 12, "x": 27, "width": 590, "var": "nameTxt", "height": 32, "fontSize": 32, "color": "#a2e1ee", "align": "center" } }, { "type": "Line", "props": { "y": 56, "x": 0, "toY": 0, "toX": 644, "lineWidth": 2, "lineColor": "#576cb4" } }] };
                return WebBankItemUI;
            }(View));
            pay.WebBankItemUI = WebBankItemUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var WeChatPublicItemUI = /** @class */ (function (_super) {
                __extends(WeChatPublicItemUI, _super);
                function WeChatPublicItemUI() {
                    return _super.call(this) || this;
                }
                WeChatPublicItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.WeChatPublicItemUI.uiView);
                };
                WeChatPublicItemUI.uiView = { "type": "View", "props": { "width": 950, "height": 158 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 950, "skin": "ui/pay/img_cz_vip_tiao01.png", "sizeGrid": "0,48,0,264" } }, { "type": "Image", "props": { "y": 0, "x": 612, "skin": "ui/pay/wxMax.png" } }, { "type": "Text", "props": { "y": 30, "x": 234, "width": 311, "text": "微信公众号", "overflow": "hidden", "height": 36, "fontSize": 32, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 106, "x": 234, "width": 661, "var": "infoTxt", "text": "xxx", "overflow": "hidden", "height": 32, "fontSize": 24, "color": "#ffffff" } }, { "type": "Text", "props": { "y": 71, "x": 234, "width": 423, "var": "titleTxt", "text": "bb", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 24, "x": 78, "skin": "ui/pay/wxMin.png" } }, { "type": "Image", "props": { "y": 86, "x": 725, "skin": "ui/pay/img_cz_vip_xiangqing.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return WeChatPublicItemUI;
            }(View));
            pay.WeChatPublicItemUI = WeChatPublicItemUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pay;
        (function (pay) {
            var WeChatPublicViewUI = /** @class */ (function (_super) {
                __extends(WeChatPublicViewUI, _super);
                function WeChatPublicViewUI() {
                    return _super.call(this) || this;
                }
                WeChatPublicViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pay.WeChatPublicViewUI.uiView);
                };
                WeChatPublicViewUI.uiView = { "type": "View", "props": { "width": 990, "height": 620 }, "child": [{ "type": "Panel", "props": { "y": 0, "x": 20, "width": 950, "var": "itemPanel", "height": 620 } }] };
                return WeChatPublicViewUI;
            }(View));
            pay.WeChatPublicViewUI = WeChatPublicViewUI;
        })(pay = dlg.pay || (dlg.pay = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var RechargeDlgUI = /** @class */ (function (_super) {
            __extends(RechargeDlgUI, _super);
            function RechargeDlgUI() {
                return _super.call(this) || this;
            }
            RechargeDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.RechargeDlgUI.uiView);
            };
            RechargeDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerX": 0 } }, { "type": "Image", "props": { "y": 334, "skin": "ui/pay/img_cz_hongbao.png", "right": 0 } }, { "type": "Box", "props": { "y": 124, "x": 353, "width": 900, "var": "viewBox", "height": 602, "centerX": 136 } }, { "type": "Image", "props": { "y": 1, "var": "TRgroup", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55 }, "child": [{ "type": "Image", "props": { "y": 45, "x": 166, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi02.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": -78, "var": "payBtn", "skin": "ui/pay/btn_cz_czmx.png", "label": "label", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": -319, "var": "serviceBtn", "skin": "ui/pay/img_chongzhi_zxkf.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 87, "x": 10, "var": "tabGroup", "skin": "ui/panel_common/img_com_quanping_cedi.png", "left": -48 }, "child": [{ "type": "Panel", "props": { "y": 45, "x": 0, "width": 363, "var": "tabPanel", "height": 620 } }, { "type": "Image", "props": { "x": 118, "var": "arrowBtn", "skin": "ui/pay/btn_cz_shangxia.png", "bottom": 28 } }] }, { "type": "Image", "props": { "y": 0, "x": 10, "var": "LTgroup", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 24, "x": 202, "skin": "ui/pay/img_cz_chongzhi.png" } }, { "type": "Image", "props": { "y": 8, "x": 61, "skin": "ui/pay/img_cz_biaotou-icon2.png" } }] }, { "type": "Image", "props": { "y": 300, "var": "errIcon", "skin": "ui/pay/pay_error.png", "centerX": 150 }, "child": [{ "type": "Text", "props": { "y": 250, "x": 9, "text": "该支付方式目前无法使用", "fontSize": 25, "color": "#aa9a9a" } }, { "type": "Text", "props": { "y": 285, "x": -23, "text": "敬请谅解!请选择其它支付方式!", "fontSize": 25, "color": "#aa9a9a" } }] }, { "type": "Image", "props": { "y": 80, "width": 419, "var": "infoGroup", "skin": "ui/pay/img_cz_youhui.png", "height": 58, "centerX": 132, "sizeGrid": "0,70,0,70" }, "child": [{ "type": "Text", "props": { "y": 8, "x": 169, "width": 152, "var": "infoTxt", "text": "xxx", "height": 30, "fontSize": 30, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 1, "x": 98, "skin": "ui/pay/img_congzhi_youhui01.png" } }] }] };
            return RechargeDlgUI;
        }(Dialog));
        dlg.RechargeDlgUI = RechargeDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var SystemDlgUI = /** @class */ (function (_super) {
            __extends(SystemDlgUI, _super);
            function SystemDlgUI() {
                return _super.call(this) || this;
            }
            SystemDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.SystemDlgUI.uiView);
            };
            SystemDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 320, "skin": "ui/common/img_grzx_bt10.png" } }, { "type": "Image", "props": { "y": 55, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 109, "x": 30, "width": 694, "skin": "ui/common/bgcomb.png", "height": 274, "sizeGrid": "20,20,20,20" } }, { "type": "Image", "props": { "y": 427, "x": 222, "var": "cancelBtn", "skin": "ui/common/quxiao.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 427, "x": 535, "var": "confirmBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 109, "x": 30, "width": 694, "var": "infoTxt", "valign": "middle", "text": "xxx", "height": 274, "fontSize": 35, "color": "#a0c5dd", "align": "center" } }] }] };
            return SystemDlgUI;
        }(Dialog));
        dlg.SystemDlgUI = SystemDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var TipsDlgUI = /** @class */ (function (_super) {
            __extends(TipsDlgUI, _super);
            function TipsDlgUI() {
                return _super.call(this) || this;
            }
            TipsDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.TipsDlgUI.uiView);
            };
            TipsDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/mindlg.png" } }, { "type": "Image", "props": { "y": 109, "width": 710, "skin": "ui/common/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 271, "centerX": 0 } }, { "type": "Image", "props": { "y": 22, "x": 320, "skin": "ui/panel_common/img_ts_ts.png" } }, { "type": "Image", "props": { "y": 52, "x": 706, "var": "btnClose", "top": 12, "skin": "ui/common/newclose.png", "right": 10, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 426, "x": 376, "var": "btnConfirm", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 109, "x": 32, "wordWrap": true, "width": 690, "var": "message", "valign": "middle", "text": "...", "leading": 12, "height": 270, "fontSize": 30, "font": "SimHei", "color": "#b3d8e3", "align": "center" } }] };
            return TipsDlgUI;
        }(Dialog));
        dlg.TipsDlgUI = TipsDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var EmbedLoadingViewUI = /** @class */ (function (_super) {
        __extends(EmbedLoadingViewUI, _super);
        function EmbedLoadingViewUI() {
            return _super.call(this) || this;
        }
        EmbedLoadingViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.EmbedLoadingViewUI.uiView);
        };
        EmbedLoadingViewUI.uiView = { "type": "View", "props": { "width": 800, "height": 400 }, "child": [{ "type": "Box", "props": { "var": "animBox", "centerY": 0, "centerX": 0 } }] };
        return EmbedLoadingViewUI;
    }(View));
    ui.EmbedLoadingViewUI = EmbedLoadingViewUI;
})(ui || (ui = {}));
(function (ui) {
    var LoadingViewUI = /** @class */ (function (_super) {
        __extends(LoadingViewUI, _super);
        function LoadingViewUI() {
            return _super.call(this) || this;
        }
        LoadingViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingViewUI.uiView);
        };
        LoadingViewUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Box", "props": { "var": "abox", "centerY": 0, "centerX": 0 } }] };
        return LoadingViewUI;
    }(View));
    ui.LoadingViewUI = LoadingViewUI;
})(ui || (ui = {}));
(function (ui) {
    var LobbyNewViewUI = /** @class */ (function (_super) {
        __extends(LobbyNewViewUI, _super);
        function LobbyNewViewUI() {
            return _super.call(this) || this;
        }
        LobbyNewViewUI.prototype.createChildren = function () {
            View.regComponent("view.anim.LightAnim", view.anim.LightAnim);
            View.regComponent("view.comp.GameIconListPanel", view.comp.GameIconListPanel);
            View.regComponent("view.comp.CycleComp", view.comp.CycleComp);
            View.regComponent("SkeletonPlayer", laya.ani.bone.Skeleton);
            View.regComponent("view.comp.NoticeComp", view.comp.NoticeComp);
            View.regComponent("view.comp.UserInfoView", view.comp.UserInfoView);
            _super.prototype.createChildren.call(this);
            this.createView(ui.LobbyNewViewUI.uiView);
        };
        LobbyNewViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/lobby/bg_dating.jpg", "centerX": 0 } }, { "type": "lightAnim", "props": { "y": 85, "x": 0, "var": "leftLight", "runtime": "view.anim.LightAnim" } }, { "type": "lightAnim", "props": { "y": 85, "var": "rightLight", "scaleX": -1, "runtime": "view.anim.LightAnim", "right": 300 } }, { "type": "GameIconListPanel", "props": { "y": 0, "x": 0, "var": "gameList", "runtime": "view.comp.GameIconListPanel" } }, { "type": "Image", "props": { "y": 675, "x": -58, "var": "bottomGroup", "skin": "ui/lobby/img_dating_downbar.png" }, "child": [{ "type": "Box", "props": { "y": -40, "x": 398, "width": 534, "var": "blGroup", "height": 114 }, "child": [{ "type": "Image", "props": { "y": 53, "x": 42, "var": "btn_yeb", "skin": "ui/lobby/menu/icon_dt_yeb.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 53, "x": 160, "var": "btn_rank", "skin": "ui/lobby/menu/icon_dt_ph.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 53, "x": 285, "var": "btn_mail", "skin": "ui/lobby/menu/icon_dt_yj.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 56, "var": "mailHot", "skin": "ui/lobby/hotpt.png" } }] }, { "type": "Image", "props": { "y": 53, "x": 403, "var": "btn_notice", "skin": "ui/lobby/menu/img_dating_tubiao2_03.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 56, "var": "noticeHot", "skin": "ui/lobby/hotpt.png" } }] }] }, { "type": "CycleComp", "props": { "y": -21, "x": 96, "var": "cirbox", "runtime": "view.comp.CycleComp" } }] }, { "type": "Box", "props": { "y": 633, "width": 419, "var": "brLayout", "right": 20, "height": 98 }, "child": [{ "type": "Sprite", "props": { "y": 49, "x": 303, "width": 212, "var": "payBtn", "pivotY": 47, "pivotX": 106, "height": 94 }, "child": [{ "type": "SkeletonPlayer", "props": { "y": 47, "x": 106, "width": 0, "var": "payAnim", "url": "ui/lobby/menu/czClip.sk", "height": 0 } }] }, { "type": "Sprite", "props": { "y": 49, "x": 106, "width": 212, "var": "withdrawBtn", "pivotY": 47, "pivotX": 106, "height": 94 }, "child": [{ "type": "SkeletonPlayer", "props": { "y": 47, "x": 106, "width": 0, "var": "tixianAnim", "url": "ui/lobby/menu/tixian.sk", "height": 0 } }] }] }, { "type": "Box", "props": { "y": 20, "width": 538, "var": "trLayout", "right": 20, "height": 123 }, "child": [{ "type": "Image", "props": { "y": 55, "x": 239, "var": "cirBtn", "skin": "ui/lobby/menu/img_dating_tubiao2_01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 55, "x": 363, "var": "actBtn", "skin": "ui/lobby/menu/img_dating_tubiao2_02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 70, "var": "actHot", "skin": "ui/lobby/hotpt.png" } }] }, { "type": "Image", "props": { "y": 55, "x": 487, "var": "serviceBtn", "skin": "ui/lobby/menu/icon_dt_kf.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 51, "x": 82, "width": 164, "var": "bindBtn", "pivotY": 51, "pivotX": 82, "height": 102 }, "child": [{ "type": "SkeletonPlayer", "props": { "y": 51, "x": 82, "width": 0, "var": "bindAnim", "url": "ui/lobby/menu/sjbd.sk", "height": 0 } }] }, { "type": "Sprite", "props": { "y": 51, "x": -94, "width": 156, "var": "agentBtn", "pivotY": 49, "pivotX": 78, "height": 98 }, "child": [{ "type": "SkeletonPlayer", "props": { "y": 49, "x": 78, "width": 0, "var": "agentAnim", "url": "ui/lobby/menu/daili.sk", "height": 0 } }] }] }, { "type": "NoticeComp", "props": { "y": 124, "var": "noticeView", "runtime": "view.comp.NoticeComp", "centerX": 36 } }, { "type": "UserInfoView", "props": { "y": 0, "x": -40, "var": "userInfo", "runtime": "view.comp.UserInfoView" } }] };
        return LobbyNewViewUI;
    }(View));
    ui.LobbyNewViewUI = LobbyNewViewUI;
})(ui || (ui = {}));
(function (ui) {
    var LoginSceneUI = /** @class */ (function (_super) {
        __extends(LoginSceneUI, _super);
        function LoginSceneUI() {
            return _super.call(this) || this;
        }
        LoginSceneUI.prototype.createChildren = function () {
            View.regComponent("SkeletonPlayer", laya.ani.bone.Skeleton);
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoginSceneUI.uiView);
        };
        LoginSceneUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "var": "bgImg", "skin": "ui/login/bg_denglu_dabeijing.jpg", "centerX": 0 } }, { "type": "SkeletonPlayer", "props": { "y": 375, "x": 667, "width": 0, "var": "logoClip", "url": "ui/login/loginAnim.sk", "height": 0 } }, { "type": "Image", "props": { "y": 70, "x": 1246, "var": "serviceBtn", "skin": "ui/login/icon_denglu_kefu.png", "right": 28, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 20, "x": 28, "width": 398, "var": "logoIcon", "height": 120 } }, { "type": "Image", "props": { "y": 721, "width": 1334, "var": "infoBg", "skin": "ui/login/img_denglu_banbenhao.png", "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": 6, "x": 103, "var": "verTxt", "text": "ver0.1.1", "height": 16, "fontSize": 16, "color": "#ffffff" } }, { "type": "Text", "props": { "y": 6, "x": 267, "var": "hintTxt", "text": "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活", "height": 16, "fontSize": 16, "color": "#ccffff" } }] }, { "type": "Image", "props": { "y": 683, "x": 1210, "var": "otherBtn", "skin": "ui/login/img_denglu_qita.png", "right": 28, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "ProgressBar", "props": { "y": 668, "width": 1290, "var": "progress", "value": 0.3, "skin": "ui/login/jdt.png", "sizeGrid": "9,24,10,23", "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": -35, "x": 311, "width": 600, "var": "progressTxt", "height": 28, "fontSize": 28, "color": "#ffffff", "align": "center" } }] }, { "type": "Box", "props": { "y": 574, "width": 788, "var": "fastGroup", "height": 118, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 40, "x": 668, "var": "fastStart", "skin": "ui/login/img_dneglu_kuaisukaishi.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 510, "skin": "ui/login/btn_denglu_qiehuandi_k516.png", "sizeGrid": "0,32,0,81", "label": "label", "height": 80 }, "child": [{ "type": "Image", "props": { "y": 39, "x": 451, "width": 92, "var": "toggleBtn", "skin": "ui/login/btn_denglu_qiehuan.png", "label": "label", "height": 61, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 15, "x": 93, "width": 293, "var": "userTxt", "height": 42, "fontSize": 42, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": -8, "x": 77, "var": "visitorMark", "skin": "ui/login/icon_denglu_youke.png" } }] }, { "type": "Box", "props": { "y": 594, "width": 1134, "var": "btnGroup", "space": 118, "height": 125, "centerX": 0, "align": "top" }, "child": [{ "type": "Image", "props": { "y": 50, "x": 563, "var": "wechatBtn", "skin": "ui/login/denglu_weixin.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 50, "x": 978, "var": "accountBtn", "skin": "ui/login/denglu_zhanbhao.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 50, "x": 148, "var": "visitorBtn", "skin": "ui/login/denglu_youke.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
        return LoginSceneUI;
    }(View));
    ui.LoginSceneUI = LoginSceneUI;
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var GameIconViewUI = /** @class */ (function (_super) {
            __extends(GameIconViewUI, _super);
            function GameIconViewUI() {
                return _super.call(this) || this;
            }
            GameIconViewUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.GameIconViewUI.uiView);
            };
            GameIconViewUI.uiView = { "type": "View", "props": { "width": 212, "height": 212 }, "child": [{ "type": "Image", "props": { "y": 10, "x": 10, "var": "bgIcon", "skin": "ui/lobby/iconbg1.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "normIcon", "skin": "ui/lobby/def_icon.png", "centerY": 0, "centerX": 0 } }, { "type": "Box", "props": { "var": "animbox", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "updateIcon", "top": 0, "skin": "ui/lobby/gengxing.png", "right": 0 } }, { "type": "Image", "props": { "var": "expectIcon", "skin": "ui/lobby/jqqd.png", "centerX": 0, "bottom": 0 } }, { "type": "Image", "props": { "x": 50, "var": "pauseIcon", "skin": "ui/lobby/weihuzhong.png", "centerX": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 66, "var": "lowMark", "skin": "ui/lobby/img_dating_tiyanfang2.png", "left": 6 } }, { "type": "Text", "props": { "y": 88, "x": 6, "width": 200, "var": "debugTxt", "overflow": "hidden", "height": 35, "fontSize": 35, "color": "#d4e513", "align": "center" } }] };
            return GameIconViewUI;
        }(View));
        UI.GameIconViewUI = GameIconViewUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var GameMenuItemUI = /** @class */ (function (_super) {
            __extends(GameMenuItemUI, _super);
            function GameMenuItemUI() {
                return _super.call(this) || this;
            }
            GameMenuItemUI.prototype.createChildren = function () {
                View.regComponent("SkeletonPlayer", laya.ani.bone.Skeleton);
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.GameMenuItemUI.uiView);
            };
            GameMenuItemUI.uiView = { "type": "View", "props": { "width": 288, "height": 76 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/lobby/img_dating_fenlei03.png" } }, { "type": "SkeletonPlayer", "props": { "y": 38, "x": 144, "width": 0, "var": "selectBg", "url": "ui/lobby/menu/menubg.sk", "height": 0 } }, { "type": "Image", "props": { "y": 5, "x": 15, "var": "icon", "skin": "ui/lobby/micon1.png" } }, { "type": "Image", "props": { "y": 20, "x": 105, "var": "title", "skin": "ui/lobby/dmenu1.png" } }] };
            return GameMenuItemUI;
        }(View));
        UI.GameMenuItemUI = GameMenuItemUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var MailItemViewUI = /** @class */ (function (_super) {
            __extends(MailItemViewUI, _super);
            function MailItemViewUI() {
                return _super.call(this) || this;
            }
            MailItemViewUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.MailItemViewUI.uiView);
            };
            MailItemViewUI.uiView = { "type": "View", "props": { "width": 464, "height": 77 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "normGroup", "skin": "ui/mailbox/img_yx_xtyj-kuang.png" }, "child": [{ "type": "Image", "props": { "y": 4, "x": 10, "var": "stateIcon", "skin": "ui/mailbox/icon_yx_xtyj-yj-g.png" } }, { "type": "Text", "props": { "y": 7, "x": 109, "width": 341, "var": "titleTxt", "text": "title", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffffff" } }, { "type": "Text", "props": { "y": 41, "x": 116, "width": 335, "var": "timeTxt", "text": "2018-12-23", "overflow": "hidden", "height": 26, "fontSize": 26, "color": "#ffffff", "align": "right" } }] }, { "type": "Image", "props": { "y": -3, "x": 0, "var": "selectPic", "skin": "ui/mailbox/img_yx_xtyj-kuang-l.png" } }, { "type": "Image", "props": { "y": 38, "x": 69, "var": "giftIcon", "skin": "ui/mailbox/img_yx_xtyj-lw.png" } }] };
            return MailItemViewUI;
        }(View));
        UI.MailItemViewUI = MailItemViewUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var SetPwdPanelUI = /** @class */ (function (_super) {
            __extends(SetPwdPanelUI, _super);
            function SetPwdPanelUI() {
                return _super.call(this) || this;
            }
            SetPwdPanelUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.SetPwdPanelUI.uiView);
            };
            SetPwdPanelUI.uiView = { "type": "View", "props": { "width": 712, "height": 466 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 712, "skin": "ui/common/img_com_xiankuang.png", "height": 362, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Box", "props": { "y": 111, "x": 56, "var": "panel1" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 19, "skin": "ui/fullMyCenter/img_grzx_sr10.png" } }, { "type": "Image", "props": { "y": 89, "skin": "ui/fullMyCenter/img_grzx_sr05.png" } }, { "type": "Image", "props": { "y": 171, "x": 0, "skin": "ui/fullMyCenter/img_grzx_sr06.png" } }, { "type": "Image", "props": { "y": -1, "x": 185, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入旧密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 82, "x": 185, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt2", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 164, "x": 185, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt3", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn3", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Box", "props": { "y": 79, "x": 54, "width": 656, "var": "panel2", "height": 265 }, "child": [{ "type": "Image", "props": { "y": 150, "skin": "ui/common/img_dl_tianxie05.png" } }, { "type": "Image", "props": { "y": 223, "skin": "ui/fullMyCenter/img_grzx_sr06.png" } }, { "type": "Image", "props": { "y": 96, "x": 487, "skin": "ui/common/yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "timeTxt", "text": "0", "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 96, "x": 487, "var": "getCodeBtn", "skin": "ui/common/yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 80, "x": 20, "skin": "ui/common/img_dl_tianxie03.png" } }, { "type": "Image", "props": { "y": 8, "x": 19, "skin": "ui/common/img_dl_tianxie04.png" } }, { "type": "Image", "props": { "y": 0, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 378, "var": "phoneTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 143, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt4", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn4", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 215, "x": 176, "width": 410, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt5", "valign": "middle", "type": "password", "restrict": "0-9a-zA-Z", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn5", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 72, "x": 176, "width": 196, "skin": "ui/common/shurukuang.png", "height": 50, "sizeGrid": "22,20,21,18" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 168, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }] }, { "type": "Image", "props": { "y": 426, "x": 356, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 19, "x": 92, "var": "checkGroup1" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 57, "skin": "ui/fullMyCenter/img_grzx_gx05.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "width": 202, "var": "checkBtn1", "skin": "ui/fullMyCenter/check_gou.png", "selected": false, "height": 42 } }] }, { "type": "Box", "props": { "y": 19, "x": 355, "var": "checkGroup2" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 57, "skin": "ui/fullMyCenter/img_grzx_gx04.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "width": 236, "var": "checkBtn2", "skin": "ui/fullMyCenter/check_gou.png", "height": 42 } }] }] }] };
            return SetPwdPanelUI;
        }(View));
        UI.SetPwdPanelUI = SetPwdPanelUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map