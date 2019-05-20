import React from 'react'
import ReactPaginate from 'react-paginate'
import makeApiCall from '../apiCall'

class UserList extends React.Component {

    renderUserList() {
        let retArray = []
        if (this.props.userList) {
            this.userList.map((elem) => {
                retArray.push(<li key={elem.username}>{elem}</li>)
            })
        }
        return retArray
    }

    async refreshUserList(offset, limit) {
        const response = await makeApiCall('GET', '/users', {offset, limit})
        if(response.success === false) {
            console.log(response.message)
        }
        else {
            const users = response.result
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.renderUserList()}
            </div>
        )
    }

}

export default UserList