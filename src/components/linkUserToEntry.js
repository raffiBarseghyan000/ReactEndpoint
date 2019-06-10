import React from 'react'
import Spinner from "./spinner"
import history from '../history'

class LinkUserToEntry extends React.Component {

    componentDidMount() {
        this.props.getAllUsers(this.props.match.params.entry)
    }

    async toggleCheckbox(user, attached) {

        if(attached) {
            this.props.uncheckEntry(user, this.props.match.params.entry)
        }
        else {
            this.props.checkEntry(user, this.props.match.params.entry)
        }

    }

    renderUsers() {
        const userArr = []
        this.props.users.users.map((user) => {
            return userArr.push(<li key={user.user}>
                <input id={`alertId-${user.user}`} type="checkbox"
                       value={user.user} onClick={()=> (this.toggleCheckbox(user.user, user.attached))} defaultChecked={user.attached} /> {user.user} <br/>
            </li>)
            }
        )
        return (<ul>{userArr}
            <button  onClick={()=> {history.push('/main/entries?page=1')}}> back </button>
        </ul>)
    }

    render() {

        return (<div>
            <h3>{this.props.match.params.entry}</h3>
                {this.props.users.users === 0 ? <Spinner /> : this.props.users.pending && this.renderUsers()}
        </div>)
    }

}

export default LinkUserToEntry