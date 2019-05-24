import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import history from '../history'
import {deleteConfirmationEntry} from "./popUp";

class EntryList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            entryCount: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.addNewEntry = this.addNewEntry.bind(this)
        this.deleteEntriesSubmit = this.deleteEntriesSubmit.bind(this)
    }

    renderEntryList() {
        const retArray = []
        if (this.props.entryList) {
            this.props.entryList.map((elem) => {
                retArray.push(<tr>
                    <td>
                        <ul>
                            <li>
                                {JSON.stringify(elem)}
                            </li>
                        </ul>
                    </td>
                </tr>)
            })
        }
        return retArray
    }

    async refreshEntryList(offset, limit) {
        const response = await makeApiCall('GET', `/entries?offset=${offset}&limit=${limit}`)
        if (response.success === false) {
            console.log(response.message)
        } else {
            this.props.updateEntryList(response.result.values)
            this.setState({entryCount: response.result.count})
        }
    }

    componentDidMount() {
        this.refreshEntryList(0, this.props.showPerPage).then(() => {
        })
    }

    handlePageClick(data) {
        let selected = data.selected
        let offset = Math.ceil(selected * this.props.showPerPage)
        this.refreshEntryList(offset, this.props.showPerPage)
    }

    addNewEntry() {
        history.push(`${this.props.parentPath}/addNew`)
    }

    async deleteEntriesSubmit(event) {
        event.preventDefault()
        const result = await makeApiCall('DELETE', `/entries`)
        if (result.success === false) {
            alert(result.message)
        } else {
            history.push(this.props.parentPath)
        }
    }

    render() {

        let renderValue
        if(this.props.entryList.length !== 0) {
            renderValue = <div className="pagination_parent">
                {deleteConfirmationEntry()}
                <table className="table table-bordered">
                    <thead>Entries</thead>
                    <tbody>
                    {this.renderEntryList()}
                    </tbody>
                </table>
                <ReactPaginate
                    pageCount={Math.ceil(this.state.entryCount / this.props.showPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={this.handlePageClick}
                />
            </div>
        }
        else {
            renderValue = <div>No entries to display</div>
        }

        return (
            <div>
                <button className="btn btn-secondary float-sm-right col-lg-2" onClick={this.addNewEntry}>Add new entry</button>
                {renderValue}
            </div>
        )
    }

}

export default EntryList