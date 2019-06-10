import React from 'react'
import history from '../history'
import Swal from "sweetalert2";
import Spinner from "./spinner";

class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.addEntrySubmit = this.addEntrySubmit.bind(this)
        this.addValueChange = this.addValueChange.bind(this)
        this.state = {
            value: '',
            showPopUp: false
        }
    }

    componentDidMount() {
        this.props.verifyEntry(this.props.match.params.entry)
    }

    addValueChange(event) {
        this.setState({value: event.target.value})
    }

    addEntrySubmit(event) {
        event.preventDefault()
        this.props.editEntry(this.props.match.params.entry, this.state.value)
        this.setState({showPopUp: true})
    }

    renderPopUp() {
        Swal.fire({
            title: 'Success',
            text: this.props.editEntryResponse.edited,
            type: 'success'
        }).then(()=> {
            this.setState({showPopUp: false})
            history.push('/main/entries')
        })
    }

    render() {
        let renderValue
        this.state.showPopUp && this.renderPopUp()
        if (this.props.editEntryResponse.verified) {
            renderValue = <div>
                <h2>{this.props.match.params.entry}</h2>
                <div className='container'>
                    <form id="userForm" onSubmit={this.addEntrySubmit}>
                        <div className="form-group">
                            <label htmlFor="addValue">Value:</label>
                            <input type="text" className="form-control" id="addValue" placeholder={this.props.editEntryResponse.value}
                                   onChange={this.addValueChange}/>
                            <button  className="btn btn-default" type="submit" id="addUser">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        } else {
            renderValue = <Spinner />
        }
        return renderValue
    }
}

export default EditUser