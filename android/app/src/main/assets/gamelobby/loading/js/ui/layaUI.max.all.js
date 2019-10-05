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
    var UpdateViewUI = /** @class */ (function (_super) {
        __extends(UpdateViewUI, _super);
        function UpdateViewUI() {
            return _super.call(this) || this;
        }
        UpdateViewUI.prototype.createChildren = function () {
            View.regComponent("SkeletonPlayer", laya.ani.bone.Skeleton);
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.UpdateViewUI.uiView);
        };
        UpdateViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "update/updatabg.jpg", "height": 750, "centerX": 0 } }, { "type": "Image", "props": { "y": 721, "width": 1334, "var": "infoBar", "skin": "update/img_denglu_banbenhao.png", "centerX": 0 }, "child": [{ "type": "Label", "props": { "y": 6, "text": "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活", "fontSize": 16, "color": "#ccffff", "centerX": 0 } }] }, { "type": "SkeletonPlayer", "props": { "y": 374, "x": 666, "width": 1, "var": "logoClip", "url": "update/loginAnim.sk", "height": 1 } }, { "type": "Image", "props": { "y": 70, "var": "serviceBtn", "skin": "update/icon_kf.png", "right": 28, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 20, "x": 28, "width": 398, "var": "logo", "height": 120 } }, { "type": "ProgressBar", "props": { "y": 668, "width": 1290, "var": "progress", "skin": "update/jdt.png", "centerX": 0, "sizeGrid": "0,28,0,25" }, "child": [{ "type": "Text", "props": { "y": -35, "x": 345, "width": 600, "var": "progressTxt", "height": 28, "fontSize": 28, "color": "#ffffff", "align": "center" } }] }] };
        return UpdateViewUI;
    }(View));
    ui.UpdateViewUI = UpdateViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map