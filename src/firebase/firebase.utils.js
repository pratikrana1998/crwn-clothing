import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAfyNV7WUA-fDKTaYF5_6-BI0FEgoTKJ-o",
    authDomain: "crwn-db-adcc7.firebaseapp.com",
    databaseURL: "https://crwn-db-adcc7.firebaseio.com",
    projectId: "crwn-db-adcc7",
    storageBucket: "crwn-db-adcc7.appspot.com",
    messagingSenderId: "925036326948",
    appId: "1:925036326948:web:deecc3ad0d891ed271e8b1",
    measurementId: "G-LQEBCPY22G"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;