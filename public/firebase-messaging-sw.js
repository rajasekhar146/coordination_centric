// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBi-ONUDtzM88vA6UpPkIz1xmqfVKvQiPQ",
    authDomain: "cc-dev-90032.firebaseapp.com",
    databaseURL: "https://cc-dev-90032-default-rtdb.firebaseio.com",
    projectId: "cc-dev-90032",
    storageBucket: "cc-dev-90032.appspot.com",
    messagingSenderId: "423483013139",
    appId: "1:423483013139:web:43bfca44522459edc4e7e6",
    measurementId: "G-52YCFYG0R2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
