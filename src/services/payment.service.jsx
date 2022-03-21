import React from 'react'
import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import * as env from '../environments/environment'

const apiURL = env.environment.apiBaseUrl

const axiosConfig = {
  headers: authHeader(),
}

export const paymentService = {
  generateToken,
  savePaymentMethod,
  generateBankToken,
}

function generateToken(bodyMsg) {
  return (
    axios
      .post(`${apiURL}/payment/generateToken`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(response => {
        // console.log('generateToken', response)
        return response
      })
      .catch(err => {
        console.log('generateToken >> err', JSON.stringify(err.response))
        return err.response
      })
  )
}

function generateBankToken(bodyMsg) {
  return (
    axios
      .post(`${apiURL}/payment/generateBankToken`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(response => {
        console.log('generateBankToken', response)
        return response
      })
      .catch(err => {
        console.log('generateBankToken >> err', JSON.stringify(err.response))
        return err.response
      })
  )
}

function savePaymentMethod(bodyMsg) {
  return (
    axios
      .post(`${apiURL}/payment/savePaymentMethod`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(response => {
        console.log('savePaymentMethod', response)
        return response
      })
      .catch(err => {
        console.log('savePaymentMethod >> err', JSON.stringify(err.response))
        return err.response
      })
  )
}
