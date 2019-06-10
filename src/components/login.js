import React from 'react'
import {LoginStates} from "../actions"
import history from '../history'
import 'bootstrap/dist/css/bootstrap.min.css'
import makeApiCall from "../apiCall"
import Swal from "sweetalert2";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginAttempt: false
        }
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUserChange(event) {
        this.setState({username: event.target.value})
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.login(this.state.username, this.state.password)
        this.setState({loginAttempt: true})
    }

    handleLogin() {
        debugger
        if (!this.props.loginStatus.success) {
            Swal.fire({
                title: 'Error',
                text: this.props.loginStatus.message,
                type: 'error'
            })
        } else {
            localStorage.setItem("access_token", this.props.loginStatus.token)
            localStorage.setItem("isLoggedIn", LoginStates.LOGGED_IN)
            history.push('/main')
        }
        this.setState({loginAttempt: false})
    }

    render() {
        return (
            <div className="container">
                {this.state.loginAttempt && this.handleLogin()}
                <h1>Login Page</h1>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-lg-3">
                            <label htmlFor="usernameLogin">Username:</label>
                            <input className="form-control" type="text" id="usernameLogin" value={this.state.username}
                                   onChange={this.handleUserChange}/>
                        </div>
                        <div className="form-group col-lg-3">
                            <label htmlFor="passwordLogin">Password:</label>
                            <input className="form-control" type="password" id="passwordLogin"
                                   value={this.state.password} onChange={this.handlePassChange}/>
                        </div>
                        <input className="btn btn-primary" type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login