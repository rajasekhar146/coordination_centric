import React from 'react';
import callImg from  "../../../assets/icons/call.png";
export default function LeaveRoomButton({room, isCallActive, callStartAndHandel}) {
    const roomLeaveHandel=()=>{
        callStartAndHandel();
        room.disconnect();
        const siteUrl = window.location.origin;
        window.location.href = siteUrl;
    }
    return (
          <div title={!isCallActive ? "Start Meeting Call": "End Meeting Call"} className={isCallActive ? "call-btn-wrp call-active": "call-btn-wrp call-deactive"} onClick={roomLeaveHandel}>
                <img src={callImg}/>
            </div>
    )
}
