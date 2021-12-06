import React, {useEffect, useState} from 'react'
import './HighlightedDoctors.Component.css'
import Doctor from '../../../assets/images/doctor1.png'
import TopDoctorComponent from '../TopDoctor/TopDoctor.Component'
import {appointmentService} from '../../../services'
import get from 'lodash.get'
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
  const [doctors, setDoctors] = useState([])
  useEffect( async () => {
    const response = await appointmentService.getHighlightedDoctorsList().catch(err => {console.log(err)})
    const data = get(response, ['data', 'data'], '')
    setDoctors(data)
    console.log('high', data)
  }, [])
  return (
    <div className="hd__main__div">
      <div className="hd__row">
        {doctors &&
          doctors.map(doctor => {
            return <TopDoctorComponent doctor={doctor} />
          })}
      </div>
    </div>
  )
}

export default HighlightedDoctorsComponent
