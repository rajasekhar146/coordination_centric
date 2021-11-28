import React from 'react'
import AppointmentCalenderComponent from '../../../Shared/AppointmentCalender/AppointmentCalender.Component'
import DoctorBioDetailsComponent from '../DoctorBioDetails/DoctorBioDetails.Component'
import './MakeAppointments.Component.css'

const MakeAppointmentsComponent = () => {
  return (
    <div className="ma__main__div">
      <div className="ma__row">
        <DoctorBioDetailsComponent />
      </div>
      <div className="ma__row">
        <div className="ma__appointment">
          <AppointmentCalenderComponent />
        </div>
      </div>
    </div>
  )
}

export default MakeAppointmentsComponent
