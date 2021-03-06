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
  width: 440,
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
  const currentUserId = get(currentUser, ['data', 'data', '_id'], '')
  console.log('Logged User Role', role)
  const getUserId = role => {
    switch (role) {
      case 'doctor':
        return get(currentUser, ['data', 'data', '_id'], '')
      default:
        return appointmentDetails._id
    }
  }

  const getUserIdFromNotification = (role) =>{
    switch (role) {
      case 'doctor':
        return appointmentDetails.to
      default:
        return appointmentDetails.from._id 
    }
  }

  console.log('WeekDaysViewComponent', props)

  const userId = appointmentDetails.from ? getUserIdFromNotification(role , type) : getUserId(role)
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
  const [newBookedSlots, setNewBookedSlots] = useState([])
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
  const [isEligibleForBook, setEligibleForBook] = useState(false)
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

  useEffect(() => {
    console.log('useEffect >> primary and secondary', primaryDate, secondaryDate)
    if (role == 'doctor') {
      if (primaryDate.Day != null || secondaryDate.Day != null) setEligibleForBook(true)
      else setEligibleForBook(false)
    } else if (role == 'patient') {
      if (primaryDate.Day != null && secondaryDate.Day != null) setEligibleForBook(true)
      else setEligibleForBook(false)
    }
  }, [primaryDate, secondaryDate])

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
      var resAppointments = response.appointments
      const resAvailabilities = response.availabilities
      console.log('resAppointments', resAppointments)
      console.log('resAvailabilities', resAvailabilities)
      var appointments = []
      var availabilities = []

      //Excludes the status declined, cancelled from appointments
      resAppointments = resAppointments.filter(a => !(a.status == 'declined' || a.status == 'cancelled'))
      console.log('resAppointments >> excludes', resAppointments)

      resAppointments.map(a => {
        const app = {
          status: a.status,
          startDate: a.startTime,
          endDate: a.endTime,
        }
        const timezoneDiff = new Date().getTimezoneOffset()
        const localEndDateTime = moment(a.endTime).add(timezoneDiff, 'minutes')
        const localStartDateTime = moment(a.startTime).add(timezoneDiff, 'minutes')
        const appDay = moment(localStartDateTime).format('YYYY-MM-DD')
        const appStartTime = moment(localStartDateTime).format('HH:mm A')
        const appEndTime = moment(localEndDateTime).format('HH:mm A')
        console.log('booked >> times', a.startTime, appDay, appStartTime, appEndTime) //times.format('HH:mm a'))

        const appBookedTimings = {
          startTime: appStartTime,
          endTime: appEndTime,
          isSelected: false,
          isEnabled: false,
        }
        const appDetail = {
          dayDesc: moment(localStartDateTime).format('dddd, DD'),
          availableTimeSlots: appBookedTimings,
          day: moment(localStartDateTime).format('YYYY-MM-DD'),
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
    setNewBookedSlots(doctorAvailability.bookedSlots)
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

      const actualTimeSlots = disabledPassedTime(currentDate, newTimeSlots)

      console.log('Actual TimeSlots', actualTimeSlots)

      console.log('newTimeSlots', currentDate.format('YYYY-MM-DD'), newTimeSlots)
      availabilityDayDetail.availableTimeSlots = actualTimeSlots
      console.log('new >> doctorBookedSlots >> Updated', availabilityDayDetail)
      weekDaysAvailablities.push(availabilityDayDetail)
    })

    console.log('newAvailabilities 123', newAvailabilities)

    setAvaliableAppointmentDays(weekDaysAvailablities)
    console.log('newAvailabilities', weekDaysAvailablities)
    console.log('buinding >> weekDaysAvailablities ', weekDaysAvailablities)
    dispatch(appointmentAvailableTimeSlots(weekDaysAvailablities))
  }

  const disabledPassedTime = (date, timeSlots) => {
    const dDate = date.format('YYYY-MM-DD')
    const today = moment(new Date()).format('YYYY-MM-DD')
    const todayWithTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const time = moment(new Date()).format('HH:mm')
    console.log('Current Day >> dDate, today', dDate, today)
    const timezoneDiff = new Date().getTimezoneOffset()
    console.log('Current Day >> timezoneDiff', timezoneDiff)

    timeSlots.map(ts => {
      const startTime = ts.startTime.split(' ')
      const endTime = ts.endTime.split(' ')
      ts.isSelected = false
      ts.isPrimary = false
      ts.isSecondary = false
      if (today === dDate) {
        var aDateTime = moment(dDate + ' ' + startTime).format('YYYY-MM-DD HH:mm:ss') //.add(-timezoneDiff, 'minutes').format('YYYY-MM-DD HH:mm:ss')
        console.log('Current Day >> before', ts)
        console.log('Current Day >> before >> date ', todayWithTime, aDateTime)
        const a = moment(todayWithTime).isBefore(aDateTime)
        console.log('Current Day >> before >> a', a)
        const subDate = moment(todayWithTime).subtract(moment(aDateTime)).add(timezoneDiff, 'minutes')
        console.log('Current Day >> before >> subDate', subDate.format('HH:mm'))

        if (primaryDate.Day != null || secondaryDate.Day != null) {
          console.log(
            'Check >> WeekDaysView >> primaryDate or secondaryDate',
            dDate,
            primaryDate.Day,
            secondaryDate.Day
          )
          if (primaryDate.Day == dDate) {
            console.log('Check >> WeekDaysView >> startTime', ts.startTime)
            console.log('Check >> WeekDaysView >> Primary', primaryDate.timings.startTime)
            if (ts.startTime == primaryDate.timings.startTime) {
              console.log('Check >> WeekDaysView >> Primary >> Found')
              ts.isSelected = true
              ts.isPrimary = true
              ts.isSecondary = false
              return ts
            }
          }
          if (secondaryDate.Day == dDate) {
            console.log('Check >> WeekDaysView >> startTime', ts.startTime)
            console.log('Check >> WeekDaysView >> Primary', secondaryDate.timings.startTime)
            if (ts.startTime == secondaryDate.timings.startTime) {
              console.log('Check >> WeekDaysView >> Primary >> Found')
              ts.isSelected = true
              ts.isPrimary = false
              ts.isSecondary = true
              return ts
            }
          }
        } else if (todayWithTime > aDateTime) {
          console.log('Current Day >> Passed')
          ts.isEnabled = false
          ts.isPrimary = false
          ts.isSecondary = false
          return ts
        } else {
          console.log('Current Day >> Not Passed', ts)
          ts.isPrimary = false
          ts.isSecondary = false
          return ts
        }
        // if (startTime.length > 0) {
        //   const sTime = startTime[0]
        //   console.log('Current Day >> cond', time, sTime)
        //   if (time > sTime) {
        //     console.log('Current Day >> update >> AM')
        //     ts.isEnabled = false
        //     return ts
        //   }
        // }
        // if (endTime.length > 0) {
        //   const eTime = startTime[0]
        //   console.log('Current Day >> cond', time, eTime)
        //   if (time > eTime) {
        //     console.log('Current Day >> update >> PM')
        //     ts.isEnabled = false
        //     return ts
        //   }
        // }
      } else if (primaryDate.Day != null || secondaryDate.Day != null) {
        console.log('Check >> WeekDaysView >> primaryDate or secondaryDate', dDate, primaryDate.Day, secondaryDate.Day)
        if (primaryDate.Day == dDate) {
          console.log('Check >> WeekDaysView >> startTime', ts.startTime)
          console.log('Check >> WeekDaysView >> Primary', primaryDate.timings.startTime)
          if (ts.startTime == primaryDate.timings.startTime) {
            console.log('Check >> WeekDaysView >> Primary >> Found')
            ts.isSelected = true
            ts.isPrimary = true
            ts.isSecondary = false
            return ts
          }
        }

        if (secondaryDate.Day == dDate) {
          console.log('Check >> WeekDaysView >> startTime', ts.startTime)
          console.log('Check >> WeekDaysView >> secondaryDate', secondaryDate.timings.startTime)
          if (ts.startTime == secondaryDate.timings.startTime) {
            console.log('Check >> WeekDaysView >> secondaryDate >> Found')
            ts.isSelected = true
            ts.isPrimary = false
            ts.isSecondary = true
            return ts
          }
        }
      } else {
        console.log('Current Day >> Not today')
        ts.isPrimary = false
        ts.isSecondary = false
        return ts
      }
    })

    return timeSlots
  }
  const getUnBookedSlots = (date, availableTimeSlots, bookedSlots) => {
    const dDate = date.format('YYYY-MM-DD')
    const dDateTime = date.format('HH:mm')
    console.log('doctorBookedSlots >> before', date, bookedSlots)
    var newAvailableTimeSlots = availableTimeSlots
    const today = moment(new Date()).format('YYYY-MM-DD')
    const time = moment(new Date()).format('HH:mm')
    console.log('today >> getUnBookedSlots', today, time, dDate)
    console.log('availableTimeSlots >> getUnBookedSlots', availableTimeSlots)
    bookedSlots.forEach(b => {
      console.log('b.day == dDate', b.day, dDate)
      if (today === dDate) {
        // const startTime = b.availableTimeSlots.startTime.split(' ')
        // const endTime = b.availableTimeSlots.endTime.split(' ')
        // console.log('Current Date', b.availableTimeSlots.startTime, startTime[0])
        // if (startTime.length > 0) {
        //   const sTime = startTime[0]
        //   console.log('Current Date >> sTime', time, sTime)
        //   newAvailableTimeSlots.map(a => {
        //     if (time > sTime) {
        //       console.log('Current Date >> Befor', time, sTime)
        //       a.isEnabled = false
        //       console.log('Current Date >> Updated 123', dDate, a)
        //       return a
        //     } else return a
        //   })
        // }
      }
      if (b.day == dDate) {
        const startTime = b.availableTimeSlots.startTime.split(' ')
        const endTime = b.availableTimeSlots.endTime.split(' ')
        console.log('doctorBookedSlots', 'Present', b.availableTimeSlots.startTime, startTime[0])
        if (startTime.length > 0) {
          const sTime = startTime[0]
          console.log('doctorBookedSlots >> sTime', sTime)
          newAvailableTimeSlots.map(a => {
            if (a.startTime == sTime) {
              a.isEnabled = false
              console.log('doctorBookedSlots >> sTime >> Updated', dDate, a)
              return a
            } else return a
          })
        }

        if (endTime.length > 0) {
          const eTime = endTime[0]
          console.log('doctorBookedSlots >> eTime', eTime)
          newAvailableTimeSlots.map(a => {
            if (a.endTime == eTime) {
              a.isEnabled = false
              console.log('doctorBookedSlots >> eTime >> Updated', dDate, a)
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
    console.log('moveBack >> selectedDate', newSelectedDate.format('YYYY-MM-DD'))
    await getWeekDays(newSelectedDate.format('YYYY-MM-DD'), newAvailabilities, newBookedSlots)
  }

  const moveNext = async () => {
    console.log('useEffect Week Days', selectedCalender)
    const selectedYear = selectedCalender.calenderDate.Year
    const selectedMonth = selectedCalender.calenderDate.Month
    const selectedDay = selectedCalender.calenderDate.Day
    const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    const newSelectedDate = moment(selectedDate).add(5, 'd')
    const newDay = newSelectedDate.format('MMMM, YYYY')
    console.log('newSelectedDate', newSelectedDate.format('dddd, DD'))
    setCurrentDate(newDay)
    setCurrentDay(newSelectedDate)
    const calenderDay = {
      Year: newSelectedDate.format('YYYY'),
      Month: newSelectedDate.format('MM'),
      Day: newSelectedDate.format('DD'),
    }
    dispatch(calendarAppointmentDate(calenderDay))
    console.log('moveNext >> selectedDate', newSelectedDate.format('YYYY-MM-DD'))
    console.log('moveNext >> selectedDate >> newAvailabilities', newAvailabilities)
    console.log('moveNext >> selectedDate >> newBookedSlots', newBookedSlots)
    await getWeekDays(newSelectedDate.format('YYYY-MM-DD'), newAvailabilities, newBookedSlots)
  }

  const clickCloseButton = () => {
    setClickedAppointment(false)
  }

  const clickConfirmButton = async () => {
    // setClickedAppointment(false)
    // setClickedConfirm(true)
    if (role === 'patient' && type !== 'rescheduleByPatient' && !appointmentDetails.from) {
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

    console.log('reqData.primaryStartTime', primaryDate.Day, reqData.primaryStartTime)
    console.log('reqData.secondaryStartTime', secondaryDate.Day, reqData.secondaryStartTime)
    reqData.appointmentReason = appointmentReason
    reqData.email = invitedMembers.map(x => x.email)
    reqData.documents = selectedFiles.map(x => x.path)

    if (role === 'doctor') {
      reqData.patientId =   appointmentDetails.to ? appointmentDetails.to : appointmentDetails._id
      reqData.doctorId = userId
    } else if (role === 'patient') {
      reqData.doctorId =  appointmentDetails?.from ? appointmentDetails.from._id :  appointmentDetails._id
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

    console.log('reqData.primaryStartTime', primaryDate.Day, reqData.primaryStartTime)
    console.log('reqData.secondaryStartTime', secondaryDate.Day, reqData.secondaryStartTime)

    reqData.appointmentReason = appointmentReason
    reqData.email = invitedMembers.map(x => x.email)
    reqData.documents = selectedFiles.map(x => x)

    if (role === 'doctor') {
      reqData.patientId =   appointmentDetails.to ? appointmentDetails.to : appointmentDetails._id
    } else if (role === 'patient') {
      reqData.doctorId =  appointmentDetails?.from ? appointmentDetails.from._id :  appointmentDetails._id
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
          {!isEligibleForBook ? (
            <Button className="wdv__next__btn">Next</Button>
          ) : (
            <Button className="wdv__request__appointment" onClick={() => setClickedAppointment(true)}>
              Request Appointment
            </Button>
          )}
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
