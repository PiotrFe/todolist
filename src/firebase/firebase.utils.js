import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_r60oD2lnizQpfp8zEJc2GD2QpFdCeM4",
  authDomain: "to-do-list-f03d0.firebaseapp.com",
  databaseURL: "https://to-do-list-f03d0.firebaseio.com",
  projectId: "to-do-list-f03d0",
  storageBucket: "to-do-list-f03d0.appspot.com",
  messagingSenderId: "1009474257004",
  appId: "1:1009474257004:web:2053d39393f91f0d8c1849",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const { user } = await auth.signInWithPopup(googleProvider);
  const userRef = firestore.doc(`users/${user.uid}`);
  const userSnapshot = await userRef.get();

  if (!userSnapshot) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`Error creating the user: ${error.message}`);
    }
  }
};

export const createUserProfileDocument = async (user) => {
  // const userRef = firestore.doc(`users/${user.uid}`);
  if (!user) return;
  const userRef = firestore.collection("users").doc(user.uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`Error creating the user: ${error.message}`);
    }
  }

  return userRef;
};

export const createUser = async ({ email, password }) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await createUserProfileDocument(user);
  } catch (error) {
    console.log(`Error creating the user: ${error.message}`);
  }
};

export const signOutUser = () => {
  auth.signOut();
}
