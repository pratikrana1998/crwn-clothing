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

export const createUserProfileDocument = async(userAuth,  additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    console.log(snapShot);
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit(); 
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    console.log(transformedCollection);
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}

export const getUserCartRef = async userId => {
    const cartsRef = firestore.collection('carts').where('userId', '==', userId)
    const snapShot = await cartsRef.get()
  
    if (snapShot.empty) {
      const cartDocRef = firestore.collection('carts').doc()
      await cartDocRef.set({ userId, cartItems: [] })
      return cartDocRef
    } else {
      return snapShot.docs[0].ref
    }
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;