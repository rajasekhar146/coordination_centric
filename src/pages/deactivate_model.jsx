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
      />
    </React.Fragment>
  )
}

export default DeactivateModel
