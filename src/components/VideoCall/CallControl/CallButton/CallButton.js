import React from 'react'
import imgSrc from  "../../../../assets/icons/call.png";
export default function CallButton({isCallActive, callStartAndHandel}) {
    return (
        <div title={!isCallActive ? "Start Meeting Call": "End Meeting Call"} className={isCallActive ? "call-btn-wrp call-active": "call-btn-wrp call-deactive"} onClick={callStartAndHandel}>
            <img src={imgSrc}/>
        </div>
    )
}
