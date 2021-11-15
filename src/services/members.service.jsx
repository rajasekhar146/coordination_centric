import axios from 'axios'
import { authHeader, handleResponse } from '../helpers'
import { authenticationService } from '../services'
import history from '../history'
import moment from 'moment'

const apiURL = 'https://api.csuite.health'

const axiosConfig = {
    headers: authHeader(),
}

export const memberService = {
    inviteMember,
    uploadCertificate
}


function inviteMember(data) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .post(`${apiURL}/facilityList/inviteMember`, data, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function uploadCertificate(formData, onUploadProgress) {
    let axiosConfig = {
        headers: authHeader(),
        onUploadProgress: onUploadProgress
    }
    const role = 'doctor';
    return (
        axios
            .post(`${apiURL}/files/uploadCertificate/${role}`, formData, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}


