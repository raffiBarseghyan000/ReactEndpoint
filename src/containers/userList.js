import { connect } from 'react-redux'
import UserList from '../components/userList'
import {deleteUser, refreshUsersList} from "../actions"

const mapStateToProps = (state)=> ({
    userList: state.displayedUsers
})

const mapDispatchToProps = (dispatch)=> ({
    updateUserList: (offset, limit)=> dispatch(refreshUsersList(offset, limit)),
    deleteUser: (username)=> dispatch(deleteUser(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)