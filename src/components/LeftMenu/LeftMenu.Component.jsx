import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './LeftMenu.Component.css'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiListItem from '@material-ui/core/ListItem'

import history from '../../history'
import Collapse from '@material-ui/core/Collapse'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { authenticationService } from '../../services'
import get from 'lodash.get'

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
    activeIcon: require('../../assets/icons/active_dashboard.png').default,
    items: [],
  },
  {
    name: 'Appointments',
    link: '/appointments',
    icon: require('../../assets/icons/appointments.png').default,
    activeIcon: require('../../assets/icons/appointments.png').default,
    items: [],
  },
  {
    name: 'Users',
    link: '/users',
    icon: require('../../assets/icons/users.png').default,
    activeIcon: require('../../assets/icons/users.png').default,
    items: [
      {
        name: 'Staff',
        link: '/users',
        icon: require('../../assets/icons/users.png').default,
        activeIcon: require('../../assets/icons/users.png').default,
      },
      {
        name: 'Collaborators',
        link: '/users',
        icon: require('../../assets/icons/users.png').default,
        activeIcon: require('../../assets/icons/users.png').default,
      },
      {
        name: 'Patient Records',
        link: '/patientrecords',
        icon: require('../../assets/icons/users.png').default,
        activeIcon: require('../../assets/icons/users.png').default,
      },
    ],
  },
  {
    name: 'Organizations',
    link: '/organizations',
    icon: require('../../assets/icons/organizations.png').default,
    activeIcon: require('../../assets/icons/sitemap_active.png').default,
    items: [],
  },
  // {
  //   name: 'Patient Records',
  //   link: '/patients',
  //   icon: require('../../assets/icons/patients.png').default,
  //   items: [],
  // },
  {
    name: 'Inventory',
    link: '/inventory',
    icon: require('../../assets/icons/vaccinations.png').default,
    activeIcon: require('../../assets/icons/vaccinations.png').default,
    items: [],
  },
  {
    name: 'Notifications',
    link: '/notifications',
    icon: require('../../assets/icons/notifications.png').default,
    activeIcon: require('../../assets/icons/notifications.png').default,
    items: [],
  },
  {
    name: 'Payments',
    link: '/payments',
    icon: require('../../assets/icons/payments.png').default,
    activeIcon: require('../../assets/icons/payments.png').default,
    items: [],
  },
]


const getMenuList = (role) => {
  switch (role) {
    case 'superadmin':
      return [
        {
          name: 'Dashboard',
          link: '/dashboard',
          icon: require('../../assets/icons/dashboard.png').default,
          activeIcon: require('../../assets/icons/active_dashboard.png').default,
          items: [],
        },
        // {
        //   name: 'Appointments',
        //   link: '/appointments',
        //   icon: require('../../assets/icons/appointments.png').default,
        //   activeIcon: require('../../assets/icons/appointments.png').default,
        //   items: [],
        // },
        {
          name: 'Organizations',
          link: '/organizations',
          icon: require('../../assets/icons/organizations.png').default,
          activeIcon: require('../../assets/icons/sitemap_active.png').default,
          items: [],
        },
        // {
        //   name: 'Patient Records',
        //   link: '/patients',
        //   icon: require('../../assets/icons/patients.png').default,
        //   items: [],
        // },
        {
          name: 'Inventory',
          link: '/inventory',
          icon: require('../../assets/icons/vaccinations.png').default,
          activeIcon: require('../../assets/icons/vaccinations.png').default,
          items: [],
        },
        {
          name: 'Notifications',
          link: '/notifications',
          icon: require('../../assets/icons/notifications.png').default,
          activeIcon: require('../../assets/icons/notifications.png').default,
          items: [],
        },
        {
          name: 'Payments',
          link: '/payments',
          icon: require('../../assets/icons/payments.png').default,
          activeIcon: require('../../assets/icons/payments.png').default,
          items: [],
        },
      ]
      break
      case 'doctor':
        return [
          {
            name: 'Dashboard',
            link: '/dashboard',
            icon: require('../../assets/icons/dashboard.png').default,
            activeIcon: require('../../assets/icons/active_dashboard.png').default,
            items: [],
          },
          {
            name: 'Appointments',
            link: '/appointments',
            icon: require('../../assets/icons/appointments.png').default,
            activeIcon: require('../../assets/icons/appointments.png').default,
            items: [],
          },
         
          // {
          //   name: 'Marketplace',
          //   link: '/marketplace',
          //   icon: require('../../assets/icons/vaccinations.png').default,
          //   activeIcon: require('../../assets/icons/vaccinations.png').default,
          //   items: [],
          // },
          {
            name: 'Notifications',
            link: '/notifications',
            icon: require('../../assets/icons/notifications.png').default,
            activeIcon: require('../../assets/icons/notifications.png').default,
            items: [],
          },
          {
            name: 'Payments',
            link: '/payments',
            icon: require('../../assets/icons/payments.png').default,
            activeIcon: require('../../assets/icons/payments.png').default,
            items: [],
          },
        ]
        break
      case 'patient':
        return [
          {
            name: 'Dashboard',
            link: '/dashboard',
            icon: require('../../assets/icons/dashboard.png').default,
            activeIcon: require('../../assets/icons/active_dashboard.png').default,
            items: [],
          },
          {
            name: 'Appointments',
            link: '/appointments',
            icon: require('../../assets/icons/appointments.png').default,
            activeIcon: require('../../assets/icons/appointments.png').default,
            items: [],
          },
         
          {
            name: 'Marketplace',
            link: '/marketplace',
            icon: require('../../assets/icons/vaccinations.png').default,
            activeIcon: require('../../assets/icons/vaccinations.png').default,
            items: [],
          },
          {
            name: 'Notifications',
            link: '/notifications',
            icon: require('../../assets/icons/notifications.png').default,
            activeIcon: require('../../assets/icons/notifications.png').default,
            items: [],
          },
          {
            name: 'Payments',
            link: '/payments',
            icon: require('../../assets/icons/payments.png').default,
            activeIcon: require('../../assets/icons/payments.png').default,
            items: [],
          },
        ]
   
    default:
      return [
        {
          name: 'Dashboard',
          link: '/dashboard',
          icon: require('../../assets/icons/dashboard.png').default,
          activeIcon: require('../../assets/icons/active_dashboard.png').default,
          items: [],
        },
        {
          name: 'Appointments',
          link: '/appointments',
          icon: require('../../assets/icons/appointments.png').default,
          activeIcon: require('../../assets/icons/appointments.png').default,
          items: [],
        },
        {
          name: 'Users',
          link: '/staff',
          icon: require('../../assets/icons/users.png').default,
          activeIcon: require('../../assets/icons/users.png').default,
          items: [
            {
              name: 'Staff',
              link: '/staff',
              icon: require('../../assets/icons/users.png').default,
              activeIcon: require('../../assets/icons/users.png').default,
            },
            {
              name: 'Collaborators',
              link: '/collaborators',
              icon: require('../../assets/icons/users.png').default,
              activeIcon: require('../../assets/icons/users.png').default,
            },
            {
              name: 'Patient',
              link: '/patients',
              icon: require('../../assets/icons/users.png').default,
              activeIcon: require('../../assets/icons/users.png').default,
            },
          ],
        },
        {
          name: 'Patient Records',
          link: '/patientrecords',
          icon: require('../../assets/icons/users.png').default,
          activeIcon: require('../../assets/icons/users.png').default,
        },
        {
          name: 'Organizations',
          link: '/organizations',
          icon: require('../../assets/icons/organizations.png').default,
          activeIcon: require('../../assets/icons/sitemap_active.png').default,
          items: [],
        },
        // {
        //   name: 'Patient Records',
        //   link: '/patients',
        //   icon: require('../../assets/icons/patients.png').default,
        //   items: [],
        // },
        {
          name: 'Inventory',
          link: '/inventory',
          icon: require('../../assets/icons/vaccinations.png').default,
          activeIcon: require('../../assets/icons/vaccinations.png').default,
          items: [],
        },
        {
          name: 'Notifications',
          link: '/notifications',
          icon: require('../../assets/icons/notifications.png').default,
          activeIcon: require('../../assets/icons/notifications.png').default,
          items: [],
        },
        {
          name: 'Payments',
          link: '/payments',
          icon: require('../../assets/icons/payments.png').default,
          activeIcon: require('../../assets/icons/payments.png').default,
          items: [],
        },
      ]
  }
}

const LeftMenuComponent = () => {
  const classes = useStyles()

  const currentUser = authenticationService.currentUserValue
  const role = get(currentUser, ['data', 'data', 'role'], false)

  const filteredMenus = getMenuList(role)


  return filteredMenus.map((item, index, key) => <MenuItem key={key} item={item} index={index} />)

  // return (
  //   <div div className={classes.root}>
  //     <List>
  //       {menuOptions.map((m, index) => {
  //         return (
  //           <ListItem button selected={selectedIndex == index} onClick={event => handleClick(`${m.link}`, `${index}`)}>
  //             <ListItemIcon>
  //               <img src={m.icon} className="lm__menu__icon" />
  //             </ListItemIcon>
  //             <ListItemText primary={m.name} className="lm__menu__text" />
  //           </ListItem>
  //         )
  //       })}
  //     </List>
  //   </div>
  // )
}

const hasChildren = item => {
  const { items: children } = item

  if (children === undefined) {
    return false
  }

  if (children.constructor !== Array) {
    return false
  }

  if (children.length === 0) {
    return false
  }

  return true
}

const MenuItem = ({ item, index }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel
  return <Component item={item} index={index} />
}

const SingleLevel = ({ item, index }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleSelectedMenu = (pageURL, idx) => {
    //setOpen(!open);
    setSelectedIndex(idx)
    console.log(pageURL, idx)
    history.push(pageURL)
  }
  return (
    <ListItem
      button
      selected={selectedIndex == index}
      onClick={event => handleSelectedMenu(`${item.link}`, `${index}`)}
    >
      <ListItemIcon>
        <img src={selectedIndex == index ? item.activeIcon : item.icon} className="lm__menu__icon" />
      </ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  )
}

const MultiLevel = ({ item }) => {
  const { items: children } = item
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <img src={item.icon} className="lm__menu__icon" />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" style={{ marginLeft: '20px' }} disablePadding>
          {children.map((child, key, index) => (
            <MenuItem key={key} item={child} index={index} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default LeftMenuComponent
