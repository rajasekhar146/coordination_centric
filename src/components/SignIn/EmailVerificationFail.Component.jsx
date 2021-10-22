import React, { useState, useEffect } from 'react'
import CClogo from '../../assets/icons/cc_logo_red.png'
import history from '../../history'
import Button from '@mui/material/Button'
import OopsError from '../../assets/icons/oops_error.png'


const EmailVerificationFail = props => {
  
    return (
        <div className="io__verification">
            <div className="io__two_justify">
                <div className="io_top_logo">
                    <img src={CClogo} alt="key" />
                </div>
                <div className="io_sent_logo">
                    <img src={OopsError} alt="key" />
                </div>
                <div className="io_error_label">
                    <label>Ooops! Something went wrong.</label>
                </div>
                <div className="io_apologize_label">
                    <label>We apologize but something went wrong during this proccess.</label>
                </div>


                <div className="io__width100 io_margin_bottom30">
                    <Button
                        className="io__activate__enable"
                        onClick={() => {
                            history.push('/userverification')
                        }}
                    >
                        Try Again
                    </Button>

                </div>
            </div>
            
        </div>
    )

}

export default EmailVerificationFail
