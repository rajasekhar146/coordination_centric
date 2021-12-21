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
import CompleateProfile from './CompleateProfile.Component'
import { useSelector, useDispatch } from 'react-redux'
import { setCopmletPropfilePopup, setSkip2fa } from '../../redux/actions/commonActions'
import dashboardComponentConfig from './DashboardComponentConfig'
import ActivePatient from './ActivePatient'
import ActiveOrganizations from './ActiveOrganizations'
import ActivePatientsperOrganization from './ActivePatientsperOrganization'
import UnassignedReadings from './UnassignedReadings'
import OtherUsers from './OtherUsers'
import ActiveUsers from './ActiveUsers'
import TotalUsers from './TotalUsers'
import Alerts from './Alerts'
import AcitveDoctors from './AcitveDoctor'
import Adherence from './Adherence'
import Appointments from './Appointments'
import LastLoggedIn from './LastLoggedIn'
import ReadingsFromLastweek from './ReadingsFromLastweek'
import TotalAppointments from './TotalAppointments'
import OrderstoExpireinXdays from './OrderstoExpireinXdays'
import TotalOnboardings from './TotalOnboardings'
import { dashboardService } from '../../services'
import AppointmentList from './AppointmentList'
import history from '../../history'

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

const completModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 380,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}


const componenetsMap = {
  ActivePatient: {
    component: ActivePatient,
    componentProps: {

    },
  },
  ActiveOrganizations: {
    component: ActiveOrganizations,
    componentProps: {

    },
  },
  ActivePatientsperOrganization: {
    component: ActivePatientsperOrganization,
    componentProps: {

    },
  },
  TotalAppointments: {
    component: TotalAppointments,
    componentProps: {

    },
  },
  UnassignedReadings: {
    component: UnassignedReadings,
    componentProps: {

    },
  },
  OtherUsers: {
    component: OtherUsers,
    componentProps: {

    },
  },
  ActiveUsers: {
    component: ActiveUsers,
    componentProps: {

    },
  },
  TotalUsers: {
    component: TotalUsers,
    componentProps: {

    },
  },
  Alerts: {
    component: Alerts,
    componentProps: {

    },
  },
  AcitveDoctors: {
    component: AcitveDoctors,
    componentProps: {

    },
  },
  Adherence: {
    component: Adherence,
    componentProps: {

    },
  },
  Appointments: {
    component: Appointments,
    componentProps: {

    },
  },
  LastLoggedIn: {
    component: LastLoggedIn,
    componentProps: {

    },
  },
  ReadingsFromLastweek: {
    component: ReadingsFromLastweek,
    componentProps: {

    },
  },
  OrderstoExpireinXdays: {
    component: OrderstoExpireinXdays,
    componentProps: {

    },
  },
  // OrganizationOnboardings: {
  //   component: OrganizationOnboardings,
  //   componentProps: {

  //   },
  // },
  AppointmentList: {
    component: AppointmentList,
    componentProps: {

    },
  },
  TotalOnboardings: {
    component: TotalOnboardings,
    componentProps: {

    },
  }
};

const DashboardComponent = () => {
  const dispatch = useDispatch()
  const [isOpen2FA, setIsOpen2FA] = useState()
  const [isOpenCompleateProfile, setIsOpenCompleateProfile] = useState(useSelector(state => state.completeProfile))
  const currentUser = authenticationService.currentUserValue
  const last_login_time = get(currentUser, ['data', 'data', 'last_login_time'], false)
  const userId = get(currentUser, ['data', 'data', '_id'], '')
  const role = get(currentUser, ['data', 'data', 'role'], '')
  const [elementsStats, setElementStats] = useState([])
  const [dashboardDetails, setDashboardDetails] = useState(null)
  const isLoggedToken = get(JSON.parse(localStorage.getItem('currentUser')), ['data', 'token'], null)
  const [twoFaSkipped, setSkipTwoFa] = useState(useSelector(state => state.skipTwoFaValue))



  useEffect(() => {
    if (!isLoggedToken) {
      history.push('signin')
    }
    if (!last_login_time && !twoFaSkipped) {
      setIsOpen2FA(true)
      // localStorage.setItem('IsShow2FAPopup', false)
    }
    setElementStats(dashboardComponentConfig[role])
    getDashboardDetails()
  }, [])
  
  const isShowCopleateProfile = () => {
    switch(role) {
      case 'doctor':
      case 'patient':
        return true;
        break;
      default:
        return false;
    }
  }

  const close2FaModel = () => {
    // const res = authenticationService.skipTwoFa()
    // res.then(data => {
    //   // setIsOpenCompleateProfile(true)
    //   // dispatch(setCopmletPropfilePopup(true))
    // })
    setIsOpen2FA(false)

    if(isShowCopleateProfile()) {
      setIsOpenCompleateProfile(true)
    }
    dispatch(setSkip2fa(true))
  }


  const getDashboardDetails = async () => {
    const res = await dashboardService.getDashboardDetails(role)
    if (res.status === 200) {
      setDashboardDetails(get(res, ['data', 'data'], {}))
    } else {

    }
  }




  const checkDoctorOrPatent = () => {
    switch (role) {
      // case 'doctor':
      case 'patient':
        return false
        break;
      default:
        return false
    }
  }



  return (
    <div className="dashboard__main__div">
      <div className="io__flex__spcebetween">
        {
          elementsStats.map((elem, index) => {
            const component = componenetsMap[elem];
            const componentProp = component.componentProps;
            if (component) {
              const CompName = component.component;
              return (
                <CompName
                  key={index}
                  componentProp={componentProp}
                  role={role}
                  checkDoctorOrPatent={checkDoctorOrPatent}
                  dashboardDetails={dashboardDetails}
                  last_login_time={last_login_time}
                />
              );
            }
            return null;
          })
        }

        {/* <Card
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
        </Card> */}
      </div>
      <Modal
        open={isOpen2FA}
        // onClose={closeApproveModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={twoFaModelStyle}>
          <TwoFaModel
            clickCloseButton={close2FaModel}
            setIsOpenCompleateProfile={setIsOpenCompleateProfile}
          />
        </Box>
      </Modal>
      <Modal
        open={isOpenCompleateProfile}
        // onClose={closeApproveModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={twoFaModelStyle}>
          <CompleateProfile
            clickCloseButton={close2FaModel}
            setIsOpenCompleateProfile={setIsOpenCompleateProfile}
            userId={userId}
          />
        </Box>
      </Modal>
    </div>
  )
}

export default DashboardComponent
