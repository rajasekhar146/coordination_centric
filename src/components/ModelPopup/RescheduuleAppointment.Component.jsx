import React, { useState, useEffect } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import NameIcon from '../../assets/icons/organization_name.png'
import EmailIcon from '../../assets/icons/organization_email.png'
import OrganizationPhoneIcon from '../../assets/icons/organization_phone.png'
import { useForm } from 'react-hook-form'
import ResendCalender from '../../assets/icons/resend_calender.png'
import { appointmentService } from '../../services'
import get from 'lodash.get'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CircleIcon from '@mui/icons-material/Circle';
import history from '../../history'


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



const RescheduuleAppointmentComponent = props => {
    const {
        classes,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        clickCloseButton,
        selectedAppointment,
        setAlertColor
    } = props

    const selectNewDates = () => {
        history.push('/selectdates')
    }


    const handleSubmit = async () => {
        const res = await appointmentService.askPatientReschedule(selectedAppointment.appointmentid)
        if (res.status === 200) {
            setOpenFlash(true);
            setAlertMsg('Requested');
            setSubLabel(`The re-schedule request was sent to the patient.`)
            setAlertColor('success')
            clickCloseButton()
        } else {
            setAlertMsg('Error');
            // setSubLabel(``)
        }
    }




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
            <div className="io__row io__text__center io_width93 io_mb25">
                <label className="io__conform__title">
                    Would you like to select new appointment dates or
                    request the patient to select the new dates?

                </label>
            </div>

            <div className="io__row io__btn io_width97">
                <div className="io__same__line">
                    <div className="io__cancel">
                        <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
                            Back
                        </Button>
                    </div>
                    <div className="io__cancel">
                        <Button
                            className="io__cancel__btn io_select_new"
                            onClick={selectNewDates}>
                            Select New Date
                        </Button>
                    </div>
                    <div className="io__approve">
                        <Button
                            type="submit"
                            className="io__Approve__btn"
                            onClick={handleSubmit}>
                            Ask Patient
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(RescheduuleAppointmentComponent)
