const displayedUsers = (state = [], action)=> {
    switch(action.type) {
        case 'REFRESH_USERS':
            return action.updatedUsers
        default:
            return state
    }
}

export default displayedUsers