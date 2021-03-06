import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './OrganizationView.component.css'
import StatusMenu from './StatusMenu'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Document } from 'react-pdf'

import Modal from '@mui/material/Modal'
import get from 'lodash.get'
import { organizationService, commonService, memberService } from '../../services'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setCountries } from '../../redux/actions/commonActions'
import Alert from '../Alert/Alert.component'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const OverView = props => {
  const { orgDet, payment } = props
  const { orgId } = useParams()
  const history = useHistory()
  const [open, setOpen] = React.useState(false)
  const [previewFile, setPreviewFile] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [adminEmailSame, setAdminEmailSame] = useState()
  const [facilityEmail, setFacilityName] = useState(null)
  const [states, setStates] = useState(null)
  const [countries, setAllCountries] = useState([])
  const dispatch = useDispatch()
  const [isAdminInfoEdit, setAdminInfoEdit] = useState(false)
  const [isOrgInfoEdit, setOrgInfoEdit] = useState(false)
  const [orgAdminId, setOrgAdminId] = useState('')

  const [openflash, setOpenFlash] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [subLebel, setSubLabel] = useState('')
  const [alertcolor, setAlertColor] = useState('')
  const [aboutList, setAboutList] = useState([])
  const [aboutOther, setAboutOther] = useState(false)
  var {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const data = {
    type: 'Buffer',
    data: [
      37, 80, 68, 70, 45, 49, 46, 51, 10, 37, 255, 255, 255, 255, 10, 55, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47,
      84, 121, 112, 101, 32, 47, 80, 97, 103, 101, 10, 47, 80, 97, 114, 101, 110, 116, 32, 49, 32, 48, 32, 82, 10, 47,
      77, 101, 100, 105, 97, 66, 111, 120, 32, 91, 48, 32, 48, 32, 53, 57, 53, 46, 50, 56, 32, 56, 52, 49, 46, 56, 57,
      93, 10, 47, 67, 111, 110, 116, 101, 110, 116, 115, 32, 53, 32, 48, 32, 82, 10, 47, 82, 101, 115, 111, 117, 114,
      99, 101, 115, 32, 54, 32, 48, 32, 82, 10, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 54, 32, 48, 32, 111, 98,
      106, 10, 60, 60, 10, 47, 80, 114, 111, 99, 83, 101, 116, 32, 91, 47, 80, 68, 70, 32, 47, 84, 101, 120, 116, 32,
      47, 73, 109, 97, 103, 101, 66, 32, 47, 73, 109, 97, 103, 101, 67, 32, 47, 73, 109, 97, 103, 101, 73, 93, 10, 47,
      88, 79, 98, 106, 101, 99, 116, 32, 60, 60, 10, 47, 73, 49, 32, 56, 32, 48, 32, 82, 10, 62, 62, 10, 62, 62, 10,
      101, 110, 100, 111, 98, 106, 10, 53, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 76, 101, 110, 103, 116, 104,
      32, 55, 48, 10, 47, 70, 105, 108, 116, 101, 114, 32, 47, 70, 108, 97, 116, 101, 68, 101, 99, 111, 100, 101, 10,
      62, 62, 10, 115, 116, 114, 101, 97, 109, 10, 120, 156, 51, 84, 48, 0, 66, 93, 67, 32, 97, 97, 98, 168, 103, 97,
      169, 144, 156, 203, 85, 200, 101, 104, 104, 96, 164, 103, 108, 102, 100, 102, 100, 10, 81, 96, 110, 9, 150, 212,
      53, 50, 177, 208, 51, 53, 49, 52, 54, 52, 86, 176, 48, 128, 169, 215, 247, 52, 84, 112, 201, 231, 10, 228, 2, 0,
      75, 230, 15, 69, 10, 101, 110, 100, 115, 116, 114, 101, 97, 109, 10, 101, 110, 100, 111, 98, 106, 10, 49, 48, 32,
      48, 32, 111, 98, 106, 10, 40, 80, 68, 70, 75, 105, 116, 41, 10, 101, 110, 100, 111, 98, 106, 10, 49, 49, 32, 48,
      32, 111, 98, 106, 10, 40, 80, 68, 70, 75, 105, 116, 41, 10, 101, 110, 100, 111, 98, 106, 10, 49, 50, 32, 48, 32,
      111, 98, 106, 10, 40, 68, 58, 50, 48, 50, 49, 49, 48, 50, 53, 49, 51, 48, 51, 50, 49, 90, 41, 10, 101, 110, 100,
      111, 98, 106, 10, 57, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 80, 114, 111, 100, 117, 99, 101, 114, 32, 49,
      48, 32, 48, 32, 82, 10, 47, 67, 114, 101, 97, 116, 111, 114, 32, 49, 49, 32, 48, 32, 82, 10, 47, 67, 114, 101, 97,
      116, 105, 111, 110, 68, 97, 116, 101, 32, 49, 50, 32, 48, 32, 82, 10, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10,
      52, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 51, 32, 48, 32, 111,
      98, 106, 10, 60, 60, 10, 47, 84, 121, 112, 101, 32, 47, 67, 97, 116, 97, 108, 111, 103, 10, 47, 80, 97, 103, 101,
      115, 32, 49, 32, 48, 32, 82, 10, 47, 78, 97, 109, 101, 115, 32, 50, 32, 48, 32, 82, 10, 62, 62, 10, 101, 110, 100,
      111, 98, 106, 10, 49, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 84, 121, 112, 101, 32, 47, 80, 97, 103, 101,
      115, 10, 47, 67, 111, 117, 110, 116, 32, 49, 10, 47, 75, 105, 100, 115, 32, 91, 55, 32, 48, 32, 82, 93, 10, 62,
      62, 10, 101, 110, 100, 111, 98, 106, 10, 50, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 68, 101, 115, 116, 115,
      32, 60, 60, 10, 32, 32, 47, 78, 97, 109, 101, 115, 32, 91, 10, 93, 10, 62, 62, 10, 62, 62, 10, 101, 110, 100, 111,
      98, 106, 10,
    ],
  }
  //   function blobToFile(theBlob, fileName) {
  //     //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //     theBlob.lastModifiedDate = new Date()
  //     theBlob.name = fileName
  //     return theBlob
  //   }
  //   const myFile = blobToFile(data, 'safasf.pdf')

  const downloadFile = (blob, fileName) => {
    const link = document.createElement('a')
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob)
    console.log(link.href)
    setPreviewFile(link.href)
    link.download = fileName
    // some browser needs the anchor to be in the doc
    document.body.append(link)
    //link.click()
    link.remove()
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000)
  }

  //   fetch('https://api.csuite.health/files/download', {
  //     method: 'POST',
  //     body: JSON.stringify({ name: 'c-1635191875609.pdf' }),
  //     headers: {
  //       'x-access-token':
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTc3OWYxZjczZDc5ZmViNTdkZWI2YTMiLCJ1c2VyRW1haWwiOiJzdXBlcmFkbWluQHlvcG1haWwuY29tIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE2MzUyNDA4NDYsImV4cCI6MTYzNTMyNzI0Nn0.XRgELkxV_5Ximay3b0BZ3lO5qW6UkzNTy8FZ7_xKfHY',
  //       'Content-Type': 'application/json; charset=utf-8',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   })
  //     .then(function (res) {
  //       return res.json()
  //     })
  //     .then(function (data) {
  //       alert(JSON.stringify(data))
  //     })
  useEffect(async () => {
    await fetchCountries()
    await fetchAboutUsList()
    const response = await memberService.getFacilityData(orgId)
    const orgData = get(response, ['data', 'data'], {})
    console.log('Overview >> orgDet', orgData)
    const adminInfo = get(orgData, 'admin[0]', {})
    console.log('Overview >> adminInfo', adminInfo)
    setOrgAdminId(adminInfo._id)
    setValue('facilityName', orgData.facilityName)
    setValue('facilityEmail', orgData.facilityEmail)
    setValue('facilityAddress', orgData.facilityAddress)
    setValue('fullName', adminInfo.fullName)
    setValue('email', adminInfo.email)
    setValue('phoneNumber', adminInfo.phoneNumber)
    setValue('facilityPhone', orgData.facilityPhone)
    setValue('country', orgData.country)
    setValue('state', orgData.state)
    setValue('city', orgData.city)
    setValue('zipcode', orgData.zipcode)
    setValue('npi', orgData.npi)
    setValue('taxId', orgData.taxId)
    setValue('medicalId', orgData.medicalId)
    setValue('website', orgData.website)
    setValue('about', orgData.about)
    setValue('country', orgData.country)
    await fetchStates(orgData.country)
    setValue('state', orgData.state)
    setValue('subject', orgData.subject)
    setAboutOther(orgData.about === 'Others')
    downloadFile(new Blob(data.data), 'myfile.pdf', { type: 'application/pdf' })
  }, [])

  const handleHover = e => {
    console.log('handleHover')
  }

  const handleClick = e => {
    console.log('handleClick', e.target)
  }
  const viewCertificates = async fileName => {
    let certificateResponse = await organizationService.downloadFile({ name: fileName })
    window.open(get(certificateResponse, ['data', 'data', 'url']), '_blank')
  }

  const checkAdminEmail = e => {
    if (e.target.value == facilityEmail) {
      setAdminEmailSame(true)
    } else {
      setAdminEmailSame(false)
    }
  }

  const fetchAboutUsList = async () => {
    const aboutUsList = await commonService.getAboutUsList().catch(err => {})
    setAboutList(get(aboutUsList, ['data', 'data', 'data'], []))
  }

  const fetchStates = async selectedCountryCode => {
    console.log('selected country code: ' + selectedCountryCode)
    const response = await commonService.getStates(selectedCountryCode).catch(error => {
      console.log(error)
    })
    const data = get(response, ['data', 'data', 'data'], null)
    setStates(data)
    if (data.length > 0) setValue('state', data[0].statecode)
    // setValue('state', data[0].statecode)
  }

  const fetchCountries = async () => {
    const response = await commonService.getCountries().catch(error => {
      console.log(error)
    })

    console.log('getCountries', response.data.data.data)
    setAllCountries(response.data.data.data)
    dispatch(setCountries(response.data.data.data))
  }

  const handleOrgInfoEdit = () => {
    setOrgInfoEdit(true)
  }

  const handleOrgInfoSave = () => {
    setOrgInfoEdit(false)
  }

  const handleOrgInfoCancel = () => {
    setOrgInfoEdit(false)
  }

  const handleAdminInfoEdit = () => {
    setAdminInfoEdit(true)
  }

  const handleAdminInfoCancel = () => {
    setAdminInfoEdit(false)
  }
  const onSaveAdminInfo = () => {
    setAdminInfoEdit(false)
    console.log('submitted data >> ', getValues())
  }

  // var saveOrganizationDetail = () => {
  //   setAdminInfoEdit(false)
  //   console.log('submitted data >> ', getValues())
  // }

  const saveOrganizationDetail = async () => {
    setAdminInfoEdit(false)
    setOrgInfoEdit(false)
    const formData = getValues()
    const adminInfo = [
      {
        _id: orgAdminId,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      },
    ]
    formData.admin = adminInfo

    if (Object.prototype.hasOwnProperty.call(formData, 'fullName')) delete formData['fullName']
    if (Object.prototype.hasOwnProperty.call(formData, 'email')) delete formData['email']
    if (Object.prototype.hasOwnProperty.call(formData, 'phoneNumber')) delete formData['phoneNumber']

    console.log('submitted data >> ', orgId, formData)
    const response = await organizationService.updateOrganizationDetail(orgId, formData).catch(err => console.log(err))
    console.log('saveOrganizationDetail >> response', response)
    if (get(response, 'status', 0) === 200) {
      setOpenFlash(true)
      setAlertMsg('Saved')
      setSubLabel('Organization detail was successfully updated.')
      setAlertColor('success')
    } else {
      setOpenFlash(true)
      setAlertMsg('Error')
      setSubLabel('Error occured while updating the Organization detail.')
      setAlertColor('fail')
    }
  }

  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
    setAlertMsg('')
    setSubLabel('')
    setAlertColor('')
  }

  return (
    <div className="io_overview">
      <form>
        <Accordion className="acc-wrapper">
          <AccordionSummary
            className="mod_Accordion"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            //id="panel1a-header"
          >
            <Typography className="acc-title">
              <div className="ov__title__div">
                <div className="ov__title__text">Admin's Info</div>
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="modAccDetails">
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
                Name
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('fullName', {
                      required: 'Full Name is required',
                      maxLength: 50,
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'This input is characters only.',
                      },
                    })}
                    disabled={!isAdminInfoEdit}
                    margin="normal"
                    InputProps={{ className: isAdminInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.fullName && <p className="ac__required">{errors.fullName.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Email Address
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('email', {
                      required: 'Email is required',
                      maxLength: 150,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid e-mail address',
                      },
                    })}
                    type="email"
                    onChange={checkAdminEmail}
                    disabled={!isAdminInfoEdit}
                    margin="normal"
                    InputProps={{ className: isAdminInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {adminEmailSame && (
                  <p className="ac__required"> Admin Email should not be same as Organization's Email </p>
                )}
                {errors.email && <p className="ac__required">{errors.email.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Phone Numbers
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('phoneNumber', {
                      required: {
                        value: true,
                        message: "Admin's Phone Number is required",
                      },
                      pattern: {
                        value: /^[1-9]\d*(\d+)?$/i,
                        message: 'Phone Number accepts only integer',
                      },
                    })}
                    inputProps={{
                      maxLength: 15,
                    }}
                    disabled={!isAdminInfoEdit}
                    margin="normal"
                    InputProps={{ className: isAdminInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.phoneNumber && <p className="ac__required">{errors.phoneNumber.message}</p>}
              </Typography>
            </div>
            <div className="ov__action__section">
              {!isAdminInfoEdit && (
                <Button className="ov__button" onClick={handleAdminInfoEdit}>
                  Edit
                </Button>
              )}
              {isAdminInfoEdit && (
                <div>
                  <Button onClick={saveOrganizationDetail} className="ov__button">
                    Save
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button className="ov__button" onClick={handleAdminInfoCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="acc-wrapper">
          <AccordionSummary
            className="mod_Accordion"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="acc-title">Organization's info</Typography>
          </AccordionSummary>
          <AccordionDetails className="modAccDetails">
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
                Name
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('facilityName', {
                      required: 'Organization Name is requird',
                      maxLength: 100,
                    })}
                    disabled={!isOrgInfoEdit}
                    margin="normal"
                    InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.facilityName && <p className="ac__required">{errors.facilityName.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Email Address
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('facilityEmail', {
                      required: 'Organization Email is required',
                      maxLength: 100,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid e-mail address',
                      },
                    })}
                    disabled={!isOrgInfoEdit}
                    margin="normal"
                    InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                    type="email"
                  />
                </div>
                {errors.facilityEmail && <p className="ac__required">{errors.facilityEmail.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Phone Numbers
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('facilityPhone', {
                      required: {
                        value: true,
                        message: "Organization's Phone Number is required",
                      },
                      pattern: {
                        value: /^[1-9]\d*(\d+)?$/i,
                        message: 'Phone Number accepts only integer',
                      },
                    })}
                    maxLength={15}
                    characterLimit={15}
                    onInput={e => {
                      e.target.value = e.target.value.toString().slice(0, 15)
                    }}
                    disabled={!isOrgInfoEdit}
                    margin="normal"
                    InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.facilityPhone && <p className="ac__required">{errors.facilityPhone.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper div__adjument">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Address
              </Typography>
              <div className="det-valContainer">
                <div className="ov__address__section">
                  <div className="det-subtitle">
                    <b>Address Line</b>
                  </div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    <div style={{ width: '250px' }}>
                      {' '}
                      <TextField
                        {...register('facilityAddress', { required: 'Address is required' })}
                        margin="normal"
                        disabled={!isOrgInfoEdit}
                        margin="normal"
                        InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                      />
                    </div>
                    {errors.facilityAddress && <p className="ac__required">{errors.facilityAddress.message}</p>}
                  </Typography>

                  <div className="block-container">
                    <div className="subTitle-block">
                      <div className="det-subtitle">
                        <b>Country</b>
                      </div>
                      <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                        <select
                          disabled={!isOrgInfoEdit}
                          {...register('country', { required: 'Country is required' })}
                          className={isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box'}
                          onChange={e => fetchStates(e.target.value)}
                        >
                          {countries &&
                            countries.map(c => (
                              <option value={c.code} key={c.code}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                        {errors.country && <p className="ac__required">{errors.country.message}</p>}
                      </Typography>
                    </div>
                    <div className="subTitle-block">
                      <div className="det-subtitle">
                        <b>State</b>
                      </div>
                      <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                        <select
                          {...register('state', { required: 'State is required' })}
                          disabled={!isOrgInfoEdit}
                          className={isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box'}
                        >
                          {states &&
                            states.map(c => (
                              <option value={c.statecode} key={c.statecode}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                        {errors.state && <p className="ac__required">{errors.state.message}</p>}
                      </Typography>
                    </div>
                  </div>
                  <div className="block-container">
                    <div className="subTitle-block">
                      <div className="det-subtitle">
                        <b>City</b>
                      </div>
                      <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                        <div style={{ width: '250px' }}>
                          {' '}
                          <TextField
                            {...register('city', {
                              required: 'City is required ',
                              maxLength: 20,
                              pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: 'This input is characters only.',
                              },
                            })}
                            disabled={!isOrgInfoEdit}
                            margin="normal"
                            InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                          />
                        </div>
                        {errors.city && <p className="ac__required">{errors.city.message}</p>}
                      </Typography>
                    </div>
                    <div className="subTitle-block">
                      <div className="det-subtitle">
                        <b>Zip code</b>
                      </div>
                      <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                        <div style={{ width: '250px' }}>
                          {' '}
                          <TextField
                            {...register('zipcode', { required: 'Zipcode is required ' })}
                            inputProps={{
                              maxLength: 20,
                            }}
                            disabled={!isOrgInfoEdit}
                            margin="normal"
                            InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                          />
                        </div>
                        {errors.zipcode && <p className="ac__required">{errors.zipcode.message}</p>}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                NPI
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('npi', {
                      required: {
                        value: true,
                        message: 'NPI is required',
                      },
                      pattern: {
                        value: /^[1-9]\d*(\d+)?$/i,
                        message: 'NPI accepts only integer',
                      },
                    })}
                    inputProps={{
                      maxLength: 10,
                    }}
                    disabled={!isOrgInfoEdit}
                    margin="normal"
                    InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.npi && <p className="ac__required">{errors.npi.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Tax ID
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('taxId', {
                      pattern: {
                        value: /^[1-9]\d*(\d+)?$/i,
                        message: 'Tax Id accepts only integer',
                      },
                    })}
                    inputProps={{
                      maxLength: 20,
                    }}
                    disabled={!isOrgInfoEdit}
                    margin="normal"
                    InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.taxId && <p className="ac__required">{errors.taxId.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Medical Id
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('medicalId', {
                      pattern: {
                        value: /^[1-9]\d*(\d+)?$/i,
                        message: 'Medical ID accepts only integer',
                      },
                    })}
                    inputProps={{
                      maxLength: 14,
                    }}
                    disabled={!isOrgInfoEdit}
                    margin="normal"
                    InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.medicalId && <p className="ac__required">{errors.medicalId.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                Website
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '250px' }}>
                  {' '}
                  <TextField
                    {...register('website')}
                    InputProps={{ className: 'ov__text__box' }}
                    disabled={!isOrgInfoEdit}
                    margin="normal"
                    InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                  />
                </div>
                {errors.website && <p className="ac__required">{errors.website.message}</p>}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                How did you hear about us?
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                <div style={{ width: '290px' }}>
                  <select
                    disabled={!isOrgInfoEdit}
                    {...register('about')}
                    className="ac__dropdown"
                    onChange={e => {
                      setAboutOther(e.target.value === 'Others')
                      setValue('subject', '')
                    }}
                  >
                    {aboutList &&
                      aboutList.map(c => (
                        <option value={c.name} key={c.name} className="ac__dropdown">
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </Typography>
            </div>
            {aboutOther && (
              <div className="detailWrapper">
                <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                  Others
                </Typography>
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  <div style={{ width: '250px' }}>
                    {' '}
                    <TextField
                      {...register('subject')}
                      inputProps={{
                        maxLength: 120,
                      }}
                      disabled={!isOrgInfoEdit}
                      margin="normal"
                      InputProps={{ className: isOrgInfoEdit ? 'ov__text__box' : 'ov__ro__text__box' }}
                    />
                  </div>
                </Typography>
              </div>
            )}
            <div className="ov__action__section">
              {!isOrgInfoEdit && (
                <Button onClick={handleOrgInfoEdit} className="ov__button">
                  Edit
                </Button>
              )}
              {isOrgInfoEdit && (
                <div>
                  <Button onClick={saveOrganizationDetail} className="ov__button">
                    Save
                  </Button>{' '}
                  &nbsp;&nbsp;&nbsp;
                  <Button className="ov__button" onClick={handleOrgInfoCancel}>
                    Cancel
                  </Button>{' '}
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="acc-wrapper">
          <AccordionSummary
            className="mod_Accordion"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="acc-title">Agreements</Typography>
          </AccordionSummary>
          <AccordionDetails className="modAccDetails">
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
                Business Associate Agreement
              </Typography>
              {orgDet && orgDet.business_certificate === '' ? (
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  ---
                </Typography>
              ) : (
                <div className="agreeContainer">
                  <div className="agreeFile">
                    <DescriptionOutlinedIcon className="descicon" />
                    <span className="black"> {orgDet.business_certificate}</span>
                  </div>
                  <div className="agreeIcons">
                    {/* <RemoveRedEyeOutlinedIcon className="mod-icon" onClick={()=>{viewCertificates(orgDet.business_certificate)}} /> */}
                    <FileDownloadOutlinedIcon
                      className="mod-icon"
                      onClick={() => {
                        viewCertificates(orgDet.business_certificate)
                      }}
                    />
                    {/* <MailOutlineOutlinedIcon className="mod-icon" /> */}
                    {/* <LocalPrintshopOutlinedIcon className="mod-icon" /> */}
                  </div>
                </div>
              )}
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                SAAS Agreement
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                {orgDet && orgDet.saas_certificate === '' ? (
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    ---
                  </Typography>
                ) : (
                  <div className="agreeContainer">
                    <div className="agreeFile">
                      <DescriptionOutlinedIcon className="descicon" />
                      <span className="black"> {orgDet.saas_certificate}</span>
                    </div>
                    <div className="agreeIcons">
                      {/* <RemoveRedEyeOutlinedIcon className="mod-icon" onClick={handleOpen} /> */}
                      <FileDownloadOutlinedIcon
                        className="mod-icon"
                        onClick={() => {
                          viewCertificates(orgDet.saas_certificate)
                        }}
                      />
                      {/* <MailOutlineOutlinedIcon className="mod-icon" /> */}
                      {/* <LocalPrintshopOutlinedIcon className="mod-icon" /> */}
                    </div>
                  </div>
                )}
              </Typography>
            </div>
            <div className="detailWrapper">
              <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                EULA Agreement
              </Typography>
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                {orgDet && orgDet.eula_certificate === '' ? (
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    ---
                  </Typography>
                ) : (
                  <div className="agreeContainer">
                    <div className="agreeFile">
                      <DescriptionOutlinedIcon className="descicon" />
                      <span className="black"> {orgDet.eula_certificate}</span>
                    </div>
                    <div className="agreeIcons">
                      {/* <RemoveRedEyeOutlinedIcon className="mod-icon" onClick={handleOpen} /> */}
                      <FileDownloadOutlinedIcon
                        className="mod-icon"
                        onClick={() => {
                          viewCertificates(orgDet.eula_certificate)
                        }}
                      />
                      {/* <MailOutlineOutlinedIcon className="mod-icon" /> */}
                      {/* <LocalPrintshopOutlinedIcon className="mod-icon" /> */}
                    </div>
                  </div>
                )}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion className="acc-wrapper">
          <AccordionSummary
            className="mod_Accordion"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="acc-title">
              Organization's {payment?.type == 'card' ? 'Card' : 'Banking'} Info
            </Typography>
          </AccordionSummary>
          {payment?.type == 'account' ? (
            <AccordionDetails className="modAccDetails">
              <div className="detailWrapper">
                <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
                  Bank Account Number
                </Typography>
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  **** **** **** {payment.last4}
                </Typography>
              </div>
              <div className="detailWrapper">
                <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                  Routing Number
                </Typography>
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  {payment.routing_number}
                </Typography>
              </div>
              <div className="detailWrapper">
                <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                  Name Associated with Bank Account
                </Typography>
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  {payment.account_holder_name}
                </Typography>
              </div>
            </AccordionDetails>
          ) : (
            <AccordionDetails className="modAccDetails">
              <div className="detailWrapper">
                <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
                  Card Number
                </Typography>
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  **** **** **** {payment?.last4}
                </Typography>
              </div>
              <div className="detailWrapper">
                <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
                  Card Type
                </Typography>
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  {payment?.card}
                </Typography>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Document
            file={{
              url: previewFile.url,

              withCredentials: true,
            }}
          />
        </Box>
      </Modal>
      <Alert
        handleCloseFlash={handleCloseFlash}
        alertMsg={alertMsg}
        openflash={openflash}
        subLebel={subLebel}
        color={alertcolor}
      />
    </div>
  )
}

export default OverView
