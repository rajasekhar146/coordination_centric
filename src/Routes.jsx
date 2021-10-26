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
import OrganizationView from './pages/organization-view'
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
import BankInformationComponent from './components/Organization/BankInformation/BankInformation.Component'

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <DefaultLayoutComponentRoute path="/signin" component={Signin} />
          <DefaultLayoutComponentRoute path="/onboarding" component={Onboarding} />
          <DefaultLayoutComponentRoute path="/new-onboarding" component={NewOnboarding} />
          <DefaultLayoutComponentRoute path="/bank-info" component={BankInformation} />
          <DefaultLayoutComponentRoute path="/acceptance-criteria" component={AcceptanceCriteria} />
          <DefaultLayoutComponentRoute path="/saas-agreement" component={SAASAgreement} />
          <DefaultLayoutComponentRoute path="/eula-agreement" component={EULAAgreement} />
          <DefaultLayoutComponentRoute path="/bank-info" component={BankInformationComponent} />
          <DefaultLayoutComponentRoute path="/signup" component={Signup} />
          <DefaultLayoutComponentRoute path="/service-level-agreement" component={ServiceLevelAgreement} />
          <DefaultLayoutComponentRoute path="/navbar" component={NavBarComponent} />
          <MasterLayoutWithLefuMenuComponent path="/dashboard" component={Dashboard} />
          <MasterLayoutWithLefuMenuComponent path="/organizations" component={OrganizationDashboard} />
          <MasterLayoutWithLefuMenuComponent path="/organization-view/:orgId" component={OrganizationView} />
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
