const displayedUsers = (state = [], action)=> {
    switch(action.type) {
        case 'ADD_USER':
            return ([
                ...state,
                action.username
            ])
        default:
            return state
    }
}

export default displayedUsers