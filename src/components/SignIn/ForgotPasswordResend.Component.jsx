import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { authenticationService } from '../../services'
import history from '../../history'
import LoginLeftImage from '../../assets/images/login_left_img.png'
import './SignIn.Component.css'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useForm } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LeftImageIcon from '../../assets/images/left_image_logo.png'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { get } from 'lodash'
import Alert from '../Alert/Alert.component'
import SigninStore from '../../stores/signinstore'
import MsgIcon from '../../assets/icons/msg_icon.png'
import ArrowLeft from '../../assets/icons/arrow-left.png'
import useStore from '../../hooks/use-store';




const ForgotPasswordResend = props => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [IsValidEmail, setIsValidEmail] = useState(true)
    const [signinStoreData] = useStore(SigninStore);

    const {
        email,
    } = signinStoreData;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        SigninStore.load('RequestPassword', {
            email: email,
            successCallback: (data) => {
                history.push('./forgotpasswordresend')
            }
        })
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="si__right__div si_left_reset">
                    <div className="si__right__content ">
                        <div className="si__right__forgot">
                            <img src={MsgIcon} alt="key" />
                        </div>
                        <div className="si__right__forgot">Check your email</div>
                        <div className="si__right__subtitle">
                            We sent a password reset link to
                        </div>
                        <div className="si__right__subtitle io_margin_bottom30">
                            {email}
                        </div>

                        {/* <div className="io__icon">
                            <TextField
                                // {...useInput('facilityName', { isRequired: true })}
                                {...register('email', {
                                    required: 'Email is required.',
                                    pattern: {
                                        value:
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                })}
                                margin="normal"
                                placeholder="Email"
                                error={errors.email && isSubmit}
                                InputProps={{ className: 'si__text__box' }}
                            />
                            {errors.email && <p className="ac__required">{errors.email.message}</p>}
                            {!IsValidEmail && <p className="ac__required">{errMsg}</p>}
                        </div> */}

                        <div className="io__icon">
                            {' '}
                            <Button type="submit" className="si__login__btn">
                                {' '}
                                Open email app
                                {' '}
                            </Button>{' '}
                        </div>
                        <div className="si__right__subtitle  io_margin_bottom30">
                            Didn’t receive the email? Click to resend
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


export default ForgotPasswordResend
