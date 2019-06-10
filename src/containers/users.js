import { connect } from 'react-redux'
import Users from '../components/users'
import {deleteUser, addUser} from "../actions"

const mapStateToProps = (state)=> ({
    addUserResponse: state.addUsers
})

const mapDispatchToProps = (dispatch)=> ({
    addUser: (username, lastName, firstName, password)=> dispatch(addUser(username, lastName, firstName, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)