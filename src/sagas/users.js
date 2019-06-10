import makeApiCall from "../apiCall"
import {takeEvery, all, takeLatest, put, call} from 'redux-saga/effects'

function* addUserWatcher() {
    yield takeEvery('ADD_USER', addUser)
}

function* addUser({username, firstName, lastName, password}) {
    const response = yield call(makeApiCall, 'POST', `/users`, {username, firstName, lastName, password})
    if(response.success) {
        yield put({type: 'ADD_USER_DONE'})
    }
    else {
        yield put({type: 'ADD_USER_FAIL', message: response.message})
    }
}

export {addUserWatcher}