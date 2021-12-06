import React from 'react'
import watingRoomIcon from './wating-list-icon.png';
export default function WatingRoomButton({toggleWatingListHandel}) {
    return (
        <div className="watingroom-action-menu" onClick={toggleWatingListHandel}>
            <div className="wid-tile watingroom-wid"> 
                <img src={watingRoomIcon}/>
            </div>
            <div className="watingroom-title"> 
                <p>Wating Room</p>
            </div>
        </div>
    )
}
