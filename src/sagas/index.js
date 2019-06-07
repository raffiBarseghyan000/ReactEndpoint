import {call, put, takeLatest, all} from 'redux-saga/effects'
import {deleteEntryActionWatcher, entryActionWatcher} from "./displayEntries"
import {userActionWatcher, deleteUserActionWatcher} from './displayUsers'

export default function* rootSaga() {
    yield all([
        entryActionWatcher(),
        deleteEntryActionWatcher(),
        userActionWatcher(),
        deleteUserActionWatcher()
    ]);
}