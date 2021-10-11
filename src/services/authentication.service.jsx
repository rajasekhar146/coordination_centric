import axios from 'axios'
import { BehaviorSubject } from 'rxjs'

// import config from 'config';
import { authHeader, handleResponse } from '../helpers'
const apiURL = 'https://api.csuite.health'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value
  },
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
        console.log(user)
        return user
      })
  )
  // .error(err => {
  //     console.log('authentication service >> login ', err);
  // });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser')
  currentUserSubject.next(null)
}
