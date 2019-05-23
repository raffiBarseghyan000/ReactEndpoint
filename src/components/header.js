import React from 'react'
import {LoginStates} from "../actions"
import makeApiCall from "../apiCall"
import history from '../history'

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    async handleClick(event) {
        try {
            event.preventDefault()
            await makeApiCall('POST', '/logout')
            localStorage.removeItem("access_token")
            localStorage.setItem("isLoggedIn", LoginStates.LOGGED_OUT)
            history.push('/login')
        } catch (err) {
            alert(err)
        }
    }

    render() {
        return (
            <div className="navbar bg-primary">
                <span>
                    <button className="float-sm-right col-lg-1" onClick={this.handleClick}>
                        Logout
                    </button>
                </span>
            </div>
        )

    }

}

export default Header