import React from 'react';
import attachDocImg from './attach-doc.png';
import './PatientRecordsWid.css';
export default function PatientRecordsWid({togglePatientRecordsFun}) {
    return (
        <div className="wid-tile attach-doc-wid" onClick={togglePatientRecordsFun}>
            <img src={attachDocImg}/>
        </div>
    )
}
