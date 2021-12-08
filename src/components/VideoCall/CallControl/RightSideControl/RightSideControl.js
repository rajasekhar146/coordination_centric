import React from 'react';
import Countdown,{zeroPad} from "react-countdown";
import PatientRecordsWid from './PatientRecordsWid/PatientRecordsWid';
import ChatWid from './ChatWid/ChatWid';
import ExtendWid from './ExtendWid/ExtendWid';
import ShareWid from './ShareWid/ShareWid';
import {setTimerCount,setCallActive} from '../../../../redux/actions/video-call-actions';
import store from '../../../../redux/store';
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
    room
}) {
//------------- Count down ---------------------

const TimeOutTem = () => <span>Time Out ..! </span>;
const CallEnd = () => <span>Call ended </span>;
const countDownTime = 2000000;

// Renderer callback with condition


// Renderer callback with condition
let renderer = ({ hours, minutes, seconds, completed }) => (<span> {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>);

const countDownTimeHide = ()=>{
  store.dispatch(setCallActive(false));
  room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
    localVideoTrackPublication.track.disable();
    const siteUrl = window.location.origin+"/dashboard";
    window.location.href = siteUrl;
    callEnd.play();
  });
}

    return (
      <> 
            {
            !store.getState().videoCallReducer.isFullScreen && (
                                                <div className="right-side-control">         
                                                {/* {videoToken} */}
                                             {store.getState().videoCallReducer.callActive &&  <div className="timer-wid"><Countdown date={Date.now() + countDownTime} renderer={renderer} onComplete={countDownTimeHide}/></div> }  
                                            
                                                    
                                                    
                                                    {/* <InviteWid/> */}
                                                    {/* <CallExtendConfirm/> */}
                                                    <PatientRecordsWid togglePatientRecordsFun={togglePatientRecordsFun}/>
                                                    <ChatWid toggleChatFun={toggleChatFun}/>
                                                    <ExtendWid toggleExtend={toggleExtend} toggleExtendFun={toggleExtendFun} setToggleExtend={setToggleExtend}/>
                                                    {/* <ShareWid toggleShare={toggleShare} toggleShareFun={toggleShareFun} setToggleShare={setToggleShare}/> */}
                                                
                                                </div>
                                              )
            }
      </>
      
    )
}
