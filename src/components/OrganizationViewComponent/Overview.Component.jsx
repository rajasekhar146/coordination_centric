import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './OrganizationView.component.css'
import StatusMenu from './StatusMenu'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Document } from 'react-pdf'

import Modal from '@mui/material/Modal'
import get from 'lodash.get';
import { organizationService } from '../../services'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const OverView = ( props ) => {
  const{orgDet,payment} = props
  const { orgId } = useParams()
  const history = useHistory()
  const [open, setOpen] = React.useState(false)
  const [previewFile, setPreviewFile] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const data = {
    type: 'Buffer',
    data: [
      37, 80, 68, 70, 45, 49, 46, 51, 10, 37, 255, 255, 255, 255, 10, 55, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47,
      84, 121, 112, 101, 32, 47, 80, 97, 103, 101, 10, 47, 80, 97, 114, 101, 110, 116, 32, 49, 32, 48, 32, 82, 10, 47,
      77, 101, 100, 105, 97, 66, 111, 120, 32, 91, 48, 32, 48, 32, 53, 57, 53, 46, 50, 56, 32, 56, 52, 49, 46, 56, 57,
      93, 10, 47, 67, 111, 110, 116, 101, 110, 116, 115, 32, 53, 32, 48, 32, 82, 10, 47, 82, 101, 115, 111, 117, 114,
      99, 101, 115, 32, 54, 32, 48, 32, 82, 10, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 54, 32, 48, 32, 111, 98,
      106, 10, 60, 60, 10, 47, 80, 114, 111, 99, 83, 101, 116, 32, 91, 47, 80, 68, 70, 32, 47, 84, 101, 120, 116, 32,
      47, 73, 109, 97, 103, 101, 66, 32, 47, 73, 109, 97, 103, 101, 67, 32, 47, 73, 109, 97, 103, 101, 73, 93, 10, 47,
      88, 79, 98, 106, 101, 99, 116, 32, 60, 60, 10, 47, 73, 49, 32, 56, 32, 48, 32, 82, 10, 62, 62, 10, 62, 62, 10,
      101, 110, 100, 111, 98, 106, 10, 53, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 76, 101, 110, 103, 116, 104,
      32, 55, 48, 10, 47, 70, 105, 108, 116, 101, 114, 32, 47, 70, 108, 97, 116, 101, 68, 101, 99, 111, 100, 101, 10,
      62, 62, 10, 115, 116, 114, 101, 97, 109, 10, 120, 156, 51, 84, 48, 0, 66, 93, 67, 32, 97, 97, 98, 168, 103, 97,
      169, 144, 156, 203, 85, 200, 101, 104, 104, 96, 164, 103, 108, 102, 100, 102, 100, 10, 81, 96, 110, 9, 150, 212,
      53, 50, 177, 208, 51, 53, 49, 52, 54, 52, 86, 176, 48, 128, 169, 215, 247, 52, 84, 112, 201, 231, 10, 228, 2, 0,
      75, 230, 15, 69, 10, 101, 110, 100, 115, 116, 114, 101, 97, 109, 10, 101, 110, 100, 111, 98, 106, 10, 49, 48, 32,
      48, 32, 111, 98, 106, 10, 40, 80, 68, 70, 75, 105, 116, 41, 10, 101, 110, 100, 111, 98, 106, 10, 49, 49, 32, 48,
      32, 111, 98, 106, 10, 40, 80, 68, 70, 75, 105, 116, 41, 10, 101, 110, 100, 111, 98, 106, 10, 49, 50, 32, 48, 32,
      111, 98, 106, 10, 40, 68, 58, 50, 48, 50, 49, 49, 48, 50, 53, 49, 51, 48, 51, 50, 49, 90, 41, 10, 101, 110, 100,
      111, 98, 106, 10, 57, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 80, 114, 111, 100, 117, 99, 101, 114, 32, 49,
      48, 32, 48, 32, 82, 10, 47, 67, 114, 101, 97, 116, 111, 114, 32, 49, 49, 32, 48, 32, 82, 10, 47, 67, 114, 101, 97,
      116, 105, 111, 110, 68, 97, 116, 101, 32, 49, 50, 32, 48, 32, 82, 10, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10,
      52, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 51, 32, 48, 32, 111,
      98, 106, 10, 60, 60, 10, 47, 84, 121, 112, 101, 32, 47, 67, 97, 116, 97, 108, 111, 103, 10, 47, 80, 97, 103, 101,
      115, 32, 49, 32, 48, 32, 82, 10, 47, 78, 97, 109, 101, 115, 32, 50, 32, 48, 32, 82, 10, 62, 62, 10, 101, 110, 100,
      111, 98, 106, 10, 49, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 84, 121, 112, 101, 32, 47, 80, 97, 103, 101,
      115, 10, 47, 67, 111, 117, 110, 116, 32, 49, 10, 47, 75, 105, 100, 115, 32, 91, 55, 32, 48, 32, 82, 93, 10, 62,
      62, 10, 101, 110, 100, 111, 98, 106, 10, 50, 32, 48, 32, 111, 98, 106, 10, 60, 60, 10, 47, 68, 101, 115, 116, 115,
      32, 60, 60, 10, 32, 32, 47, 78, 97, 109, 101, 115, 32, 91, 10, 93, 10, 62, 62, 10, 62, 62, 10, 101, 110, 100, 111,
      98, 106, 10,
    ],
  }
  //   function blobToFile(theBlob, fileName) {
  //     //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //     theBlob.lastModifiedDate = new Date()
  //     theBlob.name = fileName
  //     return theBlob
  //   }
  //   const myFile = blobToFile(data, 'safasf.pdf')

  const downloadFile = (blob, fileName) => {
    const link = document.createElement('a')
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob)
    console.log(link.href)
    setPreviewFile(link.href)
    link.download = fileName
    // some browser needs the anchor to be in the doc
    document.body.append(link)
    //link.click()
    link.remove()
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000)
  }

  //   fetch('https://api.csuite.health/files/download', {
  //     method: 'POST',
  //     body: JSON.stringify({ name: 'c-1635191875609.pdf' }),
  //     headers: {
  //       'x-access-token':
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTc3OWYxZjczZDc5ZmViNTdkZWI2YTMiLCJ1c2VyRW1haWwiOiJzdXBlcmFkbWluQHlvcG1haWwuY29tIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE2MzUyNDA4NDYsImV4cCI6MTYzNTMyNzI0Nn0.XRgELkxV_5Ximay3b0BZ3lO5qW6UkzNTy8FZ7_xKfHY',
  //       'Content-Type': 'application/json; charset=utf-8',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   })
  //     .then(function (res) {
  //       return res.json()
  //     })
  //     .then(function (data) {
  //       alert(JSON.stringify(data))
  //     })
  useEffect(() => {
    downloadFile(new Blob(data.data), 'myfile.pdf', { type: 'application/pdf' })
  }, [])


  const viewCertificates = async (fileName)=>{
    let certificateResponse = await organizationService.downloadFile({name:fileName});
    window.open(get(certificateResponse,["data","url"]), '_blank');
  }
 

  return (
    <div className="io_overview">
      <Accordion className="acc-wrapper">
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          //id="panel1a-header"
        >
          <Typography className="acc-title">Admin's Info</Typography>
        </AccordionSummary>
        <AccordionDetails className="modAccDetails">
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
              Name
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.admin && orgDet.admin[0] && orgDet.admin[0].fullName}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Email Address
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.admin && orgDet.admin[0] && orgDet.admin[0].email}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Phone Numbers
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.admin && orgDet.admin[0] && orgDet.admin[0].phoneNumber}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="acc-wrapper">
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="acc-title">Organization's info</Typography>
        </AccordionSummary>
        <AccordionDetails className="modAccDetails">
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
              Name
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.facilityName}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Email Address
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.facilityEmail}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Phone Numbers
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.facilityPhone}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Address
            </Typography>
            <div className="det-valContainer">
              <div>
                <div className="det-subtitle"><b>Address Line</b></div>
                <Typography
                  variant="subtitle2"
                  display="block"
                  className="det-value"
                  gutterBottom
                >
                  {orgDet && orgDet.facilityAddress}
                </Typography>
              </div>
              <div className="block-container">
                <div className="subTitle-block">
                  <div className="det-subtitle"><b>Country</b></div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    {orgDet && orgDet.country && orgDet.country}
                  </Typography>
                </div>
                <div className="subTitle-block">
                  <div className="det-subtitle"><b>State</b></div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    {orgDet && orgDet.state && orgDet.state}
                  </Typography>
                </div>
              </div>
              <div className="block-container">
                <div className="subTitle-block">
                  <div className="det-subtitle"><b>City</b></div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    {orgDet && orgDet.city && orgDet.city}
                  </Typography>
                </div>
                <div className="subTitle-block">
                  <div className="det-subtitle"><b>Zip code</b></div>
                  <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                    {orgDet && orgDet.facilityAddress}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              NPI
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.npi}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Tax ID
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.taxId}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Medical Id
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.medicalId}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Website
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.website}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              How did you hear about us?
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.about}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="acc-wrapper">
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="acc-title">Agreements</Typography>
        </AccordionSummary>
        <AccordionDetails className="modAccDetails">
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
              Business Associate Agreement
            </Typography>
            {orgDet && orgDet.business_certificate === '' ? (
              <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                ---
              </Typography>
            ) : (
              <div className="agreeContainer">
                <div className="agreeFile">
                  <DescriptionOutlinedIcon className="descicon" />
                  {orgDet.business_certificate}
                </div>
                <div className="agreeIcons">
                  {/* <RemoveRedEyeOutlinedIcon className="mod-icon" onClick={()=>{viewCertificates(orgDet.business_certificate)}} /> */}
                  <FileDownloadOutlinedIcon className="mod-icon" onClick={()=>{viewCertificates(orgDet.business_certificate)}}/>
                  {/* <MailOutlineOutlinedIcon className="mod-icon" /> */}
                  {/* <LocalPrintshopOutlinedIcon className="mod-icon" /> */}
                </div>
              </div>
            )}
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              SAAS Agreement
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.saas_certificate === '' ? (
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  ---
                </Typography>
              ) : (
                <div className="agreeContainer">
                  <div className="agreeFile">
                    <DescriptionOutlinedIcon className="descicon" />
                    {orgDet.saas_certificate}
                  </div>
                  <div className="agreeIcons">
                    {/* <RemoveRedEyeOutlinedIcon className="mod-icon" onClick={handleOpen} /> */}
                    <FileDownloadOutlinedIcon className="mod-icon" onClick={()=>{viewCertificates(orgDet.saas_certificate)}} />
                    {/* <MailOutlineOutlinedIcon className="mod-icon" /> */}
                    {/* <LocalPrintshopOutlinedIcon className="mod-icon" /> */}
                  </div>
                </div>
              )}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              EULA Agreement
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {orgDet && orgDet.eula_certificate === '' ? (
                <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
                  ---
                </Typography>
              ) : (
                <div className="agreeContainer">
                  <div className="agreeFile">
                    <DescriptionOutlinedIcon className="descicon" />
                    {orgDet.eula_certificate}
                  </div>
                  <div className="agreeIcons">
                    {/* <RemoveRedEyeOutlinedIcon className="mod-icon" onClick={handleOpen} /> */}
                    <FileDownloadOutlinedIcon className="mod-icon" onClick={()=>{viewCertificates(orgDet.eula_certificate)}}/>
                    {/* <MailOutlineOutlinedIcon className="mod-icon" /> */}
                    {/* <LocalPrintshopOutlinedIcon className="mod-icon" /> */}
                  </div>
                </div>
              )}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="acc-wrapper">
        <AccordionSummary
          className="mod_Accordion"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="acc-title">Organization's {payment?.type== "card"?"Card":"Banking"}  Info</Typography>
        </AccordionSummary>
{payment?.type== "account"?
        <AccordionDetails className="modAccDetails">
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
              Bank Account Number
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              **** **** **** {payment.last4}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Routing Number
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {payment.routing_number}
            </Typography>
          </div>
          <div className="detailWrapper">
            <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
              Name Associated with Bank Account
            </Typography>
            <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
              {payment.account_holder_name}
            </Typography>
          </div>
        </AccordionDetails>:
        <AccordionDetails className="modAccDetails">
        <div className="detailWrapper">
          <Typography variant="subtitle2" display="block" className="det-title" gutterBottom component="div">
            Card Number
          </Typography>
          <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
          **** **** **** {payment?.last4}
          </Typography>
        </div>
        <div className="detailWrapper">
          <Typography variant="subtitle2" display="block" className="det-title" gutterBottom>
            Card Type
          </Typography>
          <Typography variant="subtitle2" display="block" className="det-value" gutterBottom>
            {payment?.card}
          </Typography>
        </div>
         
      </AccordionDetails>}
    
      </Accordion>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        
    
          <Document file={{url:previewFile.url,
        
        withCredentials :true}} />
        </Box>
      </Modal>
    </div>
  )
}

export default OverView
