import {combineReducers,applyMiddleware,createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loginReducer, managerReducer,wfmReducer } from '../reducers/reducer'
import { rootSaga } from '../saga/root'



const appData = combineReducers({
    loginData: loginReducer,
    employeeData:managerReducer,
    wfmData : wfmReducer
})

const sagaMiddleware=createSagaMiddleware()
export const store=createStore(appData,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)