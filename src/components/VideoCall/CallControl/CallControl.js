import React,{useState} from 'react'
import CallButton from './CallButton/CallButton';
import LeftSideControl from './LeftSideControl/LeftSideControl';
import RightSideControl from './RightSideControl/RightSideControl';
import VideoButtons from './VideoButtons';
import LeaveRoomButton from './LeaveRoomButton';
import './CallControl.css';

export default function CallControl({
  watingList,
  toggleWatingList,
  setToggleWatingList,
  toggleWatingListHandel,
  callStartAndHandel,
  isCallActive,
  isCountDown,
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
  roomToken,
  room
}) {


    return (
        <div className="call-controls-wrp">
                <div className="call-controls-wrp-2">
                    <LeaveRoomButton room={room} isCallActive={isCallActive} callStartAndHandel={callStartAndHandel}/>
                 
                    {/* <CallButton isCallActive={isCallActive} callStartAndHandel={callStartAndHandel}/> */}
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
                           isCallActive={isCallActive}
                           isCountDown={isCountDown}
                           togglePatientRecordsFun={togglePatientRecordsFun}
                           toggleChatFun={toggleChatFun}
                           closeChatFun={closeChatFun}
                           toggleExtend={toggleExtend}
                           toggleExtendFun={toggleExtendFun}
                           setToggleExtend={setToggleExtend}
                           toggleShare={toggleShare}
                           toggleShareFun={toggleShareFun}
                           setToggleShare={setToggleShare}
                           roomToken={roomToken}
                        />
                    </div>
                </div>
        </div>
    )
}
