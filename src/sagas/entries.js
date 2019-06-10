import makeApiCall from "../apiCall"
import {takeEvery, all, takeLatest, put, call} from 'redux-saga/effects'

function* addEntryWatcher() {
    yield takeEvery('ADD_ENTRY', addEntry)
}

function* addEntry({name, value}) {
    const response = yield call(makeApiCall, 'POST', `/entries`, {name, value})
    if(response.success) {
        yield put({type: 'ADD_ENTRY_DONE'})
    }
    else {
        yield put({type: 'ADD_ENTRY_FAIL', message: response.message})
    }
}

export {addEntryWatcher}