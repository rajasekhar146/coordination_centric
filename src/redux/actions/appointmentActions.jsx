import { ActionTypes } from '../constants/action-types'

export const setAppointmentDetails = data => {
  return {
    type: ActionTypes.SET_APPOINTMENT_DETAILS,
    payload: data,
  }
}

export const setDoctorDetials = data => {
  return {
    type: ActionTypes.SET_DOCTOR_DETAILS,
    payload: data,
  }
}
