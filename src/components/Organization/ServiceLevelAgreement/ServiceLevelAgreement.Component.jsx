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
import downloadIcon from '../../../assets/icons/download_icon.png'
import printIcon from '../../../assets/icons/print_icon.png'
import html2canvas from 'html2canvas'
import { organizationService } from '../../../services'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import useStore from '../../../hooks/use-store'
import SigninStore from '../../../stores/signinstore'
import { useSelector, useDispatch } from 'react-redux'
import { newOrganization } from '../../../redux/actions/organizationActions'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import Icon from '@mui/material/Icon'

const useStyles = makeStyles(theme => ({
  datefield: {
    top: '22px',
    borderBottom: '1px solid #000000',
  },
}))

const steps = ['Acceptance Criteria', 'Service Level Agreement', 'Banking Information', 'T&C and Privacy Policy']

const ServiceLevelAgreementComponent = props => {
  const classes = useStyles()

  const [signature, setSignature] = useState({})
  const [value, setValue] = useState(new Date())
  const [processSteps, setProcessSteps] = React.useState(steps)
  const [IsDateEntered, setDateEntered] = useState(true)
  const [IsSigned, setSigned] = useState(true)

  const [signinStoreData] = useStore(SigninStore)

  const { organisationName } = signinStoreData

  var sigPad = {}

  const [facility, setFacility] = useState({})

  const [activeStep, setActiveStep] = React.useState(1)
  const [isVisible, setVisible] = useState(true)

  const newOrg = useSelector(state => state.newOrganization)
  const dispatch = useDispatch()
  const [showClearIcon, setShowClearIcon] = useState(false)
  const handleNext = async () => {
    // console.log('signature', sigPad.getTrimmedCanvas().toDataURL('image/png'))
    setDateEntered(value != null)
    var facility = JSON.parse(localStorage.getItem('facility'))
    facility.slaSign = sigPad.getCanvas().toDataURL('image/png')
    setSigned(!sigPad.isEmpty())
    if (value != null && sigPad != null && !sigPad.isEmpty()) {
      console.log('sign >> success')
      let domElement = document.getElementById('my-certificate')
      html2canvas(domElement).then(canvas => {
        var base64String = canvas.toDataURL()
        base64String = base64String.replace('data:image/png;base64,', '')

        const certificate = {
          name: base64String,
          type: 'certificate',
        }
        localStorage.setItem('facility', JSON.stringify(facility))
        organizationService.uploadCertificate(certificate, 'ServiceLevelAgreement')
      })
      // }
    } else console.log('sign >> failure')
  }

  const handleBack = () => {
    var nfacility = JSON.parse(localStorage.getItem('facility'))

    console.log('facility', nfacility)
    var referredBy = nfacility?.referred_by
    var inviteToken = nfacility?.inviteToken
    var invitedBy = nfacility?.invited_by

    if (referredBy === undefined || referredBy === null) referredBy = 0

    if (invitedBy === undefined || invitedBy === null) invitedBy = 0

    history.push(`/acceptance-criteria/${inviteToken}/${referredBy}/${invitedBy}`)
  }

  const captureSignature = () => {
    setSignature({ url: sigPad.getTrimmedCanvas().toDataURL('image/png') })
    console.log('signature', sigPad.getTrimmedCanvas().toDataURL('image/png'))
  }

  const onButtonClick = () => {
    setVisible(false)
    console.log('Child >> trigered')
    let domElement = document.getElementById('my-certificate')
    console.log(domElement)
    htmlToImage
      .toPng(domElement)
      .then(function (dataUrl) {
        console.log(dataUrl)
        //const pdf = new jsPDF();
        let pdf = new jsPDF('p', 'pt', 'letter')
        pdf.addImage(dataUrl, 'PNG', 20, 20, 580, 700)
        // const reader = new FileReader()
        // reader.readAsDataURL(pdf)
        pdf.save('download.pdf')
        // console.log('dataUrl', reader)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })

    setTimeout(() => {
      setVisible(true)
    }, 2000)
  }
  const handleClear = () => {
    if (signature) setSignature(null)

    sigPad.clear()

    console.log('clear', sigPad)

    setShowClearIcon(false)
  }

  const isEmptyObject = obj => {
    return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    var updateFacility = JSON.parse(localStorage.getItem('facility'))
    console.log('Service >> updateFacility', updateFacility)
    setFacility(updateFacility)

    setSignature(updateFacility.slaSign)
    sigPad.fromDataURL(updateFacility.slaSign)
    const planType = localStorage.getItem('plan_type')
    if (planType == undefined) localStorage.setItem('plan_type', 'F')
    if (planType?.trim().toLocaleUpperCase() === 'F') {
      const newSteps = steps.filter((step, i) => i != 2)
      setProcessSteps(newSteps)
      console.log('newSteps', newSteps)
    }
  }, [])

  const handleChange = () => {
    console.log('handleChange')
    setShowClearIcon(!sigPad.isEmpty())
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
              {processSteps.map((label, index) => {
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
              <div className="ac__main__div" id="my-certificate">
                <div className="ac__title__text">BUSINESS ASSOCIATE AGREEMENT </div>
                <div className="ac__subtitle__text">
                  For the purpose of registration please fill the required fields of this form to join our platform.
                </div>
                {isVisible && (
                  <div className="sla__download__print__section">
                    <div className="sla__download__print">
                      <div className="sla__download__text" onClick={onButtonClick}>
                        <img src={downloadIcon} alt="Download" /> &nbsp;&nbsp;&nbsp; Download
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <div className="ac__form">
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
                          {isVisible && (showClearIcon || signature) && (
                            <div className="sla__clear__icon">
                              <Icon onClick={handleClear}>
                                <CancelOutlinedIcon />
                              </Icon>
                            </div>
                          )}
                          <div className="sla__sign__container">
                            {/*signature && <img src={signature} alt="Sign" className="sla__sign__image" /> */}
                            {
                              <SignaturePad
                                canvasProps={{ className: 'sla__sign__pad' }}
                                ref={ref => {
                                  sigPad = ref
                                }}
                                onEnd={handleChange}
                              />
                            }
                            {/*<button onClick={captureSignature}>
                              <CancelOutlinedIcon />
                            </button>*/}
                          </div>
                          <div className="eulaa__label">Sign Here</div>
                          {!IsSigned && (
                            <div className="sla__text__align__center">
                              <p className="ac__required">Please sign here</p>
                            </div>
                          )}
                        </div>

                        <div className="eulaa__column">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={value}
                              onChange={newValue => {
                                setValue(newValue)
                              }}
                              minDate={new Date()}
                              maxDate={new Date()}
                              renderInput={params => <TextField {...params} variant="standard" />}
                              InputProps={{ className: 'sla__date__section' }}
                            />
                          </LocalizationProvider>
                          {/* {!IsDateEntered && (
                            <div className="sla__text__align__center">
                              <p className="ac__required">Please select the date</p>
                            </div>
                          )} */}
                          <div className="eulaa__label">Date</div>
                        </div>
                      </div>
                    </div>
                    <div className="sla__column eulaa__label user_name"> {organisationName}</div>
                    <div className="ac__gap__div"></div>
                    {isVisible && (
                      <div className="ac__row">
                        <div className="ac__column ac__left__action">
                          <Button color="inherit" className="ac__back__btn" onClick={handleBack}>
                            Back
                          </Button>
                        </div>

                        <div className="ac__column ac__right__action">
                          <Button className="ac__next__btn" onClick={handleNext}>
                            Save & Next
                            <ArrowForwardIosRoundedIcon />
                          </Button>
                        </div>
                      </div>
                    )}
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
