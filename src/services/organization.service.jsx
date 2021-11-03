import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import { authenticationService } from '../services'
import history from '../history'
import moment from 'moment'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const organizationService = {
  allOrganization,
  addOrganization,
  updateOrganization,
  getOrganizationDetails,
  signupOrganization,
  uploadCertificate,
  resendInvite,
  cancelIvitation,
  validateToken,
}

function allOrganization(skip, limit, searchText, sdate, edate, status = []) {
  console.log('axiosConfig', axiosConfig)
  console.log('searchText', searchText)

  //var dateUTC = date + 'T00:00:00.000Z'
  //date = 'A'
  const sdateUTC = moment.utc(sdate).local().format('YYYY-MM-DD')
  const edateUTC = moment.utc(edate).local().format('YYYY-MM-DD')
  const statusvalues = status?.join()

  //status = ''
  // console.log(searchText, date, status)
  // var searchCond = ''

  // if (searchText?.length > 0 && date?.length > 0 && status?.length > 0) {
  //   console.log('Cond 1')
  //   searchCond = `search_text=${searchText}&created_date=${dateUTC}&status=${status}`
  // } else if (searchText?.length > 0 && date?.length > 0 && status?.length == 0) {
  //   searchCond = `search_text=${searchText}&created_date=${dateUTC}`
  // } else if (searchText?.length > 0 && date?.length == 0 && status?.length > 0) {
  //   searchCond = `search_text=${searchText}&status=${status}`
  // } else if (searchText?.length == 0 && date?.length > 0 && status?.length > 0) {
  //   searchCond = `created_date=${dateUTC}&status=${status}`
  // } else if (searchText?.length > 0) {
  //   searchCond = `search_text=${searchText}`
  // } else if (date?.length > 0) {
  //   searchCond = `created_date=${dateUTC}`
  // } else if (status?.length > 0) {
  //   searchCond = `status=${status}`
  // }

  // console.log('searchCond', searchCond)
  let url = `${apiURL}/facilityList/getAllFacilitiesForSuperAdmin?skip=${skip}&limit=${limit}`
  // if (searchText != null) {
  //   url = `${apiURL}/facilityList/getAllFacilitiesForSuperAdmin?skip=${skip}&limit=${limit}&search_text=${searchText}`
  // }

  if (searchText) {
    url += `&search_text=${searchText}`
  }
  if (sdate) {
    url += `&start_date=${sdateUTC}`
  }
  if (edate) {
    url += `&end_date=${edateUTC}`
  }
  if (statusvalues && status.indexOf('all') === -1) {
    url += `&status=${statusvalues}`
  }

  console.log(status)

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

function addOrganization(bodyMsg, role) {
  console.log('axiosConfig', axiosConfig)

  var url = `${apiURL}/facilityList/inviteFacility`

  if (role === 'superadmin') {
    url = `${apiURL}/facilityList/addFacility`
  }

  return (
    axios
      .post(url, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function updateOrganization(id, status, reason = null) {
  console.log('axiosConfig', axiosConfig)
  let url = `${apiURL}/facilityList/updateFacilityStatus/${id}/${status}`
  // if (status === 'declined') {
  url += `/${reason}`
  // }
  return (
    axios
      .put(url, null, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function getOrganizationDetails(orgId) {
  return (
    axios
      .get(`${apiURL}/facilityList/getFacilityDetailsById?id=${orgId}`, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        console.log('getOrganizationDetails - ', data)
        if (data?.data?.data) {
          const res = data.data.data
          console.log('Result >> ', res)
          return res
        } else {
          return null
        }
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
      .catch(err => {
        console.log(err.response)
      })
  )
}

async function uploadCertificate(bodyMsg, certificateType) {
  console.log('axiosConfig', axiosConfig)
  const currentUser = authenticationService?.currentUserValue
  console.log('currentUser', currentUser)
  var myHeaders = new Headers()
  myHeaders.append('x-access-token', `${currentUser?.data?.token}`)
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
      else if (certificateType == 'EULAAgreement') {
        const planType = localStorage?.getItem('plan_type')
        console.log('planType', planType)
        if (planType === 'F') history.push('/terms-condition')
        else history.push('/bank-info')
      } else history.push('/terms-condition')
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
      .put(`${apiURL}/facilityList/cancelInvite/${id}`, null, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function validateToken(token) {
  const bobyMsg = {
    inviteToken: token,
  }
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .post(`${apiURL}/facilityList/validateInviteToken`, bobyMsg, axiosConfig)
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
