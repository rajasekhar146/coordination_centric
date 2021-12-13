import { combineReducers } from 'redux'
import VideoCallReducer from './video-call-reducer'
import {
  memberReducer,
  newMemberReducer,
  resetMemberReducer,
  memberProfessionalInfoReducer,
  memberAvailabilitiesReducer,
  memberSpecialtiesReducer,
  memberProfessionalInfoCertificatesReducer,
  deleteMemberProfessionalInfoCertificatesReducer,
  memberMedicalReportsReducer,
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
  setFlashMsgReducer,
  skipTwoFaReducer,
  completeProfileReducer,
  reschedulePrimaryAppointmentDateReducer,
  rescheduleSecondaryAppointmentDateReducer,
} from './commonReducer'
import { appointmentDetailsReducer, doctorDetailsReducer } from './appointmentReducer'

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
  videoCallReducer: VideoCallReducer,
  isOpenCompletProfilePopup: setCompleteProfileReducer,
  memberProfessionalInfoCertificates: memberProfessionalInfoCertificatesReducer,
  deleteMemberProfessionalInfoCertificate: deleteMemberProfessionalInfoCertificatesReducer,
  quickProfileSetupReducer: setQuickProfileSetupReducer,
  calendarAppointmentDate: setCalendarAppointmentDateReducer,
  appointmentAvailableTimeSlots: setAppointmentAvailableTimeSlotsReducer,
  primaryAppointmentDate: setPrimaryAppointmentDateReducer,
  secondaryAppointmentDate: setSecondaryAppointmentDateReducer,
  appointmentDetails: appointmentDetailsReducer,
  flashMsgObj: setFlashMsgReducer,
  doctorDetails: doctorDetailsReducer,
  skipTwoFaValue: skipTwoFaReducer,
  completeProfile: completeProfileReducer,
  memberMedicalReports: memberMedicalReportsReducer,
  reschedulePrimaryAppointmentDate: reschedulePrimaryAppointmentDateReducer,
  rescheduleSecondaryAppointmentDate: rescheduleSecondaryAppointmentDateReducer,
})

export default reducers
