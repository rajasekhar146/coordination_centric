import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
// import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
// import ChatSection from './ChatSection/ChatSection';
import VideoSection from './VideoSection/VideoSection';
import Chat from './Chat/Chat';
import {connect} from 'react-redux';
import {setIdentity, setTwilioAccessToken, setRoomId, setShowVideoCallMeeting} from '../../redux/actions/video-call-actions';
import { connectToRoom, getTokenFromTwilio } from './utils/TwilioUtils';
import Overlay from './Overlay';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CallControl from './CallControl/CallControl';
import VideoAside from './VideoAside/VideoAside';
import {useSelector,useDispatch} from 'react-redux';
import { Provider } from 'react-redux'
import store from '../../redux/store';
import './VideoCall.css';

const callEnd = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-end.mp3");
const callStart = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-start.mp3");

const  VideoCallWidget=({identity,roomId, setTwilioAccessTokenAction, twilioAccessToken, showOverlay})=>{

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

    const initialVideoCallData=()=>{
      try{
        let userName = JSON.parse(localStorage.getItem('currentUser')).data.data.first_name;
        if(userName){
          dispatch(setIdentity(userName))
          let meetingUrl = window.location.pathname;
          let meetingUrlSplit = meetingUrl.split('/');
          if(meetingUrl.includes('video-call') && meetingUrlSplit.length === 3){
            dispatch(setRoomId(meetingUrlSplit[2]))
          }
          dispatch(setShowVideoCallMeeting(true));
          getTokenFromTwilio(setTwilioAccessTokenAction,identity,roomId,showOverlay);
        }
      }catch{
        console.log("User not found")
      }
    }
    const videoCallReducer = useSelector(state => state.videoCallReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const [isCallActive, setIsCallActive] = useState(false);
    const [toggleWatingList, setToggleWatingList] = useState(false);
    const [room, setRoom] = useState('');
    const [isCountDown, setIsCountDown] = useState(false);
    const [togglePatientRecords, setTogglePatientRecords] = useState(false);
    const [toggleChat, setToggleChat] = useState(false);
    const [toggleExtend, setToggleExtend] = useState(false);
    const [toggleShare, setToggleShare] = useState(false);

  
    const toggleShareFun = ()=>{
      setToggleShare(!toggleShare)
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
    
   

    const toggleWatingListHandel = ()=>{
      setToggleWatingList(!toggleWatingList)
      }
    const callStartAndHandel = async(event)=>{
        setIsCallActive(!isCallActive)
        isCallActive ? callEnd.play():  callStart.play()
      }

  const toggleChatFun = ()=>{
    if(togglePatientRecords === true){
      setTogglePatientRecords(false)
    }
    setToggleChat(!toggleChat)
    console.log("Here is it",toggleChat);
  }
const closeChatFun = ()=>{
  setToggleChat(false)
  }

    useEffect(() => {
      initialVideoCallData();
    },[])
    ReactDOM.render(
      <>
    
      <Provider store={store}>
                        <div className="room_container">
                                                    <CallControl 
                                                    room={room}
                                                    setRoom={setRoom}
                                                    watingList={watingList}
                                                    toggleWatingList={toggleWatingList}
                                                    setToggleWatingList={setToggleWatingList}
                                                    toggleWatingListHandel={toggleWatingListHandel}
                                                    isCallActive={isCallActive}
                                                    callStartAndHandel={callStartAndHandel}
                                                    callStartAndHandel={callStartAndHandel}
                                                    isCountDown={isCountDown}
                                                    togglePatientRecordsFun={togglePatientRecordsFun}
                                                    toggleChatFun={toggleChatFun}
                                                    setToggleChat={setToggleChat}
                                                    toggleExtend={toggleExtend}
                                                    toggleExtendFun={toggleExtendFun}
                                                    setToggleExtend={setToggleExtend}
                                                    toggleShare={toggleShare}
                                                    toggleShareFun={toggleShareFun}
                                                    setToggleShare={setToggleShare}
                                                    roomToken={setToggleShare}
                                                    />
                                                    <VideoSection room={room} setRoom={setRoom}/>
                                                    { toggleChat && <Chat closeChatFun={closeChatFun}/> }
                                                    { togglePatientRecords && (<div className="video-call-aside-wrp"> <VideoAside/> </div>) }
                                                    {/* {showOverlay && <Overlay/>} */}
                                                </div>
      </Provider>
      </>
        ,document.getElementById("video_portal"));
        return(<></>)

}

const mapStoreStateToProps=(state)=>{
    return {
        ...state.videoCallReducer
    }
}
const mapActionsToProps=(dispatch)=>{
    return {
       setTwilioAccessTokenAction:(token)=> dispatch(setTwilioAccessToken(token))
    }
}

export default connect(mapStoreStateToProps,mapActionsToProps)(VideoCallWidget)
