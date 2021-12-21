import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
  apiKey: 'AIzaSyCPuX7XTiB9CCptNnpXmg-z63qEybKarH4',
  authDomain: 'csuites-push-notifications-dev.firebaseapp.com',
  databaseURL: 'https://csuites-push-notifications-dev-default-rtdb.firebaseio.com',
  projectId: 'csuites-push-notifications-dev',
  storageBucket: 'csuites-push-notifications-dev.appspot.com',
  messagingSenderId: '767019714733',
  appId: '1:767019714733:web:dd40f568d073f610491e24',
  measurementId: 'G-PL4NKWM93F'
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