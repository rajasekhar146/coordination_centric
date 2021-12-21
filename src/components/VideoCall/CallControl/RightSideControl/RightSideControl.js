import React from 'react';
import Countdown,{zeroPad} from "react-countdown";
import PatientRecordsWid from './PatientRecordsWid/PatientRecordsWid';
import ChatWid from './ChatWid/ChatWid';
import ExtendWid from './ExtendWid/ExtendWid';
import ShareWid from './ShareWid/ShareWid';
import {setTimerCount,
        setCallActive, 
        setShowApplicationPopup, 
        setApplicationPopupVal} from '../../../../redux/actions/video-call-actions';
import store from '../../../../redux/store';
import SocketIoComponent from '../../SocketIoComponent/SocketIoComponent';
import './RightSideControl.css';


const callEnd = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-end.mp3");
export default function RightSideControl({
    togglePatientRecordsFun,
    toggleChatFun,
    toggleExtend,
    toggleExtendFun,
    setToggleExtend,
    toggleShare,
    toggleShareFun,
    setToggleShare,
    room,
    meetingStartTime,
    meetingEndTime,
    meetingDuration,
    meetingRemainingTime,
    setMeetingStartTime,
    setMeetingEndTime,
    setMeetingDuration,
    setMeetingRemainingTime,
    setCountDownResultAction
}) {


    return (
      <> 
            <div className="right-side-control">         
            {/* {videoToken} */}
            {/* {store.getState().videoCallReducer.callActive &&  <div className="timer-wid"><Countdown date={Date.now() + countDownTime} renderer={renderer} onComplete={countDownTimeHide}/></div> }   */}
             {(room) &&  <SocketIoComponent
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
                              />
                }
                
                {/* <InviteWid/> */}
                {/* <CallExtendConfirm/> */}
                {store.getState().videoCallReducer.user.role === "doctor" && <PatientRecordsWid togglePatientRecordsFun={togglePatientRecordsFun}/> }
                <ChatWid toggleChatFun={toggleChatFun}/>
                {store.getState().videoCallReducer.user.role === "doctor" &&  <ExtendWid toggleExtend={toggleExtend} toggleExtendFun={toggleExtendFun} setToggleExtend={setToggleExtend} meetingEndTime={meetingEndTime}/>}
               
                {/* <ShareWid toggleShare={toggleShare} toggleShareFun={toggleShareFun} setToggleShare={setToggleShare}/> */}
            
            </div>
                                              
            
      </>
      
    )
}
