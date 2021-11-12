import { ActionTypes } from '../constants/action-types'

export const setAllOrganizations = organizations => {
  return {
    type: ActionTypes.SET_ORGANIZATIONS,
    payload: organizations,
  }
}

export const selectedOrganization = organization => {
  return {
    type: ActionTypes.SELECTED_ORGANIZATION,
    payload: organization,
  }
}

export const newOrganization = organization => {
  return {
    type: ActionTypes.NEW_ORGANIZATION,
    payload: organization,
  }
}
