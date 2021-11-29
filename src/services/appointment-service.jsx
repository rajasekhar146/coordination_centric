import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import get from 'lodash.get'
import * as env from '../environments/environment'
// import config from 'config';
import { authHeader } from '../helpers'
const apiURL = env.environment.apiBaseUrl


export const appointmentService = {
    getAppointmentList,
    confirmAppointment
}



function getAppointmentList(userId, skip, limit) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/getAppointmentHistory/${userId}?skip=${skip}&limit=${limit}`, axiosConfig)
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


function rejectAppointment() {
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
