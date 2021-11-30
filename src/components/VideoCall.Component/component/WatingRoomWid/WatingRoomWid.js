import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import watingRoomIcon from  "./wating-room.png";
import watingUserImg from  "./wating-user-1.png";
import './WatingRoomWid.css';
export default function WatingRoomWid(props) {
    const closeDropDown = ()=>{
        props.setToggleWatingRoom(false)
    }
const WatingDropDown = ()=> (
        <div className="watingroom-dropdown">
        <div className="watingroom-header">
            <div>
                <p className="title">Wating Room </p>
            </div>
            <div className="close-action-wrp">
                <CloseIcon onClick={closeDropDown}/>
            </div>
        </div>
       
        <ul className="watingroom-list">
            {
                props.watingRoomList.map((itm,idx,arr)=>{
                    
                    return ( 
                                <li className="watingroom-item">
                                <div className="img-wrp">
                                    <img src={watingUserImg} alt="user1"/>
                                    <div className="wating-user-info">
                                    <p className="name">{itm.name}</p>
                                    <p className="type">{itm.type}</p>
                                    </div>
                                </div>
                                <div className="wating-action">
                                    <button className="add-btn"> Add to call</button>
                                </div>
                            </li>
                        )

                })
            }
           
        </ul>
    </div>
    )


    return (
        <div className="watingroom-wrp">
             {
                props.toggleWatingRoom ? <WatingDropDown/> : null
            }
      

        <div className="watingroom-action-menu" onClick={()=> props.setToggleWatingRoom(!props.toggleWatingRoom)}>
            <div className="wid-tile watingroom-wid"> 
                <img src={watingRoomIcon}/>
            </div>
            <div className="watingroom-title"> 
                <p>Wating Room</p>
            </div>
        </div>
      </div>
    )
}
