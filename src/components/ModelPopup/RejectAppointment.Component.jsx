import React, { useState, useEffect } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import ResendCalender from '../../assets/icons/resend_calender.png'
import { appointmentService } from '../../services'
import get from 'lodash.get'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import moment from 'moment'
import Box from '@mui/material/Box'

const styles = theme => ({
    // root: {
    //     display: "flex",
    //     flexWrap: "wrap",
    // },
    // formControl: {
    //     margin: theme.spacing.unit,
    //     minWidth: 120,
    //     background: "#FFFFFF",
    //     width: '100%'
    // },
    // dropdownStyle: {
    //     border: "1px solid black",
    //     borderRadius: "5px",
    //     width: '50px',
    //     height: '200px'
    // },
    // selectEmpty: {
    //     marginTop: theme.spacing.unit * 2
    // },
    // input: {
    //     background: "#FFFFFF",
    //     borderRadius: "8px",
    // },
});

const rejectAppointment = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    borderRadius: 3,
    p: 2,
}

const rejectPopupWithoutSecondary = {
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



const RejectAppointmentComponent = props => {
    const {
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        clickCloseButton,
        selectedAppointment,
        setIsRescheduleClicked,
        setAlertColor,
        getAppointmentList
    } = props

    const [secondarySlots, setSecondarySlots] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const timezoneDiff = (new Date()).getTimezoneOffset()


    useEffect(async () => {
        const res = await appointmentService.getSecondaryAppointment(selectedAppointment.appointmentid)
        if (res.status === 200) {
            const element = get(res, ['data', 'data'], {})
            const recordNew = {
                name: element?.userId?.first_name || "" + " " + (element?.userId?.last_name || ""),
                profile: element?.userId?.profilePic,
                location: 'Online',
                date: element?.startTime ? moment(element?.startTime).add(timezoneDiff, 'minutes').format('ddd, Do MMM') : "",
                time: (element?.startTime ? moment(element?.startTime).add(timezoneDiff, 'minutes').format('h:mm a') : "") + " - " + (element?.endTime ? moment(element?.endTime).add(timezoneDiff, 'minutes').format('h:mm a') : ''),
                status: element?.status,
                gender: element?.userId?.gender,
                _id: element?.userId?._id,
                appointmentid: element?._id,
                startTime: element?.startTime,
                endTime: element?.endTime
            }
            setSecondarySlots(recordNew)
        } else {

        }
    }, [])


    const handleReject = async () => {
        const res = await appointmentService.rejectAppointment(selectedAppointment.appointmentid)
        if (res.status === 200) {
            setOpenFlash(true);
            setAlertMsg('Declined');
            setSubLabel(`This appointmend was cancelled.`)
            setAlertColor('fail')
            clickCloseButton()
            getAppointmentList()
        } else {

        }

    }



    return (
        <Box sx={get(secondarySlots, ['startTime'], null) && get(secondarySlots, ['endTime'], null)
            ? rejectAppointment
            : rejectPopupWithoutSecondary}>
            <div className="io_reschedule">
                <div className="io__row io__icon io_mb25">
                    <img src={ResendCalender} alt="Approve Org" />
                </div>
                <div className="io__row io__text__center io_width97">
                    <label className="io__title">
                        Do you want to reject this appointment?

                    </label>
                </div>
                <div className="io_appointment_details">
                    <div style={{ width: '33%' }} className="io_slot_selector">
                        <div>
                            <label className="io_user_label">
                                Patient
                            </label>
                        </div>
                        <div>
                            <label className="io_user_name">
                                {`${selectedAppointment.gender === 'male' ? 'Mr.' : 'Ms.'} ${selectedAppointment.name}`}
                            </label>
                        </div>

                    </div>
                    <div style={{ width: '33%' }} className="io_slot_selector">
                        <div>
                            <label className="io_user_label">
                                Primary - Date and Time
                            </label>
                        </div>
                        <div>
                            <label className="io_user_name">
                                {`${selectedAppointment.date} ${selectedAppointment.time}`}
                            </label>
                        </div>
                    </div>
                    {get(secondarySlots, ['startTime'], null) && get(secondarySlots, ['endTime'], null)
                        && <div
                        style={{ width: '33%' }}
                            className="io_slot_selector">
                            <div>
                                <label className="io_user_label">
                                    Secondary - Date and Time

                                </label>
                            </div>
                            <div>
                                <label className="io_user_name">
                                    {`${get(secondarySlots, ['date'], '')} ${get(secondarySlots, ['time'], '')}`}
                                </label>
                            </div>

                        </div>

                    }
                </div>


                <div className="io__row io__btn io_width97">
                    <div className="io__same__line">
                        <div className="io__cancel">
                            <Button className="io__cancel__btn" onClick={clickCloseButton}>
                                Back
                            </Button>
                        </div>
                        <div className="io__cancel">
                            <Button className="io__cancel__btn io_reschedule_btn"
                                onClick={() => {
                                    setIsRescheduleClicked(true)
                                    clickCloseButton()
                                }}>
                                Re-schedule
                            </Button>
                        </div>
                        <div className="io__approve">
                            <Button type="submit" className="io__Approve__btn"
                                onClick={handleReject}>
                                Reject
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default withStyles(styles)(RejectAppointmentComponent)
