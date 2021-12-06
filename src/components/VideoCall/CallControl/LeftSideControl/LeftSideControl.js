import React from 'react'
import WatingListWidget from './WatingListWidget/WatingListWidget';
import MicButton from '../MicButton';
import { connect } from 'react-redux';
import CameraButton from '../CameraButton';
import './LeftSideControl.css'

const LeftSideControl = ({
    watingList,
    toggleWatingListHandel,
    toggleWatingList,
    setToggleWatingList,
    room,
   connectOnlyWithAudio
})=>{
    return (
        <div className="left-side-control">
            <WatingListWidget 
                watingList={watingList} 
                toggleWatingListHandel={toggleWatingListHandel} 
                toggleWatingList={toggleWatingList} 
                setToggleWatingList={setToggleWatingList}
            />
            <MicButton room={room}/>
            {
                !connectOnlyWithAudio && <CameraButton room={room}/>
            }
        </div>
    )
}


const mapStoreStateToProps = (state)=>{
    return{
        ...state.videoCallReducer
    }

}
export default connect(mapStoreStateToProps)(LeftSideControl);