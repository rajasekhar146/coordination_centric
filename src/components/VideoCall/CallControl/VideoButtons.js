import React from 'react';
import {connect} from 'react-redux';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import LeaveRoomButton from './LeaveRoomButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import BgImg from './call-strip.png';
import './VideoButton.css';
const bgstyle = {
    backgroundImage:`url(${BgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize:'cover'
}
const VideoButtons= ({room, connectOnlyWithAudio}) =>{
 
    return (
        <div className="video_buttons_container video-control-wrp" style={bgstyle}>
            
            <MicButton room={room}/>
            {
                !connectOnlyWithAudio && <CameraButton room={room}/>
            }
            <LeaveRoomButton room={room}/>
            <SwitchToScreenSharingButton room={room}/>
         
        </div>
    )
}

const mapStoreStateToProps = (state)=>{
    console.log("Room will be here>>>>>>>YYYYGG>>>", state.videoCallReducer);
    return{
        ...state.videoCallReducer
    }

}
export default connect(mapStoreStateToProps)(VideoButtons);
