import React from 'react';
import ChatImg from './chat.png';

export default function ChatWid({toggleChatFun}) {
    return (
        <div className="wid-tile chat-wid" onClick={toggleChatFun}>
            <img src={ChatImg}/>
        </div>
    )
}
