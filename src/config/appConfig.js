import React, {
    Platform
} from 'react-native';

export const appDomainBase = {
    base1: 'https://qp01-game.513xyz.com',
    base2: 'https://qp01-game.513xyz.com',
    base3: 'https://*.gymjjddjzx.com',
    base4: 'https://yundun-qp01-game.513xyz.com',
    base5: 'https://yundun-qp01-game.513xyz.com',
    base6: 'https://yundun-qp01-game.513xyz.com',
}
//'https://127.0.0.1',

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

export const versionHotFix = 'v5.0531.2105';

export const MyOwnerPlatName= '博博乐';

// export const YunDunData= {appIosKey:"DpV1sEv2lZyavrD7xIpYOZFlLbV_BEmr5CvA34neuD6A7fXBsiwFPNg4YGbrYjM4-WAYfyghTQLzKYrEC-2QKL08HxKvBpdjpgv5E7iRg7CTZIwb0l_j1XDBrOyQ_z6E4Vrau6kFAF4rUY6faVSzVfCNeDUOJ4rrenTm863rLJQ_CaZEIKXsBgv7JVzhSY5_9BQFSirAs+8ii6qC2oPbOaoZru8rwNM7w8CKzl3knofqQuzQFjdfNR9bUUtgd1JpDLK6--lesHfukrIzPBy3VGln_4g9RmDihkiANIQV1YCeU798-6jtkrYqBFZlPzNwyJu9q+ChRNTZ0BDZlk7NZuf70-EhgBxQCz8YVyvg+l0pCCo5pXtTVeFq3t_FFbFpzSLIZJcdDqAEtp+CqyfQQPrm2P7X8_7nHnA3FrgwTvNtBsP4KV6a6",
//     appAndroidKey:"DpV1sEv2lZyavrD7xIpYOZFlLbV_BEmr5CvA34neuD6A7fXBsiwFPNg4YGbrYjM4-WAYfyghTQLzKYrEC-2QKL08HxKvBpdjpgv5E7iRg7CTZIwb0l_j1XDBrOyQ_z6E4Vrau6kFAF4rUY6faVSzVfCNeDUOJ4rrenTm863rLJQ_CaZEIKXsBgv7JVzhSY5_9BQFSirAs+8ii6qC2oPbOaoZru8rwNM7w8CKzl3knofqQuzQFjdfNR9bUUtgd1JpDLK6--lesHfukrIzPBy3VGln_4g9RmDihkiANIQV1YCeU798-6jtkrYqBFZlPzNwyJu9q+ChRNTZ0BDZlk7NZuf70-EhgBxQCz8YVyvg+l0pCCo5pXtTVeFq3t_FFbFpzSLIZJcdDqAEtp+CqyfQQPrm2P7X8_7nHnA3FrgwTvNtBsP4KV6a6",
//     groupname:"Auto139440.ureJ56X0B0.ftnormal01ai.com",
//     dip:"chy-test",
//     dport:"443",
//     token:"",
//     domaims:[]
// };
// export const safeguardDomain = [
//     'https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com',
//     'https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com']


//base64key 格式示例
// {"d":["https://987645ba00a9b0416b254f33d918ed64.oss-cn-shenzhen.aliyuncs.com","https://c40b6e3d664556ab423d3eebc01ab2fd.oss-cn-shenzhen.aliyuncs.com"]}

//第三方安全域名base64 key
export const safeguardKey = 'eyJkIjogWyJodHRwczovLzk4NzY0NWJhMDBhOWIwNDE2YjI1NGYzM2Q5MThlZDY0Lm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20iLCAiaHR0cHM6Ly9jNDBiNmUzZDY2NDU1NmFiNDIzZDNlZWJjMDFhYjJmZC5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tIl19'

export const platInfo = {

    downDomain:"https://download.jinkuangjia.com",

    zipCheckServer: {
        debug_server: "http://192.168.14.70:8888",
        release_server: "/game/release/uat"
    },
    platId: configAppId,
    brand: "qp01",
    latestNativeVersion:{ios:"3",android:"3"},//用于强制更新 匹配，与info.plist 还有 gradle.properties. 需要严格一致。否则 会弹窗 强制下载
    appInfo : {
        ch_8: {
            name: "appstoreWithCodePush",
            wxAppKey: "wx14a4c6864a801156",
            wxAppSecret: "06f5151830e538583897772e402ae142",
            JPushKey: "a09286d3570274effabdab10",
            UmengKey: "5b9f7642f43e486308000111",
            openInstallKey: "k9e92p"
        },
        ch_9: {
            name: "appstoreNoCodePush",
            wxAppKey: "wx14a4c6864a801156",
            wxAppSecret: "06f5151830e538583897772e402ae142",
            JPushKey: "c4584354e9142db46f39e3b7",
            UmengKey: "5df352373fc19559210008de",
            openInstallKey: "evna9i"
        },
    }
}



