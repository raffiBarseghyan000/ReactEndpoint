import React from 'react'
import Header from "../containers/header"
import UserList from "../containers/userList"
import Footer from "./footer"
import Entry from '../containers/entries'
import {Route, Switch} from "react-router-dom"
import User from '../containers/users'
import EditUser from '../containers/editUser'
import EntryList from '../containers/entriesList'
import NotFound from "./notFound"
import EditEntry from '../containers/editEntry'
import EntLinkUserToEntry from './linkUserToEntry'
import {Redirect} from "react-router-dom"
import Sidebar from "react-sidebar"
import history from '../history'

const mql = window.matchMedia(`(min-width: 800px)`)

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    render() {
        return (
            <Sidebar
                sidebar={<div><span>Locations</span><ul><li><button  className='btn btn-elegant' onClick={()=> {history.push('/main/users?page=1')}}>Users</button></li> <li><button  className='btn btn-elegant' onClick={()=> {history.push('/main/entries?page=1')}}>Entries</button></li></ul></div>}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
            >
            <div>
                <div className="container">
                    <Header/>
                    <Switch>
                        <Route exact path={`${this.props.match.url}/users/`}
                               render={(props) => <UserList {...props} showPerPage='3'/>}/>
                        <Route exact path={`${this.props.match.url}/entries/`}
                               render={(props) => <EntryList {...props} showPerPage='3'/>}/>
                        <Route path={`${this.props.match.url}/users/addNew`} component={User}/>} />
                        <Route path={`${this.props.match.url}/entries/addNew`} component={Entry}/>
                        <Route path={`${this.props.match.url}/entries/linkUser/:entry`} component={EntLinkUserToEntry}/>
                        <Route path={`${this.props.match.url}/users/edit/:username`} component={EditUser}/>
                        <Route path={`${this.props.match.url}/entries/edit/:entry`} component={EditEntry}/>
                        <Redirect exact from={this.props.match.url} to={`${this.props.match.url}/users`}/>
                        <Route component={NotFound}/>
                    </Switch>
                    <Footer/>
                </div>
            </div>
            </Sidebar>

        )
    }

}

export default Main
