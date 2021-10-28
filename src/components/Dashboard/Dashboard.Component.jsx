import React, { useState, useEffect } from 'react'
import './Dashboard.Component.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ReactHighcharts from 'highcharts-react-official'
import Highcharts from 'highcharts'
import TwoFaModel from './TwoFaModel'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { authenticationService } from '../../services'
import get from 'lodash.get'

// import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined'
// import AppointmentsIcon from '../../assets/icons/db_appointments.png'
// import NewPatientsIcon from '../../assets/icons/db_new_patients.png'
// import OperationsIcon from '../../assets/icons/db_operations.png'
// import HospitalEarningsIcon from '../../assets/icons/db_hospital_earnings.png'

const options = {
  chart: {
    type: 'areaspline',
    height: '300px',
  },
  title: {
    text: '',
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yAxis: {
    min: 0,
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    title: {
      text: '',
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: 'bold',
        color:
          // theme
          (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray',
      },
    },
  },
  legend: {
    align: 'right',
    x: -30,
    verticalAlign: 'top',
    y: 25,
    floating: true,
    backgroundColor: 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false,
    enabled: false,
  },
  // tooltip: {
  //     headerFormat: '<b>{point.x}</b><br/>',
  //     pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  // },
  plotOptions: {
    column: {
      stacking: 'normal',
      // dataLabels: {
      //     enabled: true
      // }
    },
  },
  series: [
    {
      data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 0, 2],
      color: '#E42346',
    },
  ],
}

const twoFaModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 360,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}

const DashboardComponent = () => {
  const [isOpen2FA, setIsOpen2FA] = useState(false)
  const currentUser = authenticationService.currentUserValue
  const twoFactor_auth_type = get(currentUser, ['data', 'data', 'twoFactor_auth_type'], false)

  useEffect(() => {
    var IsShow2FAPopup = localStorage.getItem('IsShow2FAPopup')
    console.log("name", IsShow2FAPopup, twoFactor_auth_type)

    if (IsShow2FAPopup === null && twoFactor_auth_type === 'none') {
      setIsOpen2FA(true)
      localStorage.setItem('IsShow2FAPopup', false)
    }
  }, [])

  const close2FaModel = () => {
    setIsOpen2FA(false)
  }

  return (
    <div className="db__main__div">
      <div className="io__flex__spcebetween">
        <Card
          sx={{
            width: '49%',
            background: '#fff',
            boxShadow: '0 2px 4px #00000029',
            borderRadius: '4px',
          }}
        >
          <CardContent>
            <Typography component="div" variant="h6">
              User Breakdown
            </Typography>
            <div className="io__flex__spcebetween ">
              <div>
                <h4 className="io__dashboard__card">158</h4>
                <label>TOTAL USERS</label>
              </div>
              <div>
                <h4 className="io__dashboard__card">158</h4>
                <label>NEW DOCTORS</label>
              </div>
              <div>
                <h4 className="io__dashboard__card">158</h4>
                <label>NEW PATIENTS</label>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: '49%',
            background: '#fff',
            boxShadow: '0 2px 4px #00000029',
            borderRadius: '4px',
          }}
        >
          <CardContent>
            <Typography component="div" variant="h6">
              Notifications
            </Typography>
            <div className="io__flex__spcebetween ">
              <div>
                <h4 className="io__dashboard__card">5</h4>
                <label>DOCTOR REQUESTS</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="io__flex__spcebetween">
        <Card
          sx={{
            width: '49%',
            background: '#fff',
            boxShadow: '0 2px 4px #00000029',
            borderRadius: '4px',
          }}
        >
          <CardContent>
            <Typography component="div" variant="h6">
              Total Patients
            </Typography>
            <ReactHighcharts highcharts={Highcharts} options={options}></ReactHighcharts>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: '49%',
            background: '#fff',
            boxShadow: '0 2px 4px #00000029',
            borderRadius: '4px',
          }}
        >
          <CardContent>
            <Typography component="div" variant="h6">
              Total Doctors
            </Typography>
            <ReactHighcharts highcharts={Highcharts} options={options}></ReactHighcharts>
          </CardContent>
        </Card>
      </div>
      <Modal
        open={isOpen2FA}
        // onClose={closeApproveModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={twoFaModelStyle}>
          <TwoFaModel clickCloseButton={close2FaModel} />
        </Box>
      </Modal>
    </div>
  )
}

export default DashboardComponent
