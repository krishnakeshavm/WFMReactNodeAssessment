import {takeEvery} from 'redux-saga/effects'
import { loginHandler,managerHandler,wfm_ManagerHandler,managerUpdateHandler,managerStatusApproval} from './handlers'


export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler)
    yield takeEvery("MANAGER_ACTION",managerHandler)
    yield takeEvery("WFM_MANAGER_ACTION",wfm_ManagerHandler)
    yield takeEvery("SEND_REQUEST",managerUpdateHandler)
    yield takeEvery("APPROVE_REQUEST",managerStatusApproval)
}