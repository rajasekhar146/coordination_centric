import React from 'react'
import ApproveAppointmentImage from '../../assets/images/approve_ppointment.png' //'../../assets/images/approve_ppointment.png'
import Button from '@mui/material/Button'

const AppointmentApproveRequest = (props) => {
  return (
    <div className="aar__main__div">
      <div className="aar__row">
        <img src={ApproveAppointmentImage} alt="Appointment" />
      </div>
      <div className="aar__row">
        <div className="aar__title">Appointment Request Submitted</div>
      </div>
      <div className="aar__row">
        <div className="aar__thank__text">
          Thanks for your appointment request. In 24h hours you’ll receive a confirmation of this appointment.
        </div>
      </div>
      <div className="aar__row">
        <Button className="aar__close__btn" onClick={props.clickRequestClose} >Close</Button>
      </div>
    </div>
  )
}

export default AppointmentApproveRequest
