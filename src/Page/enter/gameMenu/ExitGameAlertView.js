import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, ImageBackground, Text } from "react-native";
import {ASSET_Images} from "../../asset";
import {TCButton} from "../../../Common/View/button/TCButtonView";
import TCImage from "../../../Common/View/image/TCImage";

const ALERT_VIEW_SIZE = {
    width: 270,
    height: 170
};

const propTypes = {
    onPressConfirm: PropTypes.func.isRequired,
    onPressCancel: PropTypes.func.isRequired
};

const defaultProps = {};

export default class ExitGameAlertView extends Component {
    render() {
        const { onPressConfirm, onPressCancel } = this.props;
        return (
            <View style={styles.viewExit}>
                <ImageBackground
                    source={ASSET_Images.gameMemu.dialogInfo}
                    style={styles.imgBg}
                    resizeMode={"contain"}>
                    <View style={styles.viewMsg}>
                        <Text style={styles.txtMsg}>确定退出当前游戏</Text>
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
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewExit: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52,52,52,0.5)",
        zIndex: 30000
    },
    viewMsg: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    imgBg: {
        width: ALERT_VIEW_SIZE.width,
        height: ALERT_VIEW_SIZE.height,
        paddingVertical: 15
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

ExitGameAlertView.propTypes = propTypes;
ExitGameAlertView.defaultProps = defaultProps;
