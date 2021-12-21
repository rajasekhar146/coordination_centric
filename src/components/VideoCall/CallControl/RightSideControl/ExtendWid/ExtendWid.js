import React, {useState} from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ExtendWidService } from './ExtendWid.service';
import {useSelector} from 'react-redux';
import "./ExtendWid.css";
import TimerImg from  "./timer.png";
export default function ExtendWid({toggleExtend, toggleExtendFun, setToggleExtend, meetingEndTime}) {
    const [extendWith,setExtendWith] = useState("");
    const videoCallReducer = useSelector(state => state.videoCallReducer);
    const timerExtend = [
        {
            name: "5 minutes",
            milliseconds: 300000
        },
        {
            name: "10 minutes",
            milliseconds: 600000
        },
        {
            name: "15 minutes",
            milliseconds: 900000
        }
    ]

    const selectExtendWith = (itm)=>{
        let endDate = new Date(new Date(meetingEndTime.date).getTime() + itm.milliseconds).toISOString();
        let postData = {
            meetingid:videoCallReducer.roomId,
            meetingendtime:endDate
        }
        ExtendWidService(postData)
        setToggleExtend(false);
        console.log("your meetingEndTime", endDate)
        // console.log("your selected", itm, videoCallReducer.roomId, dt)
    }
    return (
        <div className="extend-wrap">
            {
                toggleExtend ? (
                                    <div className="extend-dropdown-wrap">
                                            <div className="dropdown-title">
                                                <p> Extend Meeting </p>
                                            </div>
                                            <ul className="extend-list">
                                                {
                                                    timerExtend.map((itm,idx)=>{
                                                    return (<li key={idx} onClick={()=>selectExtendWith(itm)}>
                                                                <div className="icon-wrp">
                                                                    <MoreTimeIcon/>
                                                                </div>
                                                                <div>
                                                                    {itm.name}
                                                                </div>
                                                            </li>)
                                                    })
                                                }
                                                
                                            </ul> 
                                        </div>
                                ):null
            }
          

            <div className="wid-tile extend-meet-wid" onClick={toggleExtendFun}>
              <div className="attach-arrow">
                  {
                      toggleExtend ? <ArrowRightIcon/> : null
                  }
                
              </div>
                <img src={TimerImg}/>
            </div>
        </div>
    )
}
