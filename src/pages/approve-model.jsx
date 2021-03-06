import React from 'react'
import ApproveModelComponent from '../components/ModelPopup/ApproveModelpopup.Component'

const ApproveModel = props => {
  return (
    <React.Fragment>
      <ApproveModelComponent 
      clickCloseButton={props.clickCloseButton} 
      getOrganization={props.getOrganization}
      setSkip={props.setSkip}
      selectedOrg={props.selectedOrg} 
      setAlertMsg={props.setAlertMsg}
      setOrganizations={props.setOrganizations}
      setOpenFlash={props.setOpenFlash}
      setSubLabel={props.setSubLabel}
      setAlertColor = {props.setAlertColor}
      />
    </React.Fragment>
  )
}

export default ApproveModel
