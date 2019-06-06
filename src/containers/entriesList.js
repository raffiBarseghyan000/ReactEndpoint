import { connect } from 'react-redux'
import EntryList from '../components/entryList'
import {refreshEntryList, deleteEntry} from "../actions"

const mapStateToProps = (state)=> ({
    entryList: state.displayedEntries
})

const mapDispatchToProps = (dispatch)=> ({
    updateEntryList: (offset, limit)=> dispatch(refreshEntryList(offset, limit)),
    deleteEntry: (entry)=> dispatch(deleteEntry(entry))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryList)