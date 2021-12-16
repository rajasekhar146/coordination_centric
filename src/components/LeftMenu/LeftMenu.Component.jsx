import React, { useState, useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { leftMenus } from '../../redux/actions/commonActions'

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

const getMenuList = role => {
  switch (role) {
    case 'superadmin':
      return [
        {
          level: '1',
          id: 1,
          name: 'Dashboard',
          link: '/dashboard',
          icon: require('../../assets/icons/dashboard.png').default,
          activeIcon: require('../../assets/icons/active_dashboard.png').default,
          items: [],
          isSelected: true,
        },
        // {
        //   name: 'Appointments',
        //   link: '/appointments',
        //   icon: require('../../assets/icons/appointments.png').default,
        //   activeIcon: require('../../assets/icons/appointments.png').default,
        //   items: [],
        // },
        {
          level: '1',
          id: 2,
          name: 'Organizations',
          link: '/organizations',
          icon: require('../../assets/icons/organizations.png').default,
          activeIcon: require('../../assets/icons/sitemap_active.png').default,
          items: [],
          isSelected: false,
        },
        // {
        //   name: 'Patient Records',
        //   link: '/patients',
        //   icon: require('../../assets/icons/patients.png').default,
        //   items: [],
        // },
        {
          level: '1',
          id: 3,
          name: 'Inventory',
          link: '/inventory',
          icon: require('../../assets/icons/vaccinations.png').default,
          activeIcon: require('../../assets/icons/vaccinations.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 4,
          name: 'Notifications',
          link: '/notifications',
          icon: require('../../assets/icons/notifications.png').default,
          activeIcon: require('../../assets/icons/notifications.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 5,
          name: 'Payments',
          link: '/payments',
          icon: require('../../assets/icons/payments.png').default,
          activeIcon: require('../../assets/icons/payments.png').default,
          items: [],
          isSelected: false,
        },
      ]
      break
    case 'doctor':
      return [
        {
          level: '1',
          id: 1,
          name: 'Dashboard',
          link: '/dashboard',
          icon: require('../../assets/icons/dashboard.png').default,
          activeIcon: require('../../assets/icons/active_dashboard.png').default,
          items: [],
          isSelected: true,
        },
        {
          level: '1',
          id: 2,
          name: 'Appointments',
          link: '/appointments',
          icon: require('../../assets/icons/appointments.png').default,
          activeIcon: require('../../assets/icons/appointments.png').default,
          items: [],
          isSelected: false,
        },

        // {
        //   name: 'Marketplace',
        //   link: '/marketplace',
        //   icon: require('../../assets/icons/vaccinations.png').default,
        //   activeIcon: require('../../assets/icons/vaccinations.png').default,
        //   items: [],
        // },
        {
          level: '1',
          id: 3,
          name: 'Notifications',
          link: '/notifications',
          icon: require('../../assets/icons/notifications.png').default,
          activeIcon: require('../../assets/icons/notifications.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 4,
          name: 'Payments',
          link: '/payments',
          icon: require('../../assets/icons/payments.png').default,
          activeIcon: require('../../assets/icons/payments.png').default,
          items: [],
          isSelected: false,
        },
      ]
      break
    case 'patient':
      return [
        {
          level: '1',
          id: 1,
          name: 'Dashboard',
          link: '/dashboard',
          icon: require('../../assets/icons/dashboard.png').default,
          activeIcon: require('../../assets/icons/active_dashboard.png').default,
          items: [],
          isSelected: true,
        },
        {
          level: '1',
          id: 2,
          name: 'Appointments',
          link: '/appointments',
          icon: require('../../assets/icons/appointments.png').default,
          activeIcon: require('../../assets/icons/appointments.png').default,
          items: [],
          isSelected: false,
        },

        {
          level: '1',
          id: 3,
          name: 'Marketplace',
          link: '/marketplace',
          icon: require('../../assets/icons/vaccinations.png').default,
          activeIcon: require('../../assets/icons/vaccinations.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 4,
          name: 'Notifications',
          link: '/notifications',
          icon: require('../../assets/icons/notifications.png').default,
          activeIcon: require('../../assets/icons/notifications.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 5,
          name: 'Payments',
          link: '/payments',
          icon: require('../../assets/icons/payments.png').default,
          activeIcon: require('../../assets/icons/payments.png').default,
          items: [],
          isSelected: false,
        },
      ]

    default:
      return [
        {
          level: '1',
          id: 1,
          name: 'Dashboard',
          link: '/dashboard',
          icon: require('../../assets/icons/dashboard.png').default,
          activeIcon: require('../../assets/icons/active_dashboard.png').default,
          items: [],
          isSelected: true,
        },
        {
          level: '1',
          id: 2,
          name: 'Appointments',
          link: '/appointments',
          icon: require('../../assets/icons/appointments.png').default,
          activeIcon: require('../../assets/icons/appointments.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 3,
          name: 'Users',
          link: '/staff',
          icon: require('../../assets/icons/users.png').default,
          activeIcon: require('../../assets/icons/users.png').default,
          isSelected: false,
          items: [
            {
              level: '2',
              id: 301,
              name: 'Staff',
              link: '/staff',
              icon: require('../../assets/icons/users.png').default,
              activeIcon: require('../../assets/icons/users.png').default,
              isSelected: false,
            },
            {
              level: '2',
              id: 302,
              name: 'Collaborators',
              link: '/collaborators',
              icon: require('../../assets/icons/users.png').default,
              activeIcon: require('../../assets/icons/users.png').default,
              isSelected: false,
            },
            {
              level: '2',
              id: 303,
              name: 'Patient',
              link: '/patients',
              icon: require('../../assets/icons/users.png').default,
              activeIcon: require('../../assets/icons/users.png').default,
              isSelected: false,
            },
          ],
        },
        {
          level: '1',
          id: 4,
          name: 'Patient Records',
          link: '/patientrecords',
          icon: require('../../assets/icons/users.png').default,
          activeIcon: require('../../assets/icons/users.png').default,
          isSelected: false,
        },
        {
          level: '1',
          id: 5,
          name: 'Organizations',
          link: '/organizations',
          icon: require('../../assets/icons/organizations.png').default,
          activeIcon: require('../../assets/icons/sitemap_active.png').default,
          items: [],
          isSelected: false,
        },
        // {
        //   name: 'Patient Records',
        //   link: '/patients',
        //   icon: require('../../assets/icons/patients.png').default,
        //   items: [],
        // },
        {
          level: '1',
          id: 6,
          name: 'Inventory',
          link: '/inventory',
          icon: require('../../assets/icons/vaccinations.png').default,
          activeIcon: require('../../assets/icons/vaccinations.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 7,
          name: 'Notifications',
          link: '/notifications',
          icon: require('../../assets/icons/notifications.png').default,
          activeIcon: require('../../assets/icons/notifications.png').default,
          items: [],
          isSelected: false,
        },
        {
          level: '1',
          id: 8,
          name: 'Payments',
          link: '/payments',
          icon: require('../../assets/icons/payments.png').default,
          activeIcon: require('../../assets/icons/payments.png').default,
          items: [],
          isSelected: false,
        },
      ]
  }
}
const currentUser = authenticationService.currentUserValue
const role = get(currentUser, ['data', 'data', 'role'], '')
console.log('Left Menu', currentUser, role)
const menus = getMenuList(role)

const LeftMenuComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  dispatch(leftMenus(menus))
  const filteredMenus = useSelector(state => state.leftMenus)
  console.log('Menus filtered:', filteredMenus)
  const [newMenus, setMenus] = useState([])
  useEffect(() => {
    console.log('useEffect')
    setMenus(filteredMenus)
  }, [filteredMenus])
  return newMenus.map((item, index, key) => <MenuItem key={key} item={item} index={index} />)

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
  return <Component item={item} index={item.id} level={item.level} isSelected={item.isSelected} />
}

const SingleLevel = ({ item, index, level, isSelected }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dispatch = useDispatch()
  console.log('Menu Items', item)
  const handleSelectedMenu = (pageURL, idx) => {
    setSelectedIndex(idx)
    var newMenus = menus
    console.log('Selected Menu Items >> before', newMenus, idx, level)
    newMenus.map(m => {
      if (level > 1 && m.items && m.items.length > 0) {
        console.log('Sub menu >> ', m.items)
        m.items.map(sm => {
          if (sm.id == idx) {
            sm.isSelected = true
            return sm
          } else {
            sm.isSelected = false
            return sm
          }
        })
      } else {
        if(m.items){
        m.items.map(sm => {
            sm.isSelected = false
            return sm
        })
      }
        if (m.id == idx) {
          console.log('Selected Menu Items 1')
          m.isSelected = true
          return m
        } else {
          m.isSelected = false
          return m
        }
      }
    })
    console.log('Selected Menu Items', newMenus, idx)
    dispatch(leftMenus(newMenus))

    history.push(pageURL)
  }
  useEffect(() => {
    console.log('useEffect')
  }, [])
  return (
    <ListItem
      button
      selected={selectedIndex == index}
      onClick={event => handleSelectedMenu(`${item.link}`, `${index}`)}
      className={isSelected ? 'lm__selected__menu' : 'lm__unselected__menu'}
    >
      <ListItemIcon>
        <img src={item.icon} className="lm__menu__icon" />
      </ListItemIcon>
      <ListItemText className={isSelected ? 'lm__selected__menu' : 'lm__unselected__menu'} primary={item.name} />
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
