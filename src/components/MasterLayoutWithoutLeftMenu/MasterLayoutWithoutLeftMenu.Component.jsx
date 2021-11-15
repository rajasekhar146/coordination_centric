import React from 'react'
import { Route } from 'react-router-dom'
import NavBarComponent from '../NavBar/NavBar.Component'

import '../MasterLayoutWithLefuMenu/MasterLayoutWithLefuMenu.Component'

const MasterLayoutWithoutLeftMenuComponent = ({ children }) => {
  return (
    <>
      <div >
        <div className="master__main__edge__navbar">
          <NavBarComponent />
        </div>
      
        <div>
          <div style={{ width: "100%"}}>{children}</div>
        </div>
      </div>
    </>
  )
}

const MasterLayoutWithoutLeftMenuRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <MasterLayoutWithoutLeftMenuComponent>
          <Component {...matchProps} />
        </MasterLayoutWithoutLeftMenuComponent>
      )}
    />
  )
}

export default MasterLayoutWithoutLeftMenuRoute
