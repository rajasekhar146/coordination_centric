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
    const [activeLink, setActiveLink] = useState(false)
    const [activeResend, setActiveResend] = useState(false)
    const [openflash, setOpenFlash] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const [alertColor, setAlertColor] = useState('')

    const {
        email,
    } = signinStoreData;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const reBody = { email: email }
        const res = authenticationService.requestPassword(reBody).then(res => {
            //history.push('/forgotpasswordresend')
            setOpenFlash(true)
            setAlertMsg(get(res, ['data', 'message'], ''))
            setAlertColor('success')
        }).catch((res) => {
          setOpenFlash(true)
          setAlertMsg(get(res, ['data', 'message'], ''))
          setAlertColor('fail')
        })
        // SigninStore.load('RequestPassword', {
        //     email: email,
        //     successCallback: (data) => {
        //         setOpenFlash(true)
        //         setAlertMsg('Reset password link has been sent to your email')
        //         setAlertColor('success')
        //     }
        // })
    }


    const handleCloseFlash = () => {
        setOpenFlash(false)
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
                            <Button className="si__login__btn" onClick={() => {
                              history.push('/signin')
                          }}>
                                {' '}
                                Back to log in
                                {' '}
                            </Button>{' '}
                        </div>
                        <div
                            onClick={() => {
                                onSubmit()
                            }}
                            className="si__right__subtitle  io_margin_bottom30">
                            Didn’t receive the email? <span
                                className={activeResend ? 'si_acive_resend' : ''}
                                onMouseOver={() => {
                                    setActiveResend(true)
                                }}
                                onMouseOut={() => {
                                    setActiveResend(false)
                                }} >Click to resend</span>
                        </div>
                        
                    </div>
                </div>
                <Alert
                    handleCloseFlash={handleCloseFlash}
                    alertMsg={alertMsg}
                    openflash={openflash}
                    // subLebel={subLabel}
                    color={alertColor} />
            </form>
        </div>
    )
}


export default ForgotPasswordResend
