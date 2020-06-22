import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {

  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  export default firebase();

