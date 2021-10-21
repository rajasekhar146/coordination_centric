import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './LeftMenu.Component.css'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiListItem from '@material-ui/core/ListItem'

import history from '../../history'

import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: 'white',
      color: '#E42346',
      '& .MuiListItemIcon-root': {
        color: '#E42346',
      },
    },
    '&$selected:hover': {
      backgroundColor: '#E42346',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
    '&:hover': {
      backgroundColor: 'white',
      color: '#E42346',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  },
  selected: {
    color: 'red',
  },
})(MuiListItem)

const menuOptions = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: require('../../assets/icons/dashboard.png').default,
  },
  {
    name: 'Appointments',
    link: '/appointments',
    icon: require('../../assets/icons/appointments.png').default,
  },
  {
    name: 'Users',
    link: '/acceptance-criteria',
    icon: require('../../assets/icons/users.png').default,
  },
  {
    name: 'Organizations',
    link: '/organizations',
    icon: require('../../assets/icons/organizations.png').default,
  },
  {
    name: 'Patient Records',
    link: '/patients',
    icon: require('../../assets/icons/patients.png').default,
  },
  {
    name: 'Vaccinations',
    link: '/vaccinations',
    icon: require('../../assets/icons/vaccinations.png').default,
  },
  {
    name: 'Notifications',
    link: '/notifications',
    icon: require('../../assets/icons/notifications.png').default,
  },
  {
    name: 'Payments',
    link: '/payments',
    icon: require('../../assets/icons/payments.png').default,
  },
]

const LeftMenuComponent = () => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = (pageURL, index) => {
    //setOpen(!open);
    setSelectedIndex(index)
    console.log(pageURL, index)
    history.push(pageURL)
  }

  return (
    <div div className={classes.root}>
      <List>
        {menuOptions.map((m, index) => {
          return (
            <ListItem button selected={selectedIndex == index} onClick={event => handleClick(`${m.link}`, `${index}`)}>
              <ListItemIcon>
                <img src={m.icon} className="lm__menu__icon" />
              </ListItemIcon>
              <ListItemText primary={m.name} className="lm__menu__text" />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default LeftMenuComponent
