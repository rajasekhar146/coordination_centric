import React from 'react'
import RejectModelComponent from '../components/ModelPopup/RejectModelpopup.Component'

const RejectModel = props => {
  return (
    <React.Fragment>
      <RejectModelComponent 
      clickCloseButton={props.clickCloseButton} 
      setSkip={props.setSkip}
      selectedOrg={props.selectedOrg} 
      setAlertMsg={props.setAlertMsg}
      setOrganizations={props.setOrganizations}
      setOpenFlash={props.setOpenFlash}
      setSubLabel={props.setSubLabel}
      setAlertColor={props.setAlertColor}
      getOrganization={props.getOrganization}
      />
    </React.Fragment>
  )
}

export default RejectModel
