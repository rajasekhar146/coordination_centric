import React, { useEffect, useState } from 'react'
import './PatientRecordsDeatils.css';
import {appointmentService} from '../../../services'
import moment from 'moment'
import galary_icon from '../../../assets/icons/galary_icon.png';
import view_details from '../../../assets/icons/download_icon.png'
import { memberService } from '../../../services'
const PatientRecordsDeatils = (props) => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [documentsArray , setDocumentsArray ] = useState([]);
    const {
       rowData,
       meetingid
    } = props

    useEffect(() => {
        getPatientRecords();
    }, []);


    const getPatientRecords =async () =>{
        let res = await appointmentService.getAppointmentById(props.roomId);
        setAppointmentData(res.data);
        if(res.data.data.documents.length > 0){
            getDocs(res.data.data.documents)
          }
    }
    const openImage = async (docs)=>{
        window.open(docs.url, '_blank');
    }
    const getDocs =  (documents) =>{
        const temp = [];
        setDocumentsArray([]);
        documents && documents.map( async (docs) =>{
          let file = 
          { "name":docs }
          let res = await memberService.downloadFileUrl(file);
          temp.push(res.data.data);
          if(temp.length == documents.length){
            setDocumentsArray(temp);
          }
        })
      }
    const confirmAppointment = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid white',
        boxShadow: 24,
        borderRadius: 3,
        p: 3,
        minHeight: 340
      }
    return (
        <div className="patient-deatils-wrap">
                <div className="patient-deatils-header">
                    <div className="patient-deatils-title">
                        Patient Record
                    {/* <CloseIcon className="right" onClick={props.closeList} /> */}
                    </div>
                    <div className="patient-deatils-info">
                        <p className="main-title"> Patient</p>
                        <div className="patient-img-wrp">
            <img src={appointmentData.data?.profilePicPatient} alt="Profile" className="nb__profile__image" />
                            <p className="patient-name"> {appointmentData.data?.patientName}</p>
                        </div>
                    </div>
                </div>
                <div className="patient-list-wrp">
                        <ul className="patient-list">
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title">Start Time - End Time </p>
                                    <p className="sub-title"> 
                                    <span className = "mar-right-5"> {moment(new Date(appointmentData.data?.startTime)).format('DD/MM/YYYY HH:mm')}</span>   - 
                                    <span className = "mar-left-5"> {moment(new Date(appointmentData.data?.endTime)).format('DD/MM/YYYY HH:mm')}</span>   
                                     </p>
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Reason for appointment </p>
                                    <p className="sub-title"> {appointmentData.data?.appointmentReason} </p>
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Previous Health Condition </p>
                                    <p className="sub-title"> 
            {appointmentData.data?.healthinfo?.[0]?.problems.map((d) =><span> {d} </span>)}</p>
                                    
                    
                                </div>
                            </li>
                            <li className="patient-list-itm"> 
                                <div>
                                    <p className="main-title"> Documents </p>
                                    <p className="row-data">
               {documentsArray.map(docs => (
                <span className="docs-view">
                  <img src={galary_icon} className="galary_icon" alt="success_icon" />

                  <img
                    onClick={() => {
                      openImage(docs)
                    }}
                    src={view_details}
                    className="right"
                    alt="success_icon"
                  />
                   <p className="align__img__name docs_name"> {docs.metadata.name}</p>
                  <p className="align__img__name img_size"> {docs.metadata.size}</p>

                </span>
              ))} 
            </p>
                                </div>
                            </li>
                        </ul>
                </div>
               
        </div>
    )
}
export default PatientRecordsDeatils;