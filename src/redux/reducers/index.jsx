import { combineReducers } from 'redux'
import {
  memberReducer,
  newMemberReducer,
  resetMemberReducer,
  memberProfessionalInfoReducer,
  memberAvailabilitiesReducer,
  memberSpecialtiesReducer,
  memberProfessionalInfoCertificatesReducer,
} from './memberReducer'
import { organizationReducer, newOrganizationReducer } from './organizationReducer'
import { commonReducer, specialtiesReducer, setCompleteProfileReducer } from './commonReducer'

const reducers = combineReducers({
  allMembers: memberReducer,
  allOrganizations: organizationReducer,
  newOrganization: newOrganizationReducer,
  allCountries: commonReducer,
  newMember: newMemberReducer,
  resetMember: resetMemberReducer,
  memberProfessionalInfo: memberProfessionalInfoReducer,
  memberAvaliabilities: memberAvailabilitiesReducer,
  memberSpecialties: memberSpecialtiesReducer,
  specialties: specialtiesReducer,
  isOpenCompletProfilePopup: setCompleteProfileReducer,
  memberProfessionalInfoCertificates: memberProfessionalInfoCertificatesReducer,
})

export default reducers
