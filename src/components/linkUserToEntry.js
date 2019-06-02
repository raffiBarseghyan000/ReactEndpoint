import React from 'react'
import makeApiCall from '../apiCall'
import Spinner from "./spinner"
import history from '../history'

class LinkUserToEntry extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        makeApiCall('GET', `/attachedEntry/allUsers/${this.props.match.params.entry}`).then((response) => {
            this.setState({users: response.value})
        })
    }

    async toggleCheckbox(user, attached) {
        if(attached) {
            await makeApiCall('DELETE', `/attachedEntry/${user}`, {entry: this.props.match.params.entry})
        }
        else {
            await makeApiCall('POST', `/attachedEntry/${user}`, {entry: this.props.match.params.entry})
        }
        makeApiCall('GET', `/attachedEntry/allUsers/${this.props.match.params.entry}`).then((response) => {
            this.setState({users: response.value})
        })
    }

    renderUsers() {
        const userArr = []
        this.state.users.map((user) => {
                if (user.attached) {
                    userArr.push(<li key={user.user}>
                        <input id={`alertId-${user.user}`} type="checkbox"
                               value={user.user} onClick={()=> (this.toggleCheckbox(user.user, user.attached))} checked/> {user.user} <br/>
                    </li>)
                } else {
                    userArr.push(<li key={user.user}>
                        <input id={`alertId-${user.user}`} type="checkbox"
                               value={user.user} onClick={()=> (this.toggleCheckbox(user.user, user.attached))} /> {user.user} <br/>
                    </li>)
                }
            }
        )
        return (<ul>{userArr}
            <button role='button' onClick={()=> {history.push('/main/entries?page=1')}}> back </button>
        </ul>)
    }

    render() {

        return (<div>
                {this.state.users.length === 0 ? <Spinner /> : this.renderUsers()}
        </div>)
    }

}

export default LinkUserToEntry