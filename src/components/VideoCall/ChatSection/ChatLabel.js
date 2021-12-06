import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
export default function ChatLabel({closeChatFun}) {
    return (
        <div className="chat-header">
        <div className="chat-title">
            <p className="title">Messages</p>
        </div>
        <div className="close-chat" onClick={closeChatFun}>
                <CloseIcon/>
            </div>
        </div>
    )
}
