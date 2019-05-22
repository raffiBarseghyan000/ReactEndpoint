import React from 'react'

class Entries extends React.Component {
    constructor(props) {
        super(props)
        this.addEntry = ''
    }

    renderEntriesResult() {
        let retArray = []
        if (this.entriesResult) {
            this.entriesResult.map((elem, index) => {
                retArray.push(<li key={index}>{JSON.stringify(elem)}</li>)
            })
        }
        return retArray
    }

    addEntryChange(event) {
        this.addEntry = event.target.value
    }

    async addEntrySubmit(event) {
        event.preventDefault()
        let body
        try {
            body = JSON.parse(this.addEntry)
        } catch (e) {
            alert("Invalid JSON object")
            return
        }
        const result = await this.sendCall('POST', `/entries`, body)
        if (result.success === false) {
            alert(result.message)
        } else {
            await this.getAllEntries()
            this.forceUpdate()
        }
    }

    async deleteEntriesSubmit(event) {
        event.preventDefault()
        const result = await this.sendCall('DELETE', `/entries`)
        if (result.success === false) {
            alert(result.message)
        } else {
            await this.getAllEntries()
            this.forceUpdate()
        }
    }

    render() {
        return (
            <div>
                <h2>Entries</h2>
                <form id="entryForm" onSubmit={()=> this.addEntrySubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="entryBody" placeholder="Enter Json" onChange={()=> this.addEntryChange}/>
                        <button className="btn btn-default" type="submit" id="addEntity">Add</button>
                    </div>
                </form>
                <button type="button" className="btn btn-default" id="deleteEntity" onClick={()=> this.deleteEntriesSubmit}>Delete All</button>
            </div>

        )
    }

}

export default Entries