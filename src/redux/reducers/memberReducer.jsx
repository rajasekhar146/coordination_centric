import { ActionTypes } from '../constants/action-types'

const initialState = {
  members: [
    {
      first_name: '',
      middle_name: '',
      last_name: '',
      ssn: '',
      occupation: '',
      email: '',
      dob: '',
      phoneNumber: '',
      gender: '',
      address: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      profilePic: '',
      inviteToken: '',
      referral_code: '',
      invited_by: '',
      bio: '',
    },
  ],
}

const newMemberInitialState = {
  member: {
    first_name: '',
    middle_name: '',
    last_name: '',
    ssn: '123456',
    occupation: 'eye doctor',
    email: '',
    dob: '12/12/2000',
    phoneNumber: '',
    gender: 'Male',
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    profilePic: '',
    inviteToken: '',
    referral_code: '',
    invited_by: '',
    bio: '',
  },
}

export const memberReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MEMBERS:
      return { ...state, members: payload }
    default:
      return state
  }
}

export const newMemberReducer = (state = newMemberInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.NEW_MEMBER:
      return { ...state, member: payload }
    default:
      return state
  }
}

export const resetMemberReducer = (state = newMemberInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.RESET_MEMBER:
      return newMemberInitialState
    default:
      return newMemberInitialState
  }
}