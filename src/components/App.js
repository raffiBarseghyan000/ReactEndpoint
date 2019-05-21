import React from 'react'
import {Router, Switch, Route, Redirect} from "react-router-dom"
import Login from '../containers/login'
import Main from './main'
import {LoginStates} from "../actions"
import history from '../history'

class App extends React.Component {

    isLoggedIn() {
        return localStorage.hasOwnProperty("isLoggedIn") && localStorage.getItem("isLoggedIn") === LoginStates.LOGGED_IN
    }

    render() {
        let handleUsers
        if(this.isLoggedIn()) {
            handleUsers = <Switch>
                <Route path='/main' component={Main}/>
                <Redirect to="/main" />
            </Switch>
        }
        else {
            handleUsers = <Switch>
                <Redirect to="/login"/>
            </Switch>
        }

        return (
        <Router history={history}>
            <Switch>
                <Route path='/login' component={Login} />
                {handleUsers}
            </Switch>
        </Router>
        )
    }

}

export default App