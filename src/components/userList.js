import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'
import PropTypes from 'prop-types'
import {refreshUsersList} from "../actions";

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userCount: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    renderUserList() {
        let retArray = []
        if (this.props.userList) {
            this.props.userList.map((elem) => {
                retArray.push(<li key={elem.username}>{elem.username}</li>)
            })
        }
        return retArray
    }

    async refreshUserList(offset, limit) {
        const response = await makeApiCall('GET', `/users?offset=${offset}&limit=${limit}`)
        if(response.success === false) {
            console.log(response.message)
        }
        else {
            this.props.updateUserList(response.result.values)
            this.setState({userCount: response.result.count})
        }
    }

    componentDidMount() {
        this.refreshUserList(0, this.props.showPerPage).then(()=> {})
    }

    handlePageClick(data) {
        let selected = data.selected
        let offset = Math.ceil(selected * this.props.showPerPage)
        this.refreshUserList(offset, this.props.showPerPage)
    }

    render() {
        return (
            <div>
                {this.renderUserList()}
                <ReactPaginate
                    pageCount={Math.ceil(this.state.userCount / this.props.showPerPage)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={this.handlePageClick}
                />
            </div>
        )
    }

}

UserList.propTypes = {
    userList: PropTypes.array
}

export default UserList