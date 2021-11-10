import React from 'react'
import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
  headers: authHeader(),
}

export const memberService = {
  saveMember,
}

function saveMember(member) {
    return (
        axios
          .post(`${apiURL}/users/registerMember`, member, axiosConfig)
          //.then(handleResponse)
          .then(data => {
            console.log('saveMember', data)
            return data
          })
          .catch(err => {
            // console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err))
            return { errorCode: err.status, errorMessage: err.message }
          })
      )
}