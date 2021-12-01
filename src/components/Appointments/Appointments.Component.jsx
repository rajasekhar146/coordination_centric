import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import get from 'lodash.get'
import TabPanel from '../TabPanel/TabPanel.Component';
import UpcomingAppointments from './UpcomingAppointments.Component'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@mui/material/Button'
import './Appointment.Component.css'
import CalenderView from '../../assets/icons/resend_calender.png'
import GtidView from '../../assets/icons/grid_view.png'
import Alert from '../Alert/Alert.component'
import { useSelector, useDispatch } from 'react-redux'
import { setFlashMsg } from '../../redux/actions/commonActions'


const useStyles = makeStyles(theme => ({
  indicator: {
    backgroundColor: "#E42346",
    height: "3px"
  }
}));

const TabItem = withStyles((theme) => ({
  root: {
    backgroundColor: '#F6F8FB',
    color: '#667085',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#F6F8FB',
      color: '#667085',
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 500,
    },
    '&$selected': {
      backgroundColor: '#F6F8FB',
      color: '#E42346',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  tab: {
    padding: '0.5rem',
    fontFamily: 'Open Sans',
    fontSize: '2rem',
    backgroundColor: 'grey',
    color: 'black',
    '&:hover': {
      backgroundColor: 'red',
      color: 'white',
      opacity: 1,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />)





const AppointmentsComponent = (props) => {
  const {
    handleNavigation
  } = props;
  const dispatch = useDispatch()

  const classes = useStyles()
  const [value, setValue] = useState('1');
  const [showGrid, setShowGrid] = useState(true);
  const [openflash, setOpenFlash] = React.useState(useSelector(state => state.flashMsgObj.openFlash))
  const [alertMsg, setAlertMsg] = React.useState(useSelector(state => state.flashMsgObj.alertMsg))
  const [subLebel, setSubLabel] = useState(useSelector(state => state.flashMsgObj.subLabel))

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
    dispatch(setFlashMsg({
      openFlash: false,
      alertMsg: '',
      subLabel: ''
    }))
  }

  return (
    <div className="od__main__div">
      <div className="od__row">
        <div className="od__title__text">My Appointments</div>
        <div className="od__btn__div od__align__right">

        </div>
      </div>
      <div className="od__row">
        <Tabs
          value={value}
          // textColor="secondary"
          // indicatorColor="secondary"
          onChange={handleChange}
          aria-label="secondary tabs example"
          inkBarStyle={{ background: 'red' }}
          TabIndicatorProps={{ className: classes.indicator }}
        >
          <TabItem value="1" label="Upcoming" />
          <TabItem value="2" label="History" />
        </Tabs>
        <div className="io_view_as">
          View as: <div className="io_handle_view">
            <span
              onClick={() => {
                setShowGrid(true)
              }}
              className={showGrid ? "io_grid_item io_active" : 'io_grid_item'} >
              <img src={GtidView} alt="grid_view" />
            </span>
            <span
              onClick={() => {
                setShowGrid(false)
              }}
              className={!showGrid ? "io_grid_item io_active" : 'io_grid_item'}>
              <img src={CalenderView} alt="calender_view" />
            </span>

          </div>
        </div>
      </div>
      <TabPanel value={value} index={1}>
        <UpcomingAppointments
          showGrid={showGrid}
          setAlertMsg={setAlertMsg}
          setSubLabel={setSubLabel}
          setOpenFlash={setOpenFlash}
          type="upcoming"
          handleNavigation={handleNavigation}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UpcomingAppointments
          showGrid={showGrid}
          setAlertMsg={setAlertMsg}
          setSubLabel={setSubLabel}
          setOpenFlash={setOpenFlash}
          type="history"
        />
      </TabPanel>
      <Alert
        handleCloseFlash={handleCloseFlash}
        alertMsg={alertMsg}
        openflash={openflash}
        subLebel={subLebel}
      />
    </div>
  )
}

export default AppointmentsComponent
