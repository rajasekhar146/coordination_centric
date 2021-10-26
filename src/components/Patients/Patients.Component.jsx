import React from 'react'
import Button from '@mui/material/Button'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import CircleIcon from '@mui/icons-material/Circle'


const columns = [
  // { id: '_id', label: 'ID', minWidth: 20, align: 'left' },
  { id: 'AppointmentType', label: 'Appointment Type', minWidth: 200, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 50, align: 'center' },
]

const rows = [
  { name: "Rajasekhar", email: "raj@gmail.com", date: "05-10-2021" },
  { name: "Raj", email: "raju@gmail.com", date: "05-10-2021" },
  { name: "Jhon", email: "jhon@gmail.com", date: "05-10-2021" },
  { name: "Virat", email: "virat@gmail.com", date: "05-10-2021" },
  { name: "Rohit", email: "rohit@gmail.com", date: "05-10-2021" },
]

const PatientsComponent = () => {
  return (
    <div className="od__main__div">
      <div className="od__row">
        <div className="od__title__text">Patients</div>
        <div className="od__btn__div od__align__right">
          {1 === 1 ? (
            <Button className="od__add__organization__btn">
              <AddCircleOutlineOutlinedIcon /> &nbsp;&nbsp; Add Patient
            </Button>
          ) : null}
        </div>
      </div>
      <div className="od__row">
        <div className="od__table__org">
          <Paper sx={{ width: '100%', height: '40%', overflow: 'hidden' }}>
            <TableContainer id="scrollableDiv" sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>
                      Name
                    </TableCell>
                    <TableCell  style={{ fontWeight: 'bold', fontSize: 14 }}>
                      Email
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>
                      Date Joined
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>
                      Status
                    </TableCell>
                    <TableCell align={'right'} style={{ fontWeight: 'bold', fontSize: 14 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        key={index}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        key={index}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        key={index}
                      >
                        {row.date}
                      </TableCell>
                      <TableCell
                        key={index}
                        // align={'center'}
                      >
                        <CircleIcon fontSize="small" sx={{ color: "#027A48" }} />

                      </TableCell>
                      <TableCell
                        key={index}
                        align={'right'}
                      >
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls="long-menu"
                          aria-haspopup="true"

                        >
                          <MoreVertRoundedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default PatientsComponent
