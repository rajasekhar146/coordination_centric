import React, { useState, useEffect } from 'react'
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
import { loadStripe } from '@stripe/stripe-js/pure'

import get from 'lodash.get'
import { paymentService } from '../../../services'

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

const stripe = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

const BankInformationComponent = () => {
  const classes = useStyles()

  const [signatureUrl, setSignature] = useState({})
  // const [value, setValue] = useState(null)
  const [cardSection, setCardSection] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [cardName, setCardName] = useState(null)
  const [cardNumber, setCardNumber] = useState(null)
  const [cardExpiry, setCardExpiry] = useState(null)
  const [cardCVV, setCardCVV] = useState(null)
  const [country, setCountry] = useState(null)

  var sigPad = {}

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const [activeStep, setActiveStep] = React.useState(2)

  const onSubmit = data => {
    console.log('card data', data)
    getCardDetail(data)
    //history.push('/terms-condition')
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

  const getCardDetail = async data => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))                   
    const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')
   
    if (cardSection) {
      const ncardExpiry = data.expiry.split('/')
      const cardDetail = {
        card: { number: data.cardNumber, 
          exp_year: ncardExpiry[1], 
          exp_month: ncardExpiry[0], 
          cvc: data.cvv 
        },
      }
    
      await paymentService
        .generateToken(cardDetail)
        .then(response => {         
          const customerId = get(response, ['data', 'data', 'card', 'id'], '')
          const tokenId = get(response, ['data', 'data', 'id'], '')
          const saveDetail = {
            email: currentUserEmail,
            token: tokenId,
            type: 'card',
            customerId: '',
            default: false
          }
          console.log(saveDetail)
          paymentService.savePaymentMethod(saveDetail)
          .then(response => {
            console.log('success', response)
            history.push('/terms-condition')
          })
          .catch(err => {
            console.log('Save Card Detail >> Err Response', err)
          })
        })
        .catch(err => {
          console.log('Card Detail >> Err Response', err)
        })
    } else {
      const bankDetail = { bank_account :  
          { 
            country : "US", 
            currency : "usd", 
            account_holder_name : data.name, 
            account_holder_type : "individual", 
            routing_number : data.routingNo, 
            account_number : data.accountNo 
          } 
        }      

      console.log('Bank Detail', bankDetail)

      await paymentService
        .generateBankToken(bankDetail)
        .then(response => {     
          console.log('Bank Token', response)    
          const  customerId = get(response, ['data', 'data', 'bank_account', 'id'], '')
          const tokenId = get(response, ['data', 'data', 'id'], '')
          const saveDetail = {
            email: currentUserEmail,
            token: tokenId,
            type: 'account',
            customerId: '',
            default: false
          }
          
          paymentService.savePaymentMethod(saveDetail)
          .then(response => {
            console.log('success', response)
            history.push('/terms-condition')
          })
          .catch(err => {
            console.log('Save Card Detail >> Err Response', err)
          })
        })
        .catch(err => {
          console.log('Card Detail >> Err Response', err)
        })

    }

    //const response = paymentService.generateToken()
  }
  // const createToken = async () => {
  //   const accountResult = await stripe.createToken('account', {
  //     business_type: 'company',
  //     company: {
  //       name: 'ABC Hospital',//document.querySelector('.inp-company-name').value,
  //       address: {
  //         line1: 'Address1',//document.querySelector('.inp-company-street-address1').value,
  //         city: 'Salem', //document.querySelector('.inp-company-city').value,
  //         state: 'TN', ///document.querySelector('.inp-company-state').value,
  //         postal_code: '235689' //document.querySelector('.inp-company-zip').value,
  //       },
  //     },
  //     tos_shown_and_accepted: true,
  //   });
  // }
  // const loadError = (onError) => {
  //   console.error(`Failed ${onError.target.src} didn't load correctly`);
  // }
  useEffect(() => {
    //loadStripe.setLoadParameters({advancedFraudSignals: false});
    //createToken()
    // const LoadExternalScript = () => {
    //   const externalScript = document.createElement("script");
    //   externalScript.onerror = loadError;
    //   externalScript.id = "external";
    //   externalScript.async = true;
    //   externalScript.type = "text/javascript";
    //   externalScript.setAttribute("crossorigin", "*");
    //   document.body.appendChild(externalScript);
    //   externalScript.src = `https://js.stripe.com/v3/`;
    // };
    // LoadExternalScript();
  })

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
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                  {errors.nameOnCard && (
                                    <p className="ac__required ml_15">{errors.nameOnCard.message}</p>
                                  )}
                                </div>
                                <div className="ac__row">
                                  <div className="ac__label">Card number</div>
                                </div>
                                <div className="ac__row">
                                  <TextField
                                    className="bi__text__box"
                                    margin="normal"
                                    onChange={e => setCardNumber(e.target.value)}
                                    {...register('cardNumber', {
                                      required: 'Card number is required.',
                                      // pattern: {
                                      //   value:
                                      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      //   message: 'Please enter a valid email',
                                      // },
                                    })}
                                  />
                                  {errors.cardNumber && (
                                    <p className="ac__required ml_15">{errors.cardNumber.message}</p>
                                  )}
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
                                      onChange={e => setCardCVV(e.target.value)}
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
                                      onChange={e => setCardExpiry(e.target.value)}
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
                                    id="demo-simple-select-helper"
                                  >
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
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    margin="normal"
                                  />
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
                                    margin="normal"
                                  />
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
                                    margin="normal"
                                  />
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
