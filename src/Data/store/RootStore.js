import UserStore from "./UserStore";

'use-strict';
import CommonBoxStore from "./CommonBoxStore";
import AppInfoStore from "./AppInfoStore";
import BBLStore from "./BBLStore";
import DataStore from "./DataStore";
import HotFixStore from "./HotFixStore";

import GameUIStroe from "./GameUIStroe";
import GameUpateStore from "./GameUpateStore";
//中央store 整合app 状态 需要多页面共享数据的store 请放在此处 方便注入 以及调用。
class RootStore {
    constructor() {
        this.appStore= new AppInfoStore()
        this.commonBoxStore=new CommonBoxStore();
        this.hotFixStore = new HotFixStore();
        this.bblStore =new BBLStore();
        this.userStore = new UserStore();
    }
}

const rootStore = new RootStore();

export default rootStore


