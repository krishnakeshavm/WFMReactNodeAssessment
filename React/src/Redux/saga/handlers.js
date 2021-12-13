import axios from 'axios'
import { call, put } from 'redux-saga/effects'


export function* loginHandler(action) {
  try {
    console.log('saga-lofgin');
    let result = yield call(axios.post, "http://localhost:8000/users/signin", action.data)
    console.log(result.data)

    localStorage.setItem("username", result.data.username)
    localStorage.setItem("usertype", result.data.usertype)
    localStorage.setItem("token", result.data.token)

    yield put({
      type: "LOGIN_SUCCESS", data:
      {
        username: result.data.username,
        usertype: result.data.usertype,
        token: result.data.token
      }
    })
  }
  catch (e) {
    yield put({ type: "LOGIN_FAILURE" })
  }

}


export function* managerHandler(action) {
  try {
    let username = localStorage.getItem('username');
    console.log('manager-sagas:', action.data);
    let manager = { manager: username };
    let result = yield call(axios.post, "http://localhost:8000/users/manager", manager)
    console.log(result.data)

    yield put({ type: "LOAD_EMPLOYEE", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }

}

export function* wfm_ManagerHandler(action) {
  try {
    let username = localStorage.getItem('username');
    console.log('wfm-manager-sagas:', action.data);
    let wfm_manager = { wfm_manager: username };
    let result = yield call(axios.post, "http://localhost:8000/users/getwfmManager", wfm_manager)
    console.log(result.data)

    yield put({ type: "LOAD_WFM_MANAGER", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }
}

export function* managerUpdateHandler(action) {
  try {
    console.log('request-sagas:', action.data);
    //let emp_data = { wfm_manager: 'lokesh' };
    let result = yield call(axios.post, "http://localhost:8000/users/updateEmployeeStatus", action.data)
    console.log(result.data)

     yield put({ type: "SEND_REQUEST", data: result.data })
  }
  catch (e) {
    // yield put({ type: "FAILURE" })
  }
}


export function* managerStatusApproval(action) {
  try {
    console.log('request-sagas:', action.data);
    //let emp_data = { wfm_manager: 'lokesh' };
    let result = yield call(axios.post, "http://localhost:8000/users/updatewfmApprovalStatus", action.data)
    console.log(result.data)

     yield put({ type: "APPROVE_REQUEST", data: result.data })
  }
  catch (e) {
    // yield put({ type: "FAILURE" })
  }
}