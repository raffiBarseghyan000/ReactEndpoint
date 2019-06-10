import { connect } from 'react-redux'
import UserEntry from '../components/linkUserToEntry'
import {getAllUsers, checkEntry, uncheckEntry} from "../actions"

const mapStateToProps = (state)=> ({
    users: state.userEntryState
})

const mapDispatchToProps = (dispatch)=> ({
    getAllUsers: (name)=> dispatch(getAllUsers(name)),
    checkEntry: (user, entry)=> dispatch(checkEntry(user, entry)),
    uncheckEntry: (user, entry)=> dispatch(uncheckEntry(user, entry))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEntry)