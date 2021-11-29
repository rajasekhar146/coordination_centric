import React, { useState, useEffect } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import ResendCalender from '../../assets/icons/resend_calender.png'
import { memberService, commonService } from '../../services'
import get from 'lodash.get'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CircleIcon from '@mui/icons-material/Circle';


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



const ConfirmRescheduleComponent = props => {
    const {
        classes
    } = props

    const {
        selectedAppointment
    } = props;


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()



    return (
        <div className="io_reschedule">
            <div className="io__row io__icon io_mb25">
                <img src={ResendCalender} alt="Approve Org" />
            </div>
            <div className="io__row io__text__center io_width97">
                <label className="io__title">
                    Re-schedule Appointment
                </label>
            </div>
            <div className="io__row io__text__center">
                <label className="io__conform__title">
                    Please note that this is not a confirmation of your appointment.
                    The confirmation will be sent to your email within 24 hours.

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
                            Mr. John Doe
                        </label>
                    </div>

                </div>
                <div style={{ width: '50%' }} className="io_slot_selector">
                    <div>
                        <label className="io_user_label">
                            Primary
                        </label>
                    </div>
                    <div>
                        <label className="io_user_name">
                            Thu, 7th Oct - 8am
                        </label>
                    </div>
                </div>
                <div style={{ width: '50%' }} className="io_slot_selector">
                    <div>
                        <label className="io_user_label">
                            Secondary
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
                        <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
                            Cancel
                        </Button>
                    </div>

                    <div className="io__approve">
                        <Button type="submit" className="io__Approve__btn" onClick={handleSubmit}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(ConfirmRescheduleComponent)
