import React from 'react'
import makeApiCall from '../apiCall'
import history from '../history'

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.addUserSubmit = this.addUserSubmit.bind(this)
        this.addFirstNameChange = this.addFirstNameChange.bind(this)
        this.addLastNameChange = this.addLastNameChange.bind(this)
        this.addPasswordChange = this.addPasswordChange.bind(this)


        this.state = {
            user: null,
            addPassword: '',
            addFirstName: '',
            addLastName: ''
        }
    }

    componentDidMount() {
        const pathnameArray = this.props.location.pathname.split('/')
        makeApiCall('GET', `/users/${pathnameArray[4]}`).then((response) => {
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
        this.state.addPassword = event.target.value
    }

    addFirstNameChange(event) {
        this.state.addFirstName = event.target.value
    }

    addLastNameChange(event) {
        this.state.addLastName = event.target.value
    }

    async addUserSubmit(event) {
        event.preventDefault()
        const result = await makeApiCall('PUT', `/users/${this.state.user.username}`, {
            password: this.state.addPassword,
            firstName: this.state.addFirstName,
            lastName: this.state.addLastName
        })
        alert(result.message)
        if (result.success) {
            let a = `${this.props.match.url}/${this.state.user.username}`
            let b = this.props.location.pathname
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
                            <label htmlFor="addPassword">Password:</label>
                            <input type="text" className="form-control" id="addPassword" placeholder="Enter Password"
                                   onChange={this.addPasswordChange}/>
                            <button className="btn btn-default" type="submit" id="addUser">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        } else {
            renderValue = <h2>User not found</h2>
        }
        return renderValue
    }
}

export default EditUser