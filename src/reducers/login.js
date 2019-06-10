const loginState = (state = {}, action)=> {
    switch (action.type) {
        case 'LOGIN_DONE':
            return {
                ...state,
                success: true,
                token: action.token
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                success: false,
                message: action.message
            }
        default:
            return state
    }
}

export default loginState