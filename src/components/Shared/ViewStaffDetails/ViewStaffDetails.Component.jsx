import React, { useEffect, useState } from 'react'




import { useParams } from 'react-router-dom'

// import view_details from '../../assets/icons/Vector.svg'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import moment from 'moment'
// import galary_icon from '../../assets/icons/galary_icon.png';
import get from 'lodash.get';
import CircleIcon from '@mui/icons-material/Circle'
import './ViewStaffDetails.Component.css'
import history from '../../../history'
import { appointmentService,authenticationService, memberService } from '../../../services'
import ViewImageComponent from '../AppointmentCalender/ViewImage/ViewImage.Component'

function ViewStaffDetailsComponent() {

  const { id,role } = useParams()
  const [userDetails, setUserDetails] = useState([]);
  const [showImage , setShowImage] = useState(false);
  const [imageValue, setImageValue ] = useState();
  const currentUser = authenticationService.currentUserValue;

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
    let res = await memberService.getDetailsById(id);
    setUserDetails(res.data.data);
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

const getAddress =()=>{
    return [userDetails.address,userDetails.city,userDetails.state,userDetails.country,userDetails.postalCode].filter(c=>c).join(', ');
}

    return (
      <div className="view-app">
        <div className="view-header"> 
        
        <button
          onClick={() => {
            history.goBack();
            // if(role =="staff"){
            //   history.push('/staff')
            // }
            // else if(role == "patient"){
            //   history.push('/patients')
            // }
          }}
          className="ac__back__btn view_appointment_back"
        >
          <ArrowBackIosNewIcon  />
          <span>Back</span>
        </button>
        <div className="od__title__text">{userDetails?.first_name||''} {userDetails?.last_name||''}</div>

       
        </div>

        <div className="summary-page">
          <div className="row-details">
            <p className="row-title">Photo</p>
              <p className="row-data flex-dr">
            <img src={userDetails.profilePic} className="ap_profile mar-right-10"/>          
            </p> 
            
          </div>
          
          <div className="row-details">
            <p className="row-title">Name</p>
            <p className="row-data">
            {userDetails?.first_name||''} {userDetails?.last_name||''}
          </p>
          </div>
          <div className="row-details">
            <p className="row-title">Email Address</p>
            <p className="row-data">{userDetails?.email}</p>
          </div>

        
          <div className="row-details">
            <p className="row-title">Phone Numbers</p>
            <p className="row-data">{userDetails?.phoneNo}</p>
          </div>
          <div className="row-details">
            <p className="row-title">Speciality</p>
            <p className="row-data">
            {userDetails?.speciality?.map((item)=>{
               return <p>{item.speciality_name}</p>
          })}
          </p>
          </div>
  
            <div className="row-details">
            <p className="row-title">Role</p>
            <p className="row-data capital">{userDetails?.role}</p>
          </div>

          <div className="row-details">
            <p className="row-title">SSN/ITIN</p>
            <p className="row-data">{userDetails?.ssn}</p>
          </div>

          <div className="row-details">
            <p className="row-title">Occupation</p>
            <p className="row-data">{userDetails?.occupation}</p>
          </div>

          <div className="row-details">
            <p className="row-title">Date of Birth</p>
            <p className="row-data">{moment(userDetails?.dob).format("MM/DD/YYYY")}</p>
          </div>

          <div className="row-details">
            <p className="row-title">Gender</p>
            <p className="row-data">{userDetails?.gender}</p>
          </div>

          <div className="row-details">
            <p className="row-title">Address/es</p>
            <p className="row-data">{getAddress()}</p>
          </div>

          <div className="row-details">
            <p className="row-title">Bio</p>
            <p className="row-data">{userDetails?.bio}</p>
          </div>
        </div>
      </div>
    )

}


export default ViewStaffDetailsComponent;

