import React from "react";
import app from "firebase/app";
import "firebase/auth";

const FirebaseContext = React.createContext(null);
console.log("FIREBASE CONTEXT");
const firebaseConfig = {
  apiKey: "AIzaSyCizDn8uvuO7g3j0d3zwwpKPuPIiBvBBY0",
  authDomain: "clava-7460.firebaseapp.com",
  databaseURL: "https://clava-7460.firebaseio.com",
  projectId: "clava-7460",
  storageBucket: "clava-7460.appspot.com",
  messagingSenderId: "318402922015",
  appId: "1:318402922015:web:f4c037b469b69d35af372a",
  measurementId: "G-EX3TSXVKK1",
};

class Firebase {
  constructor() {
    console.log("FIIREBASE INIT");
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
export { FirebaseContext };
