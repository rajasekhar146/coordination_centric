const Actions = {
    SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
    SET_IDENTITY: "SET_IDENTITY",
    SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
    SET_ROOM_ID: "SET_ROOM_ID",
    SET_TWILIO_ACCESS_TOKEN: "SET_TWILIO_ACCESS_TOKEN",
    SET_VIDEO_TOKEN_ERROR_MSZ: "SET_VIDEO_TOKEN_ERROR_MSZ",
    SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
    SET_SHOW_TIMER_COUNT: "SET_SHOW_TIMER_COUNT",
    SET_PARTICIPANTS: "SET_PARTICIPANTS",
    SET_APPLICATION_POPUP_VAL:"SET_SHOW_APPLICATION_POPUP_VAL",
    SET_MESSAGES: "SET_MESSAGES",
    SET_SHOW_VIDEO_MEETING: "SET_SHOW_VIDEO_MEETING",
    SET_TOGGLE_FULL_SCREEN:"SET_TOGGLE_FULL_SCREEN",
    SET_CALL_ACTIVE:"SET_CALL_ACTIVE",
    SET_VIDEO_CALL_DURATION:"SET_VIDEO_CALL_DURATION",
    SET_SHOW_APPLICATION_POPUP:"SET_SHOW_APPLICATION_POPUP",
    SET_USER_TYPE:"SET_USER_TYPE"
  };
  
  export const setIdentity = (identity) => {
    return {
      type: Actions.SET_IDENTITY,
      identity,
    };
  };
  
  export const setIsRoomHost = (isRoomHost) => {
    return {
      type: Actions.SET_IS_ROOM_HOST,
      isRoomHost,
    };
  };
  
  export const setConnectOnlyWithAudio = (onlyWithAudio) => {
    return {
      type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
      onlyWithAudio,
    };
  };
  
  export const setRoomId = (roomId) => {
    return {
      type: Actions.SET_ROOM_ID,
      roomId,
    };
  };
  

  export const setVideoTokenErrorMsz = (erroMsz) => {
    return {
      type: Actions.SET_VIDEO_TOKEN_ERROR_MSZ,
      erroMsz,
    };
  };

  export const setTwilioAccessToken = (token) => {
    return {
      type: Actions.SET_TWILIO_ACCESS_TOKEN,
      token,
    };
  };
  
  export const setShowOverlay = (showOverlay) => {
    return {
      type: Actions.SET_SHOW_OVERLAY,
      showOverlay,
    };
  };
  export const setTimerCount = (timerCount) => {
    return {
      type: Actions.SET_SHOW_TIMER_COUNT,
      timerCount,
    };
  };

  
  export const setParticipants = (participants) => {
    return {
      type: Actions.SET_PARTICIPANTS,
      participants,
    };
  };
  export const setMessages = (messages) => {
    return {
      type: Actions.SET_MESSAGES,
      messages,
    };
  };
  export const setShowVideoCallMeeting = (isShowVideoCallMeeting) => {
    return {
      type: Actions.SET_SHOW_VIDEO_MEETING,
      isShowVideoCallMeeting,
    };
  };
  export const setIsFullScreen = (isFullScreen) => {
    return {
      type: Actions.SET_TOGGLE_FULL_SCREEN,
      isFullScreen,
    };
  };
  export const setCallActive = (callActive) => {
    return {
      type: Actions.SET_CALL_ACTIVE,
      callActive,
    };
  };
  export const setVideoCallDuration = (videoCallDuration ) => {
    return {
      type: Actions.SET_VIDEO_CALL_DURATION,
      videoCallDuration,
    };
  };
  
  export const setShowApplicationPopup = (showApplicationPopup ) => {
    return {
      type: Actions.SET_SHOW_APPLICATION_POPUP,
      showApplicationPopup,
    };
  };

  export const setApplicationPopup = (applicationPopup ) => {
    return {
      type: Actions.SET_APPLICATION_POPUP,
      applicationPopup,
    };
  };
  export const setApplicationPopupVal = (applicationPopupVal) => {
    return {
      type: Actions.SET_APPLICATION_POPUP_VAL,
      applicationPopupVal,
    };
  };
  
  export const setUserType = (userType ) => {
    return {
      type: Actions.SET_USER_TYPE,
      userType,
    };
  };





  
  export default Actions;