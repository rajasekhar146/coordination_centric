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

const SignInComponent = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const defaultValues = {
    email: 'superadmin@yopmail.com',
    password: 'Augusta@12',
  }

  const {
    register,
    formState: { errors },
  } = useForm(defaultValues)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = () => {
    //history.push('/dashboard');
    setIsSubmit(true)
    authenticationService.login('superadmin@yopmail.com', 'Augusta@12').then(
      user => {
        console.log(user)
        const userVerified = get(user, ['data', 'data', 'userVerified'], false)
        if (!userVerified) {
            history.push('/userverification')
        } else {
          history.push('/dashboard')
        }
        //const { from } = this.props.location.state || { from: { pathname: "/" } };
        // this.props.history.push(from);
        
      },
      error => {
        console.log(error)
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
      <div className="si__right__div">
        <div className="si__right__content">
          <div className="si__right__title">Welcome to CoordiNation Centric!</div>
          <div className="si__right__subtitle">Enter the credentials provided to access our platform</div>
          <div className="si__right__label">
            Email &nbsp;<span className="ac__required">*</span>
          </div>
          <div>
            <TextField
              // {...useInput('facilityName', { isRequired: true })}
              {...register('email', { required: true })}
              margin="normal"
              placeholder="Email"
              defaultValue="superadmin@yopmail.com"
              error={errors.email && isSubmit}
              InputProps={{ className: 'si__text__box' }}
            />
            {errors.email && <p className="ac__required">Email is required.</p>}
          </div>
          <div className="si__right__label">
            Password &nbsp;<span className="ac__required">*</span>
          </div>
          <div>
            <FormControl>
              <OutlinedInput
                className="si__text__box"
                {...register('password', { required: true })}
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange()}
                defaultValue="Augusta@12"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <div className="si__pwd__show">Show</div>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {errors.password && <p className="ac__required">Password is required.</p>}
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
            <Button className="si__login__btn" onClick={handleLogin}>
              {' '}
              Login{' '}
            </Button>{' '}
          </div>
          <div className="si__forgot__link"> Forgot Password? </div>
        </div>
      </div>
    </div>
  )
}

export default SignInComponent
