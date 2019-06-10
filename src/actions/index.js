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

export const addEntry = (name, value)=> ({
    type: 'ADD_ENTRY',
    name,
    value
})

export const addUser = (username, lastName, firstName, password)=> ({
    type: 'ADD_USER',
    username,
    lastName,
    firstName,
    password
})

export const editEntry = (name, value)=> ({
    type: 'EDIT_ENTRY',
    name,
    value
})

export const verifyEntry = (name)=> ({
    type: 'VERIFY_ENTRY',
    name
})

export const editUser = (username, firstName, lastName)=> ({
    type: 'EDIT_USER',
    username,
    firstName,
    lastName
})

export const verifyUser = (username)=> ({
    type: 'VERIFY_USER',
    username
})

export const logout = ()=> ({
    type: 'LOGOUT'
})

export const login = (username, password)=> ({
    type: 'LOGIN',
    username,
    password
})

export const getAllUsers = (name)=> ({
    type: 'GET_ALL_USERS',
    name
})

export const checkEntry = (user, entry)=> ({
    type: 'CHECK_USER',
    user,
    entry
})

export const uncheckEntry = (user, entry)=> ({
    type: 'UNCHECK_USER',
    user,
    entry
})

export const LoginStates = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
}