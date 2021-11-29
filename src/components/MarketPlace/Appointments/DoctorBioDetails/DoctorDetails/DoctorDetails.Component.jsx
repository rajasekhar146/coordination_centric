import React from 'react'
import Doctor from '../../../../../assets/images/doctor1.png'
import './DoctorDetails.Component.css'

const DoctorDetailsComponent = () => {
  return (
    <div className="db__main__div">
      <div className="db__row">
        <img src={Doctor} alt="Doctor" className="db__pic" />
      </div>
      <div className="db__row db__details__background__white">
        <div className="db__details">
          <div className="db__row">
            <div className="db__doctor__name">Dr. Anna Choy</div>
          </div>
          <div className="db__row">
            <div className="db__specialist__detail">Reproductive Endocrinologist</div>
          </div>
          <div className="db__row">
            <div className="db__description">[Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam]</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailsComponent
