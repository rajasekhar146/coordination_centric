import React, { useEffect, useState } from 'react'

import history from '../../history';
import { useParams } from 'react-router-dom'
import { appointmentService } from '../../services'
import view_details from '../../assets/icons/download_icon.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import moment from 'moment'
import galary_icon from '../../assets/icons/galary_icon.png';
import get from 'lodash.get';
import { authenticationService } from '../../services'
import CircleIcon from '@mui/icons-material/Circle'
import sendIcon from '../../assets/icons/Vector.png'
import chatIcon from '../../assets/icons/chat_icon.png'
import reject from '../../assets/icons/reject.png'
import { memberService } from '../../services'
function ViewAppointmentComponent() {

  const { id, type } = useParams()
  const [appointmentList, setAppointmentList] = useState([]);
  const currentUser = authenticationService.currentUserValue
  const role = get(currentUser, ['data', 'data', 'role'], '')
  const userId = get(currentUser, ['data', 'data', '_id'], '')
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [documentsArray, setDocumentsArray] = useState([]);
  const [toggleChat, setToggleChat] = useState(false);
  const [senderUserId, setSenderUserId] = useState('');
  const [recieverUserId, setRecieverUserId] = useState('')
  const [senderImg, setSenderImg] = useState('')
  const [recieverImg, setRecieverImg] = useState('');
  const [showChat, setShowChat] = useState(false);
  const timezoneDiff = (new Date()).getTimezoneOffset()
  const [appointmentId, setAppointmentId] = useState(null)
  const [secondaryTimings, setSecondaryTimings] = useState(null)

  useEffect(() => {
    getAppointmentDetails();
    getAppointmentChat();
    if (type == 'history') {
      setShowChat(false)
    } else {
      setShowChat(true)
    }
  }, [])

  useEffect(async () => {
    if (appointmentId) {
      const res = await appointmentService.getSecondaryAppointment(appointmentId)
      if (res.status === 200) {
        const element = get(res, ['data', 'data'], {})
        setSecondaryTimings(moment(element?.endTime).add(timezoneDiff, 'minutes').format('h:mm a') + " - " + (moment(element?.endTime).add(timezoneDiff, 'minutes').format('h:mm a')))
      } else {

      }
    }
  }, [appointmentId])

  const openImage = async (docs) => {
    window.open(docs.url, '_blank');
  }
  const getDocs = (documents) => {
    const temp = [];
    setDocumentsArray([]);
    documents && documents.map(async (docs) => {
      let file =
        { "name": docs }
      let res = await memberService.downloadFileUrl(file);
      temp.push(res.data.data);
      if (temp.length == documents.length) {
        setDocumentsArray(temp);
      }
    })
  }
  const getAppointmentDetails = async () => {
    let res = await appointmentService.getAppointmentById(id);
    if (res.data.data.doctorId == userId) {
      setSenderUserId(res.data.data.doctorId)
      setRecieverUserId(res.data.data.patientId)
      setSenderImg(res.data.data.profilePic)
      setRecieverImg(res.data.data.profilePicPatient)

    } else {
      setSenderUserId(res.data.data.patientId)
      setRecieverUserId(res.data.data.doctorId)
      setSenderImg(res.data.data.profilePicPatient)
      setRecieverImg(res.data.data.profilePic)
    }
    setAppointmentList(res.data);
    setAppointmentId(res.data?.data?.appointmentId)
    if (res.data.data.documents.length > 0) {
      getDocs(res.data.data.documents)
    }
  }

  const getAppointmentChat = async () => {
    let chat = await appointmentService.getAppointmentChat(id);
    setMessages(chat.data?.data?.messages);

  }
  const colorcodes = {
    accepted: '#12B76A',
    pending: '#7A5AF8',
    cancelled: '#757500',
    declined: '#B42318',
    request_to_reschedule: '#F79009',
    rescheduled: '#F79009'
  }

  const getValue = val => {
    switch (val) {
      case 'accepted':
        return 'Confirmed'
        break

      case 'cancelled':
        return 'Cancelled'
        break
      case 'pending':
        return 'Pending acceptance'
        break
      case 'accepted':
        return 'Accepted'
        break
      case 'declined':
        return 'Declined'
        break
      case 'request_to_reschedule':
        return 'Requested to Re-schedule'
        break
      case 'rescheduled':
        return 'Rescheduled'
      default:
        return null
    }
  }

  const showChatDialog = () => {
    setShowChat(!showChat)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }
  const sendMessage = async () => {
    if (inputValue.length > 0) {
      const msgRequest = {
        "messages":
          [{
            "message": inputValue,
            "from": senderUserId,
            "to": recieverUserId
          }]
      }

      let chat = await appointmentService.sendMessage(id, msgRequest);
      getAppointmentChat();
      setInputValue('')
    }


  }
  return (
    <div className="view-app">
      <div className="view-header">
        <button
          onClick={() => {
            history.push('/appointments')
          }}
          className="ac__back__btn view_appointment_back"
        >
          <ArrowBackIosNewIcon className="arrow_align" fontSize="sm" />
          <span>Back</span>
        </button>
        <div className="od__title__text">Appointments Summary</div>

        <div className={`od__${appointmentList.data?.appointmentStatus?.toLowerCase()}__status align_status`}>
          <CircleIcon
            fontSize="small"
            sx={{ color: colorcodes[appointmentList.data?.appointmentStatus?.toLowerCase()] }}
          />
          <div className={`od__${appointmentList.data?.appointmentStatus?.toLowerCase()}__label`}>
            {getValue(appointmentList.data?.appointmentStatus)}
          </div>
        </div>
        {appointmentList.data?.appointmentStatus === 'accepted'
          && <div className="od__join_call"
            onClick={() => {
              history.push(`/video-call/${appointmentList.data.appointmentId}`)
            }}
          >
            Join video call
          </div>

        }

      </div>

      <div className="summary-page">
        <div className="row-details">
          <p className="row-title">{role == 'doctor' ? 'Patient' : 'Doctor'}</p>

          {role == 'doctor' && (
            <p className="row-data flex-dr">
              <img src={appointmentList.data?.profilePicPatient} alt="Profile" className="nb__profile__image" />
              {/* <ViewImageComponent category={'doctors_certificate'} pic={appointmentList.data?.profilePicPatient} imageClass={"ap_profile mar-right-10"} /> */}
              <p className="mar-left-10">{appointmentList.data?.patientName}</p>
            </p>
          )}
          {role != 'doctor' && (
            <p className="row-data flex-dr">
              <img src={appointmentList.data?.profilePic} alt="Profile" className="nb__profile__image" />
              {/* <ViewImageComponent category={'doctors_certificate'} pic={appointmentList.data?.profilePic} imageClass={"ap_profile mar-right-10"} /> */}
              <p className="mar-left-10">{appointmentList.data?.doctorName}</p>
            </p>
          )}
        </div>
        {role == 'patient' &&
        <div className="row-details">
        <p className="row-title">Speciality</p>
        <p className="row-data">
          {appointmentList.data?.speciality.map((d , index) => (
            <span> {d + " "}
            {index != (appointmentList.data?.speciality.length - 1) &&
            <span> , </span>
            }
             </span>
            
          ))}
        </p>
      </div>
         }
         {appointmentList.data?.appointmentStatus == 'accepted' && 
          <div className="row-details">
          <p className="row-title">Appointment Time</p>
          <p className="row-data">
          {`${moment(appointmentList.data?.startTime).add(timezoneDiff, 'minutes').format('ddd, Do MMM')} ${moment(appointmentList.data?.startTime).add(timezoneDiff, 'minutes').format('h:mm a') + " - " + moment(appointmentList.data?.endTime).add(timezoneDiff, 'minutes').format('h:mm a')}`}
          </p>
        </div>
         }
         {appointmentList.data?.appointmentStatus != 'accepted' && 
         <div className="row-details">
         <p className="row-title">Primary Time</p>
         <p className="row-data">
         {`${moment(appointmentList.data?.startTime).add(timezoneDiff, 'minutes').format('ddd, Do MMM')} ${moment(appointmentList.data?.startTime).add(timezoneDiff, 'minutes').format('h:mm a') + " - " + moment(appointmentList.data?.endTime).add(timezoneDiff, 'minutes').format('h:mm a')}`}
         </p>
       </div>
          }
        {appointmentList.data?.appointmentStatus != 'accepted' && 
        <div className="row-details">
          <p className="row-title">Secondary Time</p>
          <p className="row-data">{`${moment(appointmentList.data?.endTime).add(timezoneDiff, 'minutes').format('ddd, Do MMM')} ${secondaryTimings}`}</p>
        </div>
        }
        <div className="row-details">
          <p className="row-title">Reason for appointment</p>
          <p className="row-data">{appointmentList.data?.appointmentReason}</p>
        </div>
        <div className="row-details">
          <p className="row-title">Previous Health Condition</p>
          <p className="row-data">
            {appointmentList.data?.healthinfo[0]?.problems.map((d, index) => (
              <span> {d + " "} 
              {index != (appointmentList.data?.healthinfo[0]?.problems.length - 1) &&
            <span> , </span>
            } </span>
            ))}
          </p>
        </div>
       
       
          <div className="row-details">
            <p className="row-title">Past Medical Reports</p>
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
        
        {
          (role == 'doctor' || role == 'patient') &&

          <div className="row-details">
            <p className="row-title">Chat</p>

            <div>
              {type == 'history' && !showChat &&
                <button className={messages.length <= 0 ? 'evp__verify__btn_disabled show__chat__btn' : 'ac__back__btn show__chat__btn'} className="" disabled={messages.length <= 0} onClick={showChatDialog}>
                  {messages.length > 0 && <img className="msg__icon" src={chatIcon} alt="upload" />}
                  View Chat History</button>
              }
              {type == 'history' && showChat &&
              <p className="close_chat" onClick={showChatDialog}>
                <img className="chat__close__icon" src={reject} alt="reject" />
                Close Chat History</p>
            }
            {showChat &&
              <div className="chat_content">
                {messages.map(d => (
                  <div className="chat_body ">
                    {d.from == userId && (
                      <p>
                        <img
                          src={senderImg}
                          alt="Profile"
                          className="nb__chat__image left_img"
                        />
                        <div className="from_chat chat__box">
                        <span className="from_msg">  {d.message}</span>
                        <span className="time_stamp right-10">{new Date(d.createdDate).toLocaleString()}</span>
                        </div>
                      </p>
                    )}
                    {d.from != userId && (
                      <p >
                        <div className="to_chat chat__box">
                        <span className="from_msg">  {d.message}</span>
                        <span className="time_stamp left-10">{new Date(d.createdDate).toLocaleString()}</span>
                        </div>

                        <img 
                          src={recieverImg}
                          alt="Profile"
                          className="nb__chat__image right_img"
                        />
                      </p>
                    )}
                  </div>
                ))}
              </div>
            }
            {type == 'upcoming' &&
              <div className="send_message_textbox">
                <textarea className="chat_input" placeholder="Write something..." onKeyDown={handleKeyDown}
                  value={inputValue} onInput={e => setInputValue(e.target.value)}
                />
                <img className="send__icon" onClick={sendMessage} src={sendIcon} alt="upload" />

              </div>
            }
          </div>


          </div>
        }
      </div>
    </div>
  )

}


export default ViewAppointmentComponent;

