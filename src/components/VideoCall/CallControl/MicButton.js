import React,{useState} from 'react'
import MicButtonImg from './mic.svg';
import MicButtonImgOff from './micOff.svg';
import {useSelector} from 'react-redux';
import store from '../../../redux/store';
export default function MicButton({room}){
  const [isMicMuted, setIsMicMuted] = useState(false);
  const videoCallReducer = useSelector(state => state.videoCallReducer);
  const handleMicButtonPressed = () => {
    if(store.getState().videoCallReducer.isRoomConnect){
      isMicMuted ? unmute() : mute();
      setIsMicMuted(!isMicMuted);
    }
  };

  const mute = () => {
    // mute our microphone so other users will be not able to hear us
    room.localParticipant.audioTracks.forEach((localAudioTrackPublication) => {
      localAudioTrackPublication.track.disable();
    });
  };

  const unmute = () => {
    // turn on mic back
    room.localParticipant.audioTracks.forEach((localAudioTrackPublication) => {
      localAudioTrackPublication.track.enable();
    });
  };

  return (
    <>
    <div className="video_button_container">
                <img
                  src={isMicMuted ? MicButtonImgOff : MicButtonImg}
                  onClick={handleMicButtonPressed}
                  className="video_button_image"
                />
              </div>
    
    </>
  
  );
};
