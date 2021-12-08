import React, { useEffect, useState } from 'react'
import PatientAvatar from './patient-avatar.png';
import './PatientRecordsDeatils.css';
import CloseIcon from '@mui/icons-material/Close';
import {appointmentService} from '../../../services'
import moment from 'moment'
import galary_icon from '../../../assets/icons/galary_icon.png';
import view_details from '../../../assets/icons/Vector.svg'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
const PatientRecordsDeatils = (props) => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [showImage , setShowImage] = useState(false);
    const [imageValue, setImageValue ] = useState();
    const {
       rowData,
       meetingid
    } = props

    useEffect(() => {
        getPatientRecords();
    }, []);

    const openImage = (docs)=>{
        setShowImage(true);
        setImageValue(docs);
      }
      const closePopup = () =>{
        setShowImage(false);

      }
    const getPatientRecords =async () =>{
        let res = await appointmentService.getAppointmentById(props.roomId);
        setAppointmentData(res.data);
    }
    const confirmAppointment = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid white',
        boxShadow: 24,
        borderRadius: 3,
        p: 3,
        minHeight: 340
      }
    return (
        <div className="patient-deatils-wrap">
                <div className="patient-deatils-header">
                    <div className="patient-deatils-title">
                        Patient Record
                    {/* <CloseIcon className="right" onClick={props.closeList} /> */}
                    </div>
                    <div className="patient-deatils-info">
                        <p className="main-title"> Doctor</p>
                        <div className="patient-img-wrp">
            <img src={appointmentData.data?.profilePic} alt="Profile" className="nb__profile__image" />
                            <p className="patient-name"> {appointmentData.data?.doctorName}</p>
                        </div>
                    </div>
                </div>
                <div className="patient-list-wrp">
                        <ul className="patient-list">
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Specialty </p>
                                    <p className="sub-title">{appointmentData.data?.speciality?.map((d)=>
            <span>{d} </span> )}</p>
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Date / Time </p>
                                    <p className="sub-title">  {moment(new Date(appointmentData.data?.startTime)).format('ddd, Do MMMM YYYY ')} </p>
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Reason for appointment </p>
                                    <p className="sub-title"> {appointmentData.data?.appointmentReason} </p>
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Previous Health Condition </p>
                                    <p className="sub-title"> 
            {appointmentData.data?.healthinfo?.[0]?.problems.map((d) =><span> {d} </span>)}</p>
                                    
                    
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Documents </p>
                                    <p className="sub-title">{appointmentData.data?.documents?.map((docs) => 
                <span className="docs-view" >
                  <img src={galary_icon} className="galary_icon" alt="success_icon" />

                  <img onClick={()=>{
                  openImage(docs)
                }} src={view_details} className="right" alt="success_icon" />
                  <p className="align__img__name"> {docs.slice(-18)}</p> 
                   </span>
              
            )}</p>
                                </div>
                            </li>
                        </ul>
                </div>
                <Modal
                open={showImage}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={confirmAppointment}>
                    <div>
                        <CloseIcon onClick={closePopup} className="right" />
                  <img src={imageValue} className="galary_icon" alt="success_icon" />
                  </div>

                {/* <ViewImageComponent category={'doctors_certificate'} pic={imageValue} imageClass={"show_img_div"} showClose = 'true' handleClose={handleClose} /> */}
                </Box>
            </Modal>
        </div>
    )
}
export default PatientRecordsDeatils;