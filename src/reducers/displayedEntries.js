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
        case 'RECEIVED_USER_COUNT_FOR_ENTRIES':
            return {
                ...state,
                userCount: action.userCount
            }
        case 'FAILED_ENTRY_LIST':
            return {
                ...state,
                entryList: action.updatedEntryList,
                message: action.message
            }
        case 'FAILED_USER_COUNT_FOR_ENTRIES':
            return {
                ...state,
                userCount: null
            }
        case 'ENTRY_DELETE_DONE':
            return {
                ...state,
                entryDelete: true
            }
        case 'ENTRY_DELETE_FAIL':
            return {
                ...state,
                entryDelete: false,
                message: action.message
            }
        default:
            return state
    }
}

export default displayedEntries