import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import history from '../../history'
import LoginLeftImage from '../../assets/images/login_left_img.png'
import './SignIn.Component.css'
import { useForm } from 'react-hook-form'
import LeftImageIcon from '../../assets/images/left_image_logo.png'
import SigninStore from '../../stores/signinstore'
import KeyIcon from '../../assets/icons/key_icon.png'
import ArrowLeft from '../../assets/icons/arrow-left.png'
import { authenticationService } from '../../services'




const ForgotPasswordComponent = (props) => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [IsValidUser, setIsValidUser] = useState(true)
    const [errMsg, setErrMsg] = useState('')
    const [IsValidEmail, setIsValidEmail] = useState(true)
    const [IsValidPassword, setIsValidPassword] = useState(true)
    const [openflash, setOpenFlash] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')



    const handleCloseFlash = () => {
        setOpenFlash(false)
    }

    const defaultValues = {
        email: '',
        password: '',
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()

    const onSubmit = (data) => {
        SigninStore.set({ email: data.email })
        const res = authenticationService.requestPassword(data.email)
        res.then(() => {
            history.push('/forgotpasswordresend')
        }).catch(() => {

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
                <div className="si__right__div si_left_signin">
                    <div className="si__right__content">
                        <div className="si__right__forgot">
                            <img src={KeyIcon} alt="key" />
                        </div>
                        <div className="si__right__forgot">Forgot password?</div>
                        <div className="si__right__subtitle io_margin_bottom30">No worries, we’ll send you reset instructions.</div>
                        <div className="si__right__label">
                            Email &nbsp;<span className="ac__required">*</span>
                        </div>
                        <div className="io__icon">
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
                        </div>
                        <div className="io__icon">
                            {' '}
                            <Button type="submit" className="si__login__btn">
                                {' '}
                                Reset password
                                {' '}
                            </Button>{' '}
                        </div>
                        <div
                            className="si__forgot__link"
                            onClick={() => {
                                history.push('/signin')
                            }}
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


export default ForgotPasswordComponent
