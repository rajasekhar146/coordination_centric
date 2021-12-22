import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
// import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
// import ChatSection from './ChatSection/ChatSection';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VideoSection from './VideoSection/VideoSection';
import Chat from './Chat/Chat';
import {connect} from 'react-redux';
import {setIdentity, 
        setTwilioAccessToken, 
        setRoomId, 
        setShowVideoCallMeeting,
        setIsFullScreen,
        setVideoTokenErrorMsz,
        setVideoCallDuration,
        setUser,
        setRoomConnect,
        setVideoApiresponce,
        setCountDownResult
        } from '../../redux/actions/video-call-actions';
import { connectToRoom, getTokenFromTwilio } from './utils/TwilioUtils';
import Overlay from './Overlay';
import { useParams } from 'react-router-dom';
import CallControl from './CallControl/CallControl';
import VideoAside from './VideoAside/VideoAside';
import {useSelector,useDispatch} from 'react-redux';
import { Provider } from 'react-redux'
import store from '../../redux/store';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';

import SocketIoComponent from './SocketIoComponent/SocketIoComponent';
import io from "socket.io-client";
import './VideoCall.css';
import * as env from '../../environments/environment';
import { authHeader } from '../../helpers';
const apiURL = env.environment.apiBaseUrl;

const axiosConfig = {
  headers: authHeader(),
}
const  VideoCallWidget=({
  isRoomConnect,
  identity,
  roomId,
  isFullScreen,
  showOverlay,
  user,
  videoApiResponce,
  setRoomIdAction,
  setIdentityAction,
  setTwilioAccessTokenAction,
  setShowVideoCallMeetingAction,
  setIsFullScreenAction,
  setVideoTokenErrorMszAction,
  setVideoCallDurationAction,
  setUserAction,
  setRoomConnectAction,
  setVideoApiresponceAction,
  countDownResult,
  setCountDownResultAction
  })=>{
    const timezoneDiff = (new Date()).getTimezoneOffset()
    //const [socket,setSocket]=useState(null);
    const [meetingStartTime,setMeetingStartTime]=useState({date:null});
    const [meetingEndTime,setMeetingEndTime]=useState({date:null});
    const [meetingDuration,setMeetingDuration]=useState();
    const [meetingRemainingTime,setMeetingRemainingTime]=useState(0);
    const [watingListSync,setWatingListSync]=useState({});

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

const userNotLogin =(setVideoTokenErrorMszAction)=>{
  setRoomConnectAction(false)
  setVideoTokenErrorMszAction("You need to login as authorized user with CC application to access this meeting")
}
    const initialVideoCallData= async()=>{
      let meetingUrl = window.location.pathname;
      let meetingUrlSplit = meetingUrl.split('/');
      setRoomIdAction(meetingUrlSplit[2]);
      try{
        let userLocal =  JSON.parse(localStorage.getItem('currentUser'));
        let userFirstName = userLocal.data.data.first_name;
        let userRole =  userLocal.data.data.role;
        let userId =  userLocal.data.data._id;
        let userImg =  userLocal.data.data.profilePic;

        let applicationUser = {...user}
        applicationUser.id =userId;
        applicationUser.first_name =userFirstName;
        applicationUser.img = userImg;

        setIdentityAction(userFirstName);

        if(userRole === "patient"){
          applicationUser.role = "patient";
          setUserAction(applicationUser)
        }
        if(userRole === "doctor"){
          applicationUser.role = "doctor";
          setUserAction(applicationUser);
        }
        
         getTokenFromTwilio(meetingUrlSplit[2],
          userFirstName,
          setTwilioAccessTokenAction,
          setVideoTokenErrorMszAction,
          setVideoCallDurationAction,
          setRoomConnectAction,
          setVideoApiresponceAction,
          setMeetingDuration,
          )
         setShowVideoCallMeetingAction(true);
         
         
        }catch{
        userNotLogin(setVideoTokenErrorMszAction);

        console.log("User not found")
      }
    }
  
  
    const [toggleWatingList, setToggleWatingList] = useState(false);
    const [room, setRoom] = useState('');
   
    const [togglePatientRecords, setTogglePatientRecords] = useState(false);
    const [toggleChat, setToggleChat] = useState(false);
    const [toggleExtend, setToggleExtend] = useState(false);
    const [toggleShare, setToggleShare] = useState(false);
    
    const toggleFullScreen = ()=>{
      setIsFullScreenAction(!isFullScreen)
    }
  
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
  

  const toggleChatFun = ()=>{
    if(isRoomConnect){
      if(togglePatientRecords === true){
        setTogglePatientRecords(false)
      }
      setToggleChat(!toggleChat)
    }
  }
const closeChatFun = ()=>{
  setToggleChat(false)
  }
//-----------------------------------------------------
// socketIOClient.connect()
const SocketEventNames = {
  JOIN:'join',
  LEAVE:'leave',
  SUBSCRIBE_WAITING_ROOM:'subscribe_to_waiting_room',
  UNSUBSCRIBE_WAITING_ROOM:'unsubscribe_to_waiting_room',
  WAITING_ROOM_DATA:'waiting_room_data',
  MEETING_DATA:'meeting_data'

}
const sendJoinEvent = (socket,authToken,appointmentId,participantId)=>{
  
  socket.emit(SocketEventNames.JOIN,{
      authToken,
      appointmentId,
      participantId
  },(data)=>{
      console.log('join reply:',data);
      if(data){
        setMeetingEndTime({...meetingEndTime,date:new Date(moment(data.endTime).add(timezoneDiff, 'minutes')).getTime()});
      }
  });
};
//-----------------------------------------------------
    useEffect(async() => {
      initialVideoCallData();
      //-------------------------------------------------------
      let socket = io.connect(apiURL,{transports:['websocket']});
      socket.on("connect", () => {
        console.log(`Connected to server`,socket.id);
          let currentUserLocal =  JSON.parse(localStorage.getItem("currentUser"));
          const participantId = currentUserLocal.data.data._id;
          const jwt = currentUserLocal.data.token;
          const appointmentId = window.location.pathname.split("/")[2]; //of current meeting
          
          if(appointmentId && participantId){
            sendJoinEvent(socket,jwt,appointmentId,participantId);
          }
          socket.emit(SocketEventNames.SUBSCRIBE_WAITING_ROOM,{authToken:jwt});
      });
      
      socket.on("disconnect", () => {
        console.log(`DisConnected to server`,socket.id);
      });    
      
      socket.on(SocketEventNames.MEETING_DATA, (data) => {
        console.log("meeting_data:",data);
        if(data){
          setMeetingEndTime({...meetingEndTime,date:new Date(data.endTime)});
        }
      });    
      
      socket.on(SocketEventNames.WAITING_ROOM_DATA, (data) => {
        console.log("waiting room data:",data);
        if(data){
          setWatingListSync({...watingListSync,...data})
        }
      });
      //-------------------------------------------------------
      
    },[])
 
        return(<>
         <div id={isFullScreen ? 'min-screen':'full-screen'} className="room_container">
                          {/* <div className="full-screen" onClick={toggleFullScreen}> 
                              <FullscreenIcon/>
                          </div> */}

                         
                                                  <CallControl
                                                    room={room}
                                                    setRoom={setRoom}
                                                    watingList={watingList}
                                                    toggleWatingList={toggleWatingList}
                                                    setToggleWatingList={setToggleWatingList}
                                                    toggleWatingListHandel={toggleWatingListHandel}
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
                                                    countDownResult={countDownResult}

                                                    meetingStartTime={meetingStartTime}
                                                    meetingEndTime={meetingEndTime}
                                                    meetingDuration={meetingDuration}
                                                    meetingRemainingTime={meetingRemainingTime}

                                                    setMeetingStartTime={setMeetingStartTime}
                                                    setMeetingEndTime={setMeetingEndTime}
                                                    setMeetingDuration={setMeetingDuration}
                                                    setMeetingRemainingTime={setMeetingRemainingTime}
                                                    setCountDownResultAction={setCountDownResultAction}
                                                    watingListSync={watingListSync}
                                                    />
                                                    <VideoSection room={room} setRoom={setRoom}/>
                                                    { toggleChat && <Chat closeChatFun={closeChatFun}/> }
                                                    { togglePatientRecords && (<div className="video-call-aside-wrp"> <VideoAside roomId={roomId} /> </div>) }
                                                    {/* {showOverlay && <Overlay/>} */}
                                                </div>
        </>)

}

const mapStoreStateToProps=(state)=>{
    return {
        ...state.videoCallReducer
    }
}
const mapActionsToProps=(dispatch)=>{
    return {
      setRoomIdAction:(roomId)=> dispatch(setRoomId(roomId)),
      setIdentityAction:(identity)=> dispatch(setIdentity(identity)),
      setTwilioAccessTokenAction:(token)=> dispatch(setTwilioAccessToken(token)),
      setVideoTokenErrorMszAction:(erroMsz)=> dispatch(setVideoTokenErrorMsz(erroMsz)),
      setVideoCallDurationAction:(videoCallDuration)=> dispatch(setVideoCallDuration(videoCallDuration)),
      setIsFullScreenAction:(isFullScreen)=> dispatch(setIsFullScreen(isFullScreen)),
      setShowVideoCallMeetingAction:(isShowVideoCallMeeting)=> dispatch(setShowVideoCallMeeting(isShowVideoCallMeeting)),
      setUserAction:(user)=> dispatch(setUser(user)),
      setRoomConnectAction:(roomConnect)=> dispatch(setRoomConnect(roomConnect)),
      setVideoApiresponceAction:(videoApiResponce)=> dispatch(setVideoApiresponce(videoApiResponce)),
      setCountDownResultAction:(countDownResult)=> dispatch(setCountDownResult(countDownResult))
    }
}


export default connect(mapStoreStateToProps,mapActionsToProps)(VideoCallWidget)
