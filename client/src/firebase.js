

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { isSupported, getMessaging as getMessagingSDK, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA-3qN7RB10Jp-2IXt_AyXGqaU_T3Kr5y4",
  authDomain: "recruitment-management-6e334.firebaseapp.com",
  projectId: "recruitment-management-6e334",
  storageBucket: "recruitment-management-6e334.firebasestorage.app",
  messagingSenderId: "172108783505",
  appId: "1:172108783505:web:3b56e1741268e274e0c430"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const getMessagingInstance = async () => {
  const supported = await isSupported();
  if (!supported) {
    console.log('Firebase Messaging is not supported in this environment');
    return null;
  }
  return getMessagingSDK(app);
};

export const requestFcmToken = async (vapidKey, serviceWorkerRegistration) => {
  const messaging = await getMessagingInstance();
  if (!messaging) return null;

  return getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration
  });
};

// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyA-3qN7RB10Jp-2IXt_AyXGqaU_T3Kr5y4",
//   authDomain: "recruitment-management-6e334.firebaseapp.com",
//   projectId: "recruitment-management-6e334",
//   storageBucket: "recruitment-management-6e334.firebasestorage.app",
//   messagingSenderId: "172108783505",
//   appId: "1:172108783505:web:3b56e1741268e274e0c430"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export const messaging = getMessaging(app);

// export const getFcmToken = async () => {
//   const registration = await navigator.serviceWorker.register(
//     "/firebase-messaging-sw.js"
//   );

//   const token = await getToken(messaging, {
//     vapidKey: "BKzKcfFABuNcDc1pObRsqRM4W-rGiwh5WSpI_HzLlIqQgFdSnnqd2osn7jebyt6jIrU6yFmnmZfpURFHeUlaJQI",
//     serviceWorkerRegistration: registration,
//   });

//   console.log(token);
//   return token;
// };