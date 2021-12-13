import React from 'react'
import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import * as env from '../environments/environment'
const apiURL = env.environment.apiBaseUrl

const axiosConfig = {
  headers: authHeader(),
}

export const accountService = {
  getAll,
  sendEmailWithVerificationCode,
  // sendEmailVerificationCode,
}

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() }
  return fetch(`${apiURL}/users`, requestOptions).then(handleResponse)
}

function sendEmailWithVerificationCode(email) {
  console.log('axiosConfig', axiosConfig)

  return (
    axios
      .post(`${apiURL}/users/emailVerification/${email}`, null, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        console.log('sendEmailWithVerificationCode', data)
        return data
      })
      .catch(err => {
        // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
        return { errorCode: err.status, errorMessage: err.message }
      })
  )
}
