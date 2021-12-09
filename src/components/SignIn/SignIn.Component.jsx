import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { authenticationService, notificationService } from '../../services'
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
import { getTokenFn } from '../../firebase'


const SignInComponent = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [IsValidUser, setIsValidUser] = useState(true)
  const [errMsg, setErrMsg] = useState('')
  const [IsValidEmail, setIsValidEmail] = useState(true)
  const [IsValidPassword, setIsValidPassword] = useState(true)
  const [openflash, setOpenFlash] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [FCMToken, setFCMToken] = useState("");


  useEffect(() => {
    addDevice(FCMToken);
  }, [FCMToken])


  const addDevice = (FCMToken) => {
    if (!FCMToken)
      return;
    let devieInfo = {
      'deviceId': '',
      'fcmId': FCMToken,
      'deviceType': 'web'
    }
    notificationService.addDevice(devieInfo).then((res) => {
      console.log("Add device", res);
    }, error => {
      console.log("Add device", error);
    })
  }
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
    watch,
  } = useForm()

  console.log(errors)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = () => {
    //history.push('/dashboard');
    setIsSubmit(true)
    SigninStore.set({ email: watch('email') })
    defaultValues.email = watch('email')
    defaultValues.password = watch('password')

    var IsValidUser = false

    // console.log(defaultValues);
    authenticationService.login(defaultValues.email, defaultValues.password).then(
      async user => {
        console.log('logged user', user)
        setIsValidPassword(true)
        setIsValidEmail(true)
        setIsValidUser(true)
        if (!user) {
          history.push('/signin')
        } else if (user.status_code === 400) {
          setIsValidUser(false)
          IsValidUser = false
          setAlertMsg(get(user, ['message'], ''))
          setOpenFlash(true)
          // setErrMsg(user.message)
          if (user.message.includes('Password')) {
            setIsValidPassword(false)
            setIsValidEmail(true)
          } else if (user.message.includes('email')) {
            setIsValidPassword(true)
            setIsValidEmail(false)
          } else if (user.message.includes('Two Factor Authentication')) {
            authenticationService
              .twoFactorEmailAuth(defaultValues.email)
              .then(data => {
                history.push('/2facodeverification')
              })
              .catch(error => {
                console.log(error)
              })
            history.push('/2facodeverification')
          }
        } else {
          const userVerified = get(user, ['data', 'data', 'is_verified'], false)
          const twoFactor = get(user, ['data', 'data', 'twoFactor_auth_type'], false)
          if (!userVerified) history.push('/userverification')
          else if (twoFactor == 'none') {
            let fcmToken = await getTokenFn(setFCMToken);
            console.log("fcmToken", fcmToken);
            window.location.href = "dashboard";
          }
          else if (twoFactor == 'app') {
            history.push('/2facodeverification')
          } else if (twoFactor == 'email') {
            authenticationService
              .twoFactorEmailAuth(defaultValues.email)
              .then(data => {
                history.push('/2facodeverification')
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            let fcmToken = await getTokenFn(setFCMToken);
            console.log("fcmToken", fcmToken)
            window.location.href = "dashboard";
            // history.push('/dashboard')
          }
        }
      },
      error => {
        console.log('error', error)
        setIsValidUser(false)
        //setSubmitting(false);
        //setStatus(error);
        //history.push('/dashboard');
      }
    )
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleChange = prop => event => {
    //setValues({ ...values, [prop]: event.target.value });
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
          <div className="si__right__content ">
            <div className="si__right__title">Welcome to CoordiNation Centric!</div>
            <div className="si__right__subtitle">Enter the credentials provided to access our platform</div>
            <div className="si__right__label">
              Email &nbsp;<span className="ac__required">*</span>
            </div>
            <div>
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
                type="email"
                error={errors.email && isSubmit}
                InputProps={{
                  className: 'si__text__box',
                  placeholder: 'Email'
                }}

              />
              {errors.email && <p className="ac__required">{errors.email.message}</p>}
              {!IsValidEmail && !errors.email && <p className="ac__required">{errMsg}</p>}
            </div>
            <div className="si__right__label">
              Password &nbsp;<span className="ac__required">*</span>
            </div>
            <div>
              <FormControl>
                <OutlinedInput
                  className="si__text__box"
                  {...register('password', {
                    required: 'Password is required.',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange()}
                  placeholder="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <div className="si__pwd__show">{showPassword ? 'Hide' : 'Show'}</div>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.password && <p className="ac__required">Password is required.</p>}
              {!IsValidPassword && <p className="ac__required">{errMsg}</p>}
            </div>
            <div>
              {' '}
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                className="si__check__box__text"
                label="Keep me signed in?"
              />{' '}
            </div>
            <div>
              {' '}
              <Button type="submit" className="si__login__btn">
                {' '}
                Login{' '}
              </Button>{' '}
            </div>
            <div
              className="si__forgot__link"
              onClick={() => {
                history.push('/forgotpassword')
              }}
            > Forgot Password?
            </div>
          </div>
        </div>
        <Alert
          handleCloseFlash={handleCloseFlash}
          alertMsg={alertMsg}
          openflash={openflash} 
          color = "fail"/>
      </form>
    </div>
  )
}

export default SignInComponent
