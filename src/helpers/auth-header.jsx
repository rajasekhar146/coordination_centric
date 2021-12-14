import React from 'react'
import { authenticationService } from '../services'

export function authHeader() {
  const currentUser = authenticationService?.currentUserValue
  if (currentUser && currentUser.data && currentUser.data.token) {
    return {
      'x-access-token': `${currentUser.data.token}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    }
  } else {
    return { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
  }
}

// export default authHeader
