import React from 'react'
import {Cookies} from 'react-cookie';
import API_HOST from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitted: false
        }
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async loginCall(username, password) {
    const result = await fetch(`http://${API_HOST}/login`, {
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const resultMessage = await result.text()
    return resultMessage
}

handleUserChange(event) {
    this.setState({username: event.target.value})
}

handlePassChange(event) {
    this.setState({password: event.target.value})
}

handleSubmit(event) {
    event.preventDefault()
    return this.loginCall(this.state.username, this.state.password).then((result)=> {
        if (JSON.parse(result).success === false) {
            alert(JSON.parse(result).message)
        }
        else {
            const cookies = new Cookies();
            cookies.set('access_token', JSON.parse(result).token)
            this.props.renderMain()
        }
    }).catch((e)=> {
        alert(e)
    })
}

    render() {
        return (
            <div>
                <h1>Login Page</h1>
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="usernameLogin">Username:</label>
                    <input className="form-control" type="text" id="usernameLogin" value={this.state.username} onChange={this.handleUserChange}/>
                </div>
                <div class="form-group">
                    <label htmlFor="passwordLogin">Password:</label>
                    <input className="form-control" type="password" id="passwordLogin" value={this.state.password} onChange={this.handlePassChange}/>
                </div>
                <input className="btn btn-primary" type="submit" value="Submit"/>
            </form>
            </div>
            </div>
        )
    }
}

export default Login