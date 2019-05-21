const displayedUsers = (state = [], action)=> {
    switch(action.type) {
        case 'REFRESH_USERS_LIST':
            return action.updatedUsersList
        default:
            return state
    }
}

export default displayedUsers