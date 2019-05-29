import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import history from '../history'
import {deleteConfirmationUser} from './popUp'
import queryString from 'query-string'
import Swal from 'sweetalert2'
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
                <td>
                    {elem[elemKey]}
                </td>
            )
        })
        return retArray
    }

    editUser(username) {
        history.push(`${this.props.match.url}/edit/${username}`)
    }

    deleteUser(username) {
        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete user'
        }).then((result) => {
            if (result.value) {
                makeApiCall('DELETE', `/users/${username}`).then((result) => {
                    if (result.success) {
                        Swal.fire(
                            'Deleted',
                            'Entries have been deleted',
                            'success'
                        ).then(() => {
                            history.push('/users')
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

    renderUserList() {
        const retArray = []
        if (this.props.userList) {
            this.props.userList.map((elem) => {
                return retArray.push(<tr key={elem.username}>
                    {this.renderList(elem)}
                    <td>
                        <button className="btn btn-block col-lg-6" onClick={() => this.editUser(elem.username)}><i className="fa fa-edit"/>Edit</button>
                        <button className="btn btn-block col-lg-6" onClick={() => this.deleteUser(elem.username)}><i className="fa fa-trash"/>Delete</button>
                    </td>
                </tr>)
            })
        }
        return retArray
    }

    async refreshUserList(offset, limit, selected = 1) {
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
        history.push(`${this.props.match.url}/addNew`)
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
                        <td>
                            <h3>First Name</h3>
                        </td>
                        <td>
                            <h3>Last Name</h3>
                        </td>
                        <td>
                            <h3>Actions</h3>
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