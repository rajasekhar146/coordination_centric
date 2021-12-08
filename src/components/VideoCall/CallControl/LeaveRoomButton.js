import React from 'react';
import callImg from  "../../../assets/icons/call.png";

import store from '../../../redux/store';
import {setTimerCount,setCallActive} from '../../../redux/actions/video-call-actions';
import { connectToRoom } from '../utils/TwilioUtils';
const callEnd = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-end.mp3");
const callStart = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-start.mp3");


export default function LeaveRoomButton({room, setRoom}) {
    const roomLeaveHandel= ()=>{
        
        store.dispatch(setCallActive(!store.getState().videoCallReducer.callActive));
        console.log("LeaveRoomButton condition",store.getState().videoCallReducer.callActive);
        const startCall = ()=>{
            // connectToRoom(store.getState().videoCallReducer.twilioAccessToken,store.getState().videoCallReducer.roomId,setRoom)
            // callStart.play()
        }
        const endCall=()=>{
            room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
            localVideoTrackPublication.track.stop();
            });
            room.disconnect();
            const siteUrl = window.location.origin+"/dashboard";
            window.location.href = siteUrl;
            callEnd.play();
        }
        (store.getState().videoCallReducer.callActive === true) ? startCall(): endCall();
        // if(await store.getState().videoCallReducer.isCallActive === true ){
        //     console.log("Yes LeaveRoomButton>>>>>>>>")
        //       callStart.play()
        // }else if(store.getState().videoCallReducer.isCallActive === false){
        //     console.log("No  LeaveRoomButton>>>>>>>>")
        //     room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
        //         localVideoTrackPublication.track.disable();
        //       });
        //       
        // }
         store.dispatch(setTimerCount(false))
        // const siteUrl = window.location.origin;
        // window.location.href = siteUrl;
    }
    return (
          <div title={!store.getState().videoCallReducer.isCallActive === true ? "Start Meeting Call": "End Meeting Call"} className={store.getState().videoCallReducer.callActive ? "call-btn-wrp call-active": "call-btn-wrp call-deactive"} onClick={roomLeaveHandel}>
                <img src={callImg}/>
            </div>
    )
}
