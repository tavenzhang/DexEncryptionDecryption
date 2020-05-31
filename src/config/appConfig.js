import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://sit03-qp01app1a.yss52.com',
    base2: 'https://sit03-qp01app1b.yss52.com',
    base3: 'https://sit03-qp01app1c.yss52.com',
    base4: 'https://sit03-qp01app2a.yss52.com',
    base5: 'https://sit03-qp01app2b.yss52.com',
    base6: 'https://sit03-qp01app2c.yss52.com',
    base7: 'https://sit03-qp01app2c.yss52.com',
}


export let configAppId = "5"


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


export const MyAppName = '棋牌sit';

export const versionHotFix = 'v5.0531.1612';

export const MyOwnerPlatName= 'sit';

// export const safeguardDomain = [
//     'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
//     'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']
//第三方安全域名base64 key
export const safeguardKey = 'eyJkIjogWyJodHRwczovLzk4NzY0NWJhMDBhOWIwNDE2YjI1NGYzM2Q5MThlZDY0Lm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20iLCAiaHR0cHM6Ly9jNDBiNmUzZDY2NDU1NmFiNDIzZDNlZWJjMDFhYjJmZC5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tIl19'


export const platInfo = {

    downDomain:"https://download.sufangxingwanshisanjiao.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/sit"
    },
    platId: configAppId,
    brand: "qp01",
    latestNativeVersion:{ios:"3",android:"3"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
    appInfo : {
        ch_8: {
            name: "appstoreWithCodePush",
            wxAppKey: "wx26019a5a7de8db15",
            wxAppSecret: "62ef8d30f3c4e244bde8831dd2f4ec84",
            JPushKey: "e9f6454032a3f4936d80a82f",
            UmengKey: "5b9f7642f43e486308000111",
            openInstallKey: "evna9i"
        },
        ch_9: {
            name: "appstoreNoCodePush",
            wxAppKey: "wx26019a5a7de8db15",
            wxAppSecret: "62ef8d30f3c4e244bde8831dd2f4ec84",
            JPushKey: "e9f6454032a3f4936d80a82f",
            UmengKey: "5b9f7642f43e486308000111",
            openInstallKey: "evna9i"
        },
    }
}



