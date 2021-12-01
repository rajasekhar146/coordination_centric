import { ActionTypes } from '../constants/action-types'
import moment from 'moment'

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
  Time: null,
}

const secondaryAppointment = {
  Day: null,
  Time: null,
}

const flagMsg = {
  openFlash: true,
  alertMsg: 'Re-scheduled',
  subLabel: 'Your appointment was re-scheduled to Thu, 7th Oct 2021 at 9 am.'
}

const weekDays = [0, 1, 2, 3, 4, 5]

const getWeekDays = () => {
  var weekDaysAvailablities = []
  weekDays.forEach(d => {
    const currentDate = moment().add(d, 'd')
    console.log('day', currentDate.format('dddd, DD'), d)
    const availabilityDayDetail = {
      dayDesc: currentDate.format('dddd, DD'),
      availableTimeSlots: availablities,
      day: currentDate.format('YYYY-MM-DD'),
    }
    weekDaysAvailablities.push(availabilityDayDetail)
  })
  return weekDaysAvailablities
}

const availablities = [
  { availabilityId: 1, availableTimeSlot: '08:00am - 09:00am', isSelected: false },
  { availabilityId: 2, availableTimeSlot: '09:00am - 10:00am', isSelected: false },
  { availabilityId: 3, availableTimeSlot: '10:00am - 11:00am', isSelected: false },
  { availabilityId: 4, availableTimeSlot: '11:00am - 12:00pm', isSelected: false },
  { availabilityId: 5, availableTimeSlot: '12:00pm - 01:00pm', isSelected: false },
  { availabilityId: 6, availableTimeSlot: '01:00pm - 02:00pm', isSelected: false },
  { availabilityId: 7, availableTimeSlot: '02:00pm - 03:00pm', isSelected: false },
  { availabilityId: 8, availableTimeSlot: '03:00pm - 04:00pm', isSelected: false },
  { availabilityId: 9, availableTimeSlot: '04:00pm - 05:00pm', isSelected: false },
  { availabilityId: 11, availableTimeSlot: '05:00pm - 06:00pm', isSelected: false },
  { availabilityId: 12, availableTimeSlot: '06:00pm - 07:00pm', isSelected: false },
  { availabilityId: 13, availableTimeSlot: '07:00pm - 08:00pm', isSelected: false },
  { availabilityId: 14, availableTimeSlot: '08:00pm - 09:00pm', isSelected: false },
  { availabilityId: 15, availableTimeSlot: '09:00pm - 10:00pm', isSelected: false },
]

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
