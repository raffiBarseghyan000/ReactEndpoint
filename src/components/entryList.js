import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import history from '../history'
import queryString from "query-string"
import Swal from 'sweetalert2'

class EntryList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            entryCount: 0,
            initialPage: parseInt(queryString.parse(this.props.location.search).page) || 1
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.addNewEntry = this.addNewEntry.bind(this)
        this.deleteEntriesSubmit = this.deleteEntriesSubmit.bind(this)
        this.refreshEntryList = this.refreshEntryList.bind(this)
        this.handleEntryDelete = this.handleEntryDelete.bind(this)
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
                makeApiCall('DELETE', `/entries/${entry}`).then((result) => {
                    if (result.success) {
                        Swal.fire(
                            'Deleted',
                            'Entry has been deleted',
                            'success'
                        ).then(() => {
                            history.push('/main/entries?page=1')
                        })
                    } else {
                        Swal.fire(
                            'Unable to deleted',
                            result.message,
                            'error'
                        )
                    }
                })
            }
        })
    }

    renderEntryList() {
        const retArray = []
        if (this.props.entryList.entry) {
            this.props.entryList.entry.map((elem, index) => {
                return retArray.push(<tr key={elem.name}>
                    <td>
                        {elem.name}
                    </td>
                    <td>
                        {elem.value}
                    </td>
                    <td>
                        Count: {this.props.entryList.userCount[index]}
                        <button role='button' className="btn btn-block" onClick={() => this.handleEditUsers(elem.name)}><i
                            className="fa fa-edit"/>Edit users
                        </button>
                    </td>
                    <td>
                        <button role='button' className="btn btn-block" onClick={() => this.editEntry(elem.name)}><i
                            className="fa fa-edit"/>Edit
                        </button>
                        <button role='button' className="btn btn-block" onClick={() => this.deleteEntry(elem.name)}><i
                            className="fa fa-trash"/>Delete
                        </button>
                    </td>
                </tr>)
            })
        }
        return retArray
    }

    async refreshEntryList(offset, limit, selected) {
        const response = await makeApiCall('GET', `/entries?offset=${offset}&limit=${limit}`)
        if (response.success === false) {
            Swal.fire(
                'Error',
                response.message,
                'error'
            )
        } else {
            const promiseArr = []
            response.result.values.map((elem) => {
                promiseArr.push(makeApiCall('GET', `/attachedEntry/${elem.name}`))
            })
            let userCount = await Promise.all(promiseArr)
            userCount = userCount.map((elem) => {
                return elem.value
            })
            this.props.updateEntryList({entry: response.result.values, userCount: userCount})
            this.setState({entryCount: response.result.count})
            history.push(`?page=${selected + 1}`)
        }
    }

    handlePageClick(data) {
        let selected = data.selected
        let offset = Math.ceil(selected * this.props.showPerPage)
        this.refreshEntryList(offset, this.props.showPerPage, selected)
    }

    addNewEntry() {
        history.push(`${this.props.match.url}/addNew`)
    }

    async deleteEntriesSubmit(event) {
        event.preventDefault()
        const result = await makeApiCall('DELETE', `/entries`)
        if (result.success === false) {
            Swal.fire(
                'Error',
                result.message,
                'error'
            )
        } else {
            history.push(this.props.match.url)
        }
    }

    handleEntryDelete() {
        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete all'
        }).then((result) => {
            if (result.value) {
                makeApiCall('DELETE', `/entries`).then((result) => {
                    if (result.success) {
                        Swal.fire(
                            'Deleted',
                            'Entries have been deleted',
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
                })
            }
        })
    }

    componentDidMount() {
        makeApiCall('GET', `/entries?limit=0`).then((response) => {
            this.setState({entryCount: response.result.count})
        })
    }

    render() {
        return (
            <div>
                <button role='button' className="btn btn-secondary float-sm-right col-lg-2"
                        onClick={this.addNewEntry}>Add new entry
                </button>
                <div className="pagination_parent">
                    {this.state.entryCount > 0 &&
                    <button role='button' className="btn btn-secondary float-sm-right col-lg-2"
                            onClick={this.handleEntryDelete}>Delete all</button>}
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
                        <tbody>
                        {this.state.entryCount > 0 ? this.renderEntryList() : <span>No entries to display</span>}
                        </tbody>
                    </table>
                    {this.state.entryCount > 0 && <ReactPaginate
                        pageCount={Math.ceil(this.state.entryCount / this.props.showPerPage)}
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