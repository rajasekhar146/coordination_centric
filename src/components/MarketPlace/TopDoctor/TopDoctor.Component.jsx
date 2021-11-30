import React from 'react'
import './TopDoctor.Component.css'
import Button from '@mui/material/Button'
import history from '../../../history'

const TopDoctorComponent = props => {
  const { id, name, desc, pic } = props.doctor
  return (
    <div className="tdl__main__div">
      <div className="tdl__row">
        <div>
          <img src={pic} alt={desc} className="tdl__image" />
        </div>
      </div>
      <div className="tdl__row">
        {' '}
        <div className="tdl__doctor__name">{name}</div>
      </div>

      <div className="tdl__row">
        <div className="tdl__doctor__desc">{desc}</div>
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
