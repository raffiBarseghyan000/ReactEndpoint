import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import history from '../history'
import {deleteConfirmationEntry} from "./popUp";
import queryString from "query-string";

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
            alert(response.message)
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
            alert(result.message)
        } else {
            history.push(this.props.match.url)
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-secondary float-sm-right col-lg-2" onClick={this.addNewEntry}>Add new entry
                </button>
                <div className="pagination_parent">
                    {deleteConfirmationEntry()}
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <td>
                                <h3>Entries</h3>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderEntryList()}
                        </tbody>
                    </table>
                    <ReactPaginate
                        pageCount={Math.ceil(this.state.entryCount / this.props.showPerPage)}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        initialPage={this.state.initialPage - 1}
                        onPageChange={this.handlePageClick}
                    />
                </div>
            </div>
        )
    }

}

export default EntryList