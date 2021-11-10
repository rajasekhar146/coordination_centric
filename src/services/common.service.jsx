import React from 'react'
import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const commonService = {
  getCountries,
  getStates,
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
