const editUserState = (state = {}, action)=> {
    switch (action.type) {
        case 'EDIT_USER_DONE':
            return {
                ...state,
                edited: true
            }
        case 'VERIFY_USER_DONE':
            return {
                ...state,
                verified: true
            }
        case 'VERIFY_USER_FALSE':
            return {
                ...state,
                verified: false
            }
        default:
            return state
    }
}

export default editUserState
