import React, {useState} from 'react';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import store from '../../../../redux/store';
import {setShowApplicationPopup,setApplicationPopupVal} from '../../../../redux/actions/video-call-actions';
import './PatientFeedbackThank.css';
import thankImg from './thanks-for-feedback.png';

export default function PatientFeedbackThank() {
    //className="patient-feedback popup-main-content">
    const [appointment, setAppointment] = useState("");
    const [starRateValue, setStarRateValue] = useState(0);
    const [comment, setComment] = useState("");
    const closePopup = ()=>{
        store.dispatch(setShowApplicationPopup(false));
        store.dispatch(setApplicationPopupVal(""));
    }

    const starRatingHandel = (event, newValue) => {
        setStarRateValue(newValue);
    }
    const appointmentValHandel =(event)=>{
        setAppointment(event.target.value)
    }
    const commentHandel =(event)=>{
        setComment(event.target.value)
    }
    const submitFeedbackHandel = ()=>{
        if(appointment || starRateValue || comment){
            console.log("appointment>>>>",appointment,"starRateValue>>>>",starRateValue, "comment>>>>",comment)
        }else {
            console.log("NO way")
        }
       
    }
    return (
<div className='popup-main-content-wrp'>
<Grid  
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="patient-feedback popup-main-content"
        gap={1}
        >
        
            <Grid container  
                direction="column" 
                justifyContent="center"
                alignItems="center"
                className='popup-header'>
                    <Grid item >
                        <div className='header-icon'>
                           <img src={thankImg} style={{width:'100%'}}/>
                        </div>
                    </Grid>
                    <Grid   container  
                            direction="column" 
                            justifyContent="center"
                            alignItems="center">
                        <h1>Thank you for feedback!</h1>
                        <p className='subtitle'>Your feedback is very important to us, so we know how our customers feel and give us opportunities to improve our service.</p>
                    </Grid>
            </Grid>
    
            <Grid container gap={2}>
                    <Button variant="outlined" style={{
                            background:'#E42346',
                            color:'#fff',
                            width:'100%',
                            height:'40px',
                            marginTop:'25px'
                    }} onClick={closePopup}>Next</Button>
                      
            </Grid>
            
        </Grid>
</div>  
    )
}

