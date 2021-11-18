import { ActionTypes } from '../constants/action-types'

export const setCountries = countries => {
  return {
    type: ActionTypes.SET_COUNTRIES,
    payload: countries,
  }
}

export const setAllHealthProblems = issues => {
  return {
    type: ActionTypes.SET_HEALTH_PROBLEMS,
    payload: issues,
  }
}
