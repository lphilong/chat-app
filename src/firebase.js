import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyClt7y-Ei8XAgwh04ahQpvOLVQPfRTRtdw",
    authDomain: "chat-app-caad4.firebaseapp.com",
    projectId: "chat-app-caad4",
    storageBucket: "chat-app-caad4.appspot.com",
    messagingSenderId: "599909726083",
    appId: "1:599909726083:web:9ce4ab6c117ef58e24e8b6",
    measurementId: "G-24NM3N0HVQ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
