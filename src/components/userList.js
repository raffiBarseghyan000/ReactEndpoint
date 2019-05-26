import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import history from '../history'
import {deleteConfirmationUser} from './popUp'
import queryString from 'query-string'
import '../styles/pagination.css'

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userCount: 0,
            initialPage: parseInt(queryString.parse(this.props.location.search).page) || 1
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
    }

    renderList(elem) {
        const retArray = []
        Object.keys(elem).map((elemKey) => {
            return retArray.push(
                <li key={elemKey}>
                    {elemKey}: {elem[elemKey]}
                </li>
            )
        })
        return retArray
    }

    editUser(username) {
        history.push(`${this.props.parentPath}/edit/${username}`)
    }

    renderUserList() {
        const retArray = []
        if (this.props.userList) {
            this.props.userList.map((elem) => {
                return retArray.push(<tr key={elem.username}>
                    <td>
                        <ul>
                            {this.renderList(elem)}
                        </ul>
                    </td>
                    <td>
                        {deleteConfirmationUser(elem.username)}
                    </td>
                    <td>
                        <button className="btn btn-block" onClick={() => this.editUser(elem.username)}>Edit</button>
                    </td>
                </tr>)
            })
        }
        return retArray
    }

    async refreshUserList(offset, limit, selected) {
        const response = await makeApiCall('GET', `/users?offset=${offset}&limit=${limit}`)
        if (response.success === false) {
            console.log(response.message)
        } else {
            this.props.updateUserList(response.result.values)
            this.setState({userCount: response.result.count})
            history.push(`?page=${selected + 1}`)
        }
    }

    handlePageClick(data) {
        let selected = data.selected
        let offset = Math.ceil(selected * this.props.showPerPage)
        this.refreshUserList(offset, this.props.showPerPage, selected)
    }

    addNewUser() {
        history.push(`${this.props.parentPath}/addNew`)
    }

    render() {
        return (
            <div className="pagination_parent">
                <button className="btn btn-secondary float-sm-right col-lg-2" onClick={this.addNewUser}>Add new user
                </button>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>
                            <h3>Users</h3>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderUserList()}
                    </tbody>
                </table>
                <ReactPaginate
                    pageCount={Math.ceil(this.state.userCount / this.props.showPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    initialPage={this.state.initialPage - 1}
                    onPageChange={this.handlePageClick}
                />
            </div>
        )
    }

}

export default UserList