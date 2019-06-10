import makeApiCall from "../apiCall"
import {takeEvery, put, call} from 'redux-saga/effects'

function* getAllUsersWatcher() {
    yield takeEvery('GET_ALL_USERS', getAllUsers)
}

function* getAllUsers({name}) {
    const response = yield call(makeApiCall, 'GET', `/entries/users/${name}`)
    if(response.success) {
        yield put({type: 'GET_ALL_USERS_DONE', users: response.value})
    }
    else {
        yield put({type: 'GET_ALL_USERS_FAIL', message: response.message})
    }
}

function* checkUserWatcher() {
    yield takeEvery('CHECK_USER', checkUser)
}

function* uncheckUserWatcher() {
    yield takeEvery('UNCHECK_USER', uncheckUser)
}

function* uncheckUser({user, entry}) {
    const response = yield call(makeApiCall, 'DELETE', `/entries/users`, {entry, user})
    if(response.success) {
        yield put({type: 'USER_DETACHED'})
    }
    const response0 = yield call(makeApiCall, 'GET', `/entries/users/${entry}`)
    if(response0.success) {
        yield put({type: 'GET_ALL_USERS_DONE', users: response0.value})
    }
    else {
        yield put({type: 'GET_ALL_USERS_FAIL', message: response0.message})
    }
}

function* checkUser({user, entry}) {
    const response = yield call(makeApiCall, 'POST', `/entries/users`, {entry, user})
    if(response.success) {
        yield put({type: 'USER_ATTACHED'})
    }
    const response0 = yield call(makeApiCall, 'GET', `/entries/users/${entry}`)
    if(response0.success) {
        yield put({type: 'GET_ALL_USERS_DONE', users: response0.value})
    }
    else {
        yield put({type: 'GET_ALL_USERS_FAIL', message: response0.message})
    }
}

export {getAllUsersWatcher, checkUserWatcher, uncheckUserWatcher}