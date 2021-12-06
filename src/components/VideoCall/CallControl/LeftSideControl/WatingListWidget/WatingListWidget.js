import React from 'react';

import WatingListButton from './WatingListButton';
import WatingList from './WatingList';
import './WatingListWidget.css';



export default function WatingRoomWid({watingList,toggleWatingList,toggleWatingListHandel,setToggleWatingList}) {
    const closeList = ()=>{
        setToggleWatingList(false)
    }

    return (
        <div className="watingroom-wrp">
         
                {
                    toggleWatingList && <WatingList watingList={watingList} closeList={closeList}/>
                }
            <WatingListButton toggleWatingListHandel={toggleWatingListHandel}/>
       
      </div>
    )
}
