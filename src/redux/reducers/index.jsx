import { combineReducers } from 'redux'
import { memberReducer } from './memberReducer'
import { organizationReducer, newOrganizationReducer } from './organizationReducer'

const reducers = combineReducers({
  allMembers: memberReducer,
  allOrganizations: organizationReducer,
  newOrganization: newOrganizationReducer
})

export default reducers
