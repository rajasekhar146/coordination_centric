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
import { memberService, commonService } from '../../services'
import get from 'lodash.get'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CircleIcon from '@mui/icons-material/Circle';
import { appointmentService } from '../../services'


const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        background: "#FFFFFF",
        width: '100%'
    },
    dropdownStyle: {
        border: "1px solid black",
        borderRadius: "5px",
        width: '50px',
        height: '200px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    input: {
        background: "#FFFFFF",
        borderRadius: "8px",
    },
});



const roles = [
    { name: 'Doctor', value: 'doctor' },
    { name: 'NP', value: 'np' },
    { name: 'PA', value: 'pa' },
    { name: 'Receptionist', value: 'receptionist' }
]


const ConfimationAppointment = props => {
    const {
        classes,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        clickCloseButton,
        selectedAppointment
    } = props

    const [activeTab, setActiveTab] = useState(null)




    const handleSubmit = async() => {
        // const res = await appointmentService.confirmAppointment()
        // if (res.status === 200) {
        //     setOpenFlash(true);
        //     setAlertMsg('Confirmed');
        //     setSubLabel(`This appointment is confirmed to Thu, 7th Oct 2021 at 8 am.`)
        //     clickCloseButton()
        // } else {

        // }
        setOpenFlash(true);
        setAlertMsg('Confirmed');
        setSubLabel(`This appointment is confirmed to Thu, 7th Oct 2021 at 8 am.`)
        clickCloseButton()
    }




    return (
        <div className="io_reschedule">
            <div className="io__row io__icon io_mb25">
                <img src={ResendCalender} alt="Approve Org" />
            </div>
            <div className="io__row io__text__center io_width97">
                <label className="io__title">
                    Do you want to confirm this appointment?
                </label>
            </div>
            <div className="io__row io__text__center io_width93 io_mb25">
                <label className="io__conform__title">
                    Select the time slot you want to approve:

                </label>
            </div>
            <div className="io__row io_user_fields">
                <div>
                    <label className="io_user_label">
                        Patient
                    </label>
                </div>
                <div>
                    <label className="io_user_name">
                        Mr. {selectedAppointment.name}
                    </label>
                </div>

            </div>
            <div className="io_slot_selector io_mb25">
                <div>
                    <label className="io_user_label">
                        Primary - Date and Time

                    </label>
                </div>
                <div
                    onClick={() => {
                        setActiveTab('primary')
                    }}>
                    <span className={activeTab === 1 ? 'io__active__primary' : 'io__nonactive__primary'}>
                        <CircleIcon sx={{ color: activeTab === 'primary' ? '#E42346' : '#DCDCDC' }} />
                    </span>
                    <label className="io_user_name">
                        {`${selectedAppointment.date} ${selectedAppointment.time}`}
                    </label>
                </div>

            </div>
            <div 
             onClick={() => {
                setActiveTab('secondary')
            }}
             className="io_slot_selector">
                <div>
                    <label className="io_user_label">
                        Secondary - Date and Time

                    </label>
                </div>
                <div>
                    <span className={activeTab === 1 ? 'io__active__primary' : 'io__nonactive__primary'}>
                        <CircleIcon sx={{ color: activeTab === 'secondary' ? '#E42346' : '#DCDCDC' }} />
                    </span>
                    <label className="io_user_name">
                        {`${selectedAppointment.date} ${selectedAppointment.time}`}
                    </label>
                </div>

            </div>
            <div className="io__row io__btn io_width97">
                <div className="io__same__line">
                    <div className="io__cancel">
                        <Button className="io__cancel__btn" onClick={clickCloseButton}>
                            Close
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

export default withStyles(styles)(ConfimationAppointment)
