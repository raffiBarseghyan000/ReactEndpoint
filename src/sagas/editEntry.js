import makeApiCall from "../apiCall"
import {takeEvery, all, takeLatest, put, call} from 'redux-saga/effects'

function* editEntryWatcher() {
    yield takeEvery('EDIT_ENTRY', editEntry)
}

function* editEntry({name, value}) {
    yield call(makeApiCall, 'PUT', `/entries/${name}`, {
        value: value
    })
    yield put({type: 'EDIT_ENTRY_DONE'})
}

function* verifyEntryWatcher() {
    yield takeEvery('VERIFY_ENTRY', verifyEntry)
}

function* verifyEntry({name}) {
    const response = yield call(makeApiCall, 'GET', `/entries/${name}`)
    if(response.success) {
        yield put({type: 'VERIFY_ENTRY_DONE'})
    }
    else {
        yield put({type: 'VERIFY_ENTRY_FAIL', message: response.message})
    }
}

export {editEntryWatcher, verifyEntryWatcher}