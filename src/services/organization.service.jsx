import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import { authenticationService } from '../services'
import history from '../history'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const organizationService = {
  allOrganization,
  addOrganization,
  updateOrganization,
  signupOrganization,
  uploadCertificate,
  resendInvite,
  cancelIvitation
}

function allOrganization(skip, limit, searchText) {
  console.log('axiosConfig', axiosConfig)
  console.log('searchText', searchText)
  var url = `${apiURL}/facilityList/getAllFacilitiesForSuperAdmin?skip=${skip}&limit=${limit}`
  if (searchText != null) {
    url = `${apiURL}/facilityList/getAllFacilitiesForSuperAdmin?skip=${skip}&limit=${limit}&search_text=${searchText}`
  }
  return (
    axios
      .get(url, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        if (data?.data?.data) {
          const res = data.data.data[0]
          console.log('Result >> ', res)
          return { totalCount: res.totalCount[0], totalData: res.totalData }
        } else {
          return { totalCount: 0, totalData: null }
        }
      })
  )
}

function addOrganization(bodyMsg) {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .post(`${apiURL}/facilityList/addFacility`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function updateOrganization(id, status) {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .put(`${apiURL}/facilityList/updateFacilityStatus/${id}/${status}`, null, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function signupOrganization(bodyMsg) {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .post(`${apiURL}/facilityList/Signup`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

async function uploadCertificate(bodyMsg, certificateType) {
  console.log('axiosConfig', axiosConfig)
  const currentUser = authenticationService?.currentUserValue

  var myHeaders = new Headers()
  myHeaders.append('x-access-token', `${currentUser.data.token}`)
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  var urlencoded = new URLSearchParams()
  urlencoded.append('name', bodyMsg.name)
  urlencoded.append('type', bodyMsg.type)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  fetch(`${apiURL}/files/upload`, requestOptions)
    .then(response => response.text())
    .then(result => {
      var response = JSON.parse(result)
      var facility = JSON.parse(localStorage.getItem('facility'))

      if (certificateType == 'ServiceLevelAgreement') {
        var updatedFacility = {
          ...facility,
          business_certificate: response.data,
        }
      } else if (certificateType == 'SAASAgreement') {
        var updatedFacility = {
          ...facility,
          saas_certificate: response.data,
        }
      } else {
        var updatedFacility = {
          ...facility,
          eula_certificate: response.data,
        }
      }
      localStorage.setItem('facility', JSON.stringify(updatedFacility))
      if (certificateType == 'ServiceLevelAgreement') history.push('/saas-agreement')
      else if (certificateType == 'SAASAgreement') history.push('/eula-agreement')
      else history.push('/bank-info')
    })
    .catch(error => {
      console.log('error', error)
      return error
    })
  }

  // console.log(updatedFacility)
  // await axios
  //     .post(`${apiURL}/files/upload`, null, updatedFacility)
  //     //.then(handleResponse)
  //     .then(data => {
  //       console.log(data)
  //       return data
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       return null
  //     })

  
function resendInvite(id) {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .get(`${apiURL}/facilityList/resendInvite/${id}`, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function cancelIvitation(id) {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .put(`${apiURL}/facilityList/cancelInvite/${id}`, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}
