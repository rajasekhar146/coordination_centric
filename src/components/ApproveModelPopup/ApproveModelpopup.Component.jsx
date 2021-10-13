import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'

const ApproveModel = props => {

  return (
    <div className="io__main__div">
      <div className="io__row">
        <label className="io__cancel__btn" onClick={props.clickCloseButton}>
          Close
        </label>
      </div>
      <div className="io__row">
        <div className="io__same__line">
          <div className="io__cancel">
            <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
              Close
            </Button>
          </div>
          <div className="io__cancel">
            <Button type="submit" className="io__Approve__btn">
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproveModel
