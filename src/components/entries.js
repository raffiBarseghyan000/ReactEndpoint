import React from 'react'
import makeApiCall from "../apiCall"
import history from "../history"
import Swal from "sweetalert2";

class Entries extends React.Component {
    constructor(props) {
        super(props)
        this.addEntryName = ''
        this.addEntryValue = ''

        this.addEntrySubmit = this.addEntrySubmit.bind(this)
        this.addEntryNameChange = this.addEntryNameChange.bind(this)
        this.addEntryValueChange = this.addEntryValueChange.bind(this)
    }

    addEntryNameChange(event) {
        this.addEntryName = event.target.value
    }

    addEntryValueChange(event) {
        this.addEntryValue = event.target.value
    }

    async addEntrySubmit(event) {
        event.preventDefault()
        const result = await makeApiCall('POST', `/entries`, {name: this.addEntryName, value: this.addEntryValue})
        if(result.success){
            Swal.fire(
                'Success',
                'Entry added',
                'success'
            ).then(()=> {
                history.push('/main/entries')
            })
        }
        else {
            Swal.fire(
                'Error',
                'Can not add entry',
                'error'
            )
        }
    }

    render() {
        return (
            <div>
                <h2>Entries</h2>
                <form id="entryForm" onSubmit={this.addEntrySubmit}>
                    <div className="form-group">
                        <label htmlFor="entryName">Name:</label>
                        <input type="text" className="form-control" id="entryName" placeholder="Enter name" onChange={this.addEntryNameChange}/>
                        <label htmlFor="entryValue">Value:</label>
                        <input type="text" className="form-control" id="entryValue" placeholder="Enter value" onChange={this.addEntryValueChange}/>
                        <button  className="btn btn-default" type="submit" id="addEntity">Add</button>
                    </div>
                </form>
            </div>

        )
    }

}

export default Entries