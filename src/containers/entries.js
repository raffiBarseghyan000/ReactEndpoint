import { connect } from 'react-redux'
import Entries from '../components/entries'
import {addEntry} from "../actions"

const mapStateToProps = (state)=> ({
    addEntryResponse: state.addEntries
})

const mapDispatchToProps = (dispatch)=> ({
    addEntry: (name, value)=> dispatch(addEntry(name, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries)