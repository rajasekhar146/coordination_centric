import React from 'react'
import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import * as env from '../environments/environment'
const apiURL = env.environment.apiBaseUrl

const axiosConfig = {
  headers: authHeader(),
}

export const settinService = {
    getMemberDetails,
    updateMemberDetails,
    addHealthInfo,
    addInsuranceInfo,
    getHealthInfo,
    getInsuranceInfo
}

function getMemberDetails(id) {
  const axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .get(`${apiURL}/users/getMemberDetailsById?id=${id}`, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        //   console.log('getCountries', data)
        return { data }
      })
      .catch(err => {
        // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
        return null
      })
  )
}

function updateMemberDetails(id, reqdata) {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .put(`${apiURL}/users/updateMember/${id}`, reqdata, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        //   console.log('getCountries', data)
        return { data }
      })
      .catch(err => {
        // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
        return null
      })
  )
}

function addHealthInfo(reqdata) {
  console.log('axiosConfig', axiosConfig)
  return (
    axios
      .patch(`${apiURL}/users/updateHealthInfo`, reqdata, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        //   console.log('getCountries', data)
        return { data }
      })
      .catch(err => {
        // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
        return null
      })
  )
}

function addInsuranceInfo(info) {
    console.log('axiosConfig', axiosConfig)
    const reData = {
      insurance_info: [
        info
      ]
    }
    return (
        axios
            .put(`${apiURL}/users/insuranceInfo`, reData, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                //   console.log('getCountries', data)
                return { data }
            })
            .catch(err => {
                // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
                return null
            })
    )
}

function getHealthInfo(id) {
    console.log('axiosConfig', axiosConfig)
    return (
        axios
            .get(`${apiURL}/users/getHealthInfo?patient_id=${id}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                //   console.log('getCountries', data)
                return { data }
            })
            .catch(err => {
                // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
                return null
            })
    )
}


function getInsuranceInfo(id) {
    console.log('axiosConfig', axiosConfig)
    return (
        axios
            .get(`${apiURL}/users/getPatientInsuranceDetailsById?id=${id}`, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                //   console.log('getCountries', data)
                return { data }
            })
            .catch(err => {
                // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
                return null
            })
    )
}
