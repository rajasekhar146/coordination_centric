import React, { Component } from 'react'
import history from './history'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import DefaultLayoutComponentRoute from './components/DefaultLayout/DefaultLayout.Component'
import MasterLayoutWithLefuMenuComponent from './components/MasterLayoutWithLefuMenu/MasterLayoutWithLefuMenu.Component'
import AcceptanceCriteria from './pages/acceptance-criteria'
import Signup from './pages/signup'
import ServiceLevelAgreement from './pages/service-level-agreement'
import Onboarding from './pages/onboarding'
import BankInformation from './pages/bank-information'
import Dashboard from './pages/dashboard'
import NavBarComponent from './components/NavBar/NavBar.Component'
import OrganizationDashboard from './pages/organization-dashboard'
import Appointments from './pages/appointments'
import Users from './pages/users'
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
import UserVerification from './pages/user_verification'
import EmailVerificationPage from './pages/email_verification'

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <DefaultLayoutComponentRoute path="/signup" component={Signup} />
          <DefaultLayoutComponentRoute path="/signin" component={Signin} />
          <DefaultLayoutComponentRoute path="/userverification" component={UserVerification} />
          <DefaultLayoutComponentRoute path="/emailverification" component={EmailVerificationPage} />
          <DefaultLayoutComponentRoute path="/onboarding" component={Onboarding} />
          <DefaultLayoutComponentRoute path="/new-onboarding" component={NewOnboarding} />
          <DefaultLayoutComponentRoute path="/bank-info" component={BankInformation} />
          <DefaultLayoutComponentRoute path="/acceptance-criteria" component={AcceptanceCriteria} />
          <DefaultLayoutComponentRoute path="/saas-agreement" component={SAASAgreement} />
          <DefaultLayoutComponentRoute path="/eula-agreement" component={EULAAgreement} />
          <DefaultLayoutComponentRoute path="/terms-condition" component={TermsAndConditions} />
          <DefaultLayoutComponentRoute path="/signup-completed" component={SignupComplete} />
          <DefaultLayoutComponentRoute path="/bank-info" component={BankInformationComponent} />
          <DefaultLayoutComponentRoute path="/signup" component={Signup} />
          <DefaultLayoutComponentRoute path="/service-level-agreement" component={ServiceLevelAgreement} />
          <DefaultLayoutComponentRoute path="/navbar" component={NavBarComponent} />
          <DefaultLayoutComponentRoute path="/enable2fa" component={EnableTwoFactorAuth} />
          <DefaultLayoutComponentRoute path="/verification/:method" component={VerificationCodePage} />
          <DefaultLayoutComponentRoute path="/verificationbyapp" component={VerificationCodeByApp} />
          <DefaultLayoutComponentRoute path="/2faverificationsuccess" component={TwoFaVerificationSuccess} />
          <DefaultLayoutComponentRoute path="/2faverificationfail" component={TwoFaVerificationFail} />
          <MasterLayoutWithLefuMenuComponent path="/dashboard" component={Dashboard} />
          <MasterLayoutWithLefuMenuComponent path="/organizations" component={OrganizationDashboard} />
          <MasterLayoutWithLefuMenuComponent path="/appointments" component={Appointments} />
          <MasterLayoutWithLefuMenuComponent path="/users" component={Users} />
          <MasterLayoutWithLefuMenuComponent path="/patients" component={Patients} />
          <MasterLayoutWithLefuMenuComponent path="/vaccinations" component={Vaccinations} />
          <MasterLayoutWithLefuMenuComponent path="/notifications" component={Notifications} />
          <MasterLayoutWithLefuMenuComponent path="/payments" component={Payments} />
        </Switch>
      </Router>
    )
  }
}

export default Routes
