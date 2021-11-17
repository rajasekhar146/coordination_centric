import React, { useState } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
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
import get from 'lodash.get'
import { organizationService } from '../../services'

const useStyles = makeStyles(theme => ({
    select: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: "100%",
        height: "48px"
    },
    input: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: '100%'
    },
}))


const InviteCollaboratorComponent = props => {
    const classes = useStyles()

    const {
        // setOpenFlash,
        // setAlertMsg,
        // clickCloseButton,
        // setSubLabel,
        setOpenInviteCollaboratorSuccess,
        setOpenInviteCollaborator
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

    const onSubmit = (data) => {
        setIsSubmit(true)
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        const currentUserRole = get(currentUser, ['data', 'data', 'role'], '')
        const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')

        var orgDetail = {
            facilityName: data.facilityName,
            facilityEmail: data.facilityEmail,
        }

        if (currentUserRole === 'admin') {
            orgDetail = {
                adminEmail: currentUserEmail,
                facilityEmail: data.facilityEmail,
                facilityName: data.facilityName,
            }
        }

        const res = organizationService.addOrganization(orgDetail, currentUserRole)
        res.then((response) => {
            setOpenInviteCollaborator(false)
            setOpenInviteCollaboratorSuccess(true)
        }).catch((error) => {
            console.log(error.response)
            if (get(error, ['response', 'data', 'message'], '') === "Organization Already Exists") {
                setIsExist('Email Already Registered')
            }
        })
    }


    return (
        <div className="io__main__div">
            <div className="io__title__text">Invite a Collaborator</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="io__form form-body">
                    <div className="io__row io_mb25">
                        <div className="io__label">
                            Organization name <span className="ac__required">*</span>
                        </div>
                        <TextField
                            // {...useInput('facilityName', { isRequired: true })}
                            {...register('name', {
                                required: 'Name is required.'
                            })}
                            margin="normal"
                            error={errors.facilityName && isSubmit}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={NameIcon} alt="First Name" />
                                    </InputAdornment>
                                ),
                                className: classes.input
                            }}
                        />
                        {errors.name && <p className="io__required">{errors.name.message}</p>}
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
                                className: classes.input
                            }}
                        />
                        {errors.email && <p className="io__required">{errors.email.message}</p>}
                        {isExist && <p className="io__required">{isExist}</p>}

                    </div>



                    <div className="io__row">
                        <div style={{ marginTop: "50px" }} className="io__flex__end">
                            <div className="io__column">
                                <Button className="io__add__organization__btn__close" onClick={props.clickCloseButton}>
                                    Close
                                </Button>
                            </div>
                            <div style={{ marginLeft: "15px" }} className="io__column io__invite__org__btn">
                                <Button type="submit" className="io__add__organization__btn">
                                    Invite
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InviteCollaboratorComponent
