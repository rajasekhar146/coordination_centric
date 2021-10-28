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


const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Policies']



const AcceptanceCriteriaComponent = (props) => {
  const [activeStep, setActiveStep] = useState(0)
  const [planType, setPlanType] = useState('')
  const [processSteps, setProcessSteps] = useState(steps)
  const [initialValues, setInitialFormData] = useState(props.props)
  const { referredby } = useParams()
  const { invitetoken } = useParams()
  const { invitedBy } = useParams()

  // const [fullName, setFullName] = useState(null)
  // const [email, setEmail] = useState(null)
  // const [phoneNumber, setPhoneNumber] = useState(null)
  // const [facilityName, setFacilityName] = useState(null)
  // const [facilityEmail, setFacilityEmail] = useState(null)
  // const [facilityPhone, setFacilityPhone] = useState(null)
  // const [faxNumber, setFaxNumber] = useState(null)
  // const [facilityAddress, setFacilityAddress] = useState(null)
  // const [taxId, setTaxId] = useState(null)
  // const [nip, setNIP] = useState(null)
  // const [medicalId, setMedicalId] = useState(null)
  // const [website, setWebsite] = useState(null)
  // const [about, setAbout] = useState(null)

  // console.log('props >> AC', props.props)

  var {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = data => {
    const admin = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    }

    data.planType = planType == 'P' ? 'premium' : 'free'

    data.admin = [admin]

    if(referredby != "0")
      data.referred_by = referredby

    data.inviteToken = invitetoken

    if(invitedBy != "0")
      data.invited_by = invitedBy

    localStorage.setItem('facility', JSON.stringify(data))
   
    history.push(`/service-level-agreement/${invitetoken}/${referredby}/${invitedBy}`)
  }

  useEffect(() => {
    console.log('New AC -- >> ', props.props)

    var uFacility = localStorage.getItem('facility')

    if (uFacility != null) {
      var data = JSON.parse(uFacility)
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

  const handleBack = () => {
    history.push(`/signup/${invitetoken}/${referredby}/${invitedBy}`)
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
                        <div className="ac__row">
                          <div className="ac__column">
                            <div className="ac__label">
                              Full Name <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('fullName', { required: 'Full Name is required', maxLength: 50 })}
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
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                            // value={email}
                            // name="email"
                            // value={initialValues ? initialValues.email : ''}
                            />
                            {errors.email && <p className="ac__required">{errors.email.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">
                              Phone Number <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('phoneNumber', {
                                required: 'Phone Number is required',
                                maxLength: 20,
                                pattern: {
                                  value: /\d+/,
                                  message: 'This input is number only.',
                                },
                              })}
                              InputProps={{ className: 'ac__text__box', maxLength: 15 }}
                              margin="normal"
                            // value={phoneNumber}
                            // name="phoneNumber"
                            // value={initialValues ? initialValues.phoneNumber : ''}
                            />
                            {errors.phoneNumber && <p className="ac__required">{errors.phoneNumber.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="ac__gap__div"></div>

                      <div className="ac__header__text">Organization's Info</div>
                      <div>
                        <div className="ac__row">
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
                            // value={facilityEmail}
                            // name="facilityEmail"
                            // value={initialValues ? initialValues.facilityEmail : ''}
                            />
                            {errors.facilityEmail && <p className="ac__required">{errors.facilityEmail.message}</p>}
                          </div>
                        </div>

                        <div className="ac__row">
                          <div className="ac__column">
                            <div className="ac__label">
                              Phone Number <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('facilityPhone', {
                                required: 'Organization Phone Number is required',
                                maxLength: 20,
                                pattern: {
                                  value: /\d+/,
                                  message: 'This input is number only.',
                                },
                              })}
                              InputProps={{ className: 'ac__text__box', maxLength: 15 }}
                              style={{ width: '290px', minHeight: '24px' }}
                              margin="normal"
                            // value={facilityPhone}
                            // name="facilityPhone"
                            // value={initialValues ? initialValues.facilityPhone : ''}
                            />
                            {errors.facilityPhone && <p className="ac__required">{errors.facilityPhone.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">
                              Fax Number <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('faxNumber', { required: 'Fax Number is required' })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                            // value={faxNumber}
                            // name="faxNumber"
                            // value={initialValues ? initialValues.faxNumber : ''}
                            />
                            {errors.faxNumber && <p className="ac__required">{errors.faxNumber.message}</p>}
                          </div>
                        </div>

                        <div className="ac__row">
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
                              City <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('city', { required: 'City is required ', maxLength: 20 })}
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
                              State <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('state', { required: 'State is required ', maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                            // value={nip}
                            // name="nip"
                            // value={initialValues ? initialValues.nip : ''}
                            />
                            {errors.state && <p className="ac__required">{errors.state.message}</p>}
                          </div>
                        </div>

                        <div className="ac__row">
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

                          <div className="ac__column">
                            <div className="ac__label">
                              NPI <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('npi', { required: 'NPI is required ', maxLength: 20 })}
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
                              {...register('taxId', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                            // value={taxId}
                            // name="taxId"
                            // value={initialValues ? initialValues.taxId : ''}
                            />
                          </div>
                        </div>

                        <div className="ac__row">
                          <div className="ac__column">
                            <div className="ac__label">Medical ID</div>
                            <TextField
                              {...register('medicalId', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                            // value={medicalId}
                            // name="medicalId"
                            // value={initialValues ? initialValues.medicalId : ''}
                            />
                          </div>
                          <div className="ac__column">
                            <div className="ac__label">Website</div>
                            <TextField
                              {...register('website', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                            // value={website}
                            // name="website"
                            // value={initialValues ? initialValues.website : ''}
                            />
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

                        <div className="ac__row">
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
