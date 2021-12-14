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
import get from 'lodash.get'
import { organizationService } from '../../services'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { capitalize } from 'lodash'


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
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    input: {
        background: "#FFFFFF",
        borderRadius: "8px",
    },
});


const InviteCollaboratorComponent = props => {
    const {
        classes
    } = props

    const {
        setOpenInviteCollaboratorSuccess,
        setOpenInviteCollaborator,
        orgId,
        organizationId,
        setCollaboratorList,
    } = props;



    const {
        register,
        handleSubmit,
        watch,
        setValue,
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
            refUserId: orgId
        }

        if (currentUserRole === 'admin') {
            orgDetail = {
                adminEmail: currentUserEmail,
                facilityEmail: data.facilityEmail,
                facilityName: data.facilityName,
                refUserId: organizationId
            }
        }

        const res = organizationService.addOrganization(orgDetail, currentUserRole)
        res.then((response) => {
            setOpenInviteCollaborator(false)
            setOpenInviteCollaboratorSuccess(true)
            setCollaboratorList([])
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                // {...useInput('facilityName', { isRequired: true })}
                                {...register('facilityName', {
                                    required: 'Name is required.'
                                })}
                                onChange={(e) => {
                                    let val;
                                    if (e.target.value.length === 1) {
                                      val = capitalize(e.target.value)
                                    }
                                    else {
                                      val = e.target.value
                                    }
                                    setValue('facilityName', val)
                                  }}
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
                        </FormControl>
                        {errors.name && <p className="io__required">{errors.name.message}</p>}
                    </div>


                    <div className="io__row">
                        <div className="io__label">Email <span className="ac__required">*</span></div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                {...register('facilityEmail', {
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
                        </FormControl>
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

export default withStyles(styles)(InviteCollaboratorComponent)
