import React, { useState } from 'react'
import './MemberLeftMenu.css'
import LeftMenuLogo from '../../assets/images/member_logo.png'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { setQuickProfileSetup } from '../../redux/actions/commonActions'
import { useSelector, useDispatch } from 'react-redux'
const steps = [
  {
    label: 'Personal Detail',
  },
  {
    label: 'Setting your account',
  },
]

const MemberLeftMenu = () => {
  const currentStep = useSelector(state => state.quickProfileSetupReducer)
  const { activeStep } = useState(currentStep.activeStep || 0)
  console.log('activeStep', currentStep)
  return (
    <div className="mlm__main__div">
      <div className="mlm__row">
        <div className="mlm__logo__div">
          <img src={LeftMenuLogo} alt="Logo" className="mlm__logo" />
        </div>
      </div>
      <div className="mlm__row">
        <div className="mlm__quick__setup">Quick Setup</div>
      </div>
      <div className="mlm__row">
        <div className="mlm__quick__setup">
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={currentStep.activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label} >
                  <StepLabel disabled optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>

      <div className="mlm__need__help">Need help? Connect with our support</div>
    </div>
  )
}

export default MemberLeftMenu
