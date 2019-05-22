import React from 'react'
import {SelectTabStates} from "../actions";

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
        this.props.changeSelectedTab(componentToDisplay)
    }



    render() {
        let renderElem
        if (this.state.expanded) {
            renderElem = <div>
                <ul>
                    <li>
                        <button onClick={this.handleTabChangeForUser}>Users</button>
                    </li>
                    <li>
                        <button onClick={this.handleTabChangeForEntries}>Entries</button>
                    </li>
                </ul>
            </div>
        } else {
            renderElem = null
        }

        return (
            <div>
                <button onClick={this.handleExpand}>...</button>
                {renderElem}
            </div>
        )
    }
}

export default SideBar