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
    getAppointmentsForAwailability,
    getAllSpecializations,
    getHighlightedDoctorsList,
    makeAppointment,
    rescheduleAppointment,
    getSecondaryAppointment,
    cancelAppointment,
    getAppointmentById,
    getAppointmentChat
}



function getAppointments(userId, date, type, skip, limit, role) {
    let axiosConfig = {
        headers: authHeader(),
    }
    const getUrl = () => {
        switch(role) {
            case 'doctor':
            case 'patient':
                return `${apiURL}/appointment/getAppointment/${userId}?date=${date}&type=${type}&skip=${skip}&limit=${limit}`
            break
            default:
                return `${apiURL}/appointment/ListAllAppointments/${type}?skip=0&limit=10`
        }
    }
    return (
        axios
            .get(getUrl(), axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function confirmAppointment(appointmentId) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .put(`${apiURL}/appointment/confirmAppointment/${appointmentId}`, null, axiosConfig)
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


function cancelAppointment(appointmentId , reason) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .put(`${apiURL}/appointment/cancelAppointment/${appointmentId}/${reason}`, null, axiosConfig)
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
            .put(`${apiURL}/appointment/rescheduleAppointment/${id}/patient`, null, axiosConfig)
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
            .get(
                `${apiURL}/users/getDoctorlist?limit=${searchParam.pageLimit}&page=${searchParam.pageNo}&sort_field=${searchParam.sortByColoumn}&sort=${searchParam.sortOrder}&search_key=${searchParam.searchKey}&search_value=${searchParam.searchValue}&speciality=${searchParam.speciality}&country=${searchParam.country}&state=${searchParam.state}&city=${searchParam.city}&zipcode=${searchParam.zipcode}`,
                axiosConfig
            )
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function getHighlightedDoctorsList() {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(
                `${apiURL}/users/getHighlightedDoctors`,
                axiosConfig
            )
            //.then(handleResponse)
            .then(data => {
                console.log('getHighlightedDoctorsList >>', data)
                return data
            })
            .catch(err => {
                return err
            })
    )
}

function getAllSpecializations() {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(
                `${apiURL}/specialization/getAllSpecializationsBySearch`,
                axiosConfig
            )
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function makeAppointment(appointmentRequest) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (axios
        .post(`${apiURL}/appointment/makeAppointment`, appointmentRequest, axiosConfig)

        .then(response => {
            return response
        })
    )
}



function getAppointmentsForAwailability(userId, startDate, endDate) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/getAppointmentHistory/${userId}?startDate=${startDate}&endDate=${endDate}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}



function rescheduleAppointment(appointmentRequest, id, type) {

    let axiosConfig = {
        headers: authHeader(),
    }
    let url = `${apiURL}`
    if (type !== 'rescheduleByPatient') {
        url += `/appointment/rescheduleAppointment/${id}/doctor`
    } else {
        url += `/appointment/rescheduleAppointment/${id}/patient`
    }
    return (
        axios
            .put(url, appointmentRequest, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}



function getSecondaryAppointment(id) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/getSecondaryAppointment/${id}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function getAppointmentById(id) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointment/viewAppointmentByAppointmentId/${id}`, axiosConfig)
            .then(data => {
                return data
            })
    ) 
}

function getAppointmentChat(id){
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .get(`${apiURL}/appointmentChat/getChatList?appointment_id=${id}`, axiosConfig)
            .then(data => {
                return data
            })
    ) 
}