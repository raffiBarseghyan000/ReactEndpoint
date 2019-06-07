import { connect } from 'react-redux'
import Entries from '../components/entries'
import {deleteUser, addEntry} from "../actions"

const mapDispatchToProps = (dispatch)=> ({
    addUser: (fields)=> dispatch(addEntry(fields))
})

export default connect(null, mapDispatchToProps)(Entries)