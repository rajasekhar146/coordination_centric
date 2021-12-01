import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import get from 'lodash.get'
import * as env from '../environments/environment'
// import config from 'config';
import { authHeader } from '../helpers'
const apiURL = env.environment.apiBaseUrl


export const appointmentService = {
    confirmAppointment,
    rejectAppointment,
    askPatientReschedule,
    getDoctorsList,
    getAppointments,
    rescheduleAppointmentbyDoctor
}



function getAppointments(userId, date, type, skip, limit) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/getAppointment/${userId}?date=${date}&type=${type}&skip=${skip}&limit=${limit}
            `, axiosConfig)
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


function rejectAppointment(appointmentId) {
    let axiosConfig = {
        headers: authHeader(),
    }
    const reqBody = {
       id: appointmentId
    }
    return (
        axios
            .put(`${apiURL}/appointment/declineAppointment`, reqBody, axiosConfig)
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
            .put(`${apiURL}/appointment/rescheduleAppointment/${id}/patient`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}



function rescheduleAppointmentbyDoctor(data) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .post(`${apiURL}/appointment/makeAppointment`, data, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function getDoctorsList(searchParam) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/users/getDoctorlist?limit=${searchParam.pageLimit}&page=${searchParam.pageNo}&sort_field=${searchParam.sortByColoumn}&sort=${searchParam.sortOrder}&search_key=${searchParam.searchKey}&search_value=${searchParam.searchValue}&speciality=${searchParam.speciality}&country=${searchParam.country}&state=${searchParam.state}&city=${searchParam.city}&zipcode=${searchParam.zipcode}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
               return data
            })
    )
}
