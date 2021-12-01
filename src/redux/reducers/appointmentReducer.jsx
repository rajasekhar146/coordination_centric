import { ActionTypes } from '../constants/action-types'


export const appointmentDetailsReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_APPOINTMENT_DETAILS:
            return payload
        default:
            return state
    }
}