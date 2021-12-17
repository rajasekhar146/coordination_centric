import React, { useState } from 'react'
import SentIcon from '../../assets/icons/sent.png'
import CClogo from '../../assets/icons/cc_logo_red.png'
import history from '../../history'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { authenticationService, accountService } from '../../services'
import get from 'lodash.get'
import Button from '@mui/material/Button'

const UserVerificationPage = props => {
  const currentUser = authenticationService?.currentUserValue
  const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')

  const handleSendEmail = async () => {
    console.log('currentUserEmail', currentUserEmail)
    var response = await accountService.sendEmailWithVerificationCode(currentUserEmail)
    console.log('handleSendEmail', response)
    if (response === undefined) {
      console.log('Mail already verified')
      history.push('/emailverification')
    } else history.push('/emailverification')
  }

  return (
    <div className="io__verification">
      <div className="io__two_justify">
        <div className="io_top_logo">
          <img src={CClogo} alt="key" />
        </div>
        <div className="io_sent_logo">
          <img src={SentIcon} alt="key" />
        </div>
        <div className="io_error_label">
          <label>Verify Your Email Address </label>
        </div>
        <div className="io_apologize_label io_width60">
          <label>To continue using Coordination Centric, please verify your email address:</label>
        </div>
        <div className="io_email_label">
          <label>{currentUserEmail}</label>
        </div>
        <div className="io_send_emailbtn io_width90">
          <Button className="io__activate__enable" onClick={handleSendEmail}>
            Send Verification Email
          </Button>
        </div>
        <div className="io_trouble_label">
          {/* <label>Trouble Verifying? Contact Us</label> */}
        </div>
      </div>
      <div className="io__back"
        onClick={() => {
          history.push('/signin')
        }}
      >
        <span className="io__back__arrow">
          <ArrowBackIosNewIcon fontSize="sm" />
        </span>
        <label> Back</label>
      </div>
    </div>
  )
}

export default UserVerificationPage
