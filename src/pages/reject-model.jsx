import React from 'react'
import RejectModelComponent from '../components/ModelPopup/RejectModelpopup.Component'

const RejectModel = props => {
  return (
    <React.Fragment>
      <RejectModelComponent 
      clickCloseButton={props.clickCloseButton} 
      selectedOrg={props.selectedOrg} 
      setAlertMsg={props.setAlertMsg}
      />
    </React.Fragment>
  )
}

export default RejectModel
