import React from 'react'
import { connect } from 'react-redux'
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Login from './login'
import Main from './main'

require('dotenv').config({path: './env/.env'});

class App extends React.Component {

    constructor({isLoggedIn}) {
        super({isLoggedIn});
    }

    isLoggedIn() {
        return this.props.isLoggedIn
    }

    render() {
        return (
        <BrowserRouter>
            <Switch>
                {console.log(this.props.isLoggedIn)}
                <Route path='/login' component={Login} />
                <Route render={() => (
                    this.isLoggedIn()
                        ? <Main />
                        : <Redirect to='/login' />
                    )
                } />
            </Switch>
        </BrowserRouter>
        )
    }

}

const mapStateToProps = (state)=> ({
    isLoggedIn: state.clientStatus
})

export default connect(mapStateToProps)(App)
