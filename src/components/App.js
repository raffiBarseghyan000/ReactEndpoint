import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import Login from '../containers/login'
import Main from './main'
import {LoginStates} from "../actions"
import NotFound from './notFound'

class App extends React.Component {

    isLoggedIn() {
        return this.props.isLoggedIn === LoginStates.LOGGED_IN
    }

    render() {
        return (
        <BrowserRouter>
            <Switch>
                {console.log(this.props.isLoggedIn)}
                <Route path='/login' component={Login} />
                <Route path='/main' component={Main} />
                {/*<Route render={() => (*/}
                    {/*this.isLoggedIn()*/}
                        {/*? <Redirect to='/main' />*/}
                        {/*: <Redirect to='/login' />*/}
                    {/*)*/}
                {/*} />*/}
            </Switch>
        </BrowserRouter>
        )
    }

}

export default App