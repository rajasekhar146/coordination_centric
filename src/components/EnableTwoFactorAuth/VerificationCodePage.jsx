import React, { useState, useEffect } from 'react'
import history from '../../history'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import KeyIcon from '../../assets/icons/key_icon.png'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { authenticationService } from '../../services'
import Alert from '../Alert/Alert.component'
import get from 'lodash.get'
import { useDispatch } from 'react-redux'
import { setCompleteProfile } from '../../redux/actions/commonActions'


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
  },
  input: {
    color: '#838486',
    height: '44px',
  },
}))

const VerificationCodePage = props => {
  const dispatch = useDispatch()
  const currentUser = authenticationService?.currentUserValue
  const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')
  const { method } = useParams()
  const classes = useStyles()
  const [openflash, setOpenFlash] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [subLebel, setSubLabel] = useState('')

  const twoFactor_auth_type = get(currentUser, ['data', 'data', 'twoFactor_auth_type'], '')
  const last_login_time = get(currentUser, ['data', 'data', 'last_login_time'], false)


  const [verificationCode, setVerificationCode] = useState('')

  useEffect(() => {
    // var twoFaVerfied = localStorage.getItem('twoFaVerfied')
    if (twoFactor_auth_type === 'none') {
      
      history.push(`/dashboard`)
    }
  }, [])


  const getLabel = () => {
    switch (method) {
      case 'sms':
        return 'Check your phone and enter the verification code we just sent you.'
        break
      case 'email':
        return 'Check your email and enter the verification code we just sent you.'
        break
      default:
        return 'defaultStyle'
    }
  }

  const handleSubmit = () => {
    console.log('handleSubmit 4444', verificationCode, method, currentUserEmail)
    const res = authenticationService.twoFactorAuthVerification(verificationCode, method, currentUserEmail)
    res
      .then(() => {
        // localStorage.setItem('twoFaVerfied', true)
        history.push(`/2faverificationsuccess`)
        if(!last_login_time) {
          dispatch(setCompleteProfile(true))

        }
      })
      .catch(() => {
        history.push(`/2faverificationfail`)
      })
  }

  const handleResend = async () => {
    var response = authenticationService.twoFactorEmailAuth(currentUserEmail)
    if (response !== undefined) {
      response.then((res) => {
        setOpenFlash(true)
        setSubLabel(get(res, ['data', 'message'], ''));
      }).catch(() => {
      })
    } else {

    }
  }
  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
  }

  return (
    <div className="io__two_fa">
      <div className="io__two_justify">
        <div>
          <img src={KeyIcon} alt="key" />
        </div>
        <div>
          <label className="header__label">Enter Verification Code</label>
        </div>
        <div className="io__two_justify">
          <label style={{ width: '70%' }} className="info__label">
            {getLabel()}
          </label>
        </div>
        <div className="io__two_justify io__margin__32">
          <TextField
            margin="normal"
            type="text"
            className={classes.textField}
            value={verificationCode}
            inputProps={{ maxLength: 6 }}
              onChange={e => {
                setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))
              }}
          />
        </div>
        <div className="io__two_justify io__margin__32 io__width__100">
          <Button
            onClick={() => {
              handleSubmit()
            }}
            className={verificationCode ? 'io__activate__enable' : 'io__activate__disable'}
          >
            Activate 2FA
          </Button>
        </div>
        <div className="io__two_justify io__width__100">
          <label
            style={{ width: '70%' }}
            onClick={() => handleResend()}
            className="io__resend__label">
            Didn't recieve? Resend OTP
          </label>
        </div>
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
        <Alert
          handleCloseFlash={handleCloseFlash}
          alertMsg={alertMsg}
          openflash={openflash}
          subLebel={subLebel}
          color = "success"
        />
      </div>
    </div>
  )
}

export default VerificationCodePage
