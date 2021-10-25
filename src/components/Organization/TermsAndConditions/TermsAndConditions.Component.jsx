import React, { useState } from 'react'
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

const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Policies']

const TermsAndConditionsComponent = () => {
  const [signatureUrl, setSignature] = useState({})
  const [value, setValue] = useState(null)
  var sigPad = {}

  const [activeStep, setActiveStep] = React.useState(3)

  const handleNext = async () => {
    const updateFacility = JSON.parse(localStorage.getItem('facility'))

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
    history.push('/bank-info')
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
              {steps.map((label, index) => {
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
                <div className="ac__title__text">T&C and Policies</div>
                <div className="ac__subtitle__text">
                  Please read carefully our terms and conditions and policies to finalize your registration
                </div>
                <div>
                  <div className="ac__form">
                    <div className="ac__header__text tp__header__text">T&C and Pocicies</div>
                    <div id="my-node">
                      <div className="ac__row">
                        <FormGroup>
                          <div className="ac__column">
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="I have read and agree with the terms and conditions"
                            />
                          </div>
                          <div className="ac__column">
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="I have read and agree with the Privacy Policy"
                            />
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
                        <Button className="ac__next__btn" onClick={handleNext}>
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
    </div>
  )
}

export default TermsAndConditionsComponent
