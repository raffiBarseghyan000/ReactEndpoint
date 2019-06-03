import React from 'react'
import makeApiCall from '../apiCall'
import history from '../history'
import Swal from "sweetalert2";
import Spinner from "./spinner";

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.addUserSubmit = this.addUserSubmit.bind(this)
        this.addFirstNameChange = this.addFirstNameChange.bind(this)
        this.addLastNameChange = this.addLastNameChange.bind(this)
        this.addPasswordChange = this.addPasswordChange.bind(this)
        this.addPassword = ''
        this.addFirstName = ''
        this.addLastName = ''
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        makeApiCall('GET', `/users/${this.props.match.params.username}`).then((response) => {
            let user
            if (response.success) {
                user = response.result
            } else {
                user = null
            }
            this.setState({user: user})
        })
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
        const result = await makeApiCall('PUT', `/users/${this.state.user.username}`, {
            password: this.addPassword,
            firstName: this.addFirstName,
            lastName: this.addLastName
        })
        await Swal.fire(
            result.message
        )
        if (result.success) {
            history.push('/users')
        }
    }

    render() {
        let renderValue
        if (this.state.user) {
            renderValue = <div>
                <h2>{this.state.user.username}</h2>
                <div className='container'>
                    <form id="userForm" onSubmit={this.addUserSubmit}>
                        <div className="form-group">
                            <label htmlFor="addFirstName">First Name:</label>
                            <input type="text" className="form-control" id="addFirstName" placeholder="Enter First Name"
                                   onChange={this.addFirstNameChange}/>
                            <label htmlFor="addLastName">Last Name:</label>
                            <input type="text" className="form-control" id="addLastName" placeholder="Enter Last Name"
                                   onChange={this.addLastNameChange}/>
                            <button  className="btn btn-default" type="submit" id="addUser">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        } else {
            renderValue = <Spinner />
        }
        return renderValue
    }
}

export default EditUser