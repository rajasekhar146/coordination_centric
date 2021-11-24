import React, { useState } from 'react'
import history from '../../history'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import QRCode from 'react-qr-code'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AppStoreIcon from '../../assets/icons/app__store.png'
import GooglePlay from '../../assets/icons/google__play.png'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { authenticationService } from '../../services'
import { get } from 'lodash'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '70%',
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

const VerificationCodeByAppPage = props => {
  const classes = useStyles()
  const [verificationCode, setVerificationCode] = useState('')
  const googlePlayURl = 'https://play.google.com/store/search?q=authy&c=apps&hl=en_IN&gl=US'
  const qrImg = authenticationService.qrImgvalue
  const currentUser = authenticationService.currentUserValue
  const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')

  const handleSubmit = () => {
    const dataToSend = {}
    dataToSend.email = currentUserEmail
    dataToSend.token = verificationCode
    dataToSend.encoding = 'base32'
    const res = authenticationService.twoFactorAppAuthVerification(dataToSend)
    res
      .then(res => {
        const isValid = get(res, ['data', 'valid'], false)
        if (isValid) {
          history.push(`/2faverificationsuccess`)
        } else {
          history.push(`/2faverificationfail`)
        }
      })
      .catch(() => {
        history.push(`/2faverificationfail`)
      })
  }

  const { data, secretKey } = qrImg

  return (
    <div className="io__two_fa__app">
      <div>
        <div className="io__tf__app">
          <div className="io_step">
            <span className="io__step__no">1</span>
          </div>
          <div className="io__step__padding0">
            <div>
              <label className="io__download__label">Download an authenticator app</label>
            </div>
            <div>
              <label className="io__download__sublabel">
                Download on your smartphone, tablet, laptop or desktop. We recommend Google Authenticator for iOS and
                Android, and Authy for desktop and laptops.
              </label>
            </div>
            <div>
              <a href={googlePlayURl} target="_blank">
                <img className="io__google__play" src={GooglePlay} alt="key" />
              </a>
              <img src={AppStoreIcon} alt="key" />
            </div>
          </div>
        </div>
        <div className="io__tf__app">
          <div className="io_step">
            <span className="io__step__no">2</span>
          </div>
          <div className="io__step__padding0">
            <div>
              <label className="io__download__label">Get verification code</label>
            </div>
            <div>
              <label className="io__download__sublabel io__qr_label">
                Use your authenticator app to scan the QR code if using a smartphone or tablet, or enter the secret key
                if using a desktop or laptop, to get a verification code. We strongly recommend saving your secret key
                in a secure password manager. It will not be visible to you once the process is complete.
              </label>
            </div>
            <div>
              <label className="io__secret__key">Secret Key</label>
              <div className="io__secret__key__value">
                <label>{secretKey}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="io__qr_scanner">
          <label className="io__scan__label">Scan this QR code</label>
          <div className="io__qr_code" dangerouslySetInnerHTML={{ __html: data }}></div>
        </div>
        <div className="io__tf__app">
          <div className="io_step">
            <span className="io__step__no">3</span>
          </div>
          <div className="io__step__padding0">
            <div>
              <label className="io__download__label">Enter verification code</label>
            </div>
            <div>
              <label className="io__download__sublabel io__width70">
                Enter the verification code presented in your authentication app to complete the enabling process.
              </label>
            </div>
            <div className="io__verification__code io__width70 io__margin__32">
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
              <Button
                onClick={() => {
                  handleSubmit()
                }}
                className={
                  verificationCode
                    ? 'io__activate__enable io__width40 io__margin25'
                    : 'io__activate__disable io__width40 io__margin25'
                }
              >
                Activate 2FA
              </Button>
            </div>
          </div>
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
      </div>
    </div>
  )
}

export default VerificationCodeByAppPage
