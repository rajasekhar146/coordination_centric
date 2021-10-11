import React from 'react'
import { Route } from 'react-router-dom'
import LeftMenuComponent from '../LeftMenu/LeftMenu.Component'
import NavBarComponent from '../NavBar/NavBar.Component'

import './MasterLayoutWithLefuMenu.Component.css'

const MasterLayoutWithLefuMenuComponent = ({ children }) => {
  return (
    <>
      <div className="master__main__edge__manager">
        <div className="master__main__edge__navbar">
          <NavBarComponent />
        </div>
        <div className="master__left__menu__section">
          <LeftMenuComponent />
        </div>
        <div className="master__right__content__section">
          <div className="master__contect__placeholder">{children}</div>
        </div>
      </div>
    </>
  )
}

const MasterLayoutWithLefuMenuRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MasterLayoutWithLefuMenuComponent>
          <Component {...matchProps} />
        </MasterLayoutWithLefuMenuComponent>
      )}
    />
  )
}

export default MasterLayoutWithLefuMenuRoute
