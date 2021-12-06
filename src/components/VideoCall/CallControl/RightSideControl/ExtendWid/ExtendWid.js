import React, {useState} from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./ExtendWid.css";
import TimerImg from  "./timer.png";
export default function ExtendWid({toggleExtend, toggleExtendFun, setToggleExtend}) {
    const [extendWith,setExtendWith] = useState("");
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
        setToggleExtend(false);
        console.log("your selected", itm)
    }
    return (
        <div class="extend-wrap">
            {
                toggleExtend ? (
                                    <div class="extend-dropdown-wrap">
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
