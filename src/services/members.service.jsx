import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import { authenticationService } from '../services'
import history from '../history'
import moment from 'moment'
import * as env from '../environments/environment'

const apiURL = env.environment.apiBaseUrl

const axiosConfig = {
  headers: authHeader(),
}

export const memberService = {
  inviteMember,
  uploadCertificate,
  saveMember,
  getMemberProfessionalInfo,
  updatePrefessionalInfo,
  getStaffList,
  getPatientRecords,
  invitePatient,
  cancelInvite,
  resendInvite,
  updateStatus,
  uploadFile
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

function uploadFile(file) {
  let axiosConfig = {
    headers: authHeader()
  }
  return (
    axios
      .post(`${apiURL}/files/fileUpload/profile` , file , axiosConfig)
      .then(data => {
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

function getStaffList(id, type, limit, skip) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .get(`${apiURL}/users/getDetails?id=${id}&type=${type}&limit=${limit}&skip="${skip}`, axiosConfig)
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

function resendInvite(id, status, type) {
  let axiosConfig = {
    headers: authHeader(),
  }

  return (
    axios
      .get(`${apiURL}/facilityList/resendInvite/${id}/${type}`, axiosConfig)
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

function cancelInvite(id, status, type) {
  let axiosConfig = {
    headers: authHeader(),
  }

  return (
    axios
      .put(`${apiURL}/facilityList/cancelInvite/${id}/${type}`, null, axiosConfig)
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

function updateStatus(id, status) {
  let axiosConfig = {
    headers: authHeader(),
  }
 
  return (
    axios
      .put(`${apiURL}/users/updateMemberStatus/${id}/${status}`, null, axiosConfig)
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





function getPatientRecords(id, limit, skip) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .get(`${apiURL}/users/getAllPatients?id=${id}&limit=${limit}&skip=${skip}`, axiosConfig)
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

function invitePatient(reqData) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/facilityList/invitePatient`, reqData, axiosConfig)
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
