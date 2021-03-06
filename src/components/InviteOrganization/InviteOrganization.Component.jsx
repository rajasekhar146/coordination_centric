import React, { useState } from 'react'
import './InviteOrganization.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import OrganizationNameIcon from '../../assets/icons/organization_name.png'
import OrganizationEmailIcon from '../../assets/icons/organization_email.png'
import OrganizationHomeIcon from '../../assets/icons/organization_home.png'
import OrganizationPhoneIcon from '../../assets/icons/organization_phone.png'
// import OrganizationNameIcon from '../../assets/icons/OrganizationName.png'
// import { useForm } from '../../utils/validator'
import { useForm } from 'react-hook-form'
import { organizationService } from '../../services'
import get from 'lodash.get'
import capitalize from 'lodash.capitalize'

const InviteOrganizationComponent = props => {
  const {
    setOpenFlash,
    setAlertMsg,
    clickCloseButton,
    setSubLabel,
    setAlertColor
  } = props;


  const defaultValues = {
    facilityName: '',
    facilityEmail: '',
    facilityAddress: '',
    facilityPhone: '',
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()


  const customErrorAttribute = {
    className: 'has-error',
    'another-attr': 'look-at-me',
  }

  // const { values, useInput, isValid } = useForm(defaultValues, customErrorAttribute)

  const [isSubmit, setIsSubmit] = useState(false)
  const [isExist, setIsExist] = useState('')

  const onSubmit = e => {
    setIsSubmit(true)
    defaultValues.facilityName = watch('facilityName')
    defaultValues.facilityEmail = watch('facilityEmail')
    defaultValues.facilityAddress = watch('facilityAddress')
    defaultValues.facilityPhone = watch('facilityPhone')

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUserRole = get(currentUser, ['data', 'data', 'role'], '')
    const currentUserEmail = get(currentUser, ['data', 'data', 'email'], '')

    var orgDetail = {
      facilityName: defaultValues.facilityName,
      facilityEmail: defaultValues.facilityEmail,
      facilityAddress: defaultValues.facilityAddress,
      facilityPhone: defaultValues.facilityPhone
    }

    if (currentUserRole === 'admin') {
      orgDetail = {
        adminEmail: currentUserEmail,
        facilityEmail: defaultValues.facilityEmail,
        facilityName: defaultValues.facilityName,
        facilityAddress: defaultValues.facilityAddress,
        facilityPhone: defaultValues.facilityPhone
      }
    }


    const res = organizationService.addOrganization(orgDetail, currentUserRole)
    res.then((response) => {
      setOpenFlash(true)
      setAlertMsg('Invitation Sent')
      setSubLabel('The invitation was sent successfully')
      setAlertColor('success')
      clickCloseButton()
      localStorage.removeItem('facility')
    }).catch((error) => {
      if (get(error, ['response', 'data', 'message'], '') === "Organization Already Exists") {
        setIsExist('Email Already Registered')
      }
      localStorage.removeItem('facility')
    })
  }

  const handleInviteOrganization = () => { }

  return (
    <div className="io__main__div">
      <div className="io__title__text">Invite Organization</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="io__form form-body">
          <div className="io__row">
            <div className="io__label">
              Organization Name <span className="ac__required">*</span>
            </div>
            <TextField
              // {...useInput('facilityName', { isRequired: true })}
              {...register('facilityName', { required: true, minLength: 3 })}
              margin="normal"
              error={errors.facilityName && isSubmit}
              onChange={e => {
                let val
                if (e.target.value.length === 1) {
                  val = capitalize(e.target.value)
                } else {
                  val = e.target.value
                }
                setValue('facilityName', val)
              }}
              inputProps={{ minLength: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationNameIcon} alt="Organization Name" />
                  </InputAdornment>
                ),
                className: 'io__text__box',
              }}
            />
            {errors.facilityName && errors.facilityName.type === 'required' && (
              <p className="io__required">Organization Name is required.</p>
            )}
            {errors.facilityName && errors.facilityName.type === 'minLength' && (
              <p className="io__required">Organization Name must be at least 3 characters.</p>
            )}
          </div>

          <div className="io__row">
            <div className="io__label">
              Organization Email <span className="ac__required">*</span>
            </div>
            <TextField
              // {...useInput('facilityEmail', { isRequired: true })}
              {...register('facilityEmail', {
                required: 'Organization Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              margin="normal"
              type="email"
              error={errors.facilityEmail && isSubmit}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationEmailIcon} alt="Organization Email" />
                  </InputAdornment>
                ),
                className: 'io__text__box',
              }}
            />
            {errors.facilityEmail && <p className="io__required">{errors.facilityEmail.message}</p>}
            {isExist && <p className="io__required">{isExist}</p>}
          </div>

          <div className="io__row">
            <div className="io__label">Address</div>
            <TextField
              {...register('facilityAddress', {})}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationHomeIcon} alt="Organization Home" />
                  </InputAdornment>
                ),
                className: 'io__text__box',
              }}
            />
          </div>

          <div className="io__row">
            <div className="io__label">Phone Number</div>
            <TextField
              {...register('facilityPhone', {
                pattern: {
                    value: /^[1-9]\d*(\d+)?$/i,
                    message: 'Phone Number accepts only integer',
                }
          })}
          inputProps={{
            maxLength: 15,
          }}
              onChange={e => {
                setValue('facilityPhone', e.target.value.replace(/[^0-9]/g, ''))
              }}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={OrganizationPhoneIcon} alt="Organization Phone" />
                  </InputAdornment>
                ),
                className: 'io__text__box',
              }}
            />
          </div>

          <div className="io__row">
            <div style={{ marginTop: "50px" }} className="io__same__line">
              <div className="io__column">
                <Button className="io__add__organization__btn__close" onClick={props.clickCloseButton}>
                  Close
                </Button>
              </div>
              <div style={{ marginLeft: "15px" }} className="io__column io__invite__org__btn">
                <Button type="submit" className="io__add__organization__btn">
                  Invite Organization
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default InviteOrganizationComponent
