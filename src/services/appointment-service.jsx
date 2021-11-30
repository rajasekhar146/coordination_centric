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
    askPatientReschedule,
    getUpcomingAppointments
}



function getAppointmentHistory(userId, endDate) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/getAppointmentHistory/${userId}?endDate=${endDate}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function getUpcomingAppointments(userId, startDate) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/getAppointmentHistory/${userId}?startDate=${startDate}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function confirmAppointment(appointmentId, reason = '') {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .put(`${apiURL}/appointment/cancelAppointment/${appointmentId}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}


function cancelAppointment(appointmentId, reason = '') {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .put(`${apiURL}/appointment/cancelAppointment/${appointmentId}`, axiosConfig)
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
