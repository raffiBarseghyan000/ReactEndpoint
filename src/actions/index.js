export const refreshUsersList = (offset, limit) => ({
    type: 'REFRESH_USERS_LIST',
    offset,
    limit
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

export const deleteUser = (username)=> ({
    type: 'DELETE_USER',
    username
})

export const addEntry = (fields)=> ({
    type: 'ADD_ENTRY',
    fields
})

export const LoginStates = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
}