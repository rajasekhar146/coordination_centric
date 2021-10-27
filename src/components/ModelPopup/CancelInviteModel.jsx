import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import RejectOrgIcon from '../../assets/icons/reject_org.png'
import { organizationService } from '../../services'
import get from 'lodash.get'

const CancelInviteModel = props => {
  const { selectedOrg, setSkip, setOrganizations, setOpenFlash, setAlertMsg } = props

  const handleSubmit = () => {
    const res = organizationService.cancelIvitation(selectedOrg.id)
    res.then(res => {
      setOrganizations([])
      setSkip(1)
      setOpenFlash(true)
      setAlertMsg('Cancelled')
      props.clickCloseButton()
    })
  }

  return (
    <div className="io__main__div">
      <div className="io__row io__icon">
        <img src={RejectOrgIcon} alt="Approve Org" />
      </div>
      <div className="io__row io__text__center io_width97 ">
        <label className="io__title">Cancel Invitation</label>
      </div>
      <div className="io__row io__text__center io_width93">
        <label className="io__conform__title">
          Are you sure you want to cancel the invitation for this organization?
        </label>
      </div>
      <div className="io__row io__btn">
        <div className="io__same__line">
          <div className="io__cancel">
            <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
              Back
            </Button>
          </div>
          <div className="io__approve">
            <Button type="submit" className="io__Approve__btn" onClick={handleSubmit}>
              Cancel Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelInviteModel
