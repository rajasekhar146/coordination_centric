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
import { organizationService } from '../../../services'
import { useParams } from 'react-router-dom'
import { newMember, resetMember } from '../../../redux/actions/memberActions'
import { useSelector, useDispatch } from 'react-redux'

const MemberSignInComponent = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [IsValidUser, setIsValidUser] = useState(true)
  const [errMsg, setErrMsg] = useState('')
  const [IsValidEmail, setIsValidEmail] = useState(true)
  const [IsValidPassword, setIsValidPassword] = useState(true)
  const [openflash, setOpenFlash] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const { invitetoken } = useParams()
  const { referredby } = useParams()
  const { invitedBy } = useParams()
  //const [member, setMember] = useState({})
  const dispatch = useDispatch()
  let member = useSelector(state => state.newMember)

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

  const handleConfirmPassword = e => {
    setConfirmPassword(e)
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const onSubmit = async data => {
    // data['first_name'] = '';
    // data['middle_name'] = '';
    // data['last_name'] = '';
    // data['ssn'] = '';

    console.log(password, confirmPassword)
    if (password === confirmPassword) {
      member.member.password = password

      // member.member.dob = '12/12/2020'
      // member.member.gender = 'Male'
      // member.member.ssn = '12345678'
      // member.member.occupation = 'Eye Doctor'
      console.log('memberData', member)
      await organizationService
        .registerMember(member.member)
        .then(res => {
          dispatch(newMember(member.member))
          history.push(`/members/personal-detail/${invitetoken}/${referredby}/${invitedBy}`)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setAlertMsg('The password confirmation doesn’t match.')
      setOpenFlash(true)
    }
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleChange = () => {
    console.log('Change')
    //setValues({ ...values, [prop]: event.target.value });
  }

  useEffect(async () => {
    console.log('referredBy', referredby, 'inviteToken', invitetoken)
    const tokenResponse = await organizationService.validateToken(invitetoken)
    const data = tokenResponse?.data ? tokenResponse.data : tokenResponse.response.data
    if (data.status_code !== 200) {
      history.push('/error-page')
    } else {
      // setMember(data.data)
      console.log('data.data', data.data)
      dispatch(newMember(data.data))
      var email = data.data.email
      setValue('email', email)
    }
    // .then(data => {
    //   const response = data.response.data
    //   console.log('tokan data >> ', response.status_code)
    //   if(response.status_code !== 200 ){
    //     history.push('/error-page')
    //   }
    // })
    // .catch(err => {
    //   console.log('tokan data err >> ', err)
    //   history.push('/error-page')
    // })
  }, [])

  return (
    <div className="ms__main__div">
      <div className="ms__left__div">
        <div className="ms__left__content"></div>
        <img className="ms__left__image" src={LoginLeftImage} alt="Login Left" />
        <div className="ms__left__image__logo">
          <img src={LeftImageIcon} alt="Login Left Logo" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="ms__pwd__show">{showPassword ? 'Hide' : 'Show'}</div>
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
                    onChange: e => handleConfirmPassword(e.target.value),
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <div className="ms__pwd__show">{showConfirmPassword ? 'Hide' : 'Show'}</div>
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
              <Button type="submit" className="ms__login__btn">
                {' '}
                Register Account{' '}
              </Button>{' '}
            </div>
          </div>
        </div>
        <Alert handleCloseFlash={handleCloseFlash} alertMsg={alertMsg} openflash={openflash} />
      </form>
    </div>
  )
}

export default MemberSignInComponent
