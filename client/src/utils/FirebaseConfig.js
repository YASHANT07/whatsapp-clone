
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyA60VDi2LFwI6IkvjSx1RHFG3DhBFTrhNM",
    authDomain: "whatsapp-clone-74959.firebaseapp.com",
    projectId: "whatsapp-clone-74959",
    storageBucket: "whatsapp-clone-74959.appspot.com",
    messagingSenderId: "575048244565",
    appId: "1:575048244565:web:60a01c4c600e97bbd223dc",
    measurementId: "G-1D0QSBLSL2"
  };

  const app = initializeApp(firebaseConfig)
  export const firebaseAuth = getAuth(app);
