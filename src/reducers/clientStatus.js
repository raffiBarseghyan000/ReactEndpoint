import {LoginStates} from "../actions";

const clientStatus = (state = LoginStates.LOGGED_OUT, action)=> {
    switch (action.type) {
        case 'TOGGLE_LOGIN_STATE':
            return action.newState
        default:
            return state
    }
}


export default clientStatus