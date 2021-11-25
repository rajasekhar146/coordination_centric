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
        classes
    } = props

    const {
        selectedAppointment
    } = props;
    const [activeTab, setActiveTab] = useState('primary')

    useEffect(() => {
        const res = commonService.getAllRoles()
    }, [])


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()






    // const onSubmit = (requestData) => {
    //     setIsSubmit(true)
    //     requestData.refUserId = admin._id
    //     const res = memberService.inviteMember(requestData)
    //     res.then((data) => {
    //         setOpenInviteMember(false)
    //         setOpenInviteMemberSuccess(true)
    //         getOrgDetails()
    //     }).catch((err) => {
    //         setIsExist(get(err.response, ['body', 'message'], null))
    //     })
    // }




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
                <div style={{ width: '50%'}} className="io_slot_selector">
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
                <div style={{ width: '50%'}} className="io_slot_selector">
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
                        <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
                            Back
                        </Button>
                    </div>
                    <div className="io__cancel">
                        <Button className="io__cancel__btn io_reschedule_btn" onClick={props.clickCloseButton}>
                            Re-schedule
                        </Button>
                    </div>
                    <div className="io__approve">
                        <Button type="submit" className="io__Approve__btn" onClick={handleSubmit}>
                           Reject
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(RejectAppointmentComponent)
