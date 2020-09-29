import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "./init";

export const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  const Firebase = useContext(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unSubscribe = Firebase.auth.onAuthStateChanged((user) => {
      if (user != null) {
        Firebase.auth.currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            let userName = user.displayName.split(" ");
            const regsNumber = userName.pop();
            const userRoles = {
              // isAdmin: Boolean(idTokenResult.claims.admin),
              // isMember: Boolean(idTokenResult.claims.member),
              isAdmin: true,
              isMember: true,
            };
            return {
              uid: user.uid,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              email: user.email,
              firstName: userName[0],
              name: userName.join(" "),
              regsNumber: regsNumber,
              ...userRoles,
              userDoc: Firebase.firestore().collection("users").doc(user.uid),
            };
          })
          .then(async (authData) => {
            const userPosts = await authData.userDoc.get();
            setCurrentUser({ ...authData, ...userPosts.data() });
            setPending(false);
          })
          .catch((err) => console.log(err));
      } else {
        setCurrentUser(null);
        setPending(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [Firebase]);

  if (pending) {
    return <>Loading...</>;
  } else
    return (
      <UserContext.Provider value={{ currentUser }}>
        {children}
      </UserContext.Provider>
    );
};

export default UserContextProvider;
