import React, { useState, useEffect } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import ResendCalender from '../../assets/icons/resend_calender.png'
import { appointmentService } from '../../services'
import get from 'lodash.get'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

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



const RejectAppointmentComponent = props => {
    const {
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        clickCloseButton,
        selectedAppointment,
        setIsRescheduleClicked
    } = props

    const [activeTab, setActiveTab] = useState('primary')


    const handleReject = async () => {
        const res = await appointmentService.rejectAppointment(selectedAppointment._id)
        if (res.status === 200) {
            setOpenFlash(true);
            setAlertMsg('Declined');
            setSubLabel(`This appointmend was cancelled.`)
            clickCloseButton()
        } else {

        }

    }



    return (
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
                <div style={{ width: '50%' }} className="io_slot_selector">
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
                <div style={{ width: '50%' }} className="io_slot_selector">
                    <div>
                        <label className="io_user_label">
                            Primary - Date and Time
                        </label>
                    </div>
                    <div>
                        <label className="io_user_name">
                            Thu, 7th Oct - 8am
                        </label>
                    </div>
                </div>
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
    )
}

export default withStyles(styles)(RejectAppointmentComponent)
