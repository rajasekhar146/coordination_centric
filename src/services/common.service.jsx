import React from 'react'
import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import * as env from '../environments/environment'
const apiURL = env.environment.apiBaseUrl

const axiosConfig = {
  headers: authHeader(),
}

export const commonService = {
  getCountries,
  getStates,
  getAllRoles,
  getHealthProblems,
  getProfile,
  getSpecializations,
  getAllOcupations,
  getPolicyList
}

function getCountries() {
  console.log('axiosConfig', axiosConfig)

  return (
    axios
      .get(`${apiURL}/utils/getCountry`, axiosConfig)
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

function getStates(countryCode) {
  console.log('axiosConfig', axiosConfig)

  return (
    axios
      .get(`${apiURL}/utils/getStateByCountryCode?countrycode=${countryCode}`, axiosConfig)
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

function getAllRoles() {
  const axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .get(`${apiURL}/utils/getRoles`, axiosConfig)
      .then(data => {
        return { data }
      })
      .catch(err => {
        // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
        return null
      })
  )
}

function getHealthProblems(countryCode) {
  const axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .get(`${apiURL}/healthCondition/getAll`, axiosConfig)
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

function getProfile(urlData) {
  const axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/files/download`, urlData, axiosConfig)
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

function getSpecializations(searchText) {
  console.log('axiosConfig', axiosConfig)

  return (
    axios
      .get(`${apiURL}/specialization/getAllSpecializations?search=${searchText}&skip=0&limit=10`, axiosConfig)
      //.then(response => console.log(response))
      .then(data => {
        console.log('getAllSpecializations', data.data)
        return { data }
      })
      .catch(err => {
        // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
        return null
      })
  )
}

function getAllOcupations() {
  console.log('axiosConfig', axiosConfig)

  return (
    axios
      .get(`${apiURL}/occupation/getAllOcupationsBySearch`, axiosConfig)
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


function getPolicyList() {
  console.log('axiosConfig', axiosConfig)

  return (
    axios
      .get(`${apiURL}/utils/getAllPolicyBySearch`, axiosConfig)
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

