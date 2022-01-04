import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

// import view_details from '../../assets/icons/Vector.svg'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import moment from 'moment'
// import galary_icon from '../../assets/icons/galary_icon.png';
import get from 'lodash.get'
import CircleIcon from '@mui/icons-material/Circle'
import './ViewStaffDetails.Component.css'
import history from '../../../history'
import {
  appointmentService,
  authenticationService,
  memberService,
  commonService,
  organizationService,
} from '../../../services'
import ViewImageComponent from '../AppointmentCalender/ViewImage/ViewImage.Component'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Typography from '@mui/material/Typography'
import Alert from '../../Alert/Alert.component'
const genderList = [
  {
    value: 'Male',
    text: 'Male',
  },
  {
    value: 'Female',
    text: 'Female',
  },
  {
    value: 'Other',
    text: 'Other',
  },
]

function ViewStaffDetailsComponent() {
  const { id, role } = useParams()
  const [userDetails, setUserDetails] = useState([])
  const [showImage, setShowImage] = useState(false)
  const [imageValue, setImageValue] = useState()
  const currentUser = authenticationService.currentUserValue
  const [adminEmailSame, setAdminEmailSame] = useState()
  const [facilityEmail, setFacilityName] = useState(null)
  const [isViewStaffDetEdit, setViewStaffDetEdit] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [specialities, setSpecialities] = useState([])
  const [speciality, setSpeciality] = useState([])
  const [tspeciality, setTSpeciality] = useState('')
  //const memberSpecialities = useSelector(state => state.memberSpecialties)
  const [openflash, setOpenFlash] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [subLebel, setSubLabel] = useState('')
  const [alertcolor, setAlertColor] = useState('')
  const [memberSpecialities, setMemberSpecialities] = useState([])
  const [states, setStates] = useState(null)
  const [countries, setAllCountries] = useState([])
  const dispatch = useDispatch()
  const [dateOfBirth, setDOB] = React.useState(null)
  const [memberRole, setMemberRole] = useState('')
  var {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm()

  useEffect(() => {
    getAppointmentDetails()
  }, [])

  const openImage = docs => {
    setShowImage(true)
    setImageValue(docs)
  }
  const handleClose = () => {
    setShowImage(false)
  }
  const getAppointmentDetails = async () => {
    console.log('getAppointmentDetails >> id', id)
    let res = await memberService.getDetailsById(id)
    const memberData = get(res, ['data', 'data'], {})
    const address = [
      memberData?.address,
      memberData?.city,
      memberData?.state,
      memberData?.country,
      memberData?.postalCode,
    ]
      .filter(c => c)
      .join(', ')
    const fullName = memberData.first_name + ' ' + memberData.last_name
    console.log('memberData >> res', res)
    setMemberSpecialities(memberData?.speciality)
    var newSpeciality = ''
    memberData?.speciality.map(item => {
      if (newSpeciality.length > 0) newSpeciality += ', '
      newSpeciality += item.speciality_name
    })
    setTSpeciality(newSpeciality)
    setSpeciality(memberData?.speciality)
    console.log('memberData >> data', memberData)
    setUserDetails(memberData)
    setValue('name', fullName)
    setValue('email', memberData.email)
    setValue('phoneNo', memberData.phoneNo)
    setValue('role', memberData.role)
    setValue('speciality', speciality)
    setValue('ssn', memberData.ssn)
    setValue('occupation', memberData.occupation)
    setValue('gender', memberData.gender)
    setValue('country', memberData.country)
    setValue('city', memberData.city)
    setValue('postalCode', memberData.postalCode)
    await fetchStates(memberData.country)
    setValue('state', memberData.state)
    setValue('bio', memberData.bio)
    setValue('address', memberData.address)
    setDOB(memberData.dob)
    setMemberRole(memberData.role)
    console.log('params', res.data)
  }

  const colorcodes = {
    accepted: '#12B76A',
    pending: '#7A5AF8',
    cancelled: '#757500',
    declined: '#B42318',
    request_to_reschedule: '#F79009',
    rescheduled: '#F79009',
  }
  const confirmAppointment = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
  }

  const fetchStates = async selectedCountryCode => {
    console.log('selected country code: ' + selectedCountryCode)
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

    console.log('getCountries', response.data.data.data)
    setAllCountries(response.data.data.data)
  }

  const checkAdminEmail = e => {
    if (e.target.value == facilityEmail) {
      setAdminEmailSame(true)
    } else {
      setAdminEmailSame(false)
    }
  }
  const getValue = val => {
    switch (val) {
      case 'accepted':
        return 'Confirmed'
        break

      case 'cancelled':
        return 'Cancelled'
        break
      case 'pending':
        return 'Pending acceptance'
        break
      case 'accepted':
        return 'Accepted'
        break
      case 'declined':
        return 'Declined'
        break
      case 'request_to_reschedule':
        return 'Requested to Re-schedule'
        break
      case 'rescheduled':
        return 'Rescheduled'
      default:
        return null
    }
  }

  const handleSpecialitySearch = async searchText => {
    const response = await commonService.getSpecializations(searchText).catch(err => {
      console.log(err)
    })
    console.log('setSpecialities', response.data.data.data)
    var tSpecializations = []
    var data = response.data?.data?.data
    data?.map(d => {
      tSpecializations.push({
        id: d.id,
        speciality_name: d.speciality_name,
      })
    })
    setSpecialities(tSpecializations)
  }

  useEffect(async () => {
    await fetchCountries()
    await handleSpecialitySearch('')
  }, [])

  const getAddress = () => {
    return [userDetails?.address, userDetails?.city, userDetails?.state, userDetails?.country, userDetails?.postalCode]
      .filter(c => c)
      .join(', ')
  }

  const handleViewStaffDetEdit = () => {
    setViewStaffDetEdit(true)
  }

  const handleViewStaffDetSave = () => {}

  const handleViewStaffDetCancel = () => {
    setViewStaffDetEdit(false)
  }

  const handleChange = (event, value) => {
    console.log('handleChange', value)
    setSpeciality(value)
    // console.log(speciality)
  }

  const saveMemberDetail = async () => {
    setViewStaffDetEdit(false)
    var formData = getValues()
    var specialityIds = []
    speciality.forEach(s => {
      specialityIds.push(s._id || s.id)
    })
    const fullName = formData.name.split(' ')

    if (fullName.length > 0) {
      formData.first_name = fullName[0]
      formData.last_name = fullName[1]
    } else formData.first_name = fullName

    formData.speciality = specialityIds
    formData.dob = dateOfBirth
    console.log('saveMemberDetail >> formData', formData)
    // console.log('saveMemberDetail >> speciality', speciality)
    // console.log('submitted data >> ', id, formData)
    const response = await memberService.updateMemberDetail(id, formData).catch(err => console.log(err))
    console.log('saveMemberDetail >> response', response)
    if (get(response, 'status', 0) === 200) {
      console.log('saveMemberDetail >> response >> status', response)
      setOpenFlash(true)
      setAlertMsg('Saved')
      setSubLabel('User details was successfully updated.')
      setAlertColor('success')
    } else {
      setOpenFlash(true)
      setAlertMsg('Error')
      setSubLabel('Error occured while updating the User detail.')
      setAlertColor('fail')
    }
  }

  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
    setAlertMsg('')
    setSubLabel('')
    setAlertColor('')
  }

  return (
    <div className="view-app">
      <div className="view-header">
        <button
          onClick={() => {
            history.goBack()
            // if(role =="staff"){
            //   history.push('/staff')
            // }
            // else if(role == "patient"){
            //   history.push('/patients')
            // }
          }}
          className="ac__back__btn view_appointment_back"
        >
          <ArrowBackIosNewIcon />
          <span>Back</span>
        </button>
        <div className="od__title__text">
          {userDetails?.first_name || ''} {userDetails?.last_name || ''}
        </div>
      </div>

      <div className="summary-page">
        <div className="row-details">
          <p className="row-title">Photo</p>
          <p className="row-data flex-dr">
            <img src={userDetails?.profilePic} className="ap_profile mar-right-10" />
          </p>
        </div>

        <div className="row-details">
          <p className="row-title">Name</p>
          <p className="row-data">
            <div style={{ width: '250px' }}>
              {' '}
              <TextField
                {...register('name', {
                  required: ' Name is required',
                  maxLength: 50,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'This input is characters only.',
                  },
                })}
                disabled={!isViewStaffDetEdit}
                margin="normal"
                InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
              />
            </div>
          </p>
          {errors.fullName && <p className="ac__required">{errors.fullName.message}</p>}
        </div>
        <div className="row-details">
          <p className="row-title">Email Address</p>
          <p className="row-data">
            <div style={{ width: '250px' }}>
              {' '}
              <TextField
                {...register('email', {
                  required: 'Email is required',
                  maxLength: 150,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Enter a valid e-mail address',
                  },
                })}
                type="email"
                onChange={checkAdminEmail}
                disabled={!isViewStaffDetEdit}
                margin="normal"
                InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
              />
            </div>
          </p>
          {adminEmailSame && <p className="ac__required"> Admin Email should not be same as Organization's Email </p>}
          {errors.email && <p className="ac__required">{errors.email.message}</p>}
        </div>

        <div className="row-details">
          <p className="row-title">Phone Numbers</p>
          <p className="row-data">
            <div style={{ width: '250px' }}>
              {' '}
              <TextField
                {...register('phoneNo', {
                  required: {
                    value: true,
                    message: "Admin's Phone Number is required",
                  },
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: 'Phone Number accepts only integer',
                  },
                })}
                inputProps={{
                  maxLength: 15,
                }}
                disabled={!isViewStaffDetEdit}
                margin="normal"
                InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
              />
            </div>
          </p>
          {errors.phoneNumber && <p className="ac__required">{errors.phoneNumber.message}</p>}
        </div>
        {memberRole == 'doctor' && (
          <div className="row-details">
            <p className="row-title">Speciality</p>
            <p className="row-data">
              <div style={{ width: '290px' }}>
                {' '}
                {!isViewStaffDetEdit ? <p>{tspeciality}</p> : null}
                {isViewStaffDetEdit ? (
                  <div>
                    <Autocomplete
                      multiple
                      onChange={(event, value) => {
                        console.log(value)
                        handleChange(event, value)
                        setIsSubmit(false)
                      }}
                      options={specialities}
                      getOptionLabel={option => option.speciality_name}
                      defaultValue={memberSpecialities}
                      renderInput={params => <TextField {...params} />}
                    />
                    {errors.speciality && <p className="ac__required">{errors.speciality.message}</p>}
                  </div>
                ) : null}
              </div>
            </p>
          </div>
        )}

        <div className="row-details">
          <p className="row-title">Role</p>
          <p className="row-data capital">
            <div style={{ width: '250px' }}>
              {' '}
              <TextField
                {...register('role', {
                  required: 'Role Name is required',
                  maxLength: 50,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'This input is characters only.',
                  },
                })}
                disabled
                margin="normal"
                InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
              />
            </div>
          </p>
          {errors.role && <p className="ac__required">{errors.role.message}</p>}
        </div>

        <div className="row-details">
          <p className="row-title">SSN/ITIN</p>
          <p className="row-data">
            <div style={{ width: '250px' }}>
              {' '}
              <TextField
                {...register('ssn', {
                  required: {
                    value: true,
                    message: 'SSN/ITIN is required',
                  },
                  pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: 'NPI accepts only integer',
                  },
                })}
                inputProps={{
                  maxLength: 10,
                }}
                disabled
                margin="normal"
                InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
              />
            </div>
          </p>
          {errors.ssn && <p className="ac__required">{errors.ssn.message}</p>}
        </div>

        <div className="row-details">
          <p className="row-title">Occupation</p>
          <p className="row-data">
            <div style={{ width: '250px' }}>
              {' '}
              <TextField
                {...register('occupation', {
                  required: 'Occupation Name is required',
                  maxLength: 50,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'This input is characters only.',
                  },
                })}
                disabled={!isViewStaffDetEdit}
                margin="normal"
                InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
              />
            </div>
          </p>
          {errors.occupation && <p className="ac__required">{errors.occupation.message}</p>}
        </div>

        <div className="row-details">
          <p className="row-title">Date of Birth</p>
          <p className="row-data">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div style={{ width: '250px' }}>
                {' '}
                <DatePicker
                  value={dateOfBirth}
                  onChange={newValue => {
                    setDOB(newValue)
                  }}
                  maxDate={new Date()}
                  renderInput={params => <TextField {...params} variant="standard" />}
                  // InputProps={{ className: 'sla__date__section' }}
                  disabled={!isViewStaffDetEdit}
                  margin="normal"
                  InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                />
              </div>
            </LocalizationProvider>
          </p>
        </div>

        <div className="row-details">
          <p className="row-title">Gender</p>
          <p className="row-data">
            <select
              {...register('gender', { required: 'Gender is required.' })}
              disabled={!isViewStaffDetEdit}
              className={isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box'}
            >
              {genderList &&
                genderList.map(c => (
                  <option value={c.value} key={c.value} className="">
                    {c.text}
                  </option>
                ))}
            </select>
            {errors.gender && <p className="ac__required">{errors.gender.message}</p>}
          </p>
        </div>
        <div className="row-details div__adjument">
          <p className="row-title">Address</p>
          <p className="row-data">
            <div className="ov__address__section">
              <div className="det-subtitle">
                <b>Address Line</b>
              </div>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('address', { required: 'Address is required' })}
                    margin="normal"
                    disabled={!isViewStaffDetEdit}
                    InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.address && <p className="ac__required">{errors.address.message}</p>}
              </Typography>

              <div className="block-containers">
                <div className="subTitle-block">
                  <div className="det-subtitle">
                    <b>Country</b>
                  </div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    <div style={{ width: '200px' }}>
                      <select
                        disabled={!isViewStaffDetEdit}
                        {...register('country', { required: 'Country is required' })}
                        className={isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box'}
                        onChange={e => fetchStates(e.target.value)}
                      >
                        {countries &&
                          countries.map(c => (
                            <option value={c.code} key={c.code}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                      {errors.country && <p className="ac__required">{errors.country.message}</p>}
                    </div>
                  </Typography>
                </div>
                <div className="subTitle-block">
                  <div className="det-subtitle">
                    <b>State</b>
                  </div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    <div style={{ width: '200px' }}>
                      <select
                        {...register('state', { required: 'State is required' })}
                        disabled={!isViewStaffDetEdit}
                        className={isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box'}
                      >
                        {states &&
                          states.map(c => (
                            <option value={c.statecode} key={c.statecode}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                      {errors.state && <p className="ac__required">{errors.state.message}</p>}
                    </div>
                  </Typography>
                </div>
              </div>
              <div className="block-container">
                <div className="subTitle-block">
                  <div className="det-subtitle">
                    <b>City</b>
                  </div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    <div style={{ width: '250px' }}>
                      {' '}
                      <TextField
                        {...register('city', {
                          required: 'City is required ',
                          maxLength: 20,
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'This input is characters only.',
                          },
                        })}
                        disabled={!isViewStaffDetEdit}
                        margin="normal"
                        InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                      />
                    </div>
                    {errors.city && <p className="ac__required">{errors.city.message}</p>}
                  </Typography>
                </div>
                <div className="subTitle-block">
                  <div className="det-subtitle">
                    <b>Zip code</b>
                  </div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    <div style={{ width: '250px' }}>
                      {' '}
                      <TextField
                        {...register('postalCode', { required: 'PostalCode is required ' })}
                        inputProps={{
                          maxLength: 20,
                        }}
                        disabled={!isViewStaffDetEdit}
                        margin="normal"
                        InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                      />
                    </div>
                    {errors.postalCode && <p className="ac__required">{errors.postalCode.message}</p>}
                  </Typography>
                </div>
              </div>
            </div>
          </p>
        </div>

        <div className="row-details">
          <p className="row-title">Bio</p>
          <p className="row-data">
            <div style={{ width: '250px' }}>
              {' '}
              <TextField
                {...register('bio', { required: 'Bio is required' })}
                margin="normal"
                disabled={!isViewStaffDetEdit}
                margin="normal"
                InputProps={{ className: isViewStaffDetEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
              />
            </div>
          </p>
          {errors.bio && <p className="ac__required">{errors.bio.message}</p>}
        </div>
        <div className="row-details">
          <p className="row-title"></p>
          <p className="row-data vsd__action__section">
            {!isViewStaffDetEdit && (
              <Button className="vsd__button" onClick={handleViewStaffDetEdit}>
                Edit
              </Button>
            )}
            {isViewStaffDetEdit && (
              <div>
                <Button className="vsd__button" onClick={saveMemberDetail}>
                  Save
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button className="vsd__button" onClick={handleViewStaffDetCancel}>
                  Cancel
                </Button>{' '}
              </div>
            )}
          </p>
        </div>
      </div>
      <Alert
        handleCloseFlash={handleCloseFlash}
        alertMsg={alertMsg}
        openflash={openflash}
        subLebel={subLebel}
        color={alertcolor}
      />
    </div>
  )
}

export default ViewStaffDetailsComponent
