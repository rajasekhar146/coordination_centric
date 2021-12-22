import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import watingUserImg from  "./wating-user-1.png";
import {useHistory} from 'react-router-dom';
export default function WatingList({watingListSync,closeList}) {
    const history = useHistory();
    const reDireactToVideoCall = (appointmentId)=>{
        history.push(`/video-call/${appointmentId}`)
    }
    return (
        <div className="watingroom-dropdown">
        <div className="watingroom-header">
            <div>
                <p className="title">Wating Room </p>
            </div>
            <div className="close-action-wrp">
                <CloseIcon onClick={closeList}/>
            </div>
        </div>
       
        <ul className="watingroom-list">
            {
                watingListSync.waitingRoomList.map((itm,idx,arr)=>{
                    return ( 
                                <li className="watingroom-item">
                                <div className="img-wrp">
                                    <img src={itm.profilePicPatient} alt="user1"/>
                                    <div className="wating-user-info">
                                    <p className="name">{itm.patientName}</p>
                                    {/* <p className="type">{itm.type}</p> */}
                                    </div>
                                </div>
                                <div className="wating-action">
                                    <button className="add-btn" onClick={reDireactToVideoCall(itm.appointmentId)}> Add to call</button>
                                </div>
                            </li>
                        )
                })
            }
        </ul>
    </div>
    )
}
