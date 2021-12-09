import React from 'react'
import InviteOrganizationComponent from '../components/InviteOrganization/InviteOrganization.Component'

const InviteOrganization = props => {
  return (
    <div>
      <InviteOrganizationComponent
        clickCloseButton={props.clickCloseButton}
        setOpenFlash={props.setOpenFlash}
        setAlertMsg={props.setAlertMsg}
        setAlertColor={props.setAlertColor}
        setSubLabel={props.setSubLabel}
      />
    </div>
  )
}

export default InviteOrganization
