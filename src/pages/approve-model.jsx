import React from 'react'
import ApproveModelComponent from '../components/ApproveModelPopup/ApproveModelpopup.Component'

const ApproveModel = props => {
    return (
        <React.Fragment>
            <ApproveModelComponent clickCloseButton={props.clickCloseButton} />
        </React.Fragment>
    )
}



export default ApproveModel
