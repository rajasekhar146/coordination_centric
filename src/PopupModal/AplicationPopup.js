import React, {useEffect, useState} from 'react';
import store from '../redux/store';
import {setShowApplicationPopup,setApplicationPopupVal} from '../redux/actions/video-call-actions';
import { connect } from 'react-redux';
import PatientFeedback from '../components/VideoCall/Popup/PatientFeedback/PatientFeedback';
import PatientFeedbackThank from '../components/VideoCall/Popup/PatientFeedbackThank/PatientFeedbackThank';
import './AplicationPopup.css';

const AplicationPopup =({
    applicationPopupVal,
    showApplicationPopup
})=> {
    let action = {
        type:"PatientFeedback"
    }

    let popupSwich = ()=>{
        switch(applicationPopupVal){
            case "PatientFeedback": return <PatientFeedback/>
            case "PatientFeedbackThank": return <PatientFeedbackThank/>
            default: return null
        }
       // return result
    }

        useEffect(() => {
            popupSwich()
        }, [showApplicationPopup,applicationPopupVal])

        const closePopup = ()=>{
            store.dispatch(setShowApplicationPopup(false));
            store.dispatch(setApplicationPopupVal(""));
        }
   
    return (
        <>
        {
            showApplicationPopup && (
            <div className='aplication-popup-wrp'>
                <div className='aplication-popup-bg' onClick={closePopup}></div>
                        {popupSwich()}
                </div>)
        }
        </>
       
    )
}


const mapStoreStateToProps=(state)=>{
    return {
        ...state.videoCallReducer
    }
}

export default connect(mapStoreStateToProps)(AplicationPopup)
