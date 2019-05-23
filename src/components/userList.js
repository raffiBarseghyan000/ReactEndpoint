import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import history from '../history'
import {deleteConfirmation} from './popUp'
import PropTypes from 'prop-types'

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userCount: 0,
            showDeletePopUp: false
        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
        this.deleteConfirmationPopUp = this.deleteConfirmationPopUp.bind(this)
    }

    renderList(elem) {
        const retArray = []
        Object.keys(elem).map((elemKeys) => {
            retArray.push(
                <li key={elemKeys}>
                    {elem[elemKeys]}
                </li>
            )
        })
        return retArray
    }

    async deleteUser(username) {
        this.setState({showDeletePopUp: true})
        // await makeApiCall('DELETE', `/usersd/${username}`)
    }

    renderUserList() {
        const retArray = []
        if (this.props.userList) {
            this.props.userList.map((elem) => {
                retArray.push(<tr>
                    <td>
                        <ul>
                            {this.renderList(elem)}
                        </ul>
                    </td>
                    <td>
                        <button onClick={() => {
                            this.deleteUser(elem.username)
                        }}>delete
                        </button>
                    </td>
                </tr>)
            })
        }
        return retArray
    }

    async refreshUserList(offset, limit) {
        const response = await makeApiCall('GET', `/users?offset=${offset}&limit=${limit}`)
        if (response.success === false) {
            console.log(response.message)
        } else {
            this.props.updateUserList(response.result.values)
            this.setState({userCount: response.result.count})
        }
    }

    componentDidMount() {
        this.refreshUserList(0, this.props.showPerPage).then(() => {
        })
    }

    handlePageClick(data) {
        let selected = data.selected
        let offset = Math.ceil(selected * this.props.showPerPage)
        this.refreshUserList(offset, this.props.showPerPage)
    }

    addNewUser() {
        history.push(`${this.props.parentPath}/addNew`)
    }

    deleteConfirmationPopUp() {
        if (this.state.showDeletePopUp) {
            return deleteConfirmation()
        }
        return
    }

    render() {
        return (
            <div>
                <button onClick={this.addNewUser}>Add new user</button>
                <table>
                    <tbody>
                    {this.renderUserList()}
                    </tbody>
                </table>
                <ReactPaginate
                    pageCount={Math.ceil(this.state.userCount / this.props.showPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={this.handlePageClick}
                />
                {this.deleteConfirmationPopUp()}
            </div>
        )
    }

}

UserList.propTypes = {
    userList: PropTypes.array
}

export default UserList