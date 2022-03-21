import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'
import UploadIcon from '../../assets/icons/upload.png'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { setCountries } from '../../redux/actions/commonActions'
import { useSelector, useDispatch } from 'react-redux'
import { commonService } from '../../services'
import get from 'lodash.get'
import { settinService } from '../../services'
import { memberService } from '../../services'
import FormControl from '@material-ui/core/FormControl'
import moment from 'moment-timezone'
import { withStyles } from '@material-ui/core/styles'
import { isUpperCase } from 'is-upper-case'
import { isLowerCase } from 'is-lower-case'
import CheckedIcon from '../../assets/icons/checked.png'
import UncheckedIcon from '../../assets/icons/unchecked.png'
import { authenticationService } from '../../services'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import history from '../../history'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    background: '#FFFFFF',
    width: '100%',
  },
  dropdownStyle: {
    border: '1px solid black',
    borderRadius: '5px',
    width: '50px',
    height: '200px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  input: {
    background: '#FFFFFF',
    borderRadius: '8px',
    width: '100%',
  },
})

const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [validations, setValidations] = useState({
    passwordLength: false,
    symbol: false,
    number: false,
    capital: false,
    small: false,
  })

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
      }}
    />
  )

  useEffect(() => {
    const validationsObj = {
      passwordLength: false,
      symbol: false,
      number: false,
      capital: false,
      small: false,
    }

    if (newPassword) {
      if (newPassword.length >= 8) {
        validationsObj.passwordLength = true
      }
      newPassword.split('').forEach(val => {
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
  }, [newPassword])

  const handleSubmit = async e => {
    setFormSubmitted(true)
    e.preventDefault()
    e.stopPropagation()
    if (oldPassword && newPassword && confirmPassword) {
      if (
        validations.passwordLength &&
        validations.symbol &&
        validations.number &&
        validations.capital &&
        validations.small
      ) {
        if (newPassword === confirmPassword) {
          // setIsSubmit(true)
          const data = {}
          data.oldPassword = oldPassword
          data.newPassword = newPassword
          await authenticationService
            .changePassword(data)
            .then(res => {
              console.log('change PWD >> data', res)
              var loggedUser = JSON.parse(localStorage.getItem('currentUser'))         
              if (get(loggedUser, ['data', 'data'], false)) {
                loggedUser.data.data.isPasswordChanged = true
                localStorage.setItem('currentUser', JSON.stringify(loggedUser))
              }  
              props.handleSuccessClose()
            })
            .catch(err => {
              console.log('change PWD >> err', err.response)
              const errMsg = get(err.response, ['data', 'message'], '')
              setErrMsg(errMsg)
              // props.handleFailureClose()
            })

          // res
          //   .then(() => {
          //     setFormSubmitted(false)
          //     props.handleSuccessClose()
          //   })
        } else {
          setErrMsg('New password and confirm password doesn’t match.')
        }
      } else {
        setErrMsg('Password should match the given requirements')
      }
    }
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="io_p_info">
      <form className="io_password_form" onSubmit={handleSubmit}>
        <div className="io_password">
          <div className="od__row">
            <div className="od__p_title io_pl0" style={{ fontWeight: 'bold' }}>
              Set your password
              <div className="io_p_info_label"></div>
            </div>
          </div>
          <ColoredLine color="#E4E7EC" />
          <div className="od__row_password">
            <div className="od_label_p">Current Password</div>
            <div className="od_input_p io_radio">
              <OutlinedInput
                // {...useInput('facilityName', { isRequired: true })}
                onChange={e => {
                  setOldPassword(e.target.value)
                }}
                value={oldPassword}
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                InputProps={{ className: 'si__right__content_resend' }}
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
              {!oldPassword && formSubmitted && <p className="io__required">Current Password is Required</p>}
            </div>
          </div>
          <ColoredLine color="#E4E7EC" />
          <div className="od__row_password">
            <div className="od_label_p">New Password</div>
            <div className="od_input_p io_radio">
              <OutlinedInput
                // {...useInput('facilityName', { isRequired: true })}
                onChange={e => {
                  setNewPassword(e.target.value)
                }}
                value={newPassword}
                margin="normal"
                type={showNewPassword ? 'text' : 'password'}
                InputProps={{ className: 'si__right__content_resend' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <div className="si__pwd__show">{showNewPassword ? 'Hide' : 'Show'}</div>
                    </IconButton>
                  </InputAdornment>
                }
              />
              {!newPassword && formSubmitted && <p className="io__required">New Password is Required</p>}
            </div>
          </div>
          <ColoredLine color="#E4E7EC" />
          <div className="od__row_password">
            <div className="od_label_p">Confirm New Password</div>
            <div className="od_input_p io_radio">
              <OutlinedInput
                // {...useInput('facilityName', { isRequired: true })}
                onChange={e => {
                  setConfirmPassword(e.target.value)
                  setErrMsg('')
                }}
                value={confirmPassword}
                margin="normal"
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{ className: 'si__right__content_resend' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <div className="si__pwd__show">{showConfirmPassword ? 'Hide' : 'Show'}</div>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </div>
          <ColoredLine color="#E4E7EC" />
          {!confirmPassword && formSubmitted && <p className="io__required">Confirm Password is Required</p>}
          {errMsg && <p className="ac__required">{errMsg}</p>}
          <div className="od__row od_flex_space_between">
            <div className="od__p_title io_pl0"></div>
            <div className="od__btn__div od__align__right io_pr0">
              {/* <Button
                  onClick={() => {
                    history.push('/dashboard')
                  }}
                  className="io_p_cancel"
                >
                  Cancel
                </Button> */}

              <Button type="submit" className="io__save__btn">
                Update Password
              </Button>
            </div>
          </div>
        </div>
        <div className="io_password_requiments">
          <div className="si_password_content">
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
                At least 1 non-alphanumeric symbol (e.g ‘@#$%^&*’)
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  )
}
export default withStyles(styles)(ChangePassword)
