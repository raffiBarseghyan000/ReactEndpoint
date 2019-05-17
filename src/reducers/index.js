import { combineReducers } from 'redux'
import clientStatus from './clientStatus'
import displayUsers from './displayedUsers'
import displayEntries from './displayEntries'

export default combineReducers({
    clientStatus,
    displayUsers,
    displayEntries
})
