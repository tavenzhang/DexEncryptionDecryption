import React from 'react';
import {NativeModules, Platform} from 'react-native';
import RNFS from "react-native-fs";
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
const Sound = require('react-native-sound');
//ar SoundFile = require('../../../android/app/src/main/assets/gamelobby/assets/raw/bgm_lobby.mp3')
Sound.setActive(true)
Sound.enableInSilenceMode(true)


export class SoundHelper {
    static  soundleMusic = null

    static  playSoundBundle = () => {

        if (Platform.OS === 'android') {
            //  NativeModules.RNAudio.playBet()
        } else {
            try {
                const s = new Sound(SoundFile, (e) => {
                    if (e) {
                        // console.log('error', e);
                    } else {
                        s.setSpeed(1);
                        s.play(() => s.release()); // Release when it's done so we're not using up resources
                    }
                });
            } catch (e) {

            }
        }
    }


    static async startBgMusic(force = false) {

        if (G_IS_IOS) {
            Sound.setCategory('Ambient', true)
        }
        let file = G_IS_IOS ? `${TW_Store.dataStore.getHomeWebHome()}/assets/raw/bgm_lobby.mp3` : `${DocumentDirectoryPath}/gamelobby/assets/raw/bgm_lobby.mp3`;
        let isExist = await RNFS.exists(file);
        TW_Log("playBgMusic-file--isExist---" + isExist+"--Sound.DOCUMENT==="+Sound.DOCUMENT, file);
        try {
            if (!SoundHelper.soundleMusic || force) {
                TW_Log("playBgMusic--start--force==", force)
                let s = SoundHelper.soundleMusic = new Sound(file, '', (e) => {
                    if (e) {
                        TW_Log('playBgMusic--SoundFile--error--', e);
                    } else {
                        TW_Log('playBgMusic--play--ok--', s);
                        TW_Store.dataStore.isAppSound = true;
                        s.setSpeed(1);

                        s.setNumberOfLoops(999);
                        SoundHelper.onCheckPalyMusic();
                    }
                });
            }
        } catch (e) {
            TW_Log("playBgMusic--catch--", e)
        }
    }


    static pauseMusic() {
        TW_Log("playBgMusic---pauseMusic-")
        if (SoundHelper.soundleMusic) {
            SoundHelper.soundleMusic.pause();
            SoundHelper.soundleMusic.setVolume(0.001);
        }
    }

    static playMusic() {
        TW_Log("playBgMusic---playMusic-")
        if (SoundHelper.soundleMusic) {
            SoundHelper.soundleMusic.play()
            SoundHelper.soundleMusic.setVolume(1);
        }
    }

    static releaseMusic() {
        TW_Log("playBgMusic---releaseMusic-")
        if (SoundHelper.soundleMusic) {
            SoundHelper.soundleMusic.release()
        }
    }

    static onCheckPalyMusic() {

        if (SoundHelper.soundleMusic) {
            TW_Data_Store.getItem(TW_DATA_KEY.BG_MUSIC, (err, ret) => {
                TW_Log("playBgMusic---onCheckPalyMusic-ret==" + ret)
                if (ret == null) {
                    SoundHelper.playMusic()
                } else {
                    if (ret == "1") {
                        SoundHelper.playMusic()
                    } else {
                        SoundHelper.pauseMusic()
                    }
                }
            });
        }
    }


}


