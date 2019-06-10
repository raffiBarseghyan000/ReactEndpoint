import React from 'react'
import ReactPaginate from 'react-paginate'
import history from '../history'
import queryString from 'query-string'
import Swal from 'sweetalert2'
import Spinner from "./spinner"

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            initialPage: parseInt(queryString.parse(this.props.location.search).page) || 1
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
    }

    renderList(elem) {
        const retArray = []
        Object.keys(elem).map((elemKey) => {
            return retArray.push(
                <td key={elemKey}>
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
            confirmButtonText: 'Yes, delete user',
            onOpen: () => {
                this.props.deleteUser(username)
            }
        }).then((result) => {
            if (result.value) {
                if (this.props.userList.userDelete) {
                    Swal.fire(
                        'Deleted',
                        'User has been deleted',
                        'success'
                    ).then(() => {
                        this.handlePageClick({selected: 0})
                    })
                } else {
                    Swal.fire({
                        title: 'Unable to deleted',
                        text: this.props.userList.message,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }
        })
    }

    renderUserList() {
        const retArray = []
        if (!this.props.loading) {
            this.props.userList.userList.values.map((elem) => {
                return retArray.push(<tr key={elem.username}>
                    {this.renderList(elem)}
                    <td>
                        <button className="btn btn-block" onClick={() => this.editUser(elem.username)}><i
                            className="fa fa-edit"/>Edit
                        </button>
                        <button className="btn btn-block" onClick={() => this.deleteUser(elem.username)}><i
                            className="fa fa-trash"/>Delete
                        </button>
                    </td>
                </tr>)
            })
        } else {
            retArray.push(<Spinner/>)
        }
        return retArray
    }

    handlePageClick(data) {
        let selected = data.selected
        let offset = Math.ceil(selected * this.props.showPerPage)
        this.props.updateUserList(offset, this.props.showPerPage)
        history.push(`?page=${selected + 1}`)
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
                        <td width="100px">
                            <h3>Actions</h3>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderUserList()}
                    </tbody>
                </table>
                <ReactPaginate
                    pageCount={Math.ceil(this.props.userList.userList.count / this.props.showPerPage)}
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