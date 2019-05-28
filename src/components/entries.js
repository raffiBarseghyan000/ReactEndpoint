import React from 'react'
import makeApiCall from "../apiCall"
import history from "../history"

class Entries extends React.Component {
    constructor(props) {
        super(props)
        this.addEntry = ''

        this.addEntrySubmit = this.addEntrySubmit.bind(this)
        this.addEntryChange = this.addEntryChange.bind(this)
    }

    addEntryChange(event) {
        this.addEntry = event.target.value
    }

    async addEntrySubmit(event) {
        event.preventDefault()
        let value
        try {
            value = JSON.parse(this.addEntry)
        }
        catch {
            alert("invalid JSON object")
            return
        }
        const result = await makeApiCall('POST', `/entries`, value)
        alert(result.message)
        if(result.success){
            history.push('/main/entries')
        }
    }

    render() {
        return (
            <div>
                <h2>Entries</h2>
                <form id="entryForm" onSubmit={this.addEntrySubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="entryBody" placeholder="Enter Json" onChange={this.addEntryChange}/>
                        <button className="btn btn-default" type="submit" id="addEntity">Add</button>
                    </div>
                </form>
            </div>

        )
    }

}

export default Entries