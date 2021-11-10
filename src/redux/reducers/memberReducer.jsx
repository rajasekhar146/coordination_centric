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
    profilePic: 'c-234ewd.png',
    bio: '',
    },
  ],
}

const newMemberInitialState = {
  member: {
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
    profilePic: 'c-234ewd.png',
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
