import React, { useEffect } from 'react'
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

const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Policies']

const AcceptanceCriteriaComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [planType, setPlanType] = React.useState('')
  const [processSteps, setProcessSteps] = React.useState(steps)
  const [initialValues, setInitialFormData] = React.useState({})
  const {
    register,
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

    localStorage.setItem('facility', JSON.stringify(data))

    history.push('/service-level-agreement')
  }

  useEffect(() => {
    const planType = localStorage?.getItem('plan_type')

    if (planType == undefined) localStorage.setItem('plan_type', 'F')
    if (planType?.trim().toLocaleUpperCase() === 'F') {
      const newSteps = steps.filter((step, i) => i != 2)
      setProcessSteps(newSteps)
      console.log('newSteps', newSteps)
    }

    const updateFacility = localStorage.getItem('facility')

    if (updateFacility != null) {
      const newFacility = JSON.parse(updateFacility)
      console.log('updateFacility', newFacility)
      setInitialFormData(newFacility)
    } else {
      setInitialFormData({
        facilityName: '',
        facilityEmail: '',
        facilityPhone: '',
        faxNumber: '',
        facilityAddress: '',
        nip: '',
        taxId: '',
        medicalId: '',
        website: '',
        about: '',
        planType: planType == 'P' ? 'premium' : 'free',
        saas_certificate: '',
        business_certificate: '',
        eula_certificate: '',
        admin: {
          fullName: '',
          email: '',
          phoneNumber: '',
        },
      })
    }

    setPlanType('F')

    if (planType?.trim().toLocaleUpperCase() === 'F') {
      const newSteps = steps.filter((step, i) => i != 2)
      setProcessSteps(newSteps)
      console.log('newSteps', newSteps)
    }

    if (planType === '') setPlanType('F')
    else setPlanType(planType)
  }, [])

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
                              // defaultValue={initialValues?.admin?.fullName}
                              InputProps={{ className: 'ac__text__box' }}
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
                              defaultValue={initialValues?.admin?.email}
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
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              defaultValue={initialValues?.admin?.phoneNumber}
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
                              defaultValue={initialValues?.facilityName}
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
                              defaultValue={initialValues?.facilityEmail}
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
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              defaultValue={initialValues?.facilityPhone}
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
                              defaultValue={initialValues?.faxNumber}
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
                              defaultValue={initialValues?.facilityAddress}
                            />
                            {errors.facilityAddress && <p className="ac__required">{errors.facilityAddress.message}</p>}
                          </div>
                        </div>

                        <div className="ac__row">
                          <div className="ac__column">
                            <div className="ac__label">
                              NIP <span className="ac__required">*</span>
                            </div>
                            <TextField
                              {...register('nip', { required: 'NIP is required ', maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              defaultValue={initialValues?.nip}
                            />
                            {errors.nip && <p className="ac__required">{errors.nip.message}</p>}
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">Tax ID</div>
                            <TextField
                              {...register('taxId', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              defaultValue={initialValues?.taxId}
                            />
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">Medical ID</div>
                            <TextField
                              {...register('medicalId', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              defaultValue={initialValues?.medicalId}
                            />
                          </div>
                        </div>

                        <div className="ac__row">
                          <div className="ac__column">
                            <div className="ac__label">Website</div>
                            <TextField
                              {...register('website', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                              defaultValue={initialValues?.medicalId}
                            />
                          </div>

                          <div className="ac__column">
                            <div className="ac__label">How did you hear about us?</div>
                            <TextField
                              {...register('about', { maxLength: 20 })}
                              InputProps={{ className: 'ac__text__box' }}
                              margin="normal"
                            />
                          </div>
                        </div>

                        <div className="ac__gap__div"></div>

                        <div className="ac__row">
                          <div className="ac__column ac__left__action">
                            <Button color="inherit" className="ac__back__btn">
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
