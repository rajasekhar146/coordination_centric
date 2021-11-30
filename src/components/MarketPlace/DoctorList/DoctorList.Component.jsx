import React,{useState} from 'react'
import Doctor from '../../../assets/images/doctor1.png'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import './DoctorList.Component.css'
import Button from '@mui/material/Button'
import history from '../../../history'

const columns = [
  { id: 'id', label: 'ID', minWidth: '0px', align: 'left', visible: false },
  { id: 'pic', label: '', minWidth: '80px', align: 'center', visible: true },
  { id: 'Name', label: 'Name', minWidth: '200px', align: 'left', visible: true },
  { id: 'specilaty', label: 'Specilaty', minWidth: '160px', align: 'left', visible: true },
  { id: 'location', label: 'Location', minWidth: '160px', align: 'left', visible: true },
  { id: 'availability', label: 'Availability', minWidth: '120px', align: 'left', visible: true },
  { id: 'action', label: 'Actions', minWidth: '100px', align: 'center', visible: true },
]

// const doctorList = [
//   {
//     id: 1,
//     name: 'Prakash',
//     speciality: 'Geriatrician',
//     location: 'USA, New Orleans',
//     availability: '8:00am - 6:00pm',
//     pic: Doctor,
//     action: '',
//   },
//   {
//     id: 2,
//     name: 'Prakash',
//     speciality: 'Geriatrician',
//     location: 'USA, New Orleans',
//     availability: '8:00am - 6:00pm',
//     pic: Doctor,
//     action: '',
//   },
//   {
//     id: 3,
//     name: 'Prakash',
//     speciality: 'Geriatrician',
//     location: 'USA, New Orleans',
//     availability: '8:00am - 6:00pm',
//     pic: Doctor,
//     action: '',
//   },
//   {
//     id: 4,
//     name: 'Prakash',
//     speciality: 'Geriatrician',
//     location: 'USA, New Orleans',
//     availability: '8:00am - 6:00pm',
//     pic: Doctor,
//     action: '',
//   },
//   {
//     id: 5,
//     name: 'Prakash',
//     speciality: 'Geriatrician',
//     location: 'USA, New Orleans',
//     availability: '8:00am - 6:00pm',
//     pic: Doctor,
//     action: '',
//   },
// ]
const DoctorListComponent = (props) => {
  console.log("proops",props);
  
  const doctorList =props.doctorsList;
  return (
    <div>
      <div>
  
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer id="scrollableDiv" sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column =>
                    column.visible ? (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          width: column.minWidth,
                          fontWeight: 'bold',
                          fontSize: 14,
                          visibility: column.visible ? 'visible' : 'hidden',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ) : null
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {doctorList &&
                  doctorList.map(row => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">
                        <img src={Doctor} alt={row.speciality} className="dl__pic" />
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.speciality}</TableCell>
                      <TableCell align="left">{row.location}</TableCell>
                      <TableCell align="left">{row.availability}</TableCell>
                      <TableCell align="center">
                        <Button className="dl__button" onClick={() => history.push('/marketplace/make-a-appointments')}>
                          Book
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  )
}

export default DoctorListComponent
