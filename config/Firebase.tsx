import {initializeApp} from "@firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxTdcnmJCo4V5EsF-nRT3IVeJklXG41qY",
    authDomain: "solomessage-1717c.firebaseapp.com",
    projectId: "solomessage-1717c",
    storageBucket: "solomessage-1717c.appspot.com",
    messagingSenderId: "776341071807",
    appId: "1:776341071807:web:33f124ff10eb6c929ea30a"
};

initializeApp(firebaseConfig);

export const db = getFirestore()
export const auth = getAuth()