import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const VideoTrack = ({ track,name}) => {
  const trackRef = useRef();

  useEffect(() => {
    console.log("sssss video")
    const child = track.attach();
    trackRef.current.classList.add(track.kind);
    trackRef.current.appendChild(child);

    const videosPortal = document.getElementById("video_portal");

    if (!videosPortal.classList.contains("videos_portal_styles")) {
      videosPortal.classList.add("videos_portal_styles");
    }
  }, []);

  return (
    <div className="video_track_container">
      <div ref={trackRef}>
        <div className="author-name">{name}</div>
      </div>
    </div>
  )

  // const content = (
  //   <div className="video_track_container">
  //     <div ref={trackRef}></div>
  //   </div>
  // );

  // return ReactDOM.createPortal(
  //   content,
  //   document.getElementById("videos_portal")
  // );
};

export default VideoTrack;
