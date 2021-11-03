import React from 'react'
import { Route } from 'react-router-dom'
import MemberLeftMenu from '../OnboardMember/MemberLeftMenu'
import './MemberLayout.Component.css'

const MemberLayoutComponent = ({ children }) => {
  return (
    <>
      <div className="ml__master__main">
        <div className="ml__left__menu__section">
          <MemberLeftMenu />
        </div>
        <div className="mlr__right__content__section">
          <div className="master__contect__placeholder">{children}</div>
        </div>
      </div>
    </>
  )
}

const MemberLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MemberLayoutComponent>
          <Component {...matchProps} />
        </MemberLayoutComponent>
      )}
    />
  )
}

export default MemberLayoutRoute
