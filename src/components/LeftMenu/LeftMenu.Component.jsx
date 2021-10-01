import React from 'react'
import { Link } from 'react-router-dom'
import './LeftMenu.Component.css'

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const menuOptions = [{  
    name: "Dashboard",  
    link: "/dashboard"  
}, {  
    name: "Appointments",  
    link: "/customsoftware"  
}, {  
    name: "Users",  
    link: "/mobileapps"  
}, {  
    name: "Organizations",  
    link: "/organizations"  
}, {  
    name: "Patient Records",  
    link: "/websites"  
}, {  
    name: "Vaccinations",  
    link: "/websites"  
}, {  
    name: "Notifications",  
    link: "/websites"  
}, {  
    name: "Payments",  
    link: "/websites"  
},
]; 

const LeftMenuComponent = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
    
    return (
        <List>
        { menuOptions.map(m => {
            return (
            <Link to={m.link}> 
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary={m.name} className="lm__menu__text" />
            </ListItemButton> 
            </Link> )
        })}
        </List>
      );
}

export default LeftMenuComponent
