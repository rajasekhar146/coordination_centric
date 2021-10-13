import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import './ServiceLevelAgreement.Component.css'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import headerImage from '../../../assets/images/header_image.png'
import Button from '@mui/material/Button'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import history from '../../../history'

import SignaturePad from 'react-signature-canvas'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import jsPDF from 'jspdf'
import * as htmlToImage from 'html-to-image'

const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Policies']

const ServiceLevelAgreementComponent = props => {
  const [signatureUrl, setSignature] = useState({})
  const [value, setValue] = useState(null)
  var sigPad = {}

  const [activeStep, setActiveStep] = React.useState(1)

  const handleNext = () => {
    history.push('/saas-agreement')
  }

  const handleBack = () => {
    history.push('/acceptance-criteria')
  }

  const captureSignature = () => {
    setSignature({ signatureUrl: sigPad.getTrimmedCanvas().toDataURL('image/png') })
  }

  const onButtonClick = () => {
    console.log('Child >> trigered')
    let domElement = document.getElementById('my-node')
    console.log(domElement)
    htmlToImage
      .toPng(domElement)
      .then(function (dataUrl) {
        console.log(dataUrl)
        //const pdf = new jsPDF();
        let pdf = new jsPDF('p', 'pt', 'letter')
        pdf.addImage(dataUrl, 'PNG', 4, 4, 620, 770)
        // const reader = new FileReader()
        // reader.readAsDataURL(pdf)
        pdf.save('download.pdf')
        // console.log('dataUrl', reader)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
  }

  return (
    <div className="ob__main__section">
      <div className="ob__align__center">
        <div className="ob__header__section">
          <img src={headerImage} alt="logo" />
        </div>
        <div className="ob__content__section">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            {
              <div className="ac__main__div">
                <div className="ac__title__text">BUSINESS ASSOCIATE AGREEMENT </div>
                <div className="ac__subtitle__text">
                  For the purpose of registration please fill the required fields of this form to join our platform.
                </div>
                <div>
                  <div  className="ac__form">
                    <div id="my-node">
                      <div className="ac__row">
                        <div className="ac__column">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes, ac venenatis lacus, at.
                          Lacus, turpis nascetur faucibus aliquet dignissim neque aliquet vehicula at. Magna vitae eget
                          leo viverra sit bibendum ullamcorper nullam pretium. Faucibus risus fermentum, amet faucibus
                          et scelerisque. Fringilla amet in tempus tincidunt. Accumsan neque nibh proin suspendisse
                          tortor, arcu, fusce rhoncus leo. Ante duis enim, congue ut arcu arcu, adipiscing. At placerat
                          urna, tristique praesent etiam varius sit. Integer neque donec facilisis non nibh facilisis.
                          <br />
                          <br />
                          Enim nunc vulputate velit amet molestie. Tempus facilisi congue viverra id velit, etiam. Vitae
                          nulla cursus commodo id velit odio aenean purus, et. Sed nibh adipiscing egestas tristique.
                          Vulputate elementum eget cras eleifend pharetra. Quam tempor mauris suspendisse sed ipsum
                          integer. Enim quisque malesuada nec diam amet enim adipiscing mattis. Aliquam tincidunt nec
                          ultricies lacus, velit. Massa nisl venenatis in quis suspendisse. Leo molestie gravida
                          vestibulum aenean et ultricies vulputate. Magna lobortis feugiat ipsum habitant diam elementum
                          et facilisis.
                          <br />
                          <br />
                          Orci integer nibh nunc, molestie nisl libero. Parturient ut sodales odio quisque varius semper
                          eu eu. Tellus sit lacinia turpis lobortis. Commodo odio consectetur nec arcu. Sapien enim
                          penatibus facilisis proin sed nulla eget. Pretium maecenas venenatis, elit nec diam sagittis,
                          sit ut velit.
                          <br />
                          <br />
                          Velit ac eget senectus nullam nulla maecenas risus adipiscing. Lectus urna, habitant nam
                          dictumst at fringilla mauris urna in. Consectetur eleifend non porttitor eget. Non id ante
                          aliquet tellus, aliquet diam condimentum. Nunc nulla consectetur ultricies velit, ac elit
                          ornare arcu. Aliquet faucibus vitae pharetra sit molestie amet morbi mauris dictum. Maecenas
                          faucibus lectus erat aenean egestas et aenean. Augue quam elit id donec. Eget morbi varius
                          malesuada lacus, sit orci at.
                          <br />
                          <br />
                          In ac odio et quam dui dolor. Nulla facilisis id eu, et velit enim semper sagittis. Eget
                          aliquam elementum vitae cras sapien praesent. Congue sit in quam tristique lacus. Convallis
                          tincidunt diam id sollicitudin pellentesque risus adipiscing. Ac neque ullamcorper amet,
                          cursus. Quis faucibus volutpat nisi tincidunt arcu, libero, risus platea nisl. Et sed aliquet
                          ac ipsum sit eleifend sed. Aliquet auctor tristique imperdiet ultrices nullam laoreet enim sed
                          id. Sed et in malesuada nibh consectetur euismod sed. Aliquam nec volutpat volutpat, arcu,
                          commodo donec tristique volutpat sed.
                          <br />
                          <br />
                          Proin nulla dolor, ipsum lectus. Facilisis condimentum nulla feugiat vel mauris, pellentesque
                          est aliquet ac. Viverra morbi ipsum eu mauris, cras nec nec adipiscing lacus. Nunc facilisis
                          lacus, nisi ullamcorper. Neque nisl eget pharetra, proin sagittis ipsum sed diam elementum.
                          Laoreet fusce dolor morbi integer. Facilisis eget nulla gravida nam quam a nunc ut. Rhoncus
                          neque, scelerisque enim nulla purus. Velit condimentum sagittis dignissim et cras elit est.
                          <br />
                          <br />
                          Quis velit ultricies egestas risus proin justo. Sagittis nunc, sed tellus diam. Cursus neque
                          nisl at neque, pellentesque. Tincidunt ante amet, gravida eget non vestibulum ac odio
                          tincidunt. Feugiat nibh ut a, nibh vestibulum mattis dignissim nisl.
                          <br />
                          <br />
                          Amet vitae hac vitae nec amet lacus, diam, eget. Neque lobortis nunc augue lorem scelerisque
                          faucibus scelerisque. At mi sit urna mi integer. Gravida malesuada placerat in vehicula
                          pellentesque diam. Aenean fermentum augue ac, integer semper pellentesque. Platea nisl non
                          augue sed proin eu purus sagittis. Cras feugiat vitae, neque metus, cursus turpis ut potenti.
                          Id augue sed vulputate dui. Vel mattis dui proin netus.
                          <br />
                          <br />
                          Viverra lacus, ut enim cras nunc odio magna nunc. Quisque iaculis sit est, quis. Lacus orci ut
                          a quam facilisis nibh. Habitasse vel feugiat ultricies a. Massa ac mattis posuere urna. Neque
                          pellentesque odio sagittis, dignissim sed ornare in ullamcorper a. Facilisis aliquet diam amet
                          egestas vitae rutrum euismod. Id vitae, aliquam neque pretium ultrices pulvinar ipsum varius
                          sed. Aliquam venenatis odio volutpat commodo mauris pretium massa vitae a.
                        </div>
                      </div>

                      <div className="eulaa__row">
                        <div className="sla__column">
                          <div className="eulaa__label">Sign Here</div>
                          <div className="sla__sign__container">
                            <SignaturePad
                              canvasProps={{ className: 'sla__sign__pad' }}
                              ref={ref => {
                                sigPad = ref
                              }}
                            />
                          </div>
                        </div>

                        <div className="eulaa__column">
                          <div className="eulaa__label">Date</div>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={value}
                              onChange={newValue => {
                                setValue(newValue)
                              }}
                              renderInput={params => <TextField {...params} variant="standard" />}
                              InputProps={{ className: 'sla__date__section' }}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                    <div className="ac__gap__div"></div>

                      <div className="ac__row">
                        <div className="ac__column ac__left__action">
                          <Button color="inherit" className="ac__back__btn" onClick={handleBack}>
                            Back
                          </Button>
                        </div>

                        <div className="ac__column ac__right__action">
                          <Button className="ac__next__btn" onClick={onButtonClick}>
                            Download PDF
                          </Button>{' '}
                          &nbsp;&nbsp;&nbsp;
                          <Button className="ac__next__btn" onClick={handleNext}>
                            Save & Next
                            <ArrowForwardIosRoundedIcon />
                          </Button>
                        </div>
                      </div>
                      
                  </div>

                  
                  <div className="ac__gap__bottom__div"></div>
                </div>
              </div>
            }
          </Box>
        </div>
      </div>
    </div>
  )
}

export default ServiceLevelAgreementComponent
