const userEntryState = (state = {users: [], pending: false}, action)=> {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return {
                ...state,
                pending: false,
                users : []
            }
        case 'GET_ALL_USERS_DONE':
            return {
                ...state,
                success: true,
                pending: true,
                users : action.users
            }
        case 'GET_ALL_USERS_FAIL':
            return {
                ...state,
                success: false,
                pending: true,
                message: action.message
            }
        case 'USER_ATTACHED' || 'USER_DETACHED':
            return {
                ...state,
                pending: true,
                users : []
            }
        case 'CHECK_USER' || 'UNCHECK_USER':
            return {
                ...state,
                pending: false,
                users : []
            }
        default:
            return state
    }
}

export default userEntryState