import React from 'react'
import './App.css'
import {BrowserRouter, Route, Redirect, Link, Switch} from 'react-router-dom'
import Main from './main.js'
import Login from './login.js'
require('dotenv').config({path: './env/.env'});

const API_HOST = `localhost:9999`

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            submitted: false
        }
    }

    renderRedirect() {
        if(this.state.submitted) {
            // return <Login/>
            return <Redirect to='/login' />
        }
        else {
            // return <Main/>
            return <Redirect to='/main' />
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} comonent={Login} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/main"} component={Main} />
                </Switch>
            </BrowserRouter>
            );
    }
}

export default API_HOST

