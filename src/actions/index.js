export const refreshUsersList = (updatedUsersList)=> ({
    type: 'REFRESH_USERS_LIST',
    updatedUsersList
})

export const refreshEntryList = (updatedEntryList)=> ({
    type: 'REFRESH_ENTRY_LIST',
    updatedEntryList
})

export const LoginStates = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
}

export const SelectTabStates = {
    USERS: 'users',
    ENTRIES: 'entries'
}