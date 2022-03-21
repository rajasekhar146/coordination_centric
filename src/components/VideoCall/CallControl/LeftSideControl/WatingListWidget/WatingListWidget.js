import React from 'react';
import WatingListButton from './WatingListButton';
import WatingList from './WatingList';
import './WatingListWidget.css';
import {useSelector} from 'react-redux';


export default function WatingRoomWid({watingListSync,toggleWatingList,toggleWatingListHandel,setToggleWatingList}) {
    const closeList = ()=>{
        setToggleWatingList(false)
    }
    const videoCallReducer = useSelector(state => state.videoCallReducer);

    return (
                <>
                    <div className="watingroom-wrp">
                        {
                            toggleWatingList && <WatingList watingListSync={watingListSync} closeList={closeList}/>
                        }
                        <WatingListButton toggleWatingListHandel={toggleWatingListHandel}/>
                    </div>
                </>
    )
}
