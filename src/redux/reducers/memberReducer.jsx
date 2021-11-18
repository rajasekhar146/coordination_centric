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

const memberProfessionalInfoInitialState = {
  member: {
    _id: '',
    name: '',
    profilePic: '',
    npiId: '',
    certificates: [],
    services: {},
    availability: [],
    bio: '',
    specialization: [],
    appointmentTypes: [],
    years_of_experience: '',
  },
}

const memberAvailabilitiesInitialState = [
  {
    day: 'Monday',
    first_half_starting_time: '',
    first_half_ending_time: '',
    second_half_starting_time: '',
    second_half_ending_time: '',
    is_available: true,
  },
  {
    day: 'Tuesday',
    first_half_starting_time: '',
    first_half_ending_time: '',
    second_half_starting_time: '',
    second_half_ending_time: '',
    is_available: true,
  },
  {
    day: 'Wednesday',
    first_half_starting_time: '',
    first_half_ending_time: '',
    second_half_starting_time: '',
    second_half_ending_time: '',
    is_available: true,
  },
  {
    day: 'Thursday',
    first_half_starting_time: '',
    first_half_ending_time: '',
    second_half_starting_time: '',
    second_half_ending_time: '',
    is_available: true,
  },
  {
    day: 'Friday',
    first_half_starting_time: '',
    first_half_ending_time: '',
    second_half_starting_time: '',
    second_half_ending_time: '',
    is_available: true,
  },
  {
    day: 'Saturday',
    first_half_starting_time: '',
    first_half_ending_time: '',
    second_half_starting_time: '',
    second_half_ending_time: '',
    is_available: true,
  },
  {
    day: 'Sunday',
    first_half_starting_time: '',
    first_half_ending_time: '',
    second_half_starting_time: '',
    second_half_ending_time: '',
    is_available: true,
  },
]

const memberSpecialtiesInitialState = [
  {
    id: '',
    speciality_name: '',
    primary: false,
  },
]

const memberCertificateInitialState = []

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

export const memberProfessionalInfoReducer = (state = memberProfessionalInfoInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MEMBER_PROFFESSIONAL_INFO:
      return { ...state, member: payload }
    default:
      return state
  }
}

export const memberAvailabilitiesReducer = (state = memberAvailabilitiesInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MEMBER_AVAILABILITIES:
      return payload
    default:
      return state
  }
}

export const memberSpecialtiesReducer = (state = memberSpecialtiesInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MEMBER_SPECIALTIES:
      return { ...state, specialties: payload }
    default:
      return state
  }
}

export const memberProfessionalInfoCertificatesReducer = (state = memberCertificateInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MEMBER_PROFESSIONAL_CERTIFICATES:
      return [...state, payload]
    default:
      return state
  }
}
