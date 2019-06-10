const addUsers = (state = {show: false}, action)=> {
    switch (action.type) {
        case 'ADD_USER_DONE':
            return {
                ...state,
                success: true,
                show: true
            }
        case 'ADD_USER_FAIL':
            return {
                ...state,
                success: false,
                show: true
            }
        default:
            return state
    }
}

export default addUsers