import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import OrganizationNameIcon from '../../../assets/icons/organization_name.png'
import OrganizationEmailIcon from '../../../assets/icons/organization_email.png'
import OrganizationHomeIcon from '../../../assets/icons/organization_home.png'
import OrganizationPhoneIcon from '../../../assets/icons/organization_phone.png'
import history from '../../../history'
import { useForm } from 'react-hook-form'
import { organizationService } from '../../../services'
import get from 'lodash.get'
import './Guardian.Component.css'
import { newMember, resetMember } from '../../../redux/actions/memberActions'
import { useSelector, useDispatch } from 'react-redux'

const GuardianComponent = props => {
  const member = useSelector(state => state.newMember)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    var memberData = member.member
    memberData.guardian = data
    console.log('memberData.guardian', memberData)
    dispatch(newMember(memberData))
    props.closeScreen()
    history.push('/members/profile-setup')
  }

  return (
    <div className="gn__main__div">
      <div className="gn__row">
        <div className="gn__column gn__title">You need a guardian</div>
      </div>

      <div className="gn__row">
        <div className="gn__column gn__sub__title">
          Since you’re under 18 years old, we will need you to provide your guardian contact details information
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gn__row">
          <div className="gn__column">
            <div className="gn__label">
              First name <span className="ac__required">*</span>
            </div>
            <TextField
              // {...useInput('facilityName', { isRequired: true })}
              {...register('first_name', { required: 'First name is required' })}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationNameIcon} alt="First Name" />
                  </InputAdornment>
                ),
                className: 'gn__text__box',
              }}
            />
            {errors.first_name && <p className="io__required">{errors.first_name.message}</p>}
          </div>

          <div className="gn__column">
            <div className="gn__label">
              Last name <span className="ac__required">*</span>
            </div>
            <TextField
              // {...useInput('facilityEmail', { isRequired: true })}
              {...register('last_name', {
                required: 'Last name is required.',
              })}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationNameIcon} alt="Organization Email" />
                  </InputAdornment>
                ),
                className: 'gn__text__box',
              }}
            />
            {errors.last_name && <p className="io__required">{errors.last_name.message}</p>}
          </div>
        </div>

        <div className="gn__row">
          <div className="gn__column">
            <div className="gn__label">Phone number
            <span className="ac__required"> *</span></div>
            <TextField
              {...register('phone_no', { required: 'Phone number is required.' })}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationPhoneIcon} alt="Organization Home" />
                  </InputAdornment>
                ),
                className: 'gn__text__box',
              }}
            />
            {errors.phone_no && <p className="io__required">{errors.phone_no.message}</p>}
          </div>

          <div className="gn__column">
            <div className="gn__label">Email<span className="ac__required"> *</span></div>
            <TextField
              {...register('email', {
                required: 'Guardian Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              margin="normal"
              InputProps={{
                maxLength: 15,
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationEmailIcon} alt="Organization Phone" />
                  </InputAdornment>
                ),
                className: 'gn__text__box',
              }}
            />
            {errors.email && <p className="io__required">{errors.email.message}</p>}
          </div>
        </div>

        <div className="gn__row">
          <div style={{ marginTop: '30px' }} className="gn__same__line">
            <div className="gn__column">
              <Button className="gn__close__btn" onClick={props.closeScreen}>
                Back
              </Button>
            </div>
            <div className="gn__column">
              <Button type="submit" className="gn__submit__btn" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default GuardianComponent
