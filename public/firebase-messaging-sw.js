// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyCPuX7XTiB9CCptNnpXmg-z63qEybKarH4',
  authDomain: 'csuites-push-notifications-dev.firebaseapp.com',
  databaseURL: 'https://csuites-push-notifications-dev-default-rtdb.firebaseio.com',
  projectId: 'csuites-push-notifications-dev',
  storageBucket: 'csuites-push-notifications-dev.appspot.com',
  messagingSenderId: '767019714733',
  appId: '1:767019714733:web:dd40f568d073f610491e24',
  measurementId: 'G-PL4NKWM93F'
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
