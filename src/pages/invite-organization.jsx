import React from 'react'
import InviteOrganizationComponent from '../components/InviteOrganization/InviteOrganization.Component'

const InviteOrganization = props => {
  return (
    <div>
      <InviteOrganizationComponent clickCloseButton={props.clickCloseButton} />
    </div>
  )
}

export default InviteOrganization
