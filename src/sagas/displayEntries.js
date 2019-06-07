import {call, put, takeLatest, all, takeEvery} from 'redux-saga/effects'
import makeApiCall from "../apiCall"

function* deleteEntryActionWatcher() {
    yield takeEvery('DELETE_ENTRY', deleteEntry)
}

function* deleteEntry({entry}) {
    const response = yield call(makeApiCall, 'DELETE', `/entries/${entry}`)
    if(response.success) {
        yield put({type: 'ENTRY_DELETE_DONE'})
    }
    else {
        yield put({type: 'ENTRY_DELETE_FAIL', message: response.message})
    }
}

function* fetchEntries({offset, limit}) {
    const responseEntries = yield makeApiCall('GET', `/entries?offset=${offset}&limit=${limit}`)
    if (responseEntries.success) {
        yield put({type: 'RECEIVED_ENTRY_LIST', updatedEntryList: responseEntries.result})
        const results = yield all(responseEntries.result.values.map(entry => call(fetchUserCountForEntries, entry.name)))
        yield put({type: 'RECEIVED_USER_COUNT_FOR_ENTRIES', userCount: results})
    } else {
        yield put({
            type: 'FAILED_ENTRY_LIST',
            updatedEntryList: responseEntries.values,
            message: responseEntries.message
        })
    }
}

function* fetchUserCountForEntries(name) {
    const response = yield call(makeApiCall, 'GET', `/entries/users/count/${name}`)
    return response.value
}

function* entryActionWatcher() {
    yield takeLatest('REFRESH_ENTRY_LIST', fetchEntries)
}

export {deleteEntryActionWatcher,entryActionWatcher}