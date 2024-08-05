import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signOut,
  signInWithPopup
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { isLoggedIn, user } from '$lib/stores.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDk3ce69ccE-wdN0OfEBxIl9jSCM5-WhYQ',
  authDomain: 'trello-app-69348.firebaseapp.com',
  // authDomain: 'localhost',
  projectId: 'trello-app-69348',
  storageBucket: 'trello-app-69348.appspot.com',
  messagingSenderId: '190452744239',
  appId: '1:190452744239:web:853e00fd144f2ba256c6da'
};
export const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0]

// add error handling to all of this methods
export const Database = (() => {
  const db = getFirestore(app);
  const queryOperators = {
    minorThan: '<',
    graterThan: '>',
    equals: '==',
    minorOrEqualThan: '<=',
    graterOrEqualThan: '>=',
    notEquals: '!=',
    arrayContains: '!=',
    arrayContainsAny: '!=',
    in: 'in',
    notIn: 'not-in'
  };

  const getDocuments = async (collectionName) => {
    const colRef = collection(db, collectionName);
    const docQuery = query(colRef);
    const querySanpshot = (await getDocs(docQuery)).docs;

    const collections = [];
    for (const doc of querySanpshot) collections.push({ ...doc.data() });
    return collections;
  };
  const getDocument = async (collectionName, docName) => {
    const docRef = doc(db, collectionName, docName);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data();
  };
  const queryData = async ({ fisrtOperand, operator, secondOperand, docName }) => {
    const col = collection(db, docName);

    const queryCondition = where(fisrtOperand, operator, secondOperand);
    const q = query(col, queryCondition);

    const queryS = await getDocs(q);
    const docs = [];

    queryS.forEach((doc) => docs.push(doc.data()));

    return docs;
  };

  const addData = async (collectionName, data) => {
    const colRef = collection(db, collectionName);
    await addDoc(colRef, { ...data });
  };
  const setData = async (path, docName, docData) => {
    const docRef = doc(db, path, docName);
    await setDoc(docRef, { ...docData });
  };
  const updateData = async (path, docName, updatedProps) => {
    const docRef = doc(db, path, docName);
    await updateDoc(docRef, updatedProps);
  };

  return {
    db,
    getDocuments,
    getDocument,

    queryData,
    queryOperators,

    addData,
    setData,
    updateData
  };
})();

export const Auth = (() => {
  const authInfo = getAuth(app);
  const providers = {
    google: 'Google',
    gitHub: 'GitHub'
  };

  const sigInWithRedirect = async (provider = '') => {
    if (!providers[provider]) return;

    try {
      let authProvider;
      if (provider === providers.google) authProvider = new GoogleAuthProvider();
      if (provider === providers.gitHub) {
        authProvider = new GithubAuthProvider();
      }
      signInWithRedirect(authInfo, authProvider);
    } catch (error) {
      console.error(`Error With signInWithRedirect(): ${error}`);
    }
  };
  const signInWithPopUp = async (provider = '') => {
    if (!providers[provider]) return;

    try {
      let authProvider;

      if (provider === 'google')
        authProvider = new GoogleAuthProvider()
      if (provider === 'gitHub')
        authProvider = new GithubAuthProvider()


      const res = await signInWithPopup(authInfo, authProvider)

      return res
    } catch (error) {
      console.error(`Error With loginWithPopUp(): ${error.message}`);
      return error
    }
  };
  const logOut = async () => {
    try {
      await signOut(authInfo);
      isLoggedIn.set(false);
      user.set({});
    } catch (error) {
      console.error(error);
    }
  };

  return {
    sigInWithRedirect,
    signInWithPopUp,
    logOut,
    authInfo,
  };
})();
