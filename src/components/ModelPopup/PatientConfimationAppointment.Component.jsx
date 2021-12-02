import React, { useState, useEffect } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import ResendCalender from '../../assets/icons/resend_calender.png'
import { memberService, commonService } from '../../services'
import get from 'lodash.get'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import CircleIcon from '@mui/icons-material/Circle'
import { useSelector, useDispatch } from 'react-redux'
import ProblemAndSymptomsComponent from './ProblemAndSymptoms.Component'
import { appointmentService } from '../../services'

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
  },
})

const roles = [
  { name: 'Doctor', value: 'doctor' },
  { name: 'NP', value: 'np' },
  { name: 'PA', value: 'pa' },
  { name: 'Receptionist', value: 'receptionist' },
]

const PatientConfimationAppointment = props => {
  console.log("doctorId",props)
  const doctorName = props.name;
  const { classes } = props
  const primaryDate = useSelector(state => state.primaryAppointmentDate)
  const secondaryDate = useSelector(state => state.secondaryAppointmentDate)
  const { selectedAppointment, clickCloseButton, clickConfirmButton } = props
  const [activeTab, setActiveTab] = useState('primary')
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const res = commonService.getAllRoles()
  // }, [])

  // const onSubmit = () => {
  //   const res = await appointmentService.makeAppointment(requestData)
  //   if (res.status === 200) {
  //     // (get(res, ['data', 'data', '0', 'totalData'], []))
  //     setIsSubmit(true)
  //     setOpenInvitePatientSuccess(true)
  //   } else {

  //   }
  // }


  return (
    <div className="pca__main__div">
      <div className="pca__row">
        <div className="pca__center__align">
          <div>
            <img src={ResendCalender} alt="Approve Org" />
          </div>
        </div>
      </div>
      <div className="pca__row">
        <div className="pca__center__align">
          <label className="io__title">Appointment Info</label>
        </div>
      </div>

      <div className="pca__row">
        <div className="pca__doctor__column pca__card">
          <label className="pca__label">Doctor</label>
          <label className="pca__value__text">{doctorName}</label>
        </div>
        <div className="pca__primary__column pca__card">
          <label className="pca__label">Primary - Date and Time</label>
          <label className="pca__value__text">
            {' '}
            <label className="pca__value__text">{`${primaryDate.Day} - ${primaryDate.Time.startTime}`}</label>
          </label>
        </div>
        {secondaryDate.Day &&
          <div className="pca__primary__column pca__card">
            <label className="pca__label">Secondary - Date and Time</label>
            <label className="pca__value__text">{`${secondaryDate.Day} - ${secondaryDate.Time.startTime}`}</label>
          </div>
        }

      </div>
      <div className="pca__row">
        <div className="pca__help__text">
          Please note that this is not a confirmation of your appointment. The confirmation will be sent to your email
          within 24 hours.
        </div>
      </div>
      <div className="io__row io__btn io_width97">
        <div className="io__same__line">
          <div className="io__cancel">
            <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
              Cancel
            </Button>
          </div>
          <div className="io__approve">
            <Button className="io__Approve__btn" onClick={props.clickConfirmButton}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(PatientConfimationAppointment)
