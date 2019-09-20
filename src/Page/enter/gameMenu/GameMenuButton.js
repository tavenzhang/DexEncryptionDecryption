import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { observer } from "mobx-react";
import Button from "./Button";
import { Other } from "../../../Page/asset/drawable";
import TCDragExpandableButton from "../../../Common/View/button/TCDragExpandableButton";
import ExitGameAlertView from "../view/ExitGameAlertView";
import { StatusBarHeight, SafeAreaBottomHeight } from "../../asset/screen";
import * as Animatable from "react-native-animatable";
import {ASSET_Images} from "../../asset";

const GAME_ICONS = ASSET_Images.gameMemu;
const SIZE = {
    mainIcon: 50,
    icon: 55
};
const TYPE = {
    transfer: 1,
    reload: 2,
    exit: 3
};
export const IS_CHECK_SAFEAREA = true;

@observer
export default class GameMenuButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScreenPortrait: true,
            isShowExitAlertView: false,
            isCollapse: true,
            isCollapseInit: false
        };
        this.onPressIcon = this.onPressIcon.bind(this);
        this.setCollapsibility = this.setCollapsibility.bind(this);
        this.setExitAlertViewVisibility = this.setExitAlertViewVisibility.bind(this);
        this.onPressConfirmExit = this.onPressConfirmExit.bind(this);
        this.onPressCancel = this.onPressCancel.bind(this);
        this.onOrientationChange = this.onOrientationChange.bind(this);
    }

    componentWillMount() {
        Dimensions.addEventListener("change", this.onOrientationChange);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.onOrientationChange);
    }

    setCollapsibility(isCollapse) {
        this.setState({ isCollapse: isCollapse || !this.state.isCollapse });
        this.refs.btnDrag && this.refs.btnDrag.onPressHandleViewChange();

        if (!isCollapse) {
            this.setState({
                isCollapseInit: true
            });
        }
    }

    setExitAlertViewVisibility(isShow) {
        this.setState({ isShowExitAlertView: isShow });
    }

    onOrientationChange({ window: { width, height } }) {
        this.setCollapsibility(true);
        const isScreenLandscape = width > height;
        this.setState({ isScreenPortrait: !isScreenLandscape });
        this.setCollapsibility(true);
    }

    onPressIcon=(type)=> {
        this.setCollapsibility();
        switch (type) {
            case TYPE.transfer:
               // JX_NavHelp.pushView(JX_Compones.UserTransfer);
                break;
            case TYPE.reload:
               // JX_NavHelp.pushToPay(true);
                break;
            case TYPE.exit:
                const { onPressExit } = this.props;
                if (onPressExit) {
                    onPressExit();
                } else {
                    this.setExitAlertViewVisibility(true);
                }
                break;
        }
    }

    onPressConfirmExit() {
        this.setExitAlertViewVisibility(false);
        JX_NavHelp.popToBack();
    }

    onPressCancel() {
        this.setExitAlertViewVisibility(false);
    }

    getGameMenuPosition() {
        const { isScreenPortrait } = this.state;
        const extraTopHeight = G_IS_IOS ? StatusBarHeight : 5;
        const extraBottomHeight = IS_CHECK_SAFEAREA ? SafeAreaBottomHeight : 0;
        let position;

        const dx = isScreenPortrait ? SCREEN_W : SCREEN_H;
        const dy = isScreenPortrait ? SCREEN_H : SCREEN_W;

        if (isScreenPortrait) {
            position = {
                initX: dx - 60,
                initY: 100,
                topMargin: extraTopHeight,
                bottomMargin: extraBottomHeight + 100,
                rightMargin: 60,
                leftMargin: 0,
                minX: 5,
                maxX: dx - 150,
                minY: extraTopHeight,
                maxY: dy - extraBottomHeight - 150
            };
        } else {
            position = {
                initX: extraTopHeight,
                initY: SCREEN_W / 2 - 60,
                topMargin: -30,
                bottomMargin: extraBottomHeight + 100,
                rightMargin: 60,
                leftMargin: extraTopHeight,
                minX: extraTopHeight + 5,
                maxX: dx - 150,
                minY: 5,
                maxY: dy - extraBottomHeight - 150
            };
        }
        return position;
    }

    render() {
        const { onPressExit } = this.props;
        const { isScreenPortrait } = this.state;
        if (!onPressExit && this.state.isShowExitAlertView) {
            return (
                <ExitGameAlertView
                    onPressConfirm={this.onPressConfirmExit}
                    onPressCancel={this.onPressCancel}
                />
            );
        }

        const { isCollapse } = this.state;
        const position = this.getGameMenuPosition();
        const animationProps = {};
        if (this.state.isCollapseInit) {
            if (isScreenPortrait) {
                animationProps.animation = isCollapse ? "fadeOutRight" : "fadeInRight";
            } else {
                animationProps.animation = isCollapse ? "fadeOutLeft" : "fadeInLeft";
            }
        }

        return (
            <TCDragExpandableButton
                ref="btnDrag"
                style={isCollapse ?styles.viewDraggableForCollapse:styles.viewDraggable}
                topMargin={position.topMargin}
                bottomMargin={position.bottomMargin}
                leftMargin={position.leftMargin}
                rightMargin={position.rightMargin}
                initX={position.initX}
                initY={position.initY}
                isCheckBoundaries={isCollapse}
                minX={position.minX}
                maxX={position.maxX}
                minY={position.minY}
                maxY={position.maxY}
                contentView={
                    isScreenPortrait ? (
                        <View style={styles.flexRow}>
                            <Animatable.View
                                pointerEvents={isCollapse ? "none" : "auto"}
                                style={[
                                    styles.flexRow,
                                    {
                                        opacity: isCollapse ? 0 : 1,
                                        position: isCollapse ? 'absolute':'relative'
                                    }
                                ]}
                                duration={500}
                                {...animationProps}>
                                <Button
                                    style={[
                                        styles.btnIcon,
                                        {
                                            alignSelf: "center",
                                            marginRight: -10
                                        }
                                    ]}
                                    onPress={() => this.onPressIcon(TYPE.reload)}>
                                    <Image
                                        source={GAME_ICONS.btnReload}
                                        resizeMode="contain"
                                        style={styles.imgIcon}
                                    />
                                </Button>

                                <View style={{ marginRight: -7 }}>
                                    {this.props.itransEnabled==='ON' ?
                                        null
                                        :
                                        <Button
                                            style={[styles.btnIcon, { marginBottom: 20 }]}
                                            onPress={() => this.onPressIcon(TYPE.transfer)}>
                                            <Image
                                                source={GAME_ICONS.btnTransfer}
                                                resizeMode="contain"
                                                style={styles.imgIcon}
                                            />
                                        </Button>
                                    }

                                    <Button
                                        style={styles.btnIcon}
                                        onPress={() => this.onPressIcon(TYPE.exit)}>
                                        <Image
                                            source={GAME_ICONS.btnExit}
                                            resizeMode="contain"
                                            style={styles.imgIcon}
                                        />
                                    </Button>
                                </View>
                            </Animatable.View>
                            <Button
                                style={styles.viewMenu}
                                onPress={() => this.setCollapsibility()}>
                                <Image
                                    source={
                                        isCollapse
                                            ? GAME_ICONS.btnMenu
                                            : GAME_ICONS.btnCollapseRight
                                    }
                                    resizeMode="contain"
                                    style={styles.imgMainIcon}
                                />
                            </Button>
                        </View>
                    ) : (
                        <View style={styles.flexRow}>
                            <Button
                                style={styles.viewMenu}
                                onPress={() => this.setCollapsibility()}>
                                <Image
                                    source={
                                        isCollapse ? GAME_ICONS.btnMenu : GAME_ICONS.btnCollapseLeft
                                    }
                                    resizeMode="contain"
                                    style={styles.imgMainIcon}
                                />
                            </Button>
                            <Animatable.View
                                pointerEvents={isCollapse ? "none" : "auto"}
                                style={[styles.flexRow, { opacity: isCollapse ? 0 : 1 }]}
                                duration={500}
                                {...animationProps}>
                                <View style={{ marginLeft: -7 }}>
                                    {this.props.itransEnabled==='ON' ?
                                        null
                                        :
                                        <Button
                                            style={[styles.btnIcon, { marginBottom: 20 }]}
                                            onPress={() => this.onPressIcon(TYPE.transfer)}>
                                            <Image
                                                source={GAME_ICONS.btnTransfer}
                                                resizeMode="contain"
                                                style={styles.imgIcon}
                                            />
                                        </Button>
                                    }
                                    <Button
                                        style={styles.btnIcon}
                                        onPress={() => this.onPressIcon(TYPE.exit)}>
                                        <Image
                                            source={GAME_ICONS.btnExit}
                                            resizeMode="contain"
                                            style={styles.imgIcon}
                                        />
                                    </Button>
                                </View>
                                <Button
                                    style={[
                                        styles.btnIcon,
                                        {
                                            alignSelf: "center",
                                            marginLeft: -10
                                        }
                                    ]}
                                    onPress={() => this.onPressIcon(TYPE.reload)}>
                                    <Image
                                        source={GAME_ICONS.btnReload}
                                        resizeMode="contain"
                                        style={styles.imgIcon}
                                    />
                                </Button>
                            </Animatable.View>
                        </View>
                    )
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    viewDraggableForCollapse: {
        position: "absolute",
        zIndex: 10000,
        height:SIZE.mainIcon,
        width:SIZE.mainIcon
    },
    viewDraggable: {
        position: "absolute",
        zIndex: 10000,
        flex: 1
    },
    viewContent: {
        position: "relative"
    },
    viewMenu: {
        alignSelf: "center",
        zIndex: 20000
    },
    flexRow: {
        flexDirection: "row"
    },
    btnMainIcon: {
        height: SIZE.mainIcon,
        width: SIZE.mainIcon
    },
    imgMainIcon: {
        height: SIZE.mainIcon,
        width: SIZE.mainIcon
    },
    btnIcon: {
        height: SIZE.icon,
        width: SIZE.icon
    },
    imgIcon: {
        height: SIZE.icon,
        width: SIZE.icon
    },
    spaceVerticalIcon: {
        marginTop: -12
    },
    viewCollapse: {
        alignSelf: "center",
        flex: 1,
        top: -10
    },
    viewExit: {
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
