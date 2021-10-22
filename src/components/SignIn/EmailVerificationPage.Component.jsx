import React, { useState, useEffect } from 'react'
import msgIcon from '../../assets/icons/msglogo.png'
import CClogo from '../../assets/icons/cc_logo_red.png'
import history from '../../history'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { authenticationService } from '../../services'
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
    },
    input: {
        color: '#838486',
        height: '44px',
    },
}))

const UserVerificationPage = props => {
    const classes = useStyles()
    const [verificationCode, setVerificationCode] = useState('')
    const [timeOut, setTime] = useState()
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [minutes, seconds]);

    const currentUser = authenticationService.currentUserValue
    const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')

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
                    <label>Verify Your Email Address  </label>
                </div>
                <div className="io_apologize_label">
                    <label>Enter below the code that was sent to your email address:</label>
                </div>
                <div className="io_email_label">
                    <label>{currentUserEmail}</label>
                </div>
                <div className="io__two_justify io__margin__32">
                    <TextField
                        margin="normal"
                        type="text"
                        className={classes.textField}
                        value={verificationCode}
                        onChange={e => {
                            setVerificationCode(e.target.value)
                        }}
                    />
                </div>
                <div className="io_expire_label io__margin__32">
                    <label>{`{This code will expire in 3/5minutes}`}</label>
                </div>
                <div className="io__width100">
                    <Button
                        className="io__goto_dashboard io__width45"
                        onClick={() => {
                            history.push('/dashboard')
                        }}
                    >
                        Resend Verification Code
                    </Button>
                    <Button
                        className={(minutes === 0 && seconds === 0) ? 
                            'io__activate__disable io__margin25 io__width40'
                            : 'io__activate__enable io__margin25 io__width40'
                        }
                        onClick={() => {
                            history.push('/enable2fa')
                        }}
                    >
                        Verify ({<label>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</label>
                        }m)
                    </Button>
                </div>
                <div className="io_trouble_label">
                    <label>Trouble Verifying? Contact Us</label>
                </div>
            </div>
            <div
                className="io__back"
                onClick={() => {
                    history.push('/')
                }}
            >
                <span className="io__back__arrow">
                    <ArrowBackIosNewIcon fontSize="sm" />
                </span>
                <label > Back</label>
            </div>
        </div>
    )

}

export default UserVerificationPage
