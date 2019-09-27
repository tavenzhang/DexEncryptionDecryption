var Toast = /** @class */ (function () {
    function Toast() {
    }
    /**
     * 显示toast
     * @param str
     */
    Toast.showToast = function (str) {
        if (!str || str.length < 2)
            return;
        if (!this.tipbox) {
            this.tipbox = new Laya.Sprite();
            this.tipbox.zOrder = Dialog.manager.zOrder + 10;
            Laya.stage.addChild(this.tipbox);
        }
        var ui = Laya.Pool.getItem(this.poolMark);
        if (!ui)
            ui = new view.comp.ToastView();
        ui.readInfo(str);
        this.tipbox.addChild(ui);
        this.tipArr.push(ui);
        if (!this.uiHeight)
            this.uiHeight = ui.height;
        this.layout();
    };
    //重新调整布局
    Toast.layout = function () {
        var arr = this.tipArr.slice();
        arr.reverse();
        var start = Laya.stage.height - this.uiHeight >> 1;
        var gap = 6;
        arr.forEach(function (ui, index) {
            if (index != 0) {
                var toy = start - index * (ui.height + gap);
                Laya.Tween.to(ui, { y: toy }, 300);
            }
        });
    };
    Toast.tipArr = [];
    Toast.poolMark = "toastItem"; //用于缓存对象
    return Toast;
}());
//# sourceMappingURL=Toast.js.map