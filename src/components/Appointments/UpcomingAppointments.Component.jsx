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
import RejectAppointment from '../ModelPopup/RejectAppointment.Component'
import AppointmentInfoPopup from '../ModelPopup/AppointmentInfoPopup'
import ScheduleCalendar from '../ScheduleCalendar/ScheduleCalendar.Component';
import { appointmentService } from '../../services'
import get from 'lodash.get';
import { authenticationService } from '../../services'
import moment from 'moment'

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


const appointmentInfo = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
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
        gender: 'female',
        _id: '61571c7e38f9f7305ef3a64c'
    },
    {
        name: 'Ram',
        profile: require('../../assets/icons/default_profile_image.png').default,
        location: 'chenni',
        date: 'Wed, 6th Nov',
        time: '8am - 9am',
        status: 'pending_acceptance',
        gender: 'male',
        _id: '61571c7e38f9f7305ef3a64c'
    },
    {
        name: 'Raj',
        profile: require('../../assets/icons/default_profile_image.png').default,
        location: 'chenni',
        date: 'Wed, 6th Nov',
        time: '8am - 9am',
        status: 'declined',
        gender: 'male',
        _id: '61571c7e38f9f7305ef3a64c'
    },
    {
        name: 'Jhon',
        profile: require('../../assets/icons/default_profile_image.png').default,
        location: 'chenni',
        date: 'Wed, 6th Nov',
        time: '8am - 9am',
        status: 'requested_to_reschedule',
        gender: 'male',
        _id: '61571c7e38f9f7305ef3a64c'
    }
]

const UpcomongAppointmentComponent = props => {
    const {
        showGrid,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        type,
        handleNavigation
    } = props
    const [isConfirmClicked, setIsConfirmClicked] = useState(false)
    const [isRejectClicked, setIsRejectClicked] = useState(false)
    const [isResheduleClicked, setIsRescheduleClicked] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [isViewClicked, setIsViewClicked] = useState(false)
    const [appointmentList, setAppointmentList] = useState([])
    const currentUser = authenticationService.currentUserValue
    const userId = get(currentUser, ['data', 'data', '_id'], '')
    const [limit, setLimit] = useState(0)
    const [skip, setSkip] = useState(10)

    const closeConformModel = () => {
        setIsConfirmClicked(false)
    }
    const closeRejectModel = () => {
        setIsRejectClicked(false)
    }
    const closeRescheduleModel = () => {
        setIsRescheduleClicked(false)
    }

    const closeAppointmentInfoModel = () => {
        setIsViewClicked(false)
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

    const getAppointmentList = async () => {
        let res;
        let date;
        if (type === 'upcoming') {
            date = moment(new Date()).format("YYYY-MM-DD");
        } else {
            date = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD");
        }
        res = await appointmentService.getAppointments(userId, date, type, limit, skip)
        if (res.status === 200) {
            setAppointmentList(get(res, ['data', 'data', '0', 'totalData'], []))
        } else {

        }

    }

    useEffect(() => {
        getAppointmentList()
    }, [appointmentList.length, skip])


    return (
        <div>
            {showGrid
                ? <Paper sx={{ width: '100%', height: '40%', overflow: 'hidden' }}>
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
                                        setIsViewClicked={setIsViewClicked}
                                        setIsRejectClicked={setIsRejectClicked}
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
                                clickCloseButton={closeConformModel}
                                selectedAppointment={selectedAppointment}
                                setOpenFlash={setOpenFlash}
                                setAlertMsg={setAlertMsg}
                                setSubLabel={setSubLabel}
                            />
                        </Box>
                    </Modal>
                    <Modal
                        open={isRejectClicked}
                        // onClose={setIsAcceptClicked}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={confirmAppointment}>
                            <RejectAppointment
                                clickCloseButton={closeRejectModel}
                                setIsRescheduleClicked={setIsRescheduleClicked}
                                selectedAppointment={selectedAppointment}
                                setOpenFlash={setOpenFlash}
                                setAlertMsg={setAlertMsg}
                                setSubLabel={setSubLabel}
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
                                clickCloseButton={closeRescheduleModel}
                                // setSkip={setSkip}
                                selectedAppointment={selectedAppointment}
                                setOpenFlash={setOpenFlash}
                                setAlertMsg={setAlertMsg}
                                setSubLabel={setSubLabel}
                                handleNavigation={handleNavigation}
                            />
                        </Box>
                    </Modal>
                    <Modal
                        open={isViewClicked}
                        // onClose={setIsAcceptClicked}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={appointmentInfo}>
                            <AppointmentInfoPopup
                                clickCloseButton={closeAppointmentInfoModel}
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
                :
                <ScheduleCalendar />

            }

        </div>
    );
}
export default UpcomongAppointmentComponent