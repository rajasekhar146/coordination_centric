import React, { useEffect, useState } from 'react'
import './AcceptanceCriteria.Component.css'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import headerImage from '../../../assets/images/header_image.png'
import Button from '@mui/material/Button'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { useForm } from 'react-hook-form'
import history from '../../../history'
import { useParams } from 'react-router-dom'
import SigninStore from '../../../stores/signinstore'
import { useSelector, useDispatch } from 'react-redux'
import { newOrganization } from '../../../redux/actions/organizationActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { commonService } from '../../../services'
import { setCountries } from '../../../redux/actions/commonActions'
import get from 'lodash.get'
const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Privacy Policy']

const AcceptanceCriteriaComponent = props => {
  const [activeStep, setActiveStep] = useState(0)
  const [planType, setPlanType] = useState('')
  const [processSteps, setProcessSteps] = useState(steps)
  const [facilityEmail, setFacilityName] = useState(null)
  const [initialValues, setInitialFormData] = useState(props.props)
  const { referredby } = useParams()
  const { invitetoken } = useParams()
  const { invitedBy } = useParams()
  const newOrg = useSelector(state => state.newOrganization)
  const dispatch = useDispatch()
  const [states, setStates] = useState(null)
  const [countries, setAllCountries] = useState([])
  const [adminEmailSame , setAdminEmailSame] = useState()

  var {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm()

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
  const onSubmit = data => {
    if(data.email == data.facilityEmail){
      return
    }
    const admin = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    }
    console.log('form data', data)
    SigninStore.set({ organisationName: data.facilityName })
    
    // data.planType = plan == 'P' ? 'premium' : 'free'

    data.admin = [admin]

    if (referredby != '0') data.referred_by = referredby

    data.inviteToken = invitetoken

    if (invitedBy != '0') data.invited_by = invitedBy

    var uFacility = JSON.parse(localStorage.getItem('facility'))

    if(uFacility.planType === 'free') data.planType = 'free'
    else {
      data.planType = uFacility.planType
      data.subscription_price= uFacility.subscription_price
      data.subscription_price_id= uFacility.subscription_price_id
    }
    console.log('uFacility >> AC page', data)
    localStorage.setItem('facility', JSON.stringify(data))

    dispatch(newOrganization(data))

    history.push(`/service-level-agreement/${invitetoken}/${referredby}/${invitedBy}`)
  }

  useEffect(async () => {
    console.log('New AC -- >> ', props.props)
    await fetchCountries()
    var uFacility = JSON.parse(localStorage.getItem('facility'))
    console.log('uFacility', uFacility)
    if (uFacility != null) {
      var data = uFacility
      await fetchStates(data.country)
      setValue('fullName', data.fullName)
      setValue('email', data.email)
      setValue('phoneNumber', data.phoneNumber)
      setValue('facilityName', data.facilityName)
      setValue('facilityEmail', data.facilityEmail)
      setValue('facilityPhone', data.facilityPhone)
      setValue('faxNumber', data.faxNumber)
      setValue('facilityAddress', data.facilityAddress)
      setValue('taxId', data.taxId)
      setValue('npi', data.npi)
      setValue('medicalId', data.medicalId)
      setValue('website', data.website)
      setValue('about', data.about)
      setValue('city', data.city)
      setValue('state', data.state)
      setValue('zipcode', data.zipcode)
      setValue('country', data.country)
      setFacilityName(data.facilityEmail)
    }

    const planType = localStorage?.getItem('plan_type')
    console.log('referredBy 1 ', referredby, 'inviteToken 1 ', invitetoken)
    if (planType == undefined) localStorage.setItem('plan_type', 'F')
    if (planType?.trim().toLocaleUpperCase() === 'F') {
      const newSteps = steps.filter((step, i) => i != 2)
      setProcessSteps(newSteps)
      console.log('newSteps', newSteps)
    }

    // const updateFacility = localStorage.getItem('facility')

    // if (updateFacility != null) {
    //   const newFacility = JSON.parse(updateFacility)
    //   console.log('updateFacility', newFacility)
    //   setInitialFormData(newFacility)
    // } else {
    //   console.log('Else')
    //   setInitialFormData(null)
    // }

    setPlanType('F')

    if (planType?.trim().toLocaleUpperCase() === 'F') {
      const newSteps = steps.filter((step, i) => i != 2)
      setProcessSteps(newSteps)
      console.log('newSteps', newSteps)
    }

    if (planType === '') setPlanType('F')
    else setPlanType(planType)
  }, [])

  const checkAdminEmail = (e) =>{
      if(e.target.value == facilityEmail ){
        setAdminEmailSame(true);
      }else{
        setAdminEmailSame(false);
      }
  }
  const handleBack = () => {
    if (referredby === undefined || referredby === null) referredby = 0

    if (invitedBy === undefined || invitedBy === null) invitedBy = 0

    history.push(`/signup/${invitetoken}/${referredby}/${invitedBy}`)
  }

  const fetchCountries = async () => {
    const response = await commonService.getCountries().catch(error => {
      console.log(error)
    })

    console.log('getCountries', response.data.data.data)
    setAllCountries(response.data.data.data)
    dispatch(setCountries(response.data.data.data))
  }

  return (
    <div className="ob__main__section">
      <div className="ob__align__center">
        <div className="ob__header__section">
          <img src={headerImage} alt="logo" />
        </div>
        <div className="ob__content__section">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {processSteps.map(label => {
                const stepProps = {}
                const labelProps = {}

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            {
              <div className="ac__main__div">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="ac__title__text">Welcome to Coordination Centric!</div>
                  <div className="ac__subtitle__text">
                    For the purpose of registration please fill the required fields of this form to join our platform.
                  </div>
                  <div>
                    <div className="ac__form">
                      <div className="ac__header__text">Admin's Info</div>
                      <div>
                        <div className="ac__row__grid">
                          <div className="ac__column">
                            <div className="ac__label">
                              Full Name <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('fullName', {
                                required: 'Full Name is required',
                                maxLength: 50,
                                pattern: {
                                  value: /^[A-Za-z\s]+$/,
                                  message: 'This input is characters only.',
                                },
                              })}
                              margin="normal"
                              // defaultValue={initialValues ? initialValues.fullName : null}
                              InputProps={{ className: 'ac__text__box' }}
                              // value={fullName}
                              // name="fullName"
                            />
                            {errors.fullName && <p className="ac__required">{errors.fullName.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">
                              Email <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('email', {
                                required: 'Email is required',
                                maxLength: 150,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: 'Enter a valid e-mail address',
                                },
                              })}
                              onChange={checkAdminEmail}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={email}
                              // name="email"
                              // value={initialValues ? initialValues.email : ''}
                            />
                            {adminEmailSame && <p className = "ac__required" > Admin Email should not be same as Organization's Email </p>}
                            {errors.email && <p className="ac__required">{errors.email.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">
                              Phone Number <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('phoneNumber',{
                                required: {
                                    value: true,
                                    message: "Admin's Phone Number is required",
                                },
                                pattern: {
                                    value: /^[1-9]\d*(\d+)?$/i,
                                    message: 'Phone Number accepts only integer',
                                }
                          })}
                              inputProps={{
                                maxLength: 15,
                              }}
                              InputProps={{ className: 'ac__text__box' }}
                            />
                            {errors.phoneNumber && <p className="ac__required">{errors.phoneNumber.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="ac__gap__div"></div>

                      <div className="ac__header__text">Organization's Info</div>
                      <div>
                        <div className="ac__row__grid">
                          <div className="ac__column">
                            <div className="ac__label">
                              Name <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('facilityName', {
                                required: 'Organization Name is requird',
                                maxLength: 100,
                              })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={facilityName}
                              // name="facilityName"
                              // value={initialValues ? initialValues.facilityName : ''}
                            />
                            {errors.facilityName && <p className="ac__required">{errors.facilityName.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">
                              Email <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('facilityEmail', {
                                required: 'Organization Email is required',
                                maxLength: 100,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: 'Enter a valid e-mail address',
                                },
                              })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              type="email"
                              disabled={facilityEmail?.length > 0}
                              // value={facilityEmail}
                              // name="facilityEmail"
                              // value={initialValues ? initialValues.facilityEmail : ''}
                            />
                            {errors.facilityEmail && <p className="ac__required">{errors.facilityEmail.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">
                              Phone Number <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('facilityPhone',{
                                required: {
                                    value: true,
                                    message: "Organization's Phone Number is required",
                                },
                                pattern: {
                                    value: /^[1-9]\d*(\d+)?$/i,
                                    message: 'Phone Number accepts only integer',
                                }
                          })}
                              maxLength={15}
                              characterLimit={15}
                              onInput={e => {
                                e.target.value = e.target.value.toString().slice(0, 15)
                              }}
                              InputProps={{ className: 'ac__text__box' }}
                              style={{ width: '290px', minHeight: '24px' }}
                              margin="normal"
                            />
                            {errors.facilityPhone && <p className="ac__required">{errors.facilityPhone.message}</p>}
                          </div>
                        </div>

                        <div className="ac__row__grid">
                          <div className="ac__column">
                            <div className="ac__label">
                              Fax Number <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('faxNumber', {
                                required: {
                                    value: true,
                                    message: "Fax Number is required",
                                },
                                pattern: {
                                    value: /^[1-9]\d*(\d+)?$/i,
                                    message: 'Fax accepts only integer',
                                }
                          })}
                              inputProps={{
                                maxLength: 10,
                              }}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={faxNumber}
                              // name="faxNumber"
                              // value={initialValues ? initialValues.faxNumber : ''}
                            />
                            {errors.faxNumber && <p className="ac__required">{errors.faxNumber.message}</p>}
                          </div>
                          <div className="ac__column">
                            <div className="ac__label">
                              Address <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('facilityAddress', { required: 'Address is required' })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={facilityAddress}
                              // name="facilityAddress"
                              // value={initialValues ? initialValues.facilityAddress : ''}
                            />
                            {errors.facilityAddress && <p className="ac__required">{errors.facilityAddress.message}</p>}
                          </div>
                          <div className="ac__column">
                            <div className="ac__label">
                              Country <span className="ac__required">*</span>
                            </div>
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
                          </div>
                        </div>

                        <div className="ac__row__grid">
                          <div className="ac__column">
                            <div className="ac__label">
                              State <span className="ac__required">*</span>
                            </div>
                            <select {...register('state', { required: 'State is required' })} className="ac__dropdown">
                              {states &&
                                states.map(c => (
                                  <option value={c.statecode} key={c.statecode} className="ac__dropdown">
                                    {c.name}
                                  </option>
                                ))}
                            </select>
                            {errors.state && <p className="ac__required">{errors.state.message}</p>}
                          </div>
                          <div className="ac__column">
                            <div className="ac__label">
                              City <span className="ac__required">*</span>
                            </div>
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
                              // value={nip}
                              // name="nip"
                              // value={initialValues ? initialValues.nip : ''}
                            />
                            {errors.city && <p className="ac__required">{errors.city.message}</p>}
                          </div>
                          <div className="ac__column">
                            <div className="ac__label">
                              Zipcode <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('zipcode', { required: 'Zipcode is required ', maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={nip}
                              // name="nip"
                              // value={initialValues ? initialValues.nip : ''}
                            />
                            {errors.zipcode && <p className="ac__required">{errors.zipcode.message}</p>}
                          </div>
                        </div>

                        <div className="ac__row__grid">
                          <div className="ac__column">
                            <div className="ac__label">
                              NPI <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('npi', {
                                required: {
                                    value: true,
                                    message: "NPI is required",
                                },
                                pattern: {
                                    value: /^[1-9]\d*(\d+)?$/i,
                                    message: 'NPI accepts only integer',
                                }
                          })}
                          inputProps={{
                            maxLength: 10,
                          }}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={nip}
                              // name="nip"
                              // value={initialValues ? initialValues.nip : ''}
                            />
                            {errors.npi && <p className="ac__required">{errors.npi.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">Tax ID</div>
                            <TextField
                              {...register('taxId')}
                              inputProps={{
                                maxLength: 11,
                              }}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={taxId}
                              // name="taxId"
                              // value={initialValues ? initialValues.taxId : ''}
                            />
                          </div>
                          <div className="ac__column">
                            <div className="ac__label">Medical ID</div>
                            <TextField
                              {...register('medicalId', {
                                pattern: {
                                    value: /^[1-9]\d*(\d+)?$/i,
                                    message: 'Medical ID accepts only integer',
                                }
                          })}
                              inputProps={{
                                maxLength: 14,
                              }}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={medicalId}
                              // name="medicalId"
                              // value={initialValues ? initialValues.medicalId : ''}
                            />
                            {errors.medicalId && <p className="ac__required">{errors.medicalId.message}</p>}
                          </div>
                        </div>

                        <div className="ac__row__grid">
                          <div className="ac__column">
                            <div className="ac__label">Website</div>
                            <TextField
                              {...register('website')}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={website}
                              // name="website"
                              // value={initialValues ? initialValues.website : ''}
                            />
                            {errors.website && <p className="ac__required">{errors.website.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">How did you hear about us?</div>
                            <TextField
                              {...register('about', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              // value={about}
                              // name="about"
                              // value={initialValues ? initialValues.about : ''}
                            />
                          </div>
                        </div>

                        <div className="ac__gap__div"></div>

                        <div className="ac_align_buttons">
                          <div className="ac__column ac__left__action">
                            <Button color="inherit" className="ac__back__btn" onClick={handleBack}>
                              Back
                            </Button>
                          </div>

                          <div className="ac__column ac__right__action">
                            <Button className="ac__next__btn" type="submit">
                              Save & Next &nbsp;
                              <ArrowForwardIosRoundedIcon />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ac__gap__bottom__div"></div>
                  </div>
                </form>
              </div>
            }
          </Box>
        </div>
      </div>
    </div>
  )
}
export default AcceptanceCriteriaComponent
