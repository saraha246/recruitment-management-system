importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA-3qN7RB10Jp-2IXt_AyXGqaU_T3Kr5y4",
  authDomain: "recruitment-management-6e334.firebaseapp.com",
  projectId: "recruitment-management-6e334",
  storageBucket: "recruitment-management-6e334.firebasestorage.app",
  messagingSenderId: "172108783505",
  appId: "1:172108783505:web:3b56e1741268e274e0c430"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

    const notificationTitle = payload.notification.title;   
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.svg' // You can set a custom icon here
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});  