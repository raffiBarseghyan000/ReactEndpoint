import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import history from '../history'
import queryString from "query-string"
import Swal from "sweetalert2";
import Spinner from "./spinner";

class EntryList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            entryCount: -1,
            initialPage: parseInt(queryString.parse(this.props.location.search).page) || 1,
            showCheckBoxPopup: null
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.addNewEntry = this.addNewEntry.bind(this)
    }

    editEntry(user) {
        history.push(`${this.props.match.url}/edit/${user}`)
    }

    deleteEntry(entry) {
        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete entry'
        }).then((result) => {
            if (result.value) {
                this.props.deleteEntry(entry)
                debugger
                if (this.props.entryList.entryDelete) {
                    debugger
                    Swal.fire(
                        'Deleted',
                        'Entry has been deleted',
                        'success'
                    ).then(() => {
                        history.push('/main/entries')
                    })
                } else {
                    Swal.fire(
                        'Unable to deleted',
                        result.message,
                        'error'
                    )
                }

            }
        })
    }

    renderEntryList() {
        let retArray = []
        this.props.entryList.entryList.values.map((elem, index) => {
            return retArray.push(<tr key={elem.name}>
                <td>
                    {elem.name}
                </td>
                <td>
                    {elem.value}
                </td>
                <td>
                    Count: {this.props.entryList.userCount && this.props.entryList.userCount[index]}
                    <button className="btn btn-block"
                            onClick={() => history.push(`${this.props.match.url}/linkUser/${elem.name}`)}>
                        <i className="fa fa-edit"/>Edit users
                    </button>
                </td>
                <td>
                    <button className="btn btn-block" onClick={() => this.editEntry(elem.name)}><i
                        className="fa fa-edit"/>Edit
                    </button>
                    <button className="btn btn-block" onClick={() => this.deleteEntry(elem.name)}><i
                        className="fa fa-trash"/>Delete
                    </button>
                </td>
            </tr>)
        })
        retArray = <tbody>{retArray}</tbody>
        return retArray
    }

    handlePageClick(data) {
        let selected = data.selected
        let offset = Math.ceil(selected * this.props.showPerPage)
        // this.refreshEntryList(offset, this.props.showPerPage, selected)
        this.props.updateEntryList(offset, this.props.showPerPage)
    }

    addNewEntry() {
        history.push(`${this.props.match.url}/addNew`)
    }

    componentDidMount() {
        this.props.updateEntryList(0, this.props.showPerPage)
    }

    render() {
        return (
            <div>
                <button className="btn btn-secondary float-sm-right col-lg-2"
                        onClick={this.addNewEntry}>Add new entry
                </button>
                <div className="pagination_parent">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <td>
                                <h3>Name</h3>
                            </td>
                            <td>
                                <h3>Value</h3>
                            </td>
                            <td width="150px">
                                <h3>Users</h3>
                            </td>
                            <td width="100px">
                                <h3>Actions</h3>
                            </td>
                        </tr>
                        </thead>
                        {this.props.entryList.entryList && this.props.entryList.entryList.count > 0 && this.renderEntryList()}
                    </table>
                    {this.props.entryList.loading && <Spinner/>}
                    {!this.props.entryList.entryList && <div>Nothing to display</div>}
                    {this.props.entryList.entryList && this.props.entryList.entryList.count > 0 && <ReactPaginate
                        pageCount={Math.ceil(this.props.entryList.entryList.count / this.props.showPerPage)}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        initialPage={this.state.initialPage - 1}
                        onPageChange={this.handlePageClick}
                    />}
                </div>
            </div>
        )
    }

}

export default EntryList