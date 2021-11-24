import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import './PersonalDetail.Component.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import history from '../../../history'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Button from '@mui/material/Button'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import { commonService } from '../../../services'
import { useSelector, useDispatch } from 'react-redux'
import { setCountries } from '../../../redux/actions/commonActions'
import { newMember, resetMember } from '../../../redux/actions/memberActions'
import Guardian from '../../../pages/guardian'
import moment from 'moment'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 670,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}

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
const PersonalDetailComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [countries, setAllCountries] = useState([])
  const [states, setStates] = useState(null)
  const dispatch = useDispatch()
  const member = useSelector(state => state.newMember)
  // const [gender, setGender] = useState('')
  const [dateOfBirth, setDOB] = useState('')
  // const [country, setCountry] = useState('')
  // const [state, setState] = useState('')
  const [IsUnder19, setIsUnder19] = React.useState(false)
  var {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const handleCountryChange = event => {
    // setCountry(event.target.value)
    fetchStates(event.target.value)
  }

  const fetchStates = async selectedCountryCode => {
    const response = await commonService.getStates(selectedCountryCode).catch(error => {
      console.log(error)
    })

    setStates(response.data.data.data)
  }

  const handleChange = event => {
    console.log(event.target.value)
  }

  const onSubmit = data => {
    data.dob = dateOfBirth
    // data.gender = gender
    // data.country = country
    // data.state = state

    
    
    var age = 0
    if(dateOfBirth != null)
      age = moment(dateOfBirth, "MM/DD/YYYY").fromNow().split(" ")[0] //moment(dateOfBirth).fromNow();
    

    var memberData = { ...member.member, ...data }
    console.log('submit data >> ', memberData)
    console.log('submit role >> ', memberData.role)

    dispatch(newMember(memberData))
    if (memberData.role == 'doctor' || Number(age) > 18) {
      history.push('/members/profile-setup')
    } else setIsUnder19(true)
  }

  const fetchCountries = async () => {
    const response = await commonService.getCountries().catch(error => {
      console.log(error)
    })

    console.log('getCountries', response.data.data)
    setAllCountries(response.data.data.data)
    dispatch(setCountries(response.data.data.data))
  }

  useEffect(() => {
    fetchCountries()
    const newMemberDetail = member?.member
    if (newMemberDetail) {
      setValue('first_name', newMemberDetail.first_name)
      setValue('middle_name', newMemberDetail.middle_name)
      setValue('last_name', newMemberDetail.last_name)
      setValue('ssn', newMemberDetail.ssn)
      setValue('occupation', newMemberDetail.occupation)
      // setValue('dob', newMemberDetail.dob)
      setValue('phoneNumber', newMemberDetail.phoneNumber)
      setValue('gender', newMemberDetail.gender)
      setValue('address', newMemberDetail.address)
      // setValue('country', newMemberDetail.country)
      // setValue('state', newMemberDetail.state)
      setValue('city', newMemberDetail.city)
      setValue('postalCode', newMemberDetail.postalCode)
      setValue('gender', newMemberDetail.gender)
      setDOB(newMemberDetail.dob)
      // setCountry('country', newMemberDetail.country)
      setValue('state', newMemberDetail.state)
      fetchStates(newMemberDetail.country)
    }
  }, [])

  const handleCloseGuardianScreen = () => {
    setIsUnder19(!IsUnder19)
  }

  return (
    <div className="pdc__main__div">
      <div className="pdc__row">
        <div className="pdc__back__button" onClick={() => history.push('/members/register')}>
          <ArrowBackIosNewIcon /> &nbsp;Back
        </div>
        <div className="pdc__step__text">STEP 01/02</div>
      </div>
      <div className="pdc__sub__main__div">
      <div className="pdc__header__text">Personal Detail</div>
      <div className="pdc__content__div">
        Help us to get to know you a little more. All information remains private.
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pdc__row">
          <div className="pdc__details__div">
            <div className="pdc__row_grid" >
              <div className="pdc__column">
                <div className="pdc__label">
                  First Name <span className="pdc__required">*</span>
                </div>
                <TextField
                  {...register('first_name', { required: 'First Name is required', maxLength: 50 })}
                  margin="normal"
                  InputProps={{ className: 'pdc__text__box' }}
                />
                {errors.first_name && <p className="ac__required">{errors.first_name.message}</p>}
              </div>

              <div className="pdc__column">
                <div className="pdc__label">
                  Middle Name 
                </div>
                <TextField
                  {...register('middle_name', {maxLength: 50 })}
                  margin="normal"
                  InputProps={{ className: 'pdc__text__box' }}
                />
                {errors.middle_name && <p className="ac__required">{errors.middle_name.message}</p>}
              </div>

              <div className="pdc__column">
                <div className="pdc__label">
                  Last Name <span className="pdc__required">*</span>
                </div>
                <TextField
                  {...register('last_name', { required: 'Last Name is required', maxLength: 50 })}
                  margin="normal"
                  InputProps={{ className: 'pdc__text__box' }}
                />
                {errors.last_name && <p className="ac__required">{errors.last_name.message}</p>}
              </div>
            </div>
            <div className="pdc__row__two_grid">
              <div className="pdc__column">
                <div className="pdc__label">
                  SSN/ITIN <span className="pdc__required">*</span>
                </div>
                <TextField
                  {...register('ssn', { required: 'SSN/ITIN is required', maxLength: 50 })}
                  margin="normal"
                  InputProps={{ className: 'pdc__text__box' }}
                />
                {errors.ssn && <p className="ac__required">{errors.ssn.message}</p>}
              </div>

              <div className="pdc__column">
                <div className="pdc__label">
                  Occupation <span className="pdc__required">*</span>
                </div>
                <TextField
                  {...register('occupation', { required: 'Occupation is required', maxLength: 50 })}
                  margin="normal"
                  InputProps={{ className: 'pdc__text__box' }}
                />
                {errors.occupation && <p className="ac__required">{errors.occupation.message}</p>}
              </div>
            </div>

            <div className="pdc__row_grid">
              <div className="pdc__column">
                <div className="pdc__label">
                  Date of Birth <span className="pdc__required">*</span>
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={dateOfBirth}
                    maxDate={currentDate}
                    onChange={newValue => {
                      setDOB(newValue)
                    }}
                    renderInput={params => <TextField {...params} />}
                    InputProps={{ className: 'pdc__date__field' }}
                  />
                </LocalizationProvider>
              </div>

              <div className="pdc__column">
                <div className="pdc__label">
                  Phone Number <span className="pdc__required">*</span>
                </div>
                <TextField
                  {...register('phoneNumber', {
                    required: 'Phone Number is required',
                    pattern: {
                      value: /\d+/,
                      message: 'This input is number only.',
                    },
                  })}
                  margin="normal"
                  inputProps={{
                    maxLength: 15,
                  }}  
                  InputProps={{ className: 'pdc__phone__text__box' }}
                />
                {errors.phoneNumber && <p className="ac__required">{errors.phoneNumber.message}</p>}
              </div>

              <div className="pdc__column">
                <div className="pdc__label">
                  Gender <span className="pdc__required">*</span>
                </div>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <Select
                    //value={gender}
                    {...register('gender', {
                      required: 'Gender is required',
                      onChange: e => setValue('gender', e.target.value),
                    })}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      <em>Select an option</em>
                    </MenuItem>
                    {genderList.map(g => (
                      <MenuItem key={g.value} value={g.value}>{g.text}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.gender && <p className="ac__required">{errors.gender.message}</p>}
              </div>
            </div>

            <div className="">
              <div className="pdc__column">
                <div className="pdc__label">
                  Address <span className="pdc__required">*</span>
                </div>
                <TextField
                  {...register('address', { required: 'Address is required' })}
                  margin="normal"
                  InputProps={{ className: 'pdc__address__text__box' }}
                />
                {errors.address && <p className="ac__required">{errors.address.message}</p>}
              </div>
            </div>

            <div className="pdc__row__four__grid">
              <div className="pdc__column">
                <div className="pdc__label">Country<span className="pdc__required"> *</span></div>
                <FormControl sx={{ m: 1, minWidth: 210 }}>
                  <Select
                    // value={country}
                    // onChange={e => handleCountryChange(e)}
                    {...register('country',{ required: 'Country is required',
                      onChange: e => {
                        setValue('country', e.target.value)
                        fetchStates(e.target.value)
                      },
                    })}
                    inputProps={{ 'aria-label': 'Without label' }}
                    key="country1"
                    inputProps={{ className: 'pdc__dropdown' }}
                  >
                    <MenuItem value="">
                      <em>Country</em>
                    </MenuItem>
                    {countries &&
                      countries.map(c => (
                        <MenuItem value={c.code} key={c.code}>
                          {c.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.country && <p className="ac__required">{errors.country.message}</p>}
              </div>

              <div className="pdc__column">
                <div className="pdc__label">State<span className="pdc__required"> *</span></div>
                <FormControl sx={{ m: 1, minWidth: 210 }}>
                  <Select
                    key="state1"
                    // value={state}
                    // onChange={e => setState(e.target.value)}
                    {...register('state',{ required: 'state is required' ,
                      onChange: e => setValue('state', e.target.value),
                    })}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      <em>State</em>
                    </MenuItem>
                    {states &&
                      states.map(s => (
                        <MenuItem value={s.statecode} key={s.statecode}>
                          {s.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.state && <p className="ac__required">{errors.state.message}</p>}
              </div>

              <div className="pdc__column">
                <div className="pdc__label">City<span className="pdc__required"> *</span></div>
                <TextField {...register('city',{ required: 'city is required' })} style={{ minWidth: 100 }} margin="normal" />
                {errors.city && <p className="ac__required">{errors.city.message}</p>}
              </div>

              <div className="pdc__column">
                <div className="pdc__label">Postal Code<span className="pdc__required"> *</span></div>
                <TextField {...register('postalCode',{ required: 'Postal Code is required' })} style={{ minWidth: 100 }} margin="normal" />
                {errors.postalCode && <p className="ac__required">{errors.postalCode.message}</p>}
              </div>
            </div>

            <div className="pdc__row pdc__align__right ">
              <Button className="pdc__next__btn" type="submit">
                Next &nbsp;
                <ArrowForwardIosRoundedIcon />
              </Button>
            </div>
          </div>

          <Modal open={IsUnder19} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Guardian closeScreen={handleCloseGuardianScreen} />
            </Box>
          </Modal>
        </div>
      </form>
      </div>
    </div>
  )
}

export default PersonalDetailComponent
