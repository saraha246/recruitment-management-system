// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-3qN7RB10Jp-2IXt_AyXGqaU_T3Kr5y4",
  authDomain: "recruitment-management-6e334.firebaseapp.com",
  projectId: "recruitment-management-6e334",
  storageBucket: "recruitment-management-6e334.firebasestorage.app",
  messagingSenderId: "172108783505",
  appId: "1:172108783505:web:3b56e1741268e274e0c430"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const messaging = getMessaging(app);

export const getFCMToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: "BKzKcfFABuNcDc1pObRsqRM4W-rGiwh5WSpI_HzLlIqQgFdSnnqd2osn7jebyt6jIrU6yFmnmZfpURFHeUlaJQI "
        });
        if (token) {
            console.log("FCM Token:", token);
            return token;
        } else {
            console.log("No FCM token available");
            return null;
        }
    } catch (error) {
        console.log("FCM Token error:", error.message);
        return null;
    }
};

// Listen for foreground messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Foreground message:", payload);
            resolve(payload);
        });
    });

export default app;
    