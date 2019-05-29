import {LoginStates} from "./actions"
import history from './history'
import Swal from "sweetalert2";

const API_HOST = process.env.REACT_APP_API_HOST

async function makeApiCall(method, url, body) {
    if (!body) {
        body = null
    } else {
        body = JSON.stringify(body)
    }
    const token = localStorage.getItem("access_token")
    try {
        const result = await fetch(`${API_HOST}${url}`, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const resultText = JSON.parse(await result.text())
        if (resultText.message === "Auth token is expired" || resultText.message === "Auth token is not valid" || resultText.message === "Token is not valid") {
            localStorage.removeItem("access_token")
            localStorage.setItem("isLoggedIn", LoginStates.LOGGED_OUT)
            history.push('/login')
        }
        return resultText
    }
    catch (err) {
        Swal.fire(
            'Error',
            err.message,
            'error'
        )
    }

}

export default makeApiCall