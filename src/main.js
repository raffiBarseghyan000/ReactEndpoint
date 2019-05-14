import React from 'react'
import API_HOST from './App'
import {Cookies} from 'react-cookie';

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.addUsername = ''
        this.addPassword = ''
        this.deleteUsername = ''
        this.addEntry = ''
        this.usersResult = []
        this.entriesResult = []
        this.getAllEntries = this.getAllEntries.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.addUserChange = this.addUserChange.bind(this)
        this.addPasswordChange = this.addPasswordChange.bind(this)
        this.addEntryChange = this.addEntryChange.bind(this)
        this.deleteUsersChange = this.deleteUsersChange.bind(this)
        this.addUserSubmit = this.addUserSubmit.bind(this)
        this.addEntrySubmit = this.addEntrySubmit.bind(this)
        this.deleteUserSubmit = this.deleteUserSubmit.bind(this)
        this.deleteEntriesSubmit = this.deleteEntriesSubmit.bind(this)
    }

    async sendCall(method, url, body) {
        if(!body) {
            body = null
        }
        else {
            body = JSON.stringify(body)
        }
        const cookies = new Cookies()
        const token = cookies.get('access_token')
        const result = await fetch(url, {
            method: method,
            body: body,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        let resultText =  await result.text()
        return JSON.parse(resultText)
    }

    async getAllEntries() {
        const result = await this.sendCall('GET', `http://${API_HOST}/entries`)
        this.entriesResult = result.result
    }

    async getAllUsers() {
        const result = await this.sendCall('GET', `http://${API_HOST}/users`)
        this.usersResult = result.result
    }

    renderUsersResult() {
        let retArray =[]
        if(this.usersResult) {
            this.usersResult.map((elem, index) => {
                retArray.push(<li key={index}>{JSON.stringify(elem)}</li>)
            })
        }
        return retArray
    }

    renderEntriesResult() {
        let retArray =[]
        if(this.entriesResult) {
            this.entriesResult.map((elem, index) => {
                retArray.push(<li key={index}>{JSON.stringify(elem)}</li>)
            })
        }
        return retArray
    }

    addUserChange(event) {
        this.addUsername = event.target.value
    }

    addPasswordChange(event) {
        this.addPassword = event.target.value
    }

    addEntryChange(event) {
        this.addEntry = event.target.value
    }

    deleteUsersChange(event) {
        this.deleteUsername = event.target.value
    }

    async addUserSubmit(event) {
        event.preventDefault()
        const result = await this.sendCall('POST', `http://${API_HOST}/users`, {
            username: this.addUsername,
            password: this.addPassword
        })
        if (result.success === false) {
            alert(result.message)
        }
        else {
            await this.getAllUsers()
            this.forceUpdate()
        }
    }

    async addEntrySubmit(event) {
        event.preventDefault()
        let body
        try {
            body = JSON.parse(this.addEntry)
        }
        catch(e) {
            alert("Invalid JSON object")
            return
        }
        const result = await this.sendCall('POST', `http://${API_HOST}/entries`, body)
        if (result.success === false) {
            alert(result.message)
        }
        else {
            await this.getAllEntries()
            this.forceUpdate()
        }
    }

    async deleteUserSubmit(event) {
        event.preventDefault()
        const result = await this.sendCall('DELETE', `http://${API_HOST}/users/${this.deleteUsername}`)
        if (result.success === false) {
            alert(result.message)
        }
        else {
            await this.getAllUsers()
            this.forceUpdate()
        }
    }

    async deleteEntriesSubmit(event) {
        event.preventDefault()
        const result = await this.sendCall('DELETE', `http://${API_HOST}/entries`)
        if (result.success === false) {
            alert(result.message)
        }
        else {
            await this.getAllEntries()
            this.forceUpdate()
        }
    }

    componentDidMount() {
        this.getAllEntries().finally(()=> {
            this.getAllUsers().finally(()=> {
                this.forceUpdate()
            })
        })
    }

    render() {
        return (
            <div>
            <table>
                <thead>
                    <tr>
                        <td>Users</td>
                        <td>Entries</td>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th>
                        <form id="userForm" onSubmit={this.addUserSubmit}>
                            <input type="text" className="form-control" id="username" placeholder="Enter Username" onChange={this.addUserChange}/>
                            <input type="text" className="form-control" id="userPassword" placeholder="Enter Password" onChange={this.addPasswordChange}/>
                            <button type="submit" id="addUser">Add</button>
                        </form>
                    </th>
                    <th>
                        <form id="entryForm" onSubmit={this.addEntrySubmit}>
                            <input type="text" className="form-control" id="entryBody" placeholder="Enter Json" onChange={this.addEntryChange}/>
                            <button type="submit" id="addEntity">Add</button>
                        </form>

                    </th>
                </tr>
                <tr>
                    <th>
                        <form id="userDeleteForm" onSubmit={this.deleteUserSubmit}>
                            <input type="text" className="form-control" id="usernameForDelete" placeholder="Enter Username" onChange={this.deleteUsersChange}/>
                            <button type="submit" id="deleteUserButton">Delete</button>
                        </form>
                    </th>
                    <th>
                        <button type="button" id="deleteEntity" onClick={this.deleteEntriesSubmit}>Delete All</button>
                    </th>
                </tr>
                </tbody>
            </table>
                <ul>
                    {this.renderUsersResult()}
                </ul>
                <ul>
                    {this.renderEntriesResult()}
                </ul>
            </div>
        )
    }
}

export default Main