import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import RejectOrgIcon from '../../assets/icons/reject_org.png'
import { organizationService } from '../../services'
import get from 'lodash.get'

const DeactivateModel = props => {
  const { selectedOrg, setSkip, setOrganizations, setOpenFlash, setAlertMsg, setSubLabel } = props

    const handleSubmit = () => {
        const res = organizationService.updateOrganization(selectedOrg.id, 'inactive')
        res.then((res) => {
            setOrganizations([])
            setSkip(1)
            setOpenFlash(true)
            setAlertMsg('Deactivated')
            setSubLabel('This account was deactivated, users no longer have access.')
            props.clickCloseButton()
        })
    }

  return (
    <div className="io__main__div">
      <div className="io__row io__icon">
        <img src={RejectOrgIcon} alt="Approve Org" />
      </div>
      <div className="io__row io__text__center io_width97 ">
        <label className="io__title">Do you want to Deactivate this account?</label>
      </div>
      <div className="io__row io__text__center io_width93">
        <label className="io__conform__title">
          The organization will be suspended and will lose the access to their account.
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
            <Button type="submit" className="io__Approve__btn" onClick={handleSubmit}>
              Deactivate
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeactivateModel
