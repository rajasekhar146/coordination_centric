import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import { authenticationService } from '../services'
import history from '../history'
import moment from 'moment'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const memberService = {
  inviteMember,
  uploadCertificate,
  saveMember,
  getMemberProfessionalInfo,
  updatePrefessionalInfo,
}

function inviteMember(data) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/facilityList/inviteMember`, data, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function uploadCertificate(formData, role, onUploadProgress) {
  let axiosConfig = {
    headers: authHeader(),
    onUploadProgress: onUploadProgress,
  }
  return (
    axios
      .post(`${apiURL}/files/uploadCertificate/${role}`, formData, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        console.log('data', data)
        return data
      })
      .catch(err => {
        return err
      })
  )
}

function saveMember(member) {
  return (
    axios
      .post(`${apiURL}/users/registerMember`, member, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        console.log('saveMember', data)
        return data
      })
      .catch(err => {
        // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
        return { errorCode: err.status, errorMessage: err.message }
      })
  )
}

function getMemberProfessionalInfo(memberId) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .get(`${apiURL}/users/getProfessionalInfo/${memberId}`, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        console.log('data', data)
        return data
      })
      .catch(err => {
        return err
      })
  )
}

function updatePrefessionalInfo(bodyMsg) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .patch(`${apiURL}/users/UpdateProfessionalInfo`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        console.log('data', data)
        return data
      })
      .catch(err => {
        return err
      })
  )
}
