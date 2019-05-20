import React from 'react'
import {Router, Switch, Route, Redirect} from "react-router-dom"
import Login from '../containers/login'
import Main from './main'
import {LoginStates} from "../actions"
import history from '../history'
import NotFound from './notFound'

class App extends React.Component {

    isLoggedIn() {
        return this.props.isLoggedIn === LoginStates.LOGGED_IN
    }

    render() {
        const redirectComponent = this.isLoggedIn() ? '/main' : '/login'
        return (
        <Router history={history}>
            <Switch>
                {console.log(this.props.isLoggedIn)}
                <Route path='/login' component={Login} />
                <Route path='/main' component={Main} />
                <Redirect to={redirectComponent} />
            </Switch>
        </Router>
        )
    }

}

export default App