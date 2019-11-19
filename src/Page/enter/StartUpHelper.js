import {AsyncStorage} from 'react-native'
//import { create } from 'apisauce'

import NetUitls from "../../Common/Network/TCRequestUitls";
import Base64 from "../../Common/JXHelper/Base64";
import CryptoJS from "crypto-js";
import JXHelper from "../../Common/JXHelper/JXHelper";

const pk64 = 'OXcwQkFRRUZBQU9lZGZxNQ=='
let base64 = new Base64()

function getAvailableDomain(domains, callback, initDomainCallBack) {
    // 不用检测可访问域名是否在本地缓存，第一次启动肯定不存在。如果设置缓存，其实每次还是要去校验缓存的那条地址能不能访问。
    // 直接进行检测
    // AsyncStorage.setItem('cacheDomain', JSON.stringify(cacheDomain));
    let errorCount = 0;
    let isFinish = false;
    let netStateCheckAllReady = false;
    // 由于fetch 本身的timeOut 不起作用，为了防止某些域名请求一直不返回，导致无法进行错误回掉，手动进行超时处理
    setTimeout(() => {
        if (!netStateCheckAllReady) {
            netStateCheckAllReady = true;
            callback(false, false, false);
        }
    }, 10000)

    TN_yunDunStart((isUseYunDun,port)=>{
        TW_Store.dataStore.log+="\n---游戏盾-==-"+isUseYunDun+"==port=="+port+"---\n";
        TW_Store.appStore.versionHotFix=isUseYunDun ?  (TW_Store.appStore.versionHotFix+"-yun"):TW_Store.appStore.versionHotFix
        //如果是sit 环境，云盾无法配置 强制使用老放松接入
        if(TW_Store.appStore.isSitApp){
            isUseYunDun =false;
        }

       // isUseYunDun =false;
        for (let i = 0; i < domains.length; i++) {
            TW_Log('= ' + domains[i]+"----isUseYunDun---"+isUseYunDun+"===port==="+port);
            let tempDomain = domains[i];
            let isRandomDomain = false
            if (tempDomain.indexOf("http") == -1) {
                errorCount += 1;
                if (errorCount >= domains.length) {
                    callback(false, false, "");
                }
            }
            if (tempDomain.indexOf("*") > -1) {
                tempDomain = tempDomain.replace("*",JXHelper.getRandomChars(true, 5, 15));
                isRandomDomain = true;
            }
            if(!isRandomDomain){
                if(isUseYunDun){
                    tempDomain =tempDomain+":"+port
                }
            }
            NetUitls.getUrlAndParamsAndCallback(`${tempDomain}/api/v1/ip/user/checkIpInfoDomainsEncrypte?clientId=${TW_Store.appStore.clindId}&platform=CG`, null, (rt) => {
                if (rt.rs) {
                    if (!isFinish) {
                        isFinish = true;
                        // TW_Log('大王来巡山--content ',rt.content.data);
                        var decodepk64 = base64.decode(pk64)
                        var key = CryptoJS.enc.Utf8.parse(decodepk64)
                        var iv = CryptoJS.enc.Utf8.parse(decodepk64)
                        var decryptedResponseData = CryptoJS.AES.decrypt(rt.content.data, key, {
                            iv: iv,
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7
                        })
                        var decryptedResponseDataJson = JSON.parse(decryptedResponseData.toString(CryptoJS.enc.Utf8));
                        let content = decryptedResponseDataJson;
                        content.allowAppUpdate = true;
                        TW_Log('大王来巡山 content==domains[i]--' + tempDomain, content);

                        let gameDomain = tempDomain;
                        let serverDomains = content.serverDomains;
                        if(isUseYunDun){
                            serverDomains =content.trendChartDomains.concat(serverDomains);
                        }
                        if (gameDomain.indexOf("http") > -1) {
                            if (!TW_Store.appStore.isSitApp) { //对于sit  环境做特殊处理 使用默认
                                //为了兼容老app。如果是集成了云盾的sdk，使用趋势图域名
                                    TW_Store.appStore.currentDomain = TW_Store.bblStore.loginDomain = TW_Store.bblStore.gameDomain = gameDomain;
                                    TW_Log('大王来巡山 content==domains[i] currentDomain--' + TW_Store.appStore.currentDomain + "---tempDomain--" + tempDomain, serverDomains);
                            }else{
                                TW_Store.appStore.currentDomain = TW_Store.bblStore.loginDomain = TW_Store.bblStore.gameDomain = tempDomain;
                            }
                        }

                        AsyncStorage.setItem('cacheDomain', JSON.stringify({
                            serverDomains: serverDomains,
                            hotfixDomains: content.availableUpdateInfoList,
                            trendChartDomains: content.trendChartDomains,
                            responseTime: rt.duration,
                            currendDomain:TW_Store.appStore.currentDomain,
                        }), (err) => {
                            netStateCheckAllReady = true
                            if (!err) {
                                if (content && content.allowAppUpdate) {
                                    if (isRandomDomain) {
                                        //如果是随机域名不能直接使用，重新域名检测 使用缓存域名
                                        initDomainCallBack && initDomainCallBack();
                                    } else {
                                        callback(true, true, null);
                                    }
                                } else {
                                    callback(true, false, null)
                                }
                            } else {//写入缓存失败
                                callback(false, false, false);
                                TW_Log("callback------写入缓存失败--");
                            }
                        })


                    }


                } else {
                    errorCount++;
                    TW_Log("cacheAttempt000+errorCount==" + errorCount, domains);
                    if (errorCount >= domains.length) {
                        netStateCheckAllReady = true
                        callback(false, false, rt.status);
                    }
                }
            })
        }
    })

}

export default {getAvailableDomain}
