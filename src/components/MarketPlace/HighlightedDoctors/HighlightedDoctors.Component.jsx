import React from 'react'
import './HighlightedDoctors.Component.css'
import Doctor from '../../../assets/images/doctor1.png'
import TopDoctorComponent from '../TopDoctor/TopDoctor.Component'

const TopDoctorList = [
  {
    id: 1,
    name: 'Dr. Ghassan Khamiseh',
    desc: 'Sports Medicine Specialist',
    pic: Doctor,
  },
  {
    id: 2,
    name: 'Dr. Anna Choy',
    desc: 'Reproductive Endocrinologist',
    pic: Doctor,
  },
  {
    id: 3,
    name: 'Dr. Elizabeth Mehrabian',
    desc: 'Endocrinologist',
    pic: Doctor,
  },
  {
    id: 1,
    name: 'Dr. Ghassan Khamiseh',
    desc: 'Sports Medicine Specialist',
    pic: Doctor,
  },
  {
    id: 1,
    name: 'Dr. Ghassan Khamiseh',
    desc: 'Sports Medicine Specialist',
    pic: Doctor,
  },
]

const HighlightedDoctorsComponent = () => {
  return (
    <div className="hd__main__div">
      <div className="hd__row">
        {TopDoctorList &&
          TopDoctorList.map(doctor => {
            return <TopDoctorComponent doctor={doctor} />
          })}
      </div>
    </div>
  )
}

export default HighlightedDoctorsComponent
