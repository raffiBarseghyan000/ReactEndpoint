export const refreshUsersList = (updatedUsersList) => ({
    type: 'REFRESH_USERS_LIST',
    updatedUsersList
})

export const refreshEntryList = (offset, limit) => ({
    type: 'REFRESH_ENTRY_LIST',
    offset,
    limit
})

export const deleteEntry = (entry)=> ({
    type: 'DELETE_ENTRY',
    entry
})

export const LoginStates = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
}