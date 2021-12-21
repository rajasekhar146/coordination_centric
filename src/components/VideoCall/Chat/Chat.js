import React, {useRef, useState} from 'react';
import ChatLabel from './../ChatSection/ChatLabel';
import Messages from './../ChatSection/Messages';
import NewMessage from './../ChatSection/NewMessage';
import './Chat.css';

export default function Chat({closeChatFun}) {
   
    return (
        <div className="chat-wrp">
            <div className="chat-wrp-2">
            <ChatLabel closeChatFun={closeChatFun} />
            <Messages/>
            <NewMessage/>
            </div>
        </div>
    )
}
