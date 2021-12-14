import React, { Component } from 'react'
import history from './history'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import DefaultLayoutComponentRoute from './components/DefaultLayout/DefaultLayout.Component'
import MasterLayoutWithLefuMenuComponent from './components/MasterLayoutWithLefuMenu/MasterLayoutWithLefuMenu.Component'
import MemberLayoutComponent from './components/MemberLayout/MemberLayout.Component'
import AcceptanceCriteria from './pages/acceptance-criteria'
import Signup from './pages/signup'
import ServiceLevelAgreement from './pages/service-level-agreement'
import Onboarding from './pages/onboarding'
import BankInformation from './pages/bank-information'
import Dashboard from './pages/dashboard'
import NavBarComponent from './components/NavBar/NavBar.Component'
import OrganizationDashboard from './pages/organization-dashboard'
import OrganizationView from './pages/organization-view'
import Appointments from './pages/appointments'
import PatienRecords from './pages/patien_records'
import Patients from './pages/patients'
import Vaccinations from './pages/vaccinations'
import Notifications from './pages/notifications'
import Payments from './pages/payments'
import Signin from './pages/signin'
import NewOnboarding from './pages/new-onboarding'
import SAASAgreement from './pages/saasagreement'
import EULAAgreement from './pages/eula-agreement'
import EnableTwoFactorAuth from './pages/enable__twofactor__auth'
import VerificationCodePage from './pages/verificationcode'
import VerificationCodeByApp from './pages/verificationcode__by__app'
import BankInformationComponent from './components/Organization/BankInformation/BankInformation.Component'
import TwoFaVerificationFail from './pages/twofa_verification_fail'
import TwoFaVerificationSuccess from './pages/twofa_verification_success'
import TermsAndConditions from './pages/terms-and-conditions'
import SignupComplete from './pages/signup-complete'
import UserVerificationPage from './components/SignIn/UserVerification.Component'
import EmailVerificationPage from './components/SignIn/EmailVerificationPage.Component'
import EmailVerificationSuccess from './components/SignIn/EmailVerificationSuccess.Component'
import EmailVerificationFailed from './components/SignIn/EmailVerificationFail.Component'
import TwoFaCodeVerification from './components/EnableTwoFactorAuth/TwoFaCodeVerification'
import ForgotPassword from './components/SignIn/ForgotPassword.Component'
import ForgotPasswordResend from './components/SignIn/ForgotPasswordResend.Component'
import ResetPassword from './components/SignIn/ResetPassword.Component'
import ResetPasswordSuccess from './components/SignIn/ResetPasswordSuccess.Component'
import TwoFaEnabled from './pages/two-fa-enabled'
import MemberSignIn from './pages/member-signin'
import PersonalDetail from './pages/personal-detail'
import TokenValidationError from './pages/token-validation-error'
import ProfileSetup from './pages/profile-setup'
import MasterLayoutWithOutLefuMenuComponent from './components/MasterLayoutWithoutLeftMenu/MasterLayoutWithoutLeftMenu.Component'
import Settings from './components/Settings/Settings.Component'
import ScheduleCalendar from './components/ScheduleCalendar/ScheduleCalendar.Component'
import StaffComponent from './components/Staff/Staff.Component'
import Collaborators from './components/Collaborators/Collaborators.Component'
import PatientsComponent from './components/Patients/Patients.Component'
import TwoFaCodeVerificationFail from './components/EnableTwoFactorAuth/TwoFaCodeVerificationFail.Component'
import Marketplace from './pages/marketplace'
import MakeAppointments from './pages/make-a-appointments'
import SelectNewDatesComponent from './components/Appointments/SelectNewDates.Component'
import VideoCall from './components/VideoCall/VideoCall';
import RescheduleAppointment from './components/MarketPlace/RescheduleAppointment'
import ViewAppointmentComponent  from './components/Appointments/ViewAppointment.Component'
import ViewStaffDetailsComponent from './components/Shared/ViewStaffDetails/ViewStaffDetails.Component'
import ViewCollaboratorComponent from './components/OrganizationViewComponent/ViewCollaborator'
class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <DefaultLayoutComponentRoute path="/signin" component={Signin} />
          <DefaultLayoutComponentRoute path="/forgotpassword" component={ForgotPassword} />
          <DefaultLayoutComponentRoute path="/forgotpasswordresend" component={ForgotPasswordResend} />
          <DefaultLayoutComponentRoute path="/reset-password" component={ResetPassword} />
          <DefaultLayoutComponentRoute path="/resetpasswordsuccess" component={ResetPasswordSuccess} />
          <DefaultLayoutComponentRoute path="/onboarding" component={Onboarding} />
          <DefaultLayoutComponentRoute path="/new-onboarding" component={NewOnboarding} />
          <DefaultLayoutComponentRoute path="/bank-info" component={BankInformation} />
          <DefaultLayoutComponentRoute
            path="/acceptance-criteria/:invitetoken/:referredby/:invitedBy"
            component={AcceptanceCriteria}
          />
          <DefaultLayoutComponentRoute path="/saas-agreement" component={SAASAgreement} />
          <DefaultLayoutComponentRoute path="/eula-agreement" component={EULAAgreement} />
          <DefaultLayoutComponentRoute path="/terms-condition" component={TermsAndConditions} />
          <DefaultLayoutComponentRoute path="/signup-completed" component={SignupComplete} />
          <DefaultLayoutComponentRoute path="/bank-info" component={BankInformationComponent} />
          <DefaultLayoutComponentRoute path="/signup/:invitetoken/:referredby/:invitedBy" component={Signup} />
          <DefaultLayoutComponentRoute path="/userverification" component={UserVerificationPage} />
          <DefaultLayoutComponentRoute path="/emailverification" component={EmailVerificationPage} />
          <DefaultLayoutComponentRoute path="/emailverification-success" component={EmailVerificationSuccess} />
          <DefaultLayoutComponentRoute path="/emailverification-failed" component={EmailVerificationFailed} />
          <DefaultLayoutComponentRoute path="/two-fa-enabled" component={TwoFaEnabled} />
          <DefaultLayoutComponentRoute
            path="/service-level-agreement/:invitetoken/:referredby/:invitedBy"
            component={ServiceLevelAgreement}
          />
          <DefaultLayoutComponentRoute path="/navbar" component={NavBarComponent} />
          <DefaultLayoutComponentRoute path="/enable2fa" component={EnableTwoFactorAuth} />
          <DefaultLayoutComponentRoute path="/verification/:method" component={VerificationCodePage} />
          <DefaultLayoutComponentRoute path="/verificationbyapp" component={VerificationCodeByApp} />
          <DefaultLayoutComponentRoute path="/2faverificationsuccess" component={TwoFaVerificationSuccess} />
          <DefaultLayoutComponentRoute path="/2faverificationfail" component={TwoFaVerificationFail} />
          <DefaultLayoutComponentRoute path="/2facodeverification" component={TwoFaCodeVerification} />
          <DefaultLayoutComponentRoute path="/2facodeverificationfail" component={TwoFaCodeVerificationFail} />
          <DefaultLayoutComponentRoute
            path="/members/register/:invitetoken/:referredby/:invitedBy"
            component={MemberSignIn}
          />
          <DefaultLayoutComponentRoute path="/error-page" component={TokenValidationError} />
          <DefaultLayoutComponentRoute path="/video-call/:meetingid" component={VideoCall}/>
          <MasterLayoutWithLefuMenuComponent path="/dashboard" component={Dashboard} />
          <MasterLayoutWithLefuMenuComponent path="/organizations" component={OrganizationDashboard} />
          <MasterLayoutWithLefuMenuComponent path="/organization-view/:orgId" component={OrganizationView} />
          <MasterLayoutWithLefuMenuComponent path="/appointments" component={Appointments} />
          <MasterLayoutWithLefuMenuComponent path="/patientrecords" component={PatienRecords} />
          <MasterLayoutWithLefuMenuComponent path="/patients" component={Patients} />
          <MasterLayoutWithLefuMenuComponent path="/inventory" component={Vaccinations} />
          <MasterLayoutWithLefuMenuComponent path="/notifications" component={Notifications} />
          <MasterLayoutWithLefuMenuComponent path="/payments" component={Payments} />
          <MasterLayoutWithOutLefuMenuComponent path="/settings/:userId" component={Settings} />
          <MasterLayoutWithLefuMenuComponent path="/payments" component={Payments} />
          <MasterLayoutWithLefuMenuComponent path="/staff" component={StaffComponent} />
          <MasterLayoutWithLefuMenuComponent path="/collaborators" component={Collaborators} />
          <MasterLayoutWithLefuMenuComponent path="/marketplace/make-a-appointments" component={MakeAppointments} />
          <MasterLayoutWithLefuMenuComponent path="/marketplace" component={Marketplace} />
          <MasterLayoutWithLefuMenuComponent path="/reschedule_appointment" component={RescheduleAppointment} />
            <MasterLayoutWithLefuMenuComponent path="/selectdates" component={SelectNewDatesComponent} />
          <MasterLayoutWithLefuMenuComponent path="/viewApointment/:type/:id" component ={ViewAppointmentComponent} />
          <MasterLayoutWithLefuMenuComponent path="/viewDetails/:id" component ={ViewStaffDetailsComponent} />
          <MasterLayoutWithLefuMenuComponent path="/viewCollaborator/:id" component ={ViewCollaboratorComponent} />
          {/* <MasterLayoutWithLefuMenuComponent path="/patients" component={PatientsComponent} /> */}
          <MemberLayoutComponent
            path="/members/personal-detail/:invitetoken/:referredby/:invitedBy"
            component={PersonalDetail}
          />
          <MemberLayoutComponent
            path="/members/profile-setup/:invitetoken/:referredby/:invitedBy"
            component={ProfileSetup}
          />
          <MasterLayoutWithLefuMenuComponent path="/calendar" component={ScheduleCalendar} />
        </Switch>
      </Router>
    )
  }
}

export default Routes
