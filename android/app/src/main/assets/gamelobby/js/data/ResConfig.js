var ResConfig = /** @class */ (function () {
    function ResConfig() {
    }
    /**
     * 通过头像id获取头像skin
     * @param id 注意格式为01,02...
     */
    ResConfig.getHeadSkinByID = function (id) {
        return "touxiang/img_touxiang_" + id + ".jpg";
    };
    /**
     * 通过别名获取游戏本地配置
     * @param alias
     */
    ResConfig.getGameIconConfig = function (alias) {
        var config = ConfObjRead.getGameIconConfig();
        var list = config.list;
        var len = list.length;
        var arr = list.filter(function (value) { return value.alias == alias; });
        if (arr && arr.length > 0)
            return arr[0];
        //如果没有找到，就使用默认数据
        alias = config.defaultIcon;
        arr = list.filter(function (value) { return value.alias == alias; });
        return arr[0];
    };
    ResConfig.addTween = true; //大厅元素初始化是否添加淡入动画
    //转移至version.json
    ResConfig.platform_font = [
        {
            "platform": ["MAC", "IOS"],
            "font": "兰亭黑 中黑"
        },
        {
            "platform": ["Android"],
            "font": "思源黑体"
        },
        {
            "platform": ["PC"],
            "font": "微软雅黑"
        }
    ];
    /**
     * 绑定送金界面位图字体
     */
    ResConfig.bitFont_bindPhone = {
        "0": "ui/bindPhone/bit_font00.png",
        "1": "ui/bindPhone/bit_font01.png",
        "2": "ui/bindPhone/bit_font02.png",
        "3": "ui/bindPhone/bit_font03.png",
        "4": "ui/bindPhone/bit_font04.png",
        "5": "ui/bindPhone/bit_font05.png",
        "6": "ui/bindPhone/bit_font06.png",
        "7": "ui/bindPhone/bit_font07.png",
        "8": "ui/bindPhone/bit_font08.png",
        "9": "ui/bindPhone/bit_font09.png",
        ".": "ui/bindPhone/bit_font10.png"
    };
    /**
     * 通用金币位图字体
     */
    ResConfig.bitFont_norm = {
        "0": "ui/bitFont/goldFont/gtxt01.png",
        "1": "ui/bitFont/goldFont/gtxt02.png",
        "2": "ui/bitFont/goldFont/gtxt03.png",
        "3": "ui/bitFont/goldFont/gtxt04.png",
        "4": "ui/bitFont/goldFont/gtxt05.png",
        "5": "ui/bitFont/goldFont/gtxt06.png",
        "6": "ui/bitFont/goldFont/gtxt07.png",
        "7": "ui/bitFont/goldFont/gtxt08.png",
        "8": "ui/bitFont/goldFont/gtxt09.png",
        "9": "ui/bitFont/goldFont/gtxt10.png",
        ".": "ui/bitFont/goldFont/gtxt11.png",
        ",": "ui/bitFont/goldFont/gtxt12.png",
        "万": "ui/bitFont/goldFont/gtxt13.png",
        "亿": "ui/bitFont/goldFont/gtxt14.png"
    };
    /**
     * 邮件系统金币位图字体
     */
    ResConfig.bitFont_mail = {
        "0": "ui/bitFont/mailFont/mtxt01.png",
        "1": "ui/bitFont/mailFont/mtxt02.png",
        "2": "ui/bitFont/mailFont/mtxt03.png",
        "3": "ui/bitFont/mailFont/mtxt04.png",
        "4": "ui/bitFont/mailFont/mtxt05.png",
        "5": "ui/bitFont/mailFont/mtxt06.png",
        "6": "ui/bitFont/mailFont/mtxt07.png",
        "7": "ui/bitFont/mailFont/mtxt08.png",
        "8": "ui/bitFont/mailFont/mtxt09.png",
        "9": "ui/bitFont/mailFont/mtxt10.png",
        "x": "ui/bitFont/mailFont/mtxt11.png",
        ".": "ui/bitFont/mailFont/mtxt12.png",
        ",": "ui/bitFont/mailFont/mtxt13.png"
    };
    /**
     * 代理中心金币位图字体
     */
    ResConfig.bitFont_agent = {
        "0": "ui/bitFont/agentFont/atxt00.png",
        "1": "ui/bitFont/agentFont/atxt01.png",
        "2": "ui/bitFont/agentFont/atxt02.png",
        "3": "ui/bitFont/agentFont/atxt03.png",
        "4": "ui/bitFont/agentFont/atxt04.png",
        "5": "ui/bitFont/agentFont/atxt05.png",
        "6": "ui/bitFont/agentFont/atxt06.png",
        "7": "ui/bitFont/agentFont/atxt07.png",
        "8": "ui/bitFont/agentFont/atxt08.png",
        "9": "ui/bitFont/agentFont/atxt09.png",
        ".": "ui/bitFont/agentFont/atxt10.png",
        ",": "ui/bitFont/agentFont/atxt11.png",
        "+": "ui/bitFont/agentFont/atxt12.png"
    };
    /**
     * 背景音乐
     */
    ResConfig.musicUrl = "./assets/raw/bgm_lobby.mp3";
    /**
     * 游戏当前版本号
     */
    ResConfig.versions = "版本号：4.0424.2154";
    return ResConfig;
}());
//# sourceMappingURL=ResConfig.js.map