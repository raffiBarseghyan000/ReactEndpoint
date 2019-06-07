import makeApiCall from "../apiCall";

function* addEntryWatcher() {
    yield takeEvery('ADD_ENTRY', addEntry)
}

function* addEntry(fields) {
    const response = yield call(makeApiCall, 'POST', `/entries`, {name: this.addEntryName, value: this.addEntryValue})

}