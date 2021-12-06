import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import watingUserImg from  "./wating-user-1.png";

export default function WatingList({watingList,closeList}) {
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
                watingList.map((itm,idx,arr)=>{
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
}
