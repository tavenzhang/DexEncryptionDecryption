import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, ImageBackground, Text } from "react-native";
import {ASSET_Images, JX_PLAT_INFO} from "../../asset";
import {TCButton} from "../../../Common/View/button/TCButtonView";

const ALERT_VIEW_SIZE = {
    width: 270,
    height: 170
};

const propTypes = {
    onPressConfirm: PropTypes.any,
    onPressCancel: PropTypes.any,
    isOpenAddPay:PropTypes.any,
};

const defaultProps = {
    isOpenAddPay:false
};

export default class ExitVerViewAlert extends Component {

    render() {
        const { onPressConfirm, onPressCancel,isOpenAddPay } = this.props;
        let hintStr =isOpenAddPay ? "返回大厅 前往充值吗？":"是否返回大厅?"
        return (
            <View style={styles.viewExit}>
                <View style={styles.imgBg}>
                    <View style={styles.viewMsg}>
                        <Text style={styles.txtMsg}>{hintStr}</Text>
                    </View>
                    <View style={styles.viewOptions}>
                        <TCButton onClick={() => onPressConfirm && onPressConfirm()}>
                            <Image
                                source={ASSET_Images.gameMemu.btnConfirm}
                                resizeMode="contain"
                                style={styles.btnOption}
                            />
                        </TCButton>
                        <TCButton onClick={() => onPressCancel && onPressCancel()}>
                            <Image
                                source={ASSET_Images.gameMemu.btnCancel}
                                resizeMode="contain"
                                style={styles.btnOption}
                            />
                        </TCButton>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewExit: {
        position: "absolute",
        height:JX_PLAT_INFO.SCREEN_W,
        width:JX_PLAT_INFO.SCREEN_H,
        backgroundColor: "rgba(52,52,52,0.5)",

    },
    viewMsg: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    imgBg: {
        width: ALERT_VIEW_SIZE.width,
        height: ALERT_VIEW_SIZE.height,
      //  paddingVertical: 15
    },
    viewOptions: {
        flexDirection: "row",
        justifyContent: "center"
    },
    txtMsg: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        padding: 10
    },
    btnOption: {
        width: (ALERT_VIEW_SIZE.width - 30) / 2,
        height: 45
    },
    transformLandscape: {
        transform: [{ rotate: "90deg" }]
    }
});
