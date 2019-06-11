const displayedUsers = (state = {userList: {values: []}, deletePending: false}, action)=> {
    switch(action.type) {
        case 'REFRESH_USERS_LIST':
            return {
                ...state,
                loading: true
            }
        case 'RECEIVED_USER_LIST':
            return {
                ...state,
                userList: action.updatedUserList,
                loading: false
            }
        case 'FAILED_USER_LIST':
            return {
                ...state,
                userList: action.updatedUserList,
                loading: false,
                message: action.message
            }
        case 'DELETE_USER':
            return {
                ...state,
                deletePending: false,
            }
        case 'USER_DELETE_DONE':
            return {
                ...state,
                userDelete: true,
                deletePending: true
            }
        case 'USER_DELETE_FAIL':
            return {
                ...state,
                userDelete: false,
                deletePending: true,
                message: action.message
            }
        default:
            return state
    }
}

export default displayedUsers