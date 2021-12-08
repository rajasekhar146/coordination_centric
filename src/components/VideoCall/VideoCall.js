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
        setIsFullScreen
        } from '../../redux/actions/video-call-actions';
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
import {v4 as uuidv4} from 'uuid';

const  VideoCallWidget=({
  identity,
  roomId,
  isFullScreen,
  showOverlay,
  setRoomIdAction,
  setIdentityAction,
  setTwilioAccessTokenAction,
  setShowVideoCallMeetingAction,
  setIsFullScreenAction,
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

    const initialVideoCallData= async()=>{
      try{
        let userName = JSON.parse(localStorage.getItem('currentUser')).data.data.first_name;
        setIdentityAction(userName)
        let meetingUrl = window.location.pathname;
        let meetingUrlSplit = meetingUrl.split('/');
        setRoomIdAction(meetingUrlSplit[2]);
         getTokenFromTwilio(meetingUrlSplit[2],userName,setTwilioAccessTokenAction);
        setShowVideoCallMeetingAction(true)
       
      }catch{
        console.log("User not found")
      }
    }
  
    const history = useHistory();
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
    if(togglePatientRecords === true){
      setTogglePatientRecords(false)
    }
    setToggleChat(!toggleChat)
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
                        <div id={isFullScreen ? 'min-screen':'full-screen'} className="room_container">
                          <div className="full-screen" onClick={toggleFullScreen}> 
                              <FullscreenIcon/>
                          </div>
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
      setRoomIdAction:(roomId)=> dispatch(setRoomId(roomId)),
      setIdentityAction:(identity)=> dispatch(setIdentity(identity)),
      setTwilioAccessTokenAction:(token)=> dispatch(setTwilioAccessToken(token)),
      setIsFullScreenAction:(isFullScreen)=> dispatch(setIsFullScreen(isFullScreen)),
      setIsFullScreenAction:(isFullScreen)=> dispatch(setIsFullScreen(isFullScreen)),
      setShowVideoCallMeetingAction:(isShowVideoCallMeeting)=> dispatch(setShowVideoCallMeeting(isShowVideoCallMeeting))
    }
}


export default connect(mapStoreStateToProps,mapActionsToProps)(VideoCallWidget)
