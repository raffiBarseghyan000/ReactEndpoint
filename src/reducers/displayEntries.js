const displayedEntries = (state = [], action)=> {
    switch(action.type) {
        case 'ADD_ENTRY':
            return ([
                ...state,
                action.value
            ])
        default:
            return state
    }
}

export default displayedEntries