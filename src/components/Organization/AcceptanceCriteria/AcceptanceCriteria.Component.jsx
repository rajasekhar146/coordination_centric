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
import history from '../../../history'

const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Policies']

const AcceptanceCriteriaComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [facilityName, setFacilityName] = React.useState('')
  const [facilityEmail, setFacilityEmail] = React.useState('')
  const [facilityPhone, setFacilityPhone] = React.useState('')
  const [faxNumber, setFaxNumber] = React.useState('')
  const [facilityAddress, setFacilityAddress] = React.useState('')
  const [nip, setNPI] = React.useState('')
  const [medicalId, setMedicalId] = React.useState('')
  const [taxId, setTaxId] = React.useState('')
  const [website, setWebsite] = React.useState('')
  const [about, setAbout] = React.useState('')
  const [planType, setPlanType] = React.useState('')
  const [saasCertificate, setSAASCertificate] = React.useState('')
  const [businessCertificate, setBusinessCertificate] = React.useState('')
  const [eulaCertificate, setEULACertificate] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [processSteps, setProcessSteps] = React.useState(steps)
  const [facility, setFacility] = React.useState({})
  const onButtonClick = () => {}

  const handleNext = () => {
    const facility = {
      facilityName: facilityName,
      facilityEmail: facilityEmail,
      facilityPhone: facilityPhone,
      faxNumber: faxNumber,
      facilityAddress: facilityAddress,
      nip: nip,
      taxId: taxId,
      medicalId: medicalId,
      website: website,
      about: about,
      planType: planType == 'P' ? 'premium': 'free',
      saas_certificate: saasCertificate,
      business_certificate: businessCertificate,
      eula_certificate: eulaCertificate,
      admin: [{
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
      }],
    }
    console.log('facility', facility)
    localStorage.setItem('facility', JSON.stringify(facility))

    history.push('/service-level-agreement')
  }

  useEffect(() => {
    const planType = localStorage.getItem('plan_type')

    const updateFacility = JSON.parse(localStorage.getItem('facility'))
    if (updateFacility) setFacility(updateFacility)

    console.log('updateFacility', updateFacility)
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
              {processSteps.map((label, index) => {
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
                            id=""
                            value={facility?.admin?.fullName}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setFullName(e.target.value)}
                          />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Email <span className="ac__required">*</span>
                          </div>
                          <TextField
                            id=""
                            value={facility?.admin?.email}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Phone Number <span className="ac__required">*</span>
                          </div>
                          <TextField
                            id=""
                            value={facility?.admin?.phoneNumber}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setPhoneNumber(e.target.value)}
                          />
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
                            id=""
                            value={facility?.facilityName}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setFacilityName(e.target.value)}
                          />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Email <span className="ac__required">*</span>
                          </div>
                          <TextField
                            id=""
                            value={facility?.facilityEmail}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setFacilityEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            Phone Number <span className="ac__required">*</span>
                          </div>
                          <TextField
                            id=""
                            value={facility?.facilityPhone}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setFacilityPhone(e.target.value)}
                          />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Fax Number <span className="ac__required">*</span>
                          </div>
                          <TextField
                            id=""
                            value={facility?.faxNumber}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setFaxNumber(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            Address <span className="ac__required">*</span>
                          </div>
                          <TextField
                            id=""
                            value={facility?.facilityAddress}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setFacilityAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            NIP <span className="ac__required">*</span>
                          </div>
                          <TextField
                            id=""
                            value={facility?.nip}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setNPI(e.target.value)}
                          />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">Tax ID</div>
                          <TextField
                            id=""
                            value={facility?.taxId}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setTaxId(e.target.value)}
                          />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">Medical ID</div>
                          <TextField
                            id=""
                            value={facility?.medicalId}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setMedicalId(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">Website</div>
                          <TextField
                            id=""
                            value={facility?.website}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setWebsite(e.target.value)}
                          />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">How did you hear about us?</div>
                          <TextField
                            id=""
                            value={facility?.about}
                            className="ac__text__box"
                            margin="normal"
                            onChange={e => setAbout(e.target.value)}
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
                          <Button className="ac__next__btn" onClick={handleNext}>
                            Save & Next &nbsp;
                            <ArrowForwardIosRoundedIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ac__gap__bottom__div"></div>
                </div>
              </div>
            }
          </Box>
        </div>
      </div>
    </div>
  )
}
export default AcceptanceCriteriaComponent
