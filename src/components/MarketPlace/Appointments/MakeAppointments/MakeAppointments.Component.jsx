import React from 'react'
import AppointmentCalenderComponent from '../../../Shared/AppointmentCalender/AppointmentCalender.Component'
import DoctorBioDetailsComponent from '../DoctorBioDetails/DoctorBioDetails.Component'
import './MakeAppointments.Component.css'
import { useLocation } from "react-router-dom";

const MakeAppointmentsComponent = (props) => {
  
  const location = useLocation();
  console.log("props.id",location.state.id);
  const doctorId = location.state.id;
  const doctorName =location.state.name;
  return (
    <div className="ma__main__div">
      <div className="ma__row">
        <DoctorBioDetailsComponent id={doctorId} />
      </div>
      <div className="ma__row">
        <div className="ma__appointment">
          <AppointmentCalenderComponent id={doctorId} name={doctorName}/>
        </div>
      </div>
    </div>
  )
}

export default MakeAppointmentsComponent
