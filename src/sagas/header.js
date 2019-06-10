import makeApiCall from "../apiCall"
import {takeEvery, all, takeLatest, put, call} from 'redux-saga/effects'

function* addHeaderWatcher() {
    yield takeEvery('LOGOUT', logout)
}

function* logout() {
    yield call(makeApiCall, 'POST', '/logout')
}

export {addHeaderWatcher}