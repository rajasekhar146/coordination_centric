import React from 'react'
import './TopDoctor.Component.css'
import Button from '@mui/material/Button'
import history from '../../../history'
import Doctor from '../../../assets/images/doctor1.png'
import ViewImageComponent from '../../Shared/AppointmentCalender/ViewImage/ViewImage.Component'
const TopDoctorComponent = props => {
  const { _id, name, speciality, profilePic } = props.doctor
  return (
    <div className="tdl__main__div">
      <div className="tdl__row">
        <div>
          <img src={profilePic} alt={speciality} className="tdl__image" />
          {/* <ViewImageComponent category={'doctors_certificate'} pic={profilePic} imageClass={"tdl__image"} /> */}
          {/* profilePic */}
        </div>
      </div>
      <div className="tdl__row">
        {' '}
        <div className="tdl__doctor__name">{name}</div>
      </div>

      <div className="tdl__row">
        <div className="tdl__doctor__desc">{speciality}</div>
      </div>
      <div className="tdl__row">
        <div className="tdl__action__section">
          {' '}
          <Button className="tdl__button" onClick={() => history.push({
              pathname: '/marketplace/make-a-appointments',
              state: { id: _id, name: name }
              })}>
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopDoctorComponent
