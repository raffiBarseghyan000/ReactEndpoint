const displayedEntries = (state = [], action)=> {
    switch(action.type) {
        case 'REFRESH_ENTRY_LIST':
            return action.updatedEntryList
        default:
            return state
    }
}

export default displayedEntries