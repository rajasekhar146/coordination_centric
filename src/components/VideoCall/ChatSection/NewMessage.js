import React, { useState } from 'react';
import SendChatImg from './send-chat.png';
import { sendMessageUsignDataChannel } from '../utils/TwilioUtils';
export default function NewMessage() {
    const [message, setMessage] = useState('');
    let localUser = JSON.parse(localStorage.getItem("currentUser"));
    let userId = localUser.data.data._id;
    let userImg = localUser.data.data.profilePic;
    let userRole = localUser.data.data.role;
    const sendMessage = ()=>{
        if(message){
            let msz = {
                message:message,
                userId:userId,
                userImg:userImg,
                userRole:userRole,
                date:new Date().getTime()
            }
            sendMessageUsignDataChannel(msz, true)
            setMessage('');
        }
    }
    const keyPressHandel = (event)=>{
        if(event.key === 'Enter'){
            event.preventDefault();
            sendMessage();
        }
    }

    const textChangeHandel = (event)=>{
        setMessage(event.target.value);
    }
  
    return (
        <div className="chat-inp-wrp">
        <div className="chat-inp-inner-wrp">
                <div className="send-chat-btn" onClick={sendMessage}>
                    <img src={SendChatImg}/>
                </div>
                <input type="text"
                className="new_message_input" 
                value={message}
                onKeyDown={keyPressHandel} 
                onChange={textChangeHandel} 
                placeholder="type of your message"
                />
            </div>
        </div>
    )
}
