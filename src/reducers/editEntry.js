const editEntryState = (state = {}, action)=> {
    switch (action.type) {
        case 'EDIT_ENTRY_DONE':
            return {
                ...state,
                edited: true
            }
        case 'VERIFY_ENTRY_DONE':
            return {
                ...state,
                verified: true
            }
        case 'VERIFY_ENTRY_FALSE':
            return {
                ...state,
                verified: false
            }
        default:
            return state
    }
}

export default editEntryState
