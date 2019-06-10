import {call, put, takeLatest, all} from 'redux-saga/effects'
import {deleteEntryActionWatcher, entryActionWatcher} from "./displayEntries"
import {userActionWatcher, deleteUserActionWatcher} from './displayUsers'
import {addEntryWatcher} from './entries'
import {addUserWatcher} from "./users"
import {editEntryWatcher, verifyEntryWatcher} from "./editEntry"
import {editUserWatcher, verifyUserWatcher} from './editUser'
import {addHeaderWatcher} from './header'
import {loginWatcher} from './login'
import {getAllUsersWatcher, checkUserWatcher, uncheckUserWatcher} from './linkUserToEntry'

export default function* rootSaga() {
    yield all([
        entryActionWatcher(),
        deleteEntryActionWatcher(),
        userActionWatcher(),
        deleteUserActionWatcher(),
        addEntryWatcher(),
        addUserWatcher(),
        editEntryWatcher(),
        verifyEntryWatcher(),
        verifyUserWatcher(),
        editUserWatcher(),
        addHeaderWatcher(),
        loginWatcher(),
        getAllUsersWatcher(),
        checkUserWatcher(),
        uncheckUserWatcher()
    ]);
}