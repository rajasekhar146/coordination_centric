import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const organizationService = {
  allOrganization,
  addOrganization,
  updateOrganization,
  signupOrganization,
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
