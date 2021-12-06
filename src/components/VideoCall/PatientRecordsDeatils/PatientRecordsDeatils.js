import React from 'react';
import PatientAvatar from './patient-avatar.png';
import './PatientRecordsDeatils.css';
export default function PatientRecordsDeatils() {
    return (
        <div className="patient-deatils-wrap">
                <div className="patient-deatils-header">
                    <div className="patient-deatils-title">
                        Patient Record
                    </div>
                    <div className="patient-deatils-info">
                        <p className="deatil-of"> Doctor</p>
                        <div className="patient-img-wrp">
                            <img className="patient-img" src={PatientAvatar}/>
                            <p className="patient-name"> Dr. Anna Choy</p>
                        </div>
                    </div>
                </div>
                <div className="patient-list-wrp">
                        <ul className="patient-list">
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Specialty </p>
                                    <p className="sub-title"> Urology </p>
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Specialty </p>
                                    <p className="sub-title"> Urology </p>
                                </div>
                            </li>
                        </ul>
                </div>
        </div>
    )
}
