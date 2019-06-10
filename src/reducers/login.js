const loginState = (state = {pending: false}, action)=> {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                pending: false
            }
        case 'LOGIN_DONE':
            return {
                ...state,
                pending: true,
                success: true,
                token: action.token
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                pending: true,
                success: false,
                message: action.message
            }
        default:
            return state
    }
}

export default loginState