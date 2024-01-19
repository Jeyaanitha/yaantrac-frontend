importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// the firebase config object
const firebaseConfig = {
  apiKey: 'AIzaSyAHqHRaS6c9u4rkxFrCt5yUcvA-tjAfWXU',
  authDomain: 'push-notification-25367.firebaseapp.com',
  projectId: 'push-notification-25367',
  storageBucket: 'push-notification-25367.appspot.com',
  messagingSenderId: '673434376108',
  appId: '1:673434376108:web:0dc3be3d31b3aca5720c09'
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
