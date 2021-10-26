import React from 'react'
import OrganizationViewComponent from '../components/OrganizationViewComponent/OrganizationView.Component'
import { StyledEngineProvider } from '@mui/material/styles'
import { useParams } from 'react-router'

const OrganizationView = props => {
  const { orgId } = useParams()
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <OrganizationViewComponent orgId={orgId} />
      </StyledEngineProvider>
    </div>
  )
}

export default OrganizationView
