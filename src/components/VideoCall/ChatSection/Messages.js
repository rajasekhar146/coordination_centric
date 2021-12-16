import React from 'react';
import { connect } from "react-redux";
import ChatPatientImg from './chat-patient.png';
import ChatDoctorDefaultImg from './doctor_default.png';
import ChatPatientDefaultImg from './doctor_default.png';
import store from '../../../redux/store';
import './Messages.css';
const Message = ({author,content,sameAuthor,messageCreatedByMe})=>{
    const alignClass = messageCreatedByMe ? 'woner':'user';
    const authorText = messageCreatedByMe ? "Doctor": author;
    const applicationUserImg = store.getState().videoCallReducer.user.img;
    const contentAdditanalStyle = messageCreatedByMe ? 'message_right_styles ':'message_left_styles';
    const onImageErro = (e)=>{
        e.target.onerror = null; 
        if(store.getState().videoCallReducer.user.role === "doctor"){
            e.target.src=ChatDoctorDefaultImg;
        }else {
            e.target.src=ChatPatientDefaultImg;
        }

    }
    return(
        <>
                {
                   <div className={`chat-tile ${alignClass}`}>
                        {
                            messageCreatedByMe &&  (  <div className="chat-tile-img">
                                                            <img src={applicationUserImg} onError={onImageErro}/>
                                                            <div className="triangle-left"></div>
                                                        </div>
                                                    )
                        }
                        <div className="chat-tile-ping">
                            {!sameAuthor && <p className="message_title">{author}</p>}
                            <p className={`message_content ping ${contentAdditanalStyle}`}>{content}</p>
                        </div>
                        {
                            !messageCreatedByMe &&  (   <div className="chat-tile-img">
                                                            <div className="triangle-right"></div>
                                                            <img src={ChatPatientImg}/>
                                                        </div>
                                                    )
                        }
                    
                    </div>

                }
        </>
    )
}


const Messages =({messages})=>{
    return (
            <div className="chat-workspace">
                {
                    messages.map((message,idx)=>{
                            const sameAuthor = 
                            idx > 0 && message.identity === messages[idx - 1].identity;
                            return (
                                <Message
                                key={idx}
                                author={message.identity}
                                content={message.content}
                                sameAuthor={sameAuthor}
                                messageCreatedByMe={message.messageCreatedByMe}
                                />
                            )
                    })
                }
            </div>
    )
}
const mapStoreStateToProps = (state) => {
    return {
      ...state.videoCallReducer,
    };
  };
  
  export default connect(mapStoreStateToProps)(Messages);

  