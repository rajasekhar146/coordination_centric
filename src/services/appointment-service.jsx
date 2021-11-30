import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import get from 'lodash.get'
import * as env from '../environments/environment'
// import config from 'config';
import { authHeader } from '../helpers'
const apiURL = env.environment.apiBaseUrl


export const appointmentService = {
    getAppointmentHistory,
    confirmAppointment,
    cancelAppointment,
    askPatientReschedule
}



function getAppointmentHistory(userId, endDate, limit) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/getAppointmentHistory/${userId}?endDate=${endDate}}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
               return data
            })
    )
}

function confirmAppointment() {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .put(`${apiURL}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
               return data
            })
    )
}


function cancelAppointment() {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .put(`${apiURL}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
               return data
            })
    )
}



function askPatientReschedule(id) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .put(`${apiURL}/appointment/rescheduleAppointment/${id}/by_patient`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
               return data
            })
    )
}
