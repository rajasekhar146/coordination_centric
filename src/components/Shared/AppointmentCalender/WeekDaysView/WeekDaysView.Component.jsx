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

const availablities = [
  { availabilityId: 1, availableTimeSlot: '08:00am - 09:00am', isSelected: false, isEnabled: true },
  { availabilityId: 2, availableTimeSlot: '09:00am - 10:00am', isSelected: false, isEnabled: true },
  { availabilityId: 3, availableTimeSlot: '10:00am - 11:00am', isSelected: false, isEnabled: false },
  { availabilityId: 4, availableTimeSlot: '11:00am - 12:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 5, availableTimeSlot: '12:00pm - 01:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 6, availableTimeSlot: '01:00pm - 02:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 7, availableTimeSlot: '02:00pm - 03:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 8, availableTimeSlot: '03:00pm - 04:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 9, availableTimeSlot: '04:00pm - 05:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 11, availableTimeSlot: '05:00pm - 06:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 12, availableTimeSlot: '06:00pm - 07:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 13, availableTimeSlot: '07:00pm - 08:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 14, availableTimeSlot: '08:00pm - 09:00pm', isSelected: false, isEnabled: true },
  { availabilityId: 15, availableTimeSlot: '09:00pm - 10:00pm', isSelected: false, isEnabled: true },
]

const weekDays = [0, 1, 2, 3, 4, 5]

const WeekDaysViewComponent = () => {
  const [days, setDays] = useState([])
  const selectedCalender = useSelector(state => state.calendarAppointmentDate)
  const rweekDaysAvailablities = useSelector(state => state.appointmentAvailableTimeSlots)
  const [avaliableAppointmentDays, setAvaliableAppointmentDays] = useState([])
  const [currentDay, setCurrentDay] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [IsClickedAppointment, setClickedAppointment] = useState(false)
  const dispatch = useDispatch()
  console.log('rweekDaysAvailablities', rweekDaysAvailablities)
  const primaryDate = useSelector(state => state.primaryAppointmentDate)
  const secondaryDate = useSelector(state => state.secondaryAppointmentDate)
  const [IsClickedConfirm, setClickedConfirm] = useState(false)
  const [IsClickedSubmit, setClickedSubmit] = useState(false)

  useEffect(async () => {
    const selectedYear = selectedCalender.calenderDate.Year
    const selectedMonth = selectedCalender.calenderDate.Month
    const selectedDay = selectedCalender.calenderDate.Day
    //const day = selectedYear + '-' + selectedMonth + '-' + selectedDay
    const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)
    await getWeekDays(selectedDate)
    console.log('selectedYear', selectedYear, 'selectedMonth', selectedMonth, 'selectedDay', selectedDay)
    console.log('useEffect Week Days >> selectedDate ', selectedDate.format('dddd, DD'))
  }, [selectedCalender])

  const getSelectedDate = (year, month, day) => {
    const selectedDay = year + '-' + month + '-' + day
    return moment(selectedDay)
  }
  const getWeekDays = async selectedDay => {
    var weekDaysAvailablities = []
    weekDays.forEach(d => {
      const currentDate = moment(selectedDay).add(d, 'd')
      console.log('day', currentDate.format('dddd, DD'), d)
      const availabilityDayDetail = {
        dayDesc: currentDate.format('dddd, DD'),
        availableTimeSlots: availablities,
        day: currentDate.format('YYYY-MM-DD'),
      }
      weekDaysAvailablities.push(availabilityDayDetail)
    })
    setAvaliableAppointmentDays(weekDaysAvailablities)
    console.log('weekDaysAvailablities', weekDaysAvailablities)
    dispatch(appointmentAvailableTimeSlots(weekDaysAvailablities))
  }

  const moveBack = async () => {
    console.log('useEffect Week Days', selectedCalender)
    const selectedYear = selectedCalender.calenderDate.Year
    const selectedMonth = selectedCalender.calenderDate.Month
    const selectedDay = selectedCalender.calenderDate.Day
    const selectedDate = await getSelectedDate(selectedYear, selectedMonth, selectedDay)

    const newSelectedDate = moment(selectedDate).add(-5, 'd')
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

  const clickConfirmButton = () => {
    setClickedAppointment(false)
    setClickedConfirm(true)
  }

  const clickBackButton = () => {
    setClickedAppointment(true)
    setClickedConfirm(false)
  }

  const clickSubmitButton = () => {
    setClickedConfirm(false)
    setClickedSubmit(true)
  }

  const clickRequestClose = () => {
    setClickedSubmit(false)
  }

  return (
    <div className="wdv__main__div">
      <div className="wdv__row">
        {' '}
        <img src={RoundedBackArrow} alt="back" style={{ cursor: 'pointer' }} onClick={() => moveBack()} />
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
          {primaryDate.Day === null ? (
            <Button className="wdv__next__btn">Next</Button>
          ) : (
            <Button className="wdv__request__appointment" onClick={() => setClickedAppointment(true)}>
              Request Appointment
            </Button>
          )}
        </div>
      </div>

      <Modal open={IsClickedAppointment} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={confirmAppointment}>
          <PatientConfimationAppointmentComponent
            clickCloseButton={clickCloseButton}
            clickConfirmButton={clickConfirmButton}
          />
        </Box>
      </Modal>
      <Modal open={IsClickedConfirm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={problemAndSymptoms}>
          <ProblemAndSymptomsComponent clickBackButton={clickBackButton} clickSubmitButton={clickSubmitButton} />
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
