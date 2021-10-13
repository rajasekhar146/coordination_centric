import React from 'react'
import RejectModelComponent from '../components/ModelPopup/RejectModelpopup.Component'

const RejectModel = props => {
    return (
        <React.Fragment>
            <RejectModelComponent
                clickCloseButton={props.clickCloseButton}
                selectedOrg={props.selectedOrg}
            />
        </React.Fragment>
    )
}



export default RejectModel
