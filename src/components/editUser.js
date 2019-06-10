import React from 'react'
import history from '../history'
import Swal from "sweetalert2";
import Spinner from "./spinner";

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.addUserSubmit = this.addUserSubmit.bind(this)
        this.addFirstNameChange = this.addFirstNameChange.bind(this)
        this.addLastNameChange = this.addLastNameChange.bind(this)
        this.state = {
            firstName: '',
            lastName: '',
            showPopUp: false
        }
    }

    componentDidMount() {
        this.props.verifyUser(this.props.match.params.username)
    }

    addFirstNameChange(event) {
        this.addFirstName = event.target.value
    }

    addLastNameChange(event) {
        this.addLastName = event.target.value
    }

    addUserSubmit(event) {
        event.preventDefault()
        this.props.editUser(this.props.match.params.username, this.state.firstName, this.state.lastName)
        this.setState({showPopUp: true})
    }

    renderPopUp() {
        Swal.fire({
            title: 'Success',
            message: this.props.editUserResponse.edited,
            type: 'success'
        }).then(()=> {
            history.push('/main/users')
            this.setState({showPopUp: false})
        })
    }

    render() {
        let renderValue
        {this.state.showPopUp && this.renderPopUp()}
        if (this.props.editUserResponse.verified) {
            renderValue = <div>
                <h2>{this.props.match.params.username}</h2>
                <div className='container'>
                    <form id="userForm" onSubmit={this.addUserSubmit}>
                        <div className="form-group">
                            <label htmlFor="addFirstName">First Name:</label>
                            <input type="text" className="form-control" id="addFirstName" placeholder="Enter First Name"
                                   onChange={this.addFirstNameChange}/>
                            <label htmlFor="addLastName">Last Name:</label>
                            <input type="text" className="form-control" id="addLastName" placeholder="Enter Last Name"
                                   onChange={this.addLastNameChange}/>
                            <button  className="btn btn-default" type="submit" id="addUser">Edit</button>
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