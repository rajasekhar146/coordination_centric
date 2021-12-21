import React, { useState, useEffect } from 'react'
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
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
// import MembersStore from '../../stores/membersstore'
import { memberService, commonService } from '../../services'
import get from 'lodash.get'
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





const InviteMemberComponent = props => {
    const {
        classes
    } = props

    const {
        // setOpenFlash,
        // setAlertMsg,
        // clickCloseButton,
        // setSubLabel,
        setOpenInviteMemberSuccess,
        setOpenInviteMember,
        organizationId,
        setMembersList
    } = props;

    useEffect(async() => {
        const res = await commonService.getAllRoles();
        setRoles(res.data.data.data);
    }, [])


    const {
        register,
        handleSubmit,
        setValue,
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
    const [roles , setRoles] = useState([]);
    const onSubmit = (requestData) => {
        setIsSubmit(true)
        requestData.refUserId = organizationId
        const res = memberService.inviteMember(requestData)
        res.then((data) => {
            setOpenInviteMember(false)
            setOpenInviteMemberSuccess(true)
            setMembersList([])
        }).catch((err) => {
            setIsExist(get(err.response, ['data', 'message'], null))
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                // {...useInput('facilityName', { isRequired: true })}
                                {...register('first_name', {
                                    required: 'First Name is required.',
                                })}
                                onChange={(e) => {
                                    let val;
                                    if (e.target.value.length === 1) {
                                      val = capitalize(e.target.value)
                                    }
                                    else {
                                      val = e.target.value
                                    }
                                    setValue('first_name', val)
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
                        {errors.first_name && <p className="io__required">{errors.first_name.message}</p>}
                    </div>

                    <div className="io__row">
                        <div className="io__label">
                            Last name <span className="ac__required">*</span>
                        </div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                // {...useInput('facilityEmail', { isRequired: true })}
                                {...register('last_name', {
                                    required: 'Last Name Required.'
                                })}
                                onChange={(e) => {
                                    let val;
                                    if (e.target.value.length === 1) {
                                      val = capitalize(e.target.value)
                                    }
                                    else {
                                      val = e.target.value
                                    }
                                    setValue('last_name', val)
                                  }}
                                margin="normal"
                                error={errors.facilityEmail && isSubmit}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img src={NameIcon} alt="Last Name" />
                                        </InputAdornment>
                                    ),
                                    className: classes.input
                                }}
                            />
                        </FormControl>
                        {errors.last_name && <p className="io__required">{errors.last_name.message}</p>}
                    </div>

                    <div className="io__row">
                        <div className="io__label">Email <span className="ac__required">*</span></div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                {...register('email', {
                                    required: 'Email is required.',
                                    pattern: {
                                        value:
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                })}
                                type="email"
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
                        <div className="io__label">Role <span className="ac__required">*</span></div>
                        <FormControl variant="outlined" className={classes.formControl}>
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
                                MenuProps={{ classes: { paper: classes.dropdownStyle } }}
                                id="demo-simple-select-helper"
                            >
                                {/* <MenuItem value="none" disabled>
                                Select an Option
                            </MenuItem> */}
                                {roles.map(role => (
                                    <MenuItem key={role.role_name} value={role.role_name}>
                                        <ListItemText primary={role.role_name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.role && <p className="io__required">{errors.role.message}</p>}

                    </div>

                    <div className="io__row">
                        <div style={{ marginTop: "30px" }} className="io__flex_btn">
                            <div className="io__column width-50 ">
                                <Button className="io__add__organization__btn__close width-100" onClick={props.clickCloseButton}>
                                    Close
                                </Button>
                            </div>
                            <div style={{ marginLeft: "15px" , width: "50%" }} className="io__column io__invite__org__btn">
                                <Button type="submit" className="io__add__organization__btn width-100">
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

export default withStyles(styles)(InviteMemberComponent)
