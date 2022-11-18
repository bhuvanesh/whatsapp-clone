// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore/lite';
//import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = 
{
    apiKey: "AIzaSyAmzGXMqX4u4NrqQ8zCMfDyqUm1hx2Mz6M",
    authDomain: "whatsapp-clone-b8533.firebaseapp.com",
    projectId: "whatsapp-clone-b8533",
    storageBucket: "whatsapp-clone-b8533.appspot.com",
    messagingSenderId: "280995071617",
    appId: "1:280995071617:web:38cb97e2bd1960b6bfaf80",
    measurementId: "G-ZSVYPPM6VN"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
/*
  export {auth, provider};
  export default db;

const firebaseApp = firebase.initializeApp(firebaseConfig);
const app= initializeApp(firebaseConfig);
const db =  getFirestore(app);
const auth = getAuth(app);
//const provider = new auth.GoogleAuthProvider();
*/
export {auth, provider}
//export {auth};
export default db;