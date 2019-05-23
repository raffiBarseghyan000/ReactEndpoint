import React from "react"
import Popup from "reactjs-popup"
import makeApiCall from "../apiCall";

export const deleteConfirmation = () => (
    <Popup
        trigger={() => (
            <button className="button">Delete</button>
        )}
        position="right center"
        closeOnDocumentClick
    >
        <span>
            <span>Are you sure</span>
            <button onClick={makeApiCall('DELETE', `/userssddssddgd/1`)}>
                Yes
            </button>
        </span>
    </Popup>
)