import React from 'react'
import history from "../history"
import Swal from "sweetalert2";

class Entries extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addEntryName: '',
            addEntryValue: '',
            showPopUp: false
        }

        this.addEntrySubmit = this.addEntrySubmit.bind(this)
        this.addEntryNameChange = this.addEntryNameChange.bind(this)
        this.addEntryValueChange = this.addEntryValueChange.bind(this)
    }

    addEntryNameChange(event) {
        this.setState({addEntryName: event.target.value})
    }

    addEntryValueChange(event) {
        this.setState({addEntryValue: event.target.value})
    }

    addEntrySubmit(event) {
        event.preventDefault()
        this.props.addEntry(this.state.addEntryName, this.state.addEntryValue)
        this.setState({showPopUp: true})
    }

    renderPopUp() {
        if(this.props.addEntryResponse.success){
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
        this.setState({showPopUp: false})
    }

    render() {
        return (
            <div>
                <h2>Entries</h2>
                {this.props.addEntryResponse.show && this.state.showPopUp && this.renderPopUp()}
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