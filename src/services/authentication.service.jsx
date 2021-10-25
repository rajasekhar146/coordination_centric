import axios from 'axios'
import { BehaviorSubject } from 'rxjs'

// import config from 'config';
import { authHeader, handleResponse } from '../helpers'
const apiURL = 'https://api.csuite.health'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))
const qrImgSubject = new BehaviorSubject()

export const authenticationService = {
  login,
  logout,
  twoFactorEmailAuth,
  twoFactorByAppAuth,
  twoFactorEmailAuthVerification,
  twoFactorAppAuthVerification,
  currentUser: currentUserSubject.asObservable(),
  qrImg: qrImgSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value
  },
  get qrImgvalue() {
    return qrImgSubject.value
  },
}

function updateStore(v) {
  qrImgSubject.next(v)
}

function login(username, password) {
  const deviceId = '123'
  const deviceType = 'web'
  const fcmId = '5154646'
  const backoffice = '1'

  let axiosConfig = {
    headers: authHeader(),
  }

  var bodyMsg = JSON.stringify({ email: username, password, deviceId, deviceType, fcmId, backoffice })
  console.log('request', axiosConfig)
  return (
    axios
      .post(`${apiURL}/users/login`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user))
        currentUserSubject.next(user)
        // console.log(user)
        return user
      })
      .catch(err => {
        console.log('authentication service >> login ', JSON.stringify(err.response))
        // const errorMessage = {
        //   error: err.message,
        //   erroCode: err.code,
        //   data: err.data,
        // }
        return err.response?.data
      })
  )
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser')
  currentUserSubject.next(null)
}

function twoFactorEmailAuth(email) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/twoFactorEmailAuthentication/${email}`, null, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function twoFactorByAppAuth(email) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/twoFactorAuthentication/${email}`, null, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        updateStore(data.data)
        return data
      })
  )
}

function twoFactorEmailAuthVerification(code) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/twoFactorEmailAuthenticationVerification/${code}`, null, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function twoFactorAppAuthVerification(data) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/twoFactorAuthenticationVerification`, data, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}
