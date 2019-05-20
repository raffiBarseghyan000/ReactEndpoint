import { connect } from 'react-redux'
import UserList from '../components/userList'
import {refreshUsersList, refreshUsersCount} from "../actions";

const mapStateToProps = (state)=> ({
    userList: state.displayedUsers
})

const mapDispatchToProps = (dispatch)=> ({
    updateUserList: (newUserList)=> dispatch(refreshUsersList(newUserList)),
    updateUserCount: (newUserCount)=> dispatch(refreshUsersCount(newUserCount))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)