import React from 'react'
import Header from "./header"
import UserList from "../containers/userList"
import Footer from "./footer"
import Sidebar from './sideBar'
import Entry from './entries'
import {Route, Switch} from "react-router-dom"
import User from './users'
import EditUser from './editUser'
import EntryList from '../containers/entriesList'
import NotFound from "./notFound"
import {Redirect} from "react-router-dom"

class Main extends React.Component {

    render() {
        return (
            <div className="container">
                <Header />
                <Sidebar parentPath={this.props.match.url} />
                    <Switch>
                        <Route exact path={`${this.props.match.url}/users/`} render={(props)=> <UserList {...props} showPerPage='3' parentPath={`${this.props.match.url}/users`}/>}/>
                        <Route exact path={`${this.props.match.url}/entries/`} render={(props)=> <EntryList {...props} showPerPage='3' parentPath={`${this.props.match.url}/entries`}/>} />
                        <Route path={`${this.props.match.url}/users/addNew`} render={()=> <User parentPath={`${this.props.match.url}/users`}/>} />
                        <Route path={`${this.props.match.url}/entries/addNew`} render={()=> <Entry parentPath={`${this.props.match.url}/entries`}/>} />
                        <Route path={`${this.props.match.url}/users/edit/:username`} component={EditUser} />
                        <Redirect exact from={this.props.match.url} to={`${this.props.match.url}/users`}/>
                        <Route component={NotFound}/>
                    </Switch>
                <Footer/>
            </div>
        )
    }

}

export default Main
