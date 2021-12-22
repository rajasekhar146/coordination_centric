import React, {useState} from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ExtendWidService } from './ExtendWid.service';
import {useSelector} from 'react-redux';
import moment from 'moment';
import "./ExtendWid.css";
import TimerImg from  "./timer.png";
export default function ExtendWid({toggleExtend, toggleExtendFun, setToggleExtend, meetingEndTime,apiMeetingEndTime}) {
    const timezoneDiff = (new Date()).getTimezoneOffset();
    const [extendWith,setExtendWith] = useState("");
    const videoCallReducer = useSelector(state => state.videoCallReducer);
    const timerExtend = [
        {
            name: "5 minutes",
            milliseconds:5*60*1000
        },
        {
            name: "10 minutes",
            milliseconds:10*60*1000
        },
        {
            name: "15 minutes",
            milliseconds:15*60*1000
        }
    ]

    const selectExtendWith = (itm)=>{
        let dt1 = new Date(apiMeetingEndTime.date).getTime() + itm.milliseconds;
        let dt2 = new Date(dt1).toISOString();
        let postData = {
            meetingid:videoCallReducer.roomId,
            meetingendtime:dt2
        }
        ExtendWidService(postData)
        console.log(">>>>>>>",apiMeetingEndTime.date,">>>>>>>",itm.milliseconds);
        setToggleExtend(false);
        
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
