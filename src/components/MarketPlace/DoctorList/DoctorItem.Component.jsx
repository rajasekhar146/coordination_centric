import React, { useState, useEffect } from 'react'

import TableCell from '@mui/material/TableCell'

import TableRow from '@mui/material/TableRow'
import './DoctorList.Component.css'
import Button from '@mui/material/Button'
import ViewImageComponent from '../../Shared/AppointmentCalender/ViewImage/ViewImage.Component'
import { setDoctorDetials } from '../../../redux/actions/appointmentActions'
import { useDispatch } from 'react-redux'
import history from '../../../history'



const DoctorListComponent = (props) => {
    const {
        row,
    } = props
    const dispatch = useDispatch()


    const handleBookAppointment = () => {
        dispatch(setDoctorDetials(row))
        history.push({
            pathname:'/marketplace/make-a-appointments',
            state:{id:row._id,name:row.name,availability:row.availabilityArray}
        })
      }

    return (<TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">
            {/* <img src={Doctor} alt={row.speciality} className="dl__pic" /> */}
            <ViewImageComponent category={'doctors_certificate'} pic={row.pic} imageClass={"dl__pic"} />
        </TableCell>
        <TableCell component="th" scope="row" align="left">
            {row.name}
        </TableCell>
        <TableCell align="left">{row.speciality}</TableCell>
        <TableCell align="left">{row.location}</TableCell>
        {/* <TableCell align="left">{row.availability}</TableCell> */}
        <TableCell align="center">
            <Button className="dl__button" onClick={handleBookAppointment}>
                Book
            </Button>
        </TableCell>
    </TableRow>
    )
}

export default DoctorListComponent
