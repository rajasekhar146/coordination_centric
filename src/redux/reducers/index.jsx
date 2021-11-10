import { combineReducers } from 'redux'
import { memberReducer, newMemberReducer } from './memberReducer'
import { organizationReducer, newOrganizationReducer } from './organizationReducer'
import { commonReducer } from './commonReducer'

const reducers = combineReducers({
  allMembers: memberReducer,
  allOrganizations: organizationReducer,
  newOrganization: newOrganizationReducer,
  allCountries: commonReducer,
  newMember: newMemberReducer,
})

export default reducers
