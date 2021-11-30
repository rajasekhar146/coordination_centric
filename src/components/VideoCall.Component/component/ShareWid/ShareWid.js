import React, {useState} from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import inviteUserIcon from  "./invite-user.png";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShareIcon from '@mui/icons-material/Share';
import "./ShareWid.css";
export default function ShareWid({toggleShare, toggleShareFun, setToggleShare}) {
    const [share,setShare] = useState("");
    const shareList = [
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

    const selectShare = ()=>{
        setToggleShare(false);
        console.log("your selected")
    }

    return (
        <div class="share-wrap">
            {
                toggleShare ? (
                                    <div class="share-dropdown-wrap">
                                            <ul className="share-list">
                                                <li onClick={()=>selectShare()}>
                                                    <div className="icon-wrp">
                                                        <PersonAddAltIcon/>
                                                    </div>
                                                    <div className="itm-content"> 
                                                        <p> Invite User</p>
                                                    </div>
                                                </li>
                                                <li onClick={()=>selectShare()}>
                                                    <div className="icon-wrp">
                                                        <ShareIcon/>
                                                    </div>
                                                    <div className="itm-content"> 
                                                        <p>Share Link</p>
                                                    </div>
                                                </li>
                                             </ul> 
                                        </div>
                                ):null
            }
          

            <div className="wid-tile share-wid" onClick={toggleShareFun}>
              <div className="attach-arrow">
                  {
                      toggleShare ? <ArrowRightIcon/> : null
                  }
                
              </div>
                <img src={inviteUserIcon}/>
            </div>
        </div>
    )
}
