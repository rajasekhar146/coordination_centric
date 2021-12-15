import React, { useEffect, useState } from 'react'
import headerImage from '../../assets/images/header_image.png'
import './NavBar.Component.css'
import EventNoteIcon from '@mui/icons-material/EventNote'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded'

import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import ArchiveIcon from '@mui/icons-material/Archive'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ProfileImage from '../../assets/icons/default_profile_image.png'
import history from '../../history'
import { authenticationService, notificationService,appointmentService } from '../../services'
import ViewImageComponent from '../Shared/AppointmentCalender/ViewImage/ViewImage.Component'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { get } from 'lodash'
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import eventBus from "./../../helpers/eventbus";
import Alert from '../Alert/Alert.component';

import { useSelector, useDispatch } from 'react-redux'
import { setFlashMsg } from '../../redux/actions/commonActions'


const profileMenus = [
  { label: 'Profile', icon: ProfileImage },
  { label: 'Change Password', icon: ProfileImage },
  { label: 'Logout', icon: ProfileImage },
]
const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}))


const StyledMenuNotification = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}))

const NavBarComponent = () => {

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const [anchorElNotification,setAnchorElNotification ] = React.useState(null)

  const openNotification = Boolean(anchorElNotification)


  const open = Boolean(anchorEl)
  const [name, setName] = React.useState('')
  const [role, setRole] = React.useState()
  const [userId, setUserId] = React.useState('')
  const [profilePic,setProfilePic] = React.useState("");
  const [notificationList,setNotificationList] = React.useState([])
  const [notificationUnReadcount,setNotificationUnReadcount] = React.useState(0);

  const [openflash, setOpenFlash] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState("")
  const [subLebel, setSubLabel] = useState("")

  useEffect(()=>{
    eventBus.on("notification", (data) =>
    // console.log("Nav Bar component",data)
    {getNotificationList();}
      // this.setState({ message: data.message })
    );
  },[])

  const notificationsListObj = [{
    "is_read":false,
    "created_date_time":1638547274254,
    "_id":"61aa3f4a06451c3cf61b0959",
    "to":"619dddc172deaf29e7a0ea8b",
    "from":{
    "profilePic":"2275311637306342499.jfif",
    "_id":"6195076bb39e32b8a4274b46",
    "first_name":"Karthika",
    "last_name":"GK",
    "email":"karthikagk@yopmail.com",
    "role":"doctor"
    },
    "title":"Confirm Appointment",
    "appointmentId":"61aa3c0dac74ea34b490569a",
    "message":"Your Appoinment has been Confirmed",
    "module_slug":"confirm_appointment",
    "__v":0
    }]
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(()=>{
    getNotificationList();
  },[])

  const handleNotificationClick = event => {
    setAnchorElNotification(event.currentTarget)
    getNotificationList();
  }



  const getNotificationList= ()=>{
    notificationService.getNotificationList({
      "limit": 1000,
      "skip": 0
    }).then(res=>{
      console.log("getNotifications",res);
      let notificationsArray = get(res,["data","data","notificationList"]);
      setNotificationUnReadcount(get(res,["data","data","unReadCount"]));
      let messageArray = [];
      notificationsArray.forEach(element => {
        messageArray= messageArray.concat(element.data.filter(x=>!x.is_read));
      });
      

      console.log("messageArray",messageArray);
      setNotificationList(messageArray);
    },error=>{
      console.log("getNotifications",error);
    })
  }

  const confirmAppointment =async (appointmentId)=>{
    const res = await appointmentService.confirmAppointment(appointmentId)
    console.log("RES",res);
    if (res.status === 200) {
      setOpenFlash(true);
      setAlertMsg('Confirm Appointment');
      setSubLabel(get(res,["data","message"]));
    } else {

    }
  }

  const declineAppointment =async (appointmentId)=>{
    const res = await appointmentService.rejectAppointment(appointmentId)
    console.log(res);
    if (res.status === 200) {
      setOpenFlash(true);
      setAlertMsg('Declined');
      setSubLabel(get(res,["data","message"]));
    } else {
      
    }
  }


  const viewAppointment = (appointmentId)=>{
    console.log("View Appointment",appointmentId);
  }

  const MarkAsRead = (notificationId)   =>{
notificationService.notificationMakeRead(notificationId).then(res=>{
  console.log("MarkAsRead",res);
  getNotificationList();

},error=>{
  console.log("MarkAsUnread",error);
})
  }

  const handleNotificationClose =action =>{
    setAnchorElNotification(null);
  }
 
  const handleClose = action => {
    setAnchorEl(null)
    console.log('action', action)
    if (action.toLowerCase() === 'logout') {
      authenticationService.logout()
      localStorage.clear()
      history.push('/signin')
    } else if (action.toLowerCase() === 'profile'){
      history.push(`/settings/${userId}`)
    }
  }

  const toCamelCase = str =>
    str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/^\w/, c => c.toLowerCase())

  useEffect(() => {
    // console.log('current user', authenticationService.currentUserValue.data.data)
    var data = authenticationService?.currentUserValue?.data?.data
    var fullName = ''
    var roleName = ''
    if (data != null) {
      console.log('data?.last_name', data?.last_name)
      if (data?.last_name != undefined) fullName = data.first_name + ' ' + data?.last_name
      else fullName = data.first_name

      roleName = data.role
      setUserId(data._id)
    }
    setName(fullName)
    setRole(roleName)
    setProfilePic(data.profilePic);

  }, [])
  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
    dispatch(setFlashMsg({
      openFlash: false,
      alertMsg: '',
      subLabel: ''
    }))
  }
  return (
    <>
    <div className="nb__main_div">
      <div className="nb__column__left">
        <div className="nb__logo">
          <img src={headerImage} alt="logo" />
        </div>
        <div className="nb__search"></div>
      </div>

      <div className="nb__column__right">
        {/* <div className="nb__calender">
          <EventNoteIcon />
        </div>
        <div className="nb__message">
          <MessageOutlinedIcon />
        </div> */}
        {notificationUnReadcount>0 &&(
        <div className="notificationUnReadcount">{notificationUnReadcount}</div>
        ) }
        <div className={notificationUnReadcount>0? "nb__notification nb__notification_countNanZero":"nb__notification nb__notification_countzero"} style ={openNotification?{backgroundColor:"#E42346"}:{backgroundColor:"#fff"}}>
          
        <Button
            id="notification-button"
            aria-controls="demo-customized-menu"
            disableElevation
            onClick={handleNotificationClick}
            
          > 
          <NotificationImportantOutlinedIcon style ={openNotification?{fill:"#fff"}:{fill:"#000"}} />
          
          </Button>
          <StyledMenuNotification
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorElNotification}
            open={openNotification}
            onClose={e => handleNotificationClose('Close')}
          >
           
            <div className="nb__profile__menu notifications">
            {notificationUnReadcount ==0 && (
              <div>No notification found </div>
            )}
              {notificationList && notificationList.map((item)=>{
                return (
                  <div className="row" key={item}>
               
                    <div className="message-section">
                    <div className="message-body">
                      <div className="message-icon">
                    
                    {(item.module_slug === 'confirm_appointment' || 
                      item.module_slug === 'reschedule_appointment' ||
                      item.module_slug === 'cancel_appointment' ||
                      item.module_slug === 'decline_appointment'||
                      item.module_slug === 'new_appointment') ?
                     <EventNoteIcon /> :                    
                        <AccountTreeOutlinedIcon/>
                      

                    }   
                      
                      {/* <AccountTreeOutlinedIcon/>           */}
                        </div>
                      <div className="message-content">
                      <span className="meesage-title">{item.title}</span>
                      <span className="meesage-text">{item.message}</span>
                     
                      </div>
                      <CloseIcon  className="close-icon" onClick={()=>{MarkAsRead(item._id)}}/>
                      </div>

                      {(item.module_slug =="new_appointment" || item.module_slug == "reschedule_appointment")&&(
                      <div className="button-section">
                        <button className="button button-view" onClick={()=>{MarkAsRead(item._id);viewAppointment(item.appointmentId); history.push(`/viewApointment/upcoming/${item.appointmentId}`)}}>
                          <RemoveRedEyeOutlinedIcon style={{fontSize:14,marginRight:5}}/>
                          View</button>

                          <button className="button button-decline" onClick={()=>{MarkAsRead(item._id);declineAppointment(item.appointmentId)}}>
                          <CloseIcon style={{fontSize:14,marginRight:5}}/>
                          Reject</button>

                          <button className="button button-accept" onClick={()=>{MarkAsRead(item._id);confirmAppointment(item.appointmentId)}}>
                          <DoneOutlinedIcon style={{fontSize:14,marginRight:5}}/>
                          Approve</button>
                      </div>
                       )}
                      
                  </div>
                  
                  <Divider sx={{ my: 0.5 }} />
                </div>)
              })}
              
            </div>
            </StyledMenuNotification>
        </div>
        <div className="nb__profile">
          <Button
            id="demo-customized-button"
            aria-controls="demo-customized-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <div className="nb__profile__dropdown">
              <div>
                {profilePic ? 
                <img src={profilePic} alt="Profile" className="nb__profile__image" /> : 
                <img src={require('../../assets/icons/default_profile_image.png').default} alt="profile" className="nb__profile__image"  />
                }
                {/* <ViewImageComponent category={'doctors_certificate'} pic={profilePic} imageClass={"nb__profile__image"} /> */}
              </div>
              <div className="nb__profile__content">
                <div className="nb__profile__name">{name}</div>
                <div className="nb__profile__role">{role}</div>
              </div>
            </div>
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={e => handleClose('Close')}
          >
            <div className="nb__profile__menu">
              <MenuItem onClick={e => handleClose('Profile')} className="nb__profile__menu__option" disableRipple>
                <PersonRoundedIcon />
                Profile Settings
              </MenuItem>
            </div>
            {/* <div className="nb__profile__menu">
              <MenuItem onClick={e => handleClose('ChangePWD')} className="nb__profile__menu__option" disableRipple>
                <VpnKeyRoundedIcon />
                Change Password
              </MenuItem>
            </div> */}
            <Divider sx={{ my: 0.5 }} />
            <div className="nb__profile__menu">
              <MenuItem onClick={e => handleClose('Logout')} className="nb__profile__menu__option" disableRipple>
                <ExitToAppRoundedIcon />
                Logout
              </MenuItem>
            </div>
          </StyledMenu>
        </div>
      </div>
     
    </div>
    
     <Alert
     handleCloseFlash={handleCloseFlash}
     alertMsg={alertMsg}
     openflash={openflash}
     subLebel={subLebel}
     color = "success"
   />
   
   </>
  )
}

export default NavBarComponent
