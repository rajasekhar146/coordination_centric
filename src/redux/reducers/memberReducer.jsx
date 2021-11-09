import { ActionTypes } from '../constants/action-types'

const initialState = {
  members: [
    {
      _id: '',
      firstName: 'Prakash',
      middleName: 'R',
      lastName: 'Raju', 
      ssn: '1234567890',
      occupation: 'IT Professional',
      dateOfBirth: '01-01-1983',
      phoneNumber: '2343423432',
      gender: 'Male',
      address: '1-324, New Street, 5ht Main Road, Chennai - 600001',
      country: 'India',
      state: 'Tamilnadu',
      city: 'Chennai',
      postalCode: '600001',
      profilePic: 'c-234ewd.png',
      shortBiography: 'This is a general rule. There are times when you want to use height, but for the most part, they cause more issues than they solve.',      
    },
  ],
}

export const memberReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MEMBERS:
      return state
    default:
      return state
  }
}
