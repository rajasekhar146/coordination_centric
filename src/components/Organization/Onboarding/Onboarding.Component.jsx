import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Signup from '../../../pages/signup';
import AcceptanceCriteria from '../../../pages/acceptance-criteria';
import BankInformation from '../../../pages/bank-information';
import ServiceLevelAgreement from '../../../pages/service-level-agreement';
import TermsAndConditions from '../../../pages/terms-and-conditions';
import headerImage from '../../../assets/images/header_image.png'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import './Onboarding.Component.css'
import SAASAgreement from '../../../pages/saasagreement';
import EULAAgreement from '../../../pages/eula-agreement';
import SignupComplete from '../../../pages/signup-complete';
const steps = ['Acceptance Criteria', 'Service Level Agreement', 'SAAS Agreement',  'EULA Agreement', 'Banking Information', 'T&C and Policies'];


export const OnboardingComponent = () => {
    const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


    return (
        <div className="ob__main__section">
        <div className="ob__align__center">
        <div className="ob__header__section"><img src={headerImage} alt="logo" /></div>
        <div className="ob__content__section">
        <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        //   if (isStepOptional(index)) {
        //     labelProps.optional = (
        //       <Typography variant="caption">Optional</Typography>
        //     );
        //   }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
        
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{(activeStep + 1 === 1 ? <AcceptanceCriteria/> : null)}
          {(activeStep + 1 === 2 ? <ServiceLevelAgreement /> : null)}
          {(activeStep + 1 === 3 ? <SAASAgreement /> : null)}
          {(activeStep + 1 === 4 ? <EULAAgreement /> : null)}
          {(activeStep + 1 === 5 ? <BankInformation /> : null)}
          {(activeStep + 1 === 6 ? <TermsAndConditions /> : null)}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {activeStep == 0 ? null : <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            className="ob__back__btn"
          >
            Back
          </Button>}
            
            <Box sx={{ flex: '1 1 auto' }} />
            
            <Button onClick={handleNext} className="ob__next__btn">
              {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next '} &nbsp;<ArrowForwardIosRoundedIcon />
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
        </div>
        
        </div>
        </div>
    )
}
export default OnboardingComponent
