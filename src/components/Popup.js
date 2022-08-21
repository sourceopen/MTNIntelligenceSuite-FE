import React from 'react'
import './Popup.css'

function Popup(props) {
    return(props.trigger)?(
        <div className="Popup">
            <div className="popup-inner">
                <button className="close-btn">Close</button>
                { props.childern }
            </div>
        </div>
    ):"";
}

export default Popup