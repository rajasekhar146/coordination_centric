import React from 'react'
import DoctorListComponent from './DoctorList/DoctorList.Component'
import DoctorsearchComponent from './DoctorSearch/Doctorsearch.Component'
import HighlightedDoctorsComponent from './HighlightedDoctors/HighlightedDoctors.Component'
import './Marketplace.Component.css'

const MarketplaceComponent = () => {
  return (
    <div className="mp__main__div">
      <div className="mp__title__text">Highlighted Doctors</div>
      <DoctorsearchComponent />
      <HighlightedDoctorsComponent />
      <DoctorListComponent />
    </div>
  )
}

export default MarketplaceComponent
