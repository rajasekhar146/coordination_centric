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

export const memberProfessionalInfo = mProfessionalInfo => {
  return {
    type: ActionTypes.MEMBER_PROFFESSIONAL_INFO,
    payload: mProfessionalInfo,
  }
}

export const memberAvaliabilities = availability => {
  return {
    type: ActionTypes.MEMBER_AVAILABILITIES,
    payload: availability,
  }
}

export const memberSpecialties = specialties => {
  return {
    type: ActionTypes.MEMBER_SPECIALTIES,
    payload: specialties,
  }
}

export const memberProfessionalInfoCertificates = certificate => {
  return {
    type: ActionTypes.MEMBER_PROFESSIONAL_CERTIFICATES,
    payload: certificate,
  }
}
