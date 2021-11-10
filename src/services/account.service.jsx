import React from 'react'
import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const accountService = {
  getAll,
  sendEmailWithVerificationCode,
  sendEmailVerificationCode,
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

async function sendEmailVerificationCode(email, code) {
  console.log('axiosConfig', axiosConfig)
  var bodyMsg = {
    email: email,
    code: code,
  }
  return await axios
    .post(`${apiURL}/users/codeVerification`, bodyMsg, axiosConfig)
    //.then(handleResponse)
    .then(response => {
      console.log('sendEmailVerificationCode', response)
      return response
    })
    .catch(err => {
      console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err.response))
      return err.response
    })
}