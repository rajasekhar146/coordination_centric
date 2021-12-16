import React, {useState} from 'react';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import store from '../../../../redux/store';
import {PatientFeedbackService} from './PatientFeedbackService';
import {setShowApplicationPopup,setApplicationPopupVal} from '../../../../redux/actions/video-call-actions';
import './PatientFeedback.css';

export default function PatientFeedback() {
    //className="patient-feedback popup-main-content">
    const [appointment, setAppointment] = useState("");
    const [starRateValue, setStarRateValue] = useState(0);
    const [comment, setComment] = useState("");
    const [charCount, setCharCount] = useState(0);
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
        let maxChar = 300;
        setCharCount(maxChar - event.target.value.length)
        setComment(event.target.value)
    }
    const submitFeedbackHandel = ()=>{
        if(appointment && starRateValue > 0 && comment){
            store.dispatch(setShowApplicationPopup(true));
            store.dispatch(setApplicationPopupVal("PatientFeedbackThank"));
            let postFeedbackData = {
                howAppointment:appointment,
                appointmentId:store.getState().videoCallReducer.roomId,
                ratin: starRateValue,
                comment:comment
            }
            PatientFeedbackService(postFeedbackData)

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
                        <div className='header-icon tow-round-icon'>
                            <MedicalServicesOutlinedIcon/>
                        </div>
                    </Grid>
                    <Grid   container  
                            direction="column" 
                            justifyContent="center"
                            alignItems="center">
                        <h1>Videocall Review</h1>
                        <p className='subtitle'>Please let us know how was your appointment.</p>
                    </Grid>
            </Grid>
            <Grid container direction="column" >
                    <Typography component="legend">How was the appointment?</Typography>
                    <div>
                        <TextField value={appointment} fullWidth id="how_appointment" onChange={appointmentValHandel}/>
                    </div>
            </Grid>
            <Grid container direction="column" >
            <Typography component="legend">How satisfied are you with this appointment?</Typography>
                            <Rating
                        name="simple-controlled"
                        value={starRateValue}
                        onChange={starRatingHandel}
                    />
            </Grid>
            <Grid container direction="column" >
            <Typography component="legend">Any Comments?</Typography>
                    <TextField
                        id="outlined-multiline-static"
                       multiline
                       value={comment}
                       className="comment-field"
                       erorText="Please enter only 12 digits number"
                        rows={2}
                        inputProps={{maxLength:300}}
                        onChange={commentHandel}
                        />
            <Typography className='max-char' component="legend">{charCount} characters left</Typography>
            </Grid>
            <Grid container gap={2}>
                    <Button variant="outlined" style={{
                        borderColor:'#52575C',
                        color:'#52575C',
                        width:'120px',
                        height:'40px',
                        marginTop:'25px'
                    }} onClick={closePopup}>Later</Button>
                        <Button  style={{
                            background:'#E42346',
                            color:'#fff',
                            width:'120px',
                            height:'40px',
                            marginTop:'25px'
                    }} onClick={submitFeedbackHandel} >Submit</Button>
            </Grid>
            
        </Grid>
</div>  
    )
}

