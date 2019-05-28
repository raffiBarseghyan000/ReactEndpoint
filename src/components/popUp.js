import React from "react"
import Popup from "reactjs-popup"
import makeApiCall from "../apiCall"
import history from '../history'
import EntryList from "./entryList"

async function onClickRedirectUser(username) {
    await makeApiCall('DELETE', `/users/${username}`)
    history.push('/users')
}

export const deleteConfirmationUser = (username) => (
    <Popup
        trigger={() => (
            <button className="btn btn-block">Delete</button>
        )}
        position="top center"
        closeOnDocumentClick
    >
        <span>
            <span>Are you sure? </span>
            <button onClick={()=> onClickRedirectUser(username)}>

                Yes
            </button>
        </span>
    </Popup>
)

async function onClickRedirectEntry() {
    await makeApiCall('DELETE', `/entries`)
}

export const deleteConfirmationEntry = () => (
    <Popup
        trigger={() => (
            <button className="btn btn-secondary float-sm-right col-lg-2">Delete All</button>
        )}
        position="top center"
        closeOnDocumentClick
    >
        <span>
            <span>Are you sure? </span>
            <button onClick={()=> onClickRedirectEntry()}>
                Yes
            </button>
        </span>
    </Popup>
)
