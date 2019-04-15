import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
    Text
} from 'react-native';

import {width} from '../asset/game/themeComponet'
import WKWebView from "react-native-wkwebview-reborn/WKWebView";

import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {JX_PLAT_INFO} from "../asset";
import TCButtonView from "../../Common/View/button/TCButtonView";
import {observer} from "mobx-react/native";


@withMappedNavigationProps()
@observer
export default class TCWebView extends Component {

    constructor(state) {
        super(state)
        let {url} = this.props;
        this.state = {
            isHide: false,
            isHttpFail: false,
            uri: url,
        }
        this.bblStore = TW_Store.bblStore;
    }

    static defaultProps = {
        title: ''
    };

    componentWillMount() {
        TW_Store.bblStore.lastGameUrl = "";
        TW_Store.bblStore.isLoading = true;
        TW_OnBackHomeJs=this.onBackHomeJs;
    }

    componentDidMount(): void {
        if(this.refs.myWebView.getSettings){
            this.refs.myWebView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        }
    }


    render() {
        let {isOrigan}=this.props
        let myUrl = this.state.uri;
        let tempIndex = myUrl.indexOf("?");
        let myParam = myUrl.substr(tempIndex);
        let newUrl=  myUrl.substring(0,tempIndex)+"index.html";
        TW_Log("myUrl------------------------myParam--"+myParam+"-\n-newUrl----"+newUrl)

        let source = {
            file: newUrl,
            allowingReadAccessToURL: TW_Store.dataStore.getGameRootDir(),
            allowFileAccessFromFileURLs:TW_Store.dataStore.getGameRootDir(),
            param:myParam
        };
        if (!G_IS_IOS) {
            source = {
                uri: newUrl+`${myParam}`,
            };
        }else{
            if(isOrigan){
                source = {
                    uri: newUrl+`${myParam}`,
                };
            }
        }

        let dis = TW_Store.bblStore.isLoading ? "none":"flex";
        TW_Log("TW_Store.bblStore.isLoading---"+TW_Store.bblStore.isLoading,dis);
        //andorid 显示有点小问题  黑屏处理
        if (this.state.isHide) {
            return <View style={{flex: 1, backgroundColor: "black"}}/>
        }
        let wenConteView = G_IS_IOS ? <WKWebView
                ref="myWebView"
                source={source} onNavigationStateChange={this.onNavigationStateChange}
                                                 onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                                 style={[styles.webView,{display:dis}]}
                                                 allowFileAccess={true}
                                                 onError={this.onError}
                                                 startInLoadingState={false}
                                                 onMessage={this.onMessage}
                                                 onLoadStart={this.onloadStart}
                                                 onLoadEnd={this.onLoadEnd}
                                                 // renderLoading={this.onRenderLoadingView}

            /> :
            <WebView
                ref="myWebView"
                useWebKit={true}
                automaticallyAdjustContentInsets={true}
                style={styles.webView}
                source={source}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                // renderLoading={this.onRenderLoadingView}
                startInLoadingState={false}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                allowFileAccess={true}
                onError={this.onError}
                onMessage={this.onMessage}
                onLoadEnd={this.onLoadEnd}
            />
        return (
            <View style={styles.container}>
                {!this.state.isHttpFail ? wenConteView:<View style={{height:JX_PLAT_INFO.SCREEN_H, justifyContent:"center",
                    alignItems:
                "center"}}>
                    <TCButtonView btnStyle={{width:300}} onClick={()=>{
                        TW_NavHelp.popToBack();
                        setTimeout(this.onBackHomeJs, 1000)
                    }} text={"返回大厅"}/>
                </View>}
            </View>
        );
    }



    // onRenderLoadingView = () => {
    //     let {isGame} = this.props
    //     return (<View style={{flex: 1, backgroundColor: "black"}}>
    //         {isGame ? <LoadingView/>:<LoadingView/>}
    //
    //         {/*<TCImage source={Images.bbl.gameBg} style={{width:JX_PLAT_INFO.SCREEN_W,height:JX_PLAT_INFO.SCREEN_H}}/>*/}
    //     </View>)
    // }


    onLoadEnd = (event) => {
        TW_Log("onLoadEnd=TCweb==========event=====", event)

        TW_Log("onLoadEnd=TCweb==========event===== TW_Store.bblStore.isLoading--"+ TW_Store.bblStore.isLoading, event)
    }

    onloadStart = (event) => {
        TW_Store.bblStore.isLoading = false
        TW_Log("onloadStart==TCweb=========event=====", event)
    }

    onMessage = (event) => {

        let message = null;
        try {
            message = JSON.parse(event.nativeEvent.data);
            if (message) {
                this.onMsgHandle(message);
            }
        } catch (err) {
            TW_Log("onMessage===========erro==" + err, event.nativeEvent);
        }
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage===========" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url = this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView, {url})
                    break;
                case "game_back":
                    TW_NavHelp.popToBack();
                    this.onBackHomeJs()
                    break;
                case  "JumpUrl":
                    url = this.handleUrl(message.au)
                    if(TW_Store.appStore.isInAnroidHack){
                        //如果处于审核状态 只跳用户中心 其他页面不跳转
                        if(url.indexOf("module=account")>-1){
                            TW_NavHelp.pushView(JX_Compones.WebView, {url});

                        }else{

                        }
                    }else{
                        TW_NavHelp.pushView(JX_Compones.WebView, {url})
                    }

                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView=!TW_Store.gameUIStroe.isShowAddPayView;
                    // if(!TW_Store.appStore.isInAnroidHack){
                    //     let data = message.jumpData || message.data ||TW_Store.bblStore.jumpData
                    //     if (data) {
                    //         url = TW_Store.bblStore.urlDomain + "/g_recharge/?module=recharge&jumpData=" + data;
                    //         TW_NavHelp.pushView(JX_Compones.WebView, {url, isAddView: true})
                    //     }
                    // }
                    break;
            }
        }
    }

    handleUrl = (url) => {
        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        url = TW_Store.bblStore.homeDomain + "/" + url;
        return url
    }

    onError = (error) => {
        TW_Log("onError=====TCweb======event=====", error.nativeEvent)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest=======TCweb====event=====", event);
        return true;
    };

    onNavigationStateChange = (navState) => {

        TW_Log("navState===========onNavigationStateChange=====url==" + navState.url, navState)
        let {onEvaleJS, isGame,isAddView} = this.props
        if (navState.title == "404 Not Found") {
            if(!isGame) {
                TW_NavHelp.popToBack();
                this.setState({isHide: true})
            }
            this.setState({isHttpFail: true})

        } else {
            if (navState.url) {
                if (navState.url.indexOf("g_lobby/index.html") > -1) {
                    TW_NavHelp.popToBack();
                    this.setState({isHide: true})
                    if (isGame) {
                        this.onBackHomeJs();
                    }
                    this.bblStore.lastGameUrl = "home"
                }
            }
        }

    };

    onBackHomeJs = () => {

        let {onEvaleJS} = this.props
        TW_Log("onEvaleJS---onBackHomeJs--",onEvaleJS)
        if (onEvaleJS) {
            onEvaleJS(this.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: true}));
            onEvaleJS(this.bblStore.getWebAction(this.bblStore.ACT_ENUM.lobbyResume));
           // onEvaleJS(this.bblStore.getWebAction(this.bblStore.ACT_ENUM.flushMoney));
        }
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    webView: {
        marginTop: 0,
        width: width,
        backgroundColor: "#000000",
    }
});
