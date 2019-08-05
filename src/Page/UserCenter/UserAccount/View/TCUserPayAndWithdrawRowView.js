'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Platform,
    Image,
    Clipboard
} from 'react-native';
import Moment from 'moment'
import {Size, indexBgColor} from '../../../resouce/theme'
import {ASSET_Images} from "../../../asset";
import TCImage from "../../../../Common/View/image/TCImage";
import Toast from "../../../../Common/JXHelper/JXToast";
export  default  class TCUserPayAndWithdrawRowView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textLayoutHeight: 0,
            updatedHeight: 0,
            expanded: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.icons={
            'down':ASSET_Images.gameUI.payExpand,
            'up':ASSET_Images.gameUI.payCollapse
        };
    }

    static defaultProps = {};

    expand_collapse_Function =()=>
    {
        LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

        if( this.state.expand == false )
        {
            this.setState({
                updatedHeight:this.state.textLayoutHeight,
                expand: true,
            });
        }
        else
        {
            this.setState({
                updatedHeight: 0,
                expand: false,
            });
        }
    }

    getHeight(height)
    {
        this.setState({ textLayoutHeight: height });
    }

    componentDidMount() {
    }

    render() {
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }
        let orderId = this.props.rowData.transactionId.toString()
        let type = this.props.rowData.type
        return (

            <View style={{width: SCREEN_W - 150, height: 100, alignItems: "center", flexDirection: "row"} }>
                <TCImage source={ASSET_Images.gameUI.listItemBg}
                         style={{position: "absolute", width: SCREEN_W - 100, height: 95}} resizeMode={"contain"}/>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeftStyle}>
                        <Text style={styles.itemLabel}>{this.getType()}: <Text
                        >{this.getState()}</Text></Text>
                        <Text style={styles.itemLabel}>支付方式：<Text
                            style={styles.itemData}>{this.getSubType()}</Text>
                        </Text>

                        <Text style={styles.itemLabel}>订单号：
                            <Text style={styles.itemData}>{this.formatOrderId()}</Text>

                        </Text>

                        <Text style={styles.itemLabel}>创建时间：<Text
                            style={styles.itemData}>{this.getTime()}</Text>
                        </Text>
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemLabel}>{type==='WITHDRAWAL'?'提现金额：':'支付金额：'}<Text style={styles.itemData}>{this.getPayAndWithdrawMoneyExact()}元</Text></Text>
                        <Text style={styles.itemLabel}>{type==='WITHDRAWAL'?'手续费：':'优惠金额：'}<Text style={styles.itemData}>{this.getPayAndWithdrawMoneyRebate()}元</Text></Text>
                        <Text style={{color: "#F9CB46", marginTop:12, fontWeight: 'bold',
                            fontSize: Size.font14,alignItems: 'flex-end'}}>总计金额：<Text style={styles.itemCyanTxt}>{this.getPayAndWithdrawMoney()}元</Text></Text>

                    </View>
                </View>
                <TouchableOpacity style={{position: "absolute", top:50, left: 270}}
                                  onPress={()=>this.onCopy(orderId)}>
                    <Image style={styles.button}
                           source={ASSET_Images.gameUI.btn_copy}/>
                </TouchableOpacity>
            </View>
        );
    };

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    /**
     * 用户充值提现转账
     * @param accountType：0-提现， 1-充值， 2-转账
     */
    getPayOrWithdraw(accountType){
        if(accountType == 1)
        {
            return(
                <View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemLabel}>支付金额：</Text>
                        {this.props.isPayAndWithdrawRecord? this.getPayAndWithdrawMoneyExact() : this.getAccountBalance()}
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemLabel}>优惠金额：</Text>
                        {this.props.isPayAndWithdrawRecord? this.getPayAndWithdrawMoneyRebate() :  this.getAccountBalance()}
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemLabel}>总计金额：</Text>
                        {this.props.isPayAndWithdrawRecord ? this.getPayAndWithdrawMoney() : this.getAccountBalance()}
                    </View>
                </View>
            )
        }
    }

    getBalance() {
        let type = this.props.rowData.type
        let balance = this.props.rowData.amount
        if (type === 'WITHDRAWAL') {
            return (<Text>{'- ' + (balance).toFixed(2)}</Text>)
        } else if (type === 'TOPUP' || type === 'TOPUP_FOR_CANCEL_WITHDRAWAL') {
            return (<Text>{'+ ' + (balance).toFixed(2)}</Text>)
        }
    }

    /**
     * 获取指定时间格式
     * @returns {string}
     */
    getTime() {
        return Moment(this.props.rowData.createTime).format("YYYY-MM-DD HH:mm:ss")
    }

    /**
     * 获取账单类型
     * @returns {*}
     */
    getType() {
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return '提现'
        } else if (type === 'TOPUP') {
            return '充值'
        }
    }

    /**
     * 获取充值/提现状态
     * @returns {*}
     */
    getState() {
        let state = this.props.rowData.stateChineseDisplay
        if (state === '失败') {
            return (<Text style={{color: '#FF1B1B', fontSize: Size.font13}}>{state}</Text>)
        } else if (state === '已完成') {
            return (<Text style={{color: '#0DFD2F', fontSize: Size.font13}}>{state}</Text>)
        } else {
            return (<Text style={{color: '#FFF600', fontSize: Size.font13}}>{state}</Text>)
        }
    }

    /**
     * 获取支付方式
     * @returns {*}
     */
    getSubType() {
        return this.props.rowData.subTypeChineseDisplay
    }

    /**
     * 格式化订单号
     * @returns {string}
     */
    formatOrderId() {
        return this.props.rowData.transactionId.toString()
    }

    onCopy(text) {
        Clipboard.setString(text);
        TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.click);
        Toast.showShortCenter("已复制！")
    }

    /**
     * 获取账单余额
     * @returns {XML}
     */
    getAccountBalance() {
        let balance = this.props.rowData.delta

        if (balance < 0) {
            return (<Text style={styles.itemData}>{(balance).toFixed(2)}</Text>)
        } else {
            return (<Text style={styles.itemData}>{'+' + (balance).toFixed(2)}</Text>)
        }
    }

    /**
     * 获取充值总额金额
     * @returns {XML}
     */
    getPayAndWithdrawMoney() {
        let amount = this.props.rowData.effectiveAmount
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return (<Text>{'- ' + (amount).toFixed(2).padStart(9)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text>{'+ ' + (amount).toFixed(2).padStart(9)}</Text>)
        }
        return amount
    }

    /**
     * 获取充值优惠金额
     * @returns {XML}
     */
    getPayAndWithdrawMoneyRebate(){
        let rebate = this.props.rowData.effectiveAmount - this.props.rowData.amount
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemData}>{(rebate).toFixed(2).padStart(9)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text style={styles.itemData}>{(rebate).toFixed(2).padStart(9)}</Text>)
        }
        return rebate
    }

    /**
     * 获取充值支付金额
     * @returns {XML}
     */
    getPayAndWithdrawMoneyExact(){
        let topUp = this.props.rowData.amount
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemData}>{(topUp).toFixed(2).padStart(9)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text style={styles.itemData}>{(topUp).toFixed(2).padStart(9)}</Text>)
        }
        return topUp
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    itemLabel: {
        color: "#F9CB46",
        fontSize: Size.font13
    },
    itemData: {
        color: "#a2e1ee",
        fontSize: Size.font13
    },
    itemStyle: {
        //justifyContent:'space-between',
        flexDirection: 'row',
        //backgroundColor: indexBgColor.itemBg,
        justifyContent:"center",
        alignItems:"center",
        marginTop: 1
    },
    itemLeftStyle: {
        margin: 10,
        alignSelf: 'flex-start'
    },
    itemRightStyle: {
        marginTop: 10,
        right:-40,
        alignItems: 'flex-end'
    },
    itemCyanTxt: {
        color: '#A2E1EE',
        fontSize: Size.font13,
        fontWeight: 'bold',
        paddingTop: 10
    }, itemBtnStyle: {
        paddingLeft: 0
    }
});
