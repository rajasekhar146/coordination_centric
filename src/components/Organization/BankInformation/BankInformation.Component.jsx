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
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'


const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Policies']


const useStyles = makeStyles(theme => ({
  textField: {
    width: '65%',
    marginLeft: '20px',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    background: '#FFFFFF',
    borderRadius: 8,
    border: '1px solid #CACCCF',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    color: '#838486',
    height: '44px',
    textAlign: 'center',
  },
}))


const BankInformationComponent = () => {
  const classes = useStyles()

  const [signatureUrl, setSignature] = useState({})
  const [value, setValue] = useState(null)
  const [cardSection, setCardSection] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)


  var sigPad = {}


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

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
                            <form onSubmit={handleSubmit(handleNext)}>
                              <div id="div_cc">
                                <div className="ac__row">
                                  <div className="ac__label">Name on card</div>
                                </div>
                                <div className="ac__row">
                                  <TextField
                                    className="bi__text__box"
                                    margin="normal"
                                    {...register('nameOnCard', {
                                      required: 'Name On Card is required.',
                                      // pattern: {
                                      //   value:
                                      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      //   message: 'Please enter a valid email',
                                      // },
                                    })}
                                  />
                                  {errors.nameOnCard && <p className="ac__required ml_15">{errors.nameOnCard.message}</p>}

                                </div>
                                <div className="ac__row">
                                  <div className="ac__label">Card number</div>
                                </div>
                                <div className="ac__row">
                                  <TextField
                                    className="bi__text__box"
                                    margin="normal"
                                    {...register('cardNumber', {
                                      required: 'Card number is required.',
                                      // pattern: {
                                      //   value:
                                      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      //   message: 'Please enter a valid email',
                                      // },
                                    })}
                                  />
                                  {errors.cardNumber && <p className="ac__required ml_15">{errors.cardNumber.message}</p>}
                                </div>
                                <div className="ac__row">
                                  <div className="ac__label bi__space__expiry">Expiry</div>
                                  <div className="ac__label">CVV</div>
                                </div>
                                <div className="ac__row">
                                  <div className="bi__expiry__text__box">
                                    <TextField
                                      margin="normal"
                                      placeholder="MM/YY"
                                      {...register('expiry', {
                                        required: 'expiry is required.',
                                        // pattern: {
                                        //   value:
                                        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        //   message: 'Please enter a valid email',
                                        // },
                                      })}
                                    />
                                    {errors.expiry && <p className="ac__required ml_15">{errors.expiry.message}</p>}

                                  </div>
                                  <div className="bi__expiry__text__box">
                                    <TextField
                                      id=""
                                      type="password"
                                      defaultValue="123"
                                      margin="normal"
                                      {...register('cvv', {
                                        required: 'cvv is required.',
                                        // pattern: {
                                        //   value:
                                        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        //   message: 'Please enter a valid email',
                                        // },
                                      })}
                                    />
                                    {errors.cvv && <p className="ac__required ml_15">{errors.cvv.message}</p>}
                                  </div>
                                </div>
                                <div className="ac__row">
                                  <div className="ac__label">Country or Region</div>
                                </div>
                                <div className="ac__row">
                                  <Select
                                    style={{ width: 345, height: 40 }}
                                    {...register('country', {
                                      required: 'Country is required.',
                                      // pattern: {
                                      //   value:
                                      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      //   message: 'Please enter a valid email',
                                      // },
                                    })}
                                    // onChange={(e) => {
                                    //   e.target.value
                                    // }}
                                    id="demo-simple-select-helper">
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
                                {errors.country && <p className="ac__required ml_15">{errors.country.message}</p>}

                              </div>
                              <Button type="submit" id="continue" className="ac__next__btn continue_creditcard_btn">
                                Pay & Continue
                                <ArrowForwardIosRoundedIcon />
                              </Button>
                            </form>

                          ) : (
                            <form onSubmit={handleSubmit(handleNext)}>
                              <div id="div_dc">
                                <div className="ac__row">
                                  <div className="ac__label">
                                    Bank Account Number <span className="ac__required">*</span>
                                  </div>
                                </div>
                                <div className="ac__row">
                                  <TextField
                                    {...register('accountNo', {
                                      required: 'Account No is required.',
                                      // pattern: {
                                      //   value:
                                      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      //   message: 'Please enter a valid email',
                                      // },
                                    })}
                                    error={errors.accountNo && isSubmit}
                                    className={classes.textField}
                                    margin="normal" />
                                  {errors.accountNo && <p className="ac__required ml_15">{errors.accountNo.message}</p>}

                                </div>
                                <div className="ac__row">
                                  <div className="ac__label">
                                    Routing Number <span className="ac__required">*</span>
                                  </div>
                                </div>
                                <div className="ac__row">
                                  <TextField
                                    {...register('routingNo', {
                                      required: 'Routing Number is required.',
                                      // pattern: {
                                      //   value:
                                      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      //   message: 'Please enter a valid email',
                                      // },
                                    })}
                                    error={errors.routingNo && isSubmit}
                                    className={classes.textField}
                                    margin="normal" />
                                  {errors.routingNo && <p className="ac__required ml_15">{errors.routingNo.message}</p>}

                                </div>
                                <div className="ac__row">
                                  <div className="ac__label">
                                    Name Associated with Bank Account <span className="ac__required">*</span>
                                  </div>
                                </div>
                                <div className="ac__row">
                                  <TextField
                                    {...register('name', {
                                      required: 'Name is required.',
                                      // pattern: {
                                      //   value:
                                      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      //   message: 'Please enter a valid email',
                                      // },
                                    })}
                                    className={classes.textField}
                                    error={errors.name && isSubmit}
                                    margin="normal" />
                                  {errors.name && <p className="ac__required ml_15">{errors.name.message}</p>}

                                </div>
                                <Button type="submit" id="continue" className="ac__next__btn continue_btn">
                                  Pay & Continue
                                  <ArrowForwardIosRoundedIcon />
                                </Button>

                              </div>
                            </form>
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

                      {/* <div className="ac__column ac__right__action">
                        <Button type="submit" for="continue" className="ac__next__btn">
                          Pay & Continue
                          <ArrowForwardIosRoundedIcon />
                        </Button>
                      </div> */}
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
