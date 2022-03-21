import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './RoomLabel.css';
export default function RoomLabel({roomId}) {
    return (
        <div className="room_label" >
            <p className="room_label_paragraph"> ID: {roomId}
             <ContentCopyIcon className="copy-txt" onClick={() => { if(roomId){navigator.clipboard.writeText(roomId)}}}/> 
            </p>
        </div>
    )
}
