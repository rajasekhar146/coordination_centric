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


const columns = [
  // { id: '_id', label: 'ID', minWidth: 20, align: 'left' },
  { id: 'AppointmentType', label: 'Appointment Type', minWidth: 200, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 50, align: 'center' },
]

const AppointmentsComponent = () => {
  return (
    <div className="od__main__div">
      <div className="od__row">
        <div className="od__title__text">Appointments</div>
        <div className="od__btn__div od__align__right">
          {1 === 1 ? (
            <Button className="od__add__organization__btn">
              <AddCircleOutlineOutlinedIcon /> &nbsp;&nbsp; Add Appointment
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
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: 14 }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsComponent
