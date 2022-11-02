import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3IIwp28u9FMJsFTNmIp-R64nk_oMOvVo",
  authDomain: "crwn-clothing-db-e7998.firebaseapp.com",
  projectId: "crwn-clothing-db-e7998",
  storageBucket: "crwn-clothing-db-e7998.appspot.com",
  messagingSenderId: "524942507968",
  appId: "1:524942507968:web:0de5b285c3ce6f0eca9225",
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createCollectionAndDocuments = async ( // upload local js object to the DB
  collectionKey: string,
  onjectsToAdd: [{ title: string }]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  onjectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title!.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  
};

export const getCollectionAndDocuments = async() => {
  const collectionRef = collection(db, 'categories');
  const qry = query(collectionRef);

  const querySnapshot = await getDocs(qry);
  const categoryMap = querySnapshot.docs.reduce((acc: any, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (
  user: User,
  aditionalData?: { displayName: string }
) => {
  const { uid } = user;
  const userDocRef = doc(db, "users", uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = user;
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
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result;
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
