import { ActionTypes } from '../constants/action-types'
import moment from 'moment'
import get from 'lodash.get'

const initialState = {
  countries: [],
}

const specialtiesInitialState = {
  specialties: [],
}

const quickProfileSetupInitialState = {
  activeStep: 0,
}

const appointmentDateInitialState = {
  calenderDate: {
    Year: moment().format('YYYY'),
    Month: moment().format('MM'),
    Day: moment().format('DD'),
  },
}

const primaryppointments = {
  Day: null,
  timings: {
    startTime: null,
    endTime: null,
    timeSlotId: null,
  },
}

const secondaryAppointment = {
  Day: null,
  timings: {
    startTime: null,
    endTime: null,
    timeSlotId: null,
  },
}

const flagMsg = {
  openFlash: false,
  alertMsg: '',
  subLabel: '',
  color: ''
}

const buildTimeSlots = () => {
  var startTime = moment().set({ hour: 6, minute: 0 })
  const endTime = moment().set({ hour: 23, minute: 0 })
  const interval = 30
  var timeSlots = []
  do {
    // console.log('startTime', startTime)
    const sTime = startTime.format('HH:mm')
    const eTime = startTime.add(interval, 'minutes').format('HH:mm')
    const timeSlot = {
      startTime: sTime,
      endTime: eTime,
      isSelected: false,
      isEnabled: true,
      isPrimary: false,
      isSecondary: false,
    }
    timeSlots.push(timeSlot)
    // console.log('startTime', timeSlot)
  } while (startTime < endTime)
  return timeSlots
  // console.log('buildAvailabilities > startTime', timeSlots)
}

const weekDays = [0, 1, 2, 3, 4, 5]

const getWeekDays = () => {
  var weekDaysAvailablities = []
  const timeSlots = buildTimeSlots()
  weekDays.forEach(d => {
    const currentDate = moment().add(d, 'd')
    console.log('day', currentDate.format('dddd, DD'), d)
    const availabilityDayDetail = {
      dayDesc: currentDate.format('dddd, DD'),
      availableTimeSlots: timeSlots,
      day: currentDate.format('YYYY-MM-DD'),
    }
    weekDaysAvailablities.push(availabilityDayDetail)
  })
  return weekDaysAvailablities
}

const availableTimeSlotsInitialState = {
  calenderDate: {
    Year: moment().format('YYYY'),
    Month: moment().format('MM'),
    Day: moment().format('DD'),
  },
}

export const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COUNTRIES:
      return { ...state, countries: payload }
    case ActionTypes.SET_HEALTH_PROBLEMS:
      return { ...state, healthProblems: payload }
    default:
      return state
  }
}

export const specialtiesReducer = (state = specialtiesInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_SPECIALTIES:
      return { ...state, specialties: payload }
    default:
      return state
  }
}

export const setCompleteProfileReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionTypes.COMPLETE_PROFILE_POPUP:
      return payload
    default:
      return state
  }
}

export const setQuickProfileSetupReducer = (state = quickProfileSetupInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.QUICK_PROFILE_SETUP_STEP:
      return payload
    default:
      return state
  }
}

export const setCalendarAppointmentDateReducer = (state = appointmentDateInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CALENDAR_APPOINTMENT_DATE:
      return { ...state, calenderDate: payload }
    default:
      return state
  }
}

export const setAppointmentAvailableTimeSlotsReducer = (state = getWeekDays(), { type, payload }) => {
  switch (type) {
    case ActionTypes.APPOINTMENT_AVAILABLE_TIME_SLOTS:
      return payload
    default:
      return state
  }
}

export const setPrimaryAppointmentDateReducer = (state = primaryppointments, { type, payload }) => {
  switch (type) {
    case ActionTypes.APPOINTMENT_PRIMARY_DATE:
      return payload
    default:
      return state
  }
}

export const setSecondaryAppointmentDateReducer = (state = secondaryAppointment, { type, payload }) => {
  switch (type) {
    case ActionTypes.APPOINTMENT_SECONDARY_DATE:
      return payload
    default:
      return state
  }
}

export const setFlashMsgReducer = (state = flagMsg, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FLAG_MESSAGE:
      return payload
    default:
      return state
  }
}

export const skipTwoFaReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SKIP_TWOFA:
      return payload
    default:
      return state
  }
}

export const completeProfileReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COMPLETE_PROFILE:
      return payload
    default:
      return state
  }
}

