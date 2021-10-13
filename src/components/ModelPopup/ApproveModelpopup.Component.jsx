import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import ApproveOrgIcon from '../../assets/icons/approve_org.png'


const ApproveModel = props => {
  const {
    selectedOrg
  } = props;
  return (
    <div className="io__main__div">
      <div className="io__row io__icon">
      <img src={ApproveOrgIcon} alt="Approve Org" />
      </div>
      <div className="io__row io__text__center">
        <label className="io__title">
          Approve Organisation
        </label>
      </div>
      <div className="io__row io__text__center">
        <label className="io__conform__title">
          Are you sure you want to approve this organisation?
        </label>
      </div>
      <div className="io__row io__btn">
        <div className="io__same__line">
          <div className="io__cancel">
            <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
              Close
            </Button>
          </div>
          <div className="io__approve">
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
