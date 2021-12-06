import React,{useState} from 'react'
import CameraButtonImg from './camera.svg';
import CameraOffButtonImg from './cameraOff.svg';
export default function CameraButton({room}) {
    const [isLocalVideoTrackDisabled, setIsLocalVideoTrackDisabled] =
    useState(false);

  const handleCameraButtonPressed = () => {
    isLocalVideoTrackDisabled ? startVideo() : stopVideo();

    setIsLocalVideoTrackDisabled(!isLocalVideoTrackDisabled);
  };

  const startVideo = () => {
    // start sending back video stream to other users
    room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
      localVideoTrackPublication.track.enable();
    });
  };

  const stopVideo = () => {
    // stop sending camera stream to other users
    room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
      localVideoTrackPublication.track.disable();
    });
  };

  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoTrackDisabled ? CameraOffButtonImg : CameraButtonImg}
        className="video_button_image"
        onClick={handleCameraButtonPressed}
      />
    </div>
  );
}
