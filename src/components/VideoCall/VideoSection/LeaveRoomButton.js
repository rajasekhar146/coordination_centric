import React from 'react'

export default function LeaveRoomButton({room}) {
    const roomLeaveHandel=()=>{
        room.disconnect();
        const siteUrl = window.location.origin;
        window.location.href = siteUrl;
    }
    return (
        <div className="video_button_container">
                <button className="video_button_end" onClick={roomLeaveHandel}>
                    Leave Room
                </button>
        </div>
    )
}
