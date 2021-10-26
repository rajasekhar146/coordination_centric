import React, { useState, useEffect } from 'react'
import TwoFaLogo from '../../assets/icons/Two_factor_authentication.png'
import CClogo from '../../assets/icons/cc_logo_red.png'
import history from '../../history'
import Button from '@mui/material/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
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

const TwoFaEnabled = props => {
  const classes = useStyles()

  const [verificationCode, setVerificationCode] = useState('')
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

  return (
    <div className="io__verification">
      <div className="io__two_justify">
        <div className="io_top_logo">
          <img src={CClogo} alt="key" />
        </div>
        <div className="io_border_shadow">
          <div className="io_2fa_logo">
            <img src={TwoFaLogo} alt="key" />
          </div>
          <div className="io_enter_label">
            <label>Enter 2FA Code</label>
          </div>
          <div className="io_apologize_label">
            <label>Two-factor authenticator (2FA) is enabled for your account.</label>
          </div>
          <div className="io__two_justify io__margin_bottom30">
            <TextField
              margin="normal"
              type="text"
              className={classes.textField}
              placeholder="Enter your code"
              inputProps={{ style: { textAlign: 'center' } }}
              value={verificationCode}
              onChange={e => {
                setVerificationCode(e.target.value)
              }}
            />
          </div>
          <div className="io_resend_label io__margin_bottom30">
            <label>Didn’t receive? Resend OTP</label>
          </div>
          <Button className="evp__verify__btn">
            Verify &nbsp;{' '}
            {
              <label>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </label>
            }
          </Button>
        </div>
        <div className="io__width100 io_mt_30">
          <label className="io_resend_label io_mr_20">Enter backup code </label>
          <label className="io_resend_label io_mr_20">or </label>
          <label className="io_resend_label io_mr_20">Choose another authentication method</label>
        </div>

        <div
          className="io__back"
          onClick={() => {
            history.push('/enable2fa')
          }}
        >
          <span className="io__back__arrow">
            <ArrowBackIosNewIcon fontSize="sm" />
          </span>
          <label className="io__same__line"> Back</label>
        </div>
      </div>
    </div>
  )
}

export default TwoFaEnabled