import React from 'react'
import { Route } from 'react-router-dom'

const DefaultLayoutComponent = ({ children }) => <div>{children}</div>

const DefaultLayoutComponentRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <DefaultLayoutComponent>
          <Component {...matchProps} />
        </DefaultLayoutComponent>
      )}
    />
  )
}

export default DefaultLayoutComponentRoute
