import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA_r60oD2lnizQpfp8zEJc2GD2QpFdCeM4",
    authDomain: "to-do-list-f03d0.firebaseapp.com",
    databaseURL: "https://to-do-list-f03d0.firebaseio.com",
    projectId: "to-do-list-f03d0",
    storageBucket: "to-do-list-f03d0.appspot.com",
    messagingSenderId: "1009474257004",
    appId: "1:1009474257004:web:2053d39393f91f0d8c1849"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  export default firebase();

