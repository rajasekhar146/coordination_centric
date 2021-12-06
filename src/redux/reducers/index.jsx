import { combineReducers } from 'redux';
import VideoCallReducer from "./video-call-reducer";
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
} from './commonReducer'

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
  videoCallReducer:VideoCallReducer,
  isOpenCompletProfilePopup: setCompleteProfileReducer,
  memberProfessionalInfoCertificates: memberProfessionalInfoCertificatesReducer,
  deleteMemberProfessionalInfoCertificate: deleteMemberProfessionalInfoCertificatesReducer,
  quickProfileSetupReducer: setQuickProfileSetupReducer,
  calendarAppointmentDate: setCalendarAppointmentDateReducer,
  appointmentAvailableTimeSlots: setAppointmentAvailableTimeSlotsReducer,
  primaryAppointmentDate: setPrimaryAppointmentDateReducer,
  secondaryAppointmentDate: setSecondaryAppointmentDateReducer,
})

export default reducers
