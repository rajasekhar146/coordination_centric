import React, { useEffect, useState } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
// import SearchIcon from '@material-ui/icons/Search'
import NameIcon from '../../assets/icons/organization_name.png'
import EmailIcon from '../../assets/icons/organization_email.png'
import OrganizationPhoneIcon from '../../assets/icons/organization_phone.png'
// import OrganizationNameIcon from '../../assets/icons/OrganizationName.png'
// import { useForm } from '../../utils/validator'
import { useForm } from 'react-hook-form'
// import { organizationService } from '../../services'
// import get from 'lodash.get'
import Select from '@mui/material/Select'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import MembersStore from '../../stores/membersstore'
import UserIcon from '../../assets/icons/usericon.png'
import PlusIcon from '../../assets/icons/plus_icon.png'


const useStyles = makeStyles(theme => ({
    select: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: "100%",
        height: "48px"
    },
}))

const roles = [
    { name: 'Doctor' },
    { name: 'NP' },
    { name: 'PA' },
    { name: 'Receptionist' }
]


const InvitePatientComponent = props => {
    const classes = useStyles()

    const {
        // setOpenFlash,
        // setAlertMsg,
        // clickCloseButton,
        // setSubLabel,
        setOpenInvitePatientSuccess,
        setOpenInviteMember,
        selectedItem
    } = props;



    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        setValue('patientName', selectedItem.name)
        setValue('email', selectedItem.email)
    }, {})

    console.log(errors)

    const customErrorAttribute = {
        className: 'has-error',
        'another-attr': 'look-at-me',
    }

    // const { values, useInput, isValid } = useForm(defaultValues, customErrorAttribute)

    const [isSubmit, setIsSubmit] = useState(false)
    const [isExist, setIsExist] = useState('')

    const onSubmit = (requestData) => {
        setIsSubmit(true)
        setOpenInvitePatientSuccess(true)
        // MembersStore.load('InviteMember', {
        //     requestData,
        //     successCallback: (data) => {
        //         setOpenInviteMember(false)
               
        //     },
        //     errorCallback: (err) => {
        //         setIsExist(err.message)
        //     }
        // })
    }


    return (
        <div className="io__main__div">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="io__row">
                    <img src={UserIcon} alt="Approve Org" />
                </div>
                <div className="io__invite__title">Invite Patient</div>
                <div className="io__row io_invite_sub_title ">
                    <label className="io__conform__title">
                        Your new project has been created.
                        Invite colleagues to collaborate on this project.
                    </label>
                </div>
                <div className="io__form form-body">
                    <div className="io__row">
                        <div className="io__label">
                            Patient Name <span className="ac__required">*</span>
                        </div>
                        <TextField
                            // {...useInput('facilityName', { isRequired: true })}
                            {...register('patientName', {
                                required: 'patient name is required.',
                            })}
                            margin="normal"
                            error={errors.patientName && isSubmit}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={NameIcon} alt="First Name" />
                                    </InputAdornment>
                                ),
                                className: 'im__text__box',
                            }}
                        />
                        {errors.patientName && <p className="io__required">{errors.patientName.message}</p>}
                    </div>



                    <div className="io__row">
                        <div className="io__label">Patient Email <span className="ac__required">*</span></div>
                        <TextField
                            {...register('email', {
                                required: 'patient email is required.',
                                pattern: {
                                    value:
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                },
                            })}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={EmailIcon} alt="Email Icon" />
                                    </InputAdornment>
                                ),
                                className: 'im__text__box',
                            }}
                        />
                        {errors.email && <p className="io__required">{errors.email.message}</p>}
                        {isExist && <p className="io__required">{isExist}</p>}

                    </div>

                    <div className="io__row">
                        <div className="io__label">Access Type <span className="ac__required">*</span></div>
                        <Select
                            {...register('accessType', {
                                required: 'Access Type is required.',
                                // pattern: {
                                //   value:
                                //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                //   message: 'Please enter a valid email',
                                // },
                            })}
                            className={classes.select}
                            id="demo-simple-select-helper"
                        >
                            {/* <MenuItem value="none" disabled>
                                Select an Option
                            </MenuItem> */}
                            {roles.map(role => (
                                <MenuItem key={role.name} value={role.name}>
                                    <ListItemText primary={role.name} />
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.role && <p className="io__required">{errors.role.message}</p>}

                    </div>
                    <div>
                        <label className="add_another_label">
                        <img src={PlusIcon} alt="Approve Org" />  Add another
                        </label>
                    </div>
                    <div className="io__row">
                        <div style={{ marginTop: "50px" }} className="io__same__line">
                            <div className="io__column">
                                <Button className="io__add__organization__btn__close" onClick={props.clickCloseButton}>
                                    Cancel
                                </Button>
                            </div>
                            <div style={{ marginLeft: "15px" }} className="io__column io__invite__org__btn">
                                <Button type="submit" className="io__add__organization__btn">
                                    Send Invite
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InvitePatientComponent
