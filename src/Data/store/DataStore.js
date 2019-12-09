import {action, observable} from 'mobx'
import {unzip, zip} from 'react-native-zip-archive'
import RNFS from "react-native-fs";
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import NetUitls from "../../Common/Network/TCRequestUitls";
import rootStore from "./RootStore";
import CodePush from 'react-native-code-push'
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";
import FileTools from "../../Common/Global/FileTools";
import {appVersion, config} from "../../Common/Network/TCRequestConfig";
import {configAppId, versionHotFix} from "../../config/appConfig";
import DeviceInfo from 'react-native-device-info';
export default class DataStore {

    @observable
    homeVersionM = {name: "home", versionNum: "5_10", baseVersion: "1", source: "", isFlush: false};

    @observable
    isAppInited = false;


    @observable
    originAppDir = G_IS_IOS ? (MainBundlePath + '/assets/gamelobby') : "file:///android_asset/gamelobby";

    @observable
    targetAppDir = G_IS_IOS ? DocumentDirectoryPath + "/gamelobby" : `file:///${DocumentDirectoryPath}/gamelobby`;
    @observable
    appGameListM = {};
    @observable
    log = "";
    @observable
    appData = {};
    //下载jobId
    currentDownId = 1;
    @observable
    isCheckRequesting = false;
    @observable
    isAppSound = false;

    constructor() {
        this.copy_assets_to_dir = this.copy_assets_to_dir.bind(this);
        this.onSaveCopyState = this.onSaveCopyState.bind(this);
        this.initAppHomeCheck = this.initAppHomeCheck.bind(this);
        this.androdi_copy_assets_to_dir = this.androdi_copy_assets_to_dir.bind(this);
    }

    @action
    getGameRootDir() {
        if (this.isAppInited) {
            return G_IS_IOS ? DocumentDirectoryPath : `file:///${DocumentDirectoryPath}`;
        } else {
            return G_IS_IOS ? (MainBundlePath + '/assets') : "file:///android_asset";
        }
    }

    @action
    async initAppHomeCheck() {
        if(TW_Store.gameUpateStore.isIncludeLoadView){
            if (this.isAppInited) {
                this.loadHomeVerson();
            } else {
                setTimeout(this.initAppHomeCheck,1000);
            }
            const is_lobby_exist =await RNFS.exists(TW_Store.dataStore.originAppDir + "/index.html");
            TW_Store.gameUpateStore.isIncludeLobby = is_lobby_exist;
            this.log += "Url--this.is_lobby_exist----"+is_lobby_exist +"----\n";
        }else{
            this.loadHomeVerson();
        }

    }



    async loadHomeVerson() {
        let Url = TW_Store.dataStore.getHomeWebHome() + "/assets/conf/version.json";
        const target_dir_exist =  await RNFS.exists(Url);
        TW_Log("Url-----home---target_dir_exist=" + target_dir_exist, Url);
        this.log += "\nUrl-----home---target_dir_exist=Url-" + Url+"---target_dir_exist=="+target_dir_exist;
        if (target_dir_exist) {
            RNFS.readFile(Url).then(ret => {
                let data = ret
                if (typeof ret === 'object') {
                    data = ret;
                } else {
                    try {
                        data = JSON.parse(ret);
                    } catch (e) {
                        TW_Log("Url-----home--readFile -then-readFile", e)
                    }
                }
                this.startCheckZipUpdate(data);
            })
        } else {
            this.startCheckZipUpdate(null);
        }
    }


    @action
    startCheckZipUpdate = (versionData = null) => {
        if (versionData) {
            this.homeVersionM = versionData;
            this.checkHomeZipUpdate();
        } else {
            TW_Data_Store.getItem(TW_DATA_KEY.versionBBL).then((ret) => {
                let verionM = null;
                try {
                    verionM = JSON.parse(ret);
                } catch (error) {
                    this.log += "-->startCheckZipUpdate---catch -==-error==" + error;
                }
                if (ret && verionM) {
                    this.homeVersionM = verionM;
                }
                this.checkHomeZipUpdate();
            })
        }
        this.log += "-->startCheckZipUpdate----homeVersionM-==-" + JSON.stringify(this.homeVersionM)
    }



    checkHomeZipUpdate = () => {
        TW_Log("TW_DATA_KEY.versionBBL start  http ===> " + rootStore.bblStore.getVersionConfig());
        this.log += "==>getVersionConfig=" + rootStore.bblStore.getVersionConfig();
        this.isCheckRequesting = true;
        //如果超过3秒还没返回数据 默认不更新
        setTimeout(() => {
            if (this.isCheckRequesting) {
                this.isCheckRequesting = false;
                this.hideLoadingView();
                this.log += "\n==>TW_Store.dataStore.this.isCheckRequesting" + this.isCheckRequesting;
                TW_SplashScreen_HIDE();
            }
        }, 3000);
        NetUitls.getUrlAndParamsAndCallback(rootStore.bblStore.getVersionConfig(), null, (rt) => {
            this.log += "\n==>TW_Store.dataStore.this.getUrlAndParamsAndCallbackrt.rs--" + rt.rs;
            this.isCheckRequesting = false;
            TW_Log("TW_DATA_KEY.versionBBL http results== ", rt);
            TW_SplashScreen_HIDE();
            if (rt.rs) {
                let content = rt.content;
                this.content = content;
                let zipSrc = this.content.source;
                if (G_IS_IOS) {
                    zipSrc = this.content.source_ios ? this.content.source_ios : zipSrc;
                } else {
                    zipSrc = this.content.source_android ? this.content.source_android : zipSrc;
                }
                this.log += "\nthis.homeVersionM.zipSrc--pressss-" +zipSrc+"---zipSrc.indexOf=="+zipSrc.indexOf("http") +"===\n";
                if (zipSrc) {
                    //如果config source 是相对路径 加上 config 域名
                    if (zipSrc.indexOf("http") <= -1) {
                        zipSrc = rootStore.bblStore.getVersionDomain() + "/" + zipSrc;
                    }
                }

                this.log += "\n==>TW_Store.dataStore.isAppInited=" + TW_Store.dataStore.isAppInited+"---domain--"+TW_Store.bblStore.gameDomain+"--\n";
                this.log += "\nthis.homeVersionM.versionNum---" + this.homeVersionM.versionNum + "--content.versionNum=" + content.versionNum;

                TW_Log("TW_DATA_KEY.versionBBL  this.homeVersionM.versionNum =" + this.homeVersionM.versionNum, content.versionNum);
                if (this.homeVersionM.versionNum != content.versionNum) {
                    TW_Store.gameUpateStore.isNeedUpdate = true;
                    if (!TW_Store.gameUpateStore.isAppDownIng) {
                        this.downloadFile(zipSrc, rootStore.bblStore.tempZipDir, content.versionNum);
                    }
                } else {
                    this.hideLoadingView();
                }
                this.log += "\nthis.homeVersionM.zipSrc--last-" +zipSrc+"--gameUpateStore.isLoading--"+TW_Store.gameUpateStore.isLoading+"===TW_Store.gameUpateStore.isNeedUpdat=="+TW_Store.gameUpateStore.isNeedUpdate+"===\n";
            } else {
                this.onSaveVersionM({}, true);
                this.hideLoadingView()
            }
        })
    }

    @action
    async hideLoadingView() {
        const isExist = await RNFS.exists(TW_Store.dataStore.targetAppDir + "/index.html");
        if(isExist){
            TW_Store.gameUpateStore.isNeedUpdate = false;
        }
    }


    onSaveVersionM = (srcData, isHttpFail = false, callFunc) => {
        TW_Log("TW_DATA_KEY.versionBBL onSaveVersionM isHttpFail==" + isHttpFail, srcData);
        this.homeVersionM = {...this.homeVersionM, ...srcData, isHttpFail};
        TW_Data_Store.setItem(TW_DATA_KEY.versionBBL, JSON.stringify(this.homeVersionM), (ret) => {
            if (callFunc) {
                callFunc(ret);
            }
        });

    }

    clearCurrentDownJob = () => {
        RNFS.stopDownload(this.currentDownId);
        TW_Store.commonBoxStore.isShow = false;
    }

    onRetartApp = () => {
      if(TN_IS_HAVE_CODE_PUSH) {
          CodePush.restartApp();
      }
    }

    downloadFile = (formUrl, downloadDest, newVersion) => {
        this.clearCurrentDownJob();
        this.downloadDest = downloadDest;
        formUrl = formUrl + "?verson=" + (newVersion ? newVersion : Math.random());
        this.log +="\nversionBBL---downloadFile==" + formUrl+"--\n";
        this.log +="\nversionBBL---downloadFile==newVersion==" + newVersion+"--\n";
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: G_IS_IOS ? false : true,
            begin: (res) => {
                TW_Log('versionBBL--begin', res);
                // this.log+="==>downloadFile--begin="+res;
                //{statusCode: 404, headers: {…}, jobId: 1, contentLength: 153
                if (res.statusCode != 404) {
                    TW_Store.gameUpateStore.isLoading = true;
                } else {
                    TW_Store.gameUpateStore.isLoading = false;
                    this.hideLoadingView();
                }
            },
            progress: (res) => {
                // this.log+="==>progress-="+res;
                let percent = 0;
                let tempContent = 40000000; //如果读取不到总大小 因为cdn等因素 默认使用18m 到0.99 等待，
                if (res.contentLength > 0) {
                    tempContent=res.contentLength;
                    percent = (res.bytesWritten / tempContent).toFixed(2);
                } else {
                    tempContent=40000000;
                    let tempPercent = (res.bytesWritten / tempContent).toFixed(2);
                    percent = tempPercent >= 0.99 ? 0.99 : tempPercent;
                }

                // TW_Log("downloadFile--------progress-TW_Store.gameUpateStore.isNeedUpdate=-",percent);
                if (!TW_Store.gameUpateStore.isAppDownIng) {
                    TW_LoaderOnValueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.game_loading, {
                        data: {
                            do: "loading",
                            percent
                        }
                    }));
                }
                if(!TW_Store.gameUpateStore.isIncludeLoadView){
                    TW_Store.commonBoxStore.curPecent=percent;
                    if(!TW_Store.gameUpateStore.isAppDownIng){
                        TW_Store.commonBoxStore.isShow=true;
                    }else{
                        TW_Store.commonBoxStore.isShow=false;
                    }

                }

            },
            readTimeout: 4000,
            connectionTimeout:4000
        };
        try {
            const ret = RNFS.downloadFile(options);
            this.log += "==>downloadFile-=" + options;
            this.currentDownId = ret ? ret.jobId : 0;
            TW_Log("downloadFile---------start- this.currentDownId-" + this.currentDownId, ret);
            ret.promise.then(res => {
                TW_Log("downloadFile---------start-lastest---", ret);
                TW_Log('versionBBL---downloadFile---sucess file://' + downloadDest, res);
                // this.log+="==>downloadFile--promise="+JSON.stringify(res)+"---state--"+res.statusCode;
                if (`${res.statusCode}` != "404") {
                    if (!TW_Store.gameUpateStore.isAppDownIng) {
                        this.unzipNewCourse(downloadDest);
                    }
                } else {
                    this.log += "==>downloadFile--fail--notstart=";
                    TW_Log('versionBBL --downloadFile --下载文件不存在--', formUrl);
                    TW_Store.gameUpateStore.isLoading = false;
                    this.hideLoadingView();
                    TW_LoaderOnValueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.game_loading, {data: {do: "loadFinish"}}));
                }
            })
        } catch (e) {
            if (!TW_Store.gameUpateStore.isAppDownIng) {
                TW_Store.gameUpateStore.isLoading = false;
                this.hideLoadingView();
                TW_LoaderOnValueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.game_loading, {data: {do: "loadFinish"}}));
            }
        }
    }


    //解压
    unzipNewCourse = (downloadDest) => {
        TW_Log(`versionBBL unzip start------ ${downloadDest}` + "--   TW_Store.gameUpateStore.isLoading==" + TW_Store.gameUpateStore.isLoading);
        this.log += "==>unzipNewCourse--=" + downloadDest;
        unzip(downloadDest, rootStore.bblStore.storeDir)
            .then((path) => {
                TW_Log(`versionBBL unzip completed at------ ${path}`);
                RNFS.unlink(downloadDest).then(() => {
                    TW_Log("versionBBL 删除文件----downloadDest!" + downloadDest)
                }).catch((err) => {
                    TW_Log("versionBBL 删除文件失败");
                });

                this.log += "==>onSaveVersionM--=start";
                setTimeout(() => {
                    TW_LoaderOnValueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.game_loading, {data: {do: "loadFinish"}}));
                    TW_Store.gameUpateStore.isLoading = false;
                    TW_Store.gameUpateStore.isTempExist = true;
                    if(!TW_Store.gameUpateStore.isIncludeLoadView){
                        TW_Store.commonBoxStore.isShow=false;
                        this.onSaveCopyState()
                    }
                    this.onSaveVersionM(this.content, false, () => {
                        this.log += "==>onSaveVersionM--=end";
                    });
                }, G_IS_IOS ? 500 : 5000)

            })
            .catch((error) => {
                TW_Log("versionBBL  解压失败11", error);
            }).finally(() => {
        })
    }


    @action
    onSaveCopyState(callBack) {
        TW_Data_Store.setItem(TW_DATA_KEY.isInitStore, "1", (err) => {
            this.log += "onSavaCoisInitStorepyState---err=" + err + "\n"
            if (err) {
                TW_Log("versionBBL bbl--- copyFile--onSaveCopyState--error===!", err);
            } else {
                    this.isAppInited = true;
                    if(callBack){
                        callBack()
                    }
            }
            this.log += "onSaveCopyState---  this.isAppInited=" + this.isAppInited + "\n"
        })
    }

    async   copy_assets_to_dir(callBack) {
        let source_dir = this.originAppDir;
        let target_dir = ""
        TW_Log('andorid--------copy_assets_to_dir--start');
        if (G_IS_IOS) {
            target_dir = DocumentDirectoryPath + "/gamelobby"
            let target_dir_exist = await RNFS.exists(target_dir);
            this.log += "RNFS.exis==" + target_dir_exist;
            if (target_dir_exist) {
                // TW_Log("versionBBL bbl---   RNFS.unlink---start" + target_dir_exist,target_dir);
                RNFS.unlink(target_dir).then((ret) => {
                    TW_Log("versionBBL bbl--- unlink----target_dir==!" + target_dir_exist, ret);
                    RNFS.copyFile(source_dir, target_dir).then(() => {
                        this.log += "onSaveCopyState---\n"
                        this.onSaveCopyState(callBack);
                    }).catch((err) => {
                        TW_Log("versionBBL bbl--- 删除文件失败", target_dir_exist);
                    })
                })
            } else {
                // let ret = await RNFS.copyFile(source_dir, target_dir);
                RNFS.copyFile(source_dir, target_dir).then(() => {
                    this.log += "onSaveCopyState---\n"
                    this.onSaveCopyState(callBack);
                }).catch((err) => {
                    this.log += "copyFile-err--" + err
                    //TW_Log("versionBBL bbl--- 删除文件失败", target_dir_exist);
                })
            }
        } else {
            target_dir = DocumentDirectoryPath + "/gamelobby";
            let source_dir = "gamelobby"
            const target_dir_exist = await RNFS.exists(target_dir);
            if (!target_dir_exist) {
                await RNFS.mkdir(target_dir);
            }
            const items = await RNFS.readDirAssets(source_dir);
            TW_Log('andorid--------RNFS.readDirAssets(source_dir)--' + items.length);
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.isDirectory()) {
                    await this.androdi_copy_assets_to_dir(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`,callBack);
                } else {
                    await RNFS.copyFileAssets(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
                }
            }
        }
    }

    async androdi_copy_assets_to_dir(source_dir: string, target_dir: string,callBack) {
        const target_dir_exist = await RNFS.exists(target_dir);
        if (!target_dir_exist) {
            await RNFS.mkdir(target_dir);
        }
        TW_Log('andorid--------androdi_copy_assets_to_dir--source_dir', source_dir);
        const items = await RNFS.readDirAssets(source_dir);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            TW_Log('andorid--------androdi_copy_assets_to_dir--items.length--' + items.length + "---", item);
            if (item.isDirectory()) {
                await this.androdi_copy_assets_to_dir(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
            } else {
                const fileState = await RNFS.copyFileAssets(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
                TW_Log('andorid----androdi_copy_assets-----fileState-== ' + fileState, item);
                if (item.path && item.path.indexOf("zzzFinish/") > -1) {
                    //　利用zzzFinish来判断是否android拷贝完成
                    this.onSaveCopyState(callBack);
                }
            }
        }
    }

    @action
    onFlushGameData() {
        NetUitls.getUrlAndParamsAndCallback(TW_Store.bblStore.gameDomain + "/game.json" + "?rom=" + Math.random(), null, (rt) => {

            let newList = rt.content && !TW_Store.appStore.isSitApp ? rt.content : [];
            let gameM = TW_Store.dataStore.appGameListM;
            let lastList = [];
            for (let item of newList) {
                let saveItem = gameM[`${item.name}`];
                if (saveItem) {
                    if (saveItem.current_version != item.current_version) {
                        gameM[`${item.name}`] = {...saveItem, bupdate: true, newVersion: item.current_version};
                        lastList.push(gameM[`${item.name}`]);
                    } else {
                        gameM[`${item.name}`] = {...saveItem, bupdate: false};
                    }

                } else if (!saveItem) {
                    gameM[`${item.name}`] = {
                        ...item,
                        current_version: "",
                        bupdate: true,
                        newVersion: item.current_version
                    };
                    lastList.push(gameM[`${item.name}`]);
                }
            }
            //  TW_Log("FileTools----TW_DATA_KEY.gameList---FileTools--getUrlAndParamsAndCallback--------rt==-"+JSON.stringify(lastList));
            //由于运维 添加了一些slot 重复项目。进行优化移除多余
            let gameList = [];
            for (let i = 0; i < lastList.length; i++) {
                let dataItem = lastList[i];
                let tempList = [];
                for (let dataKey in gameM) {
                    let data = gameM[dataKey];
                    if (data.alias && data.alias == dataItem.alias) {
                        tempList.push(data);
                    }
                }
                if (tempList.length > 1) {
                    for (let item of tempList) {
                        if (item.name && item.name.indexOf("app") > -1) {
                            // TW_Log("FileTools----TW_DATA_KEY.gameList---FileTools--getUrlAndParamsAndCallback--------rt=tempList=-indexOf",item);
                            if (item.bupdate) {
                                gameList.push(item);
                            }
                            break;
                        }
                    }
                } else {
                    if (tempList[0]) {
                        gameList.push(tempList[0]);
                    }
                }
            }
              TW_Log("FileTools----TW_DATA_KEY.gameList---FileTools--getUrlAndParamsAndCallback--------rt==-"+JSON.stringify(lastList));
            if (TW_OnValueJSHome && gameList.length > 0) {
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.gamesinfo, {data: gameList}));
            }
        })
    }

    @action
    onUpdateGameData(gameList) {
        // TW_Log("( _keyboard---onFinishGameList==TW_Store.dataStore.appGameListM=" ,gameM);
        let gameItem = gameList[gameList.length - 1];
        //排除第三方平台数据的影响
        if (gameItem && gameItem.classify == 2) {
            for (let item of gameList) {
                if (item.classify == 2) {
                    for (let dataKey in TW_Store.dataStore.appGameListM) {
                        let temKey = dataKey;
                        if (dataKey.indexOf("app_") > -1) {
                            temKey = dataKey.replace("app_", "");
                        }
                        let tempUrl = item.url;
                        tempUrl = item.url.replace("../", "");
                        let sunStr = tempUrl.substr(tempUrl.length - 1);
                        if (sunStr == "/") {
                            tempUrl = tempUrl.substring(0, tempUrl.length - 1);
                        }
                        var index = tempUrl.lastIndexOf("/");
                        if (index > -1) {
                            tempUrl = tempUrl.substr(index + 1);
                        }
                        TW_Log("( _keyboard---onFinishGameList==dataKey--index==" + index + "---tempUr==" + tempUrl);
                        if (tempUrl == temKey) {
                            TW_Store.dataStore.appGameListM[dataKey].alias = TW_Store.dataStore.appGameListM[dataKey].id = item.alias;
                            TW_Store.dataStore.appGameListM[dataKey].gameName = item.name
                        } else {
                            // TW_Log("( _keyboard---onFinishGameList=note=dataKey--"+dataKey, TW_Store.dataStore.appGameListM[dataKey]);
                        }
                    }
                }
            }

        }
    }


    startLoadGame = (gamedata = null) => {
        if (gamedata) {
            TW_SubGameDownLoaderData.downList.push(gamedata)
        }
        if (!TW_SubGameDownLoaderData.isLoading) {
            if (TW_SubGameDownLoaderData.downList.length > 0) {
                TW_SubGameDownLoaderData.currentDownData = TW_SubGameDownLoaderData.downList.shift();
            }
            let downData = TW_SubGameDownLoaderData.currentDownData;
            if (downData) {
                let gameData = this.getStoreGameDataByAlias(downData.id);//检测一下游戏是否已经下载 防止重复下载
                TW_Log(`startUpdate---startLoadGame--`, gameData);
                if (gameData && gameData.bupdate) {
                    TW_SubGameDownLoaderData.isLoading = true;
                    // JXToast.showShortCenter(`${downData.name} 开始下载！`)
                    let loadUrl = downData.source;
                    if (loadUrl && loadUrl.indexOf("http") > -1) {
                        loadUrl = loadUrl;
                    } else {
                        loadUrl = TW_Store.bblStore.gameDomain + "/" + downData.name + "/" + downData.name;
                    }
                    TW_Log("(FileTools--startLoadGame--==this.state.updateList==item--this.loadQueue.length--loadUrl=" + loadUrl, downData);
                    FileTools.downloadFile(loadUrl, TW_Store.bblStore.tempGameZip, downData, this.onLoadZipFish, this.onLoadProgress);
                }
            }
        }
    }


    onLoadProgress = (ret) => {
        //{//             "gameId":30,        //游戏id-----可选//             "alias":"hhdz",     //游戏别名--------唯一标识，必填//             "percent":0.7       //当前下载进度
        //         }
        let data = TW_Store.dataStore.appGameListM[ret.param.name];
        let dataList = []
        if (data) {
            if (ret.percent < 1) {
                dataList.push({"alias": ret.param.id, percent: ret.percent})
            }
        }
        if (TW_SubGameDownLoaderData.downList.length > 0) {
            for (let item of TW_SubGameDownLoaderData.downList) {
                if (item) {
                    dataList.push({"alias": item.id, percent: 0.00})
                }
            }
        }
        TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.updateProgress, {data: dataList}));
    }


    onLoadZipFish = (ret) => {

        TW_Log("FileTools------ret===this.loadQueue.length==" + TW_SubGameDownLoaderData.downList.length, ret);
        if (ret.rs) {
            TW_Store.commonBoxStore.isShow = false;
            let data = TW_Store.dataStore.appGameListM[ret.param.name];
            data.current_version = data.newVersion;
            data.bupdate = false;
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.updateProgress, {
                data: [{
                    "alias": ret.param.id,
                    percent: 1
                }]
            }));
            this.onSaveGameData();
        } else {
            TW_Store.commonBoxStore.isShow = false;
        }
        TW_SubGameDownLoaderData.isLoading = false;
        TW_SubGameDownLoaderData.currentDownData = null;
        FileTools.currentDownFileId = 0;
        this.startLoadGame();
    }

    onSaveGameData = () => {
        TW_Log("FileTools------onSaveGameData===", TW_Store.dataStore.appGameListM);
        TW_Data_Store.setItem(TW_DATA_KEY.gameList, JSON.stringify(TW_Store.dataStore.appGameListM))
    }

    getStoreGameDataByAlias = (gameId) => {
        let gameData = null
        let gameM = TW_Store.dataStore.appGameListM;
        let retList = [];

        for (let dataKey in gameM) {
            if (gameM[dataKey].id == gameId) {
                retList.push(gameM[dataKey]);
            }
        }
        if (retList.length > 1) {
            for (let item of retList) {
                if (item.name && item.name.indexOf("app") > -1) {
                    gameData = item;
                    break;
                }
            }
        } else {
            gameData = retList[0]
        }
        if (gameData) {
            return gameData;
        } else {
            return null;
        }
    }


    @action
    getHomeWebUri() {
        if (this.isAppInited) {
            return this.targetAppDir + "/index.html"
        }
        return this.originAppDir + "/index.html"
    }

    @action
    getHomeWebHome() {
        return (this.isAppInited ? this.targetAppDir : this.originAppDir)
    }

    @action
    onFlushMoney() {
        if (TW_OnValueJSHome) {
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.flushMoney, {}));
        }
    }

    @action
    onUploadDeviceData() {
        let param= {
            "appVersion": TW_Store.appStore.versionHotFix,
            "browser": DeviceInfo.getUserAgent(),
            "deviceModel": DeviceInfo.getDeviceName(),
            "resourceEnum": "APP",
            "sysVersion": DeviceInfo.getSystemVersion()
        }
        NetUitls.postUrlAndParamsAndCallback(config.api.gameDeviceInfo, param, (rt) => {
            this.log += "\n==>config.api.gameDeviceInfo--upload" + rt.rs;
            // if (rt.rs) {
            // } else {
            //     this.onSaveVersionM({}, true);
            //     this.hideLoadingView()
            // }
        })



    }
}

