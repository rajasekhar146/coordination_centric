import React, {useEffect,useState} from 'react';
import {connect} from 'react-redux';
import RoomLabel from './RoomLabel';
import TwilioRoom from './TwilioRoom/TwilioRoom';
import {connectToRoom} from '../utils/TwilioUtils';
import {useSelector} from 'react-redux';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


import store from '../../../redux/store';
import { setCountDownResult } from '../../../redux/actions/video-call-actions';
import './Videos.css';
const Videos = ({
    room,
    setRoom,
    roomId,
    twilioAccessToken,
    setCountDownResultAction,
}) =>{   
    const videoCallReducer = useSelector(state => state.videoCallReducer);
    const msz =  store.getState().videoCallReducer.erroMsz;
  
    useEffect(() => {
       if(twilioAccessToken){
           connectToRoom(twilioAccessToken,
            roomId,
            setRoom,
            setCountDownResultAction
            )  
       }
    }, [twilioAccessToken])
 
 
    return (
        <div className="videos_container">
            {/* {
            !videoCallReducer.isFullScreen && <RoomLabel roomId={roomId}/>
            } */}
                {msz &&  (<div className='video-error-msz'> {msz} <ErrorOutlineIcon/></div>)}
                {room && <TwilioRoom room={room}/>}
        </div>
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

export default connect(mapStoreStateToProps,mapActionsToProps)(Videos)

