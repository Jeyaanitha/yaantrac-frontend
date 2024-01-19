import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAHqHRaS6c9u4rkxFrCt5yUcvA-tjAfWXU',
  authDomain: 'push-notification-25367.firebaseapp.com',
  projectId: 'push-notification-25367',
  storageBucket: 'push-notification-25367.appspot.com',
  messagingSenderId: '673434376108',
  appId: '1:673434376108:web:0dc3be3d31b3aca5720c09'
};
// Intitalize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log('Requesting User Permission......');
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification User Permission Granted.');
      return getToken(messaging, {
        vapidKey: `BPKWG4WAW1f2bANRrQ-RFsiZ-Gdm7WYFxWC9GXOEkW5Vg-TXOt4HohwEATWu1wGKyOFEomV8Y36pYx_hm8DueH0`
      })
        .then(currentToken => {
          if (currentToken) {
            console.log('Client Token: ', currentToken);
          } else {
            console.log('Failed to generate the app registration token.');
          }
        })
        .catch(err => {
          console.log('An error occurred when requesting to receive the token.', err);
        });
    } else {
      console.log('User Permission Denied.');
    }
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
      console.log('payloadfire', payload.data);
    });
  });
