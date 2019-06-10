import makeApiCall from "../apiCall"
import {takeEvery, put, call} from 'redux-saga/effects'

function* editUserWatcher() {
    yield takeEvery('EDIT_USER', editUser)
}

function* editUser({username, firstName, lastName}) {
    yield call(makeApiCall, 'PUT', `/users/${username}`, {
        firstName,
        lastName
    })
    yield put({type: 'EDIT_USER_DONE'})
}

function* verifyUserWatcher() {
    yield takeEvery('VERIFY_USER', verifyUser)
}

function* verifyUser({username}) {
    const response = yield call(makeApiCall, 'GET', `/users/${username}`)
    if(response.success) {
        yield put({type: 'VERIFY_USER_DONE', firstName: response.result.firstName, lastName: response.result.lastName})
    }
    else {
        yield put({type: 'VERIFY_USER_FAIL', message: response.message})
    }
}

export {verifyUserWatcher, editUserWatcher}