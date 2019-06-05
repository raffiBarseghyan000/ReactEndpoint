import {put, takeLatest, all} from 'redux-saga/effects'
import makeApiCall from "../apiCall";

function* fetchEntries({payload}) {
    const response = yield call(makeApiCall, )
}

function* entryActionWatcher() {
    yield takeLatest('REFRESH_ENTRY_LIST', fetchEntries)
}

function* userActionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews)
}

export default function* rootSaga() {
    yield all([
        entryActionWatcher(),
        userActionWatcher()
    ]);
}