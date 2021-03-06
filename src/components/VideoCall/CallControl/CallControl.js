import React,{useState,useEffect} from 'react'
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
  setRoom,
  redireactToDashboard,

  meetingStartTime,
  meetingEndTime,
  meetingDuration,
  meetingRemainingTime,
  setMeetingStartTime,
  setMeetingEndTime,
  setMeetingDuration,
  setMeetingRemainingTime,
  setCountDownResultAction,
  watingListSync,
  apiMeetingEndTime
}) {
    useEffect(() => {
    },[])

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
                            watingListSync={watingListSync}
                            />
                            
                        <RightSideControl
                           redireactToDashboard={redireactToDashboard}
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
                            meetingStartTime={meetingStartTime}
                            meetingEndTime={meetingEndTime}
                            meetingDuration={meetingDuration}
                            meetingRemainingTime={meetingRemainingTime}
                            setMeetingStartTime={setMeetingStartTime}
                            setMeetingEndTime={setMeetingEndTime}
                            setMeetingDuration={setMeetingDuration}
                            setMeetingRemainingTime={setMeetingRemainingTime}
                            setCountDownResultAction={setCountDownResultAction}
                            apiMeetingEndTime={apiMeetingEndTime}
                        />
                    </div>
                    )}
                    
                </div>
        </div>
    )
}
