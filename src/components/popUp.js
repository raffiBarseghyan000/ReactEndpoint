import React from "react"
import Popup from "reactjs-popup"
import makeApiCall from "../apiCall";

export const deleteConfirmation = (username) => (
    <Popup
        trigger={() => (
            <button className="button">Delete</button>
        )}
        position="top center"
        closeOnDocumentClick
    >
        <span>
            <span>Are you sure</span>
            <button onClick={()=> makeApiCall('DELETE', `/users/${username}`)}>
                Yes
            </button>
        </span>
    </Popup>
)
