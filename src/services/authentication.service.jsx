import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import get from 'lodash.get'
import * as env from '../environments/environment'
// import config from 'config';
import { authHeader, handleResponse } from '../helpers'
const apiURL = env.environment.apiBaseUrl

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))
const qrImgSubject = new BehaviorSubject()
const is2FaActiveSubject = new BehaviorSubject()

export const authenticationService = {
  login,
  logout,
  twoFactorEmailAuth,
  twoFactorByAppAuth,
  twoFactorAuthVerification,
  twoFactorAppAuthVerification,
  resetPassword,
  changePassword,
  requestPassword,
  skipTwoFa,
  sendEmailVerificationCode,
  currentUser: currentUserSubject.asObservable(),
  qrImg: qrImgSubject.asObservable(),
  is2faActive: is2FaActiveSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value
  },
  get qrImgvalue() {
    return qrImgSubject.value
  },
  get twofaActive() {
    return is2FaActiveSubject.value
  },
}

function updateQr(v) {
  qrImgSubject.next(v)
}
function update2fa(v) {
  is2FaActiveSubject.next(v)
}
function updateUser(v) {
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
  console.log('apiURL', process.env.REACT_APP_API_URL)
  return (
    axios
      .post(`${apiURL}/users/login`, bodyMsg, axiosConfig)
      //.then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // const twoFactor_auth_type = get(currentUser, ['data', 'data', 'twoFactor_auth_type'], false)
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

        if (get(err.response, ['data', 'message'], '').includes('Two Factor Authentication')) {
          update2fa(true)
          localStorage.setItem('currentUser', JSON.stringify(get(err, ['response'], '')))
          currentUserSubject.next(get(err, ['response'], ''))
        }

        return err.response?.data
      })
  )
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser')
  // localStorage.removeItem('twoFaVerfied')
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
        updateQr(data.data)
        return data
      })
  )
}

function twoFactorAuthVerification(code, type, email) {
  let axiosConfig = {
    headers: authHeader(),
  }
  let url = `${apiURL}`

  if (type === 'email') {
    url += `/users/twoFactorEmailAuthenticationVerification/${code}/${email}`
  } else if (type === 'app') {
    url += `/users/twoFactorAuthenticationVerification`
  }

  const dataTosend =
    type === 'email'
      ? null
      : {
        code,
        email: email,
        token: 'base32',
      }

  return (
    axios
      .post(url, dataTosend, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        localStorage.setItem('currentUser', JSON.stringify(data))
        currentUserSubject.next(data)
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
        localStorage.setItem('currentUser', JSON.stringify(data))
        currentUserSubject.next(data)
        return data
      })
  )
}

function requestPassword(data) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/forgotPassword`, data, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function resetPassword(data) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/setNewPassword`, data, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function changePassword(data) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/changePassword`, data, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        return data
      })
  )
}

function skipTwoFa(data) {
  let axiosConfig = {
    headers: authHeader(),
  }
  return (
    axios
      .post(`${apiURL}/users/disable2fa`, { twoFactor_auth_type: 'skipped' }, axiosConfig)
      //.then(handleResponse)
      .then(data => {
        const userData = JSON.parse(localStorage.getItem('currentUser'))
        userData.data.data.twoFactor_auth_type = 'skipped'
        localStorage.setItem('currentUser', JSON.stringify(userData))
        currentUserSubject.next(data)
      })
  )
}


async function sendEmailVerificationCode(email, code) {
  const axiosConfig = {
    headers: authHeader(),
  }
  var bodyMsg = {
    email: email,
    code: code,
  }
  return await axios
    .post(`${apiURL}/users/codeVerification`, bodyMsg, axiosConfig)
    //.then(handleResponse)
    .then(response => {
      console.log('sendEmailVerificationCode', response)
      localStorage.setItem('currentUser', JSON.stringify(response))
      currentUserSubject.next(response)
      return response
    })
    .catch(err => {
      console.log('sendEmailWithVerificationCode >> err', JSON.stringify(err.response))
      return err.response
    })
}