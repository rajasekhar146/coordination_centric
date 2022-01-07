import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MemberInviteIcon from '../../assets/icons/member_invite.png'
import { organizationService } from '../../services'
import history from '../../history'
import CloseIcon from '../../assets/icons/close.png'
import FormControl from '@material-ui/core/FormControl'
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
import { memberService, accountService } from '../../services'
import moment from 'moment'
import get from 'lodash.get'
import { authenticationService, commonService } from '../../services'
import { setCountries } from '../../redux/actions/commonActions'
import { useSelector, useDispatch } from 'react-redux'

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

const genderOptions = ['Male', 'Female', 'Others']

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
  const { selectedOrg, clickCloseButton, classes, getPatientRecords, setAlertMsg, setOpenFlash, setSubLabel } = props

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
  const [doctors, setDoctors] = useState([])
  const [doctorName, setDoctorName] = useState('')
  const [states, setStates] = useState(null)
  const [countries, setAllCountries] = useState([])
  const dispatch = useDispatch()

  const fetchStates = async selectedCountryCode => {
    const response = await commonService.getStates(selectedCountryCode).catch(error => {
      console.log(error)
    })
    const data = get(response, ['data', 'data', 'data'], null)
    setStates(data)
    if (data.length > 0) setValue('state', data[0].statecode)
    // setValue('state', data[0].statecode)
  }

  const fetchCountries = async () => {
    const response = await commonService.getCountries().catch(error => {
      console.log(error)
    })
    setAllCountries(response.data.data.data)
    dispatch(setCountries(response.data.data.data))
  }

  const getFacilityDetials = async () => {
    memberService
      .getFacilityData(facilityId)
      .then(data => {
        setFacilityName(get(data, ['data', 'data', 'facilityName'], ''))
      })
      .catch(() => {})
  }

  const getDoctorsList = async () => {
    accountService
      .getDoctorListByOrganizationById(facilityId)
      .then(data => {
        setDoctors(get(data, ['data', 'data', 'data'], []))
      })
      .catch(() => {})
  }

  useEffect(async () => {
    await getFacilityDetials()
    await getDoctorsList()
    await fetchCountries()
  }, [])

  useEffect(() => {
    setValue('organization_name', facilityName)
  }, [facilityName])

  const onSubmit = data => {
    data.doctor_name = doctorName
    console.log('form Data', data)

    memberService
      .addNewPatientRecord(data)
      .then(res => {
        if (get(res, ['data', 'status_code'], '') === 400) {
          console.log('onSubmit >> Error >> 400')
          setError(get(res, ['data', 'message'], ''))
        } else if (get(res, ['data', 'status_code'], '') === 200) {
          console.log('onSubmit >> Okay >> 200')
          clickCloseButton()
          setOpenFlash(true)
          setSubLabel('Patient Record added Successfully')
          getPatientRecords()
        }
      })
      .catch(err => {
        console.log('onSubmit >> Error')
        setError(get(err, ['response', 'data', 'message'], ''))
      })
  }

  return (
    <div className="io__main__div" style={{ height: '450px', overflow: 'auto' }}>
      <div className="io__title__text">Add New Record</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="io__flex_btn mb_25">
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                First Name <span className="pdc__required">*</span>
              </label>
              <TextField
                {...register('first_name', {
                  required: 'First Name is required.',
                })}
                onChange={e => {
                  let val
                  if (e.target.value.length === 1) {
                    val = capitalize(e.target.value)
                  } else {
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
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Last Name <span className="pdc__required">*</span>
              </label>
              <TextField
                {...register('last_name', {
                  required: 'Last Name is required.',
                })}
                onChange={e => {
                  let val
                  if (e.target.value.length === 1) {
                    val = capitalize(e.target.value)
                  } else {
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
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                DOB <span className="pdc__required">*</span>
              </label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dateOfBirth}
                  openTo={new Date('1980/01/01')}
                  maxDate={new Date()}
                  {...register('dob', {
                    required: 'DOB is required.',
                  })}
                  onChange={newValue => {
                    setValue('dob', moment(newValue).format('YYYY-MM-DD HH:mm:ss'))
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

        <div className="io__flex_btn mb_25">
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Email <span className="pdc__required">*</span>
              </label>
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

          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Blood Group <span className="pdc__required">*</span>
              </label>
              {/*<Select
                {...register('blood_group',{
                  required: 'Blood Group is required.',
                }
                )}
                className={classes.select}
                MenuProps={{ classes: { paper: classes.dropdownStyle } }}
                id="demo-simple-select-helper"
              >
                 {bloodGroups.map(option => (
                  <MenuItem key={option} value={option}>
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
                 </Select> */}
              <select
                {...register('blood_group', {
                  required: 'Blood Group is required.',
                })}
                className="ac__dropdown"
              >
                {bloodGroups &&
                  bloodGroups.map(c => (
                    <option value={c} key={c} className="ac__dropdown">
                      {c}
                    </option>
                  ))}
              </select>
            </FormControl>
            {errors.blood_group && <p className="io__required">{errors.blood_group.message}</p>}
          </div>
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Gender <span className="pdc__required">*</span>
              </label>
              {/*<Select
                {...register('gender', {
                  required: 'Gender is required.',
                })}
                className={classes.select}
                MenuProps={{ classes: { paper: classes.dropdownStyle } }}
                id="demo-simple-select-helper"
              >
                {genderOptions.map(option => (
                  <MenuItem key={option} value={option}>
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
                </Select> */}
              <select
                {...register('gender', {
                  required: 'Gender is required.',
                })}
                className="ac__dropdown"
              >
                {genderOptions &&
                  genderOptions.map(c => (
                    <option value={c} key={c} className="ac__dropdown">
                      {c}
                    </option>
                  ))}
              </select>
            </FormControl>
            {errors.gender && <p className="io__required">{errors.gender.message}</p>}
          </div>
        </div>

        <div className="io__flex_btn mb_25">
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>Patient Id</label>
              <TextField
                {...register('patient_id', {
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: 'Patient Id accepts only integer',
                  },
                })}
                onChange={e => {
                  setValue('patient_id', e.target.value.replace(/[^0-9]/g, ''))
                }}
                margin="normal"
                inputProps={{
                  maxLength: 15,
                }}
              />
            </FormControl>
            {errors.patient_id && <p className="io__required">{errors.patient_id.message}</p>}
          </div>

          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>Doctor Name</label>
              <select
                {...register('doctor_id')}
                className="ac__dropdown"
                onChange={e => {
                  var index = e.nativeEvent.target.selectedIndex
                  setDoctorName(e.nativeEvent.target[index].text)
                }}
              >
                <option value="" key="optional">
                  Please select doctor
                </option>
                {doctors &&
                  doctors.map(c => (
                    <option value={c._id} key={c._id} className="ac__dropdown">
                      {c.name}
                    </option>
                  ))}
              </select>
            </FormControl>
            {errors.doctor_name && <p className="io__required">{errors.doctor_name.message}</p>}
          </div>
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>Organization Name</label>
              <TextField
                {...register('organization_name', {
                  required: 'Organization Name is required.',
                })}
                margin="normal"
                disabled
              />
            </FormControl>
          </div>
        </div>
        <div className="io__flex_btn mb_25">
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>EMR Id</label>
              <TextField
                {...register('medical_records', {
                  pattern: {
                    value: (/^[0-9a-zA-Z]*$/, ''),
                    message: 'EMR Id accepts only integer',
                  },
                })}
                onChange={e => {
                  let val
                  if (e.target.value.length === 1) {
                    val = capitalize(e.target.value)
                  } else {
                    val = e.target.value
                  }
                  setValue('medical_records', val)
                }}
                margin="normal"
                inputProps={{
                  maxLength: 15,
                }}
              />
            </FormControl>
            {errors.medical_records && <p className="io__required">{errors.medical_records.message}</p>}
          </div>
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Phone Number <span className="pdc__required">*</span>
              </label>
              <TextField
                {...register('phoneNo', {
                  required: {
                    value: true,
                    message: 'Phone Number is required',
                  },
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: 'Phone Number accepts only integer',
                  },
                })}
                margin="normal"
                inputProps={{
                  maxLength: 15,
                }}
              />
            </FormControl>
            {errors.phoneNo && <p className="ac__required">{errors.phoneNo.message}</p>}
          </div>

          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                SSN/ITIN <span className="pdc__required">*</span>
              </label>
              <TextField
                {...register('ssn', {
                  pattern: {
                    value: /\d/,
                    message: 'This input is number only.',
                  },
                })}
                maxLength={11}
                characterLimit={11}
                onInput={e => {
                  e.target.value = e.target.value.toString().slice(0, 11)
                }}
                margin="normal"
              />
            </FormControl>
            {errors.ssn && <p className="ac__required">{errors.ssn.message}</p>}
          </div>
        </div>

        <div className="io__flex_btn mb_25">
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Address <span className="pdc__required">*</span>
              </label>
              <TextField
                {...register('address', { required: 'Address is required' })}
                margin="normal"
                InputProps={{ className: 'pdc__address__text__box' }}
              />
              {errors.address && <p className="ac__required">{errors.address.message}</p>}
            </FormControl>
          </div>

          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Country <span className="pdc__required">*</span>
              </label>
              <select
                {...register('country', { required: 'Country is required' })}
                className="ac__dropdown"
                onChange={e => fetchStates(e.target.value)}
              >
                {countries &&
                  countries.map(c => (
                    <option value={c.code} key={c.code} className="ac__dropdown">
                      {c.name}
                    </option>
                  ))}
              </select>
              {errors.country && <p className="ac__required">{errors.country.message}</p>}
            </FormControl>
          </div>

          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                State <span className="pdc__required">*</span>
              </label>
              <select {...register('state', { required: 'State is required' })} className="ac__dropdown">
                {states &&
                  states.map(c => (
                    <option value={c.statecode} key={c.statecode} className="ac__dropdown">
                      {c.name}
                    </option>
                  ))}
              </select>
              {errors.state && <p className="ac__required">{errors.state.message}</p>}
            </FormControl>
          </div>
        </div>

        <div className="io__flex_btn mb_25">
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                City <span className="pdc__required">*</span>
              </label>
              <TextField
                {...register('city', {
                  required: 'City is required ',
                  maxLength: 20,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'This input is characters only.',
                  },
                })}
                InputProps={{ className: 'ac__text__box' }}
                margin="normal"
              />
              {errors.city && <p className="ac__required">{errors.city.message}</p>}
            </FormControl>
          </div>

          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>
                Postal Code <span className="pdc__required">*</span>
              </label>
              <TextField
                {...register('postalCode', { required: 'Postal Code is required ' })}
                inputProps={{
                  maxLength: 20,
                }}
                InputProps={{ className: 'ac__text__box' }}
                margin="normal"
              />
              {errors.postalCode && <p className="ac__required">{errors.postalCode.message}</p>}
            </FormControl>
          </div>
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>MedicAid</label>
              <TextField
                {...register('medicAid', {
                  pattern: {
                    value: (/^[0-9a-zA-Z]*$/, ''),
                    message: 'MedicAid accepts only integer',
                  },
                })}
                onChange={e => {
                  let val
                  if (e.target.value.length === 1) {
                    val = capitalize(e.target.value)
                  } else {
                    val = e.target.value
                  }
                  setValue('medicAid', val)
                }}
                margin="normal"
                inputProps={{
                  maxLength: 15,
                }}
              />
            </FormControl>
            {errors.medicAid && <p className="io__required">{errors.medicAid.message}</p>}
          </div>
        </div>

        <div className="io__flex_btn mb_25">
          <div style={{ width: '30%' }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <label>MediCare</label>
              <TextField
                {...register('mediCare', {
                  pattern: {
                    value: (/^[0-9a-zA-Z]*$/, ''),
                    message: 'MediCare accepts only integer',
                  },
                })}
                onChange={e => {
                  let val
                  if (e.target.value.length === 1) {
                    val = capitalize(e.target.value)
                  } else {
                    val = e.target.value
                  }
                  setValue('mediCare', val)
                }}
                margin="normal"
                inputProps={{
                  maxLength: 30,
                }}
              />
            </FormControl>
            {errors.mediCare && <p className="io__required">{errors.mediCare.message}</p>}
          </div>
        </div>

        <div className="io__row">
          <div style={{ marginTop: '30px' }} className="io__flex_btn">
            <div className="io__column">
              <Button
                style={{ width: '100%' }}
                className="io__add__organization__btn__close"
                onClick={props.clickCloseButton}
              >
                Cancel
              </Button>
            </div>
            <div style={{ marginLeft: '15px' }} className="io__column io__invite__org__btn">
              <Button style={{ width: '100%' }} type="submit" className="io__add__organization__btn">
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
