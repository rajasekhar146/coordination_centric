import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './OrganizationView.component.css'
import StatusMenu from './StatusMenu'

import { organizationService } from '../../services'

const OrganizationViewComponent = () => {
  const { orgId } = useParams()
  const [orgDet, setOrgDetails] = useState({})

  useEffect(() => {
    getOrgDetails()
  }, [])

  const getOrgDetails = async () => {
    let orgDetails = await organizationService.getOrganizationDetails(orgId)
    setOrgDetails(orgDetails)
  }
  return (
    <div>
      <div className="headerCont">
        <Button variant="outlined" color="error" className="backBtn">
          Back
        </Button>
        <h5>{orgDet && orgDet.facilityName}</h5>
        {/* <StatusMenu></StatusMenu> */}
      </div>
      <Accordion>
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Admin's Info</Typography>
        </AccordionSummary>
        <AccordionDetails className="modAccDetails">
          <div className="detailWrapper">
            <Typography
              variant="subtitle2"
              display="block"
              style={{ flex: 0.6, textTransform: 'none' }}
              gutterBottom
              component="div"
            >
              Name
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.admin && orgDet.admin[0] && orgDet.admin[0].fullName}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              Email Address
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.admin && orgDet.admin[0] && orgDet.admin[0].email}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              Phone Numbers
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.admin && orgDet.admin[0] && orgDet.admin[0].phoneNumber}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Organization's info</Typography>
        </AccordionSummary>
        <AccordionDetails className="modAccDetails">
          <div className="detailWrapper">
            <Typography
              variant="subtitle2"
              display="block"
              style={{ flex: 0.6, textTransform: 'none' }}
              gutterBottom
              component="div"
            >
              Name
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.facilityName}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              Email Address
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.facilityEmail}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              Phone Numbers
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.facilityPhone}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              Address
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.facilityAddress}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              NPI
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.npi}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              Tax ID
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.taxId}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              Website
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.website}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" style={{ flex: 0.6, textTransform: 'none' }} gutterBottom>
              How did you hear about us?
            </Typography>
            <Typography variant="overline" display="block" style={{ flex: 1.4, textTransform: 'none' }} gutterBottom>
              {orgDet && orgDet.about}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Agreements</Typography>
        </AccordionSummary>
        <AccordionDetails className="modAccDetails">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Organization's Banking Info</Typography>
        </AccordionSummary>
        <AccordionDetails className="modAccDetails">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default OrganizationViewComponent
