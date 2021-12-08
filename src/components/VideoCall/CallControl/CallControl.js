import React,{useState} from 'react'
import LeftSideControl from './LeftSideControl/LeftSideControl';
import RightSideControl from './RightSideControl/RightSideControl';
import LeaveRoomButton from './LeaveRoomButton';
import './CallControl.css';
import {useSelector} from 'react-redux';
export default function CallControl({
  watingList,
  toggleWatingList,
  setToggleWatingList,
  toggleWatingListHandel,
  togglePatientRecordsFun,
  toggleChatFun,
  closeChatFun,
  setToggleChat,
  toggleExtend,
  toggleExtendFun,
  setToggleExtend,
  toggleShare,
  toggleShareFun,
  setToggleShare,
  room,
  setRoom
}) {

    const videoCallReducer = useSelector(state => state.videoCallReducer);
    return (
        <div className={ !videoCallReducer.isFullScreen ? 'call-controls-wrp bg':'call-controls-wrp'}>
                <div className="call-controls-wrp-2">
                    <LeaveRoomButton room={room} setRoom={setRoom}/>
                 
                    {!videoCallReducer.isFullScreen && (
                        <div className="call-controls">
                        <LeftSideControl 
                            watingList={watingList} 
                            toggleWatingList={toggleWatingList} 
                            setToggleWatingList={setToggleWatingList} 
                            toggleWatingListHandel={toggleWatingListHandel}
                            room={room}
                            />
                            
                        <RightSideControl
                           setToggleChat={setToggleChat}
                           togglePatientRecordsFun={togglePatientRecordsFun}
                           toggleChatFun={toggleChatFun}
                           closeChatFun={closeChatFun}
                           toggleExtend={toggleExtend}
                           toggleExtendFun={toggleExtendFun}
                           setToggleExtend={setToggleExtend}
                           toggleShare={toggleShare}
                           toggleShareFun={toggleShareFun}
                           setToggleShare={setToggleShare}
                           room={room}
                        />
                    </div>
                    )}
                    
                </div>
        </div>
    )
}
