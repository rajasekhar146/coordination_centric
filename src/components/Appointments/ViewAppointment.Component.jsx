import React, { useEffect, useState } from 'react'

import history from '../../history';
import { useParams } from 'react-router-dom'
import { appointmentService } from '../../services'
import ViewImageComponent from '../Shared/AppointmentCalender/ViewImage/ViewImage.Component'
import view_details from '../../assets/icons/Vector.svg'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import moment from 'moment'
import galary_icon from '../../assets/icons/galary_icon.png';
import get from 'lodash.get';
import { authenticationService } from '../../services'
import CircleIcon from '@mui/icons-material/Circle'

function ViewAppointmentComponent() {

  const { id } = useParams()
  const [appointmentList, setAppointmentList] = useState([]);
  const [showImage , setShowImage] = useState(false);
  const [imageValue, setImageValue ] = useState();
  const currentUser = authenticationService.currentUserValue
  const role = get(currentUser, ['data', 'data', 'role'], '')

  useEffect(() => {
    getAppointmentDetails()
}, [])

const openImage = (docs)=>{
  setShowImage(true);
  setImageValue(docs);
}
const handleClose = () =>{
  setShowImage(false);
}
const getAppointmentDetails = async () => {
    let res = await appointmentService.getAppointmentById(id);
    setAppointmentList(res.data);
    console.log('params' , res.data)
}

const colorcodes = {
  accepted: '#12B76A',
  pending: '#7A5AF8',
  cancelled: '#757500',
  declined: '#B42318',
  request_to_reschedule: '#F79009',
  rescheduled: '#F79009'
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
}

const getValue = val => {
  switch (val) {
      case 'accepted':
          return 'Confirmed'
          break

      case 'cancelled':
          return 'Cancelled'
          break
      case 'pending':
          return 'Pending acceptance'
          break
      case 'accepted':
          return 'Accepted'
          break
      case 'declined':
          return 'Declined'
          break
      case 'request_to_reschedule':
          return 'Requested to Re-schedule'
          break
      case 'rescheduled':
          return 'Rescheduled'
      default:
          return null
  }
}

    return (
      <div className="view-app">
        <div className="view-header"> 
        
        <button
          onClick={() => {
            history.push('/appointments')
          }}
          className="ac__back__btn view_appointment_back"
        >
          <ArrowBackIosNewIcon className="arrow_align" fontSize="sm" />
          <span>Back</span>
        </button>
        <div className="od__title__text">Appointments Summary</div>

        <div className={`od__${appointmentList.data?.appointmentStatus?.toLowerCase()}__status align_status`}>
                            <CircleIcon fontSize="small" sx={{ color: colorcodes[appointmentList.data?.appointmentStatus?.toLowerCase()] }} />
                            <div className={`od__${appointmentList.data?.appointmentStatus?.toLowerCase()}__label`}>
                                {getValue(appointmentList.data?.appointmentStatus)}
                            </div>
                        </div>
        </div>

        <div className="summary-page">
          <div className="row-details">
            <p className="row-title">{role == 'doctor' ? 'Patient' : 'Doctor'}</p>

            { role == 'doctor' && <p className="row-data flex-dr">
            <img src={appointmentList.data?.profilePicPatient} alt="Profile" className="nb__profile__image" />
            {/* <ViewImageComponent category={'doctors_certificate'} pic={appointmentList.data?.profilePicPatient} imageClass={"ap_profile mar-right-10"} /> */}
              <p>{ appointmentList.data?.patientName}</p>
            </p> }
            { role != 'doctor' && <p className="row-data flex-dr">
            <img src={appointmentList.data?.profilePic} alt="Profile" className="nb__profile__image" />
            {/* <ViewImageComponent category={'doctors_certificate'} pic={appointmentList.data?.profilePic} imageClass={"ap_profile mar-right-10"} /> */}
              <p>{ appointmentList.data?.doctorName}</p>
            </p> }
          </div>
          {role == 'patient' && <div className="row-details">
            <p className="row-title">Specialty</p>
            <p className="row-data">{appointmentList.data?.speciality.map((d)=>
            <span>{d} </span> )}</p>
          </div> }
          <div className="row-details">
            <p className="row-title">Date / Time</p>
            <p className="row-data">
            {moment(new Date(appointmentList.data?.startTime)).format('ddd, Do MMMM YYYY ')}
          </p>
          </div>
          <div className="row-details">
            <p className="row-title">Reason for appointment</p>
            <p className="row-data">{appointmentList.data?.appointmentReason}</p>
          </div>
          <div className="row-details">
            <p className="row-title">Previous Health Condition</p>
            <p className="row-data">
            {appointmentList.data?.healthinfo[0]?.problems.map((d) =><span> {d} </span>)}</p>

          </div>
          <div className="row-details">
            <p className="row-title">Documents</p>
            <p className="row-data">{appointmentList.data?.documents.map((docs) => 
                <span className="docs-view" >
                  <img src={galary_icon} className="galary_icon" alt="success_icon" />

                  <img onClick={()=>{
                  openImage(docs)
                }} src={view_details} className="right" alt="success_icon" />
                  <p className="align__img__name"> {docs}</p> 
                   </span>
              
            )}</p>
          </div>
          <Modal
                open={showImage}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={confirmAppointment}>
                <img src={imageValue} className="galary_icon" alt="success_icon" />
                {/* <ViewImageComponent category={'doctors_certificate'} pic={imageValue} imageClass={"show_img_div"} showClose = 'true' handleClose={handleClose} /> */}
                </Box>
            </Modal>
        </div>
      </div>
    )

}


export default ViewAppointmentComponent;

