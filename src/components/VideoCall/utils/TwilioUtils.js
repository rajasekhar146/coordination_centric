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
export const getTokenFromTwilio = async(roomId,identity,setAccessToken,)=>{
  console.log("I Got the request")
  let axiosConfig = {
    headers: authHeader(),
    }
    const randomId = uuidv4();
    const response = await axios.get(`${apiURL}/video/videotoken?identity=${roomId}${identity}`,axiosConfig);
    //const response = await axios.get(`https://videocall-service-3612-dev.twil.io/token-service?identity=${randomId}jitu`)
   // const response = await axios.get(`https://videocall-service-6533-dev.twil.io/token-service?identity=${roomId}${identity}`)
    const data = response.data;
    if(data.accessToken){
        setAccessToken(data.accessToken)
    }
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
                    dataChannel = dataTrack;
                    let videoTrack;

                    if (!onlyWithAudio) {
                      videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
                      tracks = [audioTrack, videoTrack, dataTrack];
                    } else {
                      tracks = [audioTrack, dataTrack];
                    }

                    const room = await connect(accessToken, {
                      name: roomId,
                      tracks,
                    });
                    console.log("succesfully connected with twilio room");
                    console.log(room);
                    store.dispatch(setCallActive(true));
                    // store.dispatch(setTimerCountF(true));
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
      const ownMessage = {
        identity,
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