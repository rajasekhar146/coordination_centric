import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import history from '../../history'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import AppointmentItem from './AppointmentItem.Component'
import ConfimationAppointment from '../ModelPopup/ConfimationAppointment.Component'
import RescheduuleAppointment from '../ModelPopup/RescheduuleAppointment.Component'

const confirmAppointment = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    borderRadius: 3,
    p: 2,
  }
  

const Appointments = [
    {
        name: 'Rajasekhar',
        profile: require('../../assets/icons/default_profile_image.png').default,
        location: 'chenni',
        date: 'Wed, 6th Nov',
        time: '8am - 9am',
        status: 'confirmed',
    },
    {
        name: 'Ram',
        profile: require('../../assets/icons/default_profile_image.png').default,
        location: 'chenni',
        date: 'Wed, 6th Nov',
        time: '8am - 9am',
        status: 'pending_acceptance',
    },
    {
        name: 'Raj',
        profile: require('../../assets/icons/default_profile_image.png').default,
        location: 'chenni',
        date: 'Wed, 6th Nov',
        time: '8am - 9am',
        status: 'declined',
    },
    {
        name: 'Jhon',
        profile: require('../../assets/icons/default_profile_image.png').default,
        location: 'chenni',
        date: 'Wed, 6th Nov',
        time: '8am - 9am',
        status: 'requested_to_reschedule',
    }
]

const UpcomongAppointmentComponent = props => {
    const {

    } = props
    const [isConfirmClicked, setIsConfirmClicked] = useState(false)
    const [isResheduleClicked, setIsRescheduleClicked] = useState(false)

    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const closeApproveModel = () => {
        setIsConfirmClicked(false)
        setIsRescheduleClicked(false)
      }

    const columns = [
        { id: 'profile', label: 'profile', minWidth: 50, align: 'left', visible: true },
        { id: 'name', label: 'name', minWidth: 50, align: 'left', visible: true },
        { id: 'location', label: 'location', minWidth: 150, align: 'left', visible: true },
        { id: 'date', label: 'date', minWidth: 100, align: 'left', visible: true },
        { id: 'time', label: 'time', minWidth: 120, align: 'left', visible: true },
        { id: 'status', label: 'status', minWidth: 200, align: 'left', visible: true },
        { id: 'action', label: 'Action', minWidth: 30, align: 'center', visible: true },
    ]

    return (
        <div>
            <Paper sx={{ width: '100%', height: '40%', overflow: 'hidden' }}>
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
                            {Appointments.map((row, index) => (
                                <AppointmentItem
                                    row={row}
                                    index={index}
                                    columns={columns}
                                    setIsConfirmClicked={setIsConfirmClicked}
                                    setSelectedAppointment={setSelectedAppointment}
                                    setIsRescheduleClicked={setIsRescheduleClicked}
                                // colorcodes={colorcodes}
                                />
                            ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={isConfirmClicked}
                    // onClose={setIsAcceptClicked}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={confirmAppointment}>
                        <ConfimationAppointment
                            clickCloseButton={closeApproveModel}
                            // setSkip={setSkip}
                            selectedAppointment={selectedAppointment}
                            // setOrganizations={setOrganizations}
                            // setOpenFlash={setOpenFlash}
                            // setAlertMsg={setAlertMsg}
                            // setSubLabel={setSubLabel}
                        />
                    </Box>
                </Modal>
                <Modal
                    open={isResheduleClicked}
                    // onClose={setIsAcceptClicked}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={confirmAppointment}>
                        <RescheduuleAppointment
                            clickCloseButton={closeApproveModel}
                            // setSkip={setSkip}
                            selectedAppointment={selectedAppointment}
                            // setOrganizations={setOrganizations}
                            // setOpenFlash={setOpenFlash}
                            // setAlertMsg={setAlertMsg}
                            // setSubLabel={setSubLabel}
                        />
                    </Box>
                </Modal>
            </Paper>
        </div>
    );
}
export default UpcomongAppointmentComponent