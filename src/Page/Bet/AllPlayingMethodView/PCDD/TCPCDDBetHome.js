/**
 * Created by Sam on 2016/11/28.
 */

import React, {Component} from 'react';

//系统 npm类
import Toast from '../../../../Common/JXHelper/JXToast';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

import {observer} from 'mobx-react/native';

//组件内部显示需要引入的类
import TCPCDD_MainView from './view/TCPCDD_MainView'
import TCBetHomeBottomView from '../../View/TCBetHomeBottomView'

import TCBetShakeButtonView from '../../View/TCBetShakeButtonView'

// 外部关系组件 如 页面跳转用
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper'

import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import TCBaseBetHome from "../../../Base/TCBaseBetHome";

@withMappedNavigationProps()
@observer
export default class TCPCDDBetHome extends TCBaseBetHome {
    static defaultProps = {
        cp_playMath: '混合',
        unit_price: 2,
    }

    constructor(props){
        super({...props,gameName:'PCDD',contentView:TCPCDD_MainView,isMultyMethod:false})
    }

    componentDidMount() {
        this.clearSelectedNumbers()
        this.refs['TCBetShakeButtonView'].resetPlayMath(this.myPlayMath, this.props.gameUniqueId)

        this.listener = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_numberSelected', (areaIndex, number, isAdd) => {
            if (isAdd) {
                this.SingletonDPS.addToUnAddedNumbersByIndex(areaIndex, number);
            } else {
                this.SingletonDPS.removeUnAddedNumberByIndex(areaIndex, number);
            }
            let str = this.SingletonDPS.getAllUnAddedNumbersJson()
            let count = this.SingletonDPS.calUnAddedNumberOfUnits()
            let price = count * this.props.unit_price
            let bottomView = this.refs['TCBetHomeBottomView']
            bottomView.resetWithNumbers(str, count, price)

            if (this.SingletonDPS.getPlayTypeId() == 'SP3' && isAdd) {
                let array = this.SingletonDPS.getUnAddedArrByIndex(0)
                if (array.length > 3) {
                    this.SingletonDPS.removeUnAddedNumberByIndex(0, array[0] == number ? array[1] : array[0])
                    this.resetSelectedNumber(this.SingletonDPS.getUnAddedNumbersArr())
                }
            }

        });
        this.listener2 = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
            this.userPlayNumberEvent.userNumberCallBackRefresh();
        });

    }


    checkNumbers() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        let res = this.SingletonDPS.calUnAddedNumberOfUnits()
        if (res == 0) {
            //验证未通过
            Toast.showShortCenter('号码选择有误');
            return
        }
        this.betSetEndingEvent({})
    }

    showBetSettingModal() {
        let betSettingView = this.refs['betSettingModal']
        betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true, 0, 0, this.SingletonDPS.getUnAddedAllUnits())
    }

    byShake() {
        let tempDic = this.SingletonDPS.addRandomToUnAddedArr();
        this.resetSelectedNumber(tempDic)
    }

    resetSelectedNumber(tempDic) {
        this.clearSelectedNumbers()
        for (let ite in tempDic) {
            let tempArr = tempDic[ite]
            for (let i = 0; i < tempArr.length; i++) {
                RCTDeviceEventEmitter.emit('randomSelectedNumber', ite, tempArr[i]);
            }
        }
    }

    clearSelectedNumbers() {
        this.SingletonDPS.resetUnAddedSelectedNumbers()
        RCTDeviceEventEmitter.emit('TCMarkSixSelectView_clear');
        // let bottomView = this.refs['TCBetHomeBottomView']
        // bottomView.resetWithNumbers('', '0', '0')
        this.userPlayNumberEvent.resetStrData();

    }

    // constructor(state) {
    //     super(state);
    //     this.state = {
    //         isHistoryShow:false
    //     };
    //     this.helperJumpTo = this.helperJumpTo.bind(this);
    //     this.SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    //     this.gestureState={
    //         gestureCase: null,
    //         moveTop: 0,
    //         topFinal: 0,
    //     }
    // }


    // _panResponder = {}
    //
    // componentWillMount() {
    //     this.userPlayNumberEvent = new JXUserPlayNumberEvent(this.SingletonDPS)
    //     this.currentResultData = new JXCurrentResultData(this.props.gameUniqueId)
    //     myPlayMath = this.props.cp_playMath;
    //     this.SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
    //     this.SingletonDPS.filterPlayType(TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]["singleGamePrizeSettings"]);
    //     myPlayMath = this.SingletonDPS.getDefaultPlayNameFromFilterArray(this.props.cp_playMath);
    //     this.SingletonDPS.resetAllData(myPlayMath);
    //
    //     //182== 26 * 7: half history height
    //     //312== 26 * 12: history height
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: (evt, gestureState) => true,
    //         onMoveShouldSetPanResponder: (evt, gestureState) => {
    //             const {dx} = gestureState;
    //             return Math.abs(dx) > 0;
    //         },
    //         onPanResponderGrant: (evt, gestureState) => {
    //             this.updateHistoryViewHigh({
    //                 gestureCase: gestureState,
    //                 moveTop: this.gestureState.topFinal
    //             })
    //         },
    //         onPanResponderMove: (evt, gestureState) => {
    //             if (this.gestureState.topFinal >= 312 && gestureState.vy > 0) {
    //                 return;
    //             }
    //             if (gestureState.vy > 0 && gestureState.dy >= 312 || this.gestureState.topFinal == 182 && gestureState.dy >= 182) {
    //                 this.updateHistoryViewHigh({gestureCase: null, topFinal: 312});
    //             } else {
    //                 this.updateHistoryViewHigh({ gestureCase: gestureState});
    //             }
    //         },
    //         onPanResponderRelease: (evt, gestureState) => {
    //             let topFailHeight = 0;
    //             if (gestureState.vy > 0 && gestureState.dy > 0) {
    //                 topFailHeight = this.refs.TCHomeHistoryList.getHightState() ==1 ? 182 :312
    //             } else if (gestureState.vy == 0) {
    //                 if (gestureState.dy >= 0) {
    //                     if(this.gestureState.topFinal==0){
    //                         topFailHeight = 182;
    //                     }
    //                 } else {
    //                     topFailHeight = 0;
    //                 }
    //             } else if (gestureState.vy < 0) {
    //                 topFailHeight = 0;
    //             }
    //             let isShowHistory=topFailHeight >0;
    //             if(this.state.isHistoryShow!=isShowHistory){
    //                 clearTimeout(this.timerShow);
    //                 this.timerShow=setTimeout(()=>this.setState({isHistoryShow:isShowHistory}),150);//错开render 时机
    //             }
    //
    //             this.updateHistoryViewHigh({
    //                 isBegin: false,
    //                 isMove: false,
    //                 isEnd: true,
    //                 gestureCase: null,
    //                 topFinal: topFailHeight,
    //             });
    //         },
    //     });
    //   this.didFocusListener = this.props.navigation.addListener('didFocus', () => this.currentResultData.didBlur(false))
    //   this.didBlurListener = this.props.navigation.addListener('didBlur', () => this.currentResultData.didBlur(true))
    // }



    // updateHistoryViewHigh=(newState)=>{
    //     this.gestureState={...this.gestureState,...newState};
    //     this.refs.TCHomeHistoryList.updateHistoryHight(this.gestureState);
    // }


    // render() {
    //
    //     return (
    //         <View style={styles.container}>
    //             <TopNavigationBar
    //                 ref='TopNavigationBar'
    //                 backButtonCall={() => {
    //                     this.goBack()
    //                 }}
    //                 rightButtonCall={() => {
    //                     this.refs['TCBetHelperModal']._setModalVisible(true)
    //                 }}
    //                 centerButtonCall={() => {
    //                     this.showPopView()
    //                 }}
    //                 title={myPlayMath}
    //             />
    //             <TCSelectPopupView
    //                 ref='TCSelectPopupView'
    //                 selectTitleArr={this.initialPlayMath()}
    //                 selectedFunc={(index) => {
    //                     this.choosePlayType(index)
    //                 }}
    //             />
    //
    //             <TCBetHelperModal
    //                 ref="TCBetHelperModal"
    //                 selectedFunc={this.helperJumpTo}
    //                 gameUniqueId={this.props.gameUniqueId}
    //             />
    //
    //             <AwardCoundtdownView
    //                 resultsData={this.currentResultData.resultsData}
    //             />
    //
    //
    //             <TCHomeHistoryListNewSSC
    //                     ref="TCHomeHistoryList"
    //                     gameUniqueId={this.props.gameUniqueId}
    //                     title={this.props.title}
    //                     isHighlightStyle={true}
    //
    //                 />
    //             <View
    //                 style={{
    //                     flexDirection: 'column',
    //                     justifyContent: 'flex-start',
    //                     height: 13,
    //                     width: Dimensions.get('window').width,
    //                     alignItems: 'center',
    //                     backgroundColor: betHome.betTopItemBg,
    //                 }}
    //                 {...this._panResponder.panHandlers}
    //             >
    //                 <Image
    //                     source={this.state.isHistoryShow ?
    //                         betIcon.stdui_arrow_up:betIcon.stdui_arrow_down}
    //                     resizeMode={'contain'}
    //                     style={{height: 13, width: 55, marginTop: 0}}
    //                 />
    //             </View>
    //             <View
    //                 style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center',
    //                     backgroundColor: betHome.betTopItemBg
    //                 }} {...this._panResponder.panHandlers}>
    //                 <TCBetShakeButtonView ref="TCBetShakeButtonView" style={{position: 'absolute', top: 0}}
    //                                       shakeEvent={() => this.byShake()}/>
    //                 <TCBetBalanceButton style={{}} shakeEvent={() => this.byShake()}/>
    //                 {this.getShoppingCartView()}
    //             </View>
    //
    //             <View style={{flex:1}}>
    //                 <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
    //             </View>
    //
    //             <TCBetHomeBottomView ref="TCBetHomeBottomView"
    //                                  leftButtonCallEvent={() => this.randomSelect()}
    //                                  rightButtonCallEvent={() => this.checkNumbers()}
    //                                  clearButtonCallEvent={() => this.clearSelectedNumbers()}
    //                                  data={this.userPlayNumberEvent.str}
    //                                  mob={true}
    //             />
    //             <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}/>
    //         </View>
    //     )
    // }

    // componentWillUnmount() {
    //     this.listener && this.listener.remove();
    //     this.listener1 && this.listener1.remove();
    //     this.listener2 && this.listener2.remove();
    //     this.didFocusListener && this.didFocusListener.remove()
    //     this.didBlurListener && this.didBlurListener.remove()
    //     this.currentResultData && this.currentResultData.clear();
    //     TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    //
    // }

    // helperJumpTo = (index) => {
    //     if (index == 0) {
    //         NavigatorHelper.pushToOrderRecord()
    //     } else if (index == 1) {
    //         NavigatorHelper.pushToLotteryHistoryList({
    //             title: this.props.title,
    //             gameUniqueId: this.props.gameUniqueId,
    //             betBack: true
    //         })
    //     } else if (index == 2) {
    //         let gameInfo = JXHelper.getGameInfoWithUniqueId(this.props.gameUniqueId)
    //         if (gameInfo) {
    //             NavigatorHelper.pushToWebView(gameInfo['guideUrl'])
    //         }
    //     }
    // }

    //初始化玩法号码选择
    // initialContentView() {
    //     return <TCPCDD_MainView ref='MarkSixMainView' gameUniqueId={this.props.gameUniqueId}
    //                             shakeEvent={() => this.byShake()} numberEvent={this.userPlayNumberEvent}
    //                             defaultPlayType={myPlayMath}/>
    // }

    //初始化玩法选择器
    // initialPlayMath() {
    //     return this.SingletonDPS.getFilterPlayTypeArray()[0];
    // }

    //玩法选择切换
    // choosePlayType(index) {
    //     let platMath = this.SingletonDPS.getPlayTypeNameByIndex(index);
    //     if (myPlayMath == platMath) return
    //     myPlayMath = platMath;
    //     this.SingletonDPS.resetPlayType(platMath);
    //
    //     this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    //
    //     let contentView = this.refs['MarkSixMainView']
    //     contentView.setPlayMathWith(platMath)
    //
    //     let navBar = this.refs['TopNavigationBar']
    //     navBar.setTitle(platMath)
    //
    //     var popView = this.refs['TCSelectPopupView']
    //     popView._setModalSelectedIndex(index, 0)
    //
    //     this.refs['TCBetShakeButtonView'].resetPlayMath(platMath, this.props.gameUniqueId)
    //
    //     this.clearSelectedNumbers()
    // }


    // betSetEndingEvent(json) {
    //     this.SingletonDPS.addToBetArray(json.odds, 2, json.rebate)
    //     this.userPlayNumberEvent.str.alreadyAdd = this.SingletonDPS.getAddedBetArr().length;
    //     this.pushToBetBill()
    // }

    // pushToBetBill() {
    //     this.clearSelectedNumbers()
    //     NavigatorHelper.pushToBetBill(this.props.title, 'PCDD', this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName);
    //     this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    // }



    // showPopView() {
    //     var popView = this.refs.TCSelectPopupView
    //     if (popView.state.modalVisible) {
    //         popView._setModalVisible(false);
    //     } else {
    //         popView._setModalVisible(true);
    //     }
    // }

    // randomSelect() {
    //     if (!NavigatorHelper.checkUserWhetherLogin()) {
    //         NavigatorHelper.pushToUserLogin()
    //         return
    //     }
    //     this.SingletonDPS.randomSelect(1)
    //     this.pushToBetBill()
    // }


    //
    // goBack() {
    //     if (this.SingletonDPS.getAddedBetArr().length > 0) {
    //         Alert.alert(
    //             '退出页面会清空已选注单，\n是否退出？', null,
    //             [{
    //                 text: '确定', onPress: () => {
    //                     this.SingletonDPS.resetAllData()
    //                     NavigatorHelper.popToBack()
    //                 }
    //             },
    //                 {
    //                     text: '取消', onPress: () => {
    //                     }
    //                 },
    //             ])
    //     } else {
    //         NavigatorHelper.popToBack()
    //     }
    // }

//     getShoppingCartView() {
//         if (this.userPlayNumberEvent.str.alreadyAdd> 0) {
//             return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
//                                              cc={this.userPlayNumberEvent.str.alreadyAdd}
//                                              shakeEvent={() => this.pushToBetBill()}/>)
//         }
//     }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: indexBgColor.mainBg
//     }
// });
