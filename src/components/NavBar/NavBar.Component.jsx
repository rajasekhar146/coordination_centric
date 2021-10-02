import React from 'react'
import headerImage from '../../assets/images/header_image.png' 
import './NavBar.Component.css'
import EventNoteIcon from '@mui/icons-material/EventNote';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const NavBarComponent = () => {
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
            <div className="nb__profile">Profile</div>
            </div>
        </div>
    )
}

export default NavBarComponent
