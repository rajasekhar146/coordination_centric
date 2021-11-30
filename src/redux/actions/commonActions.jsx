import { ActionTypes } from '../constants/action-types'

export const setCountries = countries => {
  return {
    type: ActionTypes.SET_COUNTRIES,
    payload: countries,
  }
}

export const setAllHealthProblems = issues => {
  return {
    type: ActionTypes.SET_HEALTH_PROBLEMS,
    payload: issues,
  }
}

export const setSpecialties = specialties => {
  return {
    type: ActionTypes.FETCH_SPECIALTIES,
    payload: specialties,
  }
}

export const setCopmletPropfilePopup = val => {
  return {
    type: ActionTypes.COMPLETE_PROFILE_POPUP,
    payload: val,
  }
}

export const setQuickProfileSetup = val => {
  return {
    type: ActionTypes.QUICK_PROFILE_SETUP_STEP,
    payload: val,
  }
}

export const calendarAppointmentDate = appointmentDay => {
  return {
    type: ActionTypes.CALENDAR_APPOINTMENT_DATE,
    payload: appointmentDay,
  }
}

export const appointmentAvailableTimeSlots = availableTimeSlots => {
  return {
    type: ActionTypes.APPOINTMENT_AVAILABLE_TIME_SLOTS,
    payload: availableTimeSlots,
  }
}
