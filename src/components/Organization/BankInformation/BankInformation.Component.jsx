import React, { useState } from 'react'
import './BankInformation.Component.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import headerImage from '../../../assets/images/header_image.png'
import Button from '@mui/material/Button'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import history from '../../../history'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import jsPDF from 'jspdf'
import * as htmlToImage from 'html-to-image'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Policies']

const BankInformationComponent = () => {
  const [signatureUrl, setSignature] = useState({})
  const [value, setValue] = useState(null)
  const [cardSection, setCardSection] = useState(false)

  var sigPad = {}

  const [activeStep, setActiveStep] = React.useState(2)

  const handleNext = () => {
    history.push('/terms-condition')
  }

  const handleBack = () => {
    history.push('/eula-agreement')
  }

  const captureSignature = () => {
    setSignature({ signatureUrl: sigPad.getTrimmedCanvas().toDataURL('image/png') })
  }

  const handleCardSection = () => {
    setCardSection(!cardSection)
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
                <div className="ac__title__text">Banking Information</div>
                <div className="ac__subtitle__text">Please provide us your prefered payment method.</div>
                <div>
                  <div className="ac__form">
                    <div className="ac__header__text">Organization Banking Info</div>
                    <div id="my-node">
                      <div className="bi__content__section">
                        <div className="bi__left__section"></div>
                        <div className="bi__content__center">
                          {cardSection ? (
                            <div id="div_cc">
                              <div className="ac__row">
                                <div className="ac__label">Name on card</div>
                              </div>
                              <div className="ac__row">
                                <TextField className="bi__text__box" margin="normal" />
                              </div>
                              <div className="ac__row">
                                <div className="ac__label">Card number</div>
                              </div>
                              <div className="ac__row">
                                <TextField className="bi__text__box" margin="normal" />
                              </div>
                              <div className="ac__row">
                                <div className="ac__label bi__space__expiry">Expiry</div>
                                <div className="ac__label">CVV</div>
                              </div>
                              <div className="ac__row">
                                <div className="bi__expiry__text__box">
                                  <TextField margin="normal" placeholder="MM/YY" />
                                </div>
                                <div className="bi__expiry__text__box">
                                  <TextField id="" type="password" defaultValue="123" margin="normal" />
                                </div>
                              </div>
                              <div className="ac__row">
                                <div className="ac__label">Country or Region</div>
                              </div>
                              <div className="ac__row">
                                <Select style={{ width: 345, height: 40 }} id="demo-simple-select-helper">
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem className="bi__menu__text" value={10}>
                                    India
                                  </MenuItem>
                                  <MenuItem className="bi__menu__text" value={20}>
                                    Australia
                                  </MenuItem>
                                  <MenuItem className="bi__menu__text" value={30}>
                                    England
                                  </MenuItem>
                                </Select>
                              </div>
                            </div>
                          ) : (
                            <div id="div_dc">
                              <div className="ac__row">
                                <div className="ac__label">
                                  Bank Account Number <span className="ac__required">*</span>
                                </div>
                              </div>
                              <div className="ac__row">
                                <TextField className="bi__text__box" margin="normal" />
                              </div>
                              <div className="ac__row">
                                <div className="ac__label">
                                  Routing Number <span className="ac__required">*</span>
                                </div>
                              </div>
                              <div className="ac__row">
                                <TextField className="bi__text__box" margin="normal" />
                              </div>
                              <div className="ac__row">
                                <div className="ac__label">
                                  Name Associated with Bank Account <span className="ac__required">*</span>
                                </div>
                              </div>
                              <div className="ac__row">
                                <TextField className="bi__text__box" margin="normal" />
                              </div>
                            </div>
                          )}

                          <div className="ac__row">
                            <div className="bi__or__pay__text">
                              {' '}
                              <Button onClick={handleCardSection} color="inherit">
                                Or pay with {cardSection ? 'Direct' : 'Credit'} card
                              </Button>
                            </div>
                          </div>
                          <div className="ac__gap__bottom__div"></div>
                          <div className="ac__row">
                            <FormGroup>
                              <div className="ac__column">
                                <FormControlLabel
                                  className="bi__checkbox__text"
                                  control={<Checkbox defaultChecked />}
                                  label="Auto Renew Subscription?"
                                />
                              </div>
                              <div className="ac__column">
                                <FormControlLabel
                                  className="bi__checkbox__text"
                                  control={<Checkbox defaultChecked />}
                                  label="I have read and agree with the Subscription Aggrement"
                                />
                              </div>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="bi__left__section"></div>
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
                          Pay & Continue
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

export default BankInformationComponent
