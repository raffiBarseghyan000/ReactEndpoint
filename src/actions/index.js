export const refreshUsersList = (updatedUsersList)=> ({
    type: 'REFRESH_USERS_LIST',
    updatedUsersList
})

export const LoginStates = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
}

export const SelectTabStates = {
    USERS: 'users',
    ENTRIES: 'entries'
}