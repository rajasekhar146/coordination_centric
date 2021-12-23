import React, { useState, useEffect } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import './TermsAndConditions.Component.css'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import headerImage from '../../../assets/images/header_image.png'
import Button from '@mui/material/Button'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import history from '../../../history'
import { organizationService } from '../../../services'
import Modal from '@mui/material/Modal'
import PrivacyPolicyComponent from '../PrivacyPolicy/PrivacyPolicy.Component'
import TermsAndConditionsPageComponent from '../TermsAndConditionsPage/TermsAndConditionsPage.Component'
const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Privacy Policy']

const ModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  overflow: 'auto',
  p: 4,
}

const TermsAndConditionsComponent = () => {
  const [signatureUrl, setSignature] = useState({})
  const [value, setValue] = useState(null)
  var sigPad = {}
  const [processSteps, setProcessSteps] = React.useState(steps)

  const [activeStep, setActiveStep] = React.useState(3)
  const [readTermsAndCondtions, setReadTermsAndConditions] = React.useState(false)
  const [readPrivacyPolicy, setReadPrivacyPolicy] = React.useState(false)
  const [isOpenPrivacyPolicy, setPrivacyPolicy] = React.useState(false)
  const [isOpenTermsAndConditionsPage, setTermsAndConditionsPage] = React.useState(false)

  const handleNext = async () => {
    const updateFacility = JSON.parse(localStorage.getItem('facility'))
    console.log('facility >> before', updateFacility)

    if (Object.prototype.hasOwnProperty.call(updateFacility, 'slaSign')) delete updateFacility['slaSign']
    if (Object.prototype.hasOwnProperty.call(updateFacility, 'saasSign')) delete updateFacility['saasSign']
    if (Object.prototype.hasOwnProperty.call(updateFacility, 'eulaSign')) delete updateFacility['eulaSign']

    var response = await organizationService.signupOrganization(updateFacility)

    if (response?.status === 200) {
      localStorage.removeItem('facility')
      history.push('/signup-completed')
    }
    // else {
    //   history.push('/signup-completed')
    // }

    console.log('response', response)
  }

  const handleBack = () => {
    const planType = localStorage?.getItem('plan_type')
    if (planType === 'F') history.push('/eula-agreement')
    else history.push('/bank-info')
  }

  useEffect(() => {
    const planType = localStorage.getItem('plan_type')
    if (planType == undefined) localStorage.setItem('plan_type', 'F')
    if (planType?.trim().toLocaleUpperCase() === 'F') {
      const newSteps = steps.filter((step, i) => i != 2)
      setProcessSteps(newSteps)
      console.log('newSteps', newSteps)
    }
  }, [])

  const openPopup = pType => {
    if (pType == 'privacy') setPrivacyPolicy(true)
    else setTermsAndConditionsPage(true)
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
                <div className="ac__title__text">T&C and Privacy Policy</div>
                <div className="ac__subtitle__text">
                  Please read carefully our terms and conditions and policies to finalize your registration
                </div>
                <div>
                  <div className="ac__form">
                    <div className="ac__header__text tp__header__text">T&C and Privacy Policy</div>
                    <div id="my-node">
                      <div className="ac__row">
                        <FormGroup>
                          <div className="ac__column">
                            <div className="ac__same__link">
                              <div>
                                <Checkbox
                                disabled
                                 checked={readTermsAndCondtions}
                                  onChange={e => {
                                    setReadTermsAndConditions(e.target.checked)
                                  }}
                                />
                              </div>
                              <div>
                                I have read and agree with the{' '}
                                <Button className="ac__hyper__link" onClick={e => openPopup('terms-and-conditions')}>
                                  Terms and Conditions
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="ac__column">
                            <div className="ac__same__link">
                              <div>
                                <Checkbox
                                  disabled
                                  checked={readPrivacyPolicy}
                                  onChange={e => {
                                    setReadPrivacyPolicy(e.target.checked)
                                  }}
                                />
                              </div>
                              <div>
                                I have read and agree with the{' '}
                                <Button onClick={e => openPopup('privacy')} className="ac__hyper__link">
                                  Privacy Policy
                                </Button>
                              </div>
                            </div>
                          </div>
                        </FormGroup>
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
                        <Button
                          className={
                            readTermsAndCondtions && readPrivacyPolicy ? 'ac__next__btn' : 'ac__next__btn_disable'
                          }
                          onClick={handleNext}
                        >
                          Submit
                          <ArrowForwardIosRoundedIcon />
                        </Button>
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
      <Modal
        open={isOpenPrivacyPolicy}
        onClose={() => setPrivacyPolicy(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModelStyle}>
          <PrivacyPolicyComponent setReadPrivacyPolicy={setReadPrivacyPolicy} setPrivacyPolicy={setPrivacyPolicy}/>
        </Box>
      </Modal>

      <Modal
        open={isOpenTermsAndConditionsPage}
        onClose={() => setTermsAndConditionsPage(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModelStyle}>
          <TermsAndConditionsPageComponent setTermsAndConditionsPage={setTermsAndConditionsPage} setReadTermsAndConditions={setReadTermsAndConditions}/>
        </Box>
      </Modal>
    </div>
  )
}

export default TermsAndConditionsComponent
