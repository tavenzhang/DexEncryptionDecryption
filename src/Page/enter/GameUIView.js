import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../asset";
import TCButtonView, {TCButtonImg} from "../../Common/View/button/TCButtonView";
import {TCTextInput} from "../../Common/View/TCTextInput";
import TCText from "../../Common/View/widget/TCText";
import GameUserInfoView from "./game/GameUserInfoView";
import {G_LayoutAnimaton} from "../../Common/Global/G_LayoutAnimaton";
import GameGuestView from "./game/GameGuestView";


@observer
export default class GameUIView extends Component {
    constructor(prop) {
        super(prop);
    }

    componentWillUpdate(nextProps, nextState, nextContext: any): void {
        G_LayoutAnimaton.configureNext(G_LayoutAnimaton.springNoDelete)
    }

    render() {
        return (<View style={styles.container}>
            {TW_Store.gameUIStroe.isShowUserInfo ? <GameUserInfoView/>:null}
            {TW_Store.gameUIStroe.isShowGuest ? <GameGuestView/>:null}

        </View>)

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: JX_PLAT_INFO.SCREEN_H,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 150
    },
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd"
    }

});
