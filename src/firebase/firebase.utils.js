import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

  export const AddCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  }

  firebase.initializeApp(config);

  export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items  } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title, 
        items
      }
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsuscribe = auth.onAuthStateChanged(userAuth => {
        unsuscribe();
        resolve(userAuth);
      }, reject);
    });
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;