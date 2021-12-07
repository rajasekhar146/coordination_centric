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
import { useSelector, useDispatch } from 'react-redux'
import { commonService } from '../../../services'
import FormControl from '@mui/material/FormControl'

import get from 'lodash.get'
import { paymentService } from '../../../services'
import { TrustProductsEvaluationsPage } from 'twilio/lib/rest/trusthub/v1/trustProducts/trustProductsEvaluations'

const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Privacy Policy']

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
  const [countries, setAllCountries] = useState([])
  const [facility, setFacility] = useState({})
  const [message, setMessage] = useState(null)
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
    setMessage(null)
    console.log('card data', data)
    getCardDetail(data)
    //history.push('/terms-condition')
  }

  const handleBack = () => {
    history.push('/eula-agreement')
  }

  const fetchCountries = async () => {
    const response = await commonService.getCountries().catch(error => {
      console.log(error)
    })

    console.log('getCountries', response.data.data.data)
    setAllCountries(response.data.data.data)
  }

  const captureSignature = () => {
    setSignature({ signatureUrl: sigPad.getTrimmedCanvas().toDataURL('image/png') })
  }

  const handleCardSection = () => {
    setMessage(null)
    clearFormData()
    setCardSection(!cardSection)
  }

  const clearFormData = () => {
    setValue('nameOnCard', '')
    setValue('cardNumber', '')
    setValue('expiry', '')
    setValue('cvv', '')
    setValue('country', '')
    setValue('accountNo', '')
    setValue('routingNo', '')
    setValue('name', '')
  }

  const getCardDetail = async data => {
    const currentUser = JSON.parse(localStorage.getItem('facility'))
    const currentUserEmail = get(currentUser, ['email'], '')
    const orgName = get(currentUser, ['facilityName'], '')
    console.log('currentUser ', currentUser)
    console.log('currentUserEmail, orgName ', currentUserEmail, orgName)
    var updatedFacility = facility
    if (cardSection) {
      const ncardExpiry = data.expiry.split('/')
      const cardDetail = {
        card: { number: data.cardNumber, exp_year: ncardExpiry[1], exp_month: ncardExpiry[0], cvc: data.cvv },
      }

      await paymentService
        .generateToken(cardDetail)
        .then(response => {
          console.log('response >> card >> ', response)
          if (response.status === 200) {
            const customerId = get(response, ['data', 'data', 'card', 'id'], '')
            const tokenId = get(response, ['data', 'data', 'id'], '')
            const saveDetail = {
              email: currentUserEmail,
              token: tokenId,
              type: 'card',
              customerId: '',
              default: true,
              organizationName: orgName,
            }
            console.log('saveDetail', saveDetail)
            paymentService
              .savePaymentMethod(saveDetail)
              .then(response => {
                console.log('savePaymentMethod >> response >> ', response)
                const sCustomerId = get(response, ['data', 'data', 'stripe_customer_id'], '')
                const sPaymentId = get(response, ['data', 'data', 'stripe_payment_id'], '')
                updatedFacility.stripePayment = [
                  {
                    stripePaymentMethodID: sPaymentId,
                    default: true,
                    type: 'card',
                  },
                ]
                updatedFacility.stripeCustomerID = sCustomerId
                localStorage.setItem('facility', JSON.stringify(updatedFacility))
                console.log('success', response)
                console.log('success >> ', sCustomerId, sPaymentId)
                history.push('/terms-condition')
              })
              .catch(err => {
                console.log('Save Card Detail >> Err Response', err)
              })
          } else {
            const msg = get(response, ['data', 'message'], '')
            console.log('msg', msg)
            setMessage(msg)
          }
        })
        .catch(err => {
          console.log('Card Detail >> Err Response', err)
          const msg = get(err, ['data', 'message'], '')
          setMessage(msg)
        })
    } else {
      const bankDetail = {
        bank_account: {
          country: 'US',
          currency: 'usd',
          account_holder_name: data.name,
          account_holder_type: 'individual',
          routing_number: data.routingNo,
          account_number: data.accountNo,
        },
      }

      console.log('Bank Detail', bankDetail)

      await paymentService
        .generateBankToken(bankDetail)
        .then(response => {
          console.log('Bank Token', response)
          if (response.status === 200) {
            const customerId = get(response, ['data', 'data', 'bank_account', 'id'], '')
            const tokenId = get(response, ['data', 'data', 'id'], '')
            const saveDetail = {
              email: currentUserEmail,
              token: tokenId,
              type: 'account',
              customerId: '',
              default: TrustProductsEvaluationsPage,
              organizationName: orgName,
            }

            paymentService
              .savePaymentMethod(saveDetail)
              .then(response => {
                const sCustomerId = get(response, ['data', 'data', 'stripe_customer_id'], '')
                const sPaymentId = get(response, ['data', 'data', 'stripe_payment_id'], '')
                updatedFacility.stripePayment = [
                  {
                    stripePaymentMethodID: sPaymentId,
                    default: true,
                    type: 'account',
                  },
                ]
                updatedFacility.stripeCustomerID = sCustomerId
                localStorage.setItem('facility', JSON.stringify(updatedFacility))
                console.log('success', response)
                console.log('success >> ', sCustomerId, sPaymentId)
                history.push('/terms-condition')
              })
              .catch(err => {
                console.log('Save Card Detail >> Err Response', err)
              })
          } else {
            const msg = get(response, ['data', 'message'], '')
            setMessage(msg)
          }
        })
        .catch(err => {
          console.log('Card Detail >> Err Response', err)
          const msg = get(err, ['data', 'message'], '')
          setMessage(msg)
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
  useEffect(async () => {
    await fetchCountries()
    var updateFacility = JSON.parse(localStorage.getItem('facility'))
    console.log('Bank >> updateFacility', updateFacility)
    setFacility(updateFacility)
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
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                                    maxLength={16}
                                    className="bi__text__box"
                                    characterLimit={16}
                                    margin="normal"
                                    type="number"
                                    onInput={e => {
                                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
                                    }}
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
                                      maxLength={5}
                                      characterLimit={5}
                                      onInput={e => {
                                        e.target.value = e.target.value.toString().slice(0, 5)
                                      }}
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
                                      margin="normal"
                                      maxLength={4}
                                      characterLimit={4}
                                      onInput={e => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                                      }}
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
                                  <select {...register('country')} className="bi__dropdown">
                                    {countries &&
                                      countries.map(c => (
                                        <option value={c.code} key={c.code} className="bi__dropdown">
                                          {c.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                {errors.country && <p className="ac__required ml_15">{errors.country.message}</p>}
                              </div>
                            ) : (
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
                                {/*} <Button type="submit" id="continue" className="ac__next__btn continue_btn">
                                  Pay & Continue
                                  <ArrowForwardIosRoundedIcon />
                                  </Button> */}
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
                                    label="I have read and agree with the Subscription Agreement"
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
                        {message && message.length > 0 ? <div className="bi__error">{message}</div> : null}

                        <div className="ac__column ac__right__action">
                          <Button type="submit" for="continue" className="ac__next__btn">
                            Pay & Continue
                            <ArrowForwardIosRoundedIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
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
