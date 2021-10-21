import React, { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import history from '../../history'
import CClogo from '../../assets/icons/cc_logo.png'
import OopsError from '../../assets/icons/oop_error.png'
import Button from '@mui/material/Button'



const TwoFaVerificationFail = (props) => {

    return (
        <div>
            <div className="io__sidebar">
                <img src={CClogo} alt="cc_logo" />
            </div>
            <div className="io__two_fa io_ml30">
                <div className="io__two_justify">
                    <img src={OopsError} alt="cc_logo" />
                    <div className="io_error_label">
                        <label>
                            Ooops! Something went wrong.

                        </label>
                    </div>
                    <div className="io_apologize_label" >
                        <label >
                            We apologize but something went wrong during this proccess.

                        </label>
                    </div>
                    <div className="io__width100">
                        <Button
                            className="io__goto_dashboard io__width45"
                            onClick={() => {
                                history.push('/dashboard')
                            }}>
                            Go to Dashboard
                        </Button>
                        <Button
                            className="io__activate__enable io__margin25 io__width40"
                            onClick={() => {
                                history.push('/enable2fa')
                            }}>
                            Try Again
                        </Button>
                    </div>
                </div>

            </div>



        </div>
    )
}



export default TwoFaVerificationFail
