import { combineReducers } from 'redux'
import displayedUsers from './displayedUsers'
import displayedEntries from './displayedEntries'

export default combineReducers({
    displayedUsers,
    displayedEntries
})
