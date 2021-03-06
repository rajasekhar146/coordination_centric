import React from 'react'
import WatingListWidget from './WatingListWidget/WatingListWidget';
import MicButton from '../MicButton';
import {connect} from 'react-redux';
import CameraButton from '../CameraButton';
import store from '../../../../redux/store';
import './LeftSideControl.css';

const LeftSideControl = ({
    user,
    watingList,
    toggleWatingListHandel,
    toggleWatingList,
    setToggleWatingList,
    room,
   connectOnlyWithAudio,
   watingListSync
})=>{

    return (
        <div className="left-side-control">
            {user.role === "doctor" && (<WatingListWidget 
                                            watingListSync={watingListSync} 
                                            toggleWatingListHandel={toggleWatingListHandel} 
                                            toggleWatingList={toggleWatingList} 
                                            setToggleWatingList={setToggleWatingList}
                                        />)
            }
          
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