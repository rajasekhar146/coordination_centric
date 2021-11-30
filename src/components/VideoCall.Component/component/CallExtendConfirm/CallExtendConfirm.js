import React from 'react';
import "./CallExtendConfirm.css";
import BgImg from "./bg.png";
import CloseIcon from '@mui/icons-material/Close';

export default function CallExtendConfirm() {
    return (
        <div className="call-extendConfirm-wrp">
            <div className="call-extendConfirm-wrp2">
                <div className="bg-wrp">
                    <div className="dot dot-1"></div>
                    <img src={BgImg}/>
                    <div className="dot dot-2"></div>
                </div>
                <div className="content-wrp">
                    <div className="title-wrp">
                        <h1> Call Extended</h1>
                    </div>
                    <div className="content">
                        <p> This video call was successfully extended by another [5 minutes].</p>
                    </div>
                </div>
                
            <div className="close-wrp">
                <CloseIcon/>
            </div>
            </div>
        </div>
    )
}
