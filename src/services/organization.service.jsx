import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const organizationService = {
  allOrganization,
  addOrganization,
}

function allOrganization() {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .get(`${apiURL}/facilityList/getAllFacilitiesForSuperAdmin?skip=1&limit=50`, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        if (data?.data?.data) {
          const res = data.data.data[0]
          return { totalCount: res.totalCount, totalData: res.totalData }
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
