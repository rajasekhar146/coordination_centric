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
        setRoomConnect
        } from '../../redux/actions/video-call-actions';
import { connectToRoom, getTokenFromTwilio } from './utils/TwilioUtils';
import Overlay from './Overlay';
import { useParams } from 'react-router-dom';
import CallControl from './CallControl/CallControl';
import VideoAside from './VideoAside/VideoAside';
import {useSelector,useDispatch} from 'react-redux';
import { Provider } from 'react-redux'
import store from '../../redux/store';
import './VideoCall.css';
import {v4 as uuidv4} from 'uuid';


const  VideoCallWidget=({
  isRoomConnect,
  identity,
  roomId,
  isFullScreen,
  showOverlay,
  user,
  setRoomIdAction,
  setIdentityAction,
  setTwilioAccessTokenAction,
  setShowVideoCallMeetingAction,
  setIsFullScreenAction,
  setVideoTokenErrorMszAction,
  setVideoCallDurationAction,
  setUserAction,
  setRoomConnectAction
  })=>{
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
        let user =  JSON.parse(localStorage.getItem('currentUser'));
        let userFirstName = user.data.data.first_name;
        let userRole =  user.data.data.role;
        let userId =  user.data.data._id;
        let userImg =  user.data.data.profilePic;

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
          setUserAction(applicationUser)
        }
        
         getTokenFromTwilio(meetingUrlSplit[2],userFirstName,setTwilioAccessTokenAction,setVideoTokenErrorMszAction,setVideoCallDurationAction,setRoomConnectAction)
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

    useEffect(() => {
      initialVideoCallData();
    },[])

  
    // ReactDOM.render(
    //   <>
    
    //   <Provider store={store}>
    //                     <div id={isFullScreen ? 'min-screen':'full-screen'} className="room_container">
    //                       <div className="full-screen" onClick={toggleFullScreen}> 
    //                           <FullscreenIcon/>
    //                       </div>
    //                                                 <CallControl
    //                                                 room={room}
    //                                                 setRoom={setRoom}
    //                                                 watingList={watingList}
    //                                                 toggleWatingList={toggleWatingList}
    //                                                 setToggleWatingList={setToggleWatingList}
    //                                                 toggleWatingListHandel={toggleWatingListHandel}
    //                                                 togglePatientRecordsFun={togglePatientRecordsFun}
    //                                                 toggleChatFun={toggleChatFun}
    //                                                 setToggleChat={setToggleChat}
    //                                                 toggleExtend={toggleExtend}
    //                                                 toggleExtendFun={toggleExtendFun}
    //                                                 setToggleExtend={setToggleExtend}
    //                                                 toggleShare={toggleShare}
    //                                                 toggleShareFun={toggleShareFun}
    //                                                 setToggleShare={setToggleShare}
    //                                                 roomToken={setToggleShare}
    //                                                 redireactToDashboard={redireactToDashboard}
    //                                                 />
    //                                                 <VideoSection room={room} setRoom={setRoom}/>
    //                                                 { toggleChat && <Chat closeChatFun={closeChatFun}/> }
    //                                                 { togglePatientRecords && (<div className="video-call-aside-wrp"> <VideoAside roomId={roomId} /> </div>) }
    //                                                 {/* {showOverlay && <Overlay/>} */}
    //                                             </div>
    //   </Provider>
    //   </>
    //     ,document.getElementById("video_portal"));
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
    }
}


export default connect(mapStoreStateToProps,mapActionsToProps)(VideoCallWidget)
