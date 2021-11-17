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
    updateHealthInfo
}


function getMemberDetails(id) {
    console.log('axiosConfig', axiosConfig)

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

function updateHealthInfo(id, reqdata) {
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
