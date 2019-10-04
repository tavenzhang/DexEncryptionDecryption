import React, {
    Platform
} from 'react-native';


export const appDomainBase = {
    base1: 'https://qp01-game.513xyz.com',
    base2: 'https://qp01-game.513xyz.com,',
    base3: 'https://qp01-game.513xyz.com',
    base4: 'https://qp01-game.513xyz.com',
    base5: 'https://qp01-game.513xyz.com',
    base6: 'https://qp01-game.513xyz.com',
    base7: 'https://qp01-game.513xyz.com',
}


export let configAppId = "214"


export const AppConfig = {
    allowFontScaling: true,
    domains: [
        appDomainBase.base1,
        appDomainBase.base2,
        appDomainBase.base3
    ],
    backupDomains: [
        appDomainBase.base4,
        appDomainBase.base5,
        appDomainBase.base6
    ],
    checkUpdateDomains:[
        "https://www.ba2d16.com",
        "https://www.aa2d16.com",
        "https://www.ca2d16.com"
    ],
}


export const MyAppName = '博博乐';

export const versionHotFix = 'v8.27';

export const MyOwnerPlatName= '博博乐';

// export const safeguardDomain = [
//     'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
//     'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


//base64key 格式示例
// {"d":["https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com","https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com"]}

//第三方安全域名base64 key
export const safeguardKey = 'ewoJImQiOiBbImh0dHBzOi8vY2VhNGVjYTY1MGQ3MWJkOWQ1NTJiNGNmMzhlMDU3MDIub3NzLWNuLXNoZW56aGVuLmFsaXl1bmNzLmNvbSIsCgkJImh0dHBzOi8vY2VhNGVjYTY1MGQ3MWJkOWQ1NTJiNGNmMzhlMDU3MDIuczMtYWNjZWxlcmF0ZS5hbWF6b25hd3MuY29tIiwKCQkiaHR0cHM6Ly9jZWE0ZWNhNjUwZDcxYmQ5ZDU1MmI0Y2YzOGUwNTcwMi5henVyZWVkZ2UubmV0IgoJXQp9'

export const platInfo = {

    downDomain:"https://download.jinkuangjia.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/uat"
    },
    latestNativeVersion:{ios:"6.0",android:"7.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
    platId: configAppId,
    brand: "qp01",
    latestNativeVersion:{ios:"10",android:"10"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
}


