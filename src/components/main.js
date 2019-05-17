import React from 'react'
import API_HOST from '../index'
import {Cookies} from 'react-cookie'


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
        console.log(`http://${API_HOST}url`)
        const result = await fetch(`http://${API_HOST}${url}`, {
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
        const result = await this.sendCall('GET', `/entries`)
        this.entriesResult = result.result
    }

    async getAllUsers() {
        const result = await this.sendCall('GET', `/users`)
        this.usersResult = result.result
    }

    renderUsersResult() {
        let retArray =[]
        if(this.usersResult) {
            this.usersResult.map((elem, index) => {
                retArray.push(<li key={index}>{elem.username}</li>)
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
        const result = await this.sendCall('POST', `/users`, {
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
        const result = await this.sendCall('POST', `/entries`, body)
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
        const result = await this.sendCall('DELETE', `/users/${this.deleteUsername}`)
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
        const result = await this.sendCall('DELETE', `/entries`)
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
                <h1>Main Page</h1>
            <div className="container">
            <table className="table">
                <thead className="table-bordered">
                    <tr>
                        <td>
                            <h2>
                                Users
                            </h2>
                        </td>
                        <td>
                            <h2>
                                Entries
                            </h2>
                        </td>
                    </tr>
                </thead>
                <tbody className="table-bordered">
                <tr>
                    <td>
                        <form id="userForm" onSubmit={this.addUserSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="addUsername" placeholder="Enter Username" onChange={this.addUserChange}/>
                                <input type="text" className="form-control" id="addPassword" placeholder="Enter Password" onChange={this.addPasswordChange}/>
                                <button className="btn btn-default" type="submit" id="addUser">Add</button>
                            </div>
                        </form>
                    </td>
                    <td>
                        <form id="entryForm" onSubmit={this.addEntrySubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="entryBody" placeholder="Enter Json" onChange={this.addEntryChange}/>
                                <button className="btn btn-default" type="submit" id="addEntity">Add</button>
                            </div>
                        </form>

                    </td>
                </tr>
                <tr>
                    <td>
                        <form id="userDeleteForm" onSubmit={this.deleteUserSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="usernameForDelete" placeholder="Enter Username" onChange={this.deleteUsersChange}/>
                                <button className="btn btn-default" type="submit" id="deleteUserButton">Delete</button>
                            </div>
                        </form>
                    </td>
                    <td>
                        <button type="button" className="btn btn-default" id="deleteEntity" onClick={this.deleteEntriesSubmit}>Delete All</button>
                    </td>
                </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                {this.renderUsersResult()}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {this.renderEntriesResult()}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>
        )
    }
}

export default Main