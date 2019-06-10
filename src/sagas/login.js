import makeApiCall from "../apiCall"
import {takeEvery, put, call} from 'redux-saga/effects'

function* loginWatcher() {
    yield takeEvery('LOGIN', login)
}

function* login({username, password}) {
    const response = yield call(makeApiCall, 'POST', '/login', {
        username,
        password
    })
    if(response.success) {
        yield put({type: 'LOGIN_DONE', token: response.token})
    }
    else {
        yield put({type: 'LOGIN_FAIL', message: response.message})
    }
}

export {loginWatcher}