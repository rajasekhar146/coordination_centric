import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { authenticationService } from '../../services'
import history from '../../history'
import LoginLeftImage from '../../assets/images/login_left_img.png'
import './SignIn.Component.css'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const SignInComponent = () => {
  const handleLogin = () => {
    //history.push('/dashboard');
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
            <TextField id="" defaultValue="Email" className="si__text__box" margin="normal" />
          </div>
          <div className="si__right__label">
            Password &nbsp;<span className="ac__required">*</span>
          </div>
          <div>
            <TextField id="" defaultValue="Password" className="si__text__box" margin="normal" />
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
