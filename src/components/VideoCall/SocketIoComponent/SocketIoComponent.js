import React,{useState,useEffect} from 'react';
import Countdown,{zeroPad} from "react-countdown";

import {connect} from 'react-redux';
import {setCallActive, setCountDownResult, setShowApplicationPopup, setApplicationPopupVal } from '../../../redux/actions/video-call-actions';
import store from '../../../redux/store';
import { useHistory } from 'react-router-dom';

const callEnd = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-end.mp3");
const SocketIoComponent =({
    user,
    room,
    roomId,
    videoApiResponce,
    countDownResult,
    meetingStartTime,
    meetingEndTime,
    setMeetingStartTime,
    setMeetingEndTime,
    setMeetingDuration,
    setMeetingRemainingTime,
    setCountDownResultAction
})=>{
    console.log("I Render Times Video ")
//----------- Sync countdaun ----------------
// const meetDuration = (new Date(videoApiResponce.meetingendtime) - new Date(videoApiResponce.meetingstarttime));
// const meetingObj = {
//   meetingId:roomId,
//   meetingStart:Date.now(),
//   meetingEnd:new Date(new Date().getTime() + meetDuration).getTime(),
//   meetingRemainingTime:(new Date(new Date().getTime() + meetDuration).getTime()) - new Date().getTime(),
//   setMeetingDuration:meetDuration
// }



// const  setLocalMeetingObj = (meetingObjArg)=>{
//   localStorage.setItem("meeting",JSON.stringify(meetingObjArg));
//   let localMeetingObj = JSON.parse(localStorage.getItem("meeting")); 
//   setMeetingStartTime({...meetingStartTime,date:localMeetingObj.meetingStart});
//   setMeetingEndTime({...meetingEndTime,date:localMeetingObj.meetingEnd});
//   setMeetingDuration(localMeetingObj.meetingDuration);    
//   setMeetingRemainingTime(localMeetingObj.meetingEnd - localMeetingObj.meetingStart);
// }

// const  removeLocalMeetingObj = ()=>{
//     localStorage.removeItem("meeting");
// }


  
// if(user.role === "patient"){
//   //socket.emit("start-sync-countdown",sendMeetingData);
// }
//------------- Count down ---------------------
// Renderer callback with condition
let renderer = ({ hours, minutes, seconds, completed }) =>{ 
    if(completed){
        setCountDownResultAction(false)
    }
   return (<span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>)
};

const history = useHistory();
const CallEnd = () => <span>Call ended </span>;
const countDownTime = store.getState().videoCallReducer.videoCallDuration;

// Renderer callback with condition

const countDownTimeHide = ()=>{
  store.dispatch(setCallActive(false));
  room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
    localVideoTrackPublication.track.stop();
    });
    room.localParticipant.audioTracks.forEach((localAuideoTrackPublication) => {
        localAuideoTrackPublication.track.stop();
    });
    room.disconnect();
    setTimeout(()=>{
      if(store.getState().videoCallReducer.user.role === "patient"){
        store.dispatch(setShowApplicationPopup(true));
        store.dispatch(setApplicationPopupVal("PatientFeedback"));
      }
        history.push('/dashboard');
    },2000)
   
  callEnd.play();
}

//---------------------------------
let meetingUser = {
    id:user.id,
    userRole:user.role,
    meetingId:roomId,
    timestamp:Date.now()
}
const socketDoctorConnect = ()=>{
    // if(user.role === "doctor"){
    //     if(localStorage.getItem("meeting")){
    //         let localMeetingObj = JSON.parse(localStorage.getItem("meeting"));
    //         if(roomId === localMeetingObj.meetingId){
    //             setMeetingStartTime({...meetingStartTime,date:localMeetingObj.meetingStart});
    //             setMeetingEndTime({...meetingEndTime, date:localMeetingObj.meetingEnd})
    //             setMeetingDuration(localMeetingObj.meetingDuration)
    //             setMeetingRemainingTime(localMeetingObj.meetingEnd - localMeetingObj.meetingStart)
    //             console.log("yes 1")
    //         }else{
    //             console.log("yes 2")
    //             removeLocalMeetingObj();
    //             setLocalMeetingObj(meetingObj);
    //         }
    //         console.log("yes there is a localstorage")
    //     }else {
    //         setLocalMeetingObj(meetingObj);
    //         console.log("no there is a localstorage")
    //     }
    //     // setCountDownResultAction(true);
    //     let sendMeetingData = JSON.parse(localStorage.getItem("meeting"));
    //     //socket.emit("start-sync-countdown",sendMeetingData,user.id);
    // }
}

const socketPatientConnect = ()=>{
    // if(user.role === "patient"){
    //     let userData = {
    //         userId:user.id,
    //         userRole:user.role,
    //         meetingId:roomId,
    //         reqTime: Date.now()
    //     }
    //     console.log("I am patient")
    //     //socket.emit("request-start-sync-countdown", userData, roomId);
    // }
}

    useEffect(() => {
        // localStorage.setItem("meetingUser", JSON.stringify(meetingUser));
        // user.role === "doctor" ? socketDoctorConnect() : socketPatientConnect();
    },[])
// if(socket){
//     socket.on("connect", ()=>{
//         console.log("I am connected", meetingUser)
//      }) 
// }
 
   
  
       
   

    return (
        <>
        
                 <div className="timer-wid">
                { meetingEndTime.date && <Countdown date={meetingEndTime.date} renderer={renderer} onComplete={countDownTimeHide}/>}
             </div> 
            {/* {countDownResult && 
            } */}
        </>
    )
}

const mapStoreStateToProps=(state)=>{
    return {
        ...state.videoCallReducer
    }
}
const mapActionsToProps=(dispatch)=>{
    return {
      setCountDownResultAction:(countDownResult)=> dispatch(setCountDownResult(countDownResult))
    }
}


export default connect(mapStoreStateToProps,mapActionsToProps)(SocketIoComponent)
