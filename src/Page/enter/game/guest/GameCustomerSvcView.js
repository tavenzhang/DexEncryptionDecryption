import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {observer} from 'mobx-react';
import TCImage from "../../../../Common/View/image/TCImage";
import {ASSET_Images,} from "../../../asset";
import {TCButtonImg} from "../../../../Common/View/button/TCButtonView";
import PropTypes from "prop-types";
import LoadingView from "../../LoadingView";
import { WebView } from 'react-native-webview';


@observer
export default class GameGuestView extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any
    }

    static defaultProps = {
        isSelected: false,

    }

    constructor(state) {
        super(state)
        this.state = {
            isQASelected: false
        }
        this.countDebug=0;
    }

    componentDidMount() {

        TW_Log("Benny: lockToPortrait")


    }

    componentWillMount(): void {
        TW_Log("Benny: Init to Orientation")

        this.setState({
            init,
            orientation: init,
            specificOrientation: init,
        });

        if (TW_Store.gameUIStroe.gustWebUrl != null) {
            if (TW_Store.gameUIStroe.gustWebUrl.length == 0) {
                TW_Store.bblStore.getAppData();
            }
        }
    }

    componentWillUnmount() {

    }

    render() {
        let {pointerEvents}=this.props;
        TW_Log("GameGuestView-----------")
        return (<View style={styles.container} pointerEvents={pointerEvents}>

            <TCImage source={ASSET_Images.gameUI.moneyInBg} style={{width: SCREEN_W, height: SCREEN_H}}
                     resizeMode={'stretch'}/>
            <View style={{
                position: "absolute", top: 0,
                    left: 0,//SCREEN_W > 730 ?(SCREEN_W - 717)/2:0,
                width: SCREEN_H, //SCREEN_W > 730 ? 517 : (SCREEN_W - 200 - 40),
                height: SCREEN_H
            }}>
                {this.getWebView()}
            </View>
            <TCButtonImg imgSource={ASSET_Images.gameUI.guestBack}
                         soundName={TW_Store.bblStore.SOUND_ENUM.close}
                         onClick={() => TW_Store.gameUIStroe.isShowGuest = false}
                         btnStyle={{
                             position: "absolute",
                             left: 0,
                             top: 7,
                             width: SCREEN_W * 0.20,
                             height: SCREEN_H * 0.12
                         }}/>
        </View>)
    }

    backToPrevious=()=>{
        TW_Log("Benny: lockToLandscape");
     
        TW_Store.gameUIStroe.isShowGuest = false;
    }

    getWebView = () => {
        TW_Log("getWebView---TW_Store.gameUIStroe.gustWebUrl==" + TW_Store.gameUIStroe.gustWebUrl)
        let source = {
            uri: TW_Store.gameUIStroe.gustWebUrl,
        }
        return (
            <WebView source={source}
                     style={styles.webView}
                     allowFileAccess={true}
                     startInLoadingState={true}
                     renderLoading={this.onRenderLoadingView}
                     useWebKit={true}
                     onError={this.onError}/>)
    }

    onRenderLoadingView = () => {
        return (<View style={{}}>
            <LoadingView myStyle={{width:305,height:300}}/>
        {/*    485,500*/}
        </View>)
    }

    onError = (error) => {
        TW_Log("onError=====TCweb======event=====", error.nativeEvent)
    }
}


const styles = StyleSheet.create({
    container: {
        /*flex: 1,*/
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex:9999
    },
    webView: {
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
        height: SCREEN_H,
        width: SCREEN_H,// > 730 ? 490 : (SCREEN_W - 200 - 40),
        backgroundColor: "transparent",
    }
});
