import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import NavBarComponent from '../NavBar/NavBar.Component'

import '../MasterLayoutWithLefuMenu/MasterLayoutWithLefuMenu.Component'
import get from 'lodash.get'

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

const MasterLayoutWithoutLeftMenuRoute = ({ component: Component, path, ...rest }) => {
  const isLoggedToken = get(JSON.parse(localStorage.getItem('currentUser')), ['data', 'token'], null)

  return (
    <Route
    {...rest}
    path={path}
    render={matchProps => {
      return isLoggedToken ? (
        <MasterLayoutWithoutLeftMenuComponent>
          <Component {...matchProps} />
        </MasterLayoutWithoutLeftMenuComponent>
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: {
              prevLocation: path,
            },
          }}
        />
      );
    }


    }
  />
  )
}

export default MasterLayoutWithoutLeftMenuRoute
