import React from 'react'
import {LoginStates} from "../actions"
import makeApiCall from "../apiCall"
import history from '../history'
import Swal from "sweetalert2";

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
            Swal.fire(
                'Error',
                err.message,
                'error'
            )
        }
    }

    render() {
        return (
            <div className="navbar bg-primary">
                <span>
                    <button className="float-sm-right col-lg-1 btn btn-primary" onClick={this.handleClick}>
                        Logout
                    </button>
                </span>
            </div>
        )

    }

}

export default Header