import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calendarAppointmentDate, appointmentAvailableTimeSlots } from '../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'
import moment from 'moment'
import DayViewComponent from './DayView/DayView.Component'
import './WeekDaysView.Component.css'
import RoundedBackArrow from '../../../../assets/icons/round_back_arrow.png'
import RoundedNextArrow from '../../../../assets/icons/round_next_arrow.png'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import PatientConfimationAppointmentComponent from '../../../ModelPopup/PatientConfimationAppointment.Component'
import ProblemAndSymptomsComponent from '../../../ModelPopup/ProblemAndSymptoms.Component'
import AppointmentApproveRequest from '../../../ModelPopup/AppointmentApproveRequest'
import get from 'lodash.get'
import { authenticationService, appointmentService } from '../../../../services'
import { useHistory } from 'react-router-dom'
import {
  setFlashMsg,
  primaryAppointmentDate,
  secondaryAppointmentDate,
  // getWeekDays
} from '../../../../redux/actions/commonActions'

const confirmAppointment = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
}

const confirmPopupWithoutSecondary = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
}

const problemAndSymptoms = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
}

//const userId = '6195076bb39e32b8a4274b46' //getUserId(role)

const weekDays = [0, 1, 2, 3, 4, 5]

const WeekDaysViewComponent = props => {
  const { appointmentDetails, type } = props

  const history = useHistory()
  const currentUser = authenticationService.currentUserValue
  const role = get(currentUser, ['data', 'data', 'role'], '')
  const getUserId = role => {
    switch (role) {
      case 'doctor':
        return get(currentUser, ['data', 'data', '_id'], '')
      default:
        return appointmentDetails._id
    }
  }

  console.log('WeekDaysViewComponent', props)

  const userId = getUserId(role)
  const appointmentUserId = props.id
  const [days, setDays] = useState([])
  const selectedCalender = useSelector(state => state.calendarAppointmentDate)
  const rweekDaysAvailablities = useSelector(state => state.appointmentAvailableTimeSlots)
  const [avaliableAppointmentDays, setAvaliableAppointmentDays] = useState([])
  const [currentDay, setCurrentDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [IsClickedAppointment, setClickedAppointment] = useState(false)
  const dispatch = useDispatch()
  // console.log('rweekDaysAvailablities', rweekDaysAvailablities)
  const primaryDate = useSelector(state => state.primaryAppointmentDate)
  const secondaryDate = useSelector(state => state.secondaryAppointmentDate)
  const [IsClickedConfirm, setClickedConfirm] = useState(false)
  const [IsClickedSubmit, setClickedSubmit] = useState(false)
  const [newTimings, setTimeSlots] = useState([])
  const [newAvailabilities, setNewAvailabilities] = useState([])
  const interval = 30
  const startSlotHour = 6
  const startSlotMinute = 0
  const endSlotHour = 23
  const endSlotMinute = 0
  const [appointmentReason, setAppointmentReason] = useState('')
  const [invitedMembers, setInvitedMembers] = useState([
    {
      email: '',
    },
  ])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [appointmentReasonErr, setappointmentReasonErr] = useState(false)
  const [reportsArray, setReportsArray] = useState([])
  const [isPastMonth, setPastMonth] = useState(false)

  const buildTimeSlots = (
    startDate,
    endDate,
    startHours,
    startMinutes,
    endHours,
    endMinutes,
    isSelected,
    isEnabled
  ) => {
    var startTime = moment(startDate).set({ hour: startSlotHour, minute: startSlotMinute })
    const endTime = moment(endDate).set({ hour: endSlotHour, minute: endSlotMinute })
    var aStartTime = moment(startDate).set({ hour: startHours, minute: startMinutes })
    const aEndTime = moment(endDate).set({ hour: endHours, minute: endMinutes })

    var timeSlots = []
    var idx = 1
    do {
      // console.log('startTime', startTime)
      const sTime = startTime.format('HH:mm')
      const eTime = startTime.add(interval, 'minutes').format('HH:mm')
      var timeSlot = {}
      console.log('cond >>', aStartTime.format('HH:mm'), sTime, aEndTime.format('HH:mm'), eTime)
      if (aStartTime.format('HH:mm') <= sTime && aEndTime.format('HH:mm') >= eTime) {
        console.log('cond >> true')
        timeSlot = {
          availabilityId: idx,
          startTime: sTime,
          endTime: eTime,
          isSelected: isSelected,
          isEnabled: isEnabled,
        }
      } else {
        timeSlot = {
          availabilityId: idx,
          startTime: sTime,
          endTime: eTime,
          isSelected: false,
          isEnabled: false,
        }
      }
      idx = idx + 1
      timeSlots.push(timeSlot)
      console.log('startTime', timeSlot)
    } while (startTime < endTime)
    return timeSlots
  }

  const getAvailablities = async sDate => {
    var selectedDate = sDate
    if (!moment(selectedDate).isValid) {
      selectedDate = moment(new Date())
    }
    const startDate = moment(selectedDate).format('YYYY-MM-DD')
    const endDate = moment(selectedDate).add(5, 'days').format('YYYY-MM-DD')
    console.log('userId, startDate, endDate, selectedDate', userId, startDate, endDate, selectedDate)
    const res = await appointmentService.getAppointmentsForAwailability(userId, startDate, endDate)
    console.log('response >> appointmentService', res)
    if (res.status === 200) {
      const response = get(res, ['data', 'data'], null)
      console.log('response', response)
      const resAppointments = response.appointments
      const resAvailabilities = response.availabilities
      console.log('resAvailabilities', resAvailabilities)
      var appointments = []
      var availabilities = []

      resAppointments.map(a => {
        const app = {
          status: a.status,
          startDate: a.startTime,
          endDate: a.endTime,
        }
        const appDay = moment(a.startTime).format('YYYY-MM-DD')
        const appStartTime = moment(a.startTime).format('HH:mm A')
        const appEndTime = moment(a.endTime).format('HH:mm A')
        console.log('times', appDay, appStartTime, appEndTime) //times.format('HH:mm a'))

        const appBookedTimings = {
          startTime: appStartTime,
          endTime: appEndTime,
          isSelected: false,
          isEnabled: false,
        }
        const appDetail = {
          dayDesc: moment(a.startTime).format('dddd, DD'),
          availableTimeSlots: appBookedTimings,
          day: moment(a.startTime).format('YYYY-MM-DD'),
        }
        appointments.push(appDetail)
      })

      resAvailabilities[0].days.map(d => {
        console.log('resAvailabilities[0].days', d)
        console.log(' moment(d.first_half_ending_time)', moment(d.first_half_ending_time))
        const aDate = moment(d.first_half_ending_time).format('YYYY-MM-DD')
        const fhStartHour = moment(d.first_half_starting_time).format('HH')
        const fhStartMinute = moment(d.first_half_starting_time).format('mm')
        const fhEndHour = moment(d.first_half_ending_time).format('HH')
        const fhEndMinute = moment(d.first_half_ending_time).format('mm')

        const shStartHour = moment(d.second_half_starting_time).format('HH')
        const shStartMinute = moment(d.second_half_starting_time).format('mm')
        const shEndHour = moment(d.second_half_ending_time).format('HH')
        const shEndMinute = moment(d.second_half_ending_time).format('mm')
        console.log('aAvailable, resAvailabilities[0].days', aDate, fhStartHour, fhStartMinute, fhEndHour, fhEndMinute)

        // To get the First Half availabilities
        const aFHAvailable = buildTimeSlots(
          aDate,
          aDate,
          fhStartHour,
          fhStartMinute,
          fhEndHour,
          fhEndMinute,
          false,
          true
        )
        // To get the Second Half availabilities
        const aSHAvailable = buildTimeSlots(
          aDate,
          aDate,
          shStartHour,
          shStartMinute,
          shEndHour,
          shEndMinute,
          false,
          true
        )
        console.log('aFHAvailable', aFHAvailable)
        console.log('aSHAvailable', aSHAvailable)

        const firstHalf = Math.ceil(aFHAvailable.length / 2)
        console.log('aFHAvailable >> half ', firstHalf)

        // To merge first and second half availabilities
        var dAvailable = []
        aFHAvailable.forEach(a => {
          if (a.availabilityId < firstHalf) {
            dAvailable.push(a)
          }
        })

        aSHAvailable.forEach(a => {
          if (a.availabilityId >= firstHalf) {
            dAvailable.push(a)
          }
        })

        // aFHAvailable.concat(aSHAvailable)
        console.log('HAvailable', dAvailable)

        // Day availabilities
        const availabilityDayDetail = {
          dayDesc: moment(aDate).format('dddd, DD'),
          availableTimeSlots: dAvailable,
          day: moment(aDate).format('YYYY-MM-DD'),
        }

        //  const bookedTimeSlots = appointments.filter(b => moment(b.day).format('dddd') == moment(a.day).format('dddd'))
        //   console.log('bookedTimeSlots', bookedTimeSlots,  moment(a.day).format('dddd'))
        //   var bookedTimeSlot = []
        //   if(bookedTimeSlot.length > 0) bookedTimeSlot = bookedTimeSlots[0]

        availabilities.push(availabilityDayDetail)
        console.log('buinding >> availabilities', availabilities)
        // setAvaliableAppointmentDays(availabilityDayDetail)
        // // console.log('weekDaysAvailablities', weekDaysAvailablities)
        // dispatch(appointmentAvailableTimeSlots(availabilityDayDetail))
      })

      // console.log('appointments >> ', appointments)

      const doctorAvailability = {
        availabilities: availabilities,
        bookedSlots: appointments,
      }
      console.log('appointments >> availabilities ', availabilities)

      return doctorAvailability
    } else {
      return null
    }
  }

  useEffect(async () => {
    const selectedYear = selectedCalender.calenderDate.Year
    const selectedMonth = selectedCalender.calenderDate.Month
    const selectedDay = selectedCalender.calenderDate.Day
    const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    const day = moment(selectedDate).format('YYYY-MM-DD')
    const currentDay = moment(new Date()).format('YYYY-MM-DD')
    console.log('today', day)
    console.log('today >> currentDay', day, currentDay)
    const IsValid = day > currentDay
    console.log('isValid', IsValid)
    setPastMonth(!IsValid)

    console.log('selectedDate', selectedDate)

    var newStartDate = moment(new Date()).format('YYYY-MM-DD')
    console.log('startDate < newStartDate', selectedDate, newStartDate)
    if (selectedDate < newStartDate) selectedDate = newStartDate

    const doctorAvailability = await getAvailablities(selectedDate)
    // const doctorAvailability = {
    //   availabilities: availabilities,
    //   bookedSlots: appointments
    // }

    setNewAvailabilities(doctorAvailability.availabilities)
    await getWeekDays(selectedDate, doctorAvailability.availabilities, doctorAvailability.bookedSlots)
    console.log('selectedYear', selectedYear, 'selectedMonth', selectedMonth, 'selectedDay', selectedDay)
    console.log('useEffect Week Days >> selectedDate ', selectedDate.format('dddd, DD'))
  }, [selectedCalender])

  const getSelectedDate = (year, month, day) => {
    const selectedDay = year + '-' + month + '-' + day
    return moment(selectedDay)
  }
  const getWeekDays = async (selectedDay, newAvailabilities, bookedSlots) => {
    const timings = buildTimeSlots(
      selectedDay,
      selectedDay,
      startSlotHour,
      startSlotMinute,
      endSlotHour,
      endSlotMinute,
      false,
      false
    )
    console.log('timings', timings)
    setTimeSlots(timings)
    var weekDaysAvailablities = []
    weekDays.forEach(d => {
      const currentDate = moment(selectedDay).add(d, 'd')
      console.log('day', currentDate.format('dddd, DD'), d)
      const dayAvailability = newAvailabilities.filter(a => moment(a.day).format('dddd') === currentDate.format('dddd'))
      var newDayAvailability = null
      if (dayAvailability.length > 0) newDayAvailability = dayAvailability[0]

      var availabilityDayDetail = {
        dayDesc: currentDate.format('dddd, DD'),
        availableTimeSlots: timings,
        day: currentDate.format('YYYY-MM-DD'),
      }
      console.log('newDayAvailability', newDayAvailability)
      console.log('newDayAvailability >> ', newDayAvailability)
      if (newDayAvailability)
        availabilityDayDetail = {
          dayDesc: currentDate.format('dddd, DD'),
          availableTimeSlots: newDayAvailability.availableTimeSlots,
          day: currentDate.format('YYYY-MM-DD'),
        }
      const newTimeSlots = getUnBookedSlots(currentDate, availabilityDayDetail.availableTimeSlots, bookedSlots)
      console.log('newTimeSlots', currentDate.format('YYYY-MM-DD'), newTimeSlots)
      availabilityDayDetail.availableTimeSlots = newTimeSlots
      console.log('new >> doctorBookedSlots >> Updated', availabilityDayDetail)
      weekDaysAvailablities.push(availabilityDayDetail)
    })

    console.log('newAvailabilities 123', newAvailabilities)

    setAvaliableAppointmentDays(weekDaysAvailablities)
    console.log('newAvailabilities', weekDaysAvailablities)
    console.log('buinding >> weekDaysAvailablities ', weekDaysAvailablities)
    dispatch(appointmentAvailableTimeSlots(weekDaysAvailablities))
  }

  const getUnBookedSlots = (date, availableTimeSlots, bookedSlots) => {
    const dDate = date.format('YYYY-MM-DD')
    console.log('doctorBookedSlots >> before', bookedSlots)
    var newAvailableTimeSlots = availableTimeSlots

    bookedSlots.forEach(b => {
      if (b.day === dDate) {
        const startTime = b.availableTimeSlots.startTime.split(' ')
        console.log('doctorBookedSlots', 'Present', b.availableTimeSlots.startTime, startTime[0])
        if (startTime.length > 0) {
          const sTime = startTime[0]
          newAvailableTimeSlots.map(a => {
            if (a.startTime == sTime) {
              a.isEnabled = false
              console.log('doctorBookedSlots >> Updated', dDate, a)
              return a
            } else return a
          })
        }
      }
    })

    console.log('doctorBookedSlots >> after', newAvailableTimeSlots)
    return newAvailableTimeSlots
  }

  const moveBack = async () => {
    console.log('useEffect Week Days', selectedCalender)
    const selectedYear = selectedCalender.calenderDate.Year
    const selectedMonth = selectedCalender.calenderDate.Month
    const selectedDay = selectedCalender.calenderDate.Day
    const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    var newSelectedDate = moment(selectedDate).add(-5, 'd')
    var newStartDate = moment(new Date())
    console.log('startDate < newStartDate >> Weekdays', selectedDate, newStartDate)
    if (newSelectedDate.format('YYYY-MM-DD') < newStartDate.format('YYYY-MM-DD')) newSelectedDate = newStartDate

    const newDay = newSelectedDate.format('MMMM, YYYY')
    console.log(newSelectedDate.format('dddd, DD'))
    setCurrentDate(newDay)
    setCurrentDay(newSelectedDate)
    const calenderDay = {
      Year: newSelectedDate.format('YYYY'),
      Month: newSelectedDate.format('MM'),
      Day: newSelectedDate.format('DD'),
    }
    dispatch(calendarAppointmentDate(calenderDay))
  }
  const moveNext = async () => {
    console.log('useEffect Week Days', selectedCalender)
    const selectedYear = selectedCalender.calenderDate.Year
    const selectedMonth = selectedCalender.calenderDate.Month
    const selectedDay = selectedCalender.calenderDate.Day
    const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    const newSelectedDate = moment(selectedDate).add(5, 'd')
    const newDay = newSelectedDate.format('MMMM, YYYY')
    console.log(newSelectedDate.format('dddd, DD'))
    setCurrentDate(newDay)
    setCurrentDay(newSelectedDate)
    const calenderDay = {
      Year: newSelectedDate.format('YYYY'),
      Month: newSelectedDate.format('MM'),
      Day: newSelectedDate.format('DD'),
    }
    dispatch(calendarAppointmentDate(calenderDay))
  }

  const clickCloseButton = () => {
    setClickedAppointment(false)
  }

  const clickConfirmButton = async () => {
    // setClickedAppointment(false)
    // setClickedConfirm(true)
    if (role === 'patient' && type !== 'rescheduleByPatient') {
      setClickedAppointment(false)
      setClickedConfirm(true)
      return false
    }
    const reqData = {}
    reqData.primaryStartTime = moment(primaryDate.Day + ' ' + primaryDate.timings.startTime, 'YYYY-MM-DD HH:mm').format(
      'YYYY-MM-DD HH:mm:ss'
    )
    reqData.primaryEndTime = moment(primaryDate.Day + ' ' + primaryDate.timings.endTime, 'YYYY-MM-DD HH:mm').format(
      'YYYY-MM-DD HH:mm:ss'
    )
    if (secondaryDate.Day && secondaryDate.timings.startTime) {
      reqData.secondaryStartTime = moment(
        secondaryDate.Day + ' ' + secondaryDate.timings.startTime,
        'YYYY-MM-DD HH:mm'
      ).format('YYYY-MM-DD HH:mm:ss')
      reqData.secondaryEndTime = moment(
        secondaryDate.Day + ' ' + secondaryDate.timings.endTime,
        'YYYY-MM-DD HH:mm'
      ).format('YYYY-MM-DD HH:mm:ss')
    }
    reqData.appointmentReason = appointmentReason
    reqData.email = invitedMembers.map(x => x.email)
    reqData.documents = selectedFiles.map(x => x.path)

    if (role === 'doctor') {
      reqData.patientId = appointmentDetails._id
      reqData.doctorId = userId
    } else if (role === 'patient') {
      reqData.doctorId = appointmentDetails._id
    }
    let res
    console.log('role', role)
    if (role === 'doctor' || type === 'rescheduleByPatient') {
      res = await appointmentService.rescheduleAppointment(reqData, appointmentDetails.appointmentid, type)
    } else {
      res = await appointmentService.makeAppointment(reqData)
    }
    if (res.status === 200) {
      dispatch(setFlashMsg({
        openFlash: true,
        alertMsg: 'Well done!',
        subLabel: role === 'doctor' ?
        'Your appointment was successfully re-scheduled, wait for patient confirmation.'
          : 'Your appointment was successfully re-scheduled, wait for doctor confirmation.',
        color: 'success'
      }))
      history.push('/appointments')
      setClickedConfirm(false)
      setClickedSubmit(true)
    } else {
      console.log('Makeappointment', res.error)
    }

    const selectedDate = {
      Day: null,
      timings: {
        startTime: null,
        endTime: null,
        timeSlotId: null,
      },
    }
    dispatch(primaryAppointmentDate(selectedDate))
    dispatch(secondaryAppointmentDate(selectedDate))

    setClickedAppointment(false)
  }

  const clickBackButton = () => {
    console.log('clickBackButton >> clicked')
    setAppointmentReason('')
    setSelectedFiles([])
    setClickedAppointment(true)
    setClickedConfirm(false)
  }

  const clickSubmitButton = () => {
    // setClickedConfirm(false)
    // setClickedSubmit(true)
    if (appointmentReason == '') {
      setappointmentReasonErr(true)
      return false
    }
    let result,
      isEmailError = 0
    invitedMembers.map(inputsField => {
      result = inputsField.validator
      if (result == false) {
        isEmailError++
      }
    })

    if (isEmailError > 0) {
      return false
    }

    const reqData = {}
    reqData.primaryStartTime = moment(primaryDate.Day + ' ' + primaryDate.timings.startTime, 'YYYY-MM-DD HH:mm').format(
      'YYYY-MM-DD HH:mm:ss'
    )
    reqData.primaryEndTime = moment(primaryDate.Day + ' ' + primaryDate.timings.endTime, 'YYYY-MM-DD HH:mm').format(
      'YYYY-MM-DD HH:mm:ss'
    )
    if (secondaryDate.Day && secondaryDate.timings.startTime) {
      reqData.secondaryStartTime = moment(
        secondaryDate.Day + ' ' + secondaryDate.timings.startTime,
        'YYYY-MM-DD HH:mm'
      ).format('YYYY-MM-DD HH:mm:ss')
      reqData.secondaryEndTime = moment(
        secondaryDate.Day + ' ' + secondaryDate.timings.endTime,
        'YYYY-MM-DD HH:mm'
      ).format('YYYY-MM-DD HH:mm:ss')
    }
    reqData.appointmentReason = appointmentReason
    reqData.email = invitedMembers.map(x => x.email)
    reqData.documents = selectedFiles.map(x => x)

    if (role === 'doctor') {
      reqData.patientId = appointmentDetails.id
    } else if (role === 'patient') {
      reqData.doctorId = appointmentDetails._id
    }
    console.log('appointmentRequest', reqData)

    appointmentService.makeAppointment(reqData).then(
      res => {
        console.log('makeAppointment', res)
        setClickedConfirm(false)
        setClickedSubmit(true)
      },
      error => {
        console.log('Makeappointment', error)
      }
    )
  }

  const clickRequestClose = () => {
    setClickedSubmit(false)
    const defaultValue = {
      Day: null,
      timings: {
        startTime: null,
        endTime: null,
        timeSlotId: null,
      },
    }
    dispatch(primaryAppointmentDate(defaultValue))
    dispatch(secondaryAppointmentDate(defaultValue))

    history.push('/appointments')
  }

  return (
    <div className="wdv__main__div">
      <div className="wdv__row">
        {!isPastMonth ? (
          <img src={RoundedBackArrow} alt="back" style={{ cursor: 'pointer' }} onClick={() => moveBack()} />
        ) : null}
        {avaliableAppointmentDays &&
          avaliableAppointmentDays.map(aas => (
            <div className="wdv__column">
              <DayViewComponent avaliableAppointmentDay={aas} />
            </div>
          ))}
        <img src={RoundedNextArrow} alt="next" style={{ cursor: 'pointer' }} onClick={() => moveNext()} />
      </div>
      <div className="wdv__row">
        <div className="wdv__section">
          {primaryDate.Day === null || secondaryDate.Day === null ? (
            <Button className="wdv__next__btn">Next</Button>
          ) : null}

          {role === 'doctor' && primaryDate.Day != null ? (
            <Button className="wdv__request__appointment" onClick={() => setClickedAppointment(true)}>
              Request Appointment
            </Button>
          ) : null}

          {role === 'patient' && primaryDate.Day != null && secondaryDate.Day != null ? (
            <Button className="wdv__request__appointment" onClick={() => setClickedAppointment(true)}>
              Request Appointment
            </Button>
          ) : null}
        </div>
      </div>

      <Modal open={IsClickedAppointment} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={secondaryDate.Day === null ? confirmPopupWithoutSecondary : confirmAppointment}>
          <PatientConfimationAppointmentComponent
            appointmentDetails={appointmentDetails}
            id={appointmentUserId}
            role={role}
            clickCloseButton={clickCloseButton}
            clickConfirmButton={clickConfirmButton}
          />
        </Box>
      </Modal>
      <Modal open={IsClickedConfirm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={problemAndSymptoms}>
          <ProblemAndSymptomsComponent
            clickBackButton={clickBackButton}
            clickSubmitButton={clickSubmitButton}
            invitedMembers={invitedMembers}
            setInvitedMembers={setInvitedMembers}
            appointmentReason={appointmentReason}
            setAppointmentReason={setAppointmentReason}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            appointmentReasonErr={appointmentReasonErr}
            setappointmentReasonErr={setappointmentReasonErr}
            reportsArray={reportsArray}
            setReportsArray={setReportsArray}
          />
        </Box>
      </Modal>

      <Modal open={IsClickedSubmit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={problemAndSymptoms}>
          <AppointmentApproveRequest clickRequestClose={clickRequestClose} />
        </Box>
      </Modal>
    </div>
  )
}

export default WeekDaysViewComponent
