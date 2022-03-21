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
import SuccessTick from '../../assets/icons/success_tick.png'
import ArrowLeft from '../../assets/icons/arrow-left.png'
import { isUpperCase } from "is-upper-case";
import { isLowerCase } from "is-lower-case";
import { useLocation } from 'react-router-dom';


const ResetPasswordPage = props => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')
    const { search } = useLocation();
    const token = new URLSearchParams(search).get('token');
    const email = new URLSearchParams(search).get('email');
    const [activeLink, setActiveLink] = useState(false)

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
        history.push('/signin')
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
                <div className="si__right__div">
                    <div className="si__right__content si_width75">
                        <div className="si__right__forgot">
                            <img src={SuccessTick} alt="key" />
                        </div>
                        <div className="si__right__forgot">Success</div>
                        <div className="si__right__subtitle io_margin_bottom30">
                            Your password has been successfully reset. Click below to log in.
                        </div>
                        {errMsg && <p className="ac__required">{errMsg}</p>}
                        <div className="io__icon">
                            {' '}
                            <Button
                                className="si__login__btn"
                                type="submit">
                                {' '}
                                Continue
                                {' '}
                            </Button>{' '}
                        </div>
                        <div
                            onClick={() => {
                                history.push('/signin')
                            }}
                            onMouseOver={() => {
                                setActiveLink(true)
                            }}
                            onMouseOut={() => {
                                setActiveLink(false)
                            }}
                            className={activeLink ? 'si__forgot__link_active' : 'si__forgot__link'}
                        >
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
