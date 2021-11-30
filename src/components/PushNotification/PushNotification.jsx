import React from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Button from '@mui/material/Button';
import "./PushNotification.css";
const obj = {
    title:"New Organization",
    content:"[Organization name] just joined.",
    icon:"tree",
    botton:[
        {
            name:"View",
            icon:"eye",
            actionLink:"",
            color:"primary"
        },
        {
            name:"Decline",
            icon:"cross",
            actionLink:"",
            color:"warning"
        },
        {
            name:"Accept",
            icon:"check",
            color:"error"
        }

    ]
}
export default function PushNotification(props) {
    const iconRender = (iconName)=>{
        switch(iconName){
            case 'tree':return (<AccountTreeOutlinedIcon/>)
            case 'eye':return <RemoveRedEyeOutlinedIcon/> 
            case 'cross':return <CloseOutlinedIcon/>
            case 'check':return <CheckOutlinedIcon/>
        }
        
    }
    return (
        <div className="notification-wrp-1">
            <div className="notification-wrp-2">

                <div className="notification-box">
                    <div className="box-content">
                        <div className="box-icon">
                            {iconRender(obj.icon)} 
                        </div>

                        <div className="box-content-txt">
                            <div className="notification-title-wrp">
                                <h1 className="title">  {obj.title}</h1>
                            </div>
                            <div className="notification-content">
                                {obj.content}
                            </div>
                        </div>
                    </div>
                    <div className="notification-buttons-wrp" >
                    {obj.botton.map((itm,idx,arr)=>{
                        return <Button variant='outlined' key={idx} variant='outlined' color={itm.color}>{iconRender(itm.icon)} {itm.name}</Button>
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}
