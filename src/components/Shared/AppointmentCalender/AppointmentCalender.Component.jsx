import React from 'react'
import NavMonthYearComponent from './NavMonthYear/NavMonthYear.Component'
import WeekDaysViewComponent from './WeekDaysView/WeekDaysView.Component'
import './AppointmentCalender.Component.css'
const AppointmentCalenderComponent = () => {
  return (
    <div className="acv__main__div">
      <div className="acv__row acv__appointment__text">Make an Appointment</div>
      <div className="acv__row acv__subtitle__text">
        Choose your primary and secondary prefered date from the available slots.
      </div>
      <NavMonthYearComponent />
      <WeekDaysViewComponent />
    </div>
  )
}

export default AppointmentCalenderComponent
