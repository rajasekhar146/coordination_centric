import React, { useState } from 'react'
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
import { memberService } from '../../services'
import get from 'lodash.get'

const useStyles = makeStyles(theme => ({
    select: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: "100%",
        height: "48px"
    },
}))

const roles = [
    { name: 'Doctor', value: 'doctor'  },
    { name: 'NP', value: 'np' }, 
    { name: 'PA', value: 'pa' },
    { name: 'Receptionist', value: 'receptionist' }
]


const InviteMemberComponent = props => {
    const classes = useStyles()

    const {
        // setOpenFlash,
        // setAlertMsg,
        // clickCloseButton,
        // setSubLabel,
        setOpenInviteMemberSuccess,
        setOpenInviteMember
    } = props;



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

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
        const res = memberService.inviteMember(requestData)
        res.then((data) => {
            setOpenInviteMember(false)
            setOpenInviteMemberSuccess(true)
        }).catch((err) => {
            setIsExist(get(err.response, ['body', 'message'], null))
        })
        // MembersStore.load('InviteMember', {
        //     requestData,
        //     successCallback: (data) => {
        //         setOpenInviteMember(false)
        //         setOpenInviteMemberSuccess(true)
        //     },
        //     errorCallback: (err) => {
        //         setIsExist(err.message)
        //     }
        // })
        
    }


    return (
        <div className="io__main__div">
            <div className="io__title__text">Invite a Member</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="io__form form-body">
                    <div className="io__row">
                        <div className="io__label">
                            First name <span className="ac__required">*</span>
                        </div>
                        <TextField
                            // {...useInput('facilityName', { isRequired: true })}
                            {...register('first_name', {
                                required: 'First Name is required.',
                            })}
                            margin="normal"
                            error={errors.facilityName && isSubmit}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={NameIcon} alt="First Name" />
                                    </InputAdornment>
                                ),
                                className: 'im__text__box',
                            }}
                        />
                        {errors.first_name && <p className="io__required">{errors.first_name.message}</p>}
                    </div>

                    <div className="io__row">
                        <div className="io__label">
                            Last name <span className="ac__required">*</span>
                        </div>
                        <TextField
                            // {...useInput('facilityEmail', { isRequired: true })}
                            {...register('last_name', {
                                required: 'Last Name Required.'
                            })}
                            margin="normal"
                            error={errors.facilityEmail && isSubmit}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={NameIcon} alt="Last Name" />
                                    </InputAdornment>
                                ),
                                className: 'im__text__box',
                            }}
                        />
                        {errors.last_name && <p className="io__required">{errors.last_name.message}</p>}
                    </div>

                    <div className="io__row">
                        <div className="io__label">Email <span className="ac__required">*</span></div>
                        <TextField
                            {...register('email', {
                                required: 'Email is required.',
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
                        <div className="io__label">Role <span className="ac__required">*</span></div>
                        <Select
                            {...register('role', {
                                required: 'Role is required.',
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
                                <MenuItem key={role.name} value={role.value}>
                                    <ListItemText primary={role.name} />
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.role && <p className="io__required">{errors.role.message}</p>}

                    </div>

                    <div className="io__row">
                        <div style={{ marginTop: "50px" }} className="io__same__line">
                            <div className="io__column">
                                <Button className="io__add__organization__btn__close" onClick={props.clickCloseButton}>
                                    Close
                                </Button>
                            </div>
                            <div style={{ marginLeft: "15px" }} className="io__column io__invite__org__btn">
                                <Button type="submit" className="io__add__organization__btn">
                                    Invite Member
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InviteMemberComponent
