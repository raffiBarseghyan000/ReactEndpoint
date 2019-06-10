import { connect } from 'react-redux'
import EditUser from '../components/editUser'
import {verifyUser, editUser} from "../actions"

const mapStateToProps = (state)=> ({
    editUserResponse: state.editUserState
})

const mapDispatchToProps = (dispatch)=> ({
    editUser: (username, firstName, lastName)=> dispatch(editUser(username, firstName, lastName)),
    verifyUser: (username)=> dispatch(verifyUser(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)