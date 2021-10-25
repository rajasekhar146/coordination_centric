import React from 'react'
import DeactivateModelComponent from '../components/ModelPopup/DeactivateModelPopup.Component'

const DeactivateModel = props => {
  return (
    <React.Fragment>
      <DeactivateModelComponent 
      clickCloseButton={props.clickCloseButton} 
      selectedOrg={props.selectedOrg}
      setSkip={props.setSkip}
      setOrganizations={props.setOrganizations}
      setOpenFlash={props.setOpenFlash}
      setAlertMsg={props.setAlertMsg}
    />
    </React.Fragment>
  )
}

export default DeactivateModel
