import makeApiCall from "../apiCall"
import {takeEvery, takeLatest, put, call} from 'redux-saga/effects'

function* deleteUserActionWatcher() {
    yield takeEvery('DELETE_USER', deleteUser)
}

function* deleteUser({username}) {
    const response = yield call(makeApiCall, 'DELETE', `/users/${username}`)
    if(response.success) {
        yield put({type: 'USER_DELETE_DONE'})
    }
    else {
        yield put({type: 'USER_DELETE_FAIL', message: response.message})
    }
}

function* fetchUsers({offset, limit}) {
    const responseUsers = yield call(makeApiCall, 'GET', `/users?offset=${offset}&limit=${limit}`)
    if (responseUsers.success) {
        yield put({type: 'RECEIVED_USER_LIST', updatedUserList: responseUsers.result})
    } else {
        yield put({
            type: 'FAILED_USER_LIST',
            updatedEntryList: responseUsers.values,
            message: responseUsers.message
        })
    }
}

function* userActionWatcher() {
    yield takeLatest('REFRESH_USERS_LIST', fetchUsers)
}

export {userActionWatcher, deleteUserActionWatcher}