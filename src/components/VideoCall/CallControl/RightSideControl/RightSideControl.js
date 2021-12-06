import React from 'react'
import Countdown from "react-countdown";
import PatientRecordsWid from './PatientRecordsWid/PatientRecordsWid';
import ChatWid from './ChatWid/ChatWid';
import ExtendWid from './ExtendWid/ExtendWid';
import ShareWid from './ShareWid/ShareWid';
import './RightSideControl.css';
export default function RightSideControl({
    isCallActive,
    isCountDown,
    togglePatientRecordsFun,
    toggleChatFun,
    toggleExtend,
    toggleExtendFun,
    setToggleExtend,
    toggleShare,
    toggleShareFun,
    setToggleShare,
    roomToken,
}) {
//------------- Count down ---------------------
const TimeOutTem = () => <span>Call ended time Out ..! </span>;
const CallEnd = () => <span>Call ended </span>;
// Renderer callback with condition
let renderer = ({ hours, minutes, seconds, completed }) => {
if (completed || !isCallActive) {
    // Render a complete state
    return <CallEnd/>;
  } else {
    // Render a countdown
    return (
      <span>
        {String(hours).length < 2 ? "0"+hours:hours }:{String(minutes).length < 2 ? "0"+minutes: minutes}:{String(seconds).length < 2 ? "0"+seconds:seconds}
      </span>
    );
  }
};
    return (
        <div className="right-side-control">         
        {/* {videoToken} */}
        {roomToken}
            {
                isCountDown ? (<div className="timer-wid"><Countdown date={Date.now() + 9000} renderer={renderer} /></div>): null
            }
            {/* <InviteWid/> */}
            {/* <CallExtendConfirm/> */}
            <PatientRecordsWid togglePatientRecordsFun={togglePatientRecordsFun}/>
            <ChatWid toggleChatFun={toggleChatFun}/>
            <ExtendWid toggleExtend={toggleExtend} toggleExtendFun={toggleExtendFun} setToggleExtend={setToggleExtend}/>
            <ShareWid toggleShare={toggleShare} toggleShareFun={toggleShareFun} setToggleShare={setToggleShare}/>
        
        </div>
    )
}
