import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import get from 'lodash.get'
import TabPanel from '../TabPanel/TabPanel.Component';
import UpcomingAppointments from './UpcomingAppointments.Component'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import './Appointment.Component.css'

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





const AppointmentsComponent = () => {
  const classes = useStyles()
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="od__main__div">
      <div className="od__row">
        <div className="od__title__text">My Appointments</div>
        <div className="od__btn__div od__align__right">

        </div>
      </div>
      <div className="od__row">
        <div className="od__table__org">
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
          <TabPanel value={value} index={1}>
            <UpcomingAppointments />
          </TabPanel>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsComponent
