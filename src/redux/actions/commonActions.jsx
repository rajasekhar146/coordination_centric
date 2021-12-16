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

export const primaryAppointmentDate = primaryAppointment => {
  return {
    type: ActionTypes.APPOINTMENT_PRIMARY_DATE,
    payload: primaryAppointment,
  }
}

export const secondaryAppointmentDate = secondaryAppointment => {
  return {
    type: ActionTypes.APPOINTMENT_SECONDARY_DATE,
    payload: secondaryAppointment,
  }
}

export const setFlashMsg = data => {
  return {
    type: ActionTypes.SET_FLAG_MESSAGE,
    payload: data,
  }
}


export const setSkip2fa = data => {
  return {
    type: ActionTypes.SET_SKIP_TWOFA,
    payload: data,
  }
}

export const setCompleteProfile = data => {
  return {
    type: ActionTypes.SET_COMPLETE_PROFILE,
    payload: data,
  }
}

export const enableTwofa = val => {
  return {
    type: ActionTypes.ENABLE_TWO_FA,
    payload: val,
  }
}
export const reschedulePrimaryAppointmentDate = primaryAppointment => {
  return {
    type: ActionTypes.APPOINTMENT_PRIMARY_DATE,
    payload: primaryAppointment,
  }
}

export const rescheduleSecondaryAppointmentDate = secondaryAppointment => {
  return {
    type: ActionTypes.APPOINTMENT_SECONDARY_DATE,
    payload: secondaryAppointment,
  }
}

export const leftMenus = menus => {
  return {
    type: ActionTypes.LEFT_MENU_ITEMS,
    payload: menus,
  }
}
