import React from 'react'
import {Cookies} from 'react-cookie'
import API_HOST from '../index'
import {LoginStates} from "../actions"
import {Redirect} from 'react-router-dom'
import history from '../history'
import 'bootstrap/dist/css/bootstrap.min.css'
import makeApiCall from "../apiCall";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // async loginCall(username, password) {
    //     const result = await fetch(`http://${API_HOST}/login`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             "username": username,
    //             "password": password
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const resultMessage = await result.text()
    //     return resultMessage
    // }

    handleUserChange(event) {
        this.setState({username: event.target.value})
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        return makeApiCall('POST', '/login', {
            username: this.state.username,
            password: this.state.password
        }).then((result) => {
            if (result.success === false) {
                alert(result.message)
            } else {
                // const cookies = new Cookies()
                // cookies.set('access_token', JSON.parse(result).token)
                localStorage.setItem("access_token", result.token)
                localStorage.setItem("isLoggedIn", LoginStates.LOGGED_IN)
                history.push('/main')
            }
        }).catch((e) => {
            alert(e)
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Login Page</h1>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-lg-3">
                            <label htmlFor="usernameLogin">Username:</label>
                            <input className="form-control" type="text" id="usernameLogin" value={this.state.username}
                                   onChange={this.handleUserChange}/>
                        </div>
                        <div class="form-group col-lg-3">
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