const displayedEntries = (state = {}, action) => {
    switch (action.type) {
        case 'REFRESH_ENTRY_LIST':
            return {
                ...state,
                loading: true
            }
        case 'RECEIVED_ENTRY_LIST':
            return {
                ...state,
                entryList: action.updatedEntryList,
                loading: false
            }
        default:
            return state
    }
}

export default displayedEntries