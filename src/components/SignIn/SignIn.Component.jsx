import React, {useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { authenticationService } from '../../services'
import history from '../../history'
import LoginLeftImage from '../../assets/images/login_left_img.png'
import './SignIn.Component.css'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useForm } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignInComponent = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const defaultValues = {
    email: 'superadmin@yopmail.com',
    password: 'Augusta@12'
  }

  const {
    register,
    formState: { errors },
  } = useForm(defaultValues)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    //history.push('/dashboard');
    setIsSubmit(true);
    authenticationService.login('superadmin@yopmail.com', 'Augusta@12').then(
      user => {
        //const { from } = this.props.location.state || { from: { pathname: "/" } };
        // this.props.history.push(from);
        history.push('/dashboard')
      },
      error => {
        console.log(error)
        //setSubmitting(false);
        //setStatus(error);
        //history.push('/dashboard');
      }
    )
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="si__main__div">
      <div className="si__left__div">
        <div className="si__left__content"></div>
        <img className="si__left__image" src={LoginLeftImage} alt="Login Left" />
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
              className="od__text__box"
              margin="normal"
              defaultValue='superadmin@yopmail.com'
              error={errors.email && isSubmit}
            />
            {errors.email && <p className="ac__required">Email is required.</p>}

          </div>
          <div className="si__right__label">
            Password &nbsp;<span className="ac__required">*</span>
          </div>
          <div>
          <TextField
          // {...useInput('facilityName', { isRequired: true })}
          {...register('password', { required: true })}
          className="od__text__box"
          margin="normal"
          defaultValue='Augusta@12'
          type='password'
          error={errors.password && isSubmit}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>}
        />
        {errors.password && <p className="ac__required">Password is required.</p>}
        </div>
          <div>
            {' '}
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              className="si__check__box__text"
              label="Keep me signin?"
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
