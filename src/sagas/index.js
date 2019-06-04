import { put, takeLatest, all } from 'redux-saga/effects'



function* entryActionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews)
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