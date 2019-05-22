import { combineReducers } from 'redux'
import displayedUsers from './displayedUsers'
import displayedEntries from './displayEntries'

export default combineReducers({
    displayedUsers,
    displayedEntries
})
