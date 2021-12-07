import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import ApproveOrgIcon from '../../assets/icons/approve_org.png'
import { organizationService } from '../../services'

const ApproveModel = props => {
  const { selectedOrg, setSkip, setOrganizations, setOpenFlash, setAlertMsg, setSubLabel } = props

  const handleSubmit = async () => {
    const params = {
      facilityId: selectedOrg.id,
    }
    console.log('Approve Model Popup', params)
    const response = await organizationService.subscriptionOrganization(params).catch(err => {
      console.log(err)
    })
    console.log('Approve Model Popup >> 1 ', response)
    if (response.status === 200) {
      const res = await organizationService.updateOrganization(selectedOrg.id, 'active').catch(err => {
        console.log(err)
      })
      if (res.status === 200) {
        setOrganizations([])
        setSkip(1)
        setOpenFlash(true)
        setAlertMsg('Verified')
        setSubLabel('This account was successfully verified.')
        props.clickCloseButton()
      }
    }
  }

  return (
    <div className="io__main__div">
      <div className="io__row io__icon">
        <img src={ApproveOrgIcon} alt="Approve Org" />
      </div>
      <div className="io__row io__text__center">
        <label className="io__title">Approve Organization</label>
      </div>
      <div className="io__row io__text__center">
        <label className="io__conform__title">Are you sure you want to approve this organization?</label>
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
              Approve
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproveModel
