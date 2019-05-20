import React from 'react'
import ReactPaginate from 'react-paginate'
import UserList from '../containers/userList'
import makeApiCall from '../apiCall'

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.addUsername = ''
        this.addPassword = ''
    }

    addUserChange(event) {
        this.addUsername = event.target.value
    }

    addPasswordChange(event) {
        this.addPassword = event.target.value
    }

    async addUserSubmit(event) {
        event.preventDefault()
        const result = await makeApiCall('POST', `/users`, {
            username: this.addUsername,
            password: this.addPassword
        })
        if (result.success === false) {
            alert(result.message)
        }
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <div className='container'>
                <form id="userForm" onSubmit={() => this.addUserSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="addUsername" placeholder="Enter Username"
                               onChange={() => this.addUserChange}/>
                        <input type="text" className="form-control" id="addPassword" placeholder="Enter Password"
                               onChange={() => this.addPasswordChange}/>
                        <button className="btn btn-default" type="submit" id="addUser">Add</button>
                    </div>
                </form>
                </div>
                <UserList/>
            </div>
        )
    }
}

export default Users