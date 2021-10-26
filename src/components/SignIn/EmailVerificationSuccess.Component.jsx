import React, { useState, useEffect } from 'react'
import CelebrationLogo from '../../assets/icons/celebration.png'
import CClogo from '../../assets/icons/cc_logo_red.png'
import history from '../../history'
import Button from '@mui/material/Button'

const EmailVerificationSuccess = props => {
  return (
    <div className="io__verification">
      <div className="io__two_justify">
        <div className="io_top_logo">
          <img src={CClogo} alt="key" />
        </div>
        <div className="io_sent_logo">
          <img src={CelebrationLogo} alt="key" />
        </div>
        <div className="io_error_label">
          <label>You email is verified! </label>
        </div>
        <div className="io_apologize_label">
          <label>Thanks, you can use our platform now.</label>
        </div>

        <div className="io__width100 io_margin_bottom30">
          <Button
            className="io__activate__enable"
            onClick={() => {
              history.push('/dashboard')
            }}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmailVerificationSuccess
