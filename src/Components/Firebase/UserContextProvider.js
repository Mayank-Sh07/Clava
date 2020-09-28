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
            const userName = user.displayName.split(" ");
            const regsNumber = userName.pop();
            const name = userName.join(" ");
            const userRoles = {
              // isAdmin: Boolean(idTokenResult.claims.admin),
              // isMember: Boolean(idTokenResult.claims.member),
              isAdmin: false,
              isMember: true,
            };
            console.log(userRoles);
            setCurrentUser({
              ...user,
              firstName: userName[0],
              name: name,
              regsNumber: regsNumber,
              ...userRoles,
            });
          })
          .catch(console.log("ERROR IN GETTING USERDATA"));
      } else {
        setCurrentUser(null);
      }
      setPending(false);
    });

    return () => {
      unSubscribe();
    };
  }, [Firebase]);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
