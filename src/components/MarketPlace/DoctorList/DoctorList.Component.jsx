import React, { useState, useEffect } from 'react'
import Doctor from '../../../assets/images/doctor1.png'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import './DoctorList.Component.css'
import Button from '@mui/material/Button'
import history from '../../../history'
import ViewImageComponent from '../../Shared/AppointmentCalender/ViewImage/ViewImage.Component'
import DoctorItem from './DoctorItem.Component'

const columns = [
  { id: 'id', label: 'ID', minWidth: '0px', align: 'left', visible: false },
  { id: 'pic', label: '', minWidth: '80px', align: 'center', visible: true },
  { id: 'Name', label: 'Name', minWidth: '200px', align: 'left', visible: true },
  { id: 'specilaty', label: 'Speciality', minWidth: '160px', align: 'left', visible: true },
  { id: 'location', label: 'Location', minWidth: '160px', align: 'left', visible: true },
  { id: 'availability', label: 'Availability', minWidth: '120px', align: 'left', visible: false },
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

const DoctorListComponent = props => {
  console.log('proops', props)
  const [doctorList, setDoctorList] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // const doctorList =props.doctorsList;

  useEffect(() => {
    let result = props.doctorsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    setDoctorList(result)
  }, [props.doctorsList])

  useEffect(() => {
    let result = props.doctorsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    setDoctorList(result)
  }, [page, rowsPerPage])

  return (
    <div>
      <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer id="scrollableDiv">
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
                {doctorList && doctorList.map(row => <DoctorItem row={row} />)}
                {(!doctorList || (doctorList && doctorList.length == 0)) && (
                  <div style={{ padding: 10, width: '200px' }}>
                    <span>No records found</span>
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            count={props.doctorsList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  )
}

export default DoctorListComponent
