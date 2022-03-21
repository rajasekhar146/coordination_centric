import React from 'react';
import callImg from  "../../../assets/icons/call.png";
import {useHistory} from 'react-router-dom';
import store from '../../../redux/store';
import {setTimerCount,setCallActive,setShowApplicationPopup,setApplicationPopupVal} from '../../../redux/actions/video-call-actions';
import { connectToRoom } from '../utils/TwilioUtils';
const callEnd = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-end.mp3");
const callStart = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-start.mp3");


export default function LeaveRoomButton({room, setRoom}) {
    const history = useHistory();
    const roomLeaveHandel= ()=>{
        if(store.getState().videoCallReducer.isRoomConnect){
            store.dispatch(setCallActive(!store.getState().videoCallReducer.callActive));
            console.log("LeaveRoomButton condition",store.getState().videoCallReducer.callActive);
            const startCall = ()=>{
                // connectToRoom(store.getState().videoCallReducer.twilioAccessToken,store.getState().videoCallReducer.roomId,setRoom)
                 callStart.play()
            }
            const endCall=()=>{
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
            (store.getState().videoCallReducer.callActive === true) ? startCall(): endCall();
             store.dispatch(setTimerCount(false))
        }
    }
    return (
          <div title={!store.getState().videoCallReducer.isCallActive === true ? "Start Meeting Call": "End Meeting Call"} className={store.getState().videoCallReducer.callActive ? "call-btn-wrp call-active": "call-btn-wrp call-deactive"} onClick={roomLeaveHandel}>
                <img src={callImg}/>
            </div>
    )
}
