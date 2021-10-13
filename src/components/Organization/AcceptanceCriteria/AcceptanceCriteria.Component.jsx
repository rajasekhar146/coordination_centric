import * as React from 'react'
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

  const onButtonClick = () => {}

  const handleNext = () => {
    history.push('/service-level-agreement')
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
                <div className="ac__title__text">Welcome to Coordination Centric!</div>
                <div className="ac__subtitle__text">
                  For the purpose of registration please fill the required fields of this form to join our platform.
                </div>
                <div>
                  <div className="ac__form">
                    <div className="ac__header__text">Adminís Info</div>
                    <div>
                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            Full Name <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Email <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Phone Number <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>
                      </div>
                    </div>

                    <div className="ac__gap__div"></div>

                    <div className="ac__header__text">Organizationís Info</div>
                    <div>
                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            Name <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Email <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            Phone Number <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">
                            Fax Number <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            Address <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">
                            NIP <span className="ac__required">*</span>
                          </div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">Tax ID</div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">Medical ID</div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>
                      </div>

                      <div className="ac__row">
                        <div className="ac__column">
                          <div className="ac__label">Website</div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>

                        <div className="ac__column">
                          <div className="ac__label">How did you hear about us?</div>
                          <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
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
