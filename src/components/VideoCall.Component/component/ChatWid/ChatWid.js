import React from 'react';
import ChatImg from './chat.png';

export default function ChatWid({toggleChat}) {
    return (
        <div className="wid-tile chat-wid" onClick={toggleChat}>
            <img src={ChatImg}/>
        </div>
    )
}
