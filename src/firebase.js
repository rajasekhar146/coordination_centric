import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP__MEASUREMENTID
};
let messaging=null;
if (firebase.messaging.isSupported()) {
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
} else {
  console.log('no-support :(')
}

export const getTokenFn = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BLOd-P6kDcqCptOa6OVvQK3FmW3VgMGbjInqQj5z-SNxhLarGhFLklrB25O4z62FlwYS6LDyoZVwfKcGHQY7Nqw'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(currentToken);
      return currentToken;
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(currentToken);
      return null;
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    return null;
    // catch error while creating client token
  });
}


export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
        console.log("payload",payload);
      resolve(payload);
    });
});