import React from 'react'
import NavMonthYearComponent from './NavMonthYear/NavMonthYear.Component'
import WeekDaysViewComponent from './WeekDaysView/WeekDaysView.Component'
import { useSelector } from 'react-redux'
import './AppointmentCalender.Component.css'

const AppointmentCalenderComponent = props => {
  const [doctorDetails, setDoctorDetails] = React.useState(useSelector(state => state.doctorDetails))
  console.log(doctorDetails)
  console.log('AppointmentCalenderComponent', props)
  const doctorId = props.id
  const doctorName = props.name

  return (
    <div className="acv__main__div">
      <div className="acv__row acv__appointment__text">Make an Appointment</div>
      <div className="acv__row acv__subtitle__text">
        Choose your primary and secondary prefered date from the available slots.
      </div>
      <NavMonthYearComponent />
      <WeekDaysViewComponent id={doctorId} name={doctorName} appointmentDetails={doctorDetails} />
    </div>
  )
}

export default AppointmentCalenderComponent
