import React, { Component } from 'react'
import history from './history'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import DefaultLayoutComponentRoute from './components/DefaultLayout/DefaultLayout.Component'
import AcceptanceCriteria from './pages/acceptance-criteria'
import Signup from './pages/signup'
import ServiceLevelAgreement from './pages/service-level-agreement'
import Onboarding from './pages/onboarding'
import BankInformation from './pages/bank-information'



class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/onboarding" />
          </Route>
          <DefaultLayoutComponentRoute path="/onboarding" component={Onboarding} />
          <DefaultLayoutComponentRoute path="/bank-info" component={BankInformation} />
          <DefaultLayoutComponentRoute path="/acceptance-criteria" component={AcceptanceCriteria} />
          <DefaultLayoutComponentRoute path="/signup" component={Signup} />
          <DefaultLayoutComponentRoute path="/service-level-agreement" component={ServiceLevelAgreement} />
        </Switch>
      </Router>
    )
  }
}

export default Routes
