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
/**
*
* 自定义键盘
*/
var KeyboardView = /** @class */ (function (_super) {
    __extends(KeyboardView, _super);
    function KeyboardView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    KeyboardView.prototype.initView = function () {
        var _this = this;
        this.width = Laya.stage.width;
        this.numGroup.width = this.width;
        var offset = this.width - 1334 >> 1;
        if (offset > 0)
            this.confirmBtn.right += offset;
        //点击透明背景
        this.bgmc.on(Laya.Event.MOUSE_DOWN, this, function () {
            KeyboardView.hide();
        });
        //完成
        EventManager.addTouchScaleListener(this.confirmBtn, this, function () {
            SoundPlayer.clickSound();
            if (_this.target)
                _this.target.text = _this.input;
            if (_this.vo.caller && _this.vo.callback)
                _this.vo.callback.call(_this.vo.caller, _this.input);
            KeyboardView.hide();
        }, null, 0.7, true);
        var btn;
        for (var i = 0; i < 12; i++) {
            btn = this["btn" + i];
            if (btn)
                EventManager.addTouchScaleListener(btn, this, this.btnHandler, i, 0.7, true, false);
        }
    };
    KeyboardView.prototype.btnHandler = function (e, num) {
        //长度限制
        if (this.vo.maxLen && this.input.length >= this.vo.maxLen && num != 11) {
            return;
        }
        if (num < 10) {
            this.input += num;
        }
        else if (num == 10) { //小数点
            this.input += ".";
        }
        else if (num == 11) { //删除键
            this.input = this.input.substr(0, this.input.length - 1);
        }
        this.inputTxt.text = this.input;
    };
    /**
     * 绑定自定义键盘
     * @param vo
     */
    KeyboardView.bindKeyboard = function (input, vo) {
        var _this = this;
        vo.input = input;
        input.editable = false;
        input.on(Laya.Event.MOUSE_DOWN, this, function () {
            input.focus = false;
            _this.show(input.text, vo);
        });
    };
    //备用方法
    KeyboardView.bindKeyboardByBtn = function (btn, input, vo) {
        var _this = this;
        vo.input = input;
        btn.on(Laya.Event.MOUSE_DOWN, this, function () {
            _this.show(input.text, vo);
        });
    };
    /**
     * 刷新界面
     * @param hint
     * @param caller
     * @param callback
     */
    KeyboardView.prototype.update = function (input, vo) {
        var _this = this;
        this.target = vo.input;
        this.vo = vo;
        this.input = input || "";
        this.inputTxt.text = this.input;
        if (vo.hint)
            this.inputTxt.prompt = vo.hint;
        else
            this.inputTxt.prompt = "请输入金额";
        //设置类型
        if (this.target)
            this.inputTxt.type = this.target.type;
        else
            this.inputTxt.type = "text";
        this.inputTxt.focus = true;
        Laya.timer.once(10, this, function () {
            _this.inputTxt.focus = false;
        });
    };
    /**
     * 显示键盘
     * @param hint 输入提示
     * @param caller
     * @param callback
     */
    KeyboardView.show = function (input, vo) {
        if (input === void 0) { input = ""; }
        if (!this.view) {
            this.view = new KeyboardView();
        }
        this.view.update(input, vo);
        this.view.zOrder = Dialog.manager.zOrder + 10;
        this.view.y = Laya.stage.height;
        Laya.stage.addChild(this.view);
        Laya.Tween.to(this.view, { y: 0 }, 200, Laya.Ease.cubicOut);
    };
    KeyboardView.hide = function () {
        var _this = this;
        if (this.view) {
            Laya.Tween.to(this.view, { y: Laya.stage.height }, 200, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                _this.view.removeSelf();
            }, null, false));
        }
    };
    return KeyboardView;
}(ui.comp.KeyboardViewUI));
//# sourceMappingURL=KeyboardView.js.map