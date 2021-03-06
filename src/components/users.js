import React from 'react'
import makeApiCall from '../apiCall'
import history from '../history'
import Swal from "sweetalert2";

class Users extends React.Component {

    constructor(props) {
        super(props)
            this.addUsername = ''
            this.addPassword = ''
            this.addFirstName = ''
            this.addLastName = ''

        this.addUserSubmit = this.addUserSubmit.bind(this)
        this.addUserChange = this.addUserChange.bind(this)
        this.addFirstNameChange = this.addFirstNameChange.bind(this)
        this.addLastNameChange = this.addLastNameChange.bind(this)
        this.addPasswordChange = this.addPasswordChange.bind(this)

    }

    addUserChange(event) {
        this.addUsername = event.target.value
    }

    addPasswordChange(event) {
        this.addPassword = event.target.value
    }

    addFirstNameChange(event) {
        this.addFirstName = event.target.value
    }

    addLastNameChange(event) {
        this.addLastName = event.target.value
    }

    async addUserSubmit(event) {
        event.preventDefault()
        const result = await makeApiCall('POST', `/users`, {
            username: this.addUsername,
            password: this.addPassword,
            firstName: this.addFirstName,
            lastName: this.addLastName
        })
        await Swal.fire(
            result.message
        )
        if(result.success){
            history.push(`/users`)
        }
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <div className='container'>
                <form id="userForm" onSubmit={this.addUserSubmit}>
                    <div className="form-group">
                        <label htmlFor="addUsername">Username:</label>
                        <input type="text" className="form-control" id="addUsername" placeholder="Enter Username"
                               onChange={this.addUserChange}/>
                        <label htmlFor="addFirstName">First Name:</label>
                        <input type="text" className="form-control" id="addFirstName" placeholder="Enter First Name"
                               onChange={this.addFirstNameChange}/>
                        <label htmlFor="addLastName">Last Name:</label>
                        <input type="text" className="form-control" id="addLastName" placeholder="Enter Last Name"
                               onChange={this.addLastNameChange}/>
                        <label htmlFor="addPassword">Password:</label>
                        <input type="text" className="form-control" id="addPassword" placeholder="Enter Password"
                               onChange={this.addPasswordChange}/>
                        <button className="btn btn-default" type="submit" id="addUser">Add</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

export default Users