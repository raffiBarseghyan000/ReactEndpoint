import { connect } from 'react-redux'
import User from '../components/users'
import {refreshUsersList} from "../actions";

const mapDispatchToProps = (dispatch)=> ({
    updateUserList: (newUserList)=> dispatch(refreshUsersList(newUserList))
})

export default connect(null, mapDispatchToProps)(User)