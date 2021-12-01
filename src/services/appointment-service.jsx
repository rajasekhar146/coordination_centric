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
  getDoctorsList,
  getAllSpecializations,
  getHighlightedDoctorsList,
  MakeAppointments
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
        console.log('getHighlightedDoctorsList >>' ,data)
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

function MakeAppointments(appointmentRequest) {
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