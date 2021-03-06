import Actions from "../actions/video-call-actions";

const initState = {
  isRoomConnect:false,
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
  twilioAccessToken: null,
  showOverlay: true,
  participants: [],
  messages:[],
  isShowVideoCallMeeting:false,
  isFullScreen:false,
  timerCount:false,
  callActive:false,
  erroMsz:"",
  videoCallDuration:"",
  showApplicationPopup:false,
  applicationPopup:'',
  applicationPopupVal:'',
  videoApiResponce:{},
  user:{
    id:null,
    first_name:null,
    role:null,
    host:false,
    img:null,
  },
  countDownResult:false,
};

const VideoCallReducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.identity,
      };
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.isRoomHost,
      };
    case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.onlyWithAudio,
      };
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };
    case Actions.SET_TWILIO_ACCESS_TOKEN:
      return {
        ...state,
        twilioAccessToken: action.token,
      };
    case Actions.SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: action.showOverlay,
      };
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
      case Actions.SET_MESSAGES:
        return {
          ...state,
          messages: action.messages,
        };
      case Actions.SET_SHOW_VIDEO_MEETING:
        return {
          ...state,
          isShowVideoCallMeeting: action.isShowVideoCallMeeting,
        };
      case Actions.SET_TOGGLE_FULL_SCREEN:
        return {
          ...state,
          isFullScreen: action.isFullScreen,
        };
      case Actions.SET_SHOW_TIMER_COUNT:
        return {
          ...state,
          timerCount: action.timerCount,
        };
      case Actions.SET_CALL_ACTIVE:
        return {
          ...state,
          callActive: action.callActive,
        };
      case Actions.SET_VIDEO_TOKEN_ERROR_MSZ:
        return {
          ...state,
          erroMsz: action.erroMsz,
        };
      case Actions.SET_VIDEO_CALL_DURATION:
        return {
          ...state,
          videoCallDuration: action.videoCallDuration,
        };
      case Actions.SET_SHOW_APPLICATION_POPUP:
        return {
          ...state,
          showApplicationPopup: action.showApplicationPopup,
        };
      case Actions.SET_APPLICATION_POPUP:
        return {
          ...state,
          applicationPopup: action.applicationPopup,
        };
      case Actions.SET_APPLICATION_POPUP_VAL:
        return {
          ...state,
          applicationPopupVal: action.applicationPopupVal,
        };
      case Actions.SET_USER:
        return {
          ...state,
          user: action.user,
        };
      case Actions.SET_ROOM_CONNECT:
        return {
          ...state,
          isRoomConnect: action.isRoomConnect,
        };
      case Actions.SET_VIDEO_API_RESPONCE:
        return {
          ...state,
          videoApiResponce: action.videoApiResponce,
        };
      case Actions.SET_COUNT_DOWN_RESULT:
        return {
          ...state,
          countDownResult: action.countDownResult,
        };
    default:
      return state;
  }
};

export default VideoCallReducer;