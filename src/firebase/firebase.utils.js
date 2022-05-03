import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDvwJJDJCsimV0MSt05vywBdkIlgHooDU8",
    authDomain: "crwn-db-ee75e.firebaseapp.com",
    projectId: "crwn-db-ee75e",
    storageBucket: "crwn-db-ee75e.appspot.com",
    messagingSenderId: "417742491624",
    appId: "1:417742491624:web:5080b4e917fd5b067ede5d",
    measurementId: "G-W7Q7TDW7KW"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user')
      }
    }

    return userRef;
    
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;