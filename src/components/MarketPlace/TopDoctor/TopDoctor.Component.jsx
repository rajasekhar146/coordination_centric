import React from 'react'
import './TopDoctor.Component.css'
import Button from '@mui/material/Button'
import history from '../../../history'
import Doctor from '../../../assets/images/doctor1.png'
const TopDoctorComponent = props => {
  const { id, name, speciality, pic } = props.doctor
  return (
    <div className="tdl__main__div">
      <div className="tdl__row">
        <div>
          <img src={Doctor} alt={speciality} className="tdl__image" />
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
          <Button className="tdl__button" onClick={() => history.push('/marketplace/make-a-appointments')}>
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopDoctorComponent
