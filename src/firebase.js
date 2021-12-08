import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
  // apiKey: "AIzaSyBXAFWdnCz5SNYKJVXUC01Y70DhYgAgSqo",
  // authDomain: "storemax-50908.firebaseapp.com",
  // projectId: "storemax-50908",
  // storageBucket: "storemax-50908.appspot.com",
  // messagingSenderId: "606599051782",
  // appId: "1:606599051782:web:e53a0dfd668450c729a187"
  apiKey: "AIzaSyBi-ONUDtzM88vA6UpPkIz1xmqfVKvQiPQ",
  authDomain: "cc-dev-90032.firebaseapp.com",
  databaseURL: "https://cc-dev-90032-default-rtdb.firebaseio.com",
  projectId: "cc-dev-90032",
  storageBucket: "cc-dev-90032.appspot.com",
  messagingSenderId: "423483013139",
  appId: "1:423483013139:web:43bfca44522459edc4e7e6",
  measurementId: "G-52YCFYG0R2"
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