import React, { useEffect, useRef, useState } from 'react';
import WatingRoomWid from './component/WatingRoomWid/WatingRoomWid';
import VideoAside from './component/VideoAside/VideoAside';
import ChatWid from './component/ChatWid/ChatWid';
import ExtendWid from './component/ExtendWid/ExtendWid';
import ShareWid from './component/ShareWid/ShareWid';
import axios from 'axios';
import TwilioVideo from 'twilio-video';
import imgSrc from  "../../assets/icons/call.png";
import InviteWid from './component/InviteWid/InviteWid';
import CallExtendConfirm from './component/CallExtendConfirm/CallExtendConfirm';
// import attachDocIcon from  "../../assets/icons/attach-doc.png";
import Countdown from "react-countdown";
import Chat from './component/Chat/Chat';
import PatientRecordsWid from './component/PatientRecordsWid/PatientRecordsWid';
import "./VideoCall.Component.css";

const watingList = [
  {
    img:"John Doe",
    name:"John Doe",
    type:"Patient",
    status:"avilable"
  },
  {
    img:"John Doe",
    name:"John Doe",
    type:"Patient",
    status:"avilable"
  }
]

export default function VideoCallComponent() {
    const [token, setToken] = useState();
    const [isCallActive, setIsCallActive] = useState(false);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('room');
    const [roomInstance, setRoomInstance] = useState([]);
    const [callStatus, setCallStatus] = useState();
    const [isAudioMute, setIsAudioMute] = useState(true);
    const [isStopVideo, setIsStopVideo] = useState(true);
    const [isCountDown, setIsCountDown] = useState(false);
    const [togglePatientRecords, setTogglePatientRecords] = useState(false);
    const [toggleWatingRoom, setToggleWatingRoom] = useState(false);
    const [toggleChat, setToggleChat] = useState(false);
    const [toggleExtend, setToggleExtend] = useState(false);
    const [toggleShare, setToggleShare] = useState(false);
    const [watingRoomList,setWatingRoomList] = useState([...watingList])
    const callEnd = new Audio("https://videocall-service-3612-dev.twil.io/sound/call-end.mp3");
    const callStart = new Audio("https://videocall-service-3612-dev.twil.io/sound/call-start.mp3");
//------------- Count down ---------------------
const TimeOutTem = () => <span>Call ended time Out ..! </span>;
const CallEnd = () => <span>Call ended </span>;
// Renderer callback with condition
let renderer = ({ hours, minutes, seconds, completed }) => {
if (completed || !isCallActive) {
    // Render a complete state
    return <CallEnd/>;
  } else {
    // Render a countdown
    return (
      <span>
        {String(hours).length < 2 ? "0"+hours:hours }:{String(minutes).length < 2 ? "0"+minutes: minutes}:{String(seconds).length < 2 ? "0"+seconds:seconds}
      </span>
    );
  }
};

const toggleShareFun = ()=>{
  setToggleShare(!toggleShare)
}
const toggleWatingRoomFun = ()=>{
  setToggleWatingRoom(!toggleWatingRoom)
}
const toggleExtendFun = ()=>{
  setToggleExtend(!toggleExtend)
}

const togglePatientRecordsFun = ()=>{
  if(toggleChat === true){
    setToggleChat(false)
  }
  setTogglePatientRecords(!togglePatientRecords);
}

const toggleChatFun = ()=>{
  if(togglePatientRecords === true){
    setTogglePatientRecords(false)
  }
  setToggleChat(!toggleChat)
}
//----------------------------------
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    function appendNewParticipant(track, identity) {
        const chat = document.createElement('div');
        chat.setAttribute('id', identity);
        chat.appendChild(track.attach());
        remoteVideoRef.current.appendChild(chat);
      }
      useEffect(() => {
        console.log('Trying to connect to Twilio with token', token);
        TwilioVideo.connect(token, {
          video: isStopVideo,
          audio: isAudioMute,
          name: room,
        })
          .then((room) => {
            setRoomInstance([...roomInstance,room])
            console.log('connected to Twilio');
            TwilioVideo.createLocalVideoTrack().then((track) => {
                let videoItem = document.createElement('div');
                videoItem.setAttribute('id', track.name);
                videoItem.setAttribute('class', 'video-tile');
                videoItem.appendChild(track.attach());
              localVideoRef.current.appendChild(videoItem);
                setIsCallActive(true)
            });
            function removeParticipant(participant) {
              console.log(
                'Removing participant with identity',
                participant.identity
              );
              const elem = document.getElementById(participant.identity);
              elem.parentNode.removeChild(elem);
            }
            function addParticipant(participant) {
              console.log('Adding a new Participant');
              participant.tracks.forEach((publication) => {
                if (publication.isSubscribed) {
                  const track = publication.track;
                  appendNewParticipant(track, participant.identity);
                  console.log('Attached a track');
                }
              });
              participant.on('trackSubscribed', (track) => {
                appendNewParticipant(track, participant.identity);
              });
            }
            room.participants.forEach(addParticipant);
            room.on('participantConnected', addParticipant);
            room.on('participantDisconnected', removeParticipant);
          })
          .catch((e) => {
            console.log('An error happened', e);
          });
        return () => {};
      }, [token, room]);

    const joinVideoRoom = async(event)=>{
  
      setIsCallActive(!isCallActive)
      isCallActive ? callEnd.play():  callStart.play()
      
      if(isCallActive === false){
        const result = await axios.post(
          'https://video-call-8997-dev.twil.io/video-token',
          {
            identity: `name-${String(Math.random())}`,
            room:"Augusta"
          }
        )
        await setToken(result.data);
        await setIsCountDown(true);
      }else {
        localVideoRef.current.innerHTML = "";
      }
       
    }
   
     

    return (
        <div className="call-widget-wrp" >
            <div className="call-widget-wrp-2">
                      <div className="video-workspace">
                          <div className="video-call-content">
                              <div className="local-video" ref={localVideoRef}></div>
                              <div className="remote-video" ref={remoteVideoRef}></div>
                          </div>
                          
                          {
                            toggleChat ?  <Chat setToggleChat={setToggleChat}/> :null
                          }

                          {
                            togglePatientRecords ?  (<div className="video-call-aside-wrp">  <VideoAside/> </div>):null
                          }
                           
                          
                      </div>

                        <div className="call-controls-wrp">
                            <div title={!isCallActive ? "Start Meeting Call": "End Meeting Call"} className={isCallActive ? "call-btn-wrp call-active": "call-btn-wrp call-deactive"} onClick={joinVideoRoom}>
                                <img src={imgSrc}/>
                            </div>
                            <div className="call-controls-wrp-2">
                                <div className="control control-1">
                                   <WatingRoomWid watingRoomList={watingRoomList} toggleWatingRoom={toggleWatingRoom} setToggleWatingRoom={setToggleWatingRoom} toggleWatingRoom={toggleWatingRoom}/>
                                </div>

                                <div className="control control-2">
                                      {
                                        isCountDown ? (<div className="timer-wid"><Countdown date={Date.now() + 9000} renderer={renderer} /></div>): null
                                      }
                                      {/* <InviteWid/> */}
                                      {/* <CallExtendConfirm/> */}
                                      <PatientRecordsWid togglePatientRecords={togglePatientRecordsFun}/>
                                      <ChatWid toggleChat={toggleChatFun}/>
                                      <ExtendWid toggleExtend={toggleExtend} toggleExtendFun={toggleExtendFun} setToggleExtend={setToggleExtend}/>
                                      <ShareWid toggleShare={toggleShare} toggleShareFun={toggleShareFun} setToggleShare={setToggleShare}/>
                                   
                                </div>
                            </div>
                        </div>
            </div>
           
        </div>
    )
}
