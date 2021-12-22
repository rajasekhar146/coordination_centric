import React, { useState, useEffect } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import history from '../../history'
import CClogo from '../../assets/icons/cc_logo.png'
import SuccessIcon from '../../assets/icons/success_icon.png'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'

const TwoFaVerificationSuccess = props => {
  useEffect(() => { }, [])
  const [chooseAnotherAuth, setEnableTwofa] = useState(useSelector(state => state.chooseAnotherAuth))


  return (
    <div>
      <div className="io__sidebar">
        <img src={CClogo} alt="cc_logo" />
      </div>
      <div className="io__two_fa io_ml30">
        <div className="io__two_justify_success">
          <img src={SuccessIcon} alt="success_logo" />
          <div className="io_error_label">
            <label>
              Two-Factor Authentication <span style={{ color: '#1ae0a5' }}>Enabled</span>
            </label>
          </div>
          <div className="io_apologize_label">
            <label>Your account is extra secured now</label>
          </div>
          {chooseAnotherAuth &&
            <div className="io_apologize_label">
              <label>You need to login again for Security Reasons</label>
            </div>
          }
          <div className="io_width90">
            <Button
              className="io__activate__enable io__margin25"
              onClick={() => {
                if (chooseAnotherAuth) {
                  history.push('/signin')
                } else {
                  history.push('/dashboard')
                }
              }}
            >
              {chooseAnotherAuth ? 'Continue' : 'Go to Dashboard'}


            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoFaVerificationSuccess
