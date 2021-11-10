import { ActionTypes } from '../constants/action-types'

const initialState = {
  organizations: [],
}

const initialOrg = {
  _id: '',
  about: '',
  admin: [
    {
      _id: '',
      email: '',
      fullName: '',
      phoneNumber: '',
    },
  ],
  business_certificate: '',
  city: '',
  createdDate: '',
  eula_certificate: '',
  facilityAddress: '',
  facilityEmail: '',
  facilityName: '',
  facilityPhone: '',
  faxNumber: '',
  inviteToken: '',
  invited_by: '',
  invited_facilityName: [],
  planType: '',
  referred_by: '',
  saas_certificate: '',
  state: '',
  status: '',
  taxId: '',
  website: '',
  zipcode: '',
}

export const organizationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORGANIZATIONS:
      return { ...state, organizations: payload }
    default:
      return state
  }
}

export const newOrganizationReducer = (state = initialOrg, { type, payload }) => {
  switch (type) {
    case ActionTypes.NEW_ORGANIZATION:
      return { ...state, organization: payload }
    default:
      return state
  }
}
