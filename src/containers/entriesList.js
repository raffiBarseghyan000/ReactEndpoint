import { connect } from 'react-redux'
import EntryList from '../components/entryList'
import {refreshEntryList} from "../actions"

const mapStateToProps = (state)=> ({
    entryList: state.displayedEntries
})

const mapDispatchToProps = (dispatch)=> ({
    updateEntryList: (newEntryList)=> dispatch(refreshEntryList(newEntryList))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryList)