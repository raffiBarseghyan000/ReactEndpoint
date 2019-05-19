export const toggleLoginState = (newState)=> ({
    type: 'TOGGLE_LOGIN_STATE',
    newState
})

export const LoginStates = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
}