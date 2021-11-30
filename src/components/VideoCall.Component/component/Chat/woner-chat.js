import React from 'react';
import ChatWonerImg from './chat-woner.png';
export default function WonerChat({img,msz,timeStamp}) {
    return (
        <div className="chat-tile woner">
            <div className="chat-tile-img">
                <img src={ChatWonerImg}/>
                <div className="triangle-left"></div>
            </div>
            <div className="chat-tile-ping">
                <p className="ping"> {msz}</p>
            </div>
        </div>
    )
}
