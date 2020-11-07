import React, {Component, PureComponent} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native'
import moment from "moment";
import DeviceInfo from 'react-native-device-info';
//import NetInfo from "@react-native-community/netinfo";
import {observer} from 'mobx-react';
import {NativeEventEmitter, NativeModules} from 'react-native'

import {phoneState} from '../asset/images';
import PropTypes from "prop-types";

let deviceInfoEmitter = {}
if (NativeModules.RNDeviceInfo) {
    deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);
}

@observer
export default class PhoneStateView extends PureComponent {

    static propTypes = {
        delay: PropTypes.any,
        position: PropTypes.any,
        isShow: PropTypes.any,
        isHideBattery: PropTypes.any,//是否隐藏电池显示
        isHideTime: PropTypes.any,//是否隐藏时间显示

    }

    static defaultProps = {
        delay: 100,
        isShow: false,
        isHideBattery: "0",
        isHideTime: "0"
    }


    constructor(props) {
        super(props);

        this.state = {
            battStat: 0,
            isCharging: false,
            time: moment(new Date()).format("HH:mm"),
            isWifi: false,
            isConnected: false,
            isInternetReachable: false,
            carrierName: DeviceInfo.getCarrier(),
            ip: null,
        }
    }

    async componentDidMount() {

        // NetInfo.fetch().then(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
        // });

        //console.log('DeviceInfo', DeviceInfo.getCarrier());

        this.checkIsWifi();
        this.monitorBatteryLevel();

        this.intervalID = setInterval(
            () => {
                this.setState({time: moment(new Date()).format("HH:mm")});
                this.checkIsWifi();
                if (!G_IS_IOS) {
                    this.monitorBatteryLevel();
                }
            },
            30000
        );

        deviceInfoEmitter.addListener('powerStateDidChange', batteryState => {
            //console.log('powerStateDidChange', batteryState);
            this.setState({isCharging: batteryState.batteryState === "charging" ? true : false});
        });

        deviceInfoEmitter.addListener('batteryLevelDidChange', level => {
            //console.log('batteryLevelDidChange', level);
            this.setState({battStat: level.toFixed(2)});
        });

        /*
        NetInfo.addEventListener(state => {
            //console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            //console.log("cellularGeneration", state);

            this.setState({
                isWifi: state.type === "wifi" ? true : false,
                isConnected: state.isConnected,
                isInternetReachable: state.isInternetReachable,
                cellularGeneration: state.type === "cellular" ? state.details.cellularGeneration : null
            });
        });
        */
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
        try {
            deviceInfoEmitter.removeAllListeners();
        } catch (e) {
            TW_Log("PhoneStateView >> error: " + e.message)
        }
        //NetInfo.removeAllListeners();
    }

    monitorBatteryLevel() {
        DeviceInfo.getBatteryLevel().then(batteryLevel => {
            //console.log('getBatteryLevel', batteryLevel);
            this.setState({battStat: batteryLevel.toFixed(2)});
        });

        DeviceInfo.isBatteryCharging().then(isCharging => {
            //console.log('isBatteryCharging', isCharging);
            this.setState({isCharging});
        });
    }


    phoneBatteryIndicator=()=> {
        const {battStat, isCharging} = this.state;
        let img = null;
        let batteryLevel=0;
        if (isCharging) {
            img = phoneState.battCharging;
        } else {
            if (battStat <= 0) {
                img = phoneState.battEmpty;
                batteryLevel=0;
            } else if (battStat > 0 && battStat <= 0.5) {
                img = phoneState.batt30;
                batteryLevel=1;
            } else if (battStat > 0.5 && battStat <= 0.7) {
                img = phoneState.batt50;
                batteryLevel=2;
            } else if (battStat > 0.7 && battStat <= 0.9) {
                img = phoneState.batt80;
                batteryLevel=3;
            } else if (battStat > 0.9) {
                img = phoneState.battFull;
                batteryLevel=4;
            }
        }

        return {batteryImg:img,batteryLevel};
    }

    async checkIsWifi() {
        //console.log('checkIsWifi');
        try {
            const ip = await DeviceInfo.getIPAddress();
            const isWifi = (ip.substring(0, 3) === "192") ? true : false;
            TW_Log("checkIsWifi----isWifi==ip==" + ip, isWifi)
            this.setState({ip, isWifi});
        } catch (e) {
            TW_Log("checkIsWifi----", e)
            this.setState({isWifi: false});
        }

        /*
        await DeviceInfo.getIPAddress().then(ip => {
            // "92.168.32.44"
            console.log('DeviceInfo: getIPAddress: ', ip);
            //console.log('DeviceInfo: substring: ', ip.substring(0, 3));
            const isWifi = (ip.substring(0, 3) === "192") ? true : false;
            //console.log('DeviceInfo: isWifi: ', isWifi);

            this.setState({ ip, isWifi });
        });
        */
    }

    pingGoogle() {
        fetch('https://www.baidu.com')
            .then((response) => {
                //console.log('response ', response)
                if (response.status === 200) {
                    this.setState({
                        isInternetReachable: true
                    });
                } else {
                    this.setState({
                        isInternetReachable: false
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    isInternetReachable: false
                });
            })
    }

    /*
    wifiIndicator(delayTime) {
        const { isWifi, isConnected, isInternetReachable } = this.state;
        let img = null;

        if (isConnected && isWifi) {
            img = phoneState.wfFull;

            if (!isInternetReachable) {
                img = phoneState.wfNoConn;
            } else {
                const delay = delayTime.substring(0, delayTime.indexOf("m"));
                //console.log('delay', delay);

                if (delay <= 60) {
                    img = phoneState.wfFull;
                } else if (delay > 60 && delay <= 90) {
                    img = phoneState.wf3bars;
                } else if (delay > 90 && delay <= 120) {
                    img = phoneState.wf2bars;
                } else if (delay > 120) {
                    img = phoneState.wf1bar;
                }
            }
        }

        return img;
    }
    */
    cellularWifiState = (delayTime) => {
        const {isWifi} = this.state;
        let delay = parseInt(delayTime)
        let img = null;
        if (isWifi) {
            //img = phoneState.wfFull;
            if (delay <= 100) {
                img = phoneState.wfFull;
            } else if (delay > 100 && delay <= 200) {
                img = phoneState.wf3bars;
            } else if (delay > 200 && delay <= 300) {
                img = phoneState.wf2bars;
            } else if (delay > 300) {
                img = phoneState.wf1bar;
            }
        } else {
            img = phoneState.mb4G;
        }
        if (delay > 2000) {
            img = phoneState.wfNoConn;
            if (this.state.isInternetReachable) {
                this.setState({isInternetReachable: false})
            }
        } else {
            if (!this.state.isInternetReachable) {
                this.setState({isInternetReachable: true})
            }
        }
        return img;
    }


    cellularIndicator = (delayTime) => {
        const {isWifi} = this.state;
        let delay = parseInt(delayTime)
        let delayLevel =0;
        let img = null;
        let isNetworkOK = true;
        if (isWifi) {
            //img = phoneState.wfFull;
            if (delay <= 100) {
                img = phoneState.wfFull;
                delayLevel=4;
            } else if (delay > 100 && delay <= 200) {
                img = phoneState.wf3bars;
                delayLevel=3;
            } else if (delay > 200 && delay <= 300) {
                img = phoneState.wf2bars;
                delayLevel=2;
            } else if (delay > 300) {
                delayLevel=1;
                img = phoneState.wf1bar;
            }
        } else {
            /*
            img = {
                null: phoneState.mb4bars,
                "2g": phoneState.mb4bars,
                "3g": phoneState.mb3G,
                "4g": phoneState.mb4G
            }[cellularGeneration] || phoneState.mb4bars;
            */
            if (delay <= 100) {
                img = phoneState.mb4bars;
                delayLevel=4;
            } else if (delay > 100 && delay <= 200) {
                img = phoneState.mb3bars;
                delayLevel=3;
            } else if (delay > 200 && delay <= 300) {
                img = phoneState.mb2bars;
                delayLevel=2;
            } else if (delay > 300) {
                img = phoneState.mb1bar;
                delayLevel=1;
            }
        }

        if (delay > 2000) {
            img = phoneState.wfNoConn;
            delayLevel=0;
            if (this.state.isInternetReachable) {
                this.setState({isInternetReachable: false})
            }
        } else {
            if (!this.state.isInternetReachable) {
                this.setState({isInternetReachable: true})
            }
        }
        return {delayLevelImg:img,delayLevel};
    }



    render() {
        const {delay, position, isShow, isHideBattery, isHideTime} = TW_Store.bblStore.netInfo;
        const {isCharging, time,isWifi} = this.state;
        let batteryCharging=isCharging;
        let isVeryDealy = delay >= 400 ? true : false;
        let {delayLevelImg,delayLevel}=this.cellularIndicator(delay);
        let {batteryImg,batteryLevel}=this.phoneBatteryIndicator();
        let isReadyOK = isShow == "1"
        if(isReadyOK&&TW_Store.bblStore.isEnterLooby){
            TN_MSG_TO_GAME(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appStatus, {isShow,batteryCharging,delayLevel,batteryLevel,delay,time,isWifi:isWifi? 1:0,position}));
        }
        return (
            <View style={{position: "absolute", ...position}} pointerEvents={"none"}>
                {
                    isReadyOK ?
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {/*<Image source={this.wifiIndicator(msgData.delay)} resizeMode='contain' style={[styles.iconSmall, { marginRight: 5 }]} />*/}
                            {/*<Image source={this.cellularWifiState(delay)} resizeMode='contain' style={[styles.iconSmall, { marginRight: 5 }]} />*/}
                            <Image source={delayLevelImg} resizeMode='contain'
                                   style={[styles.iconSmall, {marginRight: 5}]}/>
                            <Text style={[styles.text, isVeryDealy ? {color: "red"} : null]}>{`${delay}ms`}</Text>
                            {isHideBattery == "1" ? null :
                                <Image source={batteryImg} resizeMode='contain'
                                       style={[styles.icon, {marginLeft: 5}]}/>}
                            {isHideTime == "1" ? null : <Text style={[styles.text, {marginLeft: 15}]}>{time}</Text>}
                        </View> : null
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: "#d8dee5"
    },
    icon: {
        width: 20,
        height: 20
    },
    iconSmall: {
        width: 15,
        height: 15
    }
});
