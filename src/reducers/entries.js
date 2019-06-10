const addEntries = (state = {show: false}, action)=> {
    switch (action.type) {
        case 'ADD_ENTRY_DONE':
            return {
                ...state,
                success: true,
                show: true
            }
        case 'ADD_ENTRY_FAIL':
            return {
                ...state,
                success: false,
                show: true
            }
        default:
            return state
    }
}

export default addEntries