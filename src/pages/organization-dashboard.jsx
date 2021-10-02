import React from 'react'
import OrganizationDashboardComponent from '../components/OrganizationDashboard/OrganizationDashboard.Component'
import { StyledEngineProvider } from '@mui/material/styles';

const OrganizationDashboard = () => {
    return (
        <div>
            <StyledEngineProvider injectFirst>
                <OrganizationDashboardComponent />
            </StyledEngineProvider>
        </div>
    )
}

export default OrganizationDashboard
