import { connect } from 'react-redux'
import EditEntry from '../components/editEntry'
import {verifyEntry, editEntry} from "../actions"

const mapStateToProps = (state)=> ({
    editEntryResponse: state.editEntryState
})

const mapDispatchToProps = (dispatch)=> ({
    editEntry: (name, value)=> dispatch(editEntry(name, value)),
    verifyEntry: (name)=> dispatch(verifyEntry(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry)