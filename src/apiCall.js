import {Cookies} from "react-cookie";
import API_HOST from "./index";

async function makeApiCall(method, url, body) {
    if (!body) {
        body = null
    } else {
        body = JSON.stringify(body)
    }
    const cookies = new Cookies()
    const token = cookies.get('access_token')
    console.log(`http://${API_HOST}url`)
    const result = await fetch(`http://${API_HOST}${url}`, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    let resultText = await result.text()
    return JSON.parse(resultText)
}

export default makeApiCall