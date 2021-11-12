import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { authenticationService } from '../../../services'
import history from '../../../history'
import LoginLeftImage from '../../../assets/images/login_left_img.png'
import './MemberSignIn.Component.css'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useForm } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LeftImageIcon from '../../../assets/images/left_image_logo.png'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { get } from 'lodash'
import Alert from '../../Alert/Alert.component'
import SigninStore from '../../../stores/signinstore'
import { isUpperCase } from 'is-upper-case'
import { isLowerCase } from 'is-lower-case'
import CheckedIcon from '../../../assets/icons/checked.png' //'../../assets/icons/checked.png'
import UncheckedIcon from '../../../assets/icons/unchecked.png'

const MemberSignInComponent = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [IsValidUser, setIsValidUser] = useState(true)
  const [errMsg, setErrMsg] = useState('')
  const [IsValidEmail, setIsValidEmail] = useState(true)
  const [IsValidPassword, setIsValidPassword] = useState(true)
  const [openflash, setOpenFlash] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const [validations, setValidations] = useState({
    passwordLength: false,
    symbol: false,
    number: false,
    capital: false,
    small: false,
  })

  const handleCloseFlash = () => {
    setOpenFlash(false)
  }

  const defaultValues = {
    email: '',
    password: '',
  }

  const handlePassword = pwd => {
    setPassword(pwd)
    const validationsObj = {
      passwordLength: false,
      symbol: false,
      number: false,
      capital: false,
      small: false,
    }

    if (pwd) {
      if (pwd.length >= 8) {
        validationsObj.passwordLength = true
      }
      pwd.split('').forEach(val => {
        const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
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
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useForm()

  console.log(errors)

  const fPassword = register('password', { required: true })
  const onChangePassword = fPassword.onChange

  fPassword.onChange = e => {
    console.log('ddsf')
    const res = onChangePassword(e)
    const value = e.target.value
    console.log('OnChnage', value)
    return res
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmitClick = () => {
    history.push('/members/personal-detail')
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleChange = () => {
    console.log('Change')
    //setValues({ ...values, [prop]: event.target.value });
  }

  return (
    <div className="ms__main__div">
      <div className="ms__left__div">
        <div className="ms__left__content"></div>
        <img className="ms__left__image" src={LoginLeftImage} alt="Login Left" />
        <div className="ms__left__image__logo">
          <img src={LeftImageIcon} alt="Login Left Logo" />
        </div>
      </div>
      <form>
        <div className="ms__sign__in">
          Already have an account?{' '}
          <span className="ms__signin__text">
            <Button className="ms__signin__button" onClick={e => history.push('/signin')}>
              Sign In
            </Button>
          </span>
        </div>
        <div className="ms__right__div">
          <div className="ms__right__content">
            <div className="ms__right__title">Welcome to CoordiNation Centric!</div>
            <div className="ms__right__subtitle">
              Please fill the next steps of your profile to start using our platform
            </div>
            <div className="ms__right__label">
              Email address&nbsp;<span className="ac__required">*</span>
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
                error={errors.email && isSubmit}
                InputProps={{ className: 'ms__text__box' }}
              />
              {errors.email && <p className="ac__required">{errors.email.message}</p>}
              {!IsValidEmail && <p className="ac__required">{errMsg}</p>}
            </div>
            <div className="ms__right__label">
              Create password &nbsp;<span className="ac__required">*</span>
            </div>
            <div>
              <FormControl>
                <OutlinedInput
                  className="ms__text__box"
                  {...register('password', {
                    required: 'Password is required.',
                    onChange: e => handlePassword(e.target.value),
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <div className="ms__pwd__show">Show</div>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.password && <p className="ac__required">Password is required.</p>}
              {!IsValidPassword && <p className="ac__required">{errMsg}</p>}

              <div>
                <label className="si_password_req">Password Requirements</label>
                <ul className="si_list_style">
                  <li className={validations.passwordLength ? 'si_active' : 'si_nonactive'}>
                    {validations.passwordLength ? (
                      <span className="check_icon">
                        <img width="16" src={CheckedIcon} alt="key" />
                      </span>
                    ) : (
                      <span className="check_icon">
                        <img width="16" src={UncheckedIcon} alt="key" />
                      </span>
                    )}
                    Minimum of 8 digits
                  </li>
                  <li className={validations.capital ? 'si_active' : 'si_nonactive'}>
                    {validations.capital ? (
                      <span className="check_icon">
                        <img width="16" src={CheckedIcon} alt="key" />
                      </span>
                    ) : (
                      <span className="check_icon">
                        <img width="16" src={UncheckedIcon} alt="key" />
                      </span>
                    )}
                    At least 1 upper case letters (A - Z)
                  </li>
                  <li className={validations.small ? 'si_active' : 'si_nonactive'}>
                    {validations.small ? (
                      <span className="check_icon">
                        <img width="16" src={CheckedIcon} alt="key" />
                      </span>
                    ) : (
                      <span className="check_icon">
                        <img width="16" src={UncheckedIcon} alt="key" />
                      </span>
                    )}
                    At least 1 lower case letters (a - z)
                  </li>
                  <li className={validations.number ? 'si_active' : 'si_nonactive'}>
                    {validations.number ? (
                      <span className="check_icon">
                        <img width="16" src={CheckedIcon} alt="key" />
                      </span>
                    ) : (
                      <span className="check_icon">
                        <img width="16" src={UncheckedIcon} alt="key" />
                      </span>
                    )}
                    At least 1 number (0 - 9)
                  </li>

                  <li className={validations.symbol ? 'si_active' : 'si_nonactive'}>
                    {validations.symbol ? (
                      <span className="check_icon">
                        <img width="16" src={CheckedIcon} alt="key" />
                      </span>
                    ) : (
                      <span className="check_icon">
                        <img width="16" src={UncheckedIcon} alt="key" />
                      </span>
                    )}
                    At least 1 non-alphanumeric symbol (e.g �@#$%^&*�)
                  </li>
                </ul>
              </div>
            </div>
            <div className="ms__right__label">
              Confirm password &nbsp;<span className="ac__required">*</span>
            </div>
            <div>
              <FormControl>
                <OutlinedInput
                  className="ms__text__box"
                  {...register('confirmPassword', {
                    required: 'Password is required.',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <div className="ms__pwd__show">Show</div>
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
                className="ms__check__box__text"
                label="I agree to terms & conditions"
              />{' '}
            </div>
            <div>
              {' '}
              <Button onClick={handleSubmitClick}> Register Account </Button>{' '}
            </div>
          </div>
        </div>
        <Alert handleCloseFlash={handleCloseFlash} alertMsg={alertMsg} openflash={openflash} />
      </form>
    </div>
  )
}

export default MemberSignInComponent
