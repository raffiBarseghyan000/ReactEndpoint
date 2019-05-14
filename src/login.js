import React from 'react'
import './App.css'
import {BrowserRouter, Route, Redirect, Link, Switch} from 'react-router-dom'
import {Cookies} from 'react-cookie';
import Main from './main.js'
import API_HOST from './App'

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
            <BrowserRouter>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.handleUserChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePassChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            </BrowserRouter>
        )
    }
}

export default Login