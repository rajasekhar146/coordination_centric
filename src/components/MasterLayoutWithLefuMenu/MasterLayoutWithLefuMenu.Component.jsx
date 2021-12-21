import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import LeftMenuComponent from '../LeftMenu/LeftMenu.Component'
import NavBarComponent from '../NavBar/NavBar.Component'
import './MasterLayoutWithLefuMenu.Component.css'
import { authenticationService } from '../../services'
import get from 'lodash.get'

const MasterLayoutWithLefuMenuComponent = ({ children }) => {
  return (
    <>
      <div className="master__main__edge__manager">
        <div className="master__main__edge__navbar">
          <NavBarComponent />
        </div>
        <div className="main-div">
          <div className="master__left__menu__section">
            <LeftMenuComponent />
          </div>
          <div className="master__right__content__section">
            <div className="master__contect__placeholder">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

const MasterLayoutWithLefuMenuRoute = ({ component: Component, path, ...rest }) => {
  const isLoggedToken = get(JSON.parse(localStorage.getItem('currentUser')), ['data', 'token'], null)

  return (
    <Route
      {...rest}
      path={path}
      render={matchProps => {
        return isLoggedToken ? (
          <MasterLayoutWithLefuMenuComponent>
            <Component {...matchProps} />
          </MasterLayoutWithLefuMenuComponent>
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

    // <Route
    //     path={path}
    //     {...rest}
    //     render={props => {
    //       return localStorage.token ? (
    //         <Comp {...props} />
    //       ) : (
    //         <Redirect
    //           to={{
    //             pathname: "/login",
    //             state: {
    //               prevLocation: path,
    //             },
    //           }}
    //         />
    //       );
    //     }}
    //   />
  )
}

export default MasterLayoutWithLefuMenuRoute
