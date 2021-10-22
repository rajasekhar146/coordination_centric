import React from 'react'
import ApproveModelComponent from '../components/ModelPopup/ApproveModelpopup.Component'

const ApproveModel = props => {
  return (
    <React.Fragment>
      <ApproveModelComponent 
      clickCloseButton={props.clickCloseButton} 
      setSkip={props.setSkip}
      selectedOrg={props.selectedOrg} />
    </React.Fragment>
  )
}

export default ApproveModel
