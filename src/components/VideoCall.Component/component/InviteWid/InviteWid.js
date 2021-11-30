import React from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import "./InviteWid.css";
export default function InviteWid() {
    return (
        <div className="invite-wrp">
            <div className="form-wrp">
                    <div className="invite-header">
                        <div className="icon-wrp">
                            <div className="round-1">
                                <div className="round-2">
                                    <PersonAddAltIcon/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1> Invite</h1>
                            <p>Invite someone to join this call.</p>
                        </div>
                    </div>

                    <div>
                        <div> 
                            <label> Name*</label> 
                            <input type="text"/>
                        </div>
                        <div> 
                            <label> Email*</label> 
                            <input type="text"/>
                        </div>
                        <div> 
                            <div> AddIcon</div>
                            <div> Invite more people</div>
                        </div>
                        <div>
                            <button> Cancel</button>
                            <button> Send invite</button>
                        </div>
                    </div>    
                </div>
        </div>
    )
}
