import { combineReducers } from 'redux'
import clientStatus from './clientStatus'
import displayedUsers from './displayedUsers'
import displayedEntries from './displayEntries'

export default combineReducers({
    clientStatus,
    displayedUsers,
    displayedEntries
})
