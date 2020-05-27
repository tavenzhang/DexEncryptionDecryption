import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://3toyxebbsqp.shenglongsy.com',
    base2: 'https://vtsc3nbbsqp.shenglongsy.com',
    base3: 'https://8alkdjbbsqp.shenglongsy.com',
    base4: 'https://3toyxebbsqp.9767cp222.com',
    base5: 'https://vtsc3nbbsqp.9767cp222.com',
    base6: 'https://8alkdjbbsqp.9767cp222.com',
}

export let configAppId = "380030"


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


export const MyAppName = '博必胜棋牌';

export const versionHotFix = 'v5.0527.2057';

export const versionHotFix = 'v5.0527.2057';

//第三方安全域名base64 key
export const safeguardKey = 'ewogICAgImQiOlsKICAgICAgICAiaHR0cHM6Ly8yZDQxMDhlOGVmNTNhNThmNzRiNTQ1YmMwYWU0NjgyZi5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tIiwKICAgICAgICAiaHR0cHM6Ly8yZDQxMDhlOGVmNTNhNThmNzRiNTQ1YmMwYWU0NjgyZi5zMy1hY2NlbGVyYXRlLmFtYXpvbmF3cy5jb20iLAogICAgICAgICJodHRwczovLzJkNDEwOGU4ZWY1M2E1OGY3NGI1NDViYzBhZTQ2ODJmLmF6dXJlZWRnZS5uZXQiCiAgICBdCn0='




export const platInfo = {
    downDomain:"https://download.hkbaoxian188.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/bbsqp"
    },
    platId: configAppId,
    brand: "bbsqp",
    latestNativeVersion:{ios:"6.0",android:"6.0"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
    appInfo : {
        ch_8: {
            name: "appstoreWithCodePush",
            wxAppKey: "wx18eec11b4f671654",
            wxAppSecret: "7dd4871750fabe197c3596219c53cd9d",
            JPushKey: "6e1bf8705c342e69244104e5",
            UmengKey: "5ca3245f0cafb26b1d000efd",
            openInstallKey: "blqusx"
        },
        ch_9: {
            name: "appstoreNoCodePush",
            wxAppKey: "wx18eec11b4f671654",
            wxAppSecret: "7dd4871750fabe197c3596219c53cd9d",
            JPushKey: "6e1bf8705c342e69244104e5",
            UmengKey: "5ca3245f0cafb26b1d000efd",
            openInstallKey: "blqusx"
        },
    }
}
