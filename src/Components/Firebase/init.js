import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";
import "firebase/storage";

const FirebaseContext = React.createContext(null);

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
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.firestore = app.firestore;
    this.database = app.database();
    this.storage = app.storage;
    this.functions = app.functions();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider).then((authUser) => {
      console.log(authUser);
      // if (!String(authUser.user.email).endsWith("@vitstudent.ac.in")) {
      //   this.auth.currentUser.delete().then(() => {});
      // } else
      if (authUser.additionalUserInfo.isNewUser) {
        const userData = {
          uid: authUser.user.uid,
          displayName: authUser.user.displayName,
          role: "user",
          email: authUser.user.email,
          createdAt: new Date(),
          userPosts: [],
          userBlogPosts: [],
        };
        this.firestore()
          .collection("users")
          .doc(authUser.user.uid)
          .set(userData);
      }
    });

  doSignOut = () => this.auth.signOut();

  promoteUser = (userEmail) => {
    const addMember = this.functions.httpsCallable("promoteUser");
    addMember({ email: userEmail });
  };

  addPost = (postId, postData) => {
    return this.firestore().collection("posts").doc(postId).set(postData);
  };

  editPost = (postId, newPostData) => {
    return this.firestore().collection("posts").doc(postId).update(newPostData);
  };

  deletePost = (postId) => {
    return this.firestore()
      .collection("posts")
      .doc(postId)
      .delete()
      .then(
        this.storage()
          .ref("Posts")
          .child(postId)
          .delete()
          .then(console.log("image deleted successfully"))
      );
  };
}

export default Firebase;
export { FirebaseContext };
