import React, { useState, useEffect } from 'react'
import msgIcon from '../../assets/icons/msglogo.png'
import CClogo from '../../assets/icons/cc_logo_red.png'
import history from '../../history'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { authenticationService, accountService } from '../../services'
import get from 'lodash.get'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    marginLeft: 'auto',
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

const EmailVerificationPage = props => {
  const classes = useStyles()
  const [verificationCode, setVerificationCode] = useState('')

  const currentUser = authenticationService?.currentUserValue
  const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')

  const [minutes, setMinutes] = useState(3)
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [minutes, seconds])

  const handleVarification = async () => {
    console.log('currentUserEmail', currentUserEmail)
    await accountService.sendEmailVerificationCode(currentUserEmail, verificationCode)
    .then(data => {
      console.log('handleSendEmail >> ', data)
      if (data?.status == 200) history.push('/emailverification-success')
      else history.push('/emailverification-failed')
    })
    

    // var response = await organizationService.signupOrganization(updateFacility)
    // .then(data => {
    //   console.log('handleSendEmail', data)
    //   if (data.status == 200) {
    //     history.push('/emailverification-success')
    //   } else history.push('/emailverification-failed')
    //   })
    // .catch(error => {
    //   history.push('/emailverification-failed')
    // })
  }

  const handleResend = async () => {
    var response = await accountService.sendEmailWithVerificationCode(currentUserEmail)
    response.then(() => {

    }).catch(() => {

    })
  }




  return (
    <div className="io__verification">
      <div className="io__two_justify">
        <div className="io_top_logo">
          <img src={CClogo} alt="key" />
        </div>
        <div className="io_sent_logo">
          <img src={msgIcon} alt="key" />
        </div>
        <div className="io_error_label">
          <label>Verify Your Email Address </label>
        </div>
        <div className="io_apologize_label io_width60">
          <label>Enter below the code that was sent to your email address:</label>
        </div>
        <div className="io__two_justify">
          <TextField
            margin="normal"
            type="text"
            placeholder="Enter your code"
            inputProps={{ style: { textAlign: 'center' } }}
            value={verificationCode}
            onChange={e => {
              setVerificationCode(e.target.value)
            }}
          />
        </div>
        <div className="io_email_label">
          <label className="evp__label__time">
            <p>{`{This code will expire in 3 minutes}`}</p>{' '}
          </label>
        </div>
        <div className="evp__action__section">
          <Button className="evp__resend__verification__code" onClick={() => handleResend()}>
            Resend Verification Code
          </Button>
          &nbsp; &nbsp;&nbsp; &nbsp;
          <Button className="evp__verify__btn" onClick={handleVarification}>
            Verify &nbsp;{' '}
            {
              <label>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </label>
            }
          </Button>
        </div>
        <div className="io_trouble_label">
          <label>Trouble Verifying? Contact Us</label>
        </div>
      </div>
      <div className="io__back" onClick={handleVarification}>
        <span className="io__back__arrow">
          <ArrowBackIosNewIcon fontSize="sm" />
        </span>
        <label> Back</label>
      </div>
    </div>
  )
}

export default EmailVerificationPage
