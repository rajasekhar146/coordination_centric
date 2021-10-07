import React from 'react'
import headerImage from '../../assets/images/header_image.png' 
import './NavBar.Component.css'
import EventNoteIcon from '@mui/icons-material/EventNote';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProfileImage from '../../assets/icons/default_profile_image.png'
import history from '../../history'
import { authenticationService } from '../../services'; 

const profileMenus = [
    {label: 'Profile', icon: ProfileImage},
    {label: 'Change Password', icon: ProfileImage},
    {label: 'Logout', icon: ProfileImage}
]
const StyledMenu = styled((props) => (
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
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
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
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const NavBarComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (action) => {
        setAnchorEl(null);
        console.log('action', action);
        if(action.toLowerCase() === 'logout'){
            authenticationService.logout()
            history.push('/signin')
        }
    };
    
    return (
        <div className="nb__main_div">
            <div className="nb__column__left">
            <div className="nb__logo"><img src={headerImage} alt="logo" /></div>
            <div className="nb__search"><TextField id="" defaultValue="Search" className="nb__serach__text" margin="normal" InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{color: '#CACCCF'}} />
                  </InputAdornment>
                 )
                }}/></div>
            </div>

            <div className="nb__column__right">            
            <div className="nb__calender"><EventNoteIcon /></div>
            <div className="nb__message"><MessageOutlinedIcon /></div>
            <div className="nb__notification"><NotificationImportantOutlinedIcon /></div>
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
                <div><img src={ProfileImage} alt="Profile" className="nb__profile__image" /></div>
                <div className="nb__profile__content">
                    <div className="nb__profile__name">John Doe</div>
                    <div className="nb__profile__role">Super Admin</div>
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
                    Profile
                </MenuItem>
            </div>
            <div className="nb__profile__menu">
                <MenuItem onClick={e => handleClose('ChangePWD')} className="nb__profile__menu__option" disableRipple>
                <VpnKeyRoundedIcon />
                    Change Password
                </MenuItem>
            </div>
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
    )
}

export default NavBarComponent