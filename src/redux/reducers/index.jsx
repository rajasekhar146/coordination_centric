import { combineReducers } from 'redux'
import {
  memberReducer,
  newMemberReducer,
  resetMemberReducer,
  memberProfessionalInfoReducer,
  memberAvailabilitiesReducer,
  memberSpecialtiesReducer,
  memberProfessionalInfoCertificatesReducer,
  deleteMemberProfessionalInfoCertificatesReducer,
} from './memberReducer'
import { organizationReducer, newOrganizationReducer } from './organizationReducer'
import {
  commonReducer,
  specialtiesReducer,
  setCompleteProfileReducer,
  setQuickProfileSetupReducer,
  setCalendarAppointmentDateReducer,
  setAppointmentAvailableTimeSlotsReducer,
  setPrimaryAppointmentDateReducer,
  setSecondaryAppointmentDateReducer,
  setFlashMsgReducer
} from './commonReducer'
import { appointmentDetailsReducer } from './appointmentReducer'

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
  deleteMemberProfessionalInfoCertificate: deleteMemberProfessionalInfoCertificatesReducer,
  quickProfileSetupReducer: setQuickProfileSetupReducer,
  calendarAppointmentDate: setCalendarAppointmentDateReducer,
  appointmentAvailableTimeSlots: setAppointmentAvailableTimeSlotsReducer,
  primaryAppointmentDate: setPrimaryAppointmentDateReducer,
  secondaryAppointmentDate: setSecondaryAppointmentDateReducer,
  appointmentDetails: appointmentDetailsReducer,
  flashMsgObj: setFlashMsgReducer
})

export default reducers
