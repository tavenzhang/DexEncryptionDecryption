import React, {Component} from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import {observer} from 'mobx-react';
import TWWebGameView from "../WebView/TWWebGameView";
import PhoneStateView from "../Route/PhoneStateView";
import TWVerWebView from "../WebView/TWVerWebView";


@observer
export default class SubGameView extends Component {

    constructor(state) {
        super(state)
        this.state = {}
    }

    render() {
        let subGameParams=TW_Store.bblStore.subGameParams;
        let isShow =subGameParams.url != "";
        let isOpenVderWebView=subGameParams.isOpenThirdVerWebView;
        if (this.refs.myView) {
            this.refs.myView.setNativeProps({style: {zIndex: isShow ? 999 : -999}});
        }

        TW_Log("SubGameView--TW_Store.bblStore.isShow---" + isShow+"--TW_Store.gameUIStroe.isOpenVderWebView=="+TW_Store.gameUIStroe.isShowGuest,isOpenVderWebView)
        return (<View  style={{
            position: "absolute", width: SCREEN_W,
            height: SCREEN_H,
            backgroundColor: "rgba(10,10,10,0.3)", zIndex: 999}} ref={"myView"}>
            {isOpenVderWebView ?  <TWVerWebView {...TW_Store.bblStore.subGameParams} />:<TWWebGameView  {...TW_Store.bblStore.subGameParams}/>}
            <PhoneStateView/>
        </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "absolute",
    },
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd"
    },
    webView: {
        marginTop: 18,
        height: 250,
        width: 485,
        backgroundColor: "transparent",
    }

});
