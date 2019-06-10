import { combineReducers } from 'redux'
import displayedUsers from './displayedUsers'
import displayedEntries from './displayedEntries'
import addEntries from './entries'
import addUsers from './users'
import editEntryState from './editEntry'
import editUserState from './editUser'
import loginState from './login'

export default combineReducers({
    displayedUsers,
    displayedEntries,
    addEntries,
    addUsers,
    editEntryState,
    editUserState,
    loginState
})
