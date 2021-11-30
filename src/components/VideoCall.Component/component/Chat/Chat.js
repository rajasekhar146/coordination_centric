import React, {useRef, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendChatImg from './send-chat.png';
import WonerChat from "./woner-chat";
import UserChat from "./user-chat";
import './Chat.css';
const chatArr = [
    {
        name:"Jitu",
        type:"woner",
        img:"",
        msz:"hello how are you ?"
    },
    {
        name:"Sonal",
        type:"user",
        img:"",
        msz:"i am good"
    }
]
export default function Chat({setToggleChat}) {
    const chatInput = useRef();
    const [chatInp,setChatInp] = useState("");
    const [chatMessage,setChatMessage] = useState(chatArr);

    const chatInpHandel = (event)=>{
        setChatInp(event.target.value)
    }
    const sendChat = ()=>{
        let obj =  {
            name:"Jitu",
            type:"woner",
            img:"",
            msz:chatInp
        }
        setChatMessage([...chatMessage,obj])
        setChatInp("")
    }

    const closeChat = ()=>{
        setToggleChat(false)
    }
    return (
        <div className="chat-wrp">
            <div class="chat-wrp-2">
            <div className="chat-header">
                <div className="chat-title">
                    <p className="title">Messages</p>
                </div>
                <div className="close-chat" onClick={closeChat}>
                    <CloseIcon/>
                </div>
            </div>
            <div className="chat-workspace">
                {
                    chatMessage.map((itm,idx,arr)=>{
                            return itm.type === "woner" ? <WonerChat img={itm.img} msz={itm.msz} timeStamp={""}/> : <UserChat img={itm.img} msz={itm.msz} timeStamp={""}/>
                    })
                }
            </div>
            <div className="chat-inp-wrp">
                <div className="chat-inp-inner-wrp">
                    <div className="send-chat-btn" onClick={sendChat}>
                        <img src={SendChatImg}/>
                    </div>
                    <input type="text" value={chatInp} onChange={chatInpHandel}/>
                </div>
            </div>
            </div>
        </div>
    )
}
