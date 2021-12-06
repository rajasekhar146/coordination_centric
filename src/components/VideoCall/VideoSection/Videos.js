import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import RoomLabel from './RoomLabel';
import TwilioRoom from './TwilioRoom/TwilioRoom';
import {connectToRoom} from '../utils/TwilioUtils';
import {useSelector} from 'react-redux';
const Videos = ({room,setRoom,roomId,twilioAccessToken}) =>{
    const videoCallReducer = useSelector(state => state.videoCallReducer);
    useEffect(() => {
       if(twilioAccessToken){
           connectToRoom(twilioAccessToken,roomId,setRoom)
       }
    }, [twilioAccessToken])
    return (
        <div className="videos_container">
            {
            !videoCallReducer.isFullScreen && <RoomLabel roomId={roomId}/>
            }
                
                {room && <TwilioRoom room={room}/>}
        </div>
    )
}
const mapStoreStateToProps=(state)=>{
    return {
        ...state.videoCallReducer
    }
}

export default connect(mapStoreStateToProps)(Videos)

