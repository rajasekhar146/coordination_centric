import React from 'react';
import attachDocImg from './attach-doc.png';
import './PatientRecordsWid.css';
export default function PatientRecordsWid({togglePatientRecords}) {
    return (
        <div className="wid-tile attach-doc-wid" onClick={togglePatientRecords}>
            <img src={attachDocImg}/>
        </div>
    )
}
