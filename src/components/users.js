import React from 'react'
import history from '../history'
import Swal from "sweetalert2";

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            addUsername: '',
            addPassword: '',
            addFirstName: '',
            addLastName: '',
            showPopUp: false
        }

        this.addUserSubmit = this.addUserSubmit.bind(this)
        this.addUserChange = this.addUserChange.bind(this)
        this.addFirstNameChange = this.addFirstNameChange.bind(this)
        this.addLastNameChange = this.addLastNameChange.bind(this)
        this.addPasswordChange = this.addPasswordChange.bind(this)

    }

    addUserChange(event) {
        this.setState({addUsername: event.target.value})
    }

    addPasswordChange(event) {
        this.setState({addPassword: event.target.value})
    }

    addFirstNameChange(event) {
        this.setState({addFirstName: event.target.value})
    }

    addLastNameChange(event) {
        this.setState({addLastName: event.target.value})
    }

    addUserSubmit(event) {
        event.preventDefault()
        this.setState({showPopUp: true})
        this.props.addUser(this.state.addUsername, this.state.addLastName, this.state.addFirstName, this.state.addPassword)
    }

    renderPopUp() {
        if(this.props.addUserResponse.success){
            Swal.fire(
                'Success',
                'Entry added',
                'success'
            ).then(()=> {
                history.push('/main/users')
            })
        }
        else {
            Swal.fire(
                'Error',
                'Can not add entry',
                'error'
            )
        }
        this.setState({showPopUp: false})
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                {this.state.showPopUp && this.props.addUserResponse.show && this.renderPopUp()}
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