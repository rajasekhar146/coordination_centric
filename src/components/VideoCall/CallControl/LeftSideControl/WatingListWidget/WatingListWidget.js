import React from 'react';
import WatingListButton from './WatingListButton';
import WatingList from './WatingList';
import './WatingListWidget.css';
import {useSelector} from 'react-redux';


export default function WatingRoomWid({watingList,toggleWatingList,toggleWatingListHandel,setToggleWatingList}) {
    const closeList = ()=>{
        setToggleWatingList(false)
    }
    const videoCallReducer = useSelector(state => state.videoCallReducer);

    return (
                <>
                {
                    !videoCallReducer.isFullScreen && (<div className="watingroom-wrp">
                                                            {
                                                                toggleWatingList && <WatingList watingList={watingList} closeList={closeList}/>
                                                            }
                                                            <WatingListButton toggleWatingListHandel={toggleWatingListHandel}/>
                                                        </div>
                                                    )
                }
                </>
    )
}
