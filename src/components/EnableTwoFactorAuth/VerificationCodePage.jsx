import React, { useState } from 'react'
import history from '../../history'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyIcon from '../../assets/icons/key_icon.png'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { makeStyles } from '@material-ui/core/styles'
import {
    useParams
} from "react-router-dom";

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
        border: '1px solid #CACCCF'
    },
    input: {
        color: "#838486",
        height: "44px",
    }
}))


const VerificationCodePage = (props) => {
    const { method } = useParams()
    const classes = useStyles()
    const [verificationCode, setVerificationCode] = useState('')

    const getLabel = () => {
        switch (method) {
            case 'sms':
              return 'Check your phone and enter the verification code we just sent you.'
              break;
            case 'email':
              return 'Check your email and enter the verification code we just sent you.'
              break;
            default:
              return 'defaultStyle';
          }
    }


    return (
        <div className="io__two_fa">
            <div className="io__two_justify">
                <div>
                    <img src={KeyIcon} alt="key" />
                </div>
                <div>
                    <label className="header__label">
                        Enter Verification Code
                    </label>
                </div>
                <div className="io__two_justify">
                    <label style={{ width: "70%" }} className="info__label">
                        {getLabel()}
                    </label>
                </div>
                <div className="io__two_justify io__margin__32">
                    <TextField
                        margin="normal"
                        type="text"
                        className={classes.textField}
                        value={verificationCode}
                        onChange={(e) => {
                            setVerificationCode(e.target.value)
                        }}
                    />
                </div>
                <div className="io__two_justify io__margin__32 io__width__100">
                    <Button 
                    onClick={() => {

                    }}
                    className={verificationCode ? 'io__activate__enable' : 'io__activate__disable'}>
                        Activate 2FA
                    </Button>
                </div>
                <div className="io__two_justify io__width__100">
                    <label style={{ width: "70%" }} className="io__resend__label">
                        Didn't recieve? Resend OTP
                    </label>
                </div>

            </div>
            <div className="io__back"
                onClick={() => {
                    history.push('/enable2fa')
                }}
            >
                <span className="io__back__arrow"><ArrowBackIosNewIcon fontSize="sm" /></span>
                <label className="io__same__line"> Back</label>
            </div>
        </div>
    )
}



export default VerificationCodePage
