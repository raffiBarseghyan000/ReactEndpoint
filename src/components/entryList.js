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

    renderEntryList() {
        const retArray = []
        if (this.props.entryList) {
            this.props.entryList.map((elem, index) => {
                return retArray.push(<tr key={index}>
                    <td>
                        {JSON.stringify(elem)}
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
            this.props.updateEntryList(response.result.values)
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
                        ).then(()=> {
                            history.push('/main/entries')
                        })
                    }
                    else {
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
                <button className="btn btn-secondary float-sm-right col-lg-2" onClick={this.addNewEntry}>Add new entry
                </button>
                <div className="pagination_parent">
                    {this.state.entryCount > 0 && <button className="btn btn-secondary float-sm-right col-lg-2"
                                                          onClick={this.handleEntryDelete}>Delete all</button>}
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <td>
                                <h3>Entries</h3>
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