import {LoginStates} from "./actions"
import history from './history'

const API_HOST = process.env.REACT_APP_API_HOST

async function makeApiCall(method, url, body) {
    if (!body) {
        body = null
    } else {
        body = JSON.stringify(body)
    }
    // const cookies = new Cookies()
    // const token = cookies.get('access_token')
    const token = localStorage.getItem("access_token")
    const result = await fetch(`${API_HOST}${url}`, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    let resultText = JSON.parse(await result.text())
    if (resultText.message === "Auth token is expired" || resultText.message === "Auth token is not valid" || resultText.message === "Token is not valid") {
        localStorage.removeItem("access_token")
        localStorage.setItem("isLoggedIn", LoginStates.LOGGED_OUT)
        history.push('/login')
    }
    return resultText
}

export default makeApiCall