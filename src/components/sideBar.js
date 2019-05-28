import React from 'react'
import {SelectTabStates} from "../actions"
import history from "../history"

class SideBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            expanded: true
        }
        this.handleExpand = this.handleExpand.bind(this)
        this.handleTabChangeForUser = this.handleTabChangeForUser.bind(this)
        this.handleTabChangeForEntries = this.handleTabChangeForEntries.bind(this)
    }

    handleExpand() {
        this.setState((oldState)=> ({expanded: !oldState.expanded}))
    }

    handleTabChangeForUser() {
        this.handleTabChange(SelectTabStates.USERS)
    }

    handleTabChangeForEntries() {
        this.handleTabChange(SelectTabStates.ENTRIES)
    }

    handleTabChange(componentToDisplay) {
        history.push(`${this.props.parentPath}/${componentToDisplay}`)
    }

    render() {
        let renderElem
        if (this.state.expanded) {
            renderElem = <div>
                <ul className="list-inline p-2">
                    <li className="list-inline-item btn-secondary">
                        <button className="" onClick={this.handleTabChangeForUser}>Users</button>
                    </li>
                    <li className="list-inline-item btn-secondary">
                        <button className="" onClick={this.handleTabChangeForEntries}>Entries</button>
                    </li>
                </ul>
            </div>
        } else {
            renderElem = null
        }

        return (
            <div className="d-flex flex-row">
                <button className="p-3 " onClick={this.handleExpand}>...</button>
                {renderElem}
            </div>
        )
    }
}

export default SideBar