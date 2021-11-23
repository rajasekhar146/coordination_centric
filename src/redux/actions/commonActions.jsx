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

export const setSpecialties = specialties => {
  return {
    type: ActionTypes.FETCH_SPECIALTIES,
    payload: specialties,
  }
}


export const setCopmletPropfilePopup = val => {
  return {
    type: ActionTypes.COMPLETE_PROFILE_POPUP,
    payload: val,
  }
}