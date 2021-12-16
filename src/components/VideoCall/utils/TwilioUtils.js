import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import store from '../../../redux/store';
import {
    connect,
    LocalAudioTrack,
    LocalDataTrack,
    LocalVideoTrack

} from 'twilio-video';
import { setMessages,setShowOverlay,setTimerCount,setCallActive} from '../../../redux/actions/video-call-actions';
import * as env from '../../../environments/environment';
import { authHeader } from '../../../helpers';

const callStart = new Audio("https://videocall-service-6533-dev.twil.io/sound/call-start.mp3");
const apiURL = env.environment.apiBaseUrl

const audioConstraints = {
  video: false,
  audio: true,
};

const videoConstraints = {
  audio: true,
  video: {
    width: 640,
    height: 480,
  },
};
let dataChannel = null;
let dataFunctionChannel = null;
export const getTokenFromTwilio = async(roomId,identity,setAccessToken,setVideoTokenErrorMsz,setVideoCallDuration,setRoomConnect)=>{
  let axiosConfig = {
    headers: authHeader(),
  }
  
    axios.get(`${apiURL}/video/videotoken?identity=${roomId}${identity}`,axiosConfig)
    .then((response)=>{
      const data = response.data;
      if(data.accessToken){
        setRoomConnect(true)
        setAccessToken(data.accessToken);
        setVideoCallDuration(data.timeduration);
        //setVideoCallDuration(6000000)
      }
    }).catch((err)=>{
      setRoomConnect(false)
      try{
        setVideoTokenErrorMsz(err.response.data.message);
      }catch{

      }
    })
}
export const connectToRoom = async (
  accessToken,
  roomId = "test-room",
  setRoom
) => {
  const onlyWithAudio = store.getState().videoCallReducer.connectOnlyWithAudio;
  const constraints = onlyWithAudio ? audioConstraints : videoConstraints;
  navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
            if(navigator.mediaDevices){
                navigator.mediaDevices
                  .getUserMedia(constraints)
                  .then(async (stream) => {
                    let tracks;

                    // create data track for messages
                    const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);
                    const dataTrack = new LocalDataTrack();
                    const dataFunctionTrack = new LocalDataTrack();
                    dataChannel = dataTrack;
                    dataFunctionChannel = dataFunctionTrack;
                    let videoTrack;

                    if (!onlyWithAudio) {
                      videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
                      tracks = [audioTrack, videoTrack, dataTrack, dataFunctionTrack];
                    } else {
                      tracks = [audioTrack, dataTrack, dataFunctionTrack];
                    }

                    const room = await connect(accessToken, {
                      name: roomId,
                      tracks,
                    });
                    console.log("succesfully connected with twilio room");
                    console.log(room);
                    store.dispatch(setCallActive(true));
                    // store.dispatch(setTimerCountF(true));
                    callStart.play()
                    setRoom(room);
                    store.dispatch(setShowOverlay(false));
                   
                  })
                  .catch((err) => {
                    console.log(
                      "Error occurred when trying to get an access to local devices"
                    );
                    console.log(err);
                  });
              }
  
};

export const checkIfRoomExists = async(roomId)=>{
    const response = await axios.get(`https://videocall-service-6533-dev.twil.io/room-exists?roomid=${roomId}`)
    return response.data.roomExists
}

// Data chennel utils 
export  const sendMessageUsignDataChannel =(content,messageCreatedByMe=false)=>{
      const identity = store.getState().videoCallReducer.identity;
      const applicationUserId = store.getState().videoCallReducer.user.id;
      const ownMessage = {
        identity,
        applicationUserId,
        content,
        messageCreatedByMe
      };
      addMessageToMessenger(ownMessage);
      const messageToSend = {
        identity,
        content
      } 
      const stringifiedMessage = JSON.stringify(messageToSend) 
      dataChannel.send(stringifiedMessage)
};

export const addMessageToMessenger=(message)=>{
  const messages = [...store.getState().videoCallReducer.messages];
  messages.push(message)
  store.dispatch(setMessages(messages))
}
//--------------------------------------------------------------------

// // Data chennel utils 
// export  const sendActionUsignDataFunctionChannel =(syncCountDown,syncCountDownValue)=>{

//   let ownAction = {
//     syncCountDown,
//     syncCountDownValue
//   };
//   //addMessageToMessenger(ownAction);
//   const twilioSyncAction = {
//     syncCountDown,
//     syncCountDownValue
//   } 
//   const stringifiedSyncAction = JSON.stringify(twilioSyncAction) 
//   dataFunctionChannel.send(stringifiedSyncAction)
// };

// export const addMessageToFunction=(message)=>{
// const messages = [...store.getState().videoCallReducer.messages];
// messages.push(message)
// store.dispatch(setMessages(messages))
// }