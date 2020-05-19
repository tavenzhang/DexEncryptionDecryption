import {action, observable} from 'mobx'

export default class GameUpateStore {

    @observable
    isLoading = false;

    @observable
    isNeedUpdate = true;

    @observable
    isAppDownIng= false;

    @observable
    isTempExist = false;

    @observable
    isIncludeLobby = false;

    @observable
    isIncludeLoadView = true;

    @observable
    isInSubGame = false;

    @observable
    isEnteredGame = false;

    @observable
    isForeAppUpate = false;


}
