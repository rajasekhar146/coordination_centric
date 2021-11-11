import { ActionTypes } from '../constants/action-types'

export const setMembers = members => {
  return {
    type: ActionTypes.SET_MEMBERS,
    payload: members,
  }
}

export const selectedMember = member => {
  return {
    type: ActionTypes.SELECTED_MEMBER,
    payload: member,
  }
}

export const newMember = member => {
  return {
    type: ActionTypes.NEW_MEMBER,
    payload: member,
  }
}

export const resetMember = () => {
  return {
    type: ActionTypes.RESET_MEMBER,
    payload: {},
  }
}
