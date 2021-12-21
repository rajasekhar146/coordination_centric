import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MemberInviteIcon from '../../assets/icons/member_invite.png'
import { organizationService } from '../../services'
import history from '../../history'
import CloseIcon from '../../assets/icons/close.png'
import FormControl from "@material-ui/core/FormControl";
import { useForm } from 'react-hook-form'
import { capitalize } from 'lodash'
import InputAdornment from '@material-ui/core/InputAdornment'
import NameIcon from '../../assets/icons/organization_name.png'
import EmailIcon from '../../assets/icons/organization_email.png'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { memberService } from '../../services'
import moment from 'moment'
import get from 'lodash.get'
import { authenticationService } from '../../services'

const styles = theme => ({
    dropdownStyle: {
        border: '1px solid black',
        borderRadius: '5px',
        width: '50px',
        height: '200px',
    },
    input: {
        color: '#838486',
        height: '44px',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        background: '#FFFFFF',
        width: '100%',
        position: 'relative',
      },
})

const genderOptions = [
    'Male',
    'Female',
    'Others'
]

const bloodGroups = [
    'O Positive',
    'O Negative',
    'A Positive',
    'A Negative',
    'B Positive',
    'B Negative',
    'AB Positive',
    'AB Negative',
]

const AddPatientRecord = props => {
    const { 
        selectedOrg,
        clickCloseButton,
        classes,
        getPatientRecords,
        setAlertMsg,
        setOpenFlash,
        setSubLabel,
    } = props



    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()
    const [dateOfBirth, setDOB] = React.useState(null)
    const [errorMsg, setError] = useState('')
    const [facilityName, setFacilityName] = useState('')

    const currentUser = authenticationService.currentUserValue

    const facilityId = get(currentUser, ['data', 'data', 'facility_id'], false)

    const getFacilityDetials = () => {
        memberService.getFacilityData(facilityId).then((data) => {
            setFacilityName(get(data, ['data', 'data', 'facilityName'], ''))
        }).catch(() => {

        })
    }

    useEffect(() => {
        getFacilityDetials()
    }, [])

    useEffect(() => {
        setValue('organization_name', facilityName)
    }, [facilityName])

    const onSubmit = (data) => {
        memberService.addNewPatientRecord(data).then((res) => {
            if(get(res, ['data', 'status_code'], '') === 400) {
                setError(get(res, ['data', 'message'], ''))
            } else if (get(res, ['data', 'status_code'], '') === 200) {
                clickCloseButton()
                setOpenFlash(true)
                setSubLabel(get(res, ['data', 'message'], ''))
                // setAlertMsg('Successfully Added new Record')
                getPatientRecords()
            }
        }).catch((err) => {
            setError(get(err, ['response','data', 'message'], ''))
        })
    }

    return (
        <div className="io__main__div">
            <div className="io__title__text">Add New Record</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='io__flex_btn mb_25'>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>First Name</label>
                            <TextField
                                {...register('first_name', {
                                    required: 'First Name is required.'
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img src={NameIcon} alt="First Name" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        {errors.first_name && <p className="io__required">{errors.first_name.message}</p>}

                    </div>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>Last Name</label>
                            <TextField
                                {...register('last_name', {
                                    required: 'Last Name is required.'
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img src={NameIcon} alt="First Name" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        {errors.last_name && <p className="io__required">{errors.last_name.message}</p>}

                    </div>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>DOB</label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={dateOfBirth}
                                    openTo={new Date('1980/01/01')}
                                    maxDate={new Date()}
                                    {...register('dob', {
                                        required: 'Dob is required.'
                                    })}
                                    onChange={newValue => {
                                        setValue('dob',  moment(newValue).format("YYYY-MM-DD HH:mm:ss"))
                                        setDOB(newValue)
                                    }}
                                    renderInput={params => <TextField {...params} />}
                                    InputProps={{ className: 'pdc__date__field' }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        {errors.dob && <p className="io__required">{errors.dob.message}</p>}

                    </div>

                </div>

                <div className='io__flex_btn mb_25'>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>Email</label>
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
                                }}
                            />
                        </FormControl>
                        {errors.email && <p className="io__required">{errors.email.message}</p>}
                        {errorMsg && <p className="io__required">{errorMsg}</p>}
                    </div>
                    
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>Blood Group</label>
                            <Select
                                {...register('blood_group', {
                                    required: 'Blood Group is required.',
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
                                {bloodGroups.map(option => (
                                    <MenuItem key={option} value={option}>
                                        <ListItemText primary={option} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.blood_group && <p className="io__required">{errors.blood_group.message}</p>}

                    </div>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            Gender
                            <Select
                                {...register('gender', {
                                    required: 'Gender is required.',
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
                                {genderOptions.map(option => (
                                    <MenuItem key={option} value={option}>
                                        <ListItemText primary={option} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.gender && <p className="io__required">{errors.gender.message}</p>}

                    </div>

                </div>

                <div className='io__flex_btn mb_25'>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>Patient Id</label>
                            <TextField
                                {...register('patient_id', {
                                    required: 'Patient Id is required.'
                                })}
                                onChange={e => {
                                    setValue('patient_id', e.target.value.replace(/[^0-9]/g, ''))
                                }}
                                margin="normal"

                            />
                        </FormControl>
                        {errors.patient_id && <p className="io__required">{errors.patient_id.message}</p>}

                    </div>

                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>Doctor Name</label>
                            <TextField
                                {...register('doctor_name', {
                                    required: 'Doctor Name is required.'
                                })}
                                onChange={(e) => {
                                    let val;
                                    if (e.target.value.length === 1) {
                                        val = capitalize(e.target.value)
                                    }
                                    else {
                                        val = e.target.value
                                    }
                                    setValue('doctor_name', val)
                                }}
                                margin="normal"

                            />
                        </FormControl>
                        {errors.doctor_name && <p className="io__required">{errors.doctor_name.message}</p>}

                    </div>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>Organization Name</label>
                            <TextField
                                {...register('organization_name', {
                                    required: 'Organization Name is required.'
                                })}
                                // onChange={(e) => {
                                //     let val;
                                //     if (e.target.value.length === 1) {
                                //         val = capitalize(e.target.value)
                                //     }
                                //     else {
                                //         val = e.target.value
                                //     }
                                //     setValue('organization_name', val)
                                // }}
                                margin="normal"
                                disabled
                            />
                        </FormControl>
                        {/* {errors.organization_name && <p className="io__required">{errors.organization_name.message}</p>} */}

                    </div>
                </div>
                <div className='flex'>
                    <div style={{ width: "30%", marginRight: "43px" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>EMR Id</label>
                            <TextField
                                {...register('medical_records', {
                                    required: 'Medical Records Id is required.'
                                })}
                                onChange={(e) => {
                                    let val;
                                    if (e.target.value.length === 1) {
                                        val = capitalize(e.target.value)
                                    }
                                    else {
                                        val = e.target.value
                                    }
                                    setValue('medical_records', val)
                                }}
                                margin="normal"
                            />
                        </FormControl>
                        {errors.medical_records && <p className="io__required">{errors.medical_records.message}</p>}

                    </div>
                    <div style={{ width: "30%" }}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <label>Phone Number</label>
                            <TextField
                                {...register('contact_number', {
                                    required: 'Phone Number Records Id is required.',
                                    pattern: {
                                        value: /^[1-9]\d*(\d+)?$/i,
                                        message: 'Phone Number accepts only integer',
                                    }
                                })}
                                onChange={e => {
                                    setValue('contact_number', e.target.value.replace(/[^0-9]/g, ''))
                                }}
                                margin="normal"
                            />
                        </FormControl>
                        {errors.contact_number && <p className="io__required">{errors.contact_number.message}</p>}

                    </div>

                </div>

                <div className="io__row">
                    <div style={{ marginTop: "50px" }} className="io__flex_btn">
                        <div className="io__column">
                            <Button style={{ width : "100%"}} className="io__add__organization__btn__close" onClick={props.clickCloseButton}>
                                Cancel
                            </Button>
                        </div>
                        <div style={{ marginLeft: "15px" }} className="io__column io__invite__org__btn">
                            <Button style={{ width : "100%"}} type="submit" className="io__add__organization__btn">
                                Add Record
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default withStyles(styles)(AddPatientRecord)
