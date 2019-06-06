import {call, put, takeLatest, all, takeEvery} from 'redux-saga/effects'
import makeApiCall from "../apiCall"

function* deleteEntryActionWatcher() {
    yield takeEvery('DELETE_ENTRY', deleteEntry)
}

function* deleteEntry({entry}) {
    const response = yield makeApiCall('DELETE', `/entries/${entry}`)
    if(response.success) {
        yield put({type: 'ENTRY_DELETE_DONE'})
    }
    else {
        yield put({type: 'ENTRY_DELETE_FAIL', message: response.message})
    }
}

export default deleteEntryActionWatcher