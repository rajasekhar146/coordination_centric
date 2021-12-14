import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { withStyles } from "@material-ui/core/styles";
import get from 'lodash.get'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { appointmentService, authenticationService } from '../../services'
import moment from 'moment'
import AppointmentItem from './DashboardAppointmentItem'

const styles = theme => ({
    card: {
        background: "#FFFFFF",
        width: "100%",
        margin: 10,
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px'
    },
    content: {
        display: 'flex',
        paddingBottom: '15px'
    }
});

const AppointmentList = (props) => {
    const {
        classes,
        checkDoctorOrPatent,
        dashboardDetails,
        role
    } = props

    const appointmentListArray = get(dashboardDetails, ['totalAppointments'], [])
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [appointmentList, setAppointmentList] = useState([])
    const currentUser = authenticationService.currentUserValue
    const userId = get(currentUser, ['data', 'data', '_id'], '')
    const [limit, setLimit] = useState(0)
    const [skip, setSkip] = useState(20)


    const columns = [
        { id: 'profile', label: 'profile', minWidth: 80, align: 'left', visible: true },
        { id: 'name', label: role === 'doctor' ? 'patient' : 'doctor', minWidth: 120, align: 'left', visible: true },
        { id: 'location', label: 'location', minWidth: 150, align: 'left', visible: true },
        { id: 'date', label: 'date', minWidth: 100, align: 'left', visible: true },
        { id: 'time', label: 'time', minWidth: 120, align: 'left', visible: true },
        { id: 'status', label: 'status', minWidth: 200, align: 'left', visible: true },
    ]

    useEffect(() => {
        let appointmentsArray = [];
        appointmentListArray.forEach(element => {
            let recordNew = {};
            if (role === "doctor") {
                recordNew = {
                    name: element?.userId?.first_name+ " " + (element?.userId?.last_name),
                    profile: element?.userId?.profilePic,
                    location: 'Online',
                    date: element?.startTime ? moment(element?.startTime).format('ddd, Do MMM') : "",
                    time: (element.startTime ? moment(element.startTime).format('h:mm a') : "") + " - " + (element.endTime ? moment(element.endTime).format('h:mm a') : ''),
                    status: element.status,
                    gender: element?.userId?.gender,
                    _id: element.userId._id,
                    appointmentid: element._id,
                    startTime: element.startTime,
                    endTime: element.endTime
                }

            } else {
                recordNew = {
                    name: element?.doctorId?.first_name + " " + element?.doctorId?.last_name ,
                    profile: element?.doctorId?.profilePic,
                    location: 'Online',
                    date: moment(element.startTime).format('ddd, Do MMM'),
                    time: element.startTime ? moment(element.startTime).format('h:mm a') : "" + " - " + element.endTime ? moment(element.endTime).format('h:mm a') : "",
                    status: element.status,
                    gender: 'male',
                    _id: element?.doctorId?._id,
                    appointmentid: element._id,
                    startTime: element.startTime,
                    endTime: element.endTime
                }
            }
            appointmentsArray.push(recordNew);
        });
        setAppointmentList(appointmentsArray);
    }, [appointmentListArray.length])



    return (
        <Card
            classes={{ root: classes.card }}
            sx={{
                background: '#fff',
                boxShadow: '0 2px 4px #00000029',
                borderRadius: '4px',
            }}
        >
            <CardContent >
                <Typography component="div" variant="h6">
                    <label className="db_org_graph">
                        Appointments
                    </label>
                </Typography>
                <div className={classes.content}>
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
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ) : null
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointmentList.map((row, index) => (
                                    <AppointmentItem
                                        row={row}
                                        index={index}
                                        columns={columns}
                                        role={role}
                                    // setAlertMsg={setAlertMsg}
                                    // setSubLabel={setSubLabel}
                                    // setOpenFlash={setOpenFlash}
                                    // type={type}
                                    />
                                ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(AppointmentList)