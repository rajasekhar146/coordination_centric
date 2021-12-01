import { ActionTypes } from '../constants/action-types'


export const setAppointmentDetails = data => {
    return {
        type: ActionTypes.SET_APPOINTMENT_DETAILS,
        payload: data,
    }
}
