import React from 'react'
import './TokenValidationError.Component.css'
import ErrorIcon from '../../assets/icons/oops_error.png'

const TokenValidationErrorComponent = () => {
  return (
    <div className="tve__main__div">
      <div className="tve__content__section">
        <div className="tve__row">
          <img src={ErrorIcon} alt="Error" />
        </div>
        <div className="tve__row tve__error__text">The activation link has expired. Please concant administrator.</div>
      </div>
    </div>
  )
}

export default TokenValidationErrorComponent
