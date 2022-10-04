import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3IIwp28u9FMJsFTNmIp-R64nk_oMOvVo",
  authDomain: "crwn-clothing-db-e7998.firebaseapp.com",
  projectId: "crwn-clothing-db-e7998",
  storageBucket: "crwn-clothing-db-e7998.appspot.com",
  messagingSenderId: "524942507968",
  appId: "1:524942507968:web:0de5b285c3ce6f0eca9225",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: UserCredential,
  aditionalData?: { displayName: string }
) => {
  const { uid } = userAuth.user;
  const userDocRef = doc(db, "users", uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth.user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...aditionalData,
      });
    } catch (error) {
      error instanceof Error
        ? console.error("Error creating user: ", error.message)
        : console.error("Unexpected error: ", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const generalSignOut = async() => {
  await signOut(auth);
}
