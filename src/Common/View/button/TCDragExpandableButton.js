import React, { Component } from "react";
import { PanResponder, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { JX_PLAT_INFO } from "../../../Page/asset";
import { NavBarHeight } from "../../../Page/asset/screen";

const REF_PAN = "refPanView";
let previousMenuLeft, previousMenuTop;

// 能展开收缩又能滑动的按钮
export default class TCDragExpandableButton extends Component {
    static propTypes = {
        style: PropTypes.any,
        contentView: PropTypes.any,
        edgeW: PropTypes.number,
        edgeH: PropTypes.number,
        initX: PropTypes.number,
        initY: PropTypes.number,
        topMargin: PropTypes.number,
        bottomMargin: PropTypes.number,
        leftMargin: PropTypes.number,
        rightMargin: PropTypes.number,
        // 以下选项isCheckBoundaries,minX,maxX,minY,maxY
        // 如果按钮有展开/收缩的功能,需要重置位置以便不隐藏展开的内容
        isCheckBoundaries: PropTypes.bool,
        minX: PropTypes.number,
        maxX: PropTypes.number,
        minY: PropTypes.number,
        maxY: PropTypes.number
    };

    static defaultProps = {
        edgeW: JX_PLAT_INFO.SCREEN_W,
        edgeH: JX_PLAT_INFO.SCREEN_H,
        initX: JX_PLAT_INFO.SCREEN_W / 2,
        initY: 0,
        topMargin: NavBarHeight,
        bottomMargin: 0,
        leftMargin: 0,
        rightMargin: 0,
        isCheckBoundaries: false,
        minX: null,
        maxX: null,
        minY: null,
        maxY: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isScreenPortrait: true
        };
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);

        this.resetNativeStyles = this.resetNativeStyles.bind(this);
        this.getBoundariesPosition = this.getBoundariesPosition.bind(this);
        this.onPressHandleViewChange = this.onPressHandleViewChange.bind(this);
        this.onOrientationChange = this.onOrientationChange.bind(this);
    }

    componentWillMount() {
        Dimensions.addEventListener("change", this.onOrientationChange);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onStartShouldSetResponderCapture: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
            onShouldBlockNativeResponder: this._handleStartShouldSetPanResponder
        });
    }

    componentDidMount() {
        const { initX, initY } = this.props;
        this.previousLeft = initX;
        this.previousTop = initY;
        this.resetNativeStyles(initX, initY);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.onOrientationChange);
    }

    onOrientationChange({ window: { width, height } }) {
        const isScreenPortrait = !(width > height);
        this.setState({ isScreenPortrait });

        const { initX, initY } = this.props;
        this.previousLeft = initX;
        this.previousTop = initY;
        this.resetNativeStyles(initX, initY);
    }

    resetNativeStyles(left, top) {
        this.customStyle = {
            style: {
                left,
                top
            }
        };
        this._updateNativeStyles();
    }

    getBoundariesPosition(dx, dy) {
        const { minX, maxX, minY, maxY } = this.props;
        if (minX != null && maxX != null && minY != null && maxY != null) {
            dx = dx < minX ? minX : dx;
            dx = dx > maxX ? maxX : dx;
            dy = dy < minY ? minY : dy;
            dy = dy > maxY ? maxY : dy;
        }
        return { dx, dy };
    }

    // 按了滑动按钮
    onPressHandleViewChange() {
        const { isCheckBoundaries } = this.props;
        let dx = this.customStyle.style.left;
        let dy = this.customStyle.style.top;

        if (isCheckBoundaries) {
            previousMenuLeft = dx;
            previousMenuTop = dy;
            // 展开
            const position = this.getBoundariesPosition(dx, dy);
            dx = position.dx;
            dy = position.dy;
        } else {
            // 收缩
            dx = previousMenuLeft;
            dy = previousMenuTop;
            // const { edgeW, edgeH, topMargin, bottomMargin, leftMargin, rightMargin } = this.props;
            // dy = dy < topMargin ? topMargin : dy;
            // dy = dy + bottomMargin > edgeH ? edgeH - bottomMargin : dy;
            // dx = dx < leftMargin ? leftMargin : dx;
            // dx = dx + rightMargin > edgeW ? edgeW - rightMargin : dx;
            // dx = dx > edgeW ? edgeW : dx;
            // dy = dy > edgeH ? edgeH : dy;
        }
        this.previousLeft = dx;
        this.previousTop = dy;
        this.resetNativeStyles(dx, dy);
    }

    render() {
        const { contentView, style } = this.props;
        return (
            <View {...this.panResponder.panHandlers} ref={REF_PAN} style={style}>
                <View>{contentView}</View>
            </View>
        );
    }

    _highlight() {
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.refs[REF_PAN] && this.refs[REF_PAN].setNativeProps(this.customStyle);
    }

    _handleStartShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        // return gestureState.dx != 0 && gestureState.dy != 0;
        let { dx, dy } = gestureState;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            return true;
        } else {
            return false;
        }
    }

    _handlePanResponderGrant() {
        this._highlight();
    }

    _handlePanResponderMove(e, gestureState) {
        const {
            isCheckBoundaries,
            edgeW,
            edgeH,
            topMargin,
            bottomMargin,
            leftMargin,
            rightMargin
        } = this.props;
        let dx = this.previousLeft + gestureState.dx;
        let dy = this.previousTop + gestureState.dy;

        if (isCheckBoundaries) {
            // 收缩
            const { isScreenPortrait } = this.state;
            const edgeWidth = isScreenPortrait ? edgeW : edgeH;
            const edgeHeight = isScreenPortrait ? edgeH : edgeW;
            // dx = dx < 0 ? 0 : dx;
            dy = dy < topMargin ? topMargin : dy;
            dy = dy + bottomMargin > edgeHeight ? edgeHeight - bottomMargin : dy;
            dx = dx < leftMargin ? leftMargin : dx;
            dx = dx + rightMargin > edgeWidth ? edgeWidth - rightMargin : dx;
            dx = dx > edgeWidth ? edgeWidth : dx;
            dy = dy > edgeHeight ? edgeHeight : dy;
        } else {
            // 展开
            const position = this.getBoundariesPosition(dx, dy);
            dx = position.dx;
            dy = position.dy;
        }
        previousMenuLeft = dx;
        previousMenuTop = dy;
        this.resetNativeStyles(dx, dy);
    }

    _handlePanResponderEnd(e, gestureState) {
        this._unHighlight();
        const dx = gestureState.dx;
        const dy = gestureState.dy;
        this.previousLeft += dx;
        this.previousTop += dy;
    }
}
