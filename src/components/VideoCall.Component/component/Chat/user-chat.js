import React from 'react'
import ChatUserImg from './chat-user.png';
export default function UserChat({img,msz,timeStamp}) {
    return (
        <div className="chat-tile user">
            <div className="chat-tile-ping">
                <p className="ping"> {msz}</p>
            </div>
            <div className="chat-tile-img">
                <div className="triangle-right"></div>
                <img src={ChatUserImg}/>
            </div>
        </div>
    )
}
