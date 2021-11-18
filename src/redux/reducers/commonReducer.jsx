import { ActionTypes } from '../constants/action-types'

const initialState = {
  countries: [],
}

export const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COUNTRIES:
      return { ...state, countries: payload }
    case ActionTypes.SET_HEALTH_PROBLEMS:
      return { ...state, healthProblems : payload }
    default:
      return state
  }
}
