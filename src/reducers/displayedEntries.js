import {LoadingStates as LOADING_STATES} from '../actions'

const displayedEntries = (state = {loading: LOADING_STATES.NOT_SENT}, action) => {
    switch (action.type) {
        case 'REFRESH_ENTRY_LIST':
            return {
                ...state,
                loading: LOADING_STATES.PENDING
            }
        case 'RECEIVED_ENTRY_LIST':
            return {
                ...state,
                entryList: action.updatedEntryList,
                loading: LOADING_STATES.RECEIVED
            }
        default:
            return state
    }
}

export default displayedEntries