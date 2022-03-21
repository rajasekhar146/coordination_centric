import React from 'react';
import PatientRecords from '../PatientRecords/PatientRecords';
import PatientRecordsDeatils from '../PatientRecordsDeatils/PatientRecordsDeatils';
import Chat from '../Chat/Chat';
import './VideoAside.css';
export default function VideoAside({roomId}) {
    return (
        <div className="video-aside-wrp">
              <PatientRecords/>
                <PatientRecordsDeatils roomId={roomId} />
        </div>
    )
}
