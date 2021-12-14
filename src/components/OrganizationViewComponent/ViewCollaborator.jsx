import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import Button from '@mui/material/Button'
import './OrganizationView.component.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { organizationService, authenticationService } from '../../services'
import Overview from './Overview.Component';
import get from 'lodash.get'


const ViewCollaboratorComponent = (props) => {
    const { id } = useParams()
    const [orgDet, setOrgDetails] = useState({})
    const [paymentDetails, setPaymentDetails] = useState({})
    const history = useHistory()
    const currentUser = authenticationService.currentUserValue
    const role = get(currentUser, ['data', 'data', 'role'], false)


    const getOrgDetails = async () => {
        let orgDetails = await organizationService.getOrganizationDetails(id)
        setOrgDetails(orgDetails.data);
        setPaymentDetails(orgDetails.payment);
    }

    useEffect(() => {
        getOrgDetails()
    }, [])

    return (
        <div className="od__main__div">
            <div className="od__row od_flex_space_between">
                <div className="headerCont">
                    <Button
                        variant="outlined"
                        color="error"
                        className="backBtn"
                        onClick={() => {
                            if(role === 'admin') {
                                history.push('/collaborators')
                            } else {
                                history.goBack()
                            }
                        }}
                    >

                        <ArrowBackIosNewIcon style={{ fontSize: '10', marginRight: '4' }} /> Back
                    </Button>
                    <h5 className="orgTitle">{orgDet && orgDet.facilityName}</h5>

                </div>
            </div>

            <Overview orgDet={orgDet} payment={paymentDetails} />



        </div >
    )
}

export default ViewCollaboratorComponent
