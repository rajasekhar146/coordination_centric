

import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import get from 'lodash.get'
import * as env from '../environments/environment'
import { authHeader } from '../helpers'
const apiURL = env.environment.apiBaseUrl

export const notificationService = {
    addDevice,
    notificationMakeRead,
    getNotificationList
}



function addDevice(deviceInfo) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .post(`${apiURL}/notification/addDevice
            `,deviceInfo, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}


function getNotificationList(requestObj) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .post(`${apiURL}/notification/list
            `,requestObj, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}

function notificationMakeRead(id) {
    let axiosConfig = {
        headers: authHeader(),
    }
    return (
        axios
            .post(`${apiURL}/notification/makeRead?id=${id}
            `,{}, axiosConfig)
            //.then(handleResponse)
            .then(data => {
                return data
            })
    )
}