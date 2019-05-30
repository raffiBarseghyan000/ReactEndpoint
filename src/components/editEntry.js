import React from 'react'
import makeApiCall from '../apiCall'
import history from '../history'
import Swal from "sweetalert2";

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.addEntrySubmit = this.addEntrySubmit.bind(this)
        this.addValueChange = this.addValueChange.bind(this)
        this.value = ''
        this.state = {
            entry: null
        }
    }

    componentDidMount() {
        makeApiCall('GET', `/entries/${this.props.match.params.entry}`).then((response) => {
            let entry
            if (response.success) {
                entry = response.result
            } else {
                entry = null
            }
            this.setState({entry: entry})
        })
    }

    addValueChange(event) {
        this.value = event.target.value
    }

    async addEntrySubmit(event) {
        event.preventDefault()
        const result = await makeApiCall('PUT', `/entries/${this.state.entry.name}`, {
            value: this.value
        })
        await Swal.fire(
            result.message
        )
        if (result.success) {
            history.push('/main/entries')
        }
    }

    render() {
        let renderValue
        if (this.state.entry) {
            renderValue = <div>
                <h2>{this.state.entry.name}</h2>
                <div className='container'>
                    <form id="userForm" onSubmit={this.addEntrySubmit}>
                        <div className="form-group">
                            <label htmlFor="addValue">Value:</label>
                            <input type="text" className="form-control" id="addValue" placeholder="Enter Password"
                                   onChange={this.addValueChange}/>
                            <button role='button' className="btn btn-default" type="submit" id="addUser">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        } else {
            renderValue = <h2>Entry not found</h2>
        }
        return renderValue
    }
}

export default EditUser