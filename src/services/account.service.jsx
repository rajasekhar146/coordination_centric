import React from 'react'
import { authHeader, handleResponse } from '../helpers'

const apiURL = 'https://api.csuite.health/'

export const accountService = () => {
  getAll()
}

const getAll = () => {
  const requestOptions = { method: 'GET', headers: authHeader() }
  return fetch(`${apiURL}/users`, requestOptions).then(handleResponse)
}
