import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { authenticationService } from '../../services'
import history from '../../history'
import LoginLeftImage from '../../assets/images/login_left_img.png'
import './SignIn.Component.css'
import LeftImageIcon from '../../assets/images/left_image_logo.png'
import CheckedIcon from '../../assets/icons/checked.png'
import UncheckedIcon from '../../assets/icons/unchecked.png'
import { get } from 'lodash'
import SignInStore from '../../stores/signinstore'
import KeyIcon from '../../assets/icons/key_icon.png'
import ArrowLeft from '../../assets/icons/arrow-left.png'
import { isUpperCase } from "is-upper-case";
import { isLowerCase } from "is-lower-case";
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
    },
}))


const ResetPasswordPage = props => {
    const classes = useStyles()
    const [isSubmit, setIsSubmit] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')
    const { search } = useLocation();
    const token = new URLSearchParams(search).get('token');
    const email = new URLSearchParams(search).get('email');

    const [validations, setValidations] = useState({
        passwordLength: false,
        symbol: false,
        number: false,
        capital: false,
        small: false,
    });


    useEffect(() => {
        const validationsObj = {
            passwordLength: false,
            symbol: false,
            number: false,
            capital: false,
            small: false,
        }

        if (password) {
            if (password.length >= 8) {
                validationsObj.passwordLength = true
            }
            password.split('').forEach((val) => {
                const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
                if (!isNaN(val)) {
                    validationsObj.number = true
                } else if (isLowerCase(val)) {
                    validationsObj.small = true
                } else if (isUpperCase(val)) {
                    validationsObj.capital = true
                } else if (regex.test(val)) {
                    validationsObj.symbol = true
                }
            })
            setValidations({ ...validationsObj })
        } else {
            setValidations(validationsObj)
        }
        // return () => {
        //     cleanup
        // }
    }, [password])


    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (password === conformPassword) {
            setIsSubmit(true)
            const resetData = {};
            resetData.temporaryPassword = password;
            resetData.token = token;
            resetData.email = email;
            SignInStore.load('ResetPassword', {
                resetData,
                successCallback: (data) => {
                    history.push('/resetpasswordsuccess')
                },
                errorCallback: (err) => {

                }
            })
        } else {
            setErrMsg('The password confirmation doesn’t match.')
        }

    }



    return (
        <div className="si__main__div">
            <div className="si__left__div">
                <div className="si__left__content"></div>
                <img className="si__left__image" src={LoginLeftImage} alt="Login Left" />
                <div className="si__left__image__logo">
                    <img src={LeftImageIcon} alt="Login Left Logo" />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="si__right__div si_top_zero">
                    <div className="si__right__content si_width75">
                        <div className="si__right__forgot">
                            <img src={KeyIcon} alt="key" />
                        </div>
                        <div className="si__right__forgot">Set new password</div>
                        <div className="si__right__subtitle io_margin_bottom30">
                            Your new password must be different to previously used passwords.
                        </div>
                        <div className="si__right__label">
                            Password &nbsp;<span className="ac__required">*</span>
                        </div>
                        <div className="io__icon">
                            <TextField
                                // {...useInput('facilityName', { isRequired: true })}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                margin="normal"
                                type="password"
                                className={classes.input}
                                InputProps={{ className: 'si__right__content_resend' }}
                            />
                        </div>
                        <div>
                            <label className="si_password_req">
                                Password Requirements
                            </label>
                            <ul className="si_list_style">
                                <li
                                    className={validations.passwordLength ? 'si_active' : 'si_nonactive'}
                                >
                                    {validations.passwordLength ?
                                        <span className="check_icon">
                                            <img width="16" src={CheckedIcon} alt="key" />
                                        </span>
                                        : <span className="check_icon">
                                            <img width="16" src={UncheckedIcon} alt="key" />
                                        </span>
                                    }
                                    Minimum of 8 digits
                                </li>
                                <li
                                    className={validations.capital ? 'si_active' : 'si_nonactive'}
                                >
                                    {validations.capital ?
                                        <span className="check_icon">
                                            <img width="16" src={CheckedIcon} alt="key" />
                                        </span>
                                        :
                                        <span className="check_icon">
                                            <img width="16" src={UncheckedIcon} alt="key" />
                                        </span>

                                    }
                                    At least 1 upper case letters (A - Z)
                                </li>
                                <li
                                    className={validations.small ? 'si_active' : 'si_nonactive'}
                                >
                                    {validations.small ?
                                        <span className="check_icon">
                                            <img width="16" src={CheckedIcon} alt="key" />
                                        </span>
                                        :
                                        <span className="check_icon">
                                            <img width="16" src={UncheckedIcon} alt="key" />
                                        </span>
                                    }
                                    At least 1 lower case letters (a - z)

                                </li>
                                <li
                                    className={validations.number ? 'si_active' : 'si_nonactive'}
                                >
                                    {validations.number ?
                                        <span className="check_icon">
                                            <img width="16" src={CheckedIcon} alt="key" />
                                        </span>
                                        :
                                        <span className="check_icon">
                                            <img width="16" src={UncheckedIcon} alt="key" />
                                        </span>
                                    }
                                    At least 1 number (0 - 9)

                                </li>


                                <li
                                    className={validations.symbol ? 'si_active' : 'si_nonactive'}
                                >
                                    {validations.symbol ?
                                        <span className="check_icon">
                                            <img width="16" src={CheckedIcon} alt="key" />
                                        </span>
                                        :
                                        <span className="check_icon">
                                            <img width="16" src={UncheckedIcon} alt="key" />
                                        </span>
                                    }
                                    At least 1 non-alphanumeric symbol (e.g ‘@#$%^&*’)
                                </li>
                            </ul>
                        </div>
                        <div className="si__right__label">
                            Confirm Password
                            &nbsp;<span className="ac__required">*</span>
                        </div>
                        <div className="io__icon">
                            <TextField
                                // {...useInput('facilityName', { isRequired: true })}
                                onChange={(e) => {
                                    setConformPassword(e.target.value)
                                }}
                                margin="normal"
                                type="password"
                                InputProps={{ className: 'si__right__content_resend' }}
                            />
                        </div>
                        {errMsg && <p className="ac__required">{errMsg}</p>}
                        <div className="io__icon">
                            {' '}
                            <Button
                                className={`${!validations.passwordLength
                                    || !validations.number
                                    || !validations.small
                                    || !validations.capital
                                    || !validations.symbol
                                    || !password
                                    || !conformPassword
                                    ? 'si_disable_btn' : 'si__login__btn'}`}
                                type="submit">
                                {' '}
                                Reset password
                                {' '}
                            </Button>{' '}
                        </div>
                        <div
                            onClick={() => {
                                history.push('/signin')
                            }}
                            className="si__forgot__link">
                            <img src={ArrowLeft} alt="Login Left Logo" />
                            <span style={{ marginLeft: "10px" }}>
                                Back to log in
                            </span>

                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}


export default ResetPasswordPage
