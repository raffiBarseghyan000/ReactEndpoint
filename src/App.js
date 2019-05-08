import React from 'react'
import './App.css'
import {BrowserRouter, Route, Redirect, Link, Switch} from 'react-router-dom'
import Main from './main.js'

class App extends React.Component {

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
        const result = await fetch("http://localhost:9999/login", {
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
            // if (JSON.parse(result).success === false) {
            //     alert(JSON.parse(result).message)
            // }
            // else {
            this.setState({submitted: true})
            // this.setState({submitted: result})
            // }
        }).catch((e)=> {

            alert(e)
        })
    }

    render() {
        if(this.state.submitted) {
            return (
                <BrowserRouter>
                    <Redirect push to="/main" />
                </BrowserRouter>
                )
        }
        else {
            return (
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
            );
        }
    }
}

export default App;

